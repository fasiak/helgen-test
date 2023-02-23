import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Injectable({
	providedIn: 'root'
})
export class IsSignedInGuardService implements CanActivate {
	// here you can inject your auth service to check that user is signed in or not
	constructor(private authService: AuthService, private router: Router) { }
	canActivate(): boolean {
		if (this.authService.isSignedIn()) {
			this.router.navigate(["/home"]); // or home
			return false;
		}
		return true;
	}
}