import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bikesLabel'
})
export class BikesLabelPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let resultArray: Array<string> = [];
    for (const i in value){
      switch (value[i]) {
        case "enable":
          resultArray.push("Habilitadas")
          break;
        case "inWarehouse":
          resultArray.push("En Almacén");
          break;
        case "borrowed":
          resultArray.push("Prestadas");
          break;
        default:
          resultArray.push(value[i]);
          break;
      }
    }
    
    return resultArray;
  }

}
