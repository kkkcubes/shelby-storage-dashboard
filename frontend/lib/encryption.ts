import CryptoJS from "crypto-js";

export const encryptFile =
  async (
    file: File,
    secret: string
  ) => {
    const arrayBuffer =
      await file.arrayBuffer();

    const wordArray =
      CryptoJS.lib.WordArray.create(
        arrayBuffer as any
      );

    const encrypted =
      CryptoJS.AES.encrypt(
        wordArray.toString(),
        secret
      ).toString();

    return encrypted;
  };

export const decryptData = (
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