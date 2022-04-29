import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  showButton: boolean;

  constructor(
    public authService: AuthService,
    private router: Router
  ) { this.showButton = true; }

  login() {
    this.showButton = false;
    this.authService.logInGoogle()
      .then((res: boolean) => {if (!res) { this.showButton = true; } })
      .catch(err => console.error(err));
  }

  ngOnInit(): void { }

}
