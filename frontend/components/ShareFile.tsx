"use client";

import axios from "axios";

import {
  useWallet,
} from "@aptos-labs/wallet-adapter-react";

import {
  generateWalletKey,
} from "../lib/walletKey";

import {
  encryptShareKey,
} from "../lib/shareEncryption";

export default function ShareFile({
  cid,
}: any) {
  const { account } =
    useWallet();

  const share =
    async () => {
      try {
        const recipient =
          prompt(
            "Recipient Wallet"
          );

        if (!recipient)
          return;

        // =========================
        // GENERATE OWNER KEY
        // =========================
        const walletKey =
          generateWalletKey(
            account?.address?.toString() ||
              ""
          );

        // =========================
        // ENCRYPT SHARE KEY
        // =========================
        const encryptedKey =
          encryptShareKey(
            walletKey,
            recipient
          );

        // =========================
        // SAVE SHARE RECORD
        // =========================
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/share`,
          {
            owner:
              account?.address?.toString(),

            sharedWith:
              recipient,

            cid,

            encryptedKey,
          }
        );

        alert(
          "Shared securely"
        );
      } catch (error) {
        console.error(error);

        alert(
          "Share failed"
        );
      }
    };

  return (
    <button
      onClick={share}
      className="bg-purple-600 hover:bg-purple-700 transition px-3 py-2 rounded-lg text-white"
    >
      Share
    </button>
  );
}