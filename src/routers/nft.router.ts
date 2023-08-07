import { Router } from 'express';
import { param, query } from 'express-validator';
import { validator } from 'web3';
import { getProfileTokens, getTokens } from '../controllers/nft.controller';
import { handleError } from '../helpers/error.helper';
import NFT from '../models/NFT.model';

const nftRouter = Router();

nftRouter.get(
  '/tokens',
  [
    query('skip', 'INVALID_SKIP')
      .trim()
      .isNumeric()
      .custom(async (val, { req }) => {
        const { minted } = req.query!;
        const count: number = await (minted == 'true'
          ? NFT.countDocuments({ mintedAt: { $exists: true } })
          : NFT.estimatedDocumentCount());
        if (+val && +val >= count) throw handleError('EXCEED_COUNT', 422);
      }),
    query('limit', 'INVALID_LIMIT')
      .trim()
      .isNumeric()
      .custom((value) => value > 0),
  ],
  getTokens
);

nftRouter.get(
  '/tokens/:owner',
  param('owner', 'INVALID_ADDRESS').custom((value: string) =>
    validator.isAddress(value.toLowerCase())
  ),
  getProfileTokens
);

export default nftRouter;
