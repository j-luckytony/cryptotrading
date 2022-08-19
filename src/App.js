// External Dependencies
import { useState } from "react";
import { QueryClientProvider, QueryClient } from "react-query";

// Internal Dependencies
import MainPage from "./pages/MainPage";
import TradingPage from "./pages/TradingPage";
import Tabs from "./components/Tabs";

const queryClient = new QueryClient();

function App() {
  const [page, setPage] = useState(0);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative min-h-screen overflow-hidden bg-[#0D0415] space-y-10 pb-16">
        <Tabs page={page} setPage={setPage} />
        {page === 0 ? <MainPage /> : <TradingPage />}
      </div>
    </QueryClientProvider>
  );
}

export default App;
