import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcessoComponent } from './acesso/acesso.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './auth-guard.service';


const routes: Routes = [
  {path: '', component: AcessoComponent},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
