$(function (){
    loadPendingCustomers();
    loadRegisteredCustomers();
    getRegisterCustomersCount();
    loadAllMaintenances();
    loadAllUnderMaintenanceCars();
    generateMaintenanceId();

})






function getRegisterCustomersCount() {
    $.ajax({
        url: baseURL + "customer/count",
        method: "GET",
        success: function (res) {

            if (res.data != 0) {
                if (res.data < 10) {
                    $('#countCust').text("0" + res.data);
                } else {
                    $('#countCust').text(res.data);
                }
            } else {
                $('#countCust').text("00");
            }

        }
    })
}



function loadPendingCustomers() {
    $('#tblPendingCustomers').empty();
    $.ajax({
        url: baseURL + "customer/pending",
        method: "GET",
        success: function (res) {
            for (const customer of res.data) {
                let row = `<tr><td>${customer.customerId}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.contactNo}</td><td>${customer.email}</td><td>${customer.nicNo}</td><td>${customer.licenceNo}</td><td>${customer.status}</td></tr>`;
                $('#tblPendingCustomers').append(row);
            }
            bindPendingCustomerTblClickEvents();
        }
    })
}



function bindPendingCustomerTblClickEvents() {
    $('#tblPendingCustomers>tr').click(function () {
        let id = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let address = $(this).children().eq(2).text();
        let contact = $(this).children().eq(3).text();
        let email = $(this).children().eq(4).text();
        let nic = $(this).children().eq(5).text();
        let licence = $(this).children().eq(6).text();

        $('#txtCustomerId').val(id);
        $('#txtCustomerName').val(name);
        $('#txtCustomerAddress').val(address);
        $('#txtCustomerContactNo').val(contact);
        $('#txtCustomerEmail').val(email);
        $('#txtCustomerNICNo').val(nic);
        $('#txtCustomerLicenceNo').val(licence);

        searchAndLoadCustomerImgs(id);

    });
}


function searchAndLoadCustomerImgs(id) {
    $('#divNICFrontView').empty();
    $('#divNICBackView').empty();
    $('#divLicenceImg').empty();

    $.ajax({
        url: baseURL + "customer/" + id,
        method: "GET",
        success: function (res) {
            let customer = res.data;


            let nicFrontPath = customer.nicFrontImg;
            let nicFrontImg = nicFrontPath.split("D:\\Easy-Car-Rental-Company-master\\Front-End\\assets\\saveImages\\Customers\\")[1];
            let nicFrontImgSrc = "assets\\saveImages\\Customers\\" + nicFrontImg;
            console.log(nicFrontImgSrc);

            let nicBackPath = customer.nicBackImg;
            let nicBackImg = nicBackPath.split("D:\\Easy-Car-Rental-Company-master\\Front-End\\assets\\saveImages\\Customers\\")[1];
            let nicBackImgSrc = "assets\\saveImages\\Customers\\" + nicBackImg;

            let licencePath = customer.licenceImg;
            let licenceImg = licencePath.split("D:\\Easy-Car-Rental-Company-master\\Front-End\\assets\\saveImages\\Customers\\")[1];
            let licenceImgSrc = "assets\\saveImages\\Customers\\" + licenceImg;

            let nicfImg = `<img src=${nicFrontImgSrc} alt="NIC Front" style="background-size: cover;width: 100%;height: 100%">`;
            $('#divNICFrontView').append(nicfImg);

            let nicbImg = `<img src=${nicBackImgSrc} alt="NIC Back" style="background-size: cover;width: 100%;height: 100%">`;
            $('#divNICBackView').append(nicbImg);

            let licImg = `<img src=${licenceImgSrc} alt="Licence" style="background-size: cover;width: 100%;height: 100%">`;
            $('#divLicenceImg').append(licImg);
        }
    })
}



$('#btnAcceptCustomer').click(function () {
    if ($('#txtCustomerId').val() != "") {
        let id = $('#txtCustomerId').val();
        acceptCustomer(id);
        // clearCustomerFields();
    } else {

    }
});
function acceptCustomer(id) {
    $.ajax({
        url: baseURL + "customer/updateStatus/" + id,
        method: "PUT",
        success: function (res) {
            console.log(res.massage);
            loadPendingCustomers();
            getRegisterCustomersCount();
            loadRegisteredCustomers();

        }
    })
}

$('#btnRejectCustomer').click(function () {
    if ($('#txtCustomerId').val() != "") {
        let customerId = $('#txtCustomerId').val();
        rejectPendingCustomer(customerId);
    } else {

    }
});


function rejectPendingCustomer(id) {
    $.ajax({
        url: baseURL + "customer?id=" + id,
        method: "DELETE",
        success: function (res) {
            loadPendingCustomers();

        }
    })
}


function loadRegisteredCustomers() {
    $('#tblRegisteredCustomers').empty();
    $.ajax({
        url: baseURL + "customer/accepted",
        method: "GET",
        success: function (res) {
            for (const customer of res.data) {
                console.log(customer.status);
                let row = `<tr><td>${customer.customerId}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.contactNo}</td><td>${customer.email}</td><td>${customer.nicNo}</td><td>${customer.licenceNo}</td><td>${customer.status}</td></tr>`;
                $('#tblRegisteredCustomers').append(row);
            }
        }
    })
}





// =======================================Maintaincese============================================



function generateMaintenanceId() {
    $.ajax({
        url: baseURL + "maintenance/generateMaintenanceId",
        method: "GET",
        success: function (res) {
            $('#txtMaintenanceId').val(res.data);
        }
    })
}





$('#txtSearchRegistrationNo').on('keyup', function (event) {
    checkSearchRegNo();
    if (event.key === "Enter") {
        if (regRegNo.test($('#txtSearchRegistrationNo').val())) {
            searchCarByRegistrationNo($('#txtSearchRegistrationNo').val());
        }
    }
})

function checkSearchRegNo() {
    let regNo = $('#txtSearchRegistrationNo').val();
    if (regRegNo.test(regNo)) {
        $('#txtSearchRegistrationNo').css('border', '2px solid green');
        return true;
    } else {
        $('#txtSearchRegistrationNo').css('border', '2px solid red');
        return false;
    }
}

function searchCarByRegistrationNo(registrationNo) {
    $.ajax({
        url: baseURL + "car/" + registrationNo,
        method: "GET",
        success: function (res) {
            let car = res.data;
            $('#txtSearchBrand').val(car.brand);
            $('#txtSearchType').val(car.type);
            $('#txtSearchTransmission').val(car.transmissionType);
            $('#txtSearchColor').val(car.color);
            $('#txtSearchStatus').val(car.status);
        }
    })
}

$('#btnAddToMaintenance').click(function () {
    if ($('#txtSearchRegistrationNo').val() != "") {
        if ($('#txtSearchStatus').val() != "Non-Available") {
            let registrationNo = $('#txtSearchRegistrationNo').val();
            addToMaintenance(registrationNo);
        } else {
            alert("Car is not available in this time.")
        }
    } else {
        alert("Please select a car");
    }
})

function addToMaintenance(registrationNo) {
    let status = "Under Maintenance";
    $.ajax({
        url: baseURL + "car/updateCarStatus/" + registrationNo + "/" + status,
        method: "PUT",
        success: function (res) {
            loadAllCars();
            clearCarMaintenanceFields();
            getAvailableCarCount();
            getReservedCarsCount();
            loadAllUnderMaintenanceCars();
            swal({
                title: "Confirmation!",
                text: "Car add to maintenance",
                icon: "success",
                button: "Close",
                timer: 2000
            });
        }
    })
}

function clearCarMaintenanceFields() {
    $('#txtSearchRegistrationNo').val("");
    $('#txtSearchBrand').val("");
    $('#txtSearchType').val("");
    $('#txtSearchTransmission').val("");
    $('#txtSearchColor').val("");
    $('#txtSearchStatus').val("");
    $('#txtSearchRegistrationNo');
}


function loadAllUnderMaintenanceCars() {
    let status = "Under Maintenance";

    $('#tblCarUnderMaintenance').empty();
    $.ajax({
        url: baseURL + "car/getByStatus/" + status,
        method: "GET",
        success: function (res) {
            for (let car of res.data) {
                let row = `<tr><td>${car.registrationNO}</td><td>${car.brand}</td><td>${car.type}</td><td>${car.noOfPassengers}</td><td>${car.transmissionType}</td><td>${car.fuelType}</td><td>${car.color}</td><td>${car.dailyRate}</td><td>${car.monthlyRate}</td><td>${car.freeKmForPrice}</td><td>${car.freeKmForDuration}</td><td>${car.lossDamageWaiver}</td><td>${car.priceForExtraKm}</td><td>${car.completeKm}</td><td>${car.status}</td></tr>`;
                $('#tblCarUnderMaintenance').append(row);
            }
        }
    })
}

function loadAllMaintenances() {
    $('#tblAllMaintenances').empty();

    $.ajax({
        url: baseURL + "maintenance",
        method: "GET",
        success: function (res) {
            for (let maintenance of res.data) {
                let row = `<tr><td>${maintenance.maintenanceId}</td><td>${maintenance.car.registrationNO}</td><td>${maintenance.date}</td><td>${maintenance.details}</td><td>${maintenance.cost}</td></tr>`;
                $('#tblAllMaintenances').append(row);
            }
        }
    })
}

$('#txtCarRegNo').on('keyup', function (event) {
    checkCarRegNo();
    if (event.key === "Enter") {
        if (regRegNo.test($('#txtCarRegNo').val())) {
            $('#txtCost').focus();
        } else {
            $('#txtCarRegNo').focus();
        }
    }
})

function checkCarRegNo() {
    let regNo = $('#txtCarRegNo').val();
    if (regRegNo.test(regNo)) {
        $('#txtCarRegNo').css('border', '2px solid green');
        return true;
    } else {
        $('#txtCarRegNo').css('border', '2px solid red');
        return false;
    }
}

$('#txtCost').on('keyup', function (event) {
    checkCarMaintenanceCost();
    if (event.key === "Enter") {
        if (regDailyRate.test($('#txtCost').val())) {
            $('#txtMaintenanceDetails').focus();
        } else {
            $('#txtCost').focus();
        }
    }
})

function checkCarMaintenanceCost() {
    let cost = $('#txtCost').val();
    if (regDailyRate.test(cost)) {
        $('#txtCost').css('border', '2px solid green');
        return true;
    } else {
        $('#txtCost').css('border', '2px solid red');
        return false;
    }
}

$('#txtMaintenanceDetails').on('keyup', function (event) {
    checkCarMaintenanceDetails();
})

function checkCarMaintenanceDetails() {
    let details = $('#txtMaintenanceDetails').val();
    if (regDetails.test(details)) {
        $('#txtMaintenanceDetails');
        return true;
    } else {
        $('#txtMaintenanceDetails');
        return false;
    }
}

$('#btnMaintenancePaid').click(function () {
    if ($('#txtCarRegNo').val() != "" && $('#txtCost').val() != "" && $('#txtMaintenanceDetails').val() != "") {
        searchMaintenanceCar();
    } else {
        alert("Please fill all fields...")
    }
})

function searchMaintenanceCar() {
    let registrationNo = $('#txtCarRegNo').val();

    $.ajax({
        url: baseURL + "car/" + registrationNo,
        method: "GET",
        success: function (res) {
            let car = res.data;
            console.log(car);
            addPaymentToMaintenance(car);

        }
    })
}

function addPaymentToMaintenance(car) {
    let maintenanceId = $('#txtMaintenanceId').val();
    let today = $('#txtToday').val();
    let cost = $('#txtCost').val();
    let maintenanceDetails = $('#txtMaintenanceDetails').val();

    var maintenance = {
        maintenanceId: maintenanceId,
        date: today,
        details: maintenanceDetails,
        car: car,
        cost: cost
    }

    $.ajax({
        url: baseURL + "maintenance",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(maintenance),
        success: function (res) {
            updateCarStatusToAvailable(car.registrationNO);
        }
    })
}

function updateCarStatusToAvailable(registrationNo) {
    let status = "Available";

    $.ajax({
        url: baseURL + "updateCarStatus/" + registrationNo + "/" + status,
        method: "PUT",
        success: function (res) {
            getAvailableCarCount();
            loadAllCars();
            loadAllUnderMaintenanceCars();
            loadAllMaintenances();
            generateMaintenanceId();
            clearPaidFields();


        }
    })
}

// function clearPaidFields() {
//     $('#txtCarRegNo').val("");
//     $('#txtCost').val("");
//     $('#txtMaintenanceDetails').val("");
//     $('#txtCarRegNo').css('border', '1px solid #ced4da');
//     $('#txtCost').css('border', '1px solid #ced4da');
//     $('#txtMaintenanceDetails').css('border', '1px solid #ced4da');
// }

$('#btnClearMaintenance').click(function () {
    clearCarMaintenanceFields();
    loadAllUnderMaintenanceCars();
    loadAllMaintenances();
})






