
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsNotSignedInGuardService } from './auth/is-not-signed-in-guard.service';
import { IsSignedInGuardService } from './auth/is-signed-in-guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent,canActivate: [IsSignedInGuardService] },
  {
    path: 'home', component: HomeComponent, canActivate: [IsNotSignedInGuardService] ,
    children: [
      { path: 'map', component: DashboardComponent, canActivate: [IsNotSignedInGuardService] },
    ]
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }