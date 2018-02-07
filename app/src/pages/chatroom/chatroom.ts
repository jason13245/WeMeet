import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Socket } from "ng-socket-io";
import { EventProvider } from '../../providers/event/event';
import { FacebookAuthProvider } from '../../providers/facebook-auth/facebook-auth';
import { HomePage } from '../home/home';
import { EventInfoPage } from "../event-info/event-info";
import { ShareLinkPage } from "../share-link/share-link";
import { ModalController } from 'ionic-angular/components/modal/modal-controller';

/**
 * Generated class for the ChatroomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chatroom',
  templateUrl: 'chatroom.html',
})
export class ChatroomPage {

  userInfo
  eventInfo
  messages = [];
  nickname = '';
  message = '';

  private inviteLink: string;

  constructor(private navCtrl: NavController, 
    private navParams: NavParams, 
    public socket: Socket, 
    private toastCtrl: ToastController,
    public eventProvider:EventProvider,
    public userService:FacebookAuthProvider,
    public modalCtrl: ModalController) {
    // this.nickname = this.navParams.get('nickname');
    // this.nickname = "joe";

    this.userService.getUserInfo().subscribe(info=>this.userInfo=info);
    this.eventProvider.getEventInfo().subscribe(info => this.eventInfo=info);

    this.inviteLink = this.eventProvider.generateEventLink(this.eventInfo);

    this.getMessages().subscribe(message => {
      this.messages.push(message);
    });

    this.getUsers().subscribe(data => {
      let user = data['user'];
      if (data['event'] === 'left') {
        this.showToast('User left: ' + user);
      } else {
        this.showToast('User joined: ' + user);
      }
    });
  }

  sendMessage() {
    this.socket.emit('add-message',{eventInfo:this.eventInfo, text: this.message,userInfo:this.userInfo, time: Date.now() });
    this.message = '';
  }

  ionViewDidLoad(){
    this.socket.emit('get-history', {eventInfo:this.eventInfo,userInfo:this.userInfo});
    console.log(this.eventInfo);
  }
  ionViewDidEnter(){
    this.eventProvider.getEventInfo().subscribe(info=> this.eventInfo=info)

    //this.socket.emit('set-nickname',this.nickname);
   // this.socket.emit('get-history', {eventInfo:this.eventInfo,userInfo:this.userInfo});
  }
  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }

  getUsers() {
    let observable = new Observable(observer => {
      this.socket.on('users-changed', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  ionViewWillLeave() {
  }

  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  toEventLobby() {
    this.navCtrl.setRoot(HomePage);
    this.navCtrl.popToRoot();
  }

  checkEventInfo() {
    console.log(this.eventInfo);
    let eventInfoModal=this.modalCtrl.create(EventInfoPage, { eventInfo: this.eventInfo});
    eventInfoModal.present();
  }

  openShareLinkModal() {
    let shareLink = this.modalCtrl.create(ShareLinkPage, { link: this.inviteLink });
    shareLink.present();
  }

}
