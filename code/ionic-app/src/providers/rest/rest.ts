import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  apiUrl = 'http://localhost:9276/api';

  constructor(public http : HttpClient) {
    console.log('Hello RestProvider Provider');
  }

  getQuiz(id) {
    return new Promise(resolve => {
      this
        .http
        .get(this.apiUrl + '/quizzes/' + id)
        .subscribe(data => {
          resolve(data);
        }, err => {
          console.log(err);
        });
    });
  }

  getQuizzes() {
    return new Promise(resolve => {
      this
        .http
        .get(this.apiUrl + '/quizzes')
        .subscribe(data => {
          resolve(data);
        }, err => {
          console.log(err);
        });
    });
  }

  addQuiz(data) {
    return new Promise((resolve, reject) => {
      this
        .http
        .post(this.apiUrl + '/quizzes', JSON.stringify(data), {
          headers: new HttpHeaders().set('Content-Type', 'application/json')
        })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  deleteQuiz(id) {
    return new Promise(resolve => {
      this
        .http
        .delete(this.apiUrl + '/quizzes/' + id)
        .subscribe(data => {
          resolve(data);
        }, err => {
          console.log(err);
        });
    });
  }

  getSession(id) {
    return new Promise(resolve => {
      this
        .http
        .get(this.apiUrl + '/sessions/' + id)
        .subscribe(data => {
          resolve(data);
        }, err => {
          console.log(err);
        });
    });
  }

  addSession(data) {
    return new Promise((resolve, reject) => {
      this
        .http
        .post(this.apiUrl + '/sessions', JSON.stringify(data), {
          headers: new HttpHeaders().set('Content-Type', 'application/json')
        })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  addUser(data) {
    return new Promise((resolve, reject) => {
      this
        .http
        .post(this.apiUrl + '/users', JSON.stringify(data), {
          headers: new HttpHeaders().set('Content-Type', 'application/json')
        })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

}
