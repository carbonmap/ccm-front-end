import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './register.component';
import { RegisterRoutingModule } from './register.routing';
import { Router } from "@angular/router";

@NgModule({
  declarations: [RegisterComponent],
  imports: [CommonModule, RegisterRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule, Router],
  providers: [],
  bootstrap: [RegisterComponent]
})
export class RegisterModule { }
