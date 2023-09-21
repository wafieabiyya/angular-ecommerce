import { Component, Inject, OnInit } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';
import OktaSignIn from '@okta/okta-signin-widget';

import appConfig from 'src/app/config/app-config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{
  
  
  oktaSignIn: any

  constructor( private oktaAuth: OktaAuth){
    this.oktaSignIn = new OktaSignIn ({
        logo: '/assets/images/logo.png',
        baseUrl: appConfig.oidc.issuer.split('/oauth2')[0],
        clientId: appConfig.oidc.clientId,
        redirectUri: appConfig.oidc.redirectUrl,
        useClassicEngine: true,
        authParam: {
          pkce: true,
          issuer: appConfig.oidc.issuer,
          scopes: appConfig.oidc.scopes
        }
    })
  }
  
  ngOnInit(): void {
    this.oktaSignIn.remove()
    
    this.oktaSignIn.renderEl({
      el: '#okta-sign-in-widget'
    },
    (Response: any) => {
      if(Response.status === 'success'){
        this.oktaAuth.signInWithRedirect()
      }
    },
    (Error: any) => {
      throw Error
    })
  }
}
