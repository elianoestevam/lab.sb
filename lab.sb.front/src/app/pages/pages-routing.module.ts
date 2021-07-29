import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { AuthGuard } from '../@core/guards';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        component: ECommerceComponent,
      },
      {
        path: 'usuario',
        canActivate: [AuthGuard],
        loadChildren: () => import('./usuario/usuario.module')
          .then(m => m.UsuarioModule),
      },
      {
        path: '',
        canActivate: [AuthGuard],
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: '**',
        component: NotFoundComponent,
      },
    ],
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
