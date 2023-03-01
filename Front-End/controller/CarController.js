$(function (){
    getAvailableCarCount();
    loadAllCars();
})

let baseURL = "http://localhost:8080/Back_End_war/";






function getAvailableCarCount() {
    let status = "Available";
    $.ajax({
        url: baseURL + "car/count/" + status,
        method: "GET",
        success: function (res) {
            if (res.data != 0) {
                if (res.data < 10) {
                    $('#countAvailableCars').text("0" + res.data);
                } else {
                    $('#countAvailableCars').text(res.data);
                }
            } else {
                $('#countAvailableCars').text("00");
            }
        }
    })
}




function loadAllCars() {
    $('#carTable').empty();
    $.ajax({
        url: baseURL + "car",
        method: "GET",
        success: function (res) {
            for (const car of res.data) {
                let row = `<tr><td>${car.registrationNO}</td><td>${car.brand}</td><td>${car.type}</td><td>${car.noOfPassengers}</td><td>${car.transmissionType}</td><td>${car.fuelType}</td><td>${car.color}</td><td>${car.dailyRate}</td><td>${car.monthlyRate}</td><td>${car.freeKmForPrice}</td><td>${car.freeKmForDuration}</td><td>${car.lossDamageWaiver}</td><td>${car.priceForExtraKm}</td><td>${car.completeKm}</td><td>${car.status}</td></tr>`;
                $('#carTable').append(row);
            }
            bindCarTableClickEvents();
        }
    });
}



function bindCarTableClickEvents() {
    $('#carTable>tr').click(function () {
        let regNo = $(this).children().eq(0).text();
        let brand = $(this).children().eq(1).text();
        let type = $(this).children().eq(2).text();
        let passengers = $(this).children().eq(3).text();
        let transmission = $(this).children().eq(4).text();
        let fuel = $(this).children().eq(5).text();
        let color = $(this).children().eq(6).text();
        let daily = $(this).children().eq(7).text();
        let monthly = $(this).children().eq(8).text();
        let kmForPrice = $(this).children().eq(9).text();
        let kmForDura = $(this).children().eq(10).text();
        let ldw = $(this).children().eq(11).text();
        let extraKm = $(this).children().eq(12).text();
        let completeKm = $(this).children().eq(13).text();

        // $("#saveCar").prop('disabled', true);
        // $("#updateCar").prop('disabled', false);
        // $("#delCar").prop('disabled', false);
        // $("#imgFrontView").prop('disabled', true);
        // $("#imgBackView").prop('disabled', true);
        // $("#imgSideView").prop('disabled', true);
        // $("#imgInteriorView").prop('disabled', true);

        $('#txtRegNo').val(regNo);
        $('#txtBrand').val(brand);
        $('#cmbtype').find('option:selected').text(type);
        $('#txtNoOfPassengers').val(passengers);
        $('#cmbTransmissionType').find('option:selected').text(transmission);
        $('#cmbfuel').find('option:selected').text(fuel);
        $('#cmbColor').find('option:selected').text(color);
        $('#txtDailyRate').val(daily);
        $('#txtMonthlyRate').val(monthly);
        $('#txtFreeKmForPrice').val(kmForPrice);
        $('#txtFreeKmForDuration').val(kmForDura);
        $('#txtLossDamageWaiver').val(ldw);
        $('#txtPriceForExtraKm').val(extraKm);
        $('#txtCompleteKm').val(completeKm);
    });
}




function clearAddCarFields() {
    $('#txtRegNo').val("");
    $('#txtBrand').val("");
    $('#txtNoOfPassengers').val("");
    $('#txtDailyRate').val("");
    $('#txtMonthlyRate').val("");
    $('#txtFreeKmForPrice').val("");
    $('#txtFreeKmForDuration').val("");
    $('#txtLossDamageWaiver').val("");
    $('#txtPriceForExtraKm').val("");
    $('#txtCompleteKm').val("");
    $('#imgFrontView').val("");
    $('#imgBackView').val("");
    $('#imgSideView').val("");
    $('#imgInteriorView').val("");

}




// ====================Add Car==============================================






$('#btnAddCar').click(function () {

    addCar();
});


function addCar() {

    //14 attribures
    let regNo = $('#txtRegNo').val();
    let brand = $('#txtBrand').val();
    let type = $('#cmbtype').find('option:selected').text();
    let noOfPassengers = $('#txtNoOfPassengers').val();
    let transmission = $('#cmbTransmissionType').find('option:selected').text();
    let fuel = $('#cmbfuel').find('option:selected').text();
    let color = $('#cmbColor').find('option:selected').text();
    let dailyRate = $('#txtDailyRate').val();
    let monthlyRate = $('#txtMonthlyRate').val();
    let freeKmForPrice = $('#txtFreeKmForPrice').val();
    let freeKmForDuration = $('#txtFreeKmForDuration').val();
    let lossDamageWavier = $('#txtLossDamageWaiver').val();
    let priceForExtraKm = $('#txtPriceForExtraKm').val();
    let completeKm = $('#txtCompleteKm').val();
    let status = 'Available';


    var car = {


        registrationNO: regNo,
        brand: brand,
        type: type,
        noOfPassengers: noOfPassengers,
        transmissionType: transmission,
        fuelType: fuel,
        color: color,
        dailyRate: dailyRate,
        monthlyRate: monthlyRate,
        freeKmForPrice: freeKmForPrice,
        freeKmForDuration: freeKmForDuration,
        lossDamageWaiver: lossDamageWavier,
        priceForExtraKm: priceForExtraKm,
        completeKm: completeKm,
        status: status


    }


    $.ajax({
        url: baseURL + "car",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(car),
        success: function (res) {
            uploadCarImages(regNo);
            loadAllCars();
            getAvailableCarCount();
    clearAddCarFields();

        },
        error: function (ob) {

        }
    })


}


function uploadCarImages(registrationID) {
    var fileObjectFront = $('#imgFrontView')[0].files[0];
    var fileNameFront = registrationID + "-front-" + $('#imgFrontView')[0].files[0].name;

    var fileObjectBack = $('#imgBackView')[0].files[0];
    var fileNameBack = registrationID + "-back-" + $('#imgBackView')[0].files[0].name;

    var fileObjectSide = $('#imgSideView')[0].files[0];
    var fileNameSide = registrationID + "-side-" + $('#imgSideView')[0].files[0].name;

    var fileObjectInterior = $('#imgInteriorView')[0].files[0];
    var fileNameInterior = registrationID + "-interior-" + $('#imgInteriorView')[0].files[0].name;

    var data = new FormData();
    data.append("frontImg", fileObjectFront, fileNameFront);
    data.append("backImg", fileObjectBack, fileNameBack);
    data.append("interImg", fileObjectInterior, fileNameInterior);
    data.append("sideImg", fileObjectSide, fileNameSide);

    $.ajax({
        url: baseURL + "car/up/" + registrationID,
        method: "PUT",
        async: true,
        contentType: false,
        processData: false,
        data: data,
        success: function (res) {
            console.log("Uploaded");
            // clearAddCarFields();
        }
    });
}


// ============================================================================================
$('#btnUpdateCar').click(function () {

    updateCar();


});


function updateCar() {
    let regNo = $('#txtRegNo').val();
    let brand = $('#txtBrand').val();
    let type = $('#cmbtype').find('option:selected').text();
    let noOfPassengers = $('#txtNoOfPassengers').val();
    let transmission = $('#cmbTransmissionType').find('option:selected').text();
    let fuel = $('#cmbfuel').find('option:selected').text();
    let color = $('#cmbColor').find('option:selected').text();
    let dailyRate = $('#txtDailyRate').val();
    let monthlyRate = $('#txtMonthlyRate').val();
    let freeKmForPrice = $('#txtFreeKmForPrice').val();
    let freeKmForDuration = $('#txtFreeKmForDuration').val();
    let lossDamageWavier = $('#txtLossDamageWaiver').val();
    let priceForExtraKm = $('#txtPriceForExtraKm').val();
    let completeKm = $('#txtCompleteKm').val();


    var car = {

        registrationNO: regNo,
        brand: brand,
        type: type,
        noOfPassengers: noOfPassengers,
        transmissionType: transmission,
        fuelType: fuel,
        color: color,
        dailyRate: dailyRate,
        monthlyRate: monthlyRate,
        freeKmForPrice: freeKmForPrice,
        freeKmForDuration: freeKmForDuration,
        lossDamageWaiver: lossDamageWavier,
        priceForExtraKm: priceForExtraKm,
        completeKm: completeKm,

    }
    $.ajax({

        url: baseURL + "car",
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(car),


        success: function (res) {
            loadAllCars();


        },
        error: function (ob) {

        }
    });
}


// ============================Delete Car=================================================


$('#btnDeleteCar').click(function (){

 deleteCar();
});

function deleteCar() {
    let registrationNo = $('#txtRegNo').val();
    $.ajax({
        url: baseURL + "car?registrationNo=" + registrationNo,
        method: "DELETE",
        success: function (res) {
            getAvailableCarCount();
            loadAllCars();

        },
        error: function (ob) {

        }
    })
}






