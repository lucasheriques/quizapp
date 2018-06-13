import {Component} from '@angular/core';
import {NavController, ModalController} from 'ionic-angular';
import {RestProvider} from '../../providers/rest/rest';
import {AddQuizPage} from '../add-quiz/add-quiz';
import {QuizPage} from '../quiz/quiz';
import {GamePage} from '../game/game';

@Component({selector: 'page-home', templateUrl: 'home.html'})
export class HomePage {

  quizzes : any;
  quiz = {
    id: '',
    name: '',
    description: ''
  };

  constructor(public navCtrl : NavController, public modalCtrl : ModalController, public restProvider : RestProvider) {
    this.getQuizzes();
  }

  getQuizzes() {
    this
      .restProvider
      .getQuizzes()
      .then(data => {
        this.quizzes = data;
      });
  }

  quizDetails(quiz) {
    console.log(quiz);
  }

  addQuizModal() {
    const modal = this
      .modalCtrl
      .create(AddQuizPage);
    modal.onDidDismiss(() => {
      this.getQuizzes();
    })
    modal.present();
  }

  deleteQuiz(id) {
    this
      .restProvider
      .deleteQuiz(id)
      .then(data => {
        this.getQuizzes();
      });
  }

  openQuiz(id) {
    this
      .navCtrl
      .push(QuizPage, {id: id})
  }

  openGame(id) {
    this
      .navCtrl
      .push(GamePage)
  }
}
