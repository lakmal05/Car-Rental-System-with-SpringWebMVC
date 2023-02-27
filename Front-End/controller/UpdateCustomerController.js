// getLastLoginUser();
// getAllUserData();
//
// // let baseURL = "http://localhost:8080/Back_End_war/";
//     //
//     // getLastLoginUser();
//
//
//
//
// function setCustomerDetails(customer) {
//     // $('#txtCustId').val(customer.customerId);
//     $('#txtCustId').val(customer.customerId);
//     $('#txtCustName').val(customer.name);
//     $('#txtCustAddress').val(customer.address);
//     $('#txtCusEmail').val(customer.email);
//     $('#txtCusContactNo').val(customer.contactNo);
//     $('#txtCusNIC').val(customer.nicNo);
//     $('#txtCusLicenceNo').val(customer.licenceNo);
//     $('#txtCusUsername').val(customer.username);
//     $('#txtCusPassword').val(customer.password)
// }
//
//
//
//
//
//
//
// function getLastLoginUser() {
//
//     $.ajax({
//         url: "http://localhost:8080/Back_End_war/login/getLastLogin",
//         method: "GET",
//         success: function (res) {
//             let loginData = res.data;
//             console.log(loginData);
//             getAllUserData(loginData.username, loginData.password);
//         }
//     })
//
// }
//
//
// function getAllUserData(username, password) {
//     $.ajax({
//         url: "http://localhost:8080/Back_End_war/customer/set/" + username + "/" + password,
//         method: "GET",
//         success: function (res) {
//             let customer = res.data;
//             setCustomerDetails(customer);
//             // loadMyCarRentsToTable(customer.customerId);
//         }
//     })
// }
//
//
//
//
//
//
//
//
// function updateCustomer() {
//
//
//     let customerId = $('#txtCustIdId').val();
//     let name = $('#txtCustName').val();
//     let address = $('#txtCustAddress').val();
//     let email = $('#txtCusEmail').val();
//     let contact = $('#txtCusContactNo').val();
//     let nic = $('#txtCusNIC').val();
//     let licenceNo = $('#txtCusLicenceNo').val();
//     let password =$('#txtCusPassword').val();
//
//     var customer = {
//         customerId: customerId,
//         name: name,
//         address: address,
//         contactNo: contact,
//         email: email,
//         nicNo: nic,
//         licenceNo: licenceNo,
//         password :password,
//     }
//
//     $.ajax({
//         url: baseURL + "customer",
//         method: "PUT",
//         contentType: "application/json",
//         data: JSON.stringify(customer),
//         success: function (res) {
//             getLastLoginUser();
//
//         },
//         error: function (ob) {
//
//         }
//     })
// }
//
//
//
//
//
//
//
//
// function searchCustomerById(customerId) {
//     $.ajax({
//         url: baseURL + "customer/" + customerId,
//         method: "GET",
//         success: function (res) {
//             let customer = res.data;
//             searchCarByRegNo(customer);
//         }
//     });
// }
//
// $('#btnUpdateCustomer').click(function () {
//
//     console.log("ok");
//
//     if ($('#txtCusId').val() != "") {
//         let res = confirm("Do you want to update your details?");
//         if (res) {
//             updateCustomer();
//         }
//     }
// })
//
