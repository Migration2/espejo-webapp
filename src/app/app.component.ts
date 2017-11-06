import { Component } from '@angular/core';
import {UserService} from "./services/user.service";
import { Router } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	providers: [UserService]
})
export class AppComponent {
	rol = 1;


	constructor(private userService :UserService, private router:Router){
//cargar componente cargando mientras responde el servicio y se sabe el rol del usuario, si el servidor responde un estado diferente a 200 o un rol diferente del esperado, redireccionar a registro

		// this.userService.getLogin().subscribe(response => {
			this.redirect();
			//  });

		}


		redirect(){
			switch (this.rol) {
				case 1:
				this.router.navigate(['home']);	
				break;

				case 2:
				this.router.navigate(['cliente/home']);	
				break;

				case 0:
				this.router.navigate(['registro']);
				break;

				default:
				// this.router.navigate(['registro']);	
				break;
			}
		}

	}
