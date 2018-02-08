import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from "ng-socket-io";
//import { Observable } from 'rxjs/Observable';
import { Subject } from "rxjs";
import * as moment from "moment";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FacebookAuthProvider } from '../facebook-auth/facebook-auth';
import { EventProvider } from '../event/event';
/*
  Generated class for the DateProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DateProvider {

  private dateList:Subject<any>;

  private userInfo:any
  private eventInfo:any;

  constructor(public http: HttpClient,
    public socket:Socket, 
    public facebookAuthProvider: FacebookAuthProvider, 
    public eventProvider:EventProvider) {
    this.facebookAuthProvider.getUserInfo().subscribe(info => this.userInfo = info)
    this.eventProvider.getEventInfo().subscribe(info=> this.eventInfo = info);
    this.dateList = new BehaviorSubject(null);
    this.socket.on('dateTableUpdated',(result)=>{
      let data = result.map((ele)=>{
        return {
          ...ele,
          date:moment.unix(ele.date).utc().format("YYYY M D h:mm A")
        }
      })
      this.dateList.next(data);
    })
  }  

  getlist(){
      this.socket.emit('listAllDatesByEvent',{userInfo:this.userInfo,eventInfo:this.eventInfo});
      return this.dateList.asObservable();
  }
  createDate(date:number){
    this.socket.emit('dateCreated',{
      userInfo:this.userInfo,
      eventInfo:this.eventInfo,
      date:date});
  }
  voteIncrease(Id:number){
    console.log('vote increase');
    this.socket.emit('dateVoteIncrease',{
      userInfo:this.userInfo,
      eventInfo:this.eventInfo,
      date:{
        dateId:Id
      }
    })
  }
  voteDecrease(Id:number){
    this.socket.emit('dateVoteDecrease',{
      userInfo:this.userInfo,
      eventInfo:this.eventInfo,
      date:{
        dateId:Id
      }
    })
  }
}
