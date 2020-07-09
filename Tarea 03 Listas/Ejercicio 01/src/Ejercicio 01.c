/*
 ============================================================================
 Name        : Ejercicio.c
 Author      : Edward
 Version     :
 Copyright   : Your copyright notice
 Description : Removes all nodes that have duplicate information.
 ============================================================================
 */
#include <stdio.h>
#include <stdlib.h>

#define ERROR_LISTA_LLENA -1
#define ERROR_LISTA_VACIA -2
#define ERROR_POSICION -3

// Structure that simulates the boolean data type
typedef enum bool {
	false ,true
} bool;

// Structure node
typedef struct tipoNodo{
	struct tipoNodo* siguiente;
	int dato;
} node;

// Structure list
typedef struct tipoLista{
	struct tipoNodo* primerNodo;
	int tamanio;
} list;

// Methods for implement a list
list* crearLista();
bool listaVacia(list* laLista);
int aniadirInicio(list* laLista, int elemento);
int aniadirPosicion(list* laLista, int elemento, int pos);
int aniadir(list* laLista, int elemento);
int retirarInicio(list* laLista);
int retirarPosicion(list* laLista, int pos);
int eliminarInicio(list* laLista);
void mostrarLista(list* laLista);
void destruirLista(list* laLista);
bool existeElemento(list* laLista, int elemento);
list* eliminarRepetido(list* laLista);

// Main method
int main(){

	list* miLista = crearLista();
		int num;

		scanf("%d",&num);
		fflush(stdin);
		aniadir(miLista,num);

		scanf("%d",&num);
		fflush(stdin);
		aniadir(miLista,num);

		scanf("%d",&num);
		fflush(stdin);
		aniadir(miLista,num);

		scanf("%d",&num);
		fflush(stdin);
		aniadir(miLista,num);

		scanf("%d",&num);
		fflush(stdin);
		aniadir(miLista,num);

		printf("Mostrando nodos: \n");
		mostrarLista(miLista);

		printf("\nMostrando sin repeticion: \n");

		miLista = eliminarRepetido(miLista);

		mostrarLista(miLista);

		destruirLista(miLista);
		return 0;
}
//CONSTRUCTOR
list* crearLista(){
	list* nuevaLista = (list*)malloc(sizeof(list));
	if(nuevaLista != NULL){
		nuevaLista -> primerNodo = NULL;
		nuevaLista -> tamanio = 0;
	}
	return nuevaLista;
}


//Booleano
bool listaVacia(list* laLista){
	if(laLista -> tamanio == 0){
		return true;
	}
	else{
		return false;
	}
}

//Añadir
int aniadirInicio(list* laLista, int elemento){

	node* nuevo;

	nuevo = (node*)malloc(sizeof(node));
	if(nuevo == NULL){
		return ERROR_LISTA_LLENA;
	}
	else{
		nuevo -> siguiente = laLista -> primerNodo;
		nuevo -> dato = elemento;
		laLista -> primerNodo = nuevo;
		laLista -> tamanio++;
		return laLista ->tamanio;
	}
}

int aniadirPosicion(list* laLista, int elemento, int pos){
	node *nuevo, *anterior;

	if(pos > (laLista->tamanio + 1)|| pos< 1){
		return ERROR_POSICION;
	}
	else{
		if(pos == 1){
			return aniadirInicio(laLista,elemento);
		}
		else{
			nuevo = (node*)malloc(sizeof(node));
			if(nuevo == NULL){
				return ERROR_LISTA_LLENA;
			}
			else{
				anterior = laLista ->primerNodo;
				for(int i=0 ; i<pos - 2 ; i++){
					anterior = anterior ->siguiente;
				}

				nuevo -> siguiente = anterior -> siguiente;
				nuevo -> dato = elemento;
				anterior -> siguiente = nuevo;
				laLista -> tamanio++;
				return laLista ->tamanio;
			}
		}
	}
}

int aniadir(list* laLista, int elemento){
	return aniadirPosicion(laLista, elemento,laLista->tamanio + 1);
}

//Retirar
int retirarInicio(list* laLista){

	node* nodoRetirado;
	int elemento;

	if(listaVacia(laLista)){
		return ERROR_LISTA_VACIA;
	}
	else{
		nodoRetirado = laLista ->primerNodo;
		elemento = nodoRetirado ->dato;
		laLista ->primerNodo = nodoRetirado ->siguiente;
		laLista ->tamanio--;
		free((void*)nodoRetirado);

		return elemento;
	}
}

int retirarPosicion(list* laLista, int pos){
	node *anterior, *eliminado;
	int elemento;

	if(listaVacia(laLista)){
		return ERROR_LISTA_VACIA;
	}
	else{
		if(pos>(laLista->tamanio) || pos <1){
			return ERROR_POSICION;
		}
		else{
			if(pos == 1){
				return retirarInicio(laLista);
			}
			else{

				anterior = laLista ->primerNodo;
				for(int i=0 ; i<pos - 2 ; i++){
					anterior = anterior ->siguiente;
				}

				eliminado = anterior -> siguiente;
				elemento = eliminado -> dato;
				anterior -> siguiente = eliminado -> siguiente;
				laLista -> tamanio--;
				free((void*) eliminado);

				return elemento;
			}
		}
	}
}

//DESTRUCTOR
void destruirLista(list* laLista){
	node *actual, *anterior;

	if(!listaVacia(laLista)){
		actual = laLista -> primerNodo;
		while(actual != NULL){
			anterior = actual;
			actual = anterior -> siguiente;
			free((void*)anterior ->dato);
			free((void*)anterior);
		}
	}
	free((void*)laLista);
}

//Eliminar
int eliminarInicio(list* laLista){
	node* nodoEliminado;

	if(listaVacia(laLista)){
		return ERROR_LISTA_VACIA;
	}
	else{
		nodoEliminado = laLista ->primerNodo;
		laLista ->primerNodo = nodoEliminado ->siguiente;
		laLista ->tamanio--;
		free((void*)nodoEliminado ->dato);
		free((void*)nodoEliminado);
		return 1;
	}
}


//IMPRIMIR
void mostrarLista(list* laLista){
	node* actual;
	actual = laLista ->primerNodo;
	for(int i=0; i<laLista ->tamanio; i++){
		if(i != ((laLista->tamanio)-1)){
			printf("%d, ",actual->dato);
		}else{
			printf("%d. ",actual->dato);
		}
		actual = actual -> siguiente;
	}
}

bool existeElemento(list* laLista, int elemento){
	bool flag = false;

	if(!listaVacia(laLista)){
		node* nodoIterador = laLista->primerNodo;

		for(int i=0; i< laLista->tamanio ; i++){
			if(nodoIterador->dato == elemento){
				flag = true;
			}
			nodoIterador = nodoIterador->siguiente;
		}
	}

	return flag;
}

list* eliminarRepetido(list* laLista){
	list* elementosUnicos = crearLista();
	node* nodoIterador = laLista->primerNodo;

	while(nodoIterador != NULL){
		if(!existeElemento(elementosUnicos,nodoIterador->dato)){
			aniadir(elementosUnicos,nodoIterador->dato);
		}

		nodoIterador = nodoIterador->siguiente;
	}

	destruirLista(laLista);

	return elementosUnicos;
}
