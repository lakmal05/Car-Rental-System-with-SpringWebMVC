
$(function (){
    getLastLoginUser();
})



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

function setCustomerDetails(customer) {
    $('#txtCustId').val(customer.customerId);
    $('#txtCusId').val(customer.customerId);
    $('#txtCusName').val(customer.name);
    // $('#txtCusAddress').val(customer.address);
    // $('#txtCusEmail').val(customer.email);
    // $('#txtCusContactNo').val(customer.contactNo);
    // $('#txtCusNIC').val(customer.nicNo);
    // $('#txtCusLicenceNo').val(customer.licenceNo);
    // $('#txtCusUsername').val(customer.username);
}



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
