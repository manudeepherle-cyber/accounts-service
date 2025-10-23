import { Router, Request, Response } from 'express';
import { getTransferById, createTransfer, getAccountById } from '../data';

const router = Router();

// POST /transfers - Create a new transfer
router.post('/', (req: Request, res: Response) => {
  const { fromAccountId, toAccountId, amount, description } = req.body;

  // Validation
  if (!fromAccountId || !toAccountId || amount === undefined || !description) {
    res.status(400).json({
      error: 'Bad Request',
      message: 'Missing required fields: fromAccountId, toAccountId, amount, description.',
      statusCode: 400,
      timestamp: new Date().toISOString()
    });
    return;
  }

  if (typeof amount !== 'number' || amount <= 0) {
    res.status(400).json({
      error: 'Bad Request',
      message: 'Amount must be a positive number greater than 0.',
      statusCode: 400,
      timestamp: new Date().toISOString()
    });
    return;
  }

  if (fromAccountId === toAccountId) {
    res.status(400).json({
      error: 'Bad Request',
      message: 'Cannot transfer to the same account.',
      statusCode: 400,
      timestamp: new Date().toISOString()
    });
    return;
  }

  const fromAccount = getAccountById(fromAccountId);
  const toAccount = getAccountById(toAccountId);

  if (!fromAccount) {
    res.status(404).json({
      error: 'Not Found',
      message: `Source account with ID ${fromAccountId} not found.`,
      statusCode: 404,
      timestamp: new Date().toISOString()
    });
    return;
  }

  if (!toAccount) {
    res.status(404).json({
      error: 'Not Found',
      message: `Destination account with ID ${toAccountId} not found.`,
      statusCode: 404,
      timestamp: new Date().toISOString()
    });
    return;
  }

  if (fromAccount.status !== 'active' || toAccount.status !== 'active') {
    res.status(400).json({
      error: 'Bad Request',
      message: 'Both accounts must be active to perform a transfer.',
      statusCode: 400,
      timestamp: new Date().toISOString()
    });
    return;
  }

  if (fromAccount.balance < amount) {
    res.status(400).json({
      error: 'Bad Request',
      message: 'Insufficient funds in source account.',
      statusCode: 400,
      timestamp: new Date().toISOString()
    });
    return;
  }

  const transfer = createTransfer(fromAccountId, toAccountId, amount, description);

  res.status(201).json({
    success: true,
    data: transfer,
    message: 'Transfer created successfully and queued for processing.',
    timestamp: new Date().toISOString()
  });
});

// GET /transfers/:id/status - Get transfer status
router.get('/:id/status', (req: Request, res: Response) => {
  const { id } = req.params;
  const transfer = getTransferById(id);

  if (!transfer) {
    res.status(404).json({
      error: 'Not Found',
      message: `Transfer with ID ${id} not found.`,
      statusCode: 404,
      timestamp: new Date().toISOString()
    });
    return;
  }

  res.status(200).json({
    success: true,
    data: {
      transferId: transfer.id,
      status: transfer.status,
      fromAccountId: transfer.fromAccountId,
      toAccountId: transfer.toAccountId,
      amount: transfer.amount,
      currency: transfer.currency,
      createdAt: transfer.createdAt,
      processedAt: transfer.processedAt || null,
      estimatedCompletionTime: transfer.status === 'queued' || transfer.status === 'processing'
        ? new Date(Date.now() + 2000).toISOString()
        : null
    },
    timestamp: new Date().toISOString()
  });
});

export default router;

