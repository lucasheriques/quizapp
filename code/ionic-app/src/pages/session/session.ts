import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {RestProvider} from '../../providers/rest/rest';

/**
 * Generated class for the SessionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({selector: 'page-session', templateUrl: 'session.html'})
export class SessionPage {

  session : any;

  constructor(public navCtrl : NavController, public navParams : NavParams, public restProvider : RestProvider) {
    this.getSession(navParams.get("id"));
  }

  getSession(id) {
    this
      .restProvider
      .getSession(id)
      .then(data => {
        this.session = data;
        console.log(this.session);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SessionPage');
  }

}
