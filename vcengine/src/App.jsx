import AppRoutes from "./routes/AppRoutes";
import SeoProvider from "./seo/SeoProvider.jsx";

function App() {
  return (
    <SeoProvider>
      <AppRoutes />
    </SeoProvider>
  );
}

export default App;
