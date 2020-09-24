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
var tInicio;
var tFinal;

//++++++++++++++++++++++++++++
//      B L O Q U E   2      +
//++++++++++++++++++++++++++++
//SOLO LÓGICA!!! de las búsquedas y devolverán la posición o valor (en caso de Quick) o -1 en caso no encontrar
var cont;
async function binarySearch(list, data) {   //la funcion ahora es async y devuelve objetos de tipo Promise
    //inicializar contador
    tInicio = performance.now(), output = 0;
    /////////////
     output = 0; 
    let min = 0;
    let temp;

    max = list.length - 1;
    while (min <= max){
        var center = Math.floor((min+max) / 2);
        temp = "elB" + center;
        state('Comparando con el término medio: '+list[center]+' = '+data,2,'b');

        await sleep(obtenerDelay());  // delay

        if (list[center] == data ){
            console.log("encontrado en: " + center);
            animar(temp, "encontrado");

            msgEncontrado(true, 'b');
            state('Encontrado en posición: ' + center, 0, 'b');
            return;
        } else {
            state('Comparando con el término medio: '+list[center]+' = '+data,1,'b');   
            animar(temp, "buscando");
        }
        await sleep(obtenerDelay());

        if (list[center] < data) {

            state(data + " > " + list[center],0,'b');
            
            await sleep(obtenerDelay());

            min = center + 1;
            for(let i = center-1; i >= 0; i--) {
                temp = "elB" + i;
                animar(temp, "descartado");
            }
        } else {

            state(data + " < " + list[center],0,'b');
            
            await sleep(obtenerDelay());

            max = center - 1;
            for(let i = center+1; i < list.length; i++) {
                temp = "elB" + i;
                animar(temp, "descartado");
            }
        }

    }

    for(let i = 0; i < list.length; i++) {
        temp = "elB" + i;
        animar(temp, "descartado");
    }
    state('Valor no encontrado', 1, 'b');
    msgEncontrado(false, 'b');
    return;
}

async function linearSearch(list, data){
    //inicializar contador
    tInicio = performance.now(), output = 0;
    /////////////
    let i = 0;
    let temp;

    while(i < list.length && list[i] != data){

        temp = "elL" + i;
        state('Comprobando: ' + list[i] + ' = ' + data, 2, 'l');
        animar(temp, "buscando");
        await sleep(obtenerDelay());
        
        
        i++;
    }
    
    temp = "elL" + (i);

    if(i >= list.length){
        msgEncontrado(false, 'l');
        state('Valor no encontrado', 1, 'l');
        return;
    } else{
        state('Comprobando: ' + list[i] + ' = ' + data, 0, 'l');
        await sleep(obtenerDelay());
        state('Encontrado en posición: ' + i, 0, 'l');
        animar(temp, "encontrado")
        msgEncontrado(true, 'l');
    }
    return;
}

async function quickSelect(list, left, right, data){
    //inicializar contador
    tInicio = performance.now(), output = 0;
    /////////////

        let pivot = list[right];
        let temp = "elQ" + right;

        document.getElementById(temp).classList.add("pivote");

        let pivotLoc = left;
        for(let i = left; i < right; i++){
            let temp1 = "elQ" + i;
            let temps = "elQs" + pivotLoc;
            document.getElementById(temp1).classList.add("buscando");
            document.getElementById(temps).classList.add("pivotLoc");
            await sleep(obtenerDelay());

            state('Comparando: ' + list[i] + ' < ' + pivot, 2, 'q');
            
            if(list[i] < pivot){
                
                let aux = list[i];
                list[i] = list[pivotLoc];
                list[pivotLoc] = aux;

                animarCambio (i, pivotLoc);

                await sleep(obtenerDelay());


                pivotLoc++;
            }
            escribirLista(list);

            //if (left - 1 !=0) {
                for(let i = left-1; i >= 0; i--) {
                    animar("elQ" + i, "descartado");
                }
            //}

            //if (right+1 != list.length -1) {
                for(let i = right+1; i < list.length; i++) {
                    animar("elQ" + i, "descartado");
                }
            //}
            

            document.getElementById(temp).classList.add("pivote");
            
        }
        document.getElementById(temp).classList.remove("pivote");
        let aux = list[right];
        list[right] = list[pivotLoc];
        list[pivotLoc] = aux;

        let part = pivotLoc;
        await sleep(obtenerDelay());
    animarCambio (pivotLoc, right);
    await sleep(obtenerDelay());
    escribirLista(list);

        //escribirLista(list);
    if(part == data){
        posiQuick = true;
        let temp = "elQ" + part;
        await sleep(obtenerDelay());

        animar(temp, "encontrado");
        state('Elemento encontrado: ' + list[part], 0, 'q');
        console.log("la wea es " + list[part]);
        return;
        
    }
    else if(part < data){
        //descartar los elementos menores de part
        for(let i = part; i >= 0; i--) {
            temp = "elQ" + i;
            animar(temp, "descartado");
        }

        return quickSelect(list, part+1, right, data);
    }
    else {
        //descartar mayores a part

        for(let i = part; i < list.length; i++) {
            temp = "elQ" + i;
            animar(temp, "descartado");
        }

        return quickSelect(list, left, part-1, data);
    }
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
            state('Elemento fuera del rango', 1, 'q');
        }else{
            document.getElementById('error-2q').innerHTML = "";
            console.log("Posicion a buscar: " + data);

            escribirLista(list);
            quickSelect(list,0,list.length-1, data);

        }
    }
}
