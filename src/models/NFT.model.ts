import { Schema, model } from 'mongoose';

export interface INFT {
  name: string;
  image: string;
  attributes: { trait_type: string; value: string }[];
  navigation?: {
    next?: string;
    prev?: string;
  };
  owner?: string;
  price?: number;
  mintedAt?: Date;
}

const nftSchema = new Schema<INFT>({
  name: { type: String, required: true },
  image: { type: String, required: true },
  attributes: [
    {
      trait_type: { type: String, required: true },
      value: { type: String, required: true },
    },
  ],
  navigation: {
    next: String,
    prev: String,
  },
  mintedAt: Date,
  owner: String,
  price: Number,
});

const NFT = model<INFT>('NFT', nftSchema);
export default NFT;
