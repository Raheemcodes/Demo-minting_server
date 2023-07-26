import mongoose from 'mongoose';
import Web3 from 'web3';
import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from 'express';

import { marketplace } from './controllers/marketplace.controller';
import { nft } from './controllers/nft.controller';
import marketplaceRouter from './routers/marketplace.router';

const { PORT, ORIGIN, PROVIDER, INFURA_API_KEY } = process.env;

const app = express();
const web3 = new Web3(
  PROVIDER || `wss://sepolia.infura.io/ws/v3/${INFURA_API_KEY}`
);

web3.provider?.on('connect', () => {
  console.log('connected!');
});

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

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log(error);

  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;

  res.status(status).json({ message: message, data: data });
});

(async () => {
  try {
    nft(web3);
    marketplace(web3);

    await mongoose.connect(
      'mongodb+srv://raheem:raheem@cluster0.u4041.mongodb.net/NFT_collection'
    );
    app.listen(PORT, () => {
      console.log(`Server running at Port: ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
})();
