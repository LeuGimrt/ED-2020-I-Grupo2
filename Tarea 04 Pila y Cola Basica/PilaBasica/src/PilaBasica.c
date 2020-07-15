#include <stdio.h>
#include <stdlib.h>
#define MAX 30
#define ERROR_PILA_LLENA -1
#define ERROR_PILA_VACIA -2

typedef struct pila {
	int datos[MAX];
	int tope;
} pila;

pila laPila;

typedef enum { false, true } bool;

bool flag=false;

//Agregado por Cifuentes Michuy
int empilar(int elemento){
	if(laPila.tope >=100){
		printf("Pila llena\n");
		fflush(stdout);
		return ERROR_PILA_LLENA;
	}
	else{
		laPila.tope++;
		laPila.datos[laPila.tope] = elemento;
		return laPila.tope;
	}
}

int desempilar(){
	if(laPila.tope < 0){
		return ERROR_PILA_VACIA;
	}
	else{
		int elemento = laPila.datos[laPila.tope];
		laPila.tope--;
		return elemento;
	}
}

void limpiar(){
	while(laPila.tope>=0){
		desempilar();
	}
}

void mostrar(){
	printf("valores de pila: ");
	for(int i=0;i<=laPila.tope; i++){
		printf("%4d, ",laPila.datos[i]);
	}
	printf("\n");
	printf("posiciones:      ");
	for(int i=0;i<=laPila.tope; i++){
		printf("%4d, ",i);
	}
	printf("\n");

	fflush(stdout);
}
//Agregado por Cifuentes Michuy


int main(void) {



	return EXIT_SUCCESS;
}
