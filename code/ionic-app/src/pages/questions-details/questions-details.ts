import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { ThrowStmt } from '@angular/compiler';

/**
 * Generated class for the QuestionsDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-questions-details',
  templateUrl: 'questions-details.html',
})
export class QuestionsDetailsPage {
  question:any;
  wrongAnswers: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public restProvider:RestProvider) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionsDetailsPage');
  }
  ionViewDidEnter() {
    this.getQuiz(this.navParams.get('id'));
    console.log('ionViewDidLoad QuestionsDetailsPage');
  }
  getQuiz(id) {
    this.restProvider.getQuestion(id).then(data => {
      this.question = data;
      this.wrongAnswers = this.question.wrongAnswers.split("_;_");
      console.log(this.wrongAnswers);
      console.log(this.question);
    });
  }
}
