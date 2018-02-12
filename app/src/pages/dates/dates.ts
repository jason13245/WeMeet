import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ModalController, App} from 'ionic-angular';
import { Socket } from 'ng-socket-io'
import { DateProvider } from "../../providers/date/date";
import { EventInfoPage } from "../event-info/event-info";
import { HomePage } from '../home/home';
import { EventProvider } from '../../providers/event/event';
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

  private eventInfo: object;

  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl:ModalController,public socket:Socket,public dateServices:DateProvider,public app:App,public eventProvider:EventProvider) {
    this.eventInfo = this.navParams.data;
    console.log(this.eventInfo);
    this.dateServices.getlist().subscribe((result)=>{
      this.dates=result;
    })
    this.eventProvider.getEventInfo().subscribe(info => this.eventInfo=info);
  }

  data:any
  dates:any
  checkbox:any

  ionViewDidLoad() {
  }

  ionViewDidEnter(){}

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
    let eventInfoModal=this.modalCtrl.create(EventInfoPage, { eventInfo: this.eventInfo });
    eventInfoModal.present();
  }
  toEventLobby(eventInfo) {
    console.log(eventInfo);
    this.socket.emit('leave-event', eventInfo);
    this.app.getRootNav().setRoot(HomePage);
  }
}
