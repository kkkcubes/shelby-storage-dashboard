"use client";

import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import WalletProvider from "../components/WalletProvider";

function ClientOnly({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <>{children}</>;
}

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <ClientOnly>
        <WalletProvider>{children}</WalletProvider>
      </ClientOnly>
    </SessionProvider>
  );
}