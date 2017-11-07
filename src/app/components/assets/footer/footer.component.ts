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

	openWindow(url){
		window.open(url,'_blank');
	}


}
