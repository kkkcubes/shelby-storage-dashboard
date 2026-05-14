"use client";

import { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import { useWallet } from "@aptos-labs/wallet-adapter-react";

import {
  buildTransferTransaction,
  mintStorageNFT,
} from "../utils/aptosTransaction";

import {
  encryptFile,
} from "../lib/encryption";

import {
  generateWalletKey,
} from "../lib/walletKey";

const CHUNK_SIZE = 1024 * 1024;

export default function UploadBox() {
  const [files, setFiles] = useState<FileList | null>(null);
  const [status, setStatus] = useState("");
  const [uploadedVideos, setUploadedVideos] = useState<string[]>([]);

  const { account, signAndSubmitTransaction } = useWallet();

  // =========================
  // SAFE FILE UPLOAD FUNCTION (REPLACED)
  // =========================
  const uploadFile = async (file: File) => {
    const fileId = uuidv4();

    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

    for (let i = 0; i < totalChunks; i++) {
      const start = i * CHUNK_SIZE;

      const end = Math.min(file.size, start + CHUNK_SIZE);

      const chunk = file.slice(start, end);

      const formData = new FormData();

      formData.append("chunk", chunk);

      formData.append("fileId", fileId);

      formData.append("chunkIndex", i.toString());

      formData.append("totalChunks", totalChunks.toString());

      formData.append("fileName", file.name);

      // ✅ FIXED LINE
      formData.append(
        "wallet",
        account?.address?.toString() || ""
      );

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/upload/chunk`,
        formData
      );
    }
  };

  // =========================
  // WALLET + UPLOAD FLOW
  // =========================
  const handleUpload = async () => {
    if (!files) return;

    if (!account) {
      alert("Connect wallet first");
      return;
    }

    try {
      setStatus("Waiting for wallet...");

      const transaction = buildTransferTransaction(account.address, 1);

      await signAndSubmitTransaction(transaction);

      setStatus("Transaction confirmed. Uploading...");

      const urls: string[] = [];

      for (const file of Array.from(files)) {
        await uploadFile(file);

        urls.push("uploaded");
      }

      setUploadedVideos(urls);

      setStatus("Files uploaded successfully");
    } catch (error) {
      console.error(error);
      setStatus("Upload failed");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Upload Files</h2>
        <p className="text-slate-400 mt-1">
          Wallet-gated encrypted chunk upload system
        </p>
      </div>

      <div className="border-2 border-dashed border-slate-700 rounded-2xl p-10 text-center">
        <input
          type="file"
          multiple
          onChange={(e) => setFiles(e.target.files)}
          className="block w-full"
        />
      </div>

      <button
        onClick={handleUpload}
        className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-xl font-medium"
      >
        Upload Files
      </button>

      <p className="text-slate-300">{status}</p>

      <div className="space-y-4">
        {uploadedVideos.map((video, index) => (
          <video key={index} controls className="rounded-xl w-full">
            <source src={video} type="video/mp4" />
          </video>
        ))}
      </div>
    </div>
  );
}