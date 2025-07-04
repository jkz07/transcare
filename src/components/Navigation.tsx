
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Menu, Home, Calendar, Users, User, Dna, MessageSquare, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const navItems = [
    { name: "Início", path: "/", icon: Home },
    { name: "Terapia Hormonal", path: "/terapia", icon: Dna },
    { name: "Agenda", path: "/agenda", icon: Calendar },
    { name: "Comunidade", path: "/comunidade", icon: Users },
    { name: "Eventos", path: "/eventos", icon: Calendar },
    { name: "Contato", path: "/contato", icon: MessageSquare },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-trans-blue/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/dadd6ee8-b30d-4380-bdc3-109b915c565a.png" 
              alt="TransCare Logo" 
              className="w-10 h-10 object-contain"
            />
            <span className="font-bold text-xl gradient-text">TransCare</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? "bg-trans-blue/10 text-trans-blue"
                    : "text-gray-600 hover:text-trans-blue hover:bg-trans-blue/5"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Profile/Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/perfil">
                  <Button
                    variant={isActive("/perfil") ? "default" : "outline"}
                    size="sm"
                    className="bg-gradient-to-r from-trans-blue to-trans-pink border-0"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Perfil
                  </Button>
                </Link>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sair
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Sair da conta</AlertDialogTitle>
                      <AlertDialogDescription>
                        Tem certeza que deseja sair da sua conta?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={handleLogout} className="bg-red-600 hover:bg-red-700">
                        Sair
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            ) : (
              <Link to="/login">
                <Button size="sm" className="bg-gradient-to-r from-trans-blue to-trans-pink border-0">
                  <User className="w-4 h-4 mr-2" />
                  Entrar
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="sm">
                <Menu className="w-4 h-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-4 mt-6">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive(item.path)
                        ? "bg-trans-blue/10 text-trans-blue"
                        : "text-gray-600 hover:text-trans-blue hover:bg-trans-blue/5"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                ))}
                
                <div className="border-t pt-4">
                  {isAuthenticated ? (
                    <>
                      <Link
                        to="/perfil"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-gray-600 hover:text-trans-blue hover:bg-trans-blue/5"
                      >
                        <User className="w-5 h-5" />
                        <span className="font-medium">Perfil</span>
                      </Link>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-gray-600 hover:text-trans-blue hover:bg-trans-blue/5 w-full text-left">
                            <LogOut className="w-5 h-5" />
                            <span className="font-medium">Sair</span>
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Sair da conta</AlertDialogTitle>
                            <AlertDialogDescription>
                              Tem certeza que deseja sair da sua conta?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={handleLogout} className="bg-red-600 hover:bg-red-700">
                              Sair
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-gray-600 hover:text-trans-blue hover:bg-trans-blue/5"
                    >
                      <User className="w-5 h-5" />
                      <span className="font-medium">Entrar</span>
                    </Link>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
