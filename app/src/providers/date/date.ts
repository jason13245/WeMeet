import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from "ng-socket-io";
//import { Observable } from 'rxjs/Observable';
import { Subject } from "rxjs";
import * as moment from "moment";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FacebookAuthProvider } from '../facebook-auth/facebook-auth';
/*
  Generated class for the DateProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DateProvider {

  private dateList:Subject<Array<{date:string,voted:boolean,counter:number,id:number}>>;

  // userInfo={
  //   userId:1,
  // }
  // eventInfo={
  //   eventId:1,
  //   userEventId:number,
  // }
  private userInfo:{userId:number}
  private eventInfo:{eventId:number}

  constructor(public http: HttpClient,public socket:Socket, public facebookAuthProvider: FacebookAuthProvider) {
    
  }

  getlist(eventData){
    console.log('----');
    console.log(this.eventInfo);
    console.log(eventData.id);
    this.eventInfo.eventId = eventData.id;

    this.dateList = new BehaviorSubject([]);
    this.facebookAuthProvider.getUserInfo().then(payload => {
      console.log(payload);
      this.userInfo.userId = payload.id;


      this.socket.connect();
      this.socket.emit('listAllDatesByEvent',{userInfo:this.userInfo,eventInfo:this.eventInfo});
      this.socket.on('dateTableUpdated',(result)=>{
  
        let data = result.map((ele)=>{
          return {
            ...ele,
            date:moment.unix(ele.date).utc().format("YYYY M D h:mm A")
          }
        })
        this.dateList.next(data);
      })
  
      return this.dateList.asObservable();


    })
  }
  createDate(date:number){
    this.socket.emit('dateCreated',{
      userInfo:this.userInfo,
      eventInfo:this.eventInfo,
      date:date});
  }
  voteIncrease(Id:number){
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
