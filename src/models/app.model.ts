export interface Transfer {
  from: string;
  to: string;
  tokenId: bigint;
}

export interface ListCreated {
  nft: string;
  seller: string;
  tokenId: bigint;
  price: bigint;
}
