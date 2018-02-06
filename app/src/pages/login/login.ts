import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Storage } from '@ionic/storage';
import { FacebookAuthProvider } from '../../providers/facebook-auth/facebook-auth';
import { Socket } from "ng-socket-io";

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

  constructor(private navCtrl: NavController,
    private fb: Facebook,
    private storage: Storage,
    private facebookAuthProvider: FacebookAuthProvider,
  public socket:Socket) {}

  login():any {
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then((res: FacebookLoginResponse) => {
        this.storage.set('facebook_access_token', res.authResponse.accessToken)
        .then(() => {
          this.facebookAuthProvider.logIn().then(()=>{
            this.navCtrl.push(HomePage);
          });
        }).catch(e => console.log('Error logging into Facebook', e));
      })
      .catch(e => console.log('Error logging into Facebook', e));
  }

  ionViewDidLoad() {
    this.socket.disconnect();
  }
}
