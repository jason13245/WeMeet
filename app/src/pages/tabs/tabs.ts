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

  public eventInfo: object;

  public inviteLink: string;

  tab1Root = ChatroomPage;
  tab2Root = DatesPage;
  tab3Root = PlacesPage

  constructor(private navParams: NavParams, 
    public socket: Socket,public eventProvider: EventProvider) {
    this.eventInfo = this.navParams.data;
  }



}
