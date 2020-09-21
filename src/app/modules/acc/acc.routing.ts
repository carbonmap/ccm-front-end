import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccComponent } from './Acc.component';

const routes: Routes = [
  {
    path: '',
    component: AccComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccRoutingModule {}
