import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppCustomLayoutComponent } from './layout/app-custom-layout/app-custom-layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './modules/register/register.component';
import { LoginComponent } from './modules/login/login.component';
import { AddentComponent } from './modules/addent/addent.component';
import { SuperuserComponent } from './modules/superuser/superuser.component';

@NgModule({
  declarations: [AppComponent, AppCustomLayoutComponent, HeaderComponent, RegisterComponent, LoginComponent, AddentComponent, SuperuserComponent],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, AppRoutingModule, NgbModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
