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

export default router;

