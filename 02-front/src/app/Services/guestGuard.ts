import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class GuestGuard implements CanActivate {
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean | UrlTree> {
        // That GuestGuard checks if the user is logged he blockes the route
        if (localStorage.getItem("Token") == null) {
            return true;
        } else {
            return false;
        }
    }
}