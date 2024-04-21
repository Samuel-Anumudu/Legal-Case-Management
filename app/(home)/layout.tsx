import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import type { ReactNode } from "react";
import { StoreProvider } from "@/app/StoreProvider";

import { Nav } from "../components/Nav";

import "../styles/globals.css";
// import styles from "./styles/layout.module.css";

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <html lang="en">
        <body>
          <AppRouterCacheProvider options={{ key: "css" }}>
            <section className="container mx-auto max-w-[1110px]">
              <Nav />
              <header>HEADER</header>
              <main>{children}</main>
              <footer>FOOTER</footer>
            </section>
          </AppRouterCacheProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
