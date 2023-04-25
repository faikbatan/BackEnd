import { Injectable } from '@angular/core';
import { LoginUser } from '../models/LoginUser';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private httpClient:HttpClient,private router:Router) { }
path="http://66.70.229.82:8181/Authorize";
userToken:any;
decodedToken:any;
jwtHelper:JwtHelperService=new JwtHelperService();
TOKEN_KEY='token';
login(loginUser:LoginUser)
{  
  let headers=new HttpHeaders();
  headers=headers.append("Content-Type","application/json");
  this.httpClient.post(this.path,loginUser,{headers:headers})
  .subscribe(data =>{
    this.saveToken(data)
    this.userToken=data
    this.decodedToken=this.jwtHelper.decodeToken(data.toString())
    this.router.navigateByUrl('/src/app/container');
  });
}
saveToken(token:any)
{
  localStorage.setItem(this.TOKEN_KEY,token);
}
logOut(){
  localStorage.removeItem(this.TOKEN_KEY);
}
loggedIn(){
  let loggedin=false;
  if(!this.jwtHelper.isTokenExpired(this.TOKEN_KEY))
  {
    loggedin=true;
  }
  return loggedin;
}
getCurrentUserId(){
  
  return this.decodedToken.nameid;
}
getMessage(){
  
  return this.decodedToken.message;
}
}

