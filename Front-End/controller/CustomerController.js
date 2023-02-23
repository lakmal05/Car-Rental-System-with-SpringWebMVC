let baseURL = "http://localhost:8080/Back_End_war/";


$("#inputUserType").change(function () {

    var userType = $('#inputUserType').find('option:selected').text();

    if (userType === "Customer") {
        generateCustomerId();
    }

})


function addCustomer() {

    let id = $('#txtCustomerID').val();
    let name = $('#txtName').val();
    let address = $('#txtCustomerAddress').val();
    let contactNo = $('#txtCustomerContact').val();
    let email = $('#txtCustomerEmail').val();
    let nic = $('#txtCustomerNic').val();
    let drivingLicense = $('#txtCustomerDrivingLicenseNo').val();
    let userName = $('#txtCustomerUserName').val();
    let password = $('#txtCustomerPassword').val();


    var customer = {

        customerId: id,
        name: name,
        address: address,
        contactNo: contactNo,
        email: email,
        nicNo: nic,
        licenceNo: drivingLicense,
        username: userName,
        password: password,
    }

    $.ajax({
        url: baseURL + "customer",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(customer),

        success: function (resp) {
            uploadCustomerImages(id);
            //alert
        },
        error: function (ob) {
            //error alert

        }
    });

}


function uploadCustomerImages(id) {
    var fileObjectNic1 = $('#inputCustomerNicImgFront')[0].files[0];
    var fileNameNic1 = id + "-nicfront-" + $('#inputCustomerNicImgFront')[0].files[0].name;

    var fileObjectNic2 = $('#inputCustomerNicImgBack')[0].files[0];
    var fileNameNic2 = id + "-nicback-" + $('#inputCustomerNicImgBack')[0].files[0].name;

    var fileObjectLicence = $('#inputCustomerDrivingLicenseImg')[0].files[0];
    var fileNameLicence = id + "-licence-" + $('#inputCustomerDrivingLicenseImg')[0].files[0].name;


    var data = new FormData();
    data.append("nicf", fileObjectNic1, fileNameNic1);
    data.append("nicb", fileObjectNic2, fileNameNic2);
    data.append("licenceImg", fileObjectLicence, fileNameLicence);


    $.ajax({

        url: baseURL + "customer/up/" + id,
        method: "PUT",
        async: true,
        contentType: false,
        processData: false,
        data: data,

        success: function (res) {
            console.log("uploaded");
            clearCustomerTextFields();
            //alert
        },
        error: function (ob) {
            //error alert
        }
    });

}


function clearCustomerTextFields() {

    $('#txtCustomerID').val("");
    $('#txtName').val("");
    $('#txtCustomerAddress').val("");
    $('#txtCustomerContact').val("");
    $('#txtCustomerEmail').val("");
    $('#txtCustomerNic').val("");
    $('#txtCustomerDrivingLicenseNo').val("");
    $('#txtCustomerUserName').val("");
    $('#txtCustomerPassword').val("");


}


function generateCustomerId() {
    $.ajax({
        url: baseURL + "customer/generateCustomerId",
        method: "GET",
        success: function (res) {
            $('#txtCustomerID').val(res.data);
        }
    })
}


$("#btnRegister").click(function () {

    if ($('#inputUserType').val() === "Customer") {

        let res = confirm("add cstomer ?");
        if (res) {
            addCustomer();

        }
    }


    //ko isuue e

    // customer register wena ek sir
})









