import { NextFunction, Request, Response, Router } from 'express';
import NFT from '../models/NFT.model';

const marketplaceRouter = Router();

marketplaceRouter.get(
  '/list',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const nfts = await NFT.find().sort({ price: 'asc' });

      res.status(200).json({ message: 'NFT fetched Successfully', nfts });
    } catch (err) {
      next(err);
    }
  }
);

export default marketplaceRouter;
