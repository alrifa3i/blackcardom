
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { DynamicThemeProvider } from "@/contexts/DynamicThemeContext";
import Index from "./pages/Index";
import AboutUs from "./pages/AboutUs";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy";
import Support from "./pages/Support";
import Documentation from "./pages/Documentation";
import Updates from "./pages/Updates";
import Vision from "./pages/Vision";
import Partnerships from "./pages/Partnerships";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <DynamicThemeProvider>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/cookie-policy" element={<CookiePolicy />} />
              <Route path="/support" element={<Support />} />
              <Route path="/documentation" element={<Documentation />} />
              <Route path="/updates" element={<Updates />} />
              <Route path="/vision" element={<Vision />} />
              <Route path="/partnerships" element={<Partnerships />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </DynamicThemeProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
