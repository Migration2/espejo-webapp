import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'observacionesMantenimiento'
})
export class ObservacionesMantenimientoPipe implements PipeTransform {

  transform(value: any): any {
  	let Posicionseparador = value.search("----------");
  	let longitudTotal = value.length;
  	let inicio= value.slice(0, Posicionseparador);
  	let fin= value.slice(Posicionseparador+10,longitudTotal);
  	let salida =  `Inicial: ${inicio} / Final: ${fin}`;
    return salida;
  }

}
