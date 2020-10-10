import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AccComponent } from './acc.component';
import { AccRoutingModule } from './acc.routing';

@NgModule({
    declarations: [AccComponent],
    imports: [CommonModule, AccRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule],
    providers: [],
    bootstrap: [AccComponent]
})
export class AccModule { }