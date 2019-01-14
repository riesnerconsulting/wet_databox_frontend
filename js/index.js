$( document ).ready(function() {

    $('.alert').hide();

    // Replace Variables from Config
    $("#logo").attr("src",config.imgBasefolder + config.logo);
    $(document).attr("title", config.title);
    $('body').css('background-image', 'url(./img/'+config.backgroundImage+')');
    $('#impressum').text(config.impressumText);
    $("#impressum").attr("href",config.impressumLink);


    $('#login-pass').keypress(function (e) {
        var key = e.which;
        if(key == 13)
        {
           tryLogin();
        }
    });
    $("#login-name").val(getUrlParameter('user'));
});



function tryLogin(password){



    var data = {};
    data.username = $("#login-name").val();
    data.password = $("#login-pass").val();

    if(password != undefined && password != ""){
        data.password = password;
    }



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

                       console.log(data);
                       $.ajax({
                           url: config.serverUrl + config.getUserAggreedOnLastVersion+localStorage.getItem('nwbgInboxUser'),
                           method: 'GET',
                           headers: {"authorization": localStorage.getItem('nwbgInboxToken')},
                           success: function (data) {
                               if (data == true) {

                                   console.log(data);
                                   window.location.href = "databox.html";
                               } else {


                                   $.ajax({
                                       url: config.serverUrl + config.getLatestUserAgreement,
                                       method: 'GET',
                                       headers: {"authorization": localStorage.getItem('nwbgInboxToken')},
                                       success: function (data) {
                                           $('#userAgreementModalText').html(data.text);
                                           $('#userAgreementModalLabel').html(data.title);
                                           $('#userAgreementModal').modal();
                                       },
                                       error: function (data) {
                                           window.location.href = "index.html";
                                       },

                                   });


                               }


                           },
                           error: function (data) {
                               console.log(data);
                           },
                       });
                   }else{
                       $('#changePasswordModal').modal();
                   }
                },
                error : function (data){
                    console.log(data);
                },

            });
        },
        error : function (data){
            console.log(data);
            $('.alert').show();
        },

    });
}

function changePassword() {

    var password = $("#change-pass").val();
    var passwordCheck = $("#login-pass-check").val();

    if(/\d/.test(password) && /[a-z]/.test(password) && /[A-Z]/.test(password) && password.length > 7 && password == passwordCheck){
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
    }else{
        $("#pwd-container").append('<div class="alert alert-danger">\n' +
            '  <strong>Fehler!</strong> Bitte verwenden sie ein sicheres Passwort.\n' +
            '</div>')
    }



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
            $('.alert').text("Sie bekommen in kürze eine E-Mail von uns.")
            $('.alert').show();
        },
        error : function (data){
            console.log("Error sending Mail")
            $('#forgotPasswordModal').modal('hide');
            $('.alert').text("E-Mail Adresse nicht gefunden.")
            $('.alert').show();
        },
    });
}

function acceptAgreement() {

        $.ajax({
        url : config.serverUrl+config.setAgreement+localStorage.getItem('nwbgInboxUser'),
        method: 'GET',
        headers: {"authorization": localStorage.getItem('nwbgInboxToken')},
        success : function (data){
            window.open("databox.html", '_self');
        },
        error : function (data){
            window.location.href = "index.html";
        },

    });
}

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

function downloadPDF(){
    $.ajax({
        url: config.serverUrl + config.getLatestUserAgreement,
        method: 'GET',
        headers: {"authorization": localStorage.getItem('nwbgInboxToken')},
        success: function (data) {
            window.open("https://portal.nwbg.at/vereinbarung/"+data.url, '_blank');
        },
        error: function (data) {

        },

    });
}