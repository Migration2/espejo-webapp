import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../service/user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [UserService]
})
export class NavbarComponent implements OnInit {

  principal: any;

  constructor(public userService: UserService) {
  }

  ngOnInit() {
    this.userService.getPrincipal().subscribe(response => {
      this.principal = response;
    });
  }

}
