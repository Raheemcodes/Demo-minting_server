export interface Transfer {
  from: string;
  to: string;
  tokenId: bigint;
}

export interface ListCreated {
  seller: string;
  tokenId: bigint;
  price: bigint;
}
