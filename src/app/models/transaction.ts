export interface Transaction {
    id: number;
    transactionId: number;
    status: string;
    type: string;
    clientName: string;
    amount: number;
}