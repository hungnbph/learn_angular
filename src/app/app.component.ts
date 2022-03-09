import { Component } from '@angular/core';
import { student, user } from './data.define';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title: string;
  public student: Array<any>;
  public user: Array<any>;
  public error: boolean | undefined;

  constructor() {
    this.title = 'lab 1'
    this.student = student();
    this.user = user();
  }

  handlerRemoveUser(id: number, canNang: number) {
    if (canNang < 30) {
      this.error = true;

      return;
    }
    this.error = false;
    this.user = this.user.filter(item => item.id !== id);
    setTimeout(() => {
      this.error = undefined;
    }, 1000);
  }

}
