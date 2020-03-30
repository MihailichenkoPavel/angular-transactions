import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {TransactionsComponent} from './transactions/transactions.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/transactions', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },    
  { path: 'transactions', component: TransactionsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
