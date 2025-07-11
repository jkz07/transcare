
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import TerapiaHormonal from "./pages/TerapiaHormonal";
import Agenda from "./pages/Agenda";
import Comunidade from "./pages/Comunidade";
import Eventos from "./pages/Eventos";
import Contato from "./pages/Contato";
import Perfil from "./pages/Perfil";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Credits from "./pages/Credits";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const isCreditsPage = location.pathname === '/credits';

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-trans-blue/5 to-trans-pink/5 flex flex-col">
      {!isCreditsPage && <Navigation />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/terapia" element={<TerapiaHormonal />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/comunidade" element={<Comunidade />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/credits" element={<Credits />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isCreditsPage && <Footer />}
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
