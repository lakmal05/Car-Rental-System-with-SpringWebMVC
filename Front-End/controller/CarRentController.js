generateRentId();

let baseURL = "http://localhost:8080/Back_End_war/";





$('#cmbRegistrationNo').change(function () {
    let registrationNo = $('#cmbRegistrationNo').find('option:selected').text();
    $.ajax({
        url: baseURL + "car/" + registrationNo,
        method: "GET",
        success: function (res) {
            let car = res.data;
            setCarDataToFields(car);
        },
        error: function (ob) {
            // clearRentalFields();
        }
    })
})



function setCarDataToFields(car){
    $('#txtCarLossDamageWavier').val(car.lossDamageWaiver);

}










$('#btnBookNow').click(function () {
    let regNo = $('#cmbRegistrationNo').find('option:selected').text();
    if (regNo != "" && regNo != "-Select Registration No-" && $('#txtCarPickupDate').val()!="" && $('#txtCarReturnDate').val()!="") {
        let custId = $('#txtCustId').val();
        searchCustomerById(custId);
    } else {
        alert("Please fill rental fields");
    }
})


function searchCustomerById(customerId) {
    $.ajax({
        url: baseURL + "customer/" + customerId,
        method: "GET",
        success: function (res) {
            let customer = res.data;
            searchCarByRegNo(customer);
        }
    });
}


function searchCarByRegNo(customer) {
    let registrationNo = $('#cmbRegistrationNo').find('option:selected').text();
    $.ajax({
        url: baseURL+ "car/" + registrationNo,
        method: "GET",
        success: function (res) {
            let car = res.data;
            searchDriverByLicenceNo(customer, car);
        }
    })
}


function searchDriverByLicenceNo(customer, car) {
    let licenceNo = $('#txtDriverLicenceNo').val();
    if ($('#txtDriverLicenceNo').val() === "") {
        licenceNo = null;
    }
    if (licenceNo != null) {
        $.ajax({
            url: baseURL + "driver/" + licenceNo,
            method: "GET",
            success: function (res) {
                let driver = res.data;
                console.log(res.data);
                addCarRent(customer, car, driver);
            }
        })
    } else {
        addCarRent(customer, car, null);
    }
}


function addCarRent(customer, car, driver) {

    let rentId = $('#txtCarRentId').val();
    let today = $('#txtCarTodayDate').val();
    let pickupDate = $('#txtCarPickupDate').val();
    let returnDate = $('#txtCarReturnDate').val();
    let pickUpVenue= $('#txtPickUpVenue').val();
    let ReturnVenue=$('#txtReturnVenue').val();
    let status = "Pending";

    var carRent = {
        rentId: rentId,
        date: today,
        pickUpDate: pickupDate,
        returnDate: returnDate,
        pickUpVenue:pickUpVenue,
        ReturnVenue:ReturnVenue,
        status: status,
        customer: customer,
        car: car,
        driver: driver
    }


    $.ajax({
        url: baseURL + "CarRent",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(carRent),
        success: function (res) {
            getLastRent(rentId, customer);


        },
        error: function (ob) {

        }
    })
}



function getLastRent(rentId, customer) {
    $.ajax({
        url: baseURL + "CarRent/" + rentId,
        method: "GET",
        success: function (res) {
            let carRent = res.data;
            // addAdvancedPayment(carRent, customer);
            console.log(carRent)
        }
    })
}




function generateRentId() {
    $.ajax({
        url:  "http://localhost:8080/Back_End_war/CarRent/generateRentId",
        method: "GET",
        success: function (res) {
            $('#txtCarRentId').val(res.data);
        }
    })
}

$('#needDriver').click(function (){

    if ($(this).is(":checked")) {
        searchRandomDriverForRent();
    } else {
        clearRentalDriverFields();
    }
})


function searchRandomDriverForRent() {
    $.ajax({
        url: baseURL + "driver/getRandomDriver",
        method: "GET",
        success: function (res) {
            for (let driver of res.data) {
                $('#txtDriverLicenceNo').val(driver.licenceNo);
                $('#txtDriverName').val(driver.name);
                // $('#txtDriverAddress').val(driver.address);
                $('#txtDriverContactNo').val(driver.contactNo);
                // $('#txtDriverNIC').val(driver.nicNo);
            }
        },
        error: function (ob) {

        }
    })
}

function clearRentalDriverFields() {
    $('#txtDriverLicenceNo').val("");
    $('#txtDriverName').val("");
    $('#txtDriverAddress').val("");
    $('#txtDriverContactNo').val("");
    $('#txtDriverNIC').val("");
}





