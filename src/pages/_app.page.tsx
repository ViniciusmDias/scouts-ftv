import { globalStyles } from "@/styles/global";
import { QueryClientProvider } from "@tanstack/react-query";
import { DefaultSeo } from "next-seo";
import { queryClient } from "@/lib/react-query";
import type { AppProps } from "next/app";
import { Header } from "@/components/Header";
import { Analytics } from "@vercel/analytics/react";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <DefaultSeo
        openGraph={{
          type: "website",
          locale: "pt_BR",
          url: "https://www.galactic.com.br",
          siteName: "Scouts Futevolei",
        }}
      />
      <Header />
      <Component {...pageProps} />
      <Analytics />
    </QueryClientProvider>
  );
}
