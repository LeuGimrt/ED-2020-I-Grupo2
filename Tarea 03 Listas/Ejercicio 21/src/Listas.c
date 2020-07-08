#include <stdio.h>
#include <stdlib.h>

#define ERROR_LISTA_LLENA -1
#define ERROR_LISTA_VACIA -2
#define ERROR_POSICION -3


typedef struct tipoNodo{
	struct tipoNodo* siguiente;
	int dato;
} node;

typedef struct tipoLista{
	struct tipoNodo* primerNodo;
	int tamanio;
} list;

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
			free((void*)(anterior ->dato));
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
		free((void*)(nodoEliminado ->dato));
		free((void*)nodoEliminado);
		return 1;
	}
}


//IMPRIMIR
void mostrarLista(list* laLista){
	node* actual;
	actual = laLista ->primerNodo;

	if(listaVacia(laLista)){
		printf(" Lista Vacia");
	}
	else{

		printf("\n Lista: ");

		printf("%d",actual->dato);
		actual = actual -> siguiente;

		for(int i=1; i<laLista ->tamanio; i++){
			printf(", %d",actual->dato);
			actual = actual -> siguiente;
		}
	}

}

void llenarLista(list* laLista){
	int elemento = 1;

	printf(" Ingrese los elementos de la lista. Cuando quiera finalizar, ingrese 0\n\n");

	while(elemento != 0){

		printf(" Siguiente elemento: ");
		fflush(stdout);

		scanf("%d",&elemento);

		if(elemento != 0){
			aniadir(laLista,elemento);
		}
	}
}

//EJERCICIO 21
int contarElementos(list* laLista, int elemento){
	int contador = 0;
	fflush(stdout);
	node* nodo = laLista -> primerNodo;

	for(int i=0 ; i < laLista -> tamanio; i++){
		if(nodo -> dato == elemento){
			contador++;
		}
		nodo = nodo ->siguiente;
	}
	fflush(stdout);
	return contador;

}


int main(){

	int ele = 0;
	int cant;

	list* miLista = crearLista();

	llenarLista(miLista);

	mostrarLista(miLista);

	printf("\n\n Ingrese el elemento a contar: ");

	fflush(stdout);
	fflush(stdin);

	scanf("%d",&ele);
	fflush(stdin);

	cant = contarElementos(miLista, ele);

	printf(" El elemento %d se repite %d veces",ele, cant);
	fflush(stdout);

	destruirLista(miLista);

	return 0;
}
