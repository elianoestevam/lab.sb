import { Observable } from 'rxjs/internal/Observable';
import { ServerDataSource } from 'ng2-smart-table';
import { HttpHeaders } from '@angular/common/http';

export class PostServerDataSource extends ServerDataSource {

    protected requestElements(): Observable<any> {
        let httpParams = this.createRequesParams();
        let usuarioDTO = {
            nome: httpParams.getAll("nome") ? httpParams.getAll("nome").toString() : null,
            username: httpParams.getAll("username") ? httpParams.getAll("username").toString() : null
        };

        return this.http.post(this.conf.endPoint, usuarioDTO, { observe: 'response', headers: this.recuperarOptionsHeaders() });
    }

    recuperarOptionsHeaders() {
        let usuario = JSON.parse(localStorage.getItem('usuario'));
        const options = new HttpHeaders().set('Authorization', 'Bearer ' + usuario.access_token).set('Content-Type', 'application/json');
        return options;
    }

}