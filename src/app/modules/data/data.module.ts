import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { DataComponent } from './data.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [DataComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  bootstrap: [DataComponent]
})
export class DataModule {}