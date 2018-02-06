import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

/*
  Generated class for the EventProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventProvider {

  private backendAPI: string = 'http://localhost:5050/api/v1/event';

  public eventInfo:Subject<any>

  constructor(public http: HttpClient, public storage: Storage) {
    //console.log('Hello EventProvider Provider');
    this.eventInfo =new BehaviorSubject(null);
  }

  getEventList(){
    return this.storage.get('myToken').then((jwt) => {
      return this.http.get(this.backendAPI + '/list', {
        headers : {
        'Authorization': 'Bearer ' + jwt.token
      }
    })
      .map(res => res).toPromise();
    })
  }

  createEvent(event) {
    return this.storage.get('myToken').then((jwt) => {
      return this.http.post(this.backendAPI + '/create', { event: event },{
        headers : {
        'Authorization': 'Bearer ' + jwt.token
      }
    })
      .map(res => res).toPromise();
    })
  }

  enterEvent(eventdata){
    this.eventInfo.next(eventdata)
  }

  getEventInfo(){
    return this.eventInfo.asObservable();
  }

}
