import type { Request, Response } from 'express';

const index = (_req: Request, res: Response): void => {
  res.json({
    message: 'This endpoint returns the list of libraries',
  });
};

export { index };
