import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { RestProvider } from "../../providers/rest/rest";
import { HubConnection } from "@aspnet/signalr";
import * as signalR from "@aspnet/signalr";

/**
 * Generated class for the SessionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({ selector: "page-session", templateUrl: "session.html" })
export class SessionPage {
  session: any;
  private _hubConnection: HubConnection | undefined;
  messages: string[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public restProvider: RestProvider
  ) {
    this.getSession(navParams.get("id"));
    this._hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:9276/game")
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this._hubConnection.start().catch(err => console.error(err.toString()));

    this._hubConnection.on("ReceiveMessage", (data: any) => {
      console.log("teste");
      this.getSession(this.session.id);
    });
  }

  startSession(): void {
    if (this._hubConnection) {
      this._hubConnection.invoke("StartGame");
    }
  }

  getSession(id) {
    this.restProvider.getSession(id).then(data => {
      this.session = data;
      console.log(this.session);
    });
  }
  sessionsToggle(id) {
    this.restProvider.sessionsToggle(id).then(data => {
      this.session = data;
      console.log(this.session);
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad SessionPage");
  }
}
