import { Helmet, HelmetProvider } from "react-helmet-async";
import Seo from "./Seo";

export default function SeoProvider({ children }) {
  return (
    <HelmetProvider>
      <Helmet>
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0066ff" />
      </Helmet>

      <Seo />

      {children}
    </HelmetProvider>
  );
}
