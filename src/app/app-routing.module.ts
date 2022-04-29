import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard, redirectLoggedInTo, redirectUnauthorizedTo} from "@angular/fire/auth-guard";
import {LoginComponent} from "./login/login.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ProfileComponent} from "./profile/profile.component";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToDashboard = () => redirectLoggedInTo(['dashboard']);

const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
    data: {
      authGuardPipe: redirectLoggedInToDashboard,
      title: 'LOGIN'}
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin,
      title: 'DASHBOARD'}
  },

  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin,
      title: 'PROFILE'
    }
  },

  {
    path: 'laboratories',
    loadChildren: () => import('./laboratories/laboratories.module').then(m => m.LaboratoriesModule),
    canActivate: [AuthGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin,
      title: 'LABORATORIES'
    }
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
