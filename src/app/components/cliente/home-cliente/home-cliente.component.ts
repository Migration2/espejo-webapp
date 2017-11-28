import { Component, OnInit } from '@angular/core';
import { EstacionService } from '../../../services/estacion.service';
import { EstacionModel } from '../../../models/estacion.model';
import { Subject } from 'rxjs/Rx';
import { UserService } from '../../../services/user.service';
import { UsuarioSecurityModel, UsuarioSecurityAccessModel } from '../../../models/usuario.model';

@Component({
	selector: 'app-home-cliente',
	templateUrl: './home-cliente.component.html',
	styleUrls: ['./home-cliente.component.scss'],
	providers: [EstacionService]
})
export class HomeClienteComponent implements OnInit {
	title: string = 'Estaciones BiciRío';
	Centerlat: number = 6.153433;
	Centerlng: number = -75.372826;
	dataSecurity = new UsuarioSecurityModel;
	datosEstaciones:Array<EstacionModel>=[];	
	dtTrigger = new Subject();
	dtOptions: DataTables.Settings = {};
	securituyAccess= new UsuarioSecurityAccessModel;

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




// checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
//           return (group: FormGroup) => {
//             let passwordInput = group.controls[passwordKey],
//                 passwordConfirmationInput = group.controls[passwordConfirmationKey];
//             if (passwordInput.value !== passwordConfirmationInput.value) {
//               return passwordConfirmationInput.setErrors({notEquivalent: true})
//             }
//             else {
//                 return passwordConfirmationInput.setErrors(null);
//             }
//           }
//         }



}
