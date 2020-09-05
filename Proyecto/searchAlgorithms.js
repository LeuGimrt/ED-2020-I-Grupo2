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

function quickSelect(list, left, right, k){
    let pivot;
    if(left == right){
        return list[left];
    }    
    pivot = (list, left, right) => {
        let i;
        let j;
        let x;
        let t;
        for(j=left; j<=right; j++){
            if(list[j] <= x){
                t = list[i];
                list[i] = list[j];
                list[j] = t;
                i++;
            }
        }
        t = list[i];
        list[i] = list[right];
        list[right] = t;
        return i;
    }

    if(k == pivot){
        right = pivot - 1;
    }
    else {
        left = pivot + 1;
    }
}	
