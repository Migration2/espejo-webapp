import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

const EXEL_EXTENSION:string = ".xlsx";

@Injectable()
export class ExcelService {


  constructor() { }

  static toExportFileName(excelFileName: string):string{
    let currentDate:Date = new Date();
    return `${excelFileName}_Bici-Rio_${currentDate.toISOString()}${EXEL_EXTENSION}`;
  }

  public exportAsExcelFile(jsonData:any[], excelFileName: string):void{
    const workSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData);
    const workBook: XLSX.WorkBook = {
      Sheets: {'ReporteBiciRio': workSheet},
      SheetNames: ['ReporteBiciRio']
    }
    XLSX.writeFile(workBook, ExcelService.toExportFileName(excelFileName));
  }

}
