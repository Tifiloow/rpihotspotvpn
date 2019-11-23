import { Component } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  title = 'rpihotspot-frontend';
  req = {}
  constructor(private api: ApiService){
    this.api.testapi()
  }
}

//https://localhost:4200/