import { Component } from '@angular/core';

import { ChatroomPage } from "../chatroom/chatroom";
import { DatesPage } from "../dates/dates";
import { HomePage } from '../home/home';
import { PlacesPage } from '../places/places'

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ChatroomPage;
  tab2Root = DatesPage;
  tab3Root = PlacesPage

  constructor() {

  }
}
