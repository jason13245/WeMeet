import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Socket } from "ng-socket-io";
import { Deeplinks } from '@ionic-native/deeplinks';

/*
  Generated class for the EventProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventProvider {

  private backendAPI: string = 'http://localhost:5050/api/v1/event';

  public eventInfo:Subject<any>

  constructor(public http: HttpClient, 
    public storage: Storage,
    public socket: Socket,
    public deeplinks: Deeplinks) {
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

  getParticipants(eventInfo) {
    return this.storage.get('myToken').then((jwt) => {
      return this.http.get(this.backendAPI + '/eventInfo/' + eventInfo.id,{
        headers : {
        'Authorization': 'Bearer ' + jwt.token
      }
    })
      .map((res) => { console.log(res); return res}).toPromise();
    })
  }

  generateEventLink(eventInfo) {
    console.log(eventInfo);
    return 'wemeet://wemeet.space/event?url=' + eventInfo.url;
  }

  setEventLinkRegulation(eventInfo) {
    this.deeplinks.route({
      '/event': {'url': eventInfo.url},
    }).subscribe((match) => {
      // match.$route - the route we matched, which is the matched entry from the arguments to route()
      // match.$args - the args passed in the link
      // match.$link - the full link data
      console.log('Successfully matched route', match);
    }, (nomatch) => {
      // nomatch.$link - the full link data
      console.error('Got a deeplink that didn\'t match', nomatch);
    });
  }

}
