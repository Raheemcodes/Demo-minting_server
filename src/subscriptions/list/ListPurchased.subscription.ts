import { Contract } from 'web3';
import NFTMarketPlaceAbi from '../../helpers/NFTMarketPlaceAbi.helper';
import NFT from '../../models/NFT.model';
import { IListPurchased } from '../../models/marketplace.model';

const ListPurchased = (contract: Contract<typeof NFTMarketPlaceAbi>) => {
  const sub = contract.events.ListPurchased();

  sub.on('data', async (event) => {
    const { seller, tokenId, buyer }: IListPurchased =
      event.returnValues as any;
    const nft = await NFT.findOne({
      name: `Azuki #${tokenId}`,
      owner: seller.toLowerCase(),
    });

    nft!.price = undefined;
    nft!.owner = buyer.toLowerCase();

    nft?.save();
    console.log(`tokenId: ${tokenId} Purchased!`);
  });

  sub.on('error', (err: any) => {
    console.error(err);
  });
};

export default ListPurchased;
