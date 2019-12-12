import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './services/auth.service';
import { Router, Routes } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SignedinGuard implements CanActivate {
  constructor(private auth: AuthService, private router : Router ){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //return this.auth.isloggedin();
    this.auth.isloggedin().subscribe((data)=>{
      console.log(data);
    })
    if(this.auth.isloggedin()){
      console.log("tu es log ! - le guard")
      return true;
      
    }else{
      console.log("tu es pas log ! - le guard")
      this.router.navigate(["auth"]);
      return false;
    }
  }
  
}
