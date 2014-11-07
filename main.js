$(document).ready(function (){
  $("#btnFam").click(function(){
    alert("FAMILIA");
  });

  $("#btnNuevo").click(function(){
    carga('nuevo.html', 'miapp');
  });

  $("#btnArbol").click(function(){
    retornarArbol('#miapp', 4);
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

/* Retorna arbol en cuadricula de col columnas en contenedor id*/
function retornarArbol(id, col)
{
    $(id).html = '';
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
    /* alert(jqXHR.responseText) */
      alert("error occurred!");
    });
}

function nuevaCaja(nombre, apellidos, i, col) {

  var rect = new joint.shapes.basic.Rect({
    position: { x: 50+((i%col)*160), y: 30 + (Math.trunc(i/col)*65) },
    size: { width: 150, height: 60 },
    attrs: { rect: { fill: 'white' }, text: { text: nombre + "\n" +apellidos, fill: 'black' } }
  });

  return rect;
}
/* FIN Retorna arbol en cuadricula */