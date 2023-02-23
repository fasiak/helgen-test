import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsNotSignedInGuardService {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    // Check if the user is not signed in
    if (!this.authService.isSignedIn()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
