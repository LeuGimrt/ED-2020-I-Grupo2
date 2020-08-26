#include <stdio.h>
#include <stdlib.h>

typedef struct Nodo{
	int dato;
	struct Nodo *izq;
	struct Nodo *der;
} nodo;

void mostrar(nodo *n){ //preorden
	if(n != NULL){
		printf("%d, ",n->dato);
	}
	else{
		return;
	}
	mostrar(n->izq);
	mostrar(n->der);
}

nodo* insertar(nodo* n,int num){
	nodo *nuevo = (nodo*)malloc(sizeof(nodo));
	nuevo->izq = NULL;
	nuevo->der = NULL;
	nuevo->dato = num;

	if(n == NULL){
		n = nuevo;
	}
	else{
		int direccion;
		nodo *padre;
		nodo *aux = n;
		while(aux != NULL){
			if(num < aux->dato){
				direccion = 0;
				padre = aux;
				aux = aux->izq;
			}
			else{
				direccion = 1;
				padre = aux;
				aux = aux->der;
			}
		}
		if(direccion == 0){
			padre->izq = nuevo;
		}
		else{
			padre->der = nuevo;
		}

	}
	return n;
}

int contar(nodo *n){
	if(n==NULL){
		return 0;
	}
	else{
		return 1 + contar(n->der) + contar(n->izq);
	}
}

int main(){
	nodo *arbol;
	arbol = NULL;
	arbol = insertar(arbol,5);
	arbol = insertar(arbol,6);
	arbol = insertar(arbol,3);

	mostrar(arbol);
	printf("\ntotal nodos: %d",contar(arbol));
	return 0;
}
