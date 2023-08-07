import { NextFunction, Request, Response } from 'express';
import { Result, ValidationError, validationResult } from 'express-validator';
import { handleReqError } from '../helpers/error.helper';
import NFT from '../models/NFT.model';

export const getTokens = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) throw handleReqError(errors);

    const { skip, limit, minted } = req.query;

    const nfts = await (minted == 'true'
      ? NFT.find({ mintedAt: { $exists: true } }).sort({
          mintedAt: 'desc',
        })
      : NFT.find()
    )
      .skip(+skip!)
      .limit(+limit!);

    res.status(200).json({ msg: 'Tokens fetch Successful', nfts });
  } catch (err) {
    next(err);
  }
};

export const getProfileTokens = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) throw handleReqError(errors);

    const { owner } = req.params;
    const nfts = await NFT.find({ owner }).sort({ price: 'desc' });

    res.status(200).json({ msg: 'Tokens fetch Successful', nfts });
  } catch (err) {
    next(err);
  }
};
