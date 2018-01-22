import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {

  token: string = null;

  constructor(public http: HttpClient,
    private storage: Storage) {
    console.log('Hello LoginProvider Provider');
    this.storage.get('access_token').then((res) => {
      this.token = res;
    });
  }

  login() {

    this.storage.get('access_token').then((res: string) => {

      if(res === null){
        
      }else{
        
      }
      this.token = res;
    });





    return this.http.post('https://graph.facebook.com/me?access_token=', { access_token: this.token })
      .subscribe((res: any) => {
        console.log(res.data);
        this.storage.set('access_token',res.token);
      },(err)=>{
          alert("You are not logged in. Dude!");
      });
  }

  logOut(){
    this.token = null;
    this.storage.remove('access_token');
}



}
