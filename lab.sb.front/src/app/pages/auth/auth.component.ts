import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-auth-elements',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class AuthComponent {

  constructor(protected location: Location) {

  }


}


