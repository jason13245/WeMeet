import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { EventInfoPage } from "../event-info/event-info";
import { ShareLinkPage } from "../share-link/share-link";
import { EventProvider } from "../../providers/event/event";

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

  private eventData: object;
  private inviteLink: string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl:ModalController,
    public eventProvider: EventProvider) {
    this.eventData = this.navParams.data;
    this.inviteLink = this.eventProvider.generateEventLink(this.eventData);
    console.log(this.eventData);
  }

  ionViewDidLoad() {
  }

  toEventLobby() {
    this.navCtrl.push(HomePage);
  }

  checkEventInfo() {
    let eventInfoModal=this.modalCtrl.create(EventInfoPage, this.eventData);
    eventInfoModal.present();
  }

  openShareLinkModal() {
    let shareLink = this.modalCtrl.create(ShareLinkPage, { link: this.inviteLink });
    shareLink.present();
  }

}
