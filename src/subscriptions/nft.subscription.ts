import Web3 from 'web3/lib/types';
import AzukiDemoAbi from '../helpers/AzukiDemoAbi.helper';
import fetchData from '../helpers/fetch.helper';
import NFT, { INFT } from '../models/NFT.model';
import { Transfer } from '../models/marketplace.model';
import { HydratedDocument } from 'mongoose';

const { DEFAULT_ADDRESS, NFT_ADDRESS } = process.env;

export const nft = (web3: Web3) => {
  const contract = new web3.eth.Contract(AzukiDemoAbi, NFT_ADDRESS);

  const sub = contract.events.Transfer({
    filter: { from: DEFAULT_ADDRESS },
  });

  sub.on('data', async (event) => {
    const { to, tokenId }: Transfer = event.returnValues as any;
    const data: INFT = await fetchData(
      `https://ipfs.io/ipfs/QmZcH4YvBVVRJtdn4RdbaqgspFU8gH6P9vomDpBVpAL3u4/${tokenId}`
    );

    const nft: HydratedDocument<INFT> = new NFT({
      ...data,
      owner: to.toLowerCase(),
    });

    await nft.save();

    console.log('NFT: Created!');
  });

  sub.on('error', (err: any) => {
    console.error(err);
  });
};
