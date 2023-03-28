import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class UserGuard implements CanActivate {
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean | UrlTree> {
        // That guard checks if the admin is logged and if not he blocks the route
        if (localStorage.getItem("Token") == null && localStorage.getItem("role") !== 'admin') {
            return false;
        } else {
            return true;
        }
    }
}