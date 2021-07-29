import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { NbMenuService, NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {

  menu = MENU_ITEMS;
  usuario: any;

  constructor(private menuService: NbMenuService) {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
  }

}
