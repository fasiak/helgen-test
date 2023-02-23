import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        MatCardModule,
        MatInputModule,
        FormsModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        ReactiveFormsModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  // it('should submit the form when it is valid', () => {
  //   spyOn(authService, 'login').and.returnValue(of({}));
  //   spyOn(authService, 'setToken');
  //   spyOn(router, 'navigateByUrl').and.returnValue(Promise.resolve(true));

  //   component.form.setValue({ username: 'user', password: 'pass' });
  //   component.submit();

  //   expect(authService.login).toHaveBeenCalledWith({ username: 'user', password: 'pass' });
  //   expect(authService.setToken).toHaveBeenCalled();
  //   expect(router.navigateByUrl).toHaveBeenCalledWith('/home');
  // });

  it('should not submit the form when it is invalid', () => {
    spyOn(authService, 'login');
    spyOn(authService, 'setToken');
    spyOn(router, 'navigateByUrl');

    component.form.setValue({ username: '', password: '' });
    component.submit();

    expect(authService.login).not.toHaveBeenCalled();
    expect(authService.setToken).not.toHaveBeenCalled();
    expect(router.navigateByUrl).not.toHaveBeenCalled();
  });


});

