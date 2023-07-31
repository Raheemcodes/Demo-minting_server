export interface Transfer {
  from: string;
  to: string;
  tokenId: bigint;
}

export interface IListCreated {
  seller: string;
  tokenId: bigint;
  price: bigint;
}

export interface IListRemoved {
  seller: string;
  tokenId: number;
}
