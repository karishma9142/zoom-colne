import { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner"
import '@stream-io/video-react-sdk/dist/css/styles.css';
import 'react-datepicker/dist/react-datepicker.css'
import { Metadata } from "next";
const inter = Inter({ subsets: ["latin"] });

export const metadata : Metadata = {
    title : "YOOM" ,
    description : 'Video calling app',
    icons : {
        icon : '/icons/logo.svg'
    }
}

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#161925]`}>
        <ClerkProvider
          appearance={{
            layout: {
              logoImageUrl: "/public/icons/yoom-logo.svg",
              socialButtonsVariant: "iconButton"
            },
          }}
        >
          <main>
            {children}
          </main>
          <Toaster/>
        </ClerkProvider>
      </body>
    </html >
  );
}