import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {Observable, interval} from 'rxjs';
import {map, flatMap, switchMap} from 'rxjs/operators';
import { ApiService } from '../services/api.service';
let meobservable;
class user {
  public success: boolean;
  public user: any;
  public token : string;
  constructor(success,user,token){
    this.success = success;
    this.user = user;
    this.token = token;
  }
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  me;
  constructor(public auth: AuthService, private api : ApiService) { 
    meobservable = interval(2000).pipe(flatMap(res => this.auth.me())).subscribe((data)=>{
      this.me = data;
      console.log(data);
    });

  }

  ngOnInit() {
    console.log(this.api.getdomain());
  }

}
