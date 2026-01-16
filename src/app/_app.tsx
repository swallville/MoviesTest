import { EffectorNext } from "@effector/next";
import Layout from "./layout";
import { AppProps } from "next/dist/shared/lib/router/router";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main>
      <EffectorNext values={pageProps.values}>
        <Layout>
          <Component />
        </Layout>
      </EffectorNext>
    </main>
  );
}