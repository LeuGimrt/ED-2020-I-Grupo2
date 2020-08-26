#include <stdio.h>
#include <stdlib.h>

typedef enum{false, true} bool;

typedef struct Nodo{
	struct Nodo *izq;
	struct Nodo *der;
	struct Nodo *padre;
	int info;
}nodo;


void insertar_nodo(nodo* arbol, int dato);
void eliminar_nodo(nodo* arbol, int dato);

void menu();

int main(){
	menu();
	return 0;
}

void menu(){
	nodo* abb = NULL;
	int opc, dato;

	printf("1. Insertar Nodo\n2. Eliminar Nodo\nIngrese opcion: "); fflush(stdout);
	scanf("%d", &opc);

	switch(opc){
		case 1: printf("\nIngrese el nodo a insertar: "); fflush(stdout);
				scanf("%d", &dato); fflush(stdin);
				insertar_nodo(abb, dato);
				printf("\nNodo ingresado correctamente");
				break;

		case 2: printf("\nIngrese el nodo a eliminar: "); fflush(stdout);
				scanf("%d", &dato); fflush(stdin);
				eliminar_nodo(abb, dato);
				printf("\nNodo eliminado correctamente");
				break;

		default: menu();
	}

	printf("\n¿Desea continuar?\n1. Si\n2. No\n");
		fflush(stdout);

		scanf("%d", &opc);

		if(opc == 1){
			menu();
		}

		else if(opc == 2){

		}

		else{
			printf("Opcion no valida"); fflush(stdout); menu();
		}

}




void insertar_nodo(nodo* arbol, int dato){
	nodo *nuevo;
	nuevo = (nodo*)malloc(sizeof(nuevo));
	nuevo->info = dato;
	nuevo->izq = NULL;
	nuevo->der = NULL;


	if(arbol == NULL){
		printf("nodovacio\n");
		arbol = nuevo;
	}

	else{

		if(dato < arbol->info)
			insertar_nodo(arbol->izq, dato);

		else if(dato > arbol->info)
			insertar_nodo(arbol->der, dato);
	}

}

nodo* minimo(nodo *arbol){
	if(arbol == NULL)
		return NULL;

	 if(arbol->izq)
		 return minimo(arbol->izq);

	 else
		 return arbol;
}

void reemplazar(nodo *arbol, nodo *nodo){
	if(arbol->padre){
		if(arbol->info == arbol->padre->izq->info){
			arbol->padre->izq = nodo;
		}

		else if(arbol->info == arbol->padre->der->info){
			arbol->padre->der = nodo;
		}
	}

	if(nodo)
		nodo->padre = arbol->padre;
}

void comprobar_eliminar(nodo* nodo_){
	if(nodo_->izq && nodo_->der){
		nodo *menor = minimo(nodo_->der);
		nodo_->info = menor->info;
		comprobar_eliminar(menor);
	}

	else if(nodo_->izq){
		reemplazar(nodo_, nodo_->izq);
		nodo_->izq = NULL;
		nodo_->der = NULL;
		free((nodo*)nodo_);
	}

	else if(nodo_->der){
		reemplazar(nodo_, nodo_->der);
		nodo_->izq = NULL;
		nodo_->der = NULL;
		free((nodo*)nodo_);
	}

	else{
		reemplazar(nodo_, NULL);
		free((nodo*)nodo_);
	}
}

void eliminar_nodo(nodo* arbol, int dato){
	if(arbol==NULL){
		return;
	}

	else if(dato < arbol->info){
		eliminar_nodo(arbol->izq, dato);
	}

	else if(dato > arbol->info)
		eliminar_nodo(arbol->der, dato);

	else{
		comprobar_eliminar(arbol);
	}
}





