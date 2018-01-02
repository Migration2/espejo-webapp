import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BiciService } from '../../../services/bici.service';
import { detalleBicicletaModel } from '../../../models/bicicleta.model';
import { mantenimientoBikeModel, finMantenimientoBikeModel } from '../../../models/mantenimiento.model';
import { Subject } from 'rxjs/Rx';
import { MantenimientoService } from '../../../services/mantenimiento.service';

@Component({
	selector: 'app-bicicleta',
	templateUrl: './bicicleta.component.html',
	styleUrls: ['./bicicleta.component.scss'],
	providers: [BiciService, MantenimientoService]
})
export class BicicletaComponent implements OnInit {
	private idBici;
	datosBici = new detalleBicicletaModel;
	mostrar:boolean = false;
	mantenimientoBikeModel = new mantenimientoBikeModel;
	finMantenimientoBikeModel = new finMantenimientoBikeModel;
	partesBike:Array<any>=[];
	typesMantto:Array<any>=[];
	idParts: Array<any>=[];

	constructor(private activedRoute:ActivatedRoute, private biciService:BiciService, private mantenimientoService: MantenimientoService, private router:Router) { 
		this.activedRoute.params.subscribe(params=>{
			this.idBici = params.id;
		});

		this.biciService.getBiciById(this.idBici).subscribe(response => {
			this.datosBici = response;		
			this.mostrar = true;
		});

		this.mantenimientoService.getBikeParts().subscribe(respose =>{
			this.partesBike = respose;
		});

		this.mantenimientoService.getManttoTypes().subscribe(respose =>{
			this.typesMantto = respose;
		});		
	}

	ngOnInit() {
	}


	onSubmit() { 
		this.mantenimientoBikeModel.idParts = this.idParts;
		this.mantenimientoBikeModel.idStationOrBike = this.datosBici.id;
		this.mantenimientoService.setManttoBike(this.mantenimientoBikeModel);
		this.router.navigate(['administrarBicicletas']);		
	};	

	onSubmitFin() { 
		this.finMantenimientoBikeModel.id = this.datosBici.id;
		this.mantenimientoService.setManttoBikeFin(this.finMantenimientoBikeModel);
		this.router.navigate(['administrarBicicletas']);		
	};	

	eventoParteBike(evento){		
		if (!evento.target.checked){
			for (let i = 0; i<this.idParts.length;i++){
				if(evento.target.defaultValue == this.idParts[i]){
					this.idParts.splice(i,1);
				}
			}
		}else{
			this.idParts.push(evento.target.defaultValue);
		}
	}

}
