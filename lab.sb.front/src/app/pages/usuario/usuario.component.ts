import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'ngx-usuario-elements',
    template: `
    <router-outlet></router-outlet>
  `,
})
export class UsuarioComponent {

    constructor(protected location: Location) {

    }


}


