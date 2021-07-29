import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AutenticacaoService } from '../services';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private autenticacaoService: AutenticacaoService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let usuario = localStorage.getItem('usuario');
        if (usuario) {
            return true;
        }

        this.router.navigate(['/pages/auth/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
