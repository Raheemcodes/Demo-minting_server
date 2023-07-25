import Web3 from 'web3';
import { nft } from './controllers/nft.controller';
import { marketplace } from './controllers/marketplace.controller';
import mongoose from 'mongoose';
import fetchData from './helper/fetch.helper';

const { PROVIDER, INFURA_API_KEY } = process.env;

const web3 = new Web3(
  PROVIDER || `wss://sepolia.infura.io/ws/v3/${INFURA_API_KEY}`
);

(async () => {
  try {
    nft(web3);
    marketplace(web3);

    await mongoose.connect(
      'mongodb+srv://raheem:raheem@cluster0.u4041.mongodb.net/NFT_collection'
    );
    console.log(`Connected to mongoDB`);
  } catch (error) {
    console.error(error);
  }
})();
