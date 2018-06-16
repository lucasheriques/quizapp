import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  LoadingController
} from "ionic-angular";
import { RestProvider } from "../../providers/rest/rest";
import { HubConnection } from "@aspnet/signalr";
import * as signalR from "@aspnet/signalr";

/**
 * Generated class for the GamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-game",
  templateUrl: "game.html"
})
export class GamePage {
  user = {
    id: 0,
    name: "",
    answeredQuestions: "",
    wins: 0,
    loses: 0,
    sessionId: ""
  };
  sessionId: number;
  quizId: number;
  ready = false;
  start = false;
  quiz: any;
  answers = [];
  questions = [
    {
      statement: "",
      answers: { t: "", f1: "", f2: "", f3: "" }
    }
  ];
  Object = Object;
  finished = false;

  private _hubConnection: HubConnection | undefined;

  public sendMessage(): void {
    if (this._hubConnection) {
      this._hubConnection.invoke(
        "Send",
        this.user.id,
        this.user.name,
        this.user.wins,
        this.user.loses
      );
    }
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public restProvider: RestProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) {
    this._hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("http://192.168.43.170:5000/game")
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this._hubConnection.start().catch(err => console.error(err.toString()));
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad GamePage");
  }

  getQuestions() {
    this.quiz.questions.forEach(element => {
      const wrongAnswers = element.wrongAnswers.split("_;_");
      this.questions.push({
        statement: element.statement,
        answers: {
          t: element.correctAnswer,
          f1: wrongAnswers[0],
          f2: wrongAnswers[1],
          f3: wrongAnswers[2]
        }
      });
    });
    console.log(this.questions[0].answers);
  }

  computeAnswers() {
    this.user.wins = 0;
    this.user.loses = 0;
    this.user.answeredQuestions = "";
    this.answers.forEach((answer, index) => {
      if (answer) this.user.wins++;
      else this.user.loses++;
      this.user.answeredQuestions += "" + index + answer;
    });
    console.log(this.user.wins);
  }

  storeAnswer(correct, index) {
    if (correct == "t") this.answers[index] = true;
    else this.answers[index] = false;
    this.computeAnswers();
    this.sendMessage();
  }

  joinSession() {
    this.restProvider.addUser(this.user).then(
      result => {
        console.log(result);
        this.user.id = result.id;
        console.log(this.user);
        this._hubConnection.invoke(
          "Send",
          this.user.id,
          this.user.name,
          this.user.wins,
          this.user.loses
        );
        this.ready = true;
        this.sessionId = result.sessionId;
        this.restProvider.getQuiz(result.session.quizId).then(data => {
          this.quiz = data;
          this.getQuestions();
        });
        const loader = this.loadingCtrl.create({
          content: "Aguarde o professor começar o quiz"
        });
        loader.present();
        this._hubConnection.on("StartedGame", (data: any) => {
          loader.dismiss();
        });
      },
      err => {
        const alert = this.alertCtrl.create({
          title: "Erro!",
          subTitle: "Sessão inválida!",
          buttons: ["OK"]
        });
        alert.present();
        console.log(err);
      }
    );
  }

  finishSession() {
    this.computeAnswers();
    this.restProvider.editUser(this.user.id, this.user).then(
      result => {
        console.log(result);
        this.finished = true;
      },
      err => {
        console.log(err);
      }
    );
  }
}
