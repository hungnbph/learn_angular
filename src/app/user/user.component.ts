import { Component } from '@angular/core';
import { student, user } from '../data.define';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  public title: string;
  public student: Array<any>;
  public user: Array<any>;
  public error: boolean | undefined;
  public filterUser: any;
  public update: boolean;
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
    this.filterUser = this.user;
    this.update = false;
  }

  handlerRemoveUser(id: number, canNang: number) {
    if (canNang < 30) {
      this.error = true;
      return;
    }
    this.error = false;
    this.filterUser = this.filterUser.filter((item: any) => item.id !== id);
    setTimeout(() => {
      this.error = undefined;
    }, 3000);
  }

  search(e: any) {
    const values = e.target.value;
    if (!values) {
      this.filterUser = this.user.filter(item => item.name);
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
    if (!this.onValid(this.addUser)) {
      return;
    }
    if (this.update && this.addUser.id) {
      this.user.forEach(item => {
        if (item.id === this.addUser.id) {
          item = this.addUser;
        }

      });

    } else {
      this.addUser = {
        ...this.addUser,
        id: this.user.length + 1,
      }
      this.user.push(this.addUser);
    }
    this.addUser = {
      id: 0,
      name: '',
      chieuCao: '',
      canNang: '',
      avatar: ''
    }
  }
  onValid(obj: any) {
    if (!obj.name || !obj.chieuCao || !obj.canNang || !obj.avatar) {
      return false;
    }
    return true;
  }
  handlerUpdate(e: any) {
    this.update = true;
    this.addUser = e;
  }

}
