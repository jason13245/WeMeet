import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

/*
  Generated class for the FacebookAuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FacebookAuthProvider {

  private backendAPI: string = 'http://localhost:5050/api/v1/user';

  public userInfo: Subject<{ userId: number, username: string }>
  public userLocation :Subject<{latitude: number,longitude: number}>

  constructor(public http: HttpClient,
    public storage: Storage) {
    console.log('Hello FacebookAuthProvider Provider');
    this.userLocation = new BehaviorSubject({latitude: 22.285557,longitude: 114.151831});
  }




  logIn() {
    return this.storage.get('facebook_access_token').then((access_token) => {
      return this.http.post(this.backendAPI + '/facebook/login', { access_token: access_token })
        .toPromise().then(
        result => {
          return this.storage.set('myToken', result).then(() => {
            return result;
          });
        },
        error => {
          console.log('fail');
        }
        );
    });
  }

  setUserInfo() {
    return this.storage.get('myToken').then((token) => {
      return this.http.post<{ userId: number, username: string }>(this.backendAPI + '/facebook/userInfo', { token: token })
        .subscribe(result => {
          console.log(result);
          this.userInfo = new BehaviorSubject({userId:1,username:"Test"})
          this.userInfo.next(result);
        },
        error => {
          console.log(error);
        })
    });
  }

  getUserInfo() {
    return this.userInfo.asObservable();
  }

  isAuth() {
    return this.storage.get('myToken').then((token) => {
      if (token != null) {
        return this.http.post(this.backendAPI + '/facebook/isAuth', { token: token })
          .subscribe(result => {
            return true
          },
          error => {
            console.log(error);
          })
      } else {
        return false;
      }
    });
  }

  getLocation(){
    return this.userLocation.asObservable();
  }


}
