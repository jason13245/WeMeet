import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ModalController} from 'ionic-angular';
import { CreateDatePage } from "../create-date/create-date";

/**
 * Generated class for the DatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-date',
  templateUrl: 'date.html',
})
export class DatePage {

  

  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl:ModalController) {
  }

  dates=[{
    id:1,
    date:1516868880000,
    voted:true,
    counter:5
  },{
    id:2,
    date:1516912140000,
    voted:false,
    counter:1
  }]

  ionViewDidLoad() {
    //console.log('ionViewDidLoad DatePage');
  
  }
  openCreateDateModal(){
    let modal=this.modalCtrl.create('CreateDatePage');
    modal.present(); 
  }
  checkboxClicked(event){

    console.log("checkbox clicked");
    console.log(event);
    //socket io emit event to backend 
    //on cbchanges?
    //on click?
    //on un-click?
    //
  }
  onChange(event,data){
    console.log('can change');
    console.log(event);
    console.log(data);
  }
}
