import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Clipboard } from '@ionic-native/clipboard';

/**
 * Generated class for the ShareLinkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-share-link',
  templateUrl: 'share-link.html',
})
export class ShareLinkPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private clipboard: Clipboard) {
  }

  private shareLink:string;

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShareLinkPage');
    this.shareLink = this.navParams.get('link');
    console.log('link', this.navParams.get('link'));
  }

  copyLink(){
    this.clipboard.copy(this.shareLink).then(() => {
      console.log(this.shareLink + ' is copied!');
    });
    
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

}
