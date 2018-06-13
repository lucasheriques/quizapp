import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import {RestProvider} from '../../providers/rest/rest';
import {HubConnection} from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';

/**
 * Generated class for the GamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({selector: 'page-game', templateUrl: 'game.html'})
export class GamePage {
  user = {
    name: '',
    answeredQuestions: '',
    sessionId: '',
    ready: false
  };
  private _hubConnection : HubConnection | undefined;
  message = '';
  messages : string[] = [];

  public sendMessage() : void {
    const data = `Sent: ${this.message}`;

    if (this._hubConnection) {
      this
        ._hubConnection
        .invoke('Send', data);
    }
    this
      .messages
      .push(data);
  }

  constructor(public navCtrl : NavController, public navParams : NavParams, public restProvider : RestProvider, public alertCtrl : AlertController) {
    this._hubConnection = new signalR
      .HubConnectionBuilder()
      .withUrl('http://localhost:9276/game')
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this
      ._hubConnection
      .start()
      .catch(err => console.error(err.toString()));

    this
      ._hubConnection
      .on('Send', (data : any) => {
        const received = `Received: ${data}`;
        this
          .messages
          .push(received);
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamePage');
  }

  joinSession() {
    this
      .restProvider
      .addUser(this.user)
      .then((result) => {
        console.log(result);
        this.user.ready = true;
      }, (err) => {
        const alert = this
          .alertCtrl
          .create({title: 'Erro!', subTitle: 'Sessão inválida!', buttons: ['OK']});
        alert.present();
        console.log(err);
      });
  }

}
