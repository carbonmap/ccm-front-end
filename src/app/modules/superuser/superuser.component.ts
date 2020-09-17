import { Component, Injectable, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { data } from 'jquery';

@Component({
  selector: 'app-superuser',
  templateUrl: './superuser.component.html',
  styleUrls: ['./superuser.component.scss'],
  providers: [HttpClientModule]
})
export class SuperuserComponent implements OnInit {

  json;
  limbo;
  confirmed;
  constructor(private http: HttpClient) { };

  ngOnInit(): void {
  };

  move() {
    this.http.post("http://127.0.0.1:5000/movefile", this.json)
      .subscribe((result) => {
        console.log("The file has been moved", result);
        this.json = JSON.stringify(result);
        this.limbo = JSON.parse(this.json).limbo;
        this.confirmed = JSON.parse(this.json).confirmed;
      });
  }
}

