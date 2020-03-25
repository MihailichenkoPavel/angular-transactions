import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { TransactionService } from '../service/transaction.service';  
import { Transaction } from '../model/transaction';  

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.css']
})
export class TransactionDetailComponent implements OnInit {
  @Input() transaction: Transaction;
  optionsStatus=['Pending', 'Completed', 'Cancelled'];

  constructor(
    private service: TransactionService,
    private location: Location,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.getTransaction();
  }

  getTransaction(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.service.getTransaction(id)
      .subscribe(transaction => this.transaction = transaction);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.service.updateTransaction(this.transaction)
      .subscribe(() => this.goBack());
  }
}
