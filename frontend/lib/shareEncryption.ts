import CryptoJS from "crypto-js";

export const encryptShareKey =
  (
    key: string,
    recipient: string
  ) => {
    return CryptoJS.AES.encrypt(
      key,
      recipient
    ).toString();
  };