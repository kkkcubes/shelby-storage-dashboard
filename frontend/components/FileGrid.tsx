"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import SearchBar from "./SearchBar";

interface FileItem {
  _id?: string;
  fileName: string;
  url: string;
  cid: string;
  uploadedAt?: string;
}

export default function FileGrid() {
  const { account } = useWallet();

  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchFiles = async () => {
      if (!account?.address) return;

      try {
        setLoading(true);

        // ✅ ENV BASE URL
        const baseURL = process.env.NEXT_PUBLIC_API_URL;

        const url = query
          ? `${baseURL}/files/search/${account.address}?q=${query}`
          : `${baseURL}/files/${account.address}`;

        const res = await axios.get(url);

        setFiles(res.data.files || []);
      } catch (err) {
        console.error("Error fetching files:", err);
        setFiles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [account, query]);

  if (!account) {
    return (
      <div className="text-center text-slate-400 mt-10">
        Connect wallet to view files
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <SearchBar value={query} onChange={setQuery} />

      {/* Loading */}
      {loading && (
        <div className="text-center text-slate-400">
          Loading files...
        </div>
      )}

      {/* Empty state */}
      {!loading && files.length === 0 && (
        <div className="text-center text-slate-400">
          No files found
        </div>
      )}

      {/* Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {files.map((file, index) => (
          <div
            key={file._id || index}
            className="bg-slate-900 p-4 rounded-2xl border border-slate-800"
          >
            <video controls className="rounded-xl w-full">
              <source src={file.url} type="video/mp4" />
            </video>

            <div className="mt-3 space-y-1">
              <div className="font-bold text-white break-all">
                {file.fileName}
              </div>

              <div className="text-sm text-slate-400 break-all">
                CID: {file.cid}
              </div>

              {file.uploadedAt && (
                <div className="text-xs text-slate-500">
                  Uploaded:{" "}
                  {new Date(file.uploadedAt).toLocaleString()}
                </div>
              )}

              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-blue-400 hover:underline"
              >
                Open File
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}