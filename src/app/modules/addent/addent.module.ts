import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddentComponent } from './addent.component';
import { AddentRoutingModule } from './addent.routing';
import { FormsModule, ReactiveFormsModule } from @angular/forms'; 

@NgModule({
  declarations: [AddentComponent],
  imports: [CommonModule, AddentRoutingModule, FormsModule, ReactiveFormsModule],
  bootstrap: [AddentComponent]
})
export class AddentModule {}
