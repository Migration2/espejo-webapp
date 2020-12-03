import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BiciService } from '../../../services/bici.service';
import { Subject } from 'rxjs/Rx';
import { BicicletaModel, BikeModel } from '../../../models/bicicleta.model';
import { DataTableDirective } from 'angular-datatables';

@Component({
	selector: 'app-administrar-bicicletas',
	templateUrl: './administrar-bicicletas.component.html',
	styleUrls: ['./administrar-bicicletas.component.scss'],
	providers: [BiciService]
})
export class AdministrarBicicletasComponent implements OnInit {
	@ViewChild(DataTableDirective)
	dtElement: DataTableDirective;
	dtOptions: any = {};
	dataBicis: Array<any> = [];
	dtTrigger = new Subject();
	model = new BicicletaModel;
	mostrar: boolean = false;
	missingBike = [];
	public bikesData:Array<BikeModel> = [];


	constructor(private router: Router, private biciService: BiciService) { }

	ngOnInit() {
		this.loadBikesData();
		this.dtOptions = { 
			language: {
				url: "//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json"
			},
			responsive: true };
		// this.biciService.getBicis().subscribe(response => {
		// 	this.dataBicis = response;
		// 	console.log(this.dataBicis[0]);
		// 	this.dtTrigger.next();
		// 	this.biciService.biciMissing().subscribe(response => {
		// 		this.missingBike = response;
		// 		for (let j = 0; j < this.dataBicis.length; j++) {
		// 			this.dataBicis[j]['missing'] = false;
		// 			this.setMissingBikes(this.missingBike, this.dataBicis, j);
		// 		}
		// 		this.mostrar = true;
		// 	});
		// });

	}

	private loadBikesData(){
		this.biciService.getBikesV2().subscribe(
			response => {
				this.bikesData = response;
				this.dtTrigger.next();
				this.loadMissingBikes(this.bikesData);
				this.mostrar = true;
			}, 
			error => console.error(error)
		);
	}

	private loadMissingBikes(bikesData:Array<BikeModel>){
		this.biciService.biciMissing().subscribe(response => {
			 this.missingBike = response;
			 if(this.missingBike.length > 0){
				this.findMissingBikes(bikesData, this.missingBike);
			 }
		});
	}

	/**
	 * 
	 */
	private findMissingBikes(bikesData:Array<BikeModel>, missingBikes:Array<any>){
		for (let j = 0; j < missingBikes.length; j++) {
			let indexBike = bikesData.findIndex((bike, idx, bikeArray) => {
				return (bike.code == missingBikes[j]['codigo']);
			});
			if(indexBike != -1){
				bikesData[indexBike].missing = true;
			}
	   	}
	}

	public informacionBicicleta(id: number) {
		this.router.navigate(['bicicleta', id]);
	}

	onSubmit() {
		let idCliente = this.biciService.setBici(this.model);
		location.reload();
	};

	retornarBodega(idBici){
		this.biciService.returnBiciToBodega(idBici);
		this.recargar();
	}

	private recargar() {
		this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
		  // Destroy the table first
		  dtInstance.table(document.getElementById('bicis')).clear();
		  dtInstance.table(document.getElementById('bicis')).destroy();
		  // Call the dtTrigger to rerender again
		  this.mostrar = false;
		  this.biciService.getBicis().subscribe(response => {
			this.dataBicis = response;
			this.dtTrigger.next();
			this.biciService.biciMissing().subscribe(response => {
				this.missingBike = response;
				for (let j = 0; j < this.dataBicis.length; j++) {
					this.dataBicis[j]['missing'] = false;
					for (let i = 0; i < this.missingBike.length; i++) {
						if (this.dataBicis[j]['codigo'] == this.missingBike[i]['codigo']) {
							this.dataBicis[j]['missing'] = true;
						}
					}
				}
				this.mostrar = true;
			});
		});
		});
	  }
}
