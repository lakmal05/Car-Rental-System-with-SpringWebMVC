let regLoginPassword = /^[A-z0-9@#$%&!*]{8,}$/;
let regLoginUsername = /^[A-z0-9]{6,10}$/;


let baseURL = "http://localhost:8080/Back_End_war/";








// function checkIfLoginUserFormValid() {
//     var username = $('#txtUserName').val();
//     if (regLoginUsername.test(username)) {
//         $('#txtPassword').focus();
//         var password = $('#txtPassword').val();
//         var response = regLoginPassword.test(password);
//         var type = $('#cmbUserType').find('option:selected').text();
//         if (response && type != "-Select User Type-") {
//             loginUser();
//         } else {
//             $('#txtPassword').focus();
//         }
//     } else {
//         $('#txtUserName').focus();
//     }
// }








$('#btnSignIn').click(function () {
    var userType = $('#cmbUserType').find('option:selected').text();

    if ($('#txtUserName').val() != "" && $('#txtPassword').val() != "" && userType != "-Select User Type-") {
        loginUser();
    }


});




function loginUser() {
    var username = $('#txtUserName').val();
    var password = $('#txtPassword').val();
    var userType = $('#cmbUserType').find('option:selected').text();

    console.log(userType);

    if (userType === "Admin") {
        // searchAdmin(userType, username, password);
        searchCustomer(userType, username, password);

    } else if (userType === "Customer") {
        searchCustomer(userType, username, password);
    } else if (userType === "Driver") {
        // searchDriver(userType, username, password);
    }
}

function loginSave(userType, username, password) {
    let logId = $('#txtLogId').val();
    console.log(logId);
    $.ajax({
        url: baseURL + "login",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(
            {
                loginId: logId,
                username: username,
                password: password,
                role: userType
            }
        ),
        success: function (res) {
            if (userType === "Customer") {
                location.replace("vehicle.html");

                // location.replace("AdminDashboard.html");
            } else if (userType === "Customer") {
                location.replace("vehicle.html");
            } else if (userType === "Driver") {
                // location.replace("DriverDashboard.html");
            }
            console.log("Login data saved");
        }
    })
}

$(function (){
    getNewLoginId();
});

function getNewLoginId() {
    $.ajax({
        url: baseURL + "login/generateLogId",
        method: "GET",
        success: function (res) {
            $('#txtLogId').val(res.data);
        }
    });
}

function searchCustomer(userType, username, password) {
    $.ajax({
        url: baseURL + "customer/" + username + "/" + password,
        method: "GET",
        success: function (res) {
            console.log(res.data);
            if (res.data === true) {
                loginSave(userType, username, password);
            } else {
                alert(res.message);
            }
        }
    })
}

