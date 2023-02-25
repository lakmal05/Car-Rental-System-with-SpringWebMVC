$(function (){
    loadPendingCustomers();
    loadRegisteredCustomers();
    getRegisterCustomersCount();

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












