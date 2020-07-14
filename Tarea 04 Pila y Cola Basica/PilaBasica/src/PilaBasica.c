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

int main(void) {



	return EXIT_SUCCESS;
}
