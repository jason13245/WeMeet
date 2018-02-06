import { Component } from '@angular/core';

import { ChatroomPage } from "../chatroom/chatroom";
import { DatesPage } from "../dates/dates";
import { HomePage } from '../home/home';
import { PlacesPage } from '../places/places'
import { NavParams } from 'ionic-angular'
import { ModalController } from 'ionic-angular'
import { Deeplinks } from '@ionic-native/deeplinks';
import { ShareLinkPage } from '../share-link/share-link';
import { Socket } from 'ng-socket-io';
import { EventProvider } from '../../providers/event/event';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  public eventData: object;

  public inviteLink: string;

  tab1Root = ChatroomPage;
  tab2Root = DatesPage;
  tab3Root = PlacesPage

  constructor(private navParams: NavParams, 
    public socket: Socket,public eventProvider: EventProvider) {
    this.eventData = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OtherPage');
  }

  // generateEventLink(eventData) {
  //   console.log(eventData);
  //   return 'wemeet://wemeet.space/event?url=' + eventData.eventData.url;
  // }

  // openShareLinkModal() {
  //   let profileModal = this.modalCtrl.create(ShareLinkPage, { link: this.inviteLink });
  //   profileModal.present();
  // }

  // setEventLinkRegulation(eventData) {
  //   this.deeplinks.route({
  //     '/event': {'url': eventData.eventData.url},
  //   }).subscribe((match) => {
  //     // match.$route - the route we matched, which is the matched entry from the arguments to route()
  //     // match.$args - the args passed in the link
  //     // match.$link - the full link data
  //     console.log('Successfully matched route', match);
  //   }, (nomatch) => {
  //     // nomatch.$link - the full link data
  //     console.error('Got a deeplink that didn\'t match', nomatch);
  //   });
  // }
}