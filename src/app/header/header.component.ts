import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  tabs: any[];
  tabLinks: any[];
  activeLinkIndex = 1;
  constructor(
    private router: Router,
    private elRef: ElementRef
  ) {
    this.tabs = [
      {
          name: 'Order Now',
          link: './dashboard',
          pathname: '/dashboard',
          index: 1
      }, {
          name: 'Order History',
          link: './order-history',
          pathname: '/order-history',
          index: 2
      }
    ];
    this.tabLinks = [
      {
        pathname: '/dashboard',
        index: 1
      },
      {
        pathname: '/order-history',
        index: 2
      }, {
        pathname: '/',
        index: 1
      }
    ];
  }

  ngOnInit() {
    const obj = this.tabLinks.findIndex((val) => {
      if (window.location.pathname.includes(val.pathname)) {
        return val;
      }
    });
    this.activeLinkIndex = this.tabLinks[obj].index;
  }
}
