import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddentComponent } from './Addent.component';

const routes: Routes = [
  {
    path: '',
    component: AddentComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddentRoutingModule {}
