import { Component, OnInit } from '@angular/core';
import { PenaltyModel } from '../../../models/sanciones.model';
import { SancionesService } from '../../../services/sanciones.service';

@Component({
  selector: 'app-administrar-sanciones',
  templateUrl: './administrar-sanciones.component.html',
  styleUrls: ['./administrar-sanciones.component.scss']
})
export class AdministrarSancionesComponent implements OnInit {

  penaltyData:PenaltyModel = new PenaltyModel();

  constructor(private penaltyService:SancionesService) { }

  ngOnInit() {
  }

  public createSanction(){
    console.log("Must create sanction");
    this.penaltyService.createPenality(this.penaltyData).subscribe(
        penalityResponse => penalityResponse, 
        error => console.log(error)
    ); 
}

  NUM_DAYS_DATA: Array<number> =[
    1,2,3,4,5,6,7,8,9,10,12,14,16,18,20,25,30
];
}
