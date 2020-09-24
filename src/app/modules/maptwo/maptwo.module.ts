import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './page/maptwo/maptwo.component';
import { MaptwoRoutingModule } from './maptwo.routing';

@NgModule({
  declarations: [MapComponent],
  imports: [CommonModule, MaptwoRoutingModule],
})
export class MaptwoModule { }
