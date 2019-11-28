import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
let httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'undefined'
  })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  islogin = true;
  error = ""
  userform = {name: "", password: "", email :""}
  constructor(private http : HttpClient) { }
  login(email, password,cb ){
    let params = {email: email, password : password};
    this.http.post('https://localhost:3000/user/login', params, httpOptions)
    .subscribe((data)=>{
      cb(data, null)
    }, (error) =>{
      cb(null, error.toString());
    });
  }
  register(name, email, password,cb ){
    let params = {name: name, email: email, password : password};
    this.http.post('https://localhost:3000/user/register', params, httpOptions)
    .subscribe((data)=>{
      cb(data, null)
    }, (error) =>{
      cb(null, error.toString());
    });
  }
  verifyinput(){
    const password = this.userform.password
    const email = this.userform.email
    let verification = {password: false, email : false}
    if(email && password){//start the verification
      var reemail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      verification.email = reemail.test(email);
      var repassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,10}$/g;
      verification.password = repassword.test(password);
      //check if both validated:
      if(verification.email && verification.password){
        return true; //means the inputs are validated by the function
      }else{
        this.error = "too weak password, or unvalid email"
        return false;
      }

    }else{
      this.error = "Please fill the inputs"
    }
    
  }
  submit(){ //handle when user submits ---> but will have to manually verify email and password
    if(this.islogin){ //loging in

      this.login(this.userform.email, this.userform.password, (data, err)=>{
        if(err) { return this.error = err} //check for error while login
        if(data.success && data.access_token){
          console.log(data)
        }else{
          console.log(data);
          this.error = data.message.toString()
        }
      })
    }else{ //register
      var verifyinput = this.verifyinput()
      if(!verifyinput) return; //if inputs not verified, the errors were raised, we stop the current function
      this.register(this.userform.name, this.userform.email, this.userform.password, (data, err)=>{
        if(err) { return this.error = err}
        if(data.success && data.access_token){
          console.log(data)
        }else{
          this.error = data.message.toString()
        }
      })

    }
  }
  clear(){
    //clear form inputs & errors
    this.userform = {name: "", password: "", email :""}
    this.error = "";
  }
}
