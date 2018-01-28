import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SancionesService } from '../../../services/sanciones.service';
import { Subject } from 'rxjs/Rx';
import { sancionesModel } from '../../../models/sanciones.model';

@Component({
	selector: 'app-sanciones',
	templateUrl: './sanciones.component.html',
	styleUrls: ['./sanciones.component.css'],
	providers: [SancionesService]
})
export class SancionesComponent implements OnInit {

	dtOptions: DataTables.Settings = {};
	sanciones: Array<sancionesModel> = [];
	dtTrigger = new Subject();
	mostrar: boolean = false;
	sancion: sancionesModel = new sancionesModel;

	constructor(private router: Router, private sancionesService: SancionesService) {
		this.sancionesService.getSancionesHistory().subscribe(response => {
			this.sanciones = response;
			this.dtTrigger.next();
			this.mostrar = true;
		});
	}

	ngOnInit() {
		this.dtOptions = {
			// columnDefs: [
			// {
			// 	targets: [ 2 ],
			// 	// visible: false,
			// 	searchable: false
			// }]
		};
	}

	detalleSancion(idSancion: string) {
		for (let i = 0; i < this.sanciones.length; i++) {
			if (this.sanciones[i].id == idSancion) {
				this.sancion = this.sanciones[i];
			}
		}
	}


	informacionUsuario(userName: any) {
		this.router.navigate(['usuario', userName]);
	}

}
