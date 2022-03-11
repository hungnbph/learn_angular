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
  public filterUser: any;
  public addUser = {
    id: 0,
    name: '',
    chieuCao: '',
    canNang: '',
    avatar: ''
  }

  constructor() {
    this.title = 'lab 1'
    this.student = student();
    this.user = user();
    this.filterUser = [...this.user];
    console.log(this.filterUser);

  }

  handlerRemoveUser(id: number, canNang: number) {
    if (canNang < 30) {
      this.error = true;
      return;
    }
    this.error = false;
    this.filterUser = this.user.filter(item => item.id !== id);
    setTimeout(() => {
      this.error = undefined;
    }, 3000);
  }

  search(e: any) {
    const values = e.target.value;
    if (!values) {

      return;
    }
    this.filterUser = this.user.filter(item => {
      const userNameLowerCase = item.name.toLowerCase();
      const search = values.toLowerCase().trim();

      return item.name.indexOf(search) !== -1
    });
  }

  onChangeInput(e: any, key: 'name' | 'chieuCao' | 'canNang' | 'avatar') {
    // switch (key) {
    //   case 'name':
    //     addUser.name = e.target.value
    //     break;
    //   case 'chieuCao':
    //     addUser.chieuCao = e.target.value

    //     break;
    //   case 'canNang':
    //     addUser.canNang = e.target.value

    //     break;
    //   case 'avatar':
    //     addUser.avatar = e.target.value

    //     break;
    //   default:
    //     break;
    // }

    this.addUser = {
      ...this.addUser,
      [key]: e.target.value
    }
  }

  submit() {
    this.addUser = {
      ...this.addUser,
      id: this.user.length + 1,
    }
    this.user.push(this.addUser);
    this.filterUser = [...this.user];

    console.log(this.user);


  }

}

