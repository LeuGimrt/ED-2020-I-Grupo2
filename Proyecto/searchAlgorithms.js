//++++++++++++++++++++++++++++
// VARIABLES    GLOBALES     +
//++++++++++++++++++++++++++++
//LLENADO DEL ARRAY
var list = new Array();
var data;
var valoresPermisibles = false;
var listCopia = new Array();
var errorB = document.querySelector('#error-2b');
var errorL = document.querySelector('#error-2l');
var errorQ = document.querySelector('#error-2q');

var posiQuick = false;
var zoom = 80;
var zoomTxt = 35;

//++++++++++++++++++++++++++++
//      B L O Q U E   2      +
//++++++++++++++++++++++++++++
//SOLO LÓGICA!!! de las búsquedas y devolverán la posición o valor (en caso de Quick) o -1 en caso no encontrar
var cont;
async function binarySearch(list, data) {   //la funcion ahora es async y devuelve objetos de tipo Promise
    let min = 0;
    let temp;

    max = list.length - 1;
    while (min <= max){
        var center = Math.floor((min+max) / 2);
        temp = "elB" + center

        await sleep(obtenerDelay());  // delay

        if (list[center] == data ){
            console.log("encontrado en: " + center);
            animar(temp, "encontrado");

            msgEncontrado(true, 'b');
            return;
        } else {
            animar(temp, "buscando");
        }
        await sleep(obtenerDelay());

        if (list[center] < data) {
            min = center + 1;
            for(let i = center-1; i >= 0; i--) {
                temp = "elB" + i;
                animar(temp, "descartado");
            }
        } else {
            max = center - 1;
            for(let i = center+1; i < list.length; i++) {
                temp = "elB" + i;
                animar(temp, "descartado");
            }
        }

    }

    msgEncontrado(false, 'b');
    return;
}

async function linearSearch(list, data){
    let i = 0;
    let temp;

    while(i < list.length && list[i] != data){

        temp = "elL" + i;
        await sleep(obtenerDelay());
        animar(temp, "buscando");
        
        i++;
    }
    
    temp = "elL" + (i);

    if(i >= list.length || list[i] != data){
        msgEncontrado(false, 'l');
        return;
    } else if (list[i] == data) {
        await sleep(obtenerDelay());
        animar(temp, "encontrado")
        msgEncontrado(true, 'l');
    }
    return;
}

function quickSelect(list, left, right, data){
    if(data==null)
        data = prompt("Ingrese el valor a buscar: ");
        part = partition(list,left,right);
    
    if(part == data){
        posiQuick = true;
        return list[part]
        
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
//     B L O Q U E   3       +
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
        
        escribirLista(list);

        binarySearch(list, data);
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

            listCopia.length = list.length;

            /////////ESTABLECER CUADRADOS NORMALES////////////
            for (let index = 0; index < list.length; index++) {
                document.getElementById("elQ" + index).classList.remove("encontrado");
            }
            ///////////////////////////////

            /////////COPIAR VALORES////////////
            for (let index = 0; index < listCopia.length; index++) {
                listCopia[index] = list[index];
            }
            ///////////////////////////////
            
            let Qs = quickSelect(list,0,list.length-1, data);

            console.log("valor de posición "+ data +" es: " + Qs);
            if(posiQuick){
                document.getElementById('error-2q').innerHTML = "";
                //////////////////////////////////
                let indice = 0;
                while(listCopia[indice] != Qs){
                    indice++;
                }
                document.getElementById("elQ" + indice).classList.add("encontrado");
                ///////////REESTABLECER VALORES DE LA LISTA////////

                for (let index = 0; index < listCopia.length; index++) {
                    list[index] = listCopia[index];
                }

            }else{
                document.getElementById('error-2q').innerHTML = "El elemento no se encuentra en el arreglo";
            }
        }
    }
}
