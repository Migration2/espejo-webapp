import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'titleCase'
})
export class TitleCasePipe implements PipeTransform {

	transform(value: string): string {
		let valor:string = "";
		if (value ){
			valor = String(value).charAt(0).toUpperCase() + String(value).slice(1);
			valor = `Bienvenido ${valor} `
		}
		

		return valor;
	}

}
