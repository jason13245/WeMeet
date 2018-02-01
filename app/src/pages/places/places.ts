import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { PlacesProvider } from "../../providers/places/places";


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

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public placeServices: PlacesProvider,
    public modalCtrl: ModalController) {
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

}
