"use client";

import { useEffect } from "react";
import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Provider } from "react-redux";
import "@/app/globals.css";
import { store } from "@/reduce/store";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    document.title = "@TienChinhJr";
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <AntdRegistry>{children}</AntdRegistry>
        </Provider>
      </body>
    </html>
  );
}
