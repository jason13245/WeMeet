import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventProvider } from '../../providers/event/event';
import { HomePage } from '../home/home';

/**
 * Generated class for the CreateEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-event',
  templateUrl: 'create-event.html',
})
export class CreateEventPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public eventProvider: EventProvider) {
  }

  eventObj = {
    eventName: '',
    eventType: 1
  }

  ionViewDidLoad() {
  }

  createEvent() {
    this.eventProvider.createEvent(this.eventObj).then((output) => {

      this.navCtrl.push(HomePage);
    });
  }

}
