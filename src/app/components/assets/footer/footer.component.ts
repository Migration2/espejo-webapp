import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

	openWindow(){
		window.open('http://www.dev-codes.net/','_blank');
	}


}
