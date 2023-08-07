import { Router } from 'express';
import { query } from 'express-validator';
import { getListedTokens } from '../controllers/marketplace.controller';
import { handleError } from '../helpers/error.helper';
import NFT from '../models/NFT.model';

const marketplaceRouter = Router();

marketplaceRouter.get(
  '/listings',
  [
    query('skip', 'INVALID_SKIP')
      .trim()
      .isNumeric()
      .custom(async (val) => {
        const count: number = await NFT.countDocuments({
          price: { $exists: true },
        });
        if (+val && +val >= count) throw handleError('EXCEED_COUNT', 422);
      }),
    query('limit', 'INVALID_LIMIT')
      .trim()
      .isNumeric()
      .custom((value) => value > 0),
  ],
  getListedTokens
);

export default marketplaceRouter;
