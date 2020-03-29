import { Component, OnInit, ViewChild } from '@angular/core';
import { TransactionService } from '../service/transaction.service';
import { Transaction } from '../model/transaction';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExcelService } from '../service/excel.service'
import { TransactionDetailComponent } from '../transaction-detail/transaction-detail.component';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  @ViewChild('fileInput') fileInput;
  transactions: Transaction[] = [];
  optionsStatus = ['Pending', 'Completed', 'Cancelled'];
  optionsType = ['Withdrawal', 'Refill'];
  selectedStatus: string = '';
  selectedType: string = '';
  page = 1;
  pageSize = 10;

  constructor(
    private service: TransactionService, 
    private modalService: NgbModal,
    private excelService: ExcelService
    ) {
  }

  ngOnInit(): void {
    this.getTransactions();
  }

  getTransactions(): void {
    this.service.getTransactions()
      .subscribe(transactions => this.transactions = transactions);
  }

  delete(transaction: Transaction): void {
    var ans = confirm("Do you want to delete transaction?");
    if (ans) {
      this.transactions = this.transactions.filter(h => h !== transaction);
      this.service.deleteTransaction(transaction).subscribe();
    }
  }

  uploadFile() {
    let formData = new FormData();
    formData.append('import', this.fileInput.nativeElement.files[0])

    this.service.ImportCsv(formData).subscribe(result => {
      this.getTransactions();
    });
  }

  onSelect(status: string, type: string) {
    this.service.filteringTransactions(status, type)
      .subscribe(transactions => this.transactions = transactions);
  }

  exportExcel() :void {
    this.excelService.exportAsExcelFile(this.transactions, 'transactions');
 }

  openModal(id: number) {
    const modalRef = this.modalService.open(TransactionDetailComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass'
      });

    modalRef.componentInstance.id = id;
    modalRef.result.then((result) => {
      if (result == 'changes saved!') {
        this.getTransactions();
        console.log(result);
      }
      else {
        console.log(result);
      }
    });
  }
}