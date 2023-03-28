import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

export interface AuthResponseData {
    idToken: string;
    email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

    constructor(private http: HttpClient, private router: Router) { }



    login(userName: string, password: string) {
        return this.http.post('http://localhost:3000/api/users/login/', {
            userName: userName,
            password: password
        })
    }

    signup(id: number, email: string, password: string, passwordConfirm: string, city: string, street: string, fullName: string, userName: string) {
        return this.http.post<any>('http://localhost:3000/api/users/signup', {
            id, email, password, passwordConfirm, city, street, fullName, userName
        })
    }
}