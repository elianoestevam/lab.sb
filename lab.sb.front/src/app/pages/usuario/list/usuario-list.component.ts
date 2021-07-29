import { NbMenuService, NbDialogService, NbToastrService } from '@nebular/theme';
import { Component, OnInit } from '@angular/core';
import { ServerDataSource } from 'ng2-smart-table';
import { UsuarioService } from '../../../@core/services';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { PostServerDataSource } from './postserverdatasource';
import { UsuariolistRowRenderComponent } from './usuariolistrowrender.component';
import { Router } from '@angular/router';
import { DialogConfirmPromptComponent } from '../../../@theme/components/dialog-confirm-prompt/dialog-confirm-prompt.component';
import { PagesBase } from '../../pages.base';

@Component({
  selector: 'ngx-usuario-list',
  styleUrls: ['./usuario-list.component.scss'],
  templateUrl: './usuario-list.component.html',
})
export class UsuarioListComponent extends PagesBase implements OnInit {
  source: ServerDataSource;
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      confirmCreate: true
    },
    actions: {
      columnTitle: 'Ações',
      position: 'right'
    },
    noDataMessage: "Não foi possível encontrar os registros.",
    pager: {
      display: true,
      perPage: 5
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>'
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      nome: {
        title: 'Nome',
        type: 'custom',
        renderComponent: UsuariolistRowRenderComponent
      },
      username: {
        title: 'Login',
      }
    },
    mode: 'external',
  };

  constructor(public http: HttpClient,
    private router: Router,
    private dialogService: NbDialogService,
    public toastrService: NbToastrService,
    protected service: UsuarioService) {
    super(toastrService);
    this.recuperar();
  }

  recuperar() {
    this.source = new PostServerDataSource(this.http, {
      endPoint: environment.api.usuario + '/find-by',
      pagerPageKey: "page",
      totalKey: 'total',
      pagerLimitKey: "limit",
      filterFieldKey: "#field#"
    });
  }

  onEdit(event): void {
    this.router.navigate(['/pages/usuario/form', event.data.id]);
  }

  onCreateConfirm(event): void {
    this.router.navigate(['/pages/usuario/form', 0]);
  }

  onCreate() {
    this.router.navigate(['/pages/usuario/form', 0]);
  }

  onDelete(event): void {
    this.dialogService.open(DialogConfirmPromptComponent, {
      context: {
        message: 'Deseja realmente deletar o usuário?'
      },
    })
      .onClose.subscribe(
        result => this.realizarExclusao(result, event.data)
      );
  }

  realizarExclusao(result: any, usuario: any) {
    if (result) {
      this.loading = true;
      this.service.delete(usuario.id).subscribe((result: any) => {
        this.loading = false;
        if (result.status == 200) {
          this.showToastSuccess("Sucesso", result.message, true, 4000);
          this.recuperar();
        }
      }, (error) => {
        this.loading = false;
        console.log(error);
        this.showToastError("Atenção", error, true, 10000);
      });
    }
  }
}
