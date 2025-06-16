
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import TerapiaHormonal from "./pages/TerapiaHormonal";
import Agenda from "./pages/Agenda";
import Comunidade from "./pages/Comunidade";
import Eventos from "./pages/Eventos";
import Seguranca from "./pages/Seguranca";
import Contato from "./pages/Contato";
import Perfil from "./pages/Perfil";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-gradient-to-br from-white via-trans-blue/5 to-trans-pink/5">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/terapia" element={<TerapiaHormonal />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/comunidade" element={<Comunidade />} />
            <Route path="/eventos" element={<Eventos />} />
            <Route path="/seguranca" element={<Seguranca />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
