import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from "ng-socket-io";
import { Subject } from 'rxjs';

/*
  Generated class for the PlacesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PlacesProvider {

  userInfo = {
    userId: 1,
  }
  eventInfo = {
    eventId: 1,
    userEventId: 1,
  }

  userLocation = {
    latitude: 37.786942,
    longitude: -122.399643
  }


  private places: Subject<any>;
  private businessResults: Subject<any>;
  private idResults: Subject<any>;
  // private catagoriesResult:Subject<any>;
  constructor(public http: HttpClient, public socket: Socket) {
    this.businessResults = new Subject();
    this.idResults = new Subject();
    this.places = new Subject();
    this.socket.connect();
    this.socket.emit('listAllPlacesByEvent', { userInfo: this.userInfo, eventInfo: this.eventInfo });
    this.socket.on('yelpAutocompleteResult', (data) => {
      this.businessResults.next(data.businesses);
    })
    this.socket.on('yelpIdResult', (data) => {
      this.idResults.next(data);
    })
    this.socket.on('placeTableUpdated', (data) => {
      this.places.next(data);
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

  voteIncrease(id){
    this.socket.emit('placeVoteIncrease',{
      userInfo: this.userInfo, 
      eventInfo: this.eventInfo,
      place:{
        placeId:id
      }
    })
  }
  voteDecrease(id){
    this.socket.emit('placeVoteDecrease',{
      userInfo: this.userInfo, 
      eventInfo: this.eventInfo,
      place:{
        placeId:id
      }
    })
  }
}
