import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [UserService]
})
export class NavbarComponent implements OnInit {

  nombre: string;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getLoginName().subscribe(response => {
      this.nombre = response.name;
    });
  }

}
