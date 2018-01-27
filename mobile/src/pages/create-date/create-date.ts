import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController} from 'ionic-angular';
import * as momnet from "moment";
/**
 * Generated class for the CreateDatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-date',
  templateUrl: 'create-date.html',
})
export class CreateDatePage {

  public date={
    day:"",
    time:""
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad CreateDatePage');
  }
  dismissCreateDateModal(){
    this.viewCtrl.dismiss()
  }
  confirm(){
    this.viewCtrl.dismiss()
    console.log(this.date);
    console.log(momnet.utc(this.date.day+this.date.time,"YYYY-MM-DDHH:mm").valueOf())
  }

}
