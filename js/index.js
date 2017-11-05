$( document ).ready(function() {

    $('.alert').hide();

    $('#login-pass').keypress(function (e) {
        var key = e.which;
        if(key == 13)  // the enter key code
        {
           tryLogin();
        }
    });

});



function tryLogin(password){



    var data = {};
    data.username = $("#login-name").val();
    data.password = $("#login-pass").val();

    if(password != undefined && password != ""){
        data.password = password;
    }


    console.log(data);
    $.ajax({
        url : config.serverUrl+config.login,
        method: 'POST',
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        success : function (data){
            console.log(data);
            localStorage.nwbgInboxToken = data.token;
            localStorage.nwbgInboxUser = $("#login-name").val();

            $.ajax({
                url : config.serverUrl+config.getUser,
                method: 'GET',
                headers: {"authorization": data.token},
                success : function (data){
                   if(data == true){
                       window.location.href = "databox.html";
                   }else{
                       $('#changePasswordModal').modal();
                   }
                },
                error : function (data){
                },

            });
        },
        error : function (data){
            $('.alert').show();
        },

    });
}

function changePassword() {

    var password = $("#change-pass").val();


    $.ajax({
        url : config.serverUrl+config.changePassword+"?password="+password,
        method: 'GET',
        headers: {"authorization": localStorage.getItem('nwbgInboxToken')},
        success : function (data){
            $("#login-pass").val(password);
            tryLogin(password);
        },
        error : function (data){
            console.log("Error changing Password");
        },

    });

}

function forgotPassword() {
    $('#forgotPasswordModal').modal();
}

function sendPasswordForgottenMail(){

    var user = $("#forgot-pass").val();
    $.ajax({
        url : config.serverUrl+config.forgotPassword+"?user="+user,
        method: 'GET',
        success : function (data){
            $('#forgotPasswordModal').modal('hide');
        },
        error : function (data){
            console.log("Error sending Mail");
        },

    });

}