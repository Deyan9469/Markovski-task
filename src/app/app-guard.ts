import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RouteGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const url: string = state.url;

        if (url.startsWith('/edit')) {
            return !url.startsWith('/create');
        } else if (url.startsWith('/create')) {
            return !url.startsWith('/edit');
        } else {
            return true;
        }
    }
}
