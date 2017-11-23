import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'rol'
})
export class RolPipe implements PipeTransform {

	transform(value: string): string {
		let valor:string = "";
		switch (value) {
			case "ROLE_ADMIN":
			valor="Administrador"
			break;

			case "ROLE_USER":
			valor="Usuario"
			break;

			case "ROLE_EMPLOYEE":
			valor="Facilitador"
			break;

			case "ROLE_GUEST":
			valor="Invitado"
			break;			

			default:
			valor= value;
			break;
		}

		return valor;
	}
}