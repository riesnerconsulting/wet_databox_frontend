$( document ).ready(function() {

    $.ajax({
        url : config.serverUrl+config.resetPassword+getUrlParameter('uuid'),
        method: 'GET',
        headers: {"authorization": localStorage.getItem('nwbgInboxToken')},
        success : function (data){
            console.log("Reset Successfull");

        },
        error : function (data){
            console.log("Reset Unsuccessfull");
        },

    });

});



function acceptAgreement() {

        $.ajax({
        url : config.serverUrl+config.setAgreement+localStorage.getItem('nwbgInboxUser'),
        method: 'GET',
        headers: {"authorization": localStorage.getItem('nwbgInboxToken')},
        success : function (data){
            console.log("aggreement accepted");
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
