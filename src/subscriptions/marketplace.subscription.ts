import Web3 from 'web3/lib/types';
import NFTMarketPlaceAbi from '../helpers/NFTMarketPlaceAbi.helper';
import ListCreated from './list/ListCreated.subscription';
import ListRemoved from './list/ListRemoved.subscription';

const { MARKETPLACE_ADDRESS } = process.env;

export const marketplace = (web3: Web3) => {
  const contract = new web3.eth.Contract(
    NFTMarketPlaceAbi,
    MARKETPLACE_ADDRESS
  );

  ListCreated(contract);
  ListRemoved(contract);
};
