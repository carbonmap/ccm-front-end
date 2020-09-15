import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'

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
    this.http.post("http://127.0.0.1:5000/login", this.loginUserData)
      .subscribe((result) => {
        console.warn("result", result)
      })
  }
}
