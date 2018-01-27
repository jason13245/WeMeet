import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  places=[{
    id:1,
    placename:"mc donald",
    yelpId:'mc-donald',
    counter:10,
    voted:true
  },{
    id:2,
    placename:"KFC",
    yelpId:'kfc',
    counter:12,
    voted:false
  }]

  ionViewDidLoad() {
    //console.log('ionViewDidLoad PlacesPage');
  }
  openSearchPage(){
    this.navCtrl.push('SearchPage');
  }

}
