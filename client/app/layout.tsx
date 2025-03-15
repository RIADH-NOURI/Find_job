

"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/redux/stores/store";
import AuthProvider from "@/poviders/authProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="manifest" href="/manifest.json" />
      <body className={`bg-gray-100 w-full h-full${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Provider store={store}>  
          <AuthProvider>
            {children}
          </AuthProvider>  
        </Provider>
      </body>
    </html>
  );
}
