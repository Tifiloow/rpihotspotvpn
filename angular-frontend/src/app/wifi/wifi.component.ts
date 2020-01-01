import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { interval } from 'rxjs';
import {flatMap} from 'rxjs/operators';
;

@Component({
  selector: 'app-wifi',
  templateUrl: './wifi.component.html',
  styleUrls: ['./wifi.component.scss']
})
export class WifiComponent implements OnInit {
  statuserror;
  wifistatus;
  constructor(public api: ApiService) { }

  ngOnInit() {
    let statusobservable = interval(2000).pipe(flatMap(val => this.api.ethernetstatus())).subscribe((data)=>{
      console.log(data);
     if(data.success){
      this.wifistatus = data.status.toString();
      this.statuserror = "";
     }else{
      this.statuserror = data.message.toString();
       console.log("error raised for ethernetstatus")
     }

    });
  }
  changehostname(hostname){
    this.api.changehostname(hostname).subscribe((data)=>{
      if(data.success){
        alert("successfully changed hostname")
      }else{
        alert("Error occured !")
      }
    });
  }

  changepassword(password){
    this.api.changepassword(password).subscribe((data)=>{
      if(data.success){
        alert("successfully changed password")
      }else{
        alert("Error occured !")
      }
    });
  }
  startwifi(){
    this.api.startwifi().subscribe((data)=>{
      if(data.success){
        alert("Done ! ")
      }else{
        alert("error occured !")
      }
    });
  }
  stopwifi(){
    this.api.stopwifi().subscribe((data)=>{
      if(data.success){
        alert("Done ! ")
      }else{
        alert("error occured !")
      }
    });
  }
}
