import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, App } from 'ionic-angular';
import { PlacesProvider } from "../../providers/places/places";
import { Socket } from 'ng-socket-io'
import { HomePage } from '../home/home';
import { EventInfoPage } from "../event-info/event-info";
import { EventProvider } from '../../providers/event/event';


/**
 * Generated class for the PlacesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-places',
  templateUrl: 'places.html',
})
export class PlacesPage {

  eventInfo

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public placeServices: PlacesProvider,
    public modalCtrl: ModalController,
    public socket: Socket,
    public app: App,
    public eventProvider: EventProvider) {
    this.eventProvider.getEventInfo().subscribe(info => this.eventInfo = info);
  }

  places = []

  ionViewDidLoad() {

  }
  ionViewDidEnter() {
    this.placeServices.getPlaceList().subscribe((result) => {
      this.places = result;
    })
  }
  openSearchPage() {
    this.navCtrl.push('SearchPage');
  }
  onChange(event, place) {
    if (event.checked) {
      this.placeServices.voteIncrease(place.id)
    } else if (!event.checked) {
      this.placeServices.voteDecrease(place.id)
    }
  }
  searchById(id) {
    this.placeServices.searchPlaceById(id);
    let modal = this.modalCtrl.create('SearchResultPage');
    modal.present();
  }
  checkEventInfo() {
    let eventInfoModal = this.modalCtrl.create(EventInfoPage, { eventInfo: this.eventInfo });
    eventInfoModal.present();
  }
  toEventLobby(eventInfo) {
    this.socket.emit('leave-event', eventInfo);
    this.app.getRootNav().setRoot(HomePage);
  }

}
