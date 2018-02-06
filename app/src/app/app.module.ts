import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SocketIoModule,SocketIoConfig } from "ng-socket-io";
import { FormsModule } from '@angular/forms';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Facebook } from '@ionic-native/facebook';
import { Deeplinks } from '@ionic-native/deeplinks';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';

import { CreateEventPage } from '../pages/create-event/create-event';
import { ChatroomPage } from '../pages/chatroom/chatroom';
import { DatesPage } from "../pages/dates/dates";
import { PlacesPage } from "../pages/places/places";
import { ShareLinkPage } from "../pages/share-link/share-link";
import { EventInfoPage } from "../pages/event-info/event-info";

import { DateProvider } from '../providers/date/date';
import { PlacesProvider } from '../providers/places/places';
import { FacebookAuthProvider } from '../providers/facebook-auth/facebook-auth';
import { EventProvider } from '../providers/event/event';
import { Clipboard } from '@ionic-native/clipboard';

const config:SocketIoConfig={ url:'https://wemeet.space',options:{}}
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    TabsPage,
    CreateEventPage,
    ChatroomPage,
    DatesPage,
    PlacesPage,
    ShareLinkPage,
    EventInfoPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    SocketIoModule.forRoot(config),
    FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    TabsPage,
    CreateEventPage,
    ChatroomPage,
    DatesPage,
    PlacesPage,
    ShareLinkPage,
    EventInfoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Facebook,
    FacebookAuthProvider,
    EventProvider,
    DateProvider,
    PlacesProvider,
    Deeplinks,
    Clipboard
  ]
})
export class AppModule { }
