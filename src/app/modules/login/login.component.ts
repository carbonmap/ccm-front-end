import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [HttpClientModule]
})
export class LoginComponent implements OnInit {

  loginUserData = { email: '', password: '' }
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  loginUser() {
    console.log(this.loginUserData)
    this.http.post(environment.appBaseUrl+"/login", this.loginUserData)
      .subscribe((result) => {
        console.log("result", result)
      })
  }
}
