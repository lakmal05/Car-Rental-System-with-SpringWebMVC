// let baseURL = "http://localhost:8080/Back_End_war/";

$(function (){
    getAvailableDriverCount();
    loadAllDrivers();
})




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




function loadAllDrivers() {
    $('#tblRegisteredDrivers').empty();
    $.ajax({
        url: baseURL + "driver",
        method: "GET",
        success: function (res) {
            for (const driver of res.data) {
                let row = `<tr><td>${driver.licenceNo}</td><td>${driver.name}</td><td>${driver.address}</td><td>${driver.contactNo}</td><td>${driver.nicNo}</td><td>${driver.availability}</td></tr>`;
                $('#tblRegisteredDrivers').append(row);
            }
            bindRegisterDriversClickEvents();
        }
    })
}






function bindRegisterDriversClickEvents() {
    $('#tblRegisteredDrivers>tr').click(function () {
        let licenceNo = $(this).children().eq(0).text();
        findDriver(licenceNo);
        // $('#btnUpdateDriver').prop('disabled', false);
        // $('#btnDeleteDriver').prop('disabled', false);
        // $('#btnAddDriver').prop('disabled', true);
    })
}

function findDriver(licenceNo) {
    $.ajax({
        url: baseURL + "driver/" + licenceNo,
        method: "GET",
        success: function (res) {
            let driver = res.data;
            $('#txtLicenceNo').val(driver.licenceNo);
            $('#txtDriverName').val(driver.name);
            $('#txtDriverAddress').val(driver.address);
            $('#txtDriverContactNo').val(driver.contactNo);
            $('#txtDriverNICNo').val(driver.nicNo);
            $('#txtDriverUserName').val(driver.username);
            $('#txtDriverPassword').val(driver.password);
            $('#txtDriverAvailable').val(driver.availability);
        }
    })
}











// ===================Driver Add=====================================

$('#btnAddDriver').click(function (){
 console.log("clicked")
    addDriver();
});

function addDriver(){

    var licenceNo=$('#txtLicenceNo').val();
    var name=$('#txtDriverName').val();
    var address=$('#txtDriverAddress').val();
    var contact=$('#txtDriverContactNo').val();
    var nic=$('#txtDriverNICNo').val();
    var username=$('#txtDriverUserName').val();
    var password=$('#txtDriverPassword').val();
    var availability=true;


    var driver = {
        licenceNo: licenceNo,
        name: name,
        address: address,
        contactNo: contact,
        nicNo: nic,
        username: username,
        password: password,
        availability: availability
    }


    $.ajax({
        url: baseURL + "driver",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(driver),
        success: function (res) {
         loadAllDrivers();
        },
        error: function (ob) {

        }
    });
}



// ================================Update Driver===========================================================

$('#btnUpdateDriver').click(function (){
    updateDriver();
});


function updateDriver(){

    var licenceNo=$('#txtLicenceNo').val();
    var name=$('#txtName').val();
    var address=$('#txtDriverAddress').val();
    var contact=$('#txtDriverContactNo').val();
    var nic=$('#txtDriverNICNo').val();
    var username=$('#txtDriverUserName').val();
    var password=$('#txtDriverPassword').val();


    var driver ={
        licenceNo: licenceNo,
        name: name,
        address: address,
        contactNo: contact,
        nicNo: nic,
        username: username,
        password: password,

    }

    $.ajax({
        url: baseURL + "driver",
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(driver),
        success: function (res) {
            loadAllDrivers();
        },
        error: function (ob) {

        }
    });

}






// ==========================================================================================

$('#btnDeleteDriver').click(function (){
    deleteDriver();
});


function deleteDriver(){

    let licenceNo =$('#txtLicenceNo').val();

    $.ajax({
        url: baseURL + "driver?licenceNo=" + licenceNo,
        method: "DELETE",
        success: function (res) {
            loadAllDrivers();
        },
        error: function (ob) {

        }
    });

}











