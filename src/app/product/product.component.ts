import { Component, OnInit } from '@angular/core';
import { product } from '../data.define';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  public product: Array<any>;
  public update: boolean;
  public error!: {
    mes: {
      name?: string,
      price?: string,
      desc?: string
    },
    isValid: boolean,
    name?: boolean;
    price?: boolean;
    desc?: boolean;
  }
  public addProduct = {
    id: 0,
    name: '',
    price: 0,
    desc: ''
  }
  constructor() {
    this.product = product();
    this.error = {
      mes: {},
      isValid: true,
    }
    this.update = false;
  }

  ngOnInit(): void {
  }
  onsubmit(product: any) {
    if (!Number.isFinite(product.price)) {
      product.price = Number(product.price)
    }
    this.validate(product)
    if (!this.error.isValid) {
      return;
    }
    product = {
      ...product,
      id: this.product.length + 1,
      price: Number(product.price)
    }
    this.product.push(product);
    this.addProduct = {
      id: 0,
      name: '',
      price: 0,
      desc: ''
    }
  }

  validate(validProduct: any) {
    this.error.isValid = true;
    this.error.name = false;
    this.error.price = false;
    this.error.desc = false;

    if (!validProduct.name) {
      this.error.isValid = false;
      this.error.mes.name = 'bạn không được để trống trường này'
      this.error.name = true;
    }

    if (!validProduct.price) {
      this.error.isValid = false;
      this.error.mes.price = 'price phải lớn hơn 0'
      this.error.price = true;
    }
    if (!validProduct.desc) {
      this.error.isValid = false;
      this.error.mes.desc = 'bạn không được để trống trường này'
      this.error.desc = true;
    }
    if (!Number.isFinite(validProduct.price)) {
      this.error.isValid = false;
      this.error.mes.price = 'trường price không đúng định dạng'
      this.error.price = true;
    }
  }
  handlerRemove(id: any) {
    this.product = this.product.filter(item => item.id !== id)
  }
}
