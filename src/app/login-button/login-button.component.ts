import { Component, OnInit } from '@angular/core';
import { LoginService } from "../login.service";


@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.css']
})
export class LoginButtonComponent implements OnInit {

  constructor(
    private loginService: LoginService
  ) { }

  ngOnInit() {

  }

}
