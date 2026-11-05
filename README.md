# scripts-solana

Scripts for creating SPL tokens and NFTs on Solana devnet.

---

## Setup

### 1. Add your wallet

Place your devnet wallet keypair file at the project root:

```
root/
└── devnet-wallet.json   ← here
```

It should be a JSON array of numbers, e.g. `[174, 23, ...]`.

### 2. Install dependencies

```bash
npm install
```

```bash
npm install --save-dev @types/node ts-node typescript
```

### 3. Add your image

Place your images at the project root (one for the mint, one for the update).

```
root/
├── nft-1.png   ← here
└── nft-2.png   ← here
```

---

> Before running the scripts, go through these docs:
> - [Solana token docs](https://solana.com/docs/tokens) — mint accounts, token accounts, and ATAs
> - [Solana Kit](https://www.solanakit.com/) — the JS SDK used for building and sending transactions
> - [Metaplex Token Metadata](https://www.metaplex.com/docs/smart-contracts/token-metadata) — attaching metadata to SPL tokens
> - [Metaplex Core](https://www.metaplex.com/docs/smart-contracts/core) — the NFT standard used in the NFT scripts

## SPL Token

Uses **@solana/kit** and **@solana-program/token** for transactions, and **mpl-token-metadata** via UMI for on-chain metadata.

| Script | Command | What it does |
|---|---|---|
| `spl_init.ts` | `npm run spl:init` | Creates a new mint account |
| `spl_metadata.ts` | `npm run spl:metadata` | Attaches a name, symbol, and URI to the mint |
| `spl_mint.ts` | `npm run spl:mint` | Creates your associated token account and mints tokens into it |
| `spl_transfer.ts` | `npm run spl:transfer` | Sends tokens to another wallet i.e ata to ata |

Run them in order. Each script logs the addresses/signatures you'll need to paste into the next one.

---

## NFT

Uses **@solana/kit** and **mpl-core** via UMI. Images and metadata are stored on Irys (decentralized storage).

| Script | Command | What it does |
|---|---|---|
| `nft_image.ts` | `npm run nft:image` | Uploads your image to Irys, logs the image URI |
| `nft_metadata.ts` | `npm run nft:metadata` | Builds the metadata JSON and uploads it, logs the metadata URI |
| `nft_mint.ts` | `npm run nft:mint` | Mints the NFT on-chain using the metadata URI |
| `nft_update.ts` | `npm run nft:update` | Changes the NFT's name and metadata URI |

Run them in order. Paste the URI logged by each step into the next script before running it.

To update: change the image path in `nft_image.ts` to `nft-2.png` and run it again, put the new image URI and name in `nft_metadata.ts` and run it again, then paste the asset address, new name and new metadata URI into `nft_update.ts` and run it.

---

## Devnet results

Wallet (payer, mint authority, NFT owner and update authority): [`7E1yto1FpbAEGkCWcJ8Y3jfeKK1RSPRLUqn7KvkwhwMc`](https://explorer.solana.com/address/7E1yto1FpbAEGkCWcJ8Y3jfeKK1RSPRLUqn7KvkwhwMc?cluster=devnet)

### SPL token

Mint: [`69dr3QpuKxgyJwZdvnPdQUdcudNM1ikjpoKeqFq38ZR3`](https://explorer.solana.com/address/69dr3QpuKxgyJwZdvnPdQUdcudNM1ikjpoKeqFq38ZR3?cluster=devnet) (name `dakeyyy`, symbol `DKY`, 6 decimals)

| Step | Transaction |
|---|---|
| `spl:init` | [2pkSU9i3…EnUHNTBm](https://explorer.solana.com/tx/2pkSU9i3vfphr3txxJZuooKKYGzhMn8CMTgQhAyS7jwnfPmcmFRFnKTgZQmyK2pxcDxGvAHG1ZVsERovEnUHNTBm?cluster=devnet) |
| `spl:metadata` | [2s8nFumi…HUCb7Gwrd](https://explorer.solana.com/tx/2s8nFumiDU8EB67Tzz8Qp6mHDUZkURWeYwcuzpFEmurFLpfFf6qMTr3onXttV5Wb35tR8snraVNmsTNHUCb7Gwrd?cluster=devnet) |
| `spl:mint` (1000 tokens) | [7pBTCV4v…A8XQZcVCSRkQ](https://explorer.solana.com/tx/7pBTCV4v28MWHinWZzSm8kqDfYfAoyBoUAGyY2X5MNAFpyz84LEwPK6fhmEYZCeGsmH9w4SNFH7A8XQZcVCSRkQ?cluster=devnet) |
| `spl:transfer` (10 tokens to `9EUd4VNcjMAysd7zQk3Q1a4tb28BYndLNBAQDiYnHJ64`) | [3NuKESR3…SDuepb9xdd](https://explorer.solana.com/tx/3NuKESR3rp6NqoFisuanpa7ZjrCf6Xoa9D9xboN82szDYpLH5dfKozEXvk8gCsSaUWyNSpAowNdUv6SDuepb9xdd?cluster=devnet) |

### NFT (MPL Core)

Asset: [`8oJ66Hm3XfSwUXdKKAUKRnyEDNgdYkdKdsVc1vrrWkpP`](https://explorer.solana.com/address/8oJ66Hm3XfSwUXdKKAUKRnyEDNgdYkdKdsVc1vrrWkpP?cluster=devnet)

| Step | Name | Metadata URI | Transaction |
|---|---|---|---|
| `nft:mint` | `dakeyyy NFT` | [GQRf22SD…](https://gateway.irys.xyz/GQRf22SD8S1LUYy2zZU74XTXXnYnvmVjwmefgZgf6W7P) ([image](https://gateway.irys.xyz/GBd87z6w6pqEqdXiPvoC6Sx3YnahUhySbTMPzBT9pfkd)) | [2LmCuWuy…4pvKevtdX](https://explorer.solana.com/tx/2LmCuWuyaQxcwHsMkHGyE9NGx9TgrUJNm3LmUxG18k3s6RokExQzJQNQ3Zzj3xgrQS2XNxhEag4xbZh4pvKevtdX?cluster=devnet) |
| `nft:update` | `dakeyyy NFT v2` | [DPUDp9SN…](https://gateway.irys.xyz/DPUDp9SNtz9pqjbJRrvrHZJC5cm82U9yeH7vyjTcEoRD) ([image](https://gateway.irys.xyz/BQenwfzoW5KkEzuJ5JwkP4b58FCaZyfrU64DmvofLpBq)) | [3qbVjGH6…h3WeuTWUj](https://explorer.solana.com/tx/3qbVjGH6w16ab8hKUcfow3qGHhUL6vS6SUTKpurd5d6BYmx1Z7qTqJrutBcZdxm8F5W6tpCYc5kx2GBh3WeuTWUj?cluster=devnet) |
