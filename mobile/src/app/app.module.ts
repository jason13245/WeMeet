import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { SocketIoConfig, SocketIoModule } from "ng-socket-io";
import { HttpClientModule } from "@angular/common/http";
import { Geolocation} from '@ionic-native/geolocation';



import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { PlacesPage } from "../pages/places/places";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PlacesProvider } from '../providers/places/places';
import { NativeProvider } from '../providers/native/native';
import { networkProvider, networkFactory } from '../providers/ionic-native/ionic-native';

const config: SocketIoConfig = { url: 'http://localhost:8080', options: {} }
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    PlacesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    SocketIoModule.forRoot(config),
    HttpClientModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    PlacesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    PlacesProvider,
    NativeProvider,
    networkProvider,
    Geolocation
  ]
})
export class AppModule { }
