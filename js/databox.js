$( document ).ready(function() {

    oTable =  $('#example').DataTable( {
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
        console.log("test");
        oTable.search($(this).val()).draw() ;
    })


    $(".dataTables_filter").hide();

});


function downloadItem(){

    window.open('pdf1.pdf');

}