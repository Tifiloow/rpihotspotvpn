import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthComponent } from './auth/auth.component';
import {SignedinGuard } from './signedin.guard';
import {HomeComponent} from './home/home.component';
const routes: Routes = [
  { path: 'auth', component: AuthComponent},
  { path: 'home', component: HomeComponent, canActivate: [SignedinGuard]},
  {path : '', redirectTo: '/home', pathMatch : 'full'},
  { path: '**', redirectTo : '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

