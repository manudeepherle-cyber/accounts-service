import { Router, Request, Response } from 'express';
import {
  accounts,
  getAccountById,
  getAccountTransactions
} from '../data';

const router = Router();

// GET /accounts - List all accounts
router.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    data: accounts,
    count: accounts.length,
    timestamp: new Date().toISOString()
  });
});

// GET /accounts/:id - Get account by ID
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const account = getAccountById(id);

  if (!account) {
    res.status(404).json({
      error: 'Not Found',
      message: `Account with ID ${id} not found.`,
      statusCode: 404,
      timestamp: new Date().toISOString()
    });
    return;
  }

  res.status(200).json({
    success: true,
    data: account,
    timestamp: new Date().toISOString()
  });
});

// GET /accounts/:id/balance - Get account balance
router.get('/:id/balance', (req: Request, res: Response) => {
  const { id } = req.params;
  const account = getAccountById(id);

  if (!account) {
    res.status(404).json({
      error: 'Not Found',
      message: `Account with ID ${id} not found.`,
      statusCode: 404,
      timestamp: new Date().toISOString()
    });
    return;
  }

  res.status(200).json({
    success: true,
    data: {
      accountId: account.id,
      accountNumber: account.accountNumber,
      balance: account.balance,
      currency: account.currency,
      availableBalance: account.accountType === 'credit' 
        ? Math.abs(account.balance) 
        : account.balance,
      status: account.status,
      asOf: account.updatedAt
    },
    timestamp: new Date().toISOString()
  });
});

// GET /accounts/:id/transactions - Get account transactions with filters
router.get('/:id/transactions', (req: Request, res: Response) => {
  const { id } = req.params;
  const { from, to, type } = req.query;

  const account = getAccountById(id);
  if (!account) {
    res.status(404).json({
      error: 'Not Found',
      message: `Account with ID ${id} not found.`,
      statusCode: 404,
      timestamp: new Date().toISOString()
    });
    return;
  }

  // Validate transaction type if provided
  if (type && !['debit', 'credit', 'transfer'].includes(type as string)) {
    res.status(400).json({
      error: 'Bad Request',
      message: 'Invalid transaction type. Must be one of: debit, credit, transfer.',
      statusCode: 400,
      timestamp: new Date().toISOString()
    });
    return;
  }

  const txns = getAccountTransactions(
    id,
    from as string,
    to as string,
    type as string
  );

  res.status(200).json({
    success: true,
    data: txns,
    count: txns.length,
    filters: {
      from: from || null,
      to: to || null,
      type: type || null
    },
    timestamp: new Date().toISOString()
  });
});

// GET /accounts/:id/statement - Get account statement for a date range
router.get('/:id/statement', (req: Request, res: Response) => {
  const { id } = req.params;
  const { from, to, format = 'json' } = req.query;

  const account = getAccountById(id);
  if (!account) {
    res.status(404).json({
      error: 'Not Found',
      message: `Account with ID ${id} not found.`,
      statusCode: 404,
      timestamp: new Date().toISOString()
    });
    return;
  }

  // Validate date range
  if (!from || !to) {
    res.status(400).json({
      error: 'Bad Request',
      message: 'Both from and to date parameters are required.',
      statusCode: 400,
      timestamp: new Date().toISOString()
    });
    return;
  }

  // Validate format
  if (format && !['json', 'pdf', 'csv'].includes(format as string)) {
    res.status(400).json({
      error: 'Bad Request',
      message: 'Invalid format. Must be one of: json, pdf, csv.',
      statusCode: 400,
      timestamp: new Date().toISOString()
    });
    return;
  }

  // Get transactions for the date range
  const txns = getAccountTransactions(id, from as string, to as string);

  // Calculate summary
  const debits = txns
    .filter(t => t.type === 'debit')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const credits = txns
    .filter(t => t.type === 'credit')
    .reduce((sum, t) => sum + t.amount, 0);

  const statement = {
    accountId: account.id,
    accountNumber: account.accountNumber,
    accountType: account.accountType,
    customerName: account.customerName,
    statementPeriod: {
      from: from,
      to: to
    },
    openingBalance: account.balance - (credits - debits), // Calculated based on current balance
    closingBalance: account.balance,
    currency: account.currency,
    summary: {
      totalDebits: debits,
      totalCredits: credits,
      netChange: credits - debits,
      transactionCount: txns.length
    },
    transactions: txns,
    generatedAt: new Date().toISOString(),
    format: format as string
  };

  res.status(200).json({
    success: true,
    data: statement,
    message: `Statement generated in ${format} format.`,
    timestamp: new Date().toISOString()
  });
});

export default router;

