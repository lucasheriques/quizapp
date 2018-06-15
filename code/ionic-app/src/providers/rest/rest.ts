import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoadingController } from "ionic-angular";

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  apiUrl = "http://quizapi.azurewebsites.net/api";

  constructor(public http: HttpClient,public loadingCtrl:LoadingController) {
    console.log("Hello RestProvider Provider");
  }

  getQuiz(id) {
    let loader = this.loadingCtrl.create({
      content: "Carregando... Por favor Espere "
    });
    loader.present();
    return new Promise(resolve => {
      this.http.get(this.apiUrl + "/quizzes/" + id).subscribe(
        data => {
          loader.dismiss();
          resolve(data);
        },
        err => {
          loader.dismiss();
          console.log(err);
        }
      );
    });
  }

  getQuizzes() {
    let loader = this.loadingCtrl.create({
      content: "Carregando... Por favor Espere "
    });
    loader.present();
    return new Promise(resolve => {
      this.http.get(this.apiUrl + "/quizzes").subscribe(
        data => {
          loader.dismiss();
          resolve(data);
        },
        err => {
          loader.dismiss();
          console.log(err);
        }
      );
    });
  }

  addQuiz(data) {
    let loader = this.loadingCtrl.create({
      content: "Carregando... Por favor Espere "
    });
    loader.present();
    return new Promise((resolve, reject) => {
      this.http
        .post(this.apiUrl + "/quizzes", JSON.stringify(data), {
          headers: new HttpHeaders().set("Content-Type", "application/json")
        })
        .subscribe(
          res => {
            loader.dismiss();
            resolve(res);
          },
          err => {
            loader.dismiss();
            reject(err);
          }
        );
    });
  }

  deleteQuiz(id) {
    let loader = this.loadingCtrl.create({
      content: "Carregando... Por favor Espere "
    });
    loader.present();
    return new Promise(resolve => {
      this.http.delete(this.apiUrl + "/quizzes/" + id).subscribe(
        data => {
          loader.dismiss();
          resolve(data);
        },
        err => {
          loader.dismiss();
          console.log(err);
        }
      );
    });
  }

  getSession(id) {
    let loader = this.loadingCtrl.create({
      content: "Carregando... Por favor Espere "
    });
    loader.present();
    return new Promise(resolve => {
      this.http.get(this.apiUrl + "/sessions/" + id).subscribe(
        data => {
          loader.dismiss();
          resolve(data);
        },
        err => {
          loader.dismiss();
          console.log(err);
        }
      );
    });
  }

  addSession(data) {
    let loader = this.loadingCtrl.create({
      content: "Carregando... Por favor Espere "
    });
    loader.present();
    return new Promise((resolve, reject) => {
      this.http
        .post(this.apiUrl + "/sessions", JSON.stringify(data), {
          headers: new HttpHeaders().set("Content-Type", "application/json")
        })
        .subscribe(
          res => {
            loader.dismiss();
            resolve(res);
          },
          err => {
            loader.dismiss();
            reject(err);
          }
        );
    });
  }

  addUser(data) {
    let loader = this.loadingCtrl.create({
      content: "Carregando... Por favor Espere "
    });
    loader.present();
    return new Promise((resolve, reject) => {
      this.http
        .post(this.apiUrl + "/users", JSON.stringify(data), {
          headers: new HttpHeaders().set("Content-Type", "application/json")
        })
        .subscribe(
          res => {
            loader.dismiss();
            resolve(res);
          },
          err => {
            loader.dismiss();
            reject(err);
          }
        );
    });
  }
  addQuestions(data) {
    let loader = this.loadingCtrl.create({
      content: "Carregando... Por favor Espere "
    });
    loader.present();
    return new Promise((resolve, reject) => {
      this.http
        .post(this.apiUrl + "/questions", JSON.stringify(data), {
          headers: new HttpHeaders().set("Content-Type", "application/json")
        })
        .subscribe(
          res => {
            loader.dismiss();
            resolve(res);
          },
          err => {
            loader.dismiss();
            reject(err);
          }
        );
    });
  }
  deleteQuestions(id) {
    let loader = this.loadingCtrl.create({
      content: "Carregando... Por favor Espere "
    });
    loader.present();
    return new Promise(resolve => {
      this.http.delete(this.apiUrl + "/questions/" + id).subscribe(
        data => {
          loader.dismiss();
          resolve(data);
        },
        err => {
          loader.dismiss();
          console.log(err);
        }
      );
    });
  }

}
