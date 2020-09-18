//++++++++++++++++++++++++++++
// B L O Q U E   1           +
//++++++++++++++++++++++++++++
//LLENADO DEL ARRAY
var list = new Array();
var data;
var valoresPermisibles = false;
var encontrado = false;

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

//++++++++++++++++++++++++++++
// B L O Q U E   2           +
//++++++++++++++++++++++++++++
//SOLO LÓGICA!!! de las búsquedas y devolverán la posición o valor (en caso de Quick) o -1 en caso no encontrar
var cont;
async function binarySearch(list, data) {   //la funcion ahora es async y devuelve objetos de tipo Promise
    let min = 0;
    let temp;
    encontrado = false;

    max = list.length - 1;
    while (min <= max){
        var center = Math.floor((min+max) / 2);
        temp = "elB" + center

        await sleep(1500);  // delay

        if (list[center] == data ){
            console.log("encontrao loko")
            document.getElementById(temp).classList.add("encontrado");
            encontrado = true;
            return;
        } else {
            document.getElementById(temp).classList.add("buscando");
        }

        if (list[center] < data) {
            min = center + 1;
            for(let i = center-1; i >= 0; i--) {
                temp = "elB" + i;
                document.getElementById(temp).classList.add("descartado");
            }
        } else {
            max = center - 1;
            for(let i = center+1; i < list.length; i++) {
                temp = "elB" + i;
                document.getElementById(temp).classList.add("descartado");
            }
        }

        //(list[center] < data) ? min = center + 1 : max = center - 1; 
        console.log(list[center]);
    }
    return;
}

async function linearSearch(list, data){
    encontrado = false;
    let i = 0;
    let temp;

    while(i < list.length && list[i] != data){

        temp = "elL" + i;

        document.getElementById(temp).classList.add("buscando");
        await sleep(500);
        i++;
    }
    
    temp = "elL" + (i);

    if(i >= list.length || list[i] != data){
        return;
    } else if (list[i] == data) {
        console.log("encontrao loko")
        document.getElementById(temp).classList.add("encontrado");
        encontrado = true;
    }
    return;
}

async function quickSelect(list, left, right, data){
    encontrado = false;
    if(data==null)
        data = prompt("Ingrese el valor a buscar: ");
        part = partition(list,left,right);

        escribirLista(list);
        await sleep(500);
    if(part == data){
        encontrado = true;
        console.log(list[part]); 
    }
    else if(part < data){
        return quickSelect(list, part+1, right, data);
    }
    else {
        return quickSelect(list, left, part-1, data);
    }
}

//Función partición para el quick
function partition(list, left, right){
    let pivot = list[right];
    let pivotLoc = left;
    for(let i = left; i<= right; i++){
        if(list[i] < pivot){
            let temp = list[i];
            list[i] = list[pivotLoc];
            list[pivotLoc] = temp;
            pivotLoc++;
        }
    }
    let aux = list[right];
    list[right] = list[pivotLoc];
    list[pivotLoc] = aux;
    return pivotLoc;
}

//++++++++++++++++++++++++++++
// B L O Q U E   3           +
//++++++++++++++++++++++++++++
//Control de las ejecuciones de cada una de las búsquedas y activación de los otros procesos
function exeBinaria(list){
    data = document.getElementById('valor-buscarB').value;
    let dataVal = validar(data);
    if(dataVal == -1){
        document.getElementById('error-2b').innerHTML = "Error: Valor a buscar vacío";
    }
    else if(dataVal == -2){
        document.getElementById('error-2b').innerHTML = "Error: Valor a buscar debe ser entero";
    }
    else if(list.length == 0){
        document.getElementById('error-2b').innerHTML = "Error: Lista Vacía";
    }
    else{
        document.getElementById('error-2b').innerHTML = "";
        console.log("Valor a buscar: " + data);
        
        //ordenamiento previo
        list.sort(((a, b) => a - b));
        escribirLista(list);
        
        //mostrar ordenamiento
        //let content = "";
        /*for (let index = 0; index < list.length - 1; index++) {
            content = content + list[index] + " -> ";
        }
        content = content  + list[list.length-1];
        document.getElementById("contenidografico-b").innerHTML = content;*/
        //fin de ordenamiento previo

        binarySearch(list, data);
        if(encontrado){
            document.getElementById('error-2b').innerHTML = "";
        }else{
            document.getElementById('error-2b').innerHTML = "El elemento no se encuentra en el arreglo";
        }
        // //escribirLista(list, Bs);
        // if(Bs == -1){
        //     document.getElementById('error-2b').innerHTML = "El elemento no se encuentra en el arreglo";
        // }
        // else{
        //     console.log("valor encontrado en: " + Bs);
        // }
    }
}

function exeLinear(list){
    data = document.getElementById('valor-buscarL').value;
    let dataVal = validar(data);
    if(dataVal == -1){
        document.getElementById('error-2l').innerHTML = "Error: Valor a buscar vacío";
    }
    else if(dataVal == -2){
        document.getElementById('error-2l').innerHTML = "Error: Valor a buscar debe ser entero";
    }
    else if(list.length == 0){
        document.getElementById('error-2l').innerHTML = "Error: Lista Vacía";
    }
    else{
        document.getElementById('error-2l').innerHTML = "";
        console.log("Valor a buscar: " + data);
        escribirLista(list);
        linearSearch(list, data);
        if(encontrado){
            document.getElementById('error-2l').innerHTML = "";
        }else{
            document.getElementById('error-2l').innerHTML = "El elemento no se encuentra en el arreglo";
        }
        //escribirLista(list, Ls);
        // if(Ls == -1){
        //     document.getElementById('error-2l').innerHTML = "El elemento no se encuentra en el arreglo";
        // }
        // else{
        //     console.log("valor encontrado en: " + Ls);
        // }
    }
}

function exeQuick(list){
    data = document.getElementById('valor-buscarQ').value;
    let dataVal = validar(data);
    if(dataVal == -1){
        document.getElementById('error-2q').innerHTML = "Error: Valor a buscar vacío";
    }
    else if(dataVal == -2){
        document.getElementById('error-2q').innerHTML = "Error: Valor a buscar debe ser entero";
    }
    else if(list.length == 0){
        document.getElementById('error-2q').innerHTML = "Error: Lista Vacía";
    } else if (data <= 0){
        document.getElementById('error-2q').innerHTML = "Error: El i-ésimo elemento mas pequeño a buscar debe ser mayor a cero";
    } else{
        dataVal = dataVal - 0;//convertir a número
        if(dataVal < 0 || dataVal >= list.length){
            document.getElementById('error-2q').innerHTML = "Error: Valor fuera de rango del arreglo";
        }else{
            document.getElementById('error-2q').innerHTML = "";
            console.log("Posicion a buscar: " + data);
            let Qs = quickSelect(list,0,list.length-1, data-1);
            //escribirLista(list,data);
            console.log("valor de posición "+ data +" es: " + Qs);
            if(encontrado){
                document.getElementById('error-2l').innerHTML = "";
            }else{
                document.getElementById('error-2l').innerHTML = "El elemento no se encuentra en el arreglo";
            }
        }
    }
}

//++++++++++++++++++++++++++++
// B L O Q U E   4           +
//++++++++++++++++++++++++++++
//Funciones auxiliares o extra
function escribirLista(list){
    if(valoresPermisibles){
        let content = "";
        let temp;

        //dependiendo de la pestaña que esté activa, almacena un string en temp cuando se llame esta funcion
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
    
        // Evalúa qué pestaña esta activa actualmente: linear, binaria o quick
        if (document.getElementById("linear-tab").classList.contains('active')) {
    
            document.getElementById("contenidografico-l").innerHTML = content;
    
        } else if (document.getElementById("binary-tab").classList.contains('active')) {
    
            document.getElementById("contenidografico-b").innerHTML = content;
    
        } else {
    
            document.getElementById("contenidografico-q").innerHTML = content;
    
        }
    }

}



// funcion de delay a lo arduino
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
