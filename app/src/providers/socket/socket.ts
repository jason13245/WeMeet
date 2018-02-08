import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from "ng-socket-io";
/*
  Generated class for the SocketProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SocketProvider {

  constructor(public http: HttpClient,public socket:Socket) {

  }
  sendMessage(data){
    this.socket.emit('add-message',data);
  }

  
}
