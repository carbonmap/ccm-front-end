import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RegisterRoutingModule } from './register.routing';
import { FormsModule, ReactiveFormsModule } from @angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [RegisterComponent],
  imports: [CommonModule, RegisterRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [],
  bootstrap: [RegisterComponent]
})
export class RegisterModule {}
