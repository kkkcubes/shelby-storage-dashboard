import { InputTransactionData } from "@aptos-labs/wallet-adapter-react";

/**
 * Build a safe Aptos transaction payload
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