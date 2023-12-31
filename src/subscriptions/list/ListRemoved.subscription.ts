import { Contract } from 'web3';
import NFTMarketPlaceAbi from '../../helpers/NFTMarketPlaceAbi.helper';
import { IListRemoved } from '../../models/marketplace.model';
import NFT from '../../models/NFT.model';

const { ART_NAME } = process.env;

const ListRemoved = (contract: Contract<typeof NFTMarketPlaceAbi>) => {
  const sub = contract.events.ListRemoved();

  sub.on('data', async (event) => {
    const { seller, tokenId }: IListRemoved = event.returnValues as any;
    const nft = await NFT.findOne({
      name: `${ART_NAME} #${tokenId}`,
      owner: seller.toLowerCase(),
    });
    nft!.price = undefined;

    nft?.save();
    console.log(`tokenId: ${tokenId} Unlisted!`);
  });

  sub.on('error', (err: any) => {
    console.error(err);
  });
};

export default ListRemoved;
