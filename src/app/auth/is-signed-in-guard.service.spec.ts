import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { IsSignedInGuardService } from './is-signed-in-guard.service';


describe('IsSignedInGuardService', () => {
	let guard: IsSignedInGuardService;
	let authService: AuthService;
	let router: Router;

	beforeEach(() => {

		TestBed.configureTestingModule({
			imports: [
				HttpClientTestingModule
			]
		});
		guard = TestBed.inject(IsSignedInGuardService);
		authService = TestBed.inject(AuthService);
		router = TestBed.inject(Router);
	});

	it('should be created', () => {
		expect(guard).toBeTruthy();
	});

	it('should navigate to /home and return false if user is signed in', () => {
		spyOn(authService,'isSignedIn').and.returnValue(true);
		spyOn(router, 'navigate');
		expect(guard.canActivate()).toBeFalse();
		expect(router.navigate).toHaveBeenCalledWith(['/home']);
	});

	it('should return true if user is not signed in', () => {
		spyOn(authService, 'isSignedIn').and.returnValue(false);
		expect(guard.canActivate()).toBeTrue();
	});


});
