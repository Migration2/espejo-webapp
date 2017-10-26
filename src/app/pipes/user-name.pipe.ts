import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'userName'
})
export class UserName implements PipeTransform {

	transform(value: string): string {
		let valor:string = "";
		if (value && value !="anonimo"){
			valor = String(value).charAt(0).toUpperCase() + String(value).slice(1);
			valor = `Bienvenido ${valor} `
		}
		

		return valor;
	}

}
