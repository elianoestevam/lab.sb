import { NbMenuService, NbToastrService } from '@nebular/theme';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PagesBase } from '../../pages.base';
import { Usuario } from '../../../@core/model/usuario';
import { UsuarioService } from '../../../@core/services';

@Component({
  selector: 'ngx-usuario-form',
  styleUrls: ['./usuario-form.component.scss'],
  templateUrl: './usuario-form.component.html',
})
export class UsuarioFormComponent extends PagesBase implements OnInit {

  acao: string = "Novo Usuário";
  registerForm: FormGroup;
  submitted: boolean = false;
  usuario: Usuario;
  password: string  = "";

  constructor(private menuService: NbMenuService,
    private location: Location,
    private formBuilder: FormBuilder,
    private service: UsuarioService,
    private activatedRoute: ActivatedRoute,
    public toastrService: NbToastrService) {
    super(toastrService);
  }

  get f() { return this.registerForm.controls; }

  ngOnInit() {
    this.usuario = new Usuario();
    this.registerForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['']
    });

    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      //Se edição...
      if (id && id > 0) {
        this.loading = true;
        let usuario = new Usuario();
        usuario.id = id;
        this.service.findById(usuario).subscribe((result: any) => {
          this.acao = "Editar Usuário";
          this.usuario = result;
          this.loading = false;
        }, (error) => {
          this.loading = false;
          console.log(error);
          this.showToastError("Atenção", error, true, 10000);
        });
      }
    }, (error) => {
      console.log(error);
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    } else {
      this.salvar();
    }
  }

  salvar() {
    this.loading = true;
    this.usuario.enabled = true;
    if(this.password){
      this.usuario.password = this.password;
      this.usuario.uppassword = true;
    }else{
      this.usuario.uppassword = true;
    }
    this.service.save(this.usuario).subscribe((result: any) => {
      this.loading = false;
      if (result.status == 201) {
        this.showToastSuccess("Sucesso", result.message, true, 4000);
        this.voltar();
      }
    }, (error) => {
      this.loading = false;
      console.log(error);
      this.showToastError("Atenção", error, true, 10000);
    });
  }

  voltar() {
    this.location.back();
  }
}