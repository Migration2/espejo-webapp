import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import { Cookie  } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [UserService, Cookie  ]
})
export class NavbarComponent implements OnInit {

  nombre: string;
  cookies: Object;
  keys: Array<string>;

  constructor(private userService: UserService, public cookieService: Cookie ) { }

  ngOnInit() {
    this.userService.getInformationMe().subscribe(response => {
      this.nombre = response.firstName;
    });
  }

  logOut(){
    console.log('Removing all cookies');
    Cookie.deleteAll();
    this.userService.logOut().subscribe(response => { });
    // window.location.href = 'http://bicirio.gov.co/site/';
    window.location.href = 'http://bici-rio.com/';
  }

}
