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
  public error: boolean;

  constructor() {
    this.title = 'danh sách sinh viên'
    this.student = student();
    this.user = user();
    this.error = false;
  }

  handlerRemove(id: number) {
    this.student = this.student.filter(item => item.id !== id);
  }

  handlerRemoveUser(id: number, canNang: number) {
    if (canNang < 30) {
      this.error = true;

      return;
    }
    const removeUser = this.user.filter(item => item.id === id);
  }

}
