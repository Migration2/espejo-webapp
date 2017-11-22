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
	rolPrincipal:string ="";
	rolAdministrador:string ="ROLE_ADMIN";
	rolusuario:string ="ROLE_USER";


	constructor(private userService :UserService, private router:Router){
			//cargar componente cargando mientras responde el servicio y se sabe el rol del usuario, si el servidor responde un estado diferente a 200 o un rol diferente del esperado, redireccionar a registro
		this.router.navigate(['cargando']);
		this.userService.getLoginRol().subscribe(response => {
			this.redirect(response);
		});

	}


	redirect(rol){
		
		for (let i = 0; i< rol.length; i++ ){//recorremos todos los roles para verificar este el rol admin
			if(rol[i].authority==this.rolAdministrador){
				this.rolPrincipal=this.rolAdministrador;
				break;
			}else{
				this.rolPrincipal=this.rolusuario;
			}
		}

		switch (this.rolPrincipal) {
			case this.rolAdministrador:
			this.router.navigate(['home']);	
			break;

			case this.rolusuario:
			this.router.navigate(['cliente/home']);	
			break;

			default:
			this.router.navigate(['cargando']);	
			break;
		}
	}

}
