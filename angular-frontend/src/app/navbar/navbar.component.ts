import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private auth : AuthService, private router: Router) { }

  ngOnInit() {
  }
  wifi(){
    this.router.navigate(["wifi"])
  }
  users(){
    this.router.navigate(["users"])
  }
  vpn(){
    this.router.navigate(["vpn"])
  }
  logout(){
    this.auth.logout();
  }
}
