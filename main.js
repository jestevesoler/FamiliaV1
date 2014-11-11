$(document).ready(function (){
  $("#btnFam").click(function(){
    crearTabla('#miapp');
  });

  $("#btnNuevo").click(function(){
    carga('nuevo.html', 'miapp');

        $("#miapp").dialog({
            width: 590,
            height: 350,
            show: "scale",
            hide: "scale",
            resizable: "false",
            position: "center",
            modal: "true"
        });


  });

  $("#btnArbol").click(function(){
    crearArbol('#miapp', 4);
  });

  $("#btnBuscar").click(function(){
    iniciaBusqueda('#opciones');
  });

});

/* Carga url en contenedor id*/
function carga(url,id){
var pagecnx = createXMLHttpRequest();
pagecnx.onreadystatechange=function(){
  if (pagecnx.readyState == 4 &&
     (pagecnx.status==200 || window.location.href.indexOf("http")==-1))
	 document.getElementById(id).innerHTML=pagecnx.responseText;
  }
  pagecnx.open('GET',url,true)
  pagecnx.send(null)
}

function createXMLHttpRequest(){
var xmlHttp=null;
if (window.ActiveXObject) xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
else if (window.XMLHttpRequest)
	     xmlHttp = new XMLHttpRequest();
return xmlHttp;
}
/* FIN carga url en contenedor*/

/* Crea arbol en cuadricula de col columnas en contenedor id*/
function crearArbol(id, col)
{
    $(id).html("");
    var graph = new joint.dia.Graph;
    /*Fondo para graficos*/
    var paper = new joint.dia.Paper({
        el: $(id),
       // width: 800,
        //height: 200,
        model: graph
    });
    var i = 0;


    $.ajaxSetup({ cache: false });
    $.getJSON("Personas.json", function(data){

       $.each(data, function(index, d){
          graph.addCells([nuevaCaja(d.Nombre, d.Apellidos, i, col, d.id)]);
          i++;
        });
    }).error(function(jqXHR, textStatus, errorThrown){ /* assign handler */
      alert("ERROR!");
    });

  /*  $.ajaxSetup({ cache: false });
    $.getJSON("relaciones.json", function(data){
       $.each(data, function(index, d){
        var link = matrimonio($("g[model-id='p"+ d.P1 +"']"), $("g[model-id='p"+ d.P2 +"']"));
        graph.addCells([link]);
        });
    }).error(function(jqXHR, textStatus, errorThrown){
      alert("ERROR!");
    });*/
}

function nuevaCaja(nombre, apellidos, i, col, id) {

  var rect = new joint.shapes.basic.Rect({
    id : "p"+id,
    position: { x: 50+((i%col)*160), y: 30 + (Math.trunc(i/col)*65) },
    size: { width: 150, height: 60 },
    attrs: { rect: { fill: 'white' }, text: { text: nombre + "\n" +apellidos, fill: 'gray' } }
  });

  return rect;
}

/* Casa a dos personas en el arbol*/
function matrimonio(p1, p2)
{
  var link = new joint.dia.Link({
        source: {  id : p1.attr("id") },
        target: {  id : p2.attr("id") }
    });

    return link;
}
/* FIN Casa a dos personas en el arbol*/

/* Afilia a dos personas en el arbol*/
function filiacion(p1, p2)
{

  var link = new joint.dia.Link({
        source: { id: p1.attr("id") },
        target: { id: p2.attr("id") }
    });

    return link;
}
/* FIN Afilia a dos personas en el arbol*/

/* Crear tabla con familia*/
function crearTabla(id)
{
  var htmlString = "";

  $.getJSON("Personas.json", function(data){
      htmlString = "<table class=\"tablesorter\" id=\"familia\">";
      htmlString = htmlString + '<thead> <tr> <th scope=\"col\"> Nombre </th><th scope=\"col\"> Apellidos </th><th scope=\"col\"> F.Nac </th><th scope=\"col\"> F.Dec </th><th scope=\"col\"> De </th></tr></thead> <tbody> ';
      $.each(data, function(index, d){

          htmlString = htmlString + "<tr><td class=\"nombre\">"+d.Nombre+"</td>";
          htmlString = htmlString + "<td class=\"apellidos\">"+d.Apellidos+"</td>";
          htmlString = htmlString + "<td>"+d.FNac+"</td>";
          htmlString = htmlString + "<td>"+d.FDec+"</td>";
          htmlString = htmlString + "<td class=\"de\">"+d.De+"</td>";
          htmlString = htmlString + "</tr>";
        });
      htmlString = htmlString + "</tbody></table>";
      //htmlString = htmlString + "</tbody></table> <script>$('table').filterTable(inputSelector: \'#input-filter\'); </script>";
      $( id ).html( htmlString );
      $("#familia").tablesorter({headerTemplate: '{content}{icon}'});
      $("#familia").filterTable({inputSelector: '#input-filter'});
    }).error(function(jqXHR, textStatus, errorThrown){ /* assign handler */
      alert("ERROR!");
    });

}

/* FIN crear tabla con familia*/

/* Busqueda */
function iniciaBusqueda(id)
{
  $(id).html("<label id=\"icon\" for=\"name\"><i  class=\"icon-search\"></i></label><input id=\"input-filter\" type=\"search\"></input>");
  crearTabla('#miapp');

}




/* FIN Busqueda */



