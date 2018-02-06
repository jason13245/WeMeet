import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Socket } from 'ng-socket-io'
import { PlacesProvider } from "../../providers/places/places";



/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  results=[];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public socket: Socket,
    public searchService:PlacesProvider,
    public modalCtrl:ModalController
  ) { }
  ionViewDidLoad() {
  }
  ionViewDidEnter(){
    this.searchService.getAutocompleteResult().subscribe((result)=>{
      this.results=result

      //console.log(result);
    })
  }
  searchAutocomplete(event) {
    if (event.target.value != "") {
      this.searchService.searchPlaceByName(event.target.value);
    }
  }
  searchById(id){
    this.searchService.searchPlaceById(id);
    let modal = this.modalCtrl.create('SearchResultPage');
    modal.present();
  }

}
