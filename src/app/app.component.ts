import { Component, Input } from '@angular/core';

import { AuthService, SocialUser } from "angularx-social-login";
import { LoginService } from "./login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private authService: AuthService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.authService.readyState.subscribe(data => {
      if (data.length !== 0) {
        this.loginService.status = true;
        this.authService.authState.subscribe((user) => {
          this.loginService.user = user;
          this.loginService.loggedIn = (user !== null);
        });
        console.log(this.authService);
      }
    });
  }

}
