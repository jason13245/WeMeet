import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from "ng-socket-io";
import { Subject } from "rxjs";
import { Observable } from "rxjs/Observable";

/*
  Generated class for the DateProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DateProvider {

  private lists:Subject<any>;

  constructor(public http: HttpClient,public socket:Socket) {
    console.log('Hello DateProvider Provider');
    this.lists=new Subject;

    this.socket.connect();
    this.socket.emit('listAllDatesByEvent',this.userData);
    this.socket.on('dateTableUpdated',(result)=>{
      this.lists.next(result);
    })
  }

  userData={
    userId:1,
    eventId:1
  }

 
  

  getlist(){
    return this.lists.asObservable();
  }
}
