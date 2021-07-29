import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Usuario } from '../model/usuario';

@Injectable()
export class AutenticacaoService {
  options = new HttpHeaders().
    set('Content-Type', 'application/x-www-form-urlencoded').
    set('Authorization', 'Basic ' + btoa("lab.sb:pin"));

  constructor(private http: HttpClient) { }

  login(usuario: any) {
    let params = new URLSearchParams();
    params.append('username', usuario.username);
    params.append('password', usuario.password);
    params.append('grant_type', 'password');
    return this.http.post(environment.api.auth + '/token', params.toString(), { headers: this.options });
  }

  checkToken(token: any) {
    let params = new URLSearchParams();
    params.append('token', token);
    return this.http.post(environment.api.auth + '/check_token', params.toString(), { headers: this.options });
  }

  logout() {
    localStorage.removeItem('usuario');
  }

  recuperarUsuario(usuario: Usuario) {
    return this.http.post(environment.api.usuario + '/find-by', usuario, { headers: this.recuperarOptionsHeaders(usuario) });
  }

  recuperarOptionsHeaders(usuario: Usuario) {
    const options = new HttpHeaders().set('Authorization', 'Bearer ' + usuario.access_token).set('Content-Type', 'application/json');
    return options;
  }
}
