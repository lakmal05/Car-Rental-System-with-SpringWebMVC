

let baseURL = "http://localhost:8080/Back_End_war/";

getLastLogUser();
loadDriverSchedule();
getAllDriverData();

function getLastLogUser() {

    // console.log("getLast USER")
    $.ajax({
        url: "http://localhost:8080/Back_End_war/login/getLastLogin",
        method: "GET",
        success: function (res) {
            let login = res.data;
            console.log(login.loginId);
            getAllDriverData(login.username, login.password);
        }
    })
}

function getAllDriverData(username, password) {
    $.ajax({
        url: "http://localhost:8080/Back_End_war/driver/set/" + username + "/" + password,
        method: "GET",
        success: function (res) {
            let driver = res.data;
            console.log(driver);
            loadDriverSchedule(driver.licenceNo);
        }
    })
}

function loadDriverSchedule(licenceNo) {
    $('#bookingScheduleTable').empty();
    let status = "Accepted";
    $.ajax({
        url:"http://localhost:8080/Back_End_war/CarRent/getCarRents/" + status + "/" + licenceNo,
        method:"GET",
        success:function (res) {
            console.log("invoked")
            for (let carRent of res.data) {
                console.log(carRent)
                let row = `<tr><td>${carRent.customerId.customerId}</td><td>${carRent.customerId.name}</td><td>${carRent.customerId.contactNo}</td><td>${carRent.rentId}</td><td>${carRent.registrationNO}</td><td>${carRent.pickUpDate}</td><td>${carRent.returnDate}</td></tr>`;
                $('#bookingScheduleTable').append(row);
            }
        }
    })
}