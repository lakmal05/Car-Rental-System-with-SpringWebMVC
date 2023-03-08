let today = new Date().toISOString().slice(0, 10);
$('#txtCarTodayDate').val(today);

$(function () {
    loadPendingCustomers();
    loadRegisteredCustomers();
    getRegisterCustomersCount();
    loadAllMaintenances();
    loadAllUnderMaintenanceCars();
    generateMaintenanceId();
    getAvailableDriverCount();
    getOccupiedDriverCount();
    getTodayBookingsCount();
    loadTodayBookings();
    loadAllRentals();

    // loadAllCars();
    loadPendingRentals();
    loadAllAcceptedRentals();
    loadAllRentals();


    generatePaymentID();
    loadAllPayments();
    loadAllRentIdsToPaymentComboBox();

    loadAllDailyIncomes();
    loadAllAnnuallyIncomes();
    loadAllWeeklyIncomes();


})


function getToday() {
    // var date = new Date();
    // var current_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    // return current_date;

    let string = new Date().toJSON().split("T")[0];
    return string;


}

function setDates() {
    var date = new Date();
    var current_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    var current_time = date.getHours() + ":" + date.getMinutes();

    $("#lblDate").text("Date : " + current_date);
    $("#lblTime").text("Time : " + current_time);

}


function getTodayBookingsCount() {
    $.ajax({
        url: baseURL + "CarRent/countTodayBookings/" + today,
        method: "GET",
        success: function (res) {
            if (res.data != 0) {
                if (res.data < 10) {
                    $('#countBookings').text("0" + res.data);
                } else {
                    $('#countBookings').text(res.data);
                }
            } else {
                $('#countBookings').text("00");
            }
        }
    });
}

function getReservedCarsCount() {
    let status = "Non-Available";
    $.ajax({
        url: baseURL + "car/count/" + status,
        method: "GET",
        success: function (res) {
            if (res.data != 0) {
                if (res.data < 10) {
                    $('#countReservedCars').text("0" + res.data);
                } else {
                    $('#countReservedCars').text(res.data);
                }
            } else {
                $('#countReservedCars').text("00");
            }
        }
    })
}

function getAvailableDriverCount() {
    let availability = true;
    $.ajax({
        url: baseURL + "driver/count/" + availability,
        method: "GET",
        success: function (res) {
            if (res.data != 0) {
                if (res.data < 10) {
                    $('#countAvailableDrivers').text("0" + res.data);
                } else {
                    $('#countAvailableDrivers').text(res.data);
                }
            } else {
                $('#countAvailableDrivers').text("00");
            }
        }
    })
}

function getOccupiedDriverCount() {
    let availability = false;
    $.ajax({
        url: baseURL + "driver/count/" + availability,
        method: "GET",
        success: function (res) {
            if (res.data != 0) {
                if (res.data < 10) {
                    $('#countOccupiedDrivers').text("0" + res.data);
                } else {
                    $('#countOccupiedDrivers').text(res.data);
                }
            } else {
                $('#countOccupiedDrivers').text("00");
            }
        }
    })
}


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

function loadTodayBookings() {
    console.log("ok");
    $('#todayBookingTable').empty();
    $.ajax({
        url: baseURL + "CarRent/getTodayBookings/" + today,
        method: "GET",

        success: function (res) {
            for (const booking of res.data) {
                let licence;
                if (booking.driver === null) {
                    licence = "No Driver";
                } else {
                    licence = booking.driver.licenceNo;
                }

                console.log(booking)
                let row = `<tr><td>${booking.rentId}</td><td>${booking.date}</td><td>${booking.pickUpDate}</td><td>${booking.returnDate}</td><td>${booking.customer.customerId}</td><td>${booking.car.registrationNO}</td><td>${licence}</td><td>${booking.status}</td></tr>`;
                $('#todayBookingTable').append(row);
            }
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

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Customer  Accept',
                showConfirmButton: false,
                timer: 1500
            })

        }
    })
}

$('#btnRejectCustomer').click(function () {
    if ($('#txtCustomerId').val() != "") {
        let customerId = $('#txtCustomerId').val();
        rejectPendingCustomer(customerId);

        Swal.fire({
            position: 'top-end',
            icon: 'rejected',
            title: 'Customer Rejected',
            showConfirmButton: false,
            timer: 1500
        })

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


//===============================================remtal accept==========================================================================

function loadAllRentals() {
    $('#tblCarRentals').empty();
    $.ajax({
        url: baseURL + "CarRent",
        method: "GET",
        success: function (res) {
            for (const carRent of res.data) {
                let licence;
                if (carRent.driver === null) {
                    licence = "No Driver";
                } else {
                    licence = carRent.driver.licenceNo;
                }
                let row = `<tr><td>${carRent.rentId}</td><td>${carRent.date}</td><td>${carRent.pickUpDate}</td><td>${carRent.returnDate}</td><td>${carRent.car.registrationNO}</td><td>${carRent.customer.customerId}</td><td>${licence}</td><td>${carRent.status}</td></tr>`;
                $('#tblCarRentals').append(row);
            }
        }
    })
}


function loadAllAcceptedRentals() {
    let status = "Accepted";
    $('#tableCarRental').empty();
    $.ajax({
        url: baseURL + "CarRent/get/" + status,
        method: "GET",
        success: function (res) {
            for (const carRent of res.data) {
                let licence;
                if (carRent.driver === null) {
                    licence = "No Driver";
                } else {
                    licence = carRent.driver.licenceNo;
                }
                let row = `<tr><td>${carRent.rentId}</td><td>${carRent.date}</td><td>${carRent.pickUpDate}</td><td>${carRent.returnDate}</td><td>${carRent.car.registrationNO}</td><td>${carRent.customer.customerId}</td><td>${licence}</td><td>${carRent.status}</td></tr>`;
                $('#tableCarRental').append(row);
            }
        }
    })
}

function loadPendingRentals() {
    let status = "Pending";

    $('#tblCarRentalRequests').empty();
    $.ajax({
        url: baseURL+ "CarRent/get/" + status,
        method: "GET",
        success: function (res) {
            for (const carRent of res.data) {
                let licence;
                if (carRent.driver === null) {
                    licence = "No Driver";
                } else {
                    licence = carRent.driver.licenceNo;
                }
                let row = `<tr><td>${carRent.rentId}</td><td>${carRent.date}</td><td>${carRent.pickUpDate}</td><td>${carRent.returnDate}</td><td>${carRent.car.registrationNO}</td><td>${carRent.customer.customerId}</td><td>${licence}</td><td>${carRent.status}</td></tr>`;
                $('#tblCarRentalRequests').append(row);
            }
            bindCarRentalRequestTableClickEvents();
        }
    })
}

function bindCarRentalRequestTableClickEvents() {
    $('#tblCarRentalRequests>tr').click(function () {
        let rentId = $(this).children().eq(0).text();
        let date = $(this).children().eq(1).text();
        let pickupDate = $(this).children().eq(2).text();
        let returnDate = $(this).children().eq(3).text();
        let regNo = $(this).children().eq(4).text();
        let custId = $(this).children().eq(5).text();
        let licenceNo = $(this).children().eq(6).text();
        let status = $(this).children().eq(7).text();

        $('#txtRentId').val(rentId);
        $('#txtDate').val(date);
        $('#txtPickupDate').val(pickupDate);
        $('#txtReturnDate').val(returnDate);
        $('#txtCarRegistrationNo').val(regNo);
        $('#txtCusId').val(custId);
        $('#txtDLicenceNo').val(licenceNo);
        $('#txtRentalStatus').val(status);
    })
}


$('#btnRentalAccept').click(function () {
    if ($('#txtRentId').val() != "") {
        acceptRental();


    } else {
        // alert("Please select car rental");

    }
})


function acceptRental() {
    let rentId = $('#txtRentId').val();
    let status = "Accepted";

    $.ajax({
        url: baseURL + "CarRent/" + rentId + "/" + status,
        method: "PUT",
        success: function (res) {
            loadAllRentals();
            loadPendingRentals();
            loadTodayBookings();
            updateDriverStatus();
            updateCarStatus();
            loadAllAcceptedRentals();

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Rental Accept',
                showConfirmButton: false,
                timer: 1500
            })

        },
        error: function (ob) {

            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Something Went Worng Try Again',
                showConfirmButton: false,
                timer: 1500
            })

        }
    })
}


$('#btnRentalReject').click(function () {
    if ($('#txtRentId').val() != "") {
        let rentId = $('#txtRentId').val();
        rejectRentals(rentId);
    } else {
        alert("Please select car rental");
    }
})


function rejectRentals(rentId) {
    $.ajax({
        url: baseURL + "CarRent?rentId=" + rentId,
        method: "DELETE",
        success: function (res) {
            loadAllRentals();
            loadPendingRentals();
            loadTodayBookings();
            getTodayBookingsCount();

        },
        error: function (ob) {

        }
    })
}




function updateCarStatus() {
    let registrationNO = $('#txtCarRegistrationNo').val();
    let status = "Non-Available";

    $.ajax({
        url: baseURL + "car/updateCarStatus/" + registrationNO + "/" + status,
        method: "PUT",
        success: function (res) {
            loadAllCars();
            getAvailableCarCount();
            getReservedCarsCount();

            Swal.fire({
                position: 'top-end',
                icon: 'update',
                title: 'Updated',
                showConfirmButton: false,
                timer: 1500
            })

        }

    })
}

function updateDriverStatus() {
    let licenceNo = $('#txtDLicenceNo').val();

    if (licenceNo != "No Driver") {
        $.ajax({
            url: baseURL + "driver/updateNonAvailable/" + licenceNo,
            method: "PUT",
            success: function (res) {
                loadAllDrivers();
                getAvailableDriverCount();
                getOccupiedDriverCount();
            }
        })
    }
}









// =======================================Maintaincese============================================

let regRegNo= /^[A-z]{2}$/;


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
        $('#txtSearchRegistrationNo');
        return true;
    } else {
        $('#txtSearchRegistrationNo').css('border', '2px solid red');
        $('#txtSearchRegistrationNo');
        return true;
    }
}

function searchCarByRegistrationNo(registrationNo) {
    $.ajax({
        url: baseURL + "car/" + registrationNo,
        method: "GET",
        success: function (res) {
            let car = res.data;
            console.log(car,"car sucsess")
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

            Swal.fire({
                position: 'top-end',
                icon: 'question',
                title: 'Car is not available in this time',
                showConfirmButton: false,
                timer: 1500
            })
        }
    } else {
        Swal.fire({
            position: 'top-end',
            icon: 'question',
            title: 'Please select a Car',
            showConfirmButton: false,
            timer: 1500
        })
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
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Success',
                showConfirmButton: false,
                timer: 1500
            })

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

            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Somthing Went Wrong Try Again',
                showConfirmButton: false,
                timer: 1500
            })


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

            Swal.fire({
                position: 'top-end',
                icon: 'Added',
                title: 'Rental Accept',
                showConfirmButton: false,
                timer: 1500
            })

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

// $('#btnClearMaintenance').click(function () {
//     clearCarMaintenanceFields();
//     loadAllUnderMaintenanceCars();
//     loadAllMaintenances();
// });


// =========================================Payment================================================================





function generatePaymentID() {
    $.ajax({
        url: baseURL + "payment/generatePaymentId",
        method: "GET",
        success: function (res) {
            $('#inputPaymentID').val(res.data);
        }
    })
}

function loadAllPayments() {

    console.log("load All payment log")

    $('#tblPayment').empty();
    $.ajax({
        url: baseURL + "payment",
        method: "GET",
        success: function (res) {
            console.log(res)
            for (let payment of res.data) {
                let driver;
                if (payment.driverPayment === 0) {
                    driver = "No Driver";
                } else {
                    driver = payment.driverPayment;
                }
                let row = `<tr><td>${payment.paymentID}</td><td>${payment.date}</td><td>${payment.rentId.rentId}</td><td>${payment.rentPrice}</td><td>${payment.extraKM}</td><td>${payment.priseForExtraKM}</td><td>${payment.damageCharge}</td><td>${payment.returnLossDamageWaiver}</td><td>${driver}</td><td>${payment.totalPayment}</td></tr>`;
                $('#tblPayment').append(row);
            }
            bindPaymentClickEvents();
        },
        error: function (error) {
            console.log("not load")
        }
    })
}

function bindPaymentClickEvents() {
    $('#tblPayment>tr').click(function () {
        let paymentId = $(this).children().eq(0).text();
        let date = $(this).children().eq(1).text();
        let rentId = $(this).children().eq(2).text();
        let rentPrice = $(this).children().eq(3).text();
        let extraKms = $(this).children().eq(4).text();
        let priseForExtraKm = $(this).children().eq(5).text();
        let damageCharge = $(this).children().eq(6).text();
        let returnLossDamW = $(this).children().eq(7).text();
        let driverPayment = $(this).children().eq(8).text();
        let totalPayment = $(this).children().eq(9).text();

        $('#selectRentID').empty();
        $('#inputPaymentID').val(paymentId);
        $('#inputPaymentDate').val(date);
        $('#selectRentID').append(new Option(rentId));
        $('#inputRentPrice').val(rentPrice);
        $('#inputExtraKM').val(extraKms);
        $('#inputPriseForExtraKM').val(priseForExtraKm);
        $('#inputDriverPayment').val(driverPayment);
        $('#inputTotalPayment').val(totalPayment);
        $('#inputDamageCharge').val(damageCharge);
        $('#inputReturnLossDamageWaiver').val(returnLossDamW);

        $('#btnPaymentPayed').prop("disabled", true);
    });
}

function clearPaymentFields() {
    $('#inputPaymentID').val("");
    $('#inputPaymentDate').val("");
    $('#inputRentPrice').val("");
    $('#inputExtraKM').val("");
    $('#inputPriseForExtraKM').val("");
    $('#inputDriverPayment').val("");
    $('#inputTotalPayment').val("");
    $('#inputDamageCharge').val("");
    $('#inputReturnLossDamageWaiver').val("");
    $('#inputPaymentSearch').val("");

    loadAllRentIdsToPaymentComboBox();
    generatePaymentID();

    $('#btnPaymentPayed').prop("disabled", false);
}

$("#btnRefreshPayment").click(function () {
    clearPaymentFields();
})

$("#btnSearchPayment").click(function () {
    let paymentID = $('#inputPaymentSearch').val();

    $.ajax({
        url: baseURL + "payment/" + paymentID,
        method: "GET",
        success: function (res) {
            let payment = res.data;

            $('#selectRentID').empty();
            $('#inputPaymentID').val(payment.paymentID);
            $('#inputPaymentDate').val(payment.date);
            $('#selectRentID').append(new Option(payment.rentID));
            $('#inputRentPrice').val(payment.rentPrice);
            $('#inputExtraKM').val(payment.extraKM);
            $('#inputPriseForExtraKM').val(payment.priseForExtraKM);
            $('#inputDriverPayment').val(payment.driverPayment);
            $('#inputTotalPayment').val(payment.totalPayment);
            $('#inputDamageCharge').val(payment.damageCharge);
            $('#inputReturnLossDamageWaiver').val(payment.returnLossDamageWaiver);

            $('#btnPaymentPayed').prop("disabled", true);
        },
        error: function (error) {
            let errorReason = JSON.parse(error.responseText);
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: "Payment " + paymentID + " Not Exist...",
                showConfirmButton: false,
                timer: 1500
            });
        }
    });
});

$("#inputPaymentDate").val(getToday());

function loadAllRentIdsToPaymentComboBox() {
    $('#selectRentID').empty();
    $('#selectRentID').append(new Option("-Select RentID-"));
    $.ajax({
        url: baseURL + "CarRent",
        method: "GET",
        success: function (resp) {
            let i = 0;
            for (let rent of resp.data) {
                $('#selectRentID').append(new Option(rent.rentId, i));
                i++;
            }
        }
    });
}

$('#selectRentID').change(function () {
    let rentID = $('#selectRentID').find('option:selected').text();
    $.ajax({
        url: baseURL + "CarRent/" + rentID,
        method: "GET",
        success: function (res) {

            let rent = res.data;
            calculateTotalRentDates(rent);

        },
        error: function (error) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: "This Rent Is Not Exist...",
                showConfirmButton: false,
                timer: 1500
            });
        }
    })
})

function calculateTotalRentDates(carRent) {

    var pickupDate = new Date(carRent.pickUpDate);
    var day = new Date(carRent.returnDate)
    var differenceInTime = day.getTime() - pickupDate.getTime();
    var differenceIndays = differenceInTime / (1000 * 3600 * 24);
    console.log("date difference : " + differenceIndays);
    console.log(carRent)
    searchCarDailyRate(carRent.car.registrationNO, differenceIndays);
}

function searchCarDailyRate(registrationNo, days) {
    $.ajax({
        url: baseURL + "car/" + registrationNo,
        method: "GET",
        success: function (res) {
            let car = res.data;
            let dailyRate = car.dailyRate;
            let cost = dailyRate * days;
            console.log("cost : " + cost)
            $('#inputRentPrice').val(cost);
        }
    })
}

$('#inputExtraKM').on('keyup', function (event) {
    if (event.key === "Enter") {
        if ($('#inputExtraKM').val() != "") {
            let extraKMs = $('#inputExtraKM').val();
            calculatePriceForExtraKMs(extraKMs);
        } else {
            $('#inputExtraKM').focus();
        }
    }
})

function calculatePriceForExtraKMs(extraKMs) {
    let rentID = $('#selectRentID').find('option:selected').text();
    $.ajax({
        url: baseURL + "CarRent/" + rentID,
        method: "GET",
        success: function (res) {
            let rent = res.data;
            let pricePerExtraKM = rent.car.priceForExtraKm;
            let costForExtraKMs = extraKMs * pricePerExtraKM;
            $('#inputPriseForExtraKM').val(costForExtraKMs);
        },
        error: function (error) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: "This Rent Is Not Exist...",
                showConfirmButton: false,
                timer: 1500
            });
        }
    })
}

$('#inputDamageCharge').on('keyup', function (event) {
    if (event.key === "Enter") {
        if ($('#inputDamageCharge').val() != "") {
            let damageCharge = $('#inputDamageCharge').val();
            calculateReturnLossDamageWaiver(damageCharge);
        } else {
            $('#inputDamageCharge').focus();
        }
    }
})

function calculateReturnLossDamageWaiver(damageCharge) {
    let rentID = $('#selectRentID').find('option:selected').text();
    $.ajax({
        url: baseURL + "CarRent/" + rentID,
        method: "GET",
        success: function (res) {
            let rent = res.data;
            let lossDamageWaiver = rent.lossDamageWaiver;
            let returnLossDamageWaiver = lossDamageWaiver - damageCharge;
            $('#inputReturnLossDamageWaiver').val(returnLossDamageWaiver);
        },
        error: function (error) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: "This Rent Is Not Exist...",
                showConfirmButton: false,
                timer: 1500
            });
        }
    })
}

$('#inputDriverPayment').on('keyup', function (event) {
    if (event.key === "Enter") {
        if ($('#inputDriverPayment').val() != "") {
            let driverPayment = $('#inputDriverPayment').val();
            calculateTotalPayment(driverPayment);
        } else {
            $('#inputDriverPayment').focus();
        }
    }
})

function calculateTotalPayment(driverCost) {
    let rp = $('#inputRentPrice').val();
    let ppekms = $('#inputPriseForExtraKM').val();

    let driverPayment = parseFloat(driverCost);
    let rentPrice = parseFloat(rp);
    let priceForExtraKMs = parseFloat(ppekms);

    let totalPayment = driverPayment + rentPrice + priceForExtraKMs;
    $('#inputTotalPayment').val(totalPayment);
}

$("#btnPaymentPayed").click(function () {
    submitPayment();
});

function submitPayment() {
    let rentId = $('#selectRentID').find('option:selected').text();
    if (rentId != null) {
        searchCarRentForPayment(rentId);
    }
}

function searchCarRentForPayment(rentId) {
    $.ajax({
        url: baseURL + "CarRent/" + rentId,
        method: "GET",
        success: function (res) {
            let carRent = res.data;
            console.log(carRent);
            addPayment(carRent);
        }
    })
}

function addPayment(carRent) {

    let paymentId = $('#inputPaymentID').val();
    let date = getToday().toLocaleString();
    let rentPrice = $('#inputRentPrice').val();
    let extraKMs = $('#inputExtraKM').val();
    let priceForEctraKMs = $('#inputPriseForExtraKM').val();
    let driverPayment = $('#inputDriverPayment').val();
    let totalPayment = $('#inputTotalPayment').val();
    let damageCharge = $('#inputDamageCharge').val();
    let returnLossDamage = $('#inputReturnLossDamageWaiver').val();


    var payment = {
        paymentID: paymentId,
        date: date,
        damageCharge: damageCharge,
        returnLossDamageWaiver: returnLossDamage,
        rentPrice: rentPrice,
        extraKM: extraKMs,
        priseForExtraKM: priceForEctraKMs,
        driverPayment: driverPayment,
        totalPayment: totalPayment,
        rentId: carRent,
    }

    $.ajax({
        url: baseURL + "payment",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(payment),
        success: function (res) {
            console.log("Success");
            generatePaymentID();
            updateCarRentFinished(carRent.rentId);
            updateCStatus(carRent.car.registrationNO);
            if (carRent.driver != null) {
                updateDStatus(carRent.driver.licenceNo);
            }
            loadAllPayments();
            clearPaymentFields();

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: "Payment Saved To The System Successfully",
                showConfirmButton: false,
                timer: 1500
            });
        },
        error: function (error) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: "Unsuccessfully",
                showConfirmButton: false,
                timer: 1500
            });
        }
    })
}

function updateCarRentFinished(rentId) {
    let status = "Finished";

    $.ajax({
        url: baseURL + "CarRent/" + rentId + "/" + status,
        method: "PUT",
        success: function (res) {
            console.log("rent status updated");
            loadAllRentals();
            loadTodayBookings();
        },
        error: function (error) {
            console.log("rent status not updated");
        }
    })
}

function updateCStatus(registrationNO) {
    let status = "Available";

    $.ajax({
        url: baseURL + "car/updateCarStatus/" + registrationNO + "/" + status,
        method: "PUT",
        success: function (res) {
            getAvailableCarCount();
            getReservedCarsCount();
            loadAllCars();
        }
    })
}

function updateDStatus(driverID) {

    $.ajax({
        url: baseURL + "driver/updateAvailable/" + driverID,
        method: "PUT",
        success: function (res) {
            getAvailableDriverCount();
            loadAllDrivers();
        }
    })
}



// ==============================Incoem Reports=============================================
loadAllMonthlyIncomes();

function loadAllDailyIncomes() {
    $('#tblDailyIncome').empty();
    $.ajax({
        url: baseURL + "payment/dailyIncome",
        method: "GET",
        success: function (res) {
            for (const income of res.data) {
                console.log(income);
                let row = `<tr><td>${income.date}</td><td>${income.totalPayment}</td></tr>`;
                $('#tblDailyIncome').append(row);
            }
        }
    })
}

function loadAllWeeklyIncomes() {
    $('#tblWeeklyIncome').empty();
    $.ajax({
        url: baseURL + "payment/weeklyIncome",
        method: "GET",
        success: function (res) {
            for (const income of res.data) {
                console.log(income,"income");
                let row = `<tr><td>${income.rentPrice}</td><td>${income.totalPayment}</td></tr>`;
                $('#tblWeeklyIncome').append(row);
            }
        }
    })
}

function loadAllMonthlyIncomes() {
    $('#tblMonthlyIncome').empty();
    $.ajax({
        url: baseURL + "payment/monthlyIncome",
        method: "GET",
        success: function (res) {
            for (const income of res.data) {
                console.log(income);
                let row = `<tr><td>${income.paymentID}</td><td>${income.totalPayment}</td></tr>`;
                $('#tblMonthlyIncome').append(row);
            }
        }
    })
}

function loadAllAnnuallyIncomes() {
    $('#tblAnnuallyIncome').empty();
    $.ajax({
        url: baseURL + "payment/yearlyIncome",
        method: "GET",
        success: function (res) {
            for (const income of res.data) {
                console.log(income);
                let row = `<tr><td>${income.rentPrice}</td><td>${income.totalPayment}</td></tr>`;
                $('#tblAnnuallyIncome').append(row);
            }
        }
    })
}




