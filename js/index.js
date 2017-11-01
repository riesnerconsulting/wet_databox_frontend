$( document ).ready(function() {

    $('.alert').hide();

});



function tryLogin(){

    var data = {};
    data.username = $("#login-name").val();
    data.password = $("#login-pass").val();


    console.log(data);
 /*   $.ajax({
        url : config.serverUrl+config.login,
        method: 'POST',
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        success : function (data){
            console.log(data);
            localStorage.nwbgInboxToken = data.token;
            window.location.href = "databox.html";


        },
        error : function (data){
            $('.alert').show();
        },

    }); */

    window.location.href = "databox.html";

}