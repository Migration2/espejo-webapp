import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { UsuarioModel } from '../../../models/usuario.model';
import { Subject } from 'rxjs/Rx';

@Component({
	selector: 'app-usuario',
	templateUrl: './usuario.component.html',
	styleUrls: ['./usuario.component.scss'],
	providers: [UserService]
})
export class UsuarioComponent implements OnInit {
	dataUsuario = new UsuarioModel;
	private idUsuario;
	
	constructor(private activedRoute:ActivatedRoute, private userService:UserService) { 
		this.activedRoute.params.subscribe(params=>{
			this.idUsuario = params.id;
		});

		this.userService.getUserById(this.idUsuario).subscribe(response => {
			 this.dataUsuario = response;
		});
	}

	ngOnInit() {
	}

}
