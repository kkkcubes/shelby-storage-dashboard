import { InputTransactionData } from "@aptos-labs/wallet-adapter-react";

/**
 * Build a safe Aptos transfer transaction
 * Wallet-compatible + TypeScript-safe
 */
export function buildTransferTransaction(
  to: any, // wallet provides AccountAddress type
  amount: number
): InputTransactionData {
  return {
    data: {
      function: "0x1::aptos_account::transfer",
      typeArguments: [],
      functionArguments: [
        to, // ✅ DO NOT convert to string
        amount,
      ],
    },
  };
}

/**
 * Mint Storage NFT using CID
 */
export const mintStorageNFT = async (
  signAndSubmitTransaction: any,
  cid: string
) => {
  const payload: InputTransactionData = {
    data: {
      function: "0x1::storage::mint",
      typeArguments: [],
      functionArguments: [cid],
    },
  };

  return await signAndSubmitTransaction(
    payload
  );
};