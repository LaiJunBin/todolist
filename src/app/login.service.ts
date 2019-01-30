import { Injectable } from '@angular/core';

import { AuthService, SocialUser } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public user: SocialUser;
  public loggedIn: boolean;
  public status: boolean = false;
  
  constructor(
    private authService: AuthService
  ) { }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    if (confirm('確定登出嗎?'))
      this.authService.signOut();
  }

}
