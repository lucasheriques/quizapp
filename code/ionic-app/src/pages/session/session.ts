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
  usersMap = new Map();
  private _hubConnection: HubConnection | undefined;
  Object = Object;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public restProvider: RestProvider
  ) {
    this.getSession(navParams.get("id"));
    this._hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("http://192.168.43.170:5000/game")
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this._hubConnection.start().catch(err => console.error(err.toString()));

    this._hubConnection.on(
      "UpdateUser",
      (id: number, name: string, wins: number, loses: number) => {
        console.log(this.usersMap);
        if (!this.usersMap.get(id)) {
          this.usersMap.set(id, {
            id: id,
            name: name,
            wins: wins,
            loses: loses
          });
        } else {
          this.usersMap.get(id).wins = wins;
          this.usersMap.get(id).loses = loses;
        }
      }
    );
  }

  startSession(): void {
    if (this._hubConnection) {
      this._hubConnection.invoke("StartGame");
    }
  }

  getUsersArray() {
    return Array.from(this.usersMap.values());
  }

  getSession(id) {
    this.restProvider.getSession(id).then(data => {
      this.session = data;
      if (this.session.users) {
        this.session.users.forEach(user => {
          this.usersMap.set(user.id, {
            id: user.id,
            name: user.name,
            wins: user.wins,
            loses: user.loses
          });
        });
      }
      console.log(this.usersMap);
    });
  }
  sessionsToggle(id) {
    this.restProvider.sessionsToggle(id).then(data => {
      this.session = data;
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad SessionPage");
  }
}
