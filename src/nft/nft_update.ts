import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import wallet from "../../devnet-wallet.json";
import {
  createSignerFromKeypair,
  publicKey,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { fetchAsset, mplCore, update } from "@metaplex-foundation/mpl-core";
import { base58 } from "@metaplex-foundation/umi/serializers";

const umi = createUmi(
  process.env.SOLANA_RPC_URL ?? "https://api.devnet.solana.com",
);

const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(signerIdentity(signer));

umi.use(mplCore());

(async () => {
  try {
    //paste your asset address got from nft_mint.ts
    const assetAddress = publicKey("8oJ66Hm3XfSwUXdKKAUKRnyEDNgdYkdKdsVc1vrrWkpP");

    //new name and metadata uri
    const newName = "dakeyyy NFT v2";
    const newUri =
      "https://gateway.irys.xyz/DPUDp9SNtz9pqjbJRrvrHZJC5cm82U9yeH7vyjTcEoRD";

    // update needs the current asset account, so fetch it first
    const asset = await fetchAsset(umi, assetAddress);

    // only the update authority (our wallet, it minted the NFT) can do this
    const tx = await update(umi, {
      asset,
      name: newName,
      uri: newUri,
    }).sendAndConfirm(umi);

    const signature = base58.deserialize(tx.signature)[0];

    console.log(`signature ${signature} , asset : ${asset.publicKey}`);
  } catch (e) {
    console.log(`error ${e}`);
  }
})();
