import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BiciService } from '../../../services/bici.service';
import { Subject } from 'rxjs/Rx';
import { BicicletaModel } from '../../../models/bicicleta.model';
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


	constructor(private router: Router, private biciService: BiciService) { }

	ngOnInit() {
		this.dtOptions = { 
			// columnDefs: [
			// {
			// 	targets: [2],
			// 	// visible: false,
			// }],
			responsive: true };
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

	}

	informacionBicicleta(id: number) {
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
