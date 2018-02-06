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

  private eventData: object;

  private eventInfo: object;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public eventProvider: EventProvider,
    public viewCtrl: ViewController) {
    this.eventData = this.navParams.data;
    this.fetchEventInfo(this.eventData);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventInfoPage');
  }

  fetchEventInfo(eventData) {
    this.eventProvider.getEventInfo(eventData).then((result) => {
      console.log(result);
      this.eventInfo = result;
    })
  }

  dismissEventInfoModal() {
    this.viewCtrl.dismiss()
  }

}
