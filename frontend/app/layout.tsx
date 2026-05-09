import "./globals.css";

import "antd/dist/reset.css";

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
        <WalletProvider>
          {children}
        </WalletProvider>
      </body>
    </html>
  );
}