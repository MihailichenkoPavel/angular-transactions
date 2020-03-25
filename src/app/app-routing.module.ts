import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {TransactionsComponent} from './transactions/transactions.component'
import { TransactionDetailComponent }  from './transaction-detail/transaction-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/transactions', pathMatch: 'full' },
  { path: 'transactions', component: TransactionsComponent },
  { path: 'detail/:id', component: TransactionDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
