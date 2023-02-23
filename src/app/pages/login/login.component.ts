import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {

  constructor(
    private authService: AuthService,
    public router: Router
  ) { }

  subscriptions = new Subscription()

  form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  submit() {
    if (this.form.valid) {
      const user = { username: this.form.get('username')?.value, password: this.form.get('password')?.value };
      if (this.authService.login(user) === true) {
        this.authService.setToken()
        this.router.navigateByUrl('/home');
      }
    }

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
