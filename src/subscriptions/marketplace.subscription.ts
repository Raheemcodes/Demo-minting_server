import Web3 from 'web3/lib/types';
import NFTMarketPlaceAbi from '../helpers/NFTMarketPlaceAbi.helper';
import NFT from '../models/NFT.model';
import { ListCreated } from '../models/marketplace.model';

const { MARKETPLACE_ADDRESS } = process.env;

export const marketplace = (web3: Web3) => {
  const contract = new web3.eth.Contract(
    NFTMarketPlaceAbi,
    MARKETPLACE_ADDRESS
  );

  const sub = contract.events.ListCreated();

  sub.on('data', async (event) => {
    const { seller, price }: ListCreated = event.returnValues as any;
    const nft = await NFT.findOne({ owner: seller.toLowerCase() });

    nft!.price = Number(price);

    nft?.save();
  });

  sub.on('error', (err: any) => {
    console.error(err);
  });
};
