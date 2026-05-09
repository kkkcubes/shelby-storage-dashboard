"use client";

import axios from "axios";
import { useState } from "react";

export default function ShareFile() {
  const [cid, setCid] = useState("");

  const [wallet, setWallet] = useState("");

  const share = async () => {
    await axios.post(
      "http://localhost:5000/share",
      {
        cid,
        wallet,
      }
    );
  };

  return (
    <div className="space-y-4">
      <input
        placeholder="CID"
        onChange={(e) =>
          setCid(e.target.value)
        }
      />

      <input
        placeholder="Wallet Address"
        onChange={(e) =>
          setWallet(e.target.value)
        }
      />

      <button onClick={share}>
        Share File
      </button>
    </div>
  );
}