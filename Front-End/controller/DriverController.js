// let baseURL = "http://localhost:8080/Back_End_war/";


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

        },
        error: function (ob) {

        }
    });

}











