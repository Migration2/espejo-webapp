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

			default:
			// code...
			break;
		}

		return valor;
	}
}