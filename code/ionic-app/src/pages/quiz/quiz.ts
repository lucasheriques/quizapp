import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { RestProvider } from "../../providers/rest/rest";
import { SessionPage } from "../session/session";
import { QuestionPage } from "../question/question";
import { AddSessionPage } from "../add-session/add-session";

/**
 * Generated class for the QuizPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({ selector: "page-quiz", templateUrl: "quiz.html" })
export class QuizPage {
  quiz: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public restProvider: RestProvider
  ) {
    
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad QuizPage");
  }
  ionViewDidEnter(){
    this.getQuiz(this.navParams.get("id"));
  }

  getQuiz(id) {
    this.restProvider.getQuiz(id).then(data => {
      this.quiz = data;
      console.log(this.quiz);
    });
  }

  addSession() {
    this.restProvider.addQuiz(this.quiz).then(
      result => {
        console.log(result);
      },
      err => {
        console.log(err);
      }
    );
  }

  openQuiz(id) {
    this.navCtrl.push(QuizPage, { id: id });
  }

  openSession(id) {
    this.navCtrl.push(SessionPage, { id: id });
  }
  addQuestion(id) {
    this.navCtrl.push(QuestionPage, {
      id: id
    });
  }
  deleteQuestions(id) {
    this
      .restProvider
      .deleteQuestions(id)
      .then(data => {
        this.deleteQuestions(id);
      });
      this.getQuiz(this.navParams.get("id"));
  }
  createSession(id){
    this.navCtrl.push(AddSessionPage, {
      id:id
    });
  }
}
