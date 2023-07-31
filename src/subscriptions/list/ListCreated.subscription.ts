import { Contract } from 'web3';
import NFTMarketPlaceAbi from '../../helpers/NFTMarketPlaceAbi.helper';
import NFT from '../../models/NFT.model';
import { IListCreated } from '../../models/marketplace.model';

const ListCreated = (contract: Contract<typeof NFTMarketPlaceAbi>) => {
  const sub = contract.events.ListCreated();

  sub.on('data', async (event) => {
    const { seller, tokenId, price }: IListCreated = event.returnValues as any;
    const nft = await NFT.findOne({
      name: `Azuki #${tokenId}`,
      owner: seller.toLowerCase(),
    });
    nft!.price = Number(price);

    nft?.save();
    console.log(`tokenId: ${tokenId} Listed!`);
  });

  sub.on('error', (err: any) => {
    console.error(err);
  });
};

export default ListCreated;
