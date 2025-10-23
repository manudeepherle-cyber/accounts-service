import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { apiKeyAuth } from './middleware/auth';
import accountsRouter from './routes/accounts';
import transactionsRouter from './routes/transactions';
import transfersRouter from './routes/transfers';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

// Health check endpoint (no auth required)
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'healthy',
    service: 'RBC Accounts Service',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Apply API key authentication to all routes except /health
app.use(apiKeyAuth);

// API Routes
app.use('/accounts', accountsRouter);
app.use('/transactions', transactionsRouter);
app.use('/transfers', transfersRouter);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} not found.`,
    statusCode: 404,
    timestamp: new Date().toISOString()
  });
});

// Error handler
app.use((err: Error, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message || 'An unexpected error occurred.',
    statusCode: 500,
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 RBC Accounts Service running on http://localhost:${PORT}`);
  console.log(`📊 Health check available at http://localhost:${PORT}/health`);
  console.log(`🔑 API Key required for protected endpoints`);
});

export default app;

