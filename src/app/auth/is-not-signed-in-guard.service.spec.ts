import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/services/auth.service';
import { IsNotSignedInGuardService } from './is-not-signed-in-guard.service';


describe('IsNotSignedInGuardService', () => {
  let guard: IsNotSignedInGuardService;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,HttpClientTestingModule],
      providers: [AuthService],
    });
    guard = TestBed.inject(IsNotSignedInGuardService);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should navigate to login when the user is not signed in', () => {
    spyOn(authService, 'isSignedIn').and.returnValue(false);
    const navigateSpy = spyOn(router, 'navigate');
    const canActivate = guard.canActivate();
    expect(canActivate).toBe(false);
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });

  it('should allow access to the page when the user is signed in', () => {
    spyOn(authService, 'isSignedIn').and.returnValue(true);
    const navigateSpy = spyOn(router, 'navigate');
    const canActivate = guard.canActivate();
    expect(canActivate).toBe(true);
    expect(navigateSpy).not.toHaveBeenCalled();
  });
});