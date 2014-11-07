$(document).ready(function (){
  $("#btnFam").click(function(){
    crearTabla('#miapp');
  });

  $("#btnNuevo").click(function(){
    carga('nuevo.html', 'miapp');
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
          graph.addCells([nuevaCaja(d.Nombre, d.Apellidos, i, col)]);
          i++;
        });

    }).error(function(jqXHR, textStatus, errorThrown){ /* assign handler */
      alert("ERROR!");
    });
}

function nuevaCaja(nombre, apellidos, i, col) {

  var rect = new joint.shapes.basic.Rect({
    position: { x: 50+((i%col)*160), y: 30 + (Math.trunc(i/col)*65) },
    size: { width: 150, height: 60 },
    attrs: { rect: { fill: 'white' }, text: { text: nombre + "\n" +apellidos, fill: 'gray' } }
  });

  return rect;
}
/* FIN Retorna arbol en cuadricula */

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
      htmlString = htmlString + "</tbody> </table>";
      $( id ).html( htmlString );
      $("#familia").tablesorter({headerTemplate: '{content}{icon}'});
    }).error(function(jqXHR, textStatus, errorThrown){ /* assign handler */
      alert("ERROR!");
    });

}

/* FIN crear tabla con familia*/

/* Busqueda */
function iniciaBusqueda(id)
{
  $(id).html("<form id=\"fbuscar\"> <input id=\"edbuscar\" class=\"text\"> </form>");
  crearTabla('#miapp');
  $("#edbuscar").keyup(function(){
    filtrarTabla($("#edbuscar").val());
  });
}

function filtrarTabla(textobus)
{
  $("#familia tr").hide();
  $("#familia th").show();

  $("#familia tr td.nombre").not(":Contains('"+(textobus).toUpperCase()+"')").parent().show();
}


/* FIN Busqueda */

