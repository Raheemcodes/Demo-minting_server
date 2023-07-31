import { Router } from 'express';
import { param, query } from 'express-validator';
import {
  getProfileTokens,
  getTokens,
} from '../controllers/marketplace.controller';
import { handleError } from '../helpers/error.helper';
import NFT from '../models/NFT.model';
import { validator } from 'web3';

const marketplaceRouter = Router();

marketplaceRouter.get(
  '/tokens',
  [
    query('skip', 'INVALID_SKIP')
      .trim()
      .isNumeric()
      .custom(async (value) => {
        const count: number = await NFT.estimatedDocumentCount();
        if (value >= count) throw handleError('EXCEED_COUNT', 422);
      }),
    query('limit', 'INVALID_LIMIT')
      .trim()
      .isNumeric()
      .custom((value) => value > 0),
  ],
  getTokens
);

marketplaceRouter.get(
  '/tokens/:owner',
  param('owner', 'INVALID_ADDRESS').custom((value: string) =>
    validator.isAddress(value.toLowerCase())
  ),
  getProfileTokens
);

export default marketplaceRouter;
