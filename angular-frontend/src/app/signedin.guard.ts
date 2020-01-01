import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './services/auth.service';
import { Router, Routes } from '@angular/router';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SignedinGuard implements CanActivate {
  constructor(private auth: AuthService, private router : Router ){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //return this.auth.isloggedin();
    return this.auth.isloggedin().pipe(
      tap(loggedIn => {
        if (!loggedIn) {
          console.log("Rejected in guard")
          this.router.navigate(['auth']);
        }else{
          console.log("Accepted in guard !")
        }
      })
    )
    
  
}
}

//do not  forget to re-add the account creation once