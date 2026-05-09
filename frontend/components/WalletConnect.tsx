"use client";

import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";

export default function WalletConnect() {
  return (
    <div className="p-4">
      <WalletSelector />
    </div>
  );
}