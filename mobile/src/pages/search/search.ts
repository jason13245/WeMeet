import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Socket } from 'ng-socket-io'
import { NativeProvider } from '../../providers/native/native';


/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public socket:Socket,
     public NativeService:NativeProvider) {}
  private pos=this.NativeService.pos;

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }
  searchByName(event){
    console.log('pos: '+this.pos);
  }

}
