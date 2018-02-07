import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventProvider } from '../../providers/event/event';
import { ViewController } from 'ionic-angular/navigation/view-controller';

/**
 * Generated class for the EventInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-info',
  templateUrl: 'event-info.html',
})
export class EventInfoPage {

  private eventInfo: any;

  private participants: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public eventProvider: EventProvider,
    public viewCtrl: ViewController) {
    this.eventInfo = this.navParams.get('eventInfo');
    console.log(this.eventInfo);
    this.getParticipants(this.eventInfo);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventInfoPage');
  }

  getParticipants(eventData) {
    this.eventProvider.getParticipants(eventData).then(info => {
      this.participants=info;
    });
  }

  dismissEventInfoModal() {
    this.viewCtrl.dismiss()
  }

}
