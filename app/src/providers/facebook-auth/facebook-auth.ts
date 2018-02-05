import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the FacebookAuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FacebookAuthProvider {

  private backendAPI: string = 'http://localhost:5050/api/v1/user';

  constructor(public http: HttpClient, 
    public storage: Storage) {
    console.log('Hello FacebookAuthProvider Provider');
  }
  userInfo:{
    id:number,
  }
  eventInfo:{
    eventId:number,
    
  }

  logIn() {
    return this.storage.get('facebook_access_token').then((access_token) => {
      return this.http.post(this.backendAPI + '/facebook/login',{ access_token: access_token })
      .toPromise().then(
        result => {
          return this.storage.set('myToken',result).then(() => {
            return result;
          });
        },
        error => {
          console.log('fail');
        }
      );
    });
  }

  getUserInfo(){
    return this.storage.get('myToken').then((token) => {
      return this.http.post(this.backendAPI + '/facebook/userInfo',{ token: token })
      .subscribe(result => {
        console.log(result);
      },
      error => {
        console.log(error);
      })
    });
  }

  isAuth(){
    return this.storage.get('myToken').then((token) => {
      if(token != null){
        return this.http.post(this.backendAPI + '/facebook/isAuth',{ token: token })
        .subscribe(result => {
          console.log(result);
        },
        error => {
          console.log(error);
        })
      }else{
        return false;
      }
    });
  }


}
