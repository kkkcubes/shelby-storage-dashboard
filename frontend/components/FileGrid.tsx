"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

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

  useEffect(() => {
    const fetchFiles = async () => {
      if (!account?.address) return;

      try {
        setLoading(true);

        const res = await axios.get(
          `https://shelby-storage-dashboard-1.onrender.com/files/${account.address}`
        );

        // ✅ FIXED
        setFiles(res.data.files || []);
      } catch (err) {
        console.error("Error fetching files:", err);
        setFiles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [account]);

  if (!account) {
    return (
      <div className="text-center text-slate-400 mt-10">
        Connect wallet to view files
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center text-slate-400 mt-10">
        Loading files...
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {files.length === 0 ? (
        <div className="text-slate-400">
          No files found
        </div>
      ) : (
        files.map((file, index) => (
          <div
            key={file._id || index}
            className="bg-slate-900 p-4 rounded-2xl border border-slate-800"
          >
            <video
              controls
              className="rounded-xl w-full"
            >
              <source
                src={file.url}
                type="video/mp4"
              />
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
                  {new Date(
                    file.uploadedAt
                  ).toLocaleString()}
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
        ))
      )}
    </div>
  );
}