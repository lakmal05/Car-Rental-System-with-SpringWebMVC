generateRentId();
getLastLoginUser();

 let today=new Date().toISOString().slice(0,10);
 $('#txtCarTodayDate').val(today);


let baseURL = "http://localhost:8080/Back_End_war/";





$('#cmbType').change(function () {
    let type = $('#cmbType').find('option:selected').text();
    // clearRentalFields();
    $('#cmbRegistrationNo').empty();
    $('#cmbRegistrationNo').append(new Option("-Select Registration No-", ""));
    $.ajax({
        url: baseURL + "car/getRegNo/" + type,
        method: "GET",
        success: function (res) {
            let i = 0;
            for (let regNo of res.data) {
                $('#cmbRegistrationNo').append(new Option(regNo, i));
                i++;
            }
        }
    })
})


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

function getLastLoginUser() {
    $.ajax({
        url: "http://localhost:8080/Back_End_war/login/getLastLogin",
        method: "GET",
        success: function (res) {
            let login = res.data;
            console.log(login.loginId);
            getAllUserData(login.username, login.password);
        }
    })
}

function getAllUserData(username, password) {
    $.ajax({
        url: "http://localhost:8080/Back_End_war/customer/set/" + username + "/" + password,
        method: "GET",
        success: function (res) {
            let customer = res.data;
            setCustomerDetails(customer);
            // loadMyCarRentsToTable(customer.customerId);
        }
    })
}

function setCustomerDetails(customer) {
    $('#txtCustId').val(customer.customerId);
    $('#txtCusId').val(customer.customerId);
    $('#txtCusName').val(customer.name);
    $('#txtCustName').val(customer.address);
    $('#txtCusEmail').val(customer.email);
    $('#txtCusContactNo').val(customer.contactNo);
    $('#txtCusNIC').val(customer.nicNo);
    $('#txtCusLicenceNo').val(customer.licenceNo);
    $('#txtCusUsername').val(customer.username);
}

$('#btnBookNow').click(function () {
    let regNo = $('#cmbRegistrationNo').find('option:selected').text();
    if (regNo != "" && regNo != "-Select Registration No-" && $('#txtCarPickupDate').val()!="" && $('#txtCarReturnDate').val()!="" ) {
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

function setCarDataToFields(car){

    $('#txtCarColor').val(car.color);
    $('#txtCarLossDamageWavier').val(car.lossDamageWaiver);


}

function searchCarByRegNo(customer) {
    let registrationNo = $('#cmbRegistrationNo').find('option:selected').text();
    $.ajax({
        url: baseURL+ "car/" + registrationNo,
        method: "GET",
        success: function (res) {
            // console.log(res)
            let car = res.data;
            // console.log(car);
            searchDriverByLicenceNo(customer, car);
        }
    })
}





function addCarRent(customer, car, driver) {

    let rentId = $('#txtCarRentId').val();
    let today = $('#txtCarTodayDate').val();
    let pickupDate = $('#txtCarPickupDate').val();
    let returnDate = $('#txtCarReturnDate').val();
    let pickUpVenue= $('#txtPickUpVenue').val();
    let ReturnVenue=$('#txtReturnVenue').val();
    let lossDamageWavier=$('#txtCarLossDamageWavier').val();
    let status = "Pending";




    var carRent = {
        rentId: rentId,
        date: today,
        pickUpDate: pickupDate,
        returnDate: returnDate,
        pickUpVenue:pickUpVenue,
        returnVenue:ReturnVenue,
        status: status,
        customerId: customer,
        registrationNO: car,
        licenceNo: driver,
        lossDamageWaiver:lossDamageWavier,
    }


    $.ajax({
        url: baseURL + "CarRent",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(carRent),
        success: function (res) {
            uploadBankSlip(rentId);
            getLastRent(rentId, customer);


        },
        error: function (ob) {

        }
    })
}


function uploadBankSlip(rentId){

    var fileObjectSlip = $('#inputBankSlip')[0].files[0];
    var fileNameSlip = rentId + "-bankSlip-" + $('#inputBankSlip')[0].files[0].name;


    var data =new FormData();

    data.append("bankSlip",fileObjectSlip,fileNameSlip);


    $.ajax({

        url: baseURL + "carRent/up/" + rentId,
        method: "PUT",
        async: true,
        contentType: false,
        processData: false,
        data: data,

        success: function (res) {
            console.log("uploaded");
            // clearCustomerTextFields();
            //alert
        },
        error: function (ob) {
            //error alert
        }
    });



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




// ====================Need Driver Part=================================



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





