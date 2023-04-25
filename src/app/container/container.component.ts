import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent {
constructor(private authservice:AuthService){}
loginUser:any;
ngOnInit(){}
login(){
  this.authservice.login(this.loginUser);
}
logOut(){
  this.authservice.logOut();
}
isAuthenticated(){
  return this.authservice.loggedIn();
}
getMessage(){
  return this.authservice.getMessage();
}
}
