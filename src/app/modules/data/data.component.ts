import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { DataRoutingModule } from './data.routing';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  loginUserData = { email: '', password: '' }
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    console.log("ASDFASDF")
  }
  
}