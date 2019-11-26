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
    console.log(this.api.testapi((data)=>{
      console.log(data);
    }))
  }
}

//https://localhost:4200/