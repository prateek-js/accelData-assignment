import { Component, OnInit, AfterViewInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BurgerOrder } from '../model/burger.model';
import { AppState } from './../app.state';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  orderForm: FormGroup;
  totalPrice = 10;
  ordersHistory: Observable<BurgerOrder[]>;

  constructor(private fb: FormBuilder,
    private store: Store<AppState>) {
    this.orderForm = fb.group({
      name: ['', [Validators.required]],
      isSaladAdded: [false],
      cutlet: [0],
      cheeseSlices: [0]
    });
    this.ordersHistory = this.store.select(state => state.burgerOrder);
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
  }

  calcPrice() {
    this.totalPrice = 10;
    this.totalPrice = (this.orderForm.get('isSaladAdded').value) ? (this.totalPrice + 5) : (this.totalPrice);
    this.totalPrice += 2 * this.orderForm.get('cutlet').value;
    this.totalPrice += 1 *this.orderForm.get('cheeseSlices').value;
  }

  orderBurger() {
    const burger: BurgerOrder = {
      username: this.orderForm.get('name').value,
      saladAdded: this.orderForm.get('isSaladAdded').value,
      cutlets: this.orderForm.get('cutlet').value,
      cheeseSlices: this.orderForm.get('cheeseSlices').value,
      totalPrice: this.totalPrice
    };
    this.store.dispatch({
      type: 'ADD_ORDER',
      payload: <BurgerOrder> burger
    });
    this.orderForm.reset();
    this.totalPrice = 10;
  }
}
