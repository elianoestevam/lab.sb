import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AutenticacaoService, UsuarioService } from '../../../@core/services';
import { PagesBase } from '../../pages.base';
import { NbToastrService } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from '../../../@core/model/usuario';

@Component({
  selector: 'ngx-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent extends PagesBase implements OnInit {

  user: any = {};
  registerForm: FormGroup;
  submitted: boolean = false;
  public returnUrl: string;

  constructor(protected location: Location,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private autenticacaoService: AutenticacaoService,
    private usuarioService: UsuarioService,
    public toastrService: NbToastrService) {
    super(toastrService);
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.usuario = {};
    // reset login status
    this.autenticacaoService.logout();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.registerForm.value.username = this.registerForm.value.username.trim()
    this.loading = true;
    this.autenticacaoService.login(this.registerForm.value).subscribe((result: any) => {
      this.loading = false;
      if (result.access_token) {
        this.recuperarUsuario(this.registerForm.value.username, result.access_token);
      }
    }, (error) => {
      this.loading = false;
      console.log(error);
      this.showToastMsgError("Atenção", (error.error.error_description ? error.error.error_description : ''), true, 10000);
    });
  }

  recuperarUsuario(username: any, access_token: any) {
    this.loading = true;
    let usuario = new Usuario();
    usuario.username = username;
    usuario.access_token = access_token;
    this.autenticacaoService.recuperarUsuario(usuario).subscribe((result: any) => {
      this.loading = false;
      if (result && result.length > 0) {
        usuario = result[0];
        usuario.access_token = access_token;
        localStorage.setItem('usuario', JSON.stringify(usuario));
        this.router.navigate([this.returnUrl], { skipLocationChange: false });
      } else {
        this.showToastError("Atenção", "Acesso não localizado!", true, 10000);
      }
    }, (error) => {
      this.loading = false;
      console.log(error);
      this.showToastError("Atenção", error, true, 10000);
    });
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  back() {
    this.location.back();
    return false;
  }
}