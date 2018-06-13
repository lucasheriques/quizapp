import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {RestProvider} from '../../providers/rest/rest';

/**
 * Generated class for the AddQuizPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({selector: 'page-add-quiz', templateUrl: 'add-quiz.html'})
export class AddQuizPage {

  quiz = {
    name: '',
    description: ''
  };

  constructor(public viewCtrl : ViewController, public restProvider : RestProvider) {}

  public dismiss() {
    this
      .viewCtrl
      .dismiss();
  }

  addQuiz() {
    this
      .restProvider
      .addQuiz(this.quiz)
      .then((result) => {
        console.log(result);
        this.dismiss();
      }, (err) => {
        console.log(err);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddQuizPage');
  }

}
