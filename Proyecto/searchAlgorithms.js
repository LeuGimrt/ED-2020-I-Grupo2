var list = new Array();
var data;

function setList(list){
    let arr = prompt("Ingrese el numero de elementos del arreglo: ")
    for(let index = 0; index < arr; index++){
        list[index] = prompt("Ingrese el elemento " + index + " del arreglo");
    }
    
    for(index = 0; index < arr; index++){
        console.log(list[index]);
    }      
}

function binarySearch(list, data) {
    list.sort();
    data = prompt("Ingrese el valor a buscar: ");
    console.log(data);
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
    list.sort();
    data = prompt("Ingrese el valor a buscar: ");
    console.log(data);
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
