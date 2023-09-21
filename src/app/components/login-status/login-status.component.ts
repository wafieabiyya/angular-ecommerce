import { Component, inject, OnInit } from '@angular/core';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js'

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})


export class LoginStatusComponent implements OnInit {

  isAuthenticated: boolean = false
  userFullname: string = ''

  constructor(private oktaAuthService: OktaAuthStateService, private oktaAuth: OktaAuth) { }
  ngOnInit(): void {
    this.oktaAuthService.authState$.subscribe((result) => {
      this.isAuthenticated = result.isAuthenticated!
      this.getUserDetails()
    })
  }
  getUserDetails(){
    if(this.isAuthenticated){
      this.oktaAuth.getUser().then(
        (Response) =>{
          this.userFullname = Response.name as string
        }
      )
    }
  }
  logout(){
    this.oktaAuth.signOut()
  }
}
