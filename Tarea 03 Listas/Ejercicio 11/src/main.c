#include <stdio.h>
#include <stdlib.h>

typedef enum{false, true} bool;

typedef struct Nodo{
	struct Nodo *proximo;
	int info;
}nodo;

typedef struct Lista_Simple{
	nodo *datos;
	int tamanio;
}list;

#define error_lista_llena -1;
#define error_lista_vacia -2;
#define error_posicion -3;

list* crear_lista();
void destruir_lista(list *lista);

int adiciona(list *lista, int dato);
int adiciona_al_inicio(list *lista, int dato);
int adiciona_en_posicion(list *lista, int info, int posicion);

bool lista_vacia(list *lista);
bool lista_vacia(list *lista);

list* sublista(list* lista, list* sublista);
void mostrar_lista(list* lista);

int main(){
	int tamanio, i, dato;
	list *lista1, *lista2;

	lista1 = crear_lista();
	lista2 = crear_lista();

	printf("Listas creadas"); fflush(stdout);

	printf("\nIngrese el numero de elementos de la lista 1: "); fflush(stdout);
	scanf("%d", &tamanio); fflush(stdin);

	for(i = 0; i < tamanio; i++){
		printf("\nIngrese el dato %d de la lista: ", i+1); fflush(stdout);
		scanf("%d", &dato); fflush(stdin);

		printf("\nDato ingresado en la posicion %d", adiciona(lista1, dato));
		fflush(stdout);
	}

	lista2 = sublista(lista1, lista2);

	printf("\nDatos de la lista 1: "); fflush(stdout);
	mostrar_lista(lista1);

	printf("\nDatos de la lista 2: "); fflush(stdout);
	mostrar_lista(lista2);

	destruir_lista(lista1);
	destruir_lista(lista2);

	printf("\nListas destruidas");

	return EXIT_SUCCESS;
}

list* crear_lista(){
	list *lista;

	lista = (list*)malloc(sizeof(list));

	if (lista != NULL){
		lista->tamanio = 0;
		lista->datos = NULL;
	}

	return lista;
}

bool lista_vacia(list *lista){
	if(lista->tamanio == 0){
		return true;
	}
	else{
		return false;
	}
}


void destruir_lista(list *lista){
	nodo *actual, *anterior;

	if(lista_vacia(lista)){
		free((list*) lista);
	}

	else{
		actual = lista->datos;

		while(actual != NULL){
			anterior = actual;
			actual = actual->proximo;
			free((int*)anterior->info);
			free((nodo*)anterior);
		}

		free((list*)lista);
	}
}

int adiciona(list *lista, int dato){
	nodo *nuevo, *aux;

	nuevo = (nodo*)malloc(sizeof(nodo));

	nuevo->info = dato;
	nuevo->proximo = NULL;

	aux = lista->datos;

	if(lista->tamanio == 0){
		return adiciona_al_inicio(lista, dato);
	}

	else{
		while(aux->proximo != NULL){
			aux = aux->proximo;
		}

		aux->proximo = nuevo;
		lista->tamanio++;

		return lista->tamanio;
	}
}

int adiciona_al_inicio(list *lista, int dato){
	nodo *nuevo;

	nuevo = (nodo*)malloc(sizeof(nodo));

	if(nuevo == NULL){
		return error_lista_llena;
	}

	else{
		nuevo->proximo = lista->datos;
		nuevo->info = dato;
		lista->datos = nuevo;
		lista->tamanio++;

		return 1;
	}
}

int adiciona_en_posicion(list *lista, int info, int posicion){
	nodo *nuevo, *anterior;
	int i;

	if(posicion > lista->tamanio + 1){
		return error_posicion;
	}

	else if(posicion == 1){
		return adiciona_al_inicio(lista, info);
	}

	else{
		nuevo = (nodo*)malloc(sizeof(nodo));

		if(nuevo == NULL){
			return error_lista_llena;
		}

		else{
			anterior = lista->datos;

			for(i = 0; i < posicion - 2; i++){
				anterior = anterior->proximo;
			}

			nuevo->proximo = anterior->proximo;
			nuevo->info = info;
			anterior->proximo = nuevo;
			lista->tamanio++;

			return lista->tamanio;
		}
	}
}

list* sublista(list* lista, list* sublista){

	nodo* aux;
	int elemento;

	aux = lista->datos;

	for(int i=0; i < lista->tamanio; i++){

		if(i%2 == 0){
			elemento = aux->info;
			adiciona(sublista, elemento);
		}

		aux=aux->proximo;
	}

	return sublista;
}

void mostrar_lista(list* lista){
	nodo *aux;
	int i;

	aux = lista->datos;

	if(aux == NULL){
		printf("\nLista Vacia");
	}

	else{
		for(i=0; i < lista->tamanio; i++){
			printf("\nDato %d: %d", i+1, aux->info);
			aux = aux->proximo;
		}
	}
}
