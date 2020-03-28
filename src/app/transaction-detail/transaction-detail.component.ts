import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { TransactionService } from '../service/transaction.service';  
import { Transaction } from '../model/transaction';  

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.css']
})
export class TransactionDetailComponent implements OnInit {
  @Input() id: number;
  optionsStatus=['Pending', 'Completed', 'Cancelled'];
  transaction: Transaction;

  constructor(
    private service: TransactionService,
    public activeModal: NgbActiveModal
    ) { }

  ngOnInit(): void {
    this.getTransaction(this.id);
  }

  getTransaction(id: number): void {
    this.service.getTransaction(id)
      .subscribe(transaction => this.transaction = transaction);
  }

  save(): void {
    this.service.updateTransaction(this.transaction)
      .subscribe(() =>
      this.closeModal('changes saved!'));
  }

  closeModal(sendData) {
    this.activeModal.close(sendData);
  }
}
