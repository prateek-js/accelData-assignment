import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {select, Store} from "@ngrx/store";
import { AppState } from './../app.state';

import { ElementRef, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {

  displayedColumns: string[] = ['username', 'saladAdded', 'cutlets', 'cheeseSlices', 'totalPrice'];
  dataSource = new MatTableDataSource();
  allOrders;
  searchword = '';
  private state: AppState;
  @ViewChild('searchBox', { static: true }) ref: ElementRef;
  subjectForOrders: any;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.subjectForOrders = new BehaviorSubject(null);
    this.store.select('burgerOrder').subscribe(data => { 
      this.dataSource = new MatTableDataSource(data);
      this.allOrders = data;
    });
    this.subjectForOrders.pipe(
      debounceTime(500),
    ).subscribe(val => this.searchThis());
  }

  // search function with debounce
  searchThisWithDebounce(val) {
    this.subjectForOrders.next('searchThis');
  }

  searchThis() {
    this.dataSource = new MatTableDataSource(this.allOrders.filter((e) => {
      return (
        e.username.toLowerCase().includes(this.searchword.toLowerCase())
      );
    }));
    this.calculateTotal();
  }

  public calculateTotal() {
    return this.dataSource.filteredData.reduce((accum, curr: any) => accum + curr.totalPrice, 0);
  }
}
