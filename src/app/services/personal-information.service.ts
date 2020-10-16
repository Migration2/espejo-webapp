import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class PersonalInformationService {

  constructor(public http: Http) {
  }
  
  public getCities():Observable<any>{
    return this.http.get("rest/city").map(this.extractData);
  }

  public getCountries():Observable<any>{
    return this.http.get("rest/country").map(this.extractData);
  }

  public getIdentificationType():Observable<any>{
    return this.http.get("rest/identification").map(this.extractData);
  }

  extractData(response :Response){
		return response.json();
	}

}
