export interface Account {
  id: string;
  accountNumber: string;
  accountType: 'checking' | 'savings' | 'credit';
  customerId: string;
  customerName: string;
  balance: number;
  currency: string;
  status: 'active' | 'inactive' | 'frozen';
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  accountId: string;
  type: 'debit' | 'credit' | 'transfer';
  amount: number;
  currency: string;
  description: string;
  balanceAfter: number;
  createdAt: string;
  metadata?: {
    transferId?: string;
    fromAccount?: string;
    toAccount?: string;
  };
}

export interface Transfer {
  id: string;
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  currency: string;
  description: string;
  status: 'queued' | 'processing' | 'processed' | 'failed';
  createdAt: string;
  processedAt?: string;
}

export interface ApiError {
  error: string;
  message: string;
  statusCode: number;
  timestamp: string;
}

