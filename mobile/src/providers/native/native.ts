import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { Platform } from 'ionic-angular';

/*
  Generated class for the NativeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NativeProvider implements OnInit {

  constructor(
    public http: HttpClient,
    public platform: Platform,
    public geolocation: Geolocation) {}

  pos: Geoposition

  ngOnInit() {
    this.platform.ready().then(() => {

      this.geolocation.getCurrentPosition().then(pos => {
        console.log('lat: ' + pos.coords.latitude, +', lon: ' + pos.coords.longitude);
        this.pos = pos
      });
      this.geolocation.watchPosition().subscribe(pos => {
        console.log('lat: ' + pos.coords.latitude, +', lon: ' + pos.coords.longitude);
        this.pos = pos
      });

    });

    let options: PushOptions = {
      android: {
        senderID: "123"
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      },
      windows: {},
      browser: {
        pushServiceURL: 'http://push.api.phonegap.com/v1/push'
      }
    };
  }
  getGeoPosition(): Geoposition {
    return this.pos
  }

  
  
}
