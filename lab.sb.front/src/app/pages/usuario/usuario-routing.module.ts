import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsuarioComponent } from './usuario.component';
import { UsuarioListComponent } from './list/usuario-list.component';
import { UsuarioFormComponent } from './form/usuario-form.component';

const routes: Routes = [
  {
    path: '',
    component: UsuarioComponent,
    children: [
      {
        path: 'list',
        component: UsuarioListComponent,
      },
      {
        path: 'form/:id',
        component: UsuarioFormComponent,
      }
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class UsuarioRoutingModule {
}

