import { Component, OnInit } from '@angular/core';
import { PenaltyModel } from '../../../models/sanciones.model';
import { SancionesService } from '../../../services/sanciones.service';

@Component({
  selector: 'app-administrar-sanciones',
  templateUrl: './administrar-sanciones.component.html',
  styleUrls: ['./administrar-sanciones.component.scss'],
  providers: [SancionesService]
})
export class AdministrarSancionesComponent implements OnInit {

  public manualSanctionsData: Array<PenaltyModel> = [];
  public automaticSanctionsData: Array<PenaltyModel> = [];
  public penaltyData: PenaltyModel = new PenaltyModel();
  public isShow: boolean = false;

  constructor(public sanctionsService: SancionesService) {
    this.loadManualSanctionsData();
  }

  ngOnInit() {
    this.isShow = true;
  }

  loadManualSanctionsData() {
    this.sanctionsService.getAllManualPenalties().subscribe(manualSanctions => {
      this.manualSanctionsData = manualSanctions;
      this.sanctionsService.manualSanctionData$.emit(manualSanctions);
    },
      error => console.error(error));
  }

  public createSanction() {
    this.sanctionsService.createPenality(this.penaltyData).subscribe(
      penalityResponse => {
        this.loadManualSanctionsData();
      },
      error => console.log(error)
    );
  }

  NUM_DAYS_DATA: Array<number> = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 15, 16, 18, 20, 25, 30];
}
