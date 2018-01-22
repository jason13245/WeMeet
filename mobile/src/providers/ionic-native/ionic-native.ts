import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Network } from '@ionic-native/network';

/*
  Generated class for the IonicNativeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BrowserNetworkProvider extends Network {

  public get type(): string {
    return this.isOnline() ? 'wify' : 'none';
  }

  private isOnline(): boolean {
    return navigator.onLine;
  }

}
export class MobileNetworkProvider extends Network {}


export function networkFactory(platform: Platform) {
    return platform.is('cordova') ? new MobileNetworkProvider() : new BrowserNetworkProvider();
}

export let networkProvider =
    {
        provide: Network,
        useFactory: networkFactory,
        deps: [Platform]
    };
