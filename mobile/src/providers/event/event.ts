import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the EventProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventProvider {

  private backendAPI: string = 'http://localhost:5050/api/v1/event';

  constructor(public http: HttpClient) {
    console.log('Hello EventProvider Provider');
  }

  getEventList(){
    return this.http.get(this.backendAPI + '/list')
    .map(res => res)
    
  }

}
