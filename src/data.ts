import { Account, Transaction, Transfer } from './types';
import { v4 as uuidv4 } from 'uuid';

// In-memory data stores
export const accounts: Account[] = [
  {
    id: 'acc_1001',
    accountNumber: '1234567890',
    accountType: 'checking',
    customerId: 'cust_001',
    customerName: 'Alice Johnson',
    balance: 15000.00,
    currency: 'CAD',
    status: 'active',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-10-20T14:30:00Z'
  },
  {
    id: 'acc_1002',
    accountNumber: '0987654321',
    accountType: 'savings',
    customerId: 'cust_002',
    customerName: 'Bob Smith',
    balance: 45000.00,
    currency: 'CAD',
    status: 'active',
    createdAt: '2024-02-10T09:00:00Z',
    updatedAt: '2024-10-21T08:15:00Z'
  },
  {
    id: 'acc_1003',
    accountNumber: '5555666677',
    accountType: 'credit',
    customerId: 'cust_003',
    customerName: 'Carol White',
    balance: -2500.00,
    currency: 'CAD',
    status: 'active',
    createdAt: '2024-03-05T11:30:00Z',
    updatedAt: '2024-10-22T16:45:00Z'
  }
];

export const transactions: Transaction[] = [
  {
    id: 'txn_5001',
    accountId: 'acc_1001',
    type: 'credit',
    amount: 5000.00,
    currency: 'CAD',
    description: 'Salary deposit',
    balanceAfter: 15000.00,
    createdAt: '2024-10-01T09:00:00Z'
  },
  {
    id: 'txn_5002',
    accountId: 'acc_1001',
    type: 'debit',
    amount: 150.00,
    currency: 'CAD',
    description: 'Grocery store purchase',
    balanceAfter: 14850.00,
    createdAt: '2024-10-05T14:30:00Z'
  },
  {
    id: 'txn_5003',
    accountId: 'acc_1002',
    type: 'credit',
    amount: 10000.00,
    currency: 'CAD',
    description: 'Investment deposit',
    balanceAfter: 45000.00,
    createdAt: '2024-10-03T10:15:00Z'
  },
  {
    id: 'txn_5004',
    accountId: 'acc_1002',
    type: 'debit',
    amount: 500.00,
    currency: 'CAD',
    description: 'ATM withdrawal',
    balanceAfter: 44500.00,
    createdAt: '2024-10-07T16:20:00Z'
  },
  {
    id: 'txn_5005',
    accountId: 'acc_1003',
    type: 'debit',
    amount: 1200.00,
    currency: 'CAD',
    description: 'Electronics purchase',
    balanceAfter: -2500.00,
    createdAt: '2024-10-02T11:45:00Z'
  },
  {
    id: 'txn_5006',
    accountId: 'acc_1003',
    type: 'credit',
    amount: 500.00,
    currency: 'CAD',
    description: 'Payment received',
    balanceAfter: -2000.00,
    createdAt: '2024-10-08T13:00:00Z'
  },
  {
    id: 'txn_5007',
    accountId: 'acc_1001',
    type: 'transfer',
    amount: 300.00,
    currency: 'CAD',
    description: 'Transfer to savings',
    balanceAfter: 14550.00,
    createdAt: '2024-10-10T10:00:00Z',
    metadata: {
      transferId: 'tfr_7001',
      fromAccount: 'acc_1001',
      toAccount: 'acc_1002'
    }
  },
  {
    id: 'txn_5008',
    accountId: 'acc_1002',
    type: 'transfer',
    amount: 300.00,
    currency: 'CAD',
    description: 'Transfer from checking',
    balanceAfter: 44800.00,
    createdAt: '2024-10-10T10:00:01Z',
    metadata: {
      transferId: 'tfr_7001',
      fromAccount: 'acc_1001',
      toAccount: 'acc_1002'
    }
  },
  {
    id: 'txn_5009',
    accountId: 'acc_1001',
    type: 'debit',
    amount: 75.50,
    currency: 'CAD',
    description: 'Restaurant payment',
    balanceAfter: 14474.50,
    createdAt: '2024-10-15T19:30:00Z'
  },
  {
    id: 'txn_5010',
    accountId: 'acc_1002',
    type: 'credit',
    amount: 1500.00,
    currency: 'CAD',
    description: 'Interest payment',
    balanceAfter: 46300.00,
    createdAt: '2024-10-20T00:00:00Z'
  }
];

export const transfers: Transfer[] = [
  {
    id: 'tfr_7001',
    fromAccountId: 'acc_1001',
    toAccountId: 'acc_1002',
    amount: 300.00,
    currency: 'CAD',
    description: 'Transfer to savings',
    status: 'processed',
    createdAt: '2024-10-10T09:59:55Z',
    processedAt: '2024-10-10T10:00:00Z'
  }
];

export const getAccountById = (id: string): Account | undefined => {
  return accounts.find(acc => acc.id === id);
};

export const getTransactionById = (id: string): Transaction | undefined => {
  return transactions.find(txn => txn.id === id);
};

export const getTransferById = (id: string): Transfer | undefined => {
  return transfers.find(tfr => tfr.id === id);
};

export const getAccountTransactions = (
  accountId: string,
  from?: string,
  to?: string,
  type?: string
): Transaction[] => {
  let filtered = transactions.filter(txn => txn.accountId === accountId);

  if (from) {
    filtered = filtered.filter(txn => new Date(txn.createdAt) >= new Date(from));
  }

  if (to) {
    filtered = filtered.filter(txn => new Date(txn.createdAt) <= new Date(to));
  }

  if (type) {
    filtered = filtered.filter(txn => txn.type === type);
  }

  return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const createTransfer = (
  fromAccountId: string,
  toAccountId: string,
  amount: number,
  description: string
): Transfer => {
  const transfer: Transfer = {
    id: `tfr_${Date.now()}`,
    fromAccountId,
    toAccountId,
    amount,
    currency: 'CAD',
    description,
    status: 'queued',
    createdAt: new Date().toISOString()
  };

  transfers.push(transfer);

  // Simulate async processing
  setTimeout(() => {
    transfer.status = 'processing';
    setTimeout(() => {
      processTransfer(transfer.id);
    }, 1000);
  }, 500);

  return transfer;
};

const processTransfer = (transferId: string): void => {
  const transfer = getTransferById(transferId);
  if (!transfer) return;

  const fromAccount = getAccountById(transfer.fromAccountId);
  const toAccount = getAccountById(transfer.toAccountId);

  if (!fromAccount || !toAccount) {
    transfer.status = 'failed';
    return;
  }

  // Update balances
  fromAccount.balance -= transfer.amount;
  toAccount.balance += transfer.amount;

  fromAccount.updatedAt = new Date().toISOString();
  toAccount.updatedAt = new Date().toISOString();

  // Create transactions
  const debitTxn: Transaction = {
    id: `txn_${Date.now()}_1`,
    accountId: fromAccount.id,
    type: 'transfer',
    amount: transfer.amount,
    currency: transfer.currency,
    description: `Transfer to ${toAccount.accountNumber}`,
    balanceAfter: fromAccount.balance,
    createdAt: new Date().toISOString(),
    metadata: {
      transferId: transfer.id,
      fromAccount: fromAccount.id,
      toAccount: toAccount.id
    }
  };

  const creditTxn: Transaction = {
    id: `txn_${Date.now()}_2`,
    accountId: toAccount.id,
    type: 'transfer',
    amount: transfer.amount,
    currency: transfer.currency,
    description: `Transfer from ${fromAccount.accountNumber}`,
    balanceAfter: toAccount.balance,
    createdAt: new Date().toISOString(),
    metadata: {
      transferId: transfer.id,
      fromAccount: fromAccount.id,
      toAccount: toAccount.id
    }
  };

  transactions.push(debitTxn, creditTxn);

  transfer.status = 'processed';
  transfer.processedAt = new Date().toISOString();
};

