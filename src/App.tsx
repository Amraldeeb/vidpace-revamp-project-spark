import Index from "./pages/Index";
import Schedule from "./pages/Schedule";
import NotFound from "./pages/NotFound";
import { Contact } from "./components/Contact";
import { useEffect } from "react";

const queryClient = new QueryClient();

// Separate component for scroll logic that uses useLocation

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HashRouter>

          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HashRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

