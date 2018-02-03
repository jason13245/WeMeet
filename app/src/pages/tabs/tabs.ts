import { Component } from '@angular/core';

import { ChatroomPage } from "../chatroom/chatroom";
import { DatesPage } from "../dates/dates";
import { HomePage } from '../home/home';
import { PlacesPage } from '../places/places'
import { NavParams } from 'ionic-angular'

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  public eventData: object;

  tab1Root = ChatroomPage;
  tab2Root = DatesPage;
  tab3Root = PlacesPage

  constructor(navParams: NavParams) {
    this.eventData = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OtherPage');
    console.log(this.eventData);
  }
}
