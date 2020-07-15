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
elemento_cola desencolar();
void mostrar();

void destruir();

void menu();

int main(){
	menu();
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

elemento_cola desencolar(){
	elemento_cola aux = {};
	if(cola_vacia()){
		printf("Cola vacia!\n");
		fflush(stdout);
		return aux;
	}else{
		aux= aCola.datos[0];
		int i;
		for(i = 0; i < aCola.tope; i++){
			aCola.datos[i] = aCola.datos[i+1];
		}
		aCola.tope--;
		return aux;
	}
}

void mostrar(){
	int i=0;
	elemento_cola aux;
	if(cola_vacia()){
		printf("Cola vacia!\n");
	}else{
		while(aCola.tope > -1){
			aux = desencolar();
			printf("\nElemento %d de la cola: %s", i+1, aux.nombre);
			fflush(stdout);
			i++;
		}
	}
}

void destruir(){
	aCola.tope = -1;
}

void menu(){
	int eleccion,pos;
	bool validez = false;
	char opc;
	elemento_cola rpta;
	do{
		printf("\tMENU\n");
		printf("1. Crear cola\n");
		printf("2. Encolar\n");
		printf("3. Desencolar\n");
		printf("4. Limpiar\n");
		printf("5. Mostrar cola\n");
		printf("6. Salir del programa\n");
		printf("Digite => ");
		fflush(stdout);
		do{
			validez = true;
			scanf("%d",&eleccion);
			switch(eleccion){
					case 1: inicializar_cola();
							printf("Cola creada exitosamente!\n");
							fflush(stdout);
							break;
					case 2:  printf("\nIngrese el elemento: ");
							fflush(stdout);
							scanf("%s", rpta.nombre);
							fflush(stdin);
							pos = encolar(rpta);
							printf("Elemento agregado en la posicion %d de la cola\n", pos);
							fflush(stdout);
							break;
					case 3: rpta = desencolar();
							printf("Elemento desencolado: %s\n",rpta.nombre);
							fflush(stdout);
							break;
					case 4: destruir();
							printf("Limpieza exitosa!\n");
							fflush(stdout);
							break;
					case 5: mostrar();
							break;
					case 6: printf("Saliendo del programa......\n");
							fflush(stdout);
							break;
					default:printf("Ingrese una opcion valida\n");
							break;
			}
		}while(!validez);
		if(eleccion!=6){
			printf("\nDesea volver al menu(s/n) => ");
			fflush(stdout);
			fflush(stdin);
			scanf("%c",&opc);
			printf("\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
		}else{
			opc='N';
		}
	}while(opc=='S' || opc=='s');

}
