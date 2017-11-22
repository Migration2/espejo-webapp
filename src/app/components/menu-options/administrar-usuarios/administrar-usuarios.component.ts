import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Subject } from 'rxjs/Rx';

@Component({
	selector: 'app-administrar-usuarios',
	templateUrl: './administrar-usuarios.component.html',
	styleUrls: ['./administrar-usuarios.component.scss'],
	providers: [UserService]
})
export class AdministrarUsuariosComponent implements OnInit {

	dtOptions: DataTables.Settings = {};
	dataUsuarios: Array<any>=[];
	dtTrigger = new Subject();

	constructor(private router:Router, private userService:UserService) { }

	ngOnInit() {

		this.userService.getUsers().subscribe(response => {
			this.dataUsuarios = response;
			this.dtOptions = {};
			this.dtTrigger.next();
		});
	}

	informacionUsuario(userName:number){
		this.router.navigate(['usuario',userName]);
	}

}
