#include <stdlib.h>
#include <stdio.h>

#define MAXCOLA 100

typedef enum{false, true}bool;

typedef struct Elemento_cola { char nombre[40]; } elemento_cola;

struct Cola{
	elemento_cola datos[MAXCOLA];
	int tope;
}aCola;

void inicializar_cola();

bool cola_llena();
bool cola_vacia();

int encolar(elemento_cola c);

int main(){

	return EXIT_SUCCESS;
}


void inicializar_cola(){
	aCola.tope = -1;
}

bool cola_llena(){
	if(aCola.tope == MAXCOLA - 1){
		return true;
	}

	else{
		return false;
	}
}

bool cola_vacia(){
	if(aCola.tope == -1){
		return true;
	}
	else{
		return false;
	}
}

int encolar(elemento_cola c){
	if(cola_llena()){
		printf("Cola llena\n"); fflush(stdout);
		return -1;
	}

	else{
		aCola.datos[aCola.tope+1] = c;
		aCola.tope++;
		return aCola.tope;
	}
}
