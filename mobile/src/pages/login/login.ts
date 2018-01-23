import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Storage } from '@ionic/storage';
import { FacebookAuthProvider } from '../../providers/facebook-auth/facebook-auth';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController,
    private fb: Facebook,
    private storage: Storage,
    private facebookAuthProvider: FacebookAuthProvider) {}

  login():any {
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then((res: FacebookLoginResponse) => {
        this.storage.set('facebook_access_token', res.authResponse.accessToken);
        this.facebookAuthProvider.logIn();
        console.log(res.authResponse.accessToken);
      })
      .catch(e => console.log('Error logging into Facebook', e));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
