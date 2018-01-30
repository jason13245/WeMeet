import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { FacebookAuthProvider } from '../../providers/facebook-auth/facebook-auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController,
    private storage: Storage,
    private facebookAuthProvider: FacebookAuthProvider) {
  }

  logout() {
    return this.storage.remove('myToken').then((token) => {
      this.navCtrl.push(LoginPage);
    });
  }

  getUserInfo() {
    return this.facebookAuthProvider.getUserInfo().then(payload => {
      console.log(payload);
      return payload;
    })
  }

  ionViewCanEnter() {
    return this.facebookAuthProvider.isAuth().then(payload => {
      return payload;
    });
  }

}
