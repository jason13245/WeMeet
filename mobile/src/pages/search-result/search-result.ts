import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { PlacesProvider } from "../../providers/places/places";
/**
 * Generated class for the SearchResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-result',
  templateUrl: 'search-result.html',
})
export class SearchResultPage {

  result ={}
  loaded=false
  photos = [];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public placeService: PlacesProvider,
    public viewCrtl: ViewController) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad SearchResultPage');

    this.placeService.getIdResult().subscribe((data) => {
      this.photos = data.photos
      this.result = data;
    })
  }
  ionViewDidEnter() {
    this.placeService.getIdResult().subscribe((data) => {
      this.loaded=true;
      this.photos = data.photos;
      this.result = data;
    })
  }



  confirm() {
    this.viewCrtl.dismiss();
    this.placeService.createPlace({ placeName: this.result.name, yelpId: this.result.id });
  }

  back() {
    this.viewCrtl.dismiss()
  }



}
