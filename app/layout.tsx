import { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#161925]`}>
        <ClerkProvider
          appearance={{
            layout: {
              logoImageUrl: "/public/icons/yoom-logo.svg",
              socialButtonsVariant: "iconButton",
            },
          }}
        >
          <main>
            {children}
          </main>
        </ClerkProvider>
      </body>
    </html >
  );
}