/*
 EN: Write a program to create a queue using arrays
which permits deletion from both the ends.

ES: Escriba un prgrama que cree una cola usando arreglos y
que permita eliminar desde ambos extremos
 */

#include <stdio.h>
#include <stdlib.h>

#define MAXCOLA 100
#define ERROR_COLA_LLENA -1
#define ERROR_COLA_VACIA -2

typedef enum{false, true}bool;

struct Cola{
	int datos[MAXCOLA];
	int tope;
}cola;

void inicializar_cola();
void destruir_cola();

bool cola_llena();
bool cola_vacia();

int encolar(int dato);
int desencolar_simple();
int desencolar_doble();

void menu();

int main(){
	menu();

	return 0;
}

void menu(){
	int dato, opc;

	printf("Menu\n1. Crear Cola\n2. Agregar Elemento\n3. Eliminar elemento FIFO\n4. Eliminar elemento LIFO\n5. Salir\n Ingrese una opcion: "); fflush(stdout);
	scanf("%d", &opc); fflush(stdin);

	switch(opc){
	case 1: inicializar_cola();
			printf("\nCola creada!"); fflush(stdout);
			break;

	case 2: printf("\nIngrese el dato a agregar: "); fflush(stdout);
			scanf("%d", &dato); fflush(stdin);
			printf("\nSe encolo el dato %d el dato en la posicion %d", dato, encolar(dato)); fflush(stdout);
			break;

	case 3: printf("\nSe desencolo el dato %d a traves del metodo FIFO", desencolar_simple());
			fflush(stdout);
			break;

	case 4: printf("\nSe desencolo el dato %d a traves del metodo LIFO", desencolar_doble());
			fflush(stdout);
			break;

	case 5: destruir_cola();
			printf("\nCola destruida!"); fflush(stdout);
			break;

	default: printf("\nDato invalido"); fflush(stdout);
			menu();
			break;

	}

	printf("\nDesea continuar?\n1. Si\n2. No\nIngrese una opcion: "); fflush(stdout);
	scanf("%d", &opc); fflush(stdin);

	if(opc == 1){
		menu();
	}

	if(opc == 2){
		printf("\nAdios");
	}
}


void inicializar_cola(){
	cola.tope = -1;
}

void destruir_cola(){
	cola.tope = -1;
}

bool cola_llena(){
	if(cola.tope == MAXCOLA - 1){
		return true;
	}

	else{
		return false;
	}
}

bool cola_vacia(){
	if(cola.tope == -1){
		return true;
	}
	else{
		return false;
	}
}

int encolar(int dato){
	if(cola_llena()){
		printf("Cola llena\n"); fflush(stdout);
		return ERROR_COLA_LLENA;
	}

	else{
		cola.datos[cola.tope+1] = dato;
		cola.tope++;
		return cola.tope;
	}
}

int desencolar_simple(){
	int dato, i=0;

	if(cola_vacia()){
		printf("Cola vacia\n"); fflush(stdout);
		return ERROR_COLA_VACIA;
	}

	else{
		dato = cola.datos[0];

		for(i=0; i<cola.tope; i++){
			cola.datos[i] = cola.datos[i+1];
		}

		cola.tope--;

		return dato;
	}
}

int desencolar_doble(){
	int dato;

	if(cola_vacia()){
		printf("Cola vacia\n"); fflush(stdout);
		return ERROR_COLA_VACIA;
	}

	else{
		dato = cola.datos[cola.tope];

		cola.tope--;

		return dato;
	}

}
