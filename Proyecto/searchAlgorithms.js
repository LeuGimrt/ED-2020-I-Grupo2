var list = new Array();
var data;

function getNumElementos(){
    list.length = document.getElementById('numElementos').value;
    console.log("Tamaño del arreglo: " + list.length);
}


function setList(list){
    let min = document.getElementById('min').value;
    let max = document.getElementById('max').value;
    if(max/10 < min/10)
        document.getElementById('error-1').innerHTML = "Error: Mínimo no puede ser mayor que máximo";
    else{
        document.getElementById('error-1').innerHTML = "";
        for(let index = 0; index < list.length; index++){
            list[index] = Math.floor(Math.random() * (max - min) + min);
        }
        list.sort(((a, b) => a - b));
        console.log("Elementos(Arreglo Ordenado): (" + min + "," + max + ")");
        for(index = 0; index < list.length; index++){
            console.log(list[index]);
        } 
    }
}

function binarySearch(list, data) {
    data = document.getElementById('valor-buscarB').value;
    console.log("Valor a buscar: " + data);
    let min = 0,
    max = list.length - 1;
    while (min <= max){
        console.log("Paso");
        var center = Math.floor((min+max) / 2);
        if (list[center] == data ){
            return center;
        } 
        (list[center] < data) ? min = center + 1 : max = center - 1;
    }
    return -1;
}

function linearSearch(list, data){
    data = document.getElementById('valor-buscarL').value;
    console.log("Valor a buscar: " + data);
    let i = 0;
    while(i < list.length && list[i] < data){
        console.log("Paso");
        i++;
    }

    if(i >= list.length || list[i] != data){
        return -1;
    }
    return i;
}

function quickSelect(list, left, right, data){
    list.sort();
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

    if(part == datat){
        return list[part]
    }
    else {
        (part < data) ? quickSelect(list, part+1, right, data):
        quickSelect(list, left, part-1, data);
    }
}		
