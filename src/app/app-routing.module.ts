import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppCustomLayoutComponent } from './layout/app-custom-layout/app-custom-layout.component';
import { RegisterComponent } from './modules/register/register.component';
import { LoginComponent } from './modules/login/login.component';
import { AddentComponent } from './modules/addent/addent.component';
import { AccComponent } from '@modules/acc/acc.component';
import { SuperuserComponent } from '@modules/superuser/superuser.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AppCustomLayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('@modules/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'map',
        loadChildren: () => import('@modules/map/map.module').then((m) => m.MapModule),
      },
      {
        path: 'register', component: RegisterComponent,
      },
      {
        path: 'login', component: LoginComponent,
      },
      {
        path: 'addent', component: AddentComponent,
      },

      {
        path: 'acc', component: AccComponent
      },
      {
        path: 'addent', component: AddentComponent
      },
      {
        path: 'superuser', component: SuperuserComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
