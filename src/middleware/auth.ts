import { Request, Response, NextFunction } from 'express';

// Valid API keys for demo purposes
const VALID_API_KEYS = [
  'rbc-demo-key-local-12345',
  'rbc-demo-key-release-67890'
];

export const apiKeyAuth = (req: Request, res: Response, next: NextFunction): void => {
  const apiKey = req.headers['x-api-key'] as string;

  if (!apiKey) {
    res.status(401).json({
      error: 'Unauthorized',
      message: 'API key is required. Please provide X-API-Key header.',
      statusCode: 401,
      timestamp: new Date().toISOString()
    });
    return;
  }

  if (!VALID_API_KEYS.includes(apiKey)) {
    res.status(403).json({
      error: 'Forbidden',
      message: 'Invalid API key provided.',
      statusCode: 403,
      timestamp: new Date().toISOString()
    });
    return;
  }

  next();
};

