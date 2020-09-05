import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RegisterRoutingModule } from './register.routing';
import { FormsModule, ReactiveFormsModule } from @angular/forms'; 

@NgModule({
  declarations: [RegisterComponent],
  imports: [CommonModule, RegisterRoutingModule, FormsModule, ReactiveFormsModule],
  bootstrap: [RegisterComponent]
})
export class RegisterModule {}
