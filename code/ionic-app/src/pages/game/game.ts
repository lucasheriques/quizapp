import { Component, Pipe, PipeTransform } from "@angular/core";
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
    name: "",
    answeredQuestions: "",
    wins: "",
    loses: "",
    sessionId: ""
  };
  sessionId: number;
  quizId: number;
  ready = false;
  start = false;
  quiz: any;
  questions = [
    {
      statement: "",
      answers: { t: "", f1: "", f2: "", f3: "" }
    }
  ];
  Object = Object;

  private _hubConnection: HubConnection | undefined;

  public sendMessage(): void {
    if (this._hubConnection) {
      this._hubConnection.invoke("Send", "update", "Lucas");
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
      .withUrl("http://localhost:9276/game")
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

  joinSession() {
    this.restProvider.addUser(this.user).then(
      result => {
        console.log(result);
        this._hubConnection.invoke("Send", "update", "Lucas");
        this.ready = true;
        this.sessionId = result.sessionId;
        this.restProvider.getQuiz(result.session.quizId).then(data => {
          this.quiz = data;
          console.log(this.quiz);
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
}
