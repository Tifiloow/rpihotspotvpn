import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';
import {AuthService} from './services/auth.service';
var isloggedin;
@Injectable({
  providedIn: 'root'
})
export class SignedinGuard implements CanActivate {
  constructor(private auth : AuthService, private route : Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if(this.auth.isloggedin((data,error)=>{
      console.log(data);
      if(data){
        return true;
      }else{
        return false;
      }
    })){
      console.log("passe")
      return true; 
    }else{
      localStorage.setItem("token", ""); //set again, to be sure
    localStorage.setItem("logged", "False");
      this.route.navigate(["auth"]);
      console.log("ntm")
      return false; 
    }
    }
  }


