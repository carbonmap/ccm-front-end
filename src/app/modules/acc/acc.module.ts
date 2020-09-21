import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccComponent } from './acc.component';
import { AccRoutingModule } from './acc.routing';
import { FormsModule, ReactiveFormsModule } from @angular/forms';

@NgModule({
  declarations: [AccComponent],
  imports: [CommonModule, AccRoutingModule, FormsModule, ReactiveFormsModule],
  bootstrap: [AccComponent]
})
export class AccModule {}

