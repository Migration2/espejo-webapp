import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { UsuarioModel, UsuarioSecurityModel } from '../../../models/usuario.model';
import { Subject } from 'rxjs/Rx';

@Component({
	selector: 'app-usuario',
	templateUrl: './usuario.component.html',
	styleUrls: ['./usuario.component.scss'],
	providers: [UserService]
})
export class UsuarioComponent implements OnInit {
	dataSecurity = new UsuarioSecurityModel;
	dataUsuario = new UsuarioModel;
	prestamos:any;
	private userId;
	dtTrigger = new Subject();
	dtOptions: DataTables.Settings = {};
	
	constructor(private activedRoute:ActivatedRoute, private userService:UserService) { 
		this.activedRoute.params.subscribe(params=>{
			this.userId = params.id;
			this.userService.getSecurityUserById(this.userId).subscribe(responseSecurity=>{
				this.dataSecurity = responseSecurity;
				this.userService.getUserByUserName(this.dataSecurity.username).subscribe(responseUserName => {
					this.dataUsuario = responseUserName;
					this.userService.getUserLends(Number(this.dataUsuario.id)).subscribe(response => {
						this.prestamos=response;
						this.dtTrigger.next();
					});
				});
			});
		});
	}

	ngOnInit() {
		this.dtOptions = {};
	}

}
