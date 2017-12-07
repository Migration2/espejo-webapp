import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";

@Component({
	selector: 'app-client-navbar',
	templateUrl: './client-navbar.component.html',
	styleUrls: ['./client-navbar.component.scss'],
	providers: [UserService]
})
export class ClientNavbarComponent implements OnInit {
	nombre: string;

	constructor(private userService: UserService) { }

	ngOnInit() {
		this.userService.getInformationMe().subscribe(response => {
			this.nombre = response.firstName;
		});
	}

}
