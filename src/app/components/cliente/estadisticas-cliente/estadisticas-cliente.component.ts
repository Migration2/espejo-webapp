import { Component, OnInit } from '@angular/core';
import { EstacionService } from '../../../services/estacion.service';
import { EstacionModel } from '../../../models/estacion.model';
import { Subject } from 'rxjs/Rx';
import { UserService } from '../../../services/user.service';
import { UsuarioSecurityModel } from '../../../models/usuario.model';

@Component({
	selector: 'app-estadisticas-cliente',
	templateUrl: './estadisticas-cliente.component.html',
	styleUrls: ['./estadisticas-cliente.component.scss'],
	providers: [EstacionService]
})
export class EstadisticasClienteComponent implements OnInit {
	title: string = 'Estaciones BiciRío';
	Centerlat: number = 6.153433;
	Centerlng: number = -75.372826;
	dataSecurity = new UsuarioSecurityModel;
	datosEstaciones:Array<EstacionModel>=[];	
	dtTrigger = new Subject();
	dtOptions: DataTables.Settings = {};

	constructor(private estacionservice : EstacionService, private userService : UserService) { 
		this.estacionservice.getEstaciones().subscribe(response => {
			this.datosEstaciones = response;			
			this.dtTrigger.next();
		});

		this.userService.getInformationMe().subscribe(response => {
			this.dataSecurity = response;
		});		
	}

	ngOnInit() {
		this.dtOptions = {};
	}

	cambiarPass(){

	}

	cambiarPin(){
		
	}

}
