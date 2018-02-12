import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from "ng-socket-io";
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FacebookAuthProvider } from '../facebook-auth/facebook-auth';
import { EventProvider } from '../event/event';

/*
  Generated class for the PlacesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PlacesProvider {

  userInfo: {
    userId: number,
    username: string
  }
  eventInfo: {
    eventId: number,
    userEventId: number,
  }

  userLocation: {
    latitude: number,
    longitude: number
  }


  private places: Subject<any>;
  private businessResults: Subject<any>;
  private idResults: Subject<any>;
  // private catagoriesResult:Subject<any>;
  constructor(public http: HttpClient, public socket: Socket, public facebookAuthProvider: FacebookAuthProvider, public eventProvider: EventProvider) {
    this.businessResults = new Subject();
    this.idResults = new Subject();
    this.places = new BehaviorSubject(null);

    this.facebookAuthProvider.getLocation().subscribe(data => this.userLocation = data)
    this.facebookAuthProvider.getUserInfo().subscribe(info => this.userInfo=info)
    this.eventProvider.getEventInfo().subscribe(info =>this.eventInfo=info)

    this.socket.emit('listAllPlacesByEvent', { userInfo: this.userInfo, eventInfo: this.eventInfo });
    this.socket.on('yelpAutocompleteResult', (data) => {
      this.businessResults.next(data.businesses);
    })
    this.socket.on('yelpIdResult', (data) => {
      this.idResults.next(data);
    })
    this.socket.on('sendingPlaceTable', (data) => {
      this.places.next(data);
    })

    this.socket.on('placeTableNeedUpdated',()=>{
      this.socket.emit('listAllPlacesByEvent', { userInfo: this.userInfo, eventInfo: this.eventInfo })
    })
  }




  searchPlaceByName(name: string) {
    this.socket.emit('searchPlaceByName', {
      keyword: name,
      latitude: this.userLocation.latitude,
      longitude: this.userLocation.longitude
    })
  }

  searchPlaceById(id: string) {
    this.socket.emit('searchPlaceById', {
      id: id
    })
  }

  getAutocompleteResult() {
    return this.businessResults.asObservable();
  }

  getIdResult() {
    return this.idResults.asObservable();
  }

  createPlace(place) {
    let data = {
      userInfo: this.userInfo,
      eventInfo: this.eventInfo,
      place: place
    };
    this.socket.emit('createPlace', data)
  }

  getPlaceList() {
    return this.places.asObservable();
  }

  voteIncrease(id) {
    this.socket.emit('placeVoteIncrease', {
      userInfo: this.userInfo,
      eventInfo: this.eventInfo,
      place: {
        placeId: id
      }
    })
  }
  voteDecrease(id) {
    this.socket.emit('placeVoteDecrease', {
      userInfo: this.userInfo,
      eventInfo: this.eventInfo,
      place: {
        placeId: id
      }
    })
  }
}
