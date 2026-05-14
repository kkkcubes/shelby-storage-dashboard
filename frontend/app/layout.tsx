import "./globals.css";

import Providers from "./providers";

import WalletProvider from "../components/WalletProvider";

export const metadata = {
  title: "Shelby Storage",
  description: "Decentralized Storage Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <WalletProvider>
            {children}
          </WalletProvider>
        </Providers>
      </body>
    </html>
  );
}