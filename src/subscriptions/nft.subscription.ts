import { HydratedDocument } from 'mongoose';
import Web3 from 'web3/lib/types';
import NFTDemoAbi from '../helpers/NFTDemoAbi.helper';
import NFT, { INFT } from '../models/NFT.model';
import { Transfer } from '../models/marketplace.model';

const { DEFAULT_ADDRESS, NFT_ADDRESS, ART_NAME } = process.env;

export const nft = (web3: Web3) => {
  const contract = new web3.eth.Contract(NFTDemoAbi, NFT_ADDRESS);

  const sub = contract.events.Transfer({
    filter: { from: DEFAULT_ADDRESS },
  });

  sub.on('data', async (event) => {
    const { to, tokenId }: Transfer = event.returnValues as any;

    const nft: HydratedDocument<INFT> | null = await NFT.findOne({
      name: `${ART_NAME} #${tokenId}`,
    });

    nft!.owner = to.toLowerCase();
    nft!.mintedAt = new Date();

    await nft!.save();

    console.log('NFT: Created!');
  });

  sub.on('error', (err: any) => {
    console.error(err);
  });
};
