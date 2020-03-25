export interface Transaction {
    transactionId: number;
    status: string;
    type: string;
    clientName: string;
    amount: number;
}