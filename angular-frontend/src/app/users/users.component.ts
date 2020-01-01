import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import {tap, flatMap } from 'rxjs/operators';
import {Observable, interval} from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users;
  error;
  constructor(public api : ApiService) { }
  ngOnInit() {
let userobservable = interval(2000).pipe(flatMap(val => this.api.getusers())).subscribe((data)=>{
  if(data){
    this.users = data;
  }else{
    this.error = "Error happened while fetching users"
  }
})

}
}
