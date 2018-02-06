import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ModalController} from 'ionic-angular';
import { Socket } from 'ng-socket-io'
import { DateProvider } from "../../providers/date/date";
import { EventInfoPage } from "../event-info/event-info";
// import { DateProvider } from "../../providers/date/date";
/**
 * Generated class for the DatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-date',
  templateUrl: 'dates.html',
})
export class DatesPage {

  private eventData: object;

  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl:ModalController,public socket:Socket,public dateServices:DateProvider) {
    this.eventData = this.navParams.data;
    console.log(this.eventData);
  }

  dates:Array<{date:string,voted:boolean,counter:number,id:number}>;

  ionViewDidLoad() {
    
  }

  ionViewDidEnter(){
    console.log(this.eventData);
    this.dateServices.getlist(this.eventData).subscribe((result)=>{
      this.dates=result;
    })
  }

  openCreateDateModal(){
    let modal=this.modalCtrl.create('CreateDatePage');
    modal.present(); 
  }

  onChange(event,date){
    if(event.checked){
      this.dateServices.voteIncrease(date.id);
    }else if (!event.checked){
      this.dateServices.voteDecrease(date.id);
    }
  }

  checkEventInfo() {
    let eventInfoModal=this.modalCtrl.create(EventInfoPage, this.eventData);
    eventInfoModal.present();
  }
}
