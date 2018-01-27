import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { SocketIoConfig, SocketIoModule } from "ng-socket-io";
import { HttpClientModule } from "@angular/common/http";

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ChatroomPage } from '../pages/chatroom/chatroom';
import { DatesPage } from "../pages/dates/dates";
import { PlacesPage } from "../pages/places/places";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DateProvider } from '../providers/date/date';
import { PlacesProvider } from '../providers/places/places';
import { FormsModule } from '@angular/forms';

const config: SocketIoConfig = { url: 'http://localhost:8080', options: {} }
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    ChatroomPage,
    DatesPage,
    PlacesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    SocketIoModule.forRoot(config),
    HttpClientModule,
    FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    ChatroomPage,
    DatesPage,
    PlacesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DateProvider,
    PlacesProvider
  ]
})
export class AppModule {}
