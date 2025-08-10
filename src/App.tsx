import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Schedule from "./pages/Schedule";
import PricingPage from "./pages/Pricing";
import ROICalculatorPage from "./pages/ROICalculator";
import NotFound from "./pages/NotFound";
import { Contact } from "./components/Contact";


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
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/roi-calculator" element={<ROICalculatorPage />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HashRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;