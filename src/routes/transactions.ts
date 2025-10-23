import { Router, Request, Response } from 'express';
import { getTransactionById } from '../data';

const router = Router();

// GET /transactions/:id - Get transaction by ID
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const transaction = getTransactionById(id);

  if (!transaction) {
    res.status(404).json({
      error: 'Not Found',
      message: `Transaction with ID ${id} not found.`,
      statusCode: 404,
      timestamp: new Date().toISOString()
    });
    return;
  }

  res.status(200).json({
    success: true,
    data: transaction,
    timestamp: new Date().toISOString()
  });
});

export default router;

