import CryptoJS from "crypto-js";

export const decryptFile =
  (
    encrypted: string,
    secret: string
  ) => {
    const bytes =
      CryptoJS.AES.decrypt(
        encrypted,
        secret
      );

    return bytes.toString(
      CryptoJS.enc.Utf8
    );
};