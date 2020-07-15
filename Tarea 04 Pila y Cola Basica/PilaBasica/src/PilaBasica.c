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

void inicializarPila () {
	laPila.tope = -1;
}

bool pilaLlena(){
	if(laPila.tope == (MAX - 1)){
		flag=true;
		return true;
	} else {
		return false;
	}
}

bool pilaVacia(){
	if(laPila.tope == -1) {
		flag = true;
		return true;
	} else {
		return false;
	}
}

int tope () {
	if (pilaVacia()) {
		printf("\n ERROR: Pila vacia al accesar D:!!");
		return (ERROR_PILA_VACIA);
	} else {
		return laPila.datos[laPila.tope];
	}
}

int menu() {
	int opc;
	printf("\n========================\n\n"
					"\tMENU\n"
			"\n========================\n\n"
			"1) Ingresar datos a la pila\n"
			"2) Extraer datos de la pila\n"
			"3) Limpiar pila\n"
			"4) Mostrar pila\n"
			"5) SALIR\n"
			"\nIngrese una opción:"); fflush(stdout);
	scanf("%d",&opc);
	return opc;
}

void evaluarOpc(int opc){
	int dato, retornado;


	switch(opc){
		case 1:
			printf("Ingrese el dato a insertar:\n");fflush(stdout);
			scanf("%d",&dato);
			retornado = empilar(dato);
		break;

		case 2:
			retornado = desempilar();
		break;
		case 3:
			limpiar();
			printf("\nPILA LIMPIADA");fflush(stdout);system("pause");
			break;
		case 4: mostrar(); system("pause"); break;
		case 5: printf("\n\nPROGRAMA TERMINADO\n");break;
		default:
			printf("\nIngrese una opcion valida\n");
			fflush(stdout);
			system("pause");
	}

	if (flag) {
		if (retornado==-1) {
			printf("\nERROR: La pila esta llena D:!!!\n");fflush(stdout);
		} else{
			printf("\nERROR: La pila esta vacia D:!!!\n");fflush(stdout);
		}
	} else {
		if (opc == 1) {
			printf("\nEl tope de la pila es ahora: %d\n\n", retornado); fflush(stdout);system("pause");
		}
		if (opc == 2) {
			printf("\nEl elemento retirado es: %d\n\n", retornado); fflush(stdout);system("pause");
		}
	}
}




int main(void) {


	int opc;

	inicializarPila();

	do {
		flag = false;
		opc = menu();

		evaluarOpc(opc);
	} while (opc != 5);




	return EXIT_SUCCESS;
}

