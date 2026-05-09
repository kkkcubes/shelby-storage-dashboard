"use client";

import UploadBox from "../../components/UploadBox";
import UploadProgress from "../../components/UploadProgress";

import {
  WalletSelector,
} from "@aptos-labs/wallet-adapter-ant-design";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
      {/* NAVBAR */}
      <div className="border-b border-slate-800 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Shelby Storage
            </h1>

            <p className="text-slate-400 text-sm">
              Decentralized File Dashboard
            </p>
          </div>

          <WalletSelector />
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-8 py-10">
        {/* HERO */}
        <div className="mb-10">
          <h2 className="text-5xl font-bold leading-tight">
            Secure Decentralized
            <br />
            File Storage
          </h2>

          <p className="text-slate-400 mt-4 text-lg max-w-2xl">
            Upload, manage, and track files
            using Shelby decentralized
            infrastructure.
          </p>
        </div>

        {/* GRID */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* UPLOAD CARD */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-8 shadow-2xl">
            <UploadBox />
          </div>

          {/* PROGRESS CARD */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-8 shadow-2xl">
            <h3 className="text-2xl font-semibold mb-6">
              Upload Progress
            </h3>

            <UploadProgress />
          </div>
        </div>
      </div>
    </main>
  );
}