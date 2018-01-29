import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from "ng-socket-io";

/*
  Generated class for the PlacesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PlacesProvider {

  constructor(public http: HttpClient,public socket:Socket) {
    //console.log('Hello PlacesProvider Provider');
    this.socket.connect();
  }

  searchPlaceByName(name:string){
    this.socket.emit('')
  }
}
