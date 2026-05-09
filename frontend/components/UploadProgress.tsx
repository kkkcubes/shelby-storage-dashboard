"use client";

import { useEffect, useState } from "react";

import { socket } from "../lib/socket";

export default function UploadProgress() {
  const [progress, setProgress] =
    useState(0);

  useEffect(() => {
    socket.on(
      "uploadProgress",
      (value: number) => {
        setProgress(value);
      }
    );

    return () => {
      socket.off("uploadProgress");
    };
  }, []);

  return (
    <div>
      <div className="flex justify-between mb-2">
        <span>Progress</span>

        <span>
          {Math.round(progress)}%
        </span>
      </div>

      <div className="w-full h-5 bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 transition-all duration-300"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
    </div>
  );
}