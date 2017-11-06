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
	private userName;
	
	constructor(private activedRoute:ActivatedRoute, private userService:UserService) { 
		this.activedRoute.params.subscribe(params=>{
			this.userName = params.id;
		});

		this.userService.getUserByUserName(this.userName).subscribe(response => {
			 this.dataUsuario = response;
		});
	}

	ngOnInit() {
	}

}
