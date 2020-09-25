import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuperuserComponent } from './superuser.component';

const routes: Routes = [
    {
        path: '',
        component: SuperuserComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SuperuserRoutingModule { }
