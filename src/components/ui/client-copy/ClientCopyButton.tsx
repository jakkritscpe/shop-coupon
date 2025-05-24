"use client";

import { useState } from "react";
import Image from "next/image";

export default function ClientCopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="mt-3 px-4 py-2 bg-gray-100 text-gray-500 rounded hover:bg-gray-200 transition flex items-center space-x-2"
    >
      <Image src="/copy.svg" alt="Save" width={20} height={20} />
      <span>{copied ? "คัดลอกแล้ว!" : "คัดลอกโค้ด"}</span>
    </button>
  );
}
