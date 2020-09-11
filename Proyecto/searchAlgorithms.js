//++++++++++++++++++++++++++++
// B L O Q U E   1           +
//++++++++++++++++++++++++++++
//LLENADO DEL ARRAY
var list = new Array();
var data;

function validar(entrada){
    if(entrada == ""){
        return -1;//-1 = vacío
    }
    else if(entrada % 1 != 0){
        return -2;//-2 = valor no entero
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
    }
    else{
        list.length = tamañoVal;
        console.log("Tamaño del arreglo: " + list.length);
    }
}

function setList(list){
    let min = document.getElementById('min').value;
    let max = document.getElementById('max').value;

    let minVal = validar(min);
    let maxVal = validar(max);

    if(minVal == -1 || maxVal == -1){
        document.getElementById('error-1').innerHTML = "Error: Campos incompletos";
    }
    else if(minVal == -2 || maxVal == -2){
        document.getElementById('error-1').innerHTML = "Error: Campos deben ser enteros";
    }
    else{
        maxVal = maxVal - 0; //para convertir a tipo numerico
        minVal = minVal - 0 ;
        if(maxVal <= minVal){
            document.getElementById('error-1').innerHTML = "Error: Mínimo no puede ser mayor ni igual que máximo";
        }
        else{
            document.getElementById('error-1').innerHTML = "";
            for(let index = 0; index < list.length; index++){
                list[index] = Math.floor(Math.random()*(maxVal-minVal+1)+min);
            }
            console.log("Elementos: (" + min + "," + max + ")");
            for(index = 0; index < list.length; index++){
                console.log(list[index]);
            } 
        }
    }
}
//++++++++++++++++++++++++++++
// B L O Q U E   2           +
//++++++++++++++++++++++++++++
//SOLO LÓGICA!!! de las búsquedas y devolverán la posición o valor (en caso de Quick) o -1 en caso no encontrar
var cont;
function binarySearch(list, data) {
    let min = 0,
    max = list.length - 1;
    while (min <= max){
        var center = Math.floor((min+max) / 2);
        if (list[center] == data ){
            return center;
        } 
        (list[center] < data) ? min = center + 1 : max = center - 1; 
        console.log(list[center]);
    }
    return -1;
}

function linearSearch(list, data){
    let i = 0;
    while(i < list.length && list[i] < data){
        i++;
    }

    if(i >= list.length || list[i] != data){
        return -1;
    }
    return i;
}

function quickSelect(list, left, right, data){
    if(data==null)
        data = prompt("Ingrese el valor a buscar: ");
    
    part= (list, left, right) => {
        let i;
        let pivot = list[right];
        let pivotLoc = left;
        let aux;
        let aux2;
        for(i=left; i<=right; i++){
            if(list[i] <= pivot){
                aux = list[i];
                list[i] = list[pivotLoc];
                list[pivotLoc] = aux;
                pivotLoc++;
            }
        }
        aux2 = list[right];
        list[right] = list[pivotLoc];
        list[pivotLoc] = aux2;
        return pivotLoc;
    }
    if(part == data){
        return list[part]
    }
    else {
        (part < data) ? quickSelect(list, part+1, right, data):
        quickSelect(list, left, part-1, data);
    }
    return 1;
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
        
        //mostrar ordenamiento
        //let content = "";
        /*for (let index = 0; index < list.length - 1; index++) {
            content = content + list[index] + " -> ";
        }
        content = content  + list[list.length-1];
        document.getElementById("contenidografico-b").innerHTML = content;*/
        //fin de ordenamiento previo

        let Bs = binarySearch(list, data);
        escribirLista(list, Bs);
        if(Bs == -1){
            document.getElementById('error-2b').innerHTML = "El elemento no se encuentra en el arreglo";
        }
        else{
            console.log("valor encontrado en: " + Bs);
        }
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
        let Ls = linearSearch(list, data);
        escribirLista(list, Ls);
        if(Ls == -1){
            document.getElementById('error-2l').innerHTML = "El elemento no se encuentra en el arreglo";
        }
        else{
            console.log("valor encontrado en: " + Ls);
        }
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
    }
    else{
        dataVal = dataVal - 0;//convertir a número
        if(dataVal < 0 || dataVal >= list.length){
            document.getElementById('error-2q').innerHTML = "Error: Valor fuera de rango del arreglo";
        }else{
            document.getElementById('error-2q').innerHTML = "";
            console.log("Posicion a buscar: " + data);
            let Qs = quickSelect(list,0,list.length-1, data);
            escribirLista(list, search);
            console.log("valor de posición "+ data +" es: " + Qs);
        }
    }
}

//++++++++++++++++++++++++++++
// B L O Q U E   4           +
//++++++++++++++++++++++++++++
//Funciones auxiliares o extra
function escribirLista(list, search){
    let content = "";
    for (let index = 0; index < list.length - 1; index++) {
        if(search == index)
            content = content + "<div class=\"col-2 cuadro-encontrado\">" +  list[index] + "</div>";
        else
        content = content + "<div class=\"col-2 cuadro\">" +  list[index] + "</div>";
    }
    if(search == list.length-1)
    content = content + "<div class=\"col-2 cuadro-encontrado\">" + list[list.length-1] + "</div>";
    else
    content = content + "<div class=\"col-2 cuadro\">" + list[list.length-1] + "</div>";

    document.getElementById("contenidografico-b").innerHTML = content;
    document.getElementById("contenidografico-l").innerHTML = content;
    document.getElementById("contenidografico-q").innerHTML = content;
}
