import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the QuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-question',
  templateUrl: 'question.html',
})
export class QuestionPage {
question={"statement":"","correctAnswer":"","wrongAnswers":"RespostaErrada_;_RespostaErrada_;_RespostaErrada","quizId":""};
wrongAnswers={"a1":"","a2":"","a3":""};
  constructor(public navCtrl: NavController, public navParams: NavParams,public restProvider:RestProvider) {
    this.question.quizId=navParams.get('id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionPage');
  }
  send(){
    this.question.wrongAnswers=this.wrongAnswers.a1+"_;_"+this.wrongAnswers.a2+"_;_"+this.wrongAnswers.a3;
   this.addQuestion();
   this.navCtrl.pop();

  }
  addQuestion(){
    this
    .restProvider
    .addQuestions(this.question)
    .then((result) => {
      console.log(result);
    }, (err) => {
      console.log(err);
    });
  }


}
