$( document ).ready(function() {


    var url = config.serverUrl+config.loginIsValid;
    $.ajax({
        url: url,
        method: 'GET',
        contentType: 'application/json;charset=UTF-8',
        headers: {"authorization": localStorage.getItem('nwbgInboxToken')},
        success: function (data) {
            console.log(data);
        },
        error: function (data) {
            window.location.replace("index.html");
        },
    })

    oTable =  $('#table').DataTable( {
        "paging":   false,
        "ordering": false,
        "info":     false,
        "searching": true,
        "dom": 'Brt',
        "language": {
            "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/German.json"
        }
    } );



    $('#search').keyup(function(){
        oTable.search($(this).val()).draw() ;
    })


    $.ajax({
        url : config.serverUrl+config.getAllDocuments,
        method: 'GET',

        headers: {"authorization": localStorage.getItem('nwbgInboxToken')},
        success : function (data){
            console.log(data);

            for(var i = 0; i < data.length; i++) {
                var obj = data[i];

                var uploadDate = new Date(obj.uploadDate);
                var downloadDate = new Date(obj.downloadDate);

                oTable.row.add( [
                    obj.name,
                    uploadDate.customFormat( "#DD#.#MM#.#YYYY#" ),
                    downloadDate.customFormat( "#DD#.#MM#.#YYYY#" ),
                    '<button type=\"button\" class=\"btn btn-primary btn-sm btn-block\" onclick=\"downloadItem('+obj.id+')\">Download</button>'

                ] ).draw( false );
            }




        },
        error : function (data){
        },

    });







});


function downloadItem(id){


    var url = config.serverUrl+config.downloadDocument+id.toString();
    $.ajax({
        url : url,
        method: 'GET',
        contentType: 'application/json;charset=UTF-8',
        headers: {"authorization": localStorage.getItem('nwbgInboxToken')},
        success : function (data){
            window.open(data);
        },
        error : function (data){
            console.log(data);
        },

})

}

function changePassword() {

    var password = $("#change-pass").val();


    $.ajax({
        url : config.serverUrl+config.changePassword+"?password="+password,
        method: 'GET',
        headers: {"authorization": localStorage.getItem('nwbgInboxToken')},
        success : function (data){
            tryLogin(password);
        },
        error : function (data){
            console.log("Error changing Password");
        },

    });

}

function openPasswordModal() {
    $('#changePasswordModal').modal();

}

function logout() {
    localStorage.removeItem('nwbgInboxToken');
    localStorage.removeItem('nwbgInboxUser');
    window.location.replace("index.html");
}

function tryLogin(password) {




        var data = {};

        data.password = password;
        data.username = localStorage.getItem('nwbgInboxUser');

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


//*** This code is copyright 2002-2016 by Gavin Kistner, !@phrogz.net
//*** It is covered under the license viewable at http://phrogz.net/JS/_ReuseLicense.txt
Date.prototype.customFormat = function(formatString){
    var YYYY,YY,MMMM,MMM,MM,M,DDDD,DDD,DD,D,hhhh,hhh,hh,h,mm,m,ss,s,ampm,AMPM,dMod,th;
    YY = ((YYYY=this.getFullYear())+"").slice(-2);
    MM = (M=this.getMonth()+1)<10?('0'+M):M;
    MMM = (MMMM=["January","February","March","April","May","June","July","August","September","October","November","December"][M-1]).substring(0,3);
    DD = (D=this.getDate())<10?('0'+D):D;
    DDD = (DDDD=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][this.getDay()]).substring(0,3);
    th=(D>=10&&D<=20)?'th':((dMod=D%10)==1)?'st':(dMod==2)?'nd':(dMod==3)?'rd':'th';
    formatString = formatString.replace("#YYYY#",YYYY).replace("#YY#",YY).replace("#MMMM#",MMMM).replace("#MMM#",MMM).replace("#MM#",MM).replace("#M#",M).replace("#DDDD#",DDDD).replace("#DDD#",DDD).replace("#DD#",DD).replace("#D#",D).replace("#th#",th);
    h=(hhh=this.getHours());
    if (h==0) h=24;
    if (h>12) h-=12;
    hh = h<10?('0'+h):h;
    hhhh = hhh<10?('0'+hhh):hhh;
    AMPM=(ampm=hhh<12?'am':'pm').toUpperCase();
    mm=(m=this.getMinutes())<10?('0'+m):m;
    ss=(s=this.getSeconds())<10?('0'+s):s;
    return formatString.replace("#hhhh#",hhhh).replace("#hhh#",hhh).replace("#hh#",hh).replace("#h#",h).replace("#mm#",mm).replace("#m#",m).replace("#ss#",ss).replace("#s#",s).replace("#ampm#",ampm).replace("#AMPM#",AMPM);
};
