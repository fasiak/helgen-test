import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, shareReplay } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(
		private http: HttpClient,
		private cookies: CookieService
	) { }

	login(user: any): Boolean {
		// I was trying to dockerize the full application but I faced some issues at the end
		// return this.http.post("http://localhost:6868/api/user/login", user).pipe(shareReplay());
		return  (user.username === 'admin' && user.password == 'adminPass');
	}

	setToken() {
		this.cookies.set("isLogedIn", '1');
	}

	logout() {
		this.cookies.delete("isLogedIn", '/');
	}

	getToken() {
		return this.cookies.get("isLogedIn");
	}

	isSignedIn() {
		return (this.cookies.get("isLogedIn") === '1');
	}
}
