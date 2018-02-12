import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';
import { Storage } from '@ionic/storage';
import { FacebookAuthProvider } from '../../providers/facebook-auth/facebook-auth';
import { EventProvider } from '../../providers/event/event';
import { CreateEventPage } from '../create-event/create-event';
import { MenuController } from 'ionic-angular';
import { Socket } from "ng-socket-io";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {
  constructor(public navCtrl: NavController,
    private storage: Storage,
    public menuCtrl: MenuController,
    private eventProvider: EventProvider,
    private facebookAuthProvider: FacebookAuthProvider,
    public socket:Socket) {
  }

  userInfo:{
    userId:number,
    username:string
  }

  eventList: any = {};

  eventObj: any = {}

  logout() {
    return this.storage.remove('myToken').then((token) => {
      this.navCtrl.push(LoginPage);
    });
  }

  getUserInfo() {
    this.facebookAuthProvider.getUserInfo().subscribe(info=> 
      this.userInfo=info)
  }

  ionViewWillEnter() {
    this.facebookAuthProvider.setUserInfo();
    this.eventProvider.getEventList().then(eventList => {
      this.eventList = eventList;
    });
  }

  ionViewDidLoad(){
  }

  toCreateEventPage() {
    this.navCtrl.push(CreateEventPage);
  }

  toEventRoom(eventInfo) {
    this.eventProvider.enterEvent(eventInfo);
    this.socket.emit('enter-event', eventInfo); 
    this.navCtrl.push(TabsPage, {
      eventInfo
    });
  }
}
