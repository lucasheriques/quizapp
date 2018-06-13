import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {RestProvider} from '../../providers/rest/rest';
import {SessionPage} from '../session/session';

/**
 * Generated class for the QuizPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({selector: 'page-quiz', templateUrl: 'quiz.html'})
export class QuizPage {
  quiz : any;

  constructor(public navCtrl : NavController, public navParams : NavParams, public restProvider : RestProvider) {
    this.getQuiz(navParams.get("id"));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuizPage');
  }

  getQuiz(id) {
    this
      .restProvider
      .getQuiz(id)
      .then(data => {
        this.quiz = data;
        console.log(this.quiz);
      });
  }

  addSession() {
    this
      .restProvider
      .addQuiz(this.quiz)
      .then((result) => {
        console.log(result);
      }, (err) => {
        console.log(err);
      });
  }

  openQuiz(id) {
    this
      .navCtrl
      .push(QuizPage, {id: id})
  }

  openSession(id) {
    this
      .navCtrl
      .push(SessionPage, {id: id})
  }

}