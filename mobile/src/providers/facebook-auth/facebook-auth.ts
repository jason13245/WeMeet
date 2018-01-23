import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { environment } from '../../../environments/environments'
// import { NavController } from 'ionic-angular';

/*
  Generated class for the FacebookAuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FacebookAuthProvider {

  constructor(public http: HttpClient, 
    public storage: Storage) {
    console.log('Hello FacebookAuthProvider Provider');
  }

  logIn() {
    this.storage.get('facebook_access_token').then((access_token) => {
      console.log(access_token);

      return this.http.post( environment.backendAPI + '/user/facebook/login',{ access_token: access_token })
      .subscribe(
        result => {
          console.log(result);
          this.storage.set('myToken',result);
        },
        error => {
          console.log(error);
        }
      );
    });
  }
}
