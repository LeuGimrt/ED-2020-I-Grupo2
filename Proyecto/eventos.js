//BOTON DE LLENAR ARREGLO
document.getElementById("botonLlenar").addEventListener("click",getNumElementos);
document.getElementById("botonLlenar").addEventListener("click",function(){setList(list)});
document.getElementById("botonLlenar").addEventListener("click",function(){escribirLista(list)});

//BOTON DE BUSQUEDA BINARIA
document.getElementById("botonBin").addEventListener("click",function(){exeBinaria(list)});

//BOTON DE BUSQUEDA BINARIA
document.getElementById("botonLin").addEventListener("click",function(){exeLinear(list)});

//BOTON DE BUSQUEDA BINARIA
document.getElementById("botonQui").addEventListener("click",function(){exeQuick(list)});

//ZOOM IN
document.getElementById("zoom-in-icon").addEventListener("click",zoomIn);

//ZOOM OUT
document.getElementById("zoom-out-icon").addEventListener("click",zoomOut);

//INSERCIÓN DE VALORES
document.getElementById("insertar-boton").addEventListener("click",insercion);