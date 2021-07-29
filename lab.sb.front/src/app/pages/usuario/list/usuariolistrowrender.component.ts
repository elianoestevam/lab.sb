
import { Input, Component, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `<a [routerLink]="['../form', id]">{{ nome }}</a>`,
})

export class UsuariolistRowRenderComponent implements ViewCell, OnInit {
  public nome: string;
  public id: number;

  @Input()
  public value: string;

  @Input()
  rowData: any;

  ngOnInit() {
    this.nome = this.value;
    this.id= this.rowData.id;
  }
}