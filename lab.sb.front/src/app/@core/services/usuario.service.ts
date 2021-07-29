import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Usuario } from '../model/usuario';

@Injectable()
export class UsuarioService {

    constructor(private http: HttpClient) { }

    save(usuario: Usuario) {
        if (usuario.id && usuario.id > 0) {
            return this.http.post(environment.api.usuario + '/update', usuario, { headers: this.recuperarOptionsHeaders() });
        } else {
            return this.http.post(environment.api.usuario + '/insert', usuario, { headers: this.recuperarOptionsHeaders() });
        }
    }

    findById(usuario: Usuario) {
        return this.http.get(environment.api.usuario + '/find-id/' + usuario.id, { headers: this.recuperarOptionsHeaders() });
    }

    findBy(usuario: Usuario) {
        return this.http.post(environment.api.usuario + '/find-by', usuario, { headers: this.recuperarOptionsHeaders() });
    }

    delete(id: number) {
        return this.http.delete(environment.api.usuario + '/delete/' + id, { headers: this.recuperarOptionsHeaders()});
    }

    recuperarOptionsHeaders() {
        let usuario = JSON.parse(localStorage.getItem('usuario'));
        const options = new HttpHeaders().set('Authorization', 'Bearer ' + usuario.access_token).set('Content-Type', 'application/json');
        return options;
    }
}