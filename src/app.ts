import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Web3 from 'web3';
import compression from 'compression';
import helmet from 'helmet';

import { marketplace } from './subscriptions/marketplace.subscription';
import { nft } from './subscriptions/nft.subscription';
import { CustomError } from './models/error.model';
import marketplaceRouter from './routers/marketplace.router';
import nftRouter from './routers/nft.router';

const { PORT, ORIGIN, PROVIDER, INFURA_API_KEY } = process.env;

const app = express();
const web3 = new Web3(
  PROVIDER || `wss://sepolia.infura.io/ws/v3/${INFURA_API_KEY}`
);

web3.provider?.on('connect', () => {
  console.log('connected!');
});

app.use(compression());
app.use(helmet());
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header({
    'Access-Control-Allow-Origin': ORIGIN,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH',
    'Access-Control-Allow-Headers': 'Content-Type',
  });

  next();
});

app.use(marketplaceRouter);
app.use(nftRouter);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  const { message, statusCode = 500, data }: CustomError = error;

  res.status(statusCode).json({ message, data });
  console.log(error);
});

export const connectToDB = async (): Promise<string | undefined> => {
  try {
    nft(web3);
    marketplace(web3);

    await mongoose.connect(
      'mongodb+srv://raheem:raheem@cluster0.u4041.mongodb.net/NFT_collection'
    );
    app.listen(PORT, () => {
      console.log(`Server running at Port: ${PORT}`);
    });

    return 'Connected to DB';
  } catch (error) {
    console.error(error);
  }
};

connectToDB();

export default app;
