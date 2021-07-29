import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
  NbLayoutModule,
  NbAlertModule,
  NbSpinnerModule,
  NbDialogModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioComponent } from './usuario.component';
import { UsuarioListComponent } from './list/usuario-list.component';
import { UsuarioFormComponent } from './form/usuario-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuariolistRowRenderComponent } from './list/usuariolistrowrender.component';
import { DialogConfirmPromptComponent } from '../../@theme/components';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbAlertModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    UsuarioRoutingModule,
    NbSelectModule,
    NbSpinnerModule,
    NbIconModule,
    NbLayoutModule,
    Ng2SmartTableModule,
    NbDialogModule.forChild()
  ],
  declarations: [
    UsuarioComponent,
    UsuarioListComponent,
    UsuarioFormComponent,
    UsuariolistRowRenderComponent
  ],
  entryComponents: [UsuariolistRowRenderComponent, DialogConfirmPromptComponent]
})
export class UsuarioModule { }
