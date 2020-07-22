/*
 ============================================================================
 Grupo 2:
	Cifuentes Michuy, Daniel Ernesto (dc_)
	Ramos Villarreal, Edward Junior (er_)
	Rodriguez Tocas, Miguel Angel (mr_)
	Zambrano Quispe, Arian Alberto (az_)

 Página 252:
 PE 06

 Write a program to compute F(x, y), where
 	 F(x, y) = F(x-y, y) + 1 if y<=x
 And F(x, y) = 0 if x<y
 ============================================================================
 */

#include <stdio.h>
#include <stdlib.h>

int F(float x, float y){
	if(y<=x){
		return F(x-y,y)+1;
	}else{
		return 0;
	}
}

int main() {
	float x,y;
	int resultado;

	printf("Ingrese el valor de x: ");
	fflush(stdout);
	scanf("%f",&x);
	fflush(stdin);

	printf("Ingrese el valor de y: ");
	fflush(stdout);
	scanf("%f",&y);
	fflush(stdin);

	resultado = F(x,y);
	printf("Resultado: %d",resultado);

	return 0;
}
