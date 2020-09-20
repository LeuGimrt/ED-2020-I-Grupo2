//++++++++++++++++++++++++++++
//     LLENADO DE LISTA      +
//++++++++++++++++++++++++++++
function validar(entrada){
    if(entrada == ""){
        return -1;//-1 = vacío
    }
    else if(entrada % 1 != 0){
        return -2;//-2 = valor no entero
    }
    else if(entrada<0){
        return -3;
    }
    else{
        return entrada;
    }
}

function getNumElementos(){
    let tamaño = document.getElementById('numElementos').value;
    let tamañoVal = validar(tamaño);
    tamañoVal = tamañoVal - 0; // conversion a numero
    if(tamañoVal == -1){
        document.getElementById('error-1').innerHTML = "Error: Campo de tamaño vacío";
    }
    else if(tamañoVal == -2){
        document.getElementById('error-1').innerHTML = "Error: Tamaño no entero";
    }
    else if(tamañoVal<= 0){
        document.getElementById('error-1').innerHTML = "Error: Tamaño negativo o 0";
        valoresPermisibles = false;
    }
    else{
        list.length = tamañoVal;
        console.log("Tamaño del arreglo: " + list.length);
    }
}

function setList(list){
    
    valoresPermisibles = false;

    let min = document.getElementById('min').value;
    let max = document.getElementById('max').value;

    let minVal = validar(min);
    let maxVal = validar(max);

    if(minVal == -1 || maxVal == -1){
        document.getElementById('error-1').innerHTML = "Error: Campos incompletos";
    }
    else if(minVal == -2 || maxVal == -2){
        document.getElementById('error-1').innerHTML = "Error: Campos deben ser enteros";
    }else if(list.length <= 0){
        document.getElementById('error-1').innerHTML = "Error: Tamaño negativo o 0";
    }
    else{
        maxVal = maxVal - 0; //para convertir a tipo numerico
        minVal = minVal - 0 ;
        if(maxVal <= minVal){
            document.getElementById('error-1').innerHTML = "Error: Mínimo no puede ser mayor ni igual que máximo";
        }
        else{
            document.getElementById('error-1').innerHTML = "";

            // Guardando en list los valores random generados
            for(let index = 0; index < list.length; index++){
                list[index] = Math.floor(Math.random()*(maxVal-minVal+1)+minVal);
            }
            console.log("Elementos: (" + min + "," + max + ")");
            for(index = 0; index < list.length; index++){
                console.log(list[index]);
            }
            valoresPermisibles = true; 
        }
    }
}

function escribirLista(list){
    if(valoresPermisibles){
        let content = "";
        let temp;
    
        if (document.getElementById("linear-tab").classList.contains('active')) {
            temp = "elL"
        } else if (document.getElementById("binary-tab").classList.contains('active')) {
            temp = "elB"
        } else {
            temp = "elQ"
        }
    
        for (let index = 0; index < list.length - 1; index++) {
            content = content + "<div class=\"cuadro\" id=\""+ temp + index +"\">" +  list[index] + "<br><small>" + index + "</small></div>";
        }
       
        content = content + "<div class=\"cuadro\" id=\""+ temp + (list.length-1) +"\">" + list[list.length-1] + "<br><small>" + (list.length-1) + "</small></div>";
    
        // Evalúa qué pestaña esta activa actualmente: linear, binaria y quick
        if (document.getElementById("linear-tab").classList.contains('active')) {
    
            document.getElementById("contenidografico-l").innerHTML = content;
    
        } else if (document.getElementById("binary-tab").classList.contains('active')) {
    
            document.getElementById("contenidografico-b").innerHTML = content;
    
        } else {
    
            document.getElementById("contenidografico-q").innerHTML = content;
    
        }
    }

}
//++++++++++++++++++++++++++++
//           ZOOM            +
//++++++++++++++++++++++++++++
function zoomIn(){
    if(zoom < 100){
        zoom = zoom + 10;
        zoomTxt = zoomTxt + 10;
       console.log("zoom: " + zoom); 
    }
    evaluarZoom();
}

function zoomOut(){
    if(zoom > 60){
        zoom = zoom - 10;
        zoomTxt = zoomTxt - 10;
        console.log("zoom: " + zoom);
    }
    evaluarZoom();
}

function evaluarZoom(){
    if(zoom == 100){
        document.getElementById("zoom-in-icon").classList.add("zoom-blocked");
    }else{
        document.getElementById("zoom-in-icon").classList.remove("zoom-blocked");
    }
    if(zoom == 60){
        document.getElementById("zoom-out-icon").classList.add("zoom-blocked");
    }else{
        document.getElementById("zoom-out-icon").classList.remove("zoom-blocked");
    }

    let cuadros = document.getElementsByClassName("cuadro");
    let n = list.length;
    for (let index = n-1; index >= 0 ; index--) {
        cuadros[index].style.width = zoom + "px";
        cuadros[index].style.height = zoom + "px";
        cuadros[index].style.fontSize = zoomTxt + "px";
    }
}
//++++++++++++++++++++++++++++
//       ANIMACIÓN           +
//++++++++++++++++++++++++++++
function obtenerDelay() {
    delay = document.getElementById('delay').value;
    //console.log(delay);
    return delay;
}

function msgEncontrado(encontrado, tipo) {
    let msg = '';

    msg = ( encontrado ) ? 'Valor encontrado' : 'Valor NO encontrado' ;

    if (tipo == 'b')
        errorB.innerHTML = msg;
    else if (tipo == 'l')
        errorL.innerHTML = msg;
}

// funcion de delay a lo arduino
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}