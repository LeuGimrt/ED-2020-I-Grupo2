/*
 ============================================================================
 Name        : Ejercicio.c
 Author      : Miguel Rodriguez
 Version     :
 Copyright   : Your copyright notice
 Description : PE.31
				Use the linked list of Question 28 and delete
				information about an existing employee.
 ============================================================================
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define ERROR_LISTA_LLENA -1
#define ERROR_LISTA_VACIA -2
#define ERROR_POSICION -3

typedef struct tipoNodo{
	struct tipoNodo* siguiente;
	char nombres[50];
	char cargo[15];
	int edad;
	float salario;
} node;

typedef struct tipoLista{
	struct tipoNodo* primerNodo;
	int tamanio;
} list;

list* crearLista();
int listaVacia(list* laLista);
void adiciona(list *list);
void mostrarLista(list* list);
int menu();
void eliminarPosicion(list* list, int pos);
void destruirLista(list *lista);

int main(){

	int opc, pos;
	list* miLista = crearLista();

	printf("\nLISTA CREADA\n");fflush(stdout);
	adiciona(miLista);
	do{
		do {
			opc = menu();

			switch(opc){
			case 0: break;
			case 1: mostrarLista(miLista); system("pause");break;
			case 2: adiciona(miLista); break;
			case 3:
				printf("\nIngrese el número del empleado que desea eliminar:\n");
				fflush(stdout);
				scanf("%d", &pos);
				eliminarPosicion(miLista,pos);
			break;
			case 4: destruirLista(miLista); break;
			default: printf("\nIngrese una opcion valida"); fflush(stdout);
			}

		}while(opc!=0 && opc!=4);

		if(opc!=0) {
			printf("\n\n==================================\n"
					"\t\tMENU\n"
					"====================================\n\n");
			printf("1) Crear Lista\n");
			printf("0) SALIR MENU\n"); fflush(stdout);
			scanf("%d", &opc);
			if(opc==1) {
				list* miLista = crearLista();
			}
		}


	} while (opc!=0);

	return 0;
}

int menu() {
	int opc;
	printf("\n\n================================\n"
			"\t\tMENU\n"
			"==================================\n\n");
	printf("1) Mostrar la lista de empleados\n");
	printf("2) Adicionar más empleados\n");
	printf("3) Eliminar información de empleados\n");
	printf("4) Destruir lista\n");
	printf("0) SALIR DE MENU\n"); fflush(stdout);
	scanf("%d",&opc);

	return opc;

}


list* crearLista(){
	list* nuevaLista = (list*)malloc(sizeof(list));
	if(nuevaLista != NULL){
		nuevaLista -> primerNodo = NULL;
		nuevaLista -> tamanio = 0;
	}
	return nuevaLista;
}


//Booleano
int listaVacia(list* laLista){
	int rtn;
	if(laLista -> tamanio == 0){
		rtn = 1;
	}
	else{
		rtn = 0;
	}
	return rtn;
}


void adiciona(list *list){
	node *nuevo, *aux;
	int resp=1, num=1;

	do {
		nuevo = (node*)malloc(sizeof(node));
		nuevo->siguiente = NULL;

		printf("\n===================================\n"
				"Ingrese los datos de los empleados\n"
				"===================================\n\n");
		printf("EMPLEADO %d\n", num);fflush(stdout);
		printf("Nombres:");fflush(stdout);scanf("%s",nuevo->nombres);
		printf("Cargo:");fflush(stdout);scanf("%s",nuevo->cargo);
		printf("Edad:");fflush(stdout);scanf("%d",&nuevo->edad);
		printf("Salario:");fflush(stdout);scanf("%f",&nuevo->salario);

		if(list->tamanio==0) {
			list->primerNodo = nuevo;
			list->tamanio++;
		} else {
			aux = list->primerNodo;

			while(aux->siguiente != NULL){
				aux = aux->siguiente;
			}

			aux->siguiente = nuevo;
			list->tamanio++;
		}

		printf("\n¿Desea continuar ingresando datos? (No=0 / Sí=1)");fflush(stdout);
		scanf("%d",&resp);
		num++;
	} while (resp!=0);
}




void eliminarPosicion(list* list, int pos){
	node *anterior, *eliminado;

	if(listaVacia(list)){
		printf("\n\nERROR: LISTA VACIA :O\n"); fflush(stdout);
	}
	else{
		if(pos>(list->tamanio) || pos <1){
			printf("\n\nERROR: POSICIÓN INCORRECTA\n"); fflush(stdout);
		}
		else{
			if(pos == 1){
				eliminado = list ->primerNodo;
				list ->primerNodo = eliminado ->siguiente;
				list ->tamanio--;
				free((void*)eliminado);
				printf("\n\nEMPLEADO %d REMOVIDO\n", pos); fflush(stdout);
			}
			else{

				anterior = list->primerNodo;
				for(int i=0 ; i<pos - 2 ; i++){
					anterior = anterior ->siguiente;
				}

				eliminado = anterior -> siguiente;
				anterior -> siguiente = eliminado -> siguiente;
				list -> tamanio--;
				free((void*) eliminado);
				printf("\n\nEMPLEADO %d REMOVIDO\n", pos); fflush(stdout);
			}
		}
	}
}

void destruirLista(list *lista){
	node *actual, *anterior;

	if(listaVacia(lista)){
		free((list*) lista);
	}
	else{
		actual = lista->primerNodo;

		while(actual != NULL){
			anterior = actual;
			actual = actual->siguiente;
			free((node*)anterior);
		}

		free((list*)lista);
	}
}

void mostrarLista(list* list){
	node *aux;

	aux = list->primerNodo;

	if(aux == NULL)
		printf("\nLista Vacia D:\n");
	else{
		for(int i=0; i < list->tamanio; i++){
			printf("\n\nEMPLEADO %d\nNombres: %s\nCargo: %s\nEdad: %d\nSalario: S/ %.2f\n\n",
					i+1,
					aux->nombres,
					aux->cargo,
					aux->edad,
					aux->salario); fflush(stdout);
			aux = aux->siguiente;
		}
	}
}

