import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the AddSessionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-session',
  templateUrl: 'add-session.html',
})
export class AddSessionPage {
  session={"name":"","quizId":"","available":"true"}
  constructor(public navCtrl: NavController, public navParams: NavParams,public restProvider:RestProvider) {
  this.session.quizId=navParams.get('id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddSessionPage');
  }
  send(){
    this.addQuestion();
   this.navCtrl.pop();

  }
  addQuestion(){
    this
    .restProvider
    .addSession(this.session)
    .then((result) => {
      console.log(result);
    }, (err) => {
      console.log(err);
    });
  }

}
