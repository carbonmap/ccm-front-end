import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './page/maptwo/maptwo.component';

const routes: Routes = [
  {
    path: '',
    component: MapComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaptwoRoutingModule { }
