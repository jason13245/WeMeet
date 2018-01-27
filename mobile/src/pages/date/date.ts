import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ModalController} from 'ionic-angular';
import { Socket } from 'ng-socket-io'
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
  templateUrl: 'date.html',
})
export class DatePage {

  

  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl:ModalController,public socket:Socket) {
  }

  dates=[];
  userData={
    userId:1,
    eventId:1
  }


  ionViewDidLoad() {
    //console.log('ionViewDidLoad DatePage');
    
  }

  ionViewDidEnter(){
    console.log('date page did enter');
    // this.dateServices.getlist().subscribe((result)=>{
    //   this.dates=result;
    // })
    this.socket.connect();
    this.socket.on('connected',(result)=>{
      console.log(result);
    })
    this.socket.emit('send',"data");
    this.socket.emit('listAllDatesByEvent',this.userData);
    this.socket.on('dateTableUpdated',(result)=>{
      console.log('get data');
      console.log(result);
    })
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
