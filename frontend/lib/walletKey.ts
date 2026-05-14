import CryptoJS from "crypto-js";

export const generateWalletKey =
  (wallet: string) => {
    return CryptoJS.SHA256(
      wallet
    ).toString();
  };