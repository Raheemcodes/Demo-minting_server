import { Contract } from 'web3';
import NFTMarketPlaceAbi from '../../helpers/NFTMarketPlaceAbi.helper';
import { IListRemoved } from '../../models/marketplace.model';
import NFT from '../../models/NFT.model';

const ListRemoved = (contract: Contract<typeof NFTMarketPlaceAbi>) => {
  const sub = contract.events.ListRemoved();

  sub.on('data', async (event) => {
    const { seller, tokenId }: IListRemoved = event.returnValues as any;
    const nft = await NFT.findOne({
      name: `Azuki #${tokenId}`,
      owner: seller.toLowerCase(),
    });
    nft!.price = undefined;

    nft?.save();
    console.log(`tokenId: ${tokenId} UnListed!`);
  });

  sub.on('error', (err: any) => {
    console.error(err);
  });
};

export default ListRemoved;
