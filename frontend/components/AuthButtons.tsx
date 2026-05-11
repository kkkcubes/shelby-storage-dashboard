"use client";

import {
  signIn,
  signOut,
  useSession,
} from "next-auth/react";

import {
  useWallet,
} from "@aptos-labs/wallet-adapter-react";

export default function AuthButtons() {
  const { data: session } =
    useSession();

  const { account } =
    useWallet();

  const login = async () => {
    if (!account) {
      alert(
        "Connect wallet first"
      );

      return;
    }

    await signIn(
      "credentials",
      {
        wallet:
          account.address,
        redirect: false,
      }
    );
  };

  if (session) {
    return (
      <div className="flex gap-4 items-center">
        <p>
          Wallet:{" "}
          {String(
            (session.user as any)
              ?.wallet
          ).slice(0, 6)}
          ...
          {String(
            (session.user as any)
              ?.wallet
          ).slice(-4)}
        </p>

        <button
          onClick={() =>
            signOut()
          }
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={login}
      className="bg-black text-white px-4 py-2 rounded"
    >
      Login With Wallet
    </button>
  );
}