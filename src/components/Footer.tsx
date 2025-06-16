
import { Link } from 'react-router-dom';
import { Heart, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white/95 backdrop-blur-md border-t border-trans-blue/20 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-trans-blue to-trans-pink rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="font-bold text-xl gradient-text">TransCare</span>
            </Link>
            <p className="text-gray-600 mb-4 max-w-md">
              Uma plataforma segura e acolhedora para a comunidade trans, oferecendo suporte, 
              informações sobre terapia hormonal e um espaço para conexão.
            </p>
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <span>Feito com</span>
              <Heart className="w-4 h-4 text-trans-pink" />
              <span>para a comunidade trans</span>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-trans-blue transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/terapia" className="text-gray-600 hover:text-trans-blue transition-colors">
                  Terapia Hormonal
                </Link>
              </li>
              <li>
                <Link to="/comunidade" className="text-gray-600 hover:text-trans-blue transition-colors">
                  Comunidade
                </Link>
              </li>
              <li>
                <Link to="/eventos" className="text-gray-600 hover:text-trans-blue transition-colors">
                  Eventos
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-trans-blue" />
                <span className="text-gray-600">contato@transcare.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-trans-blue" />
                <span className="text-gray-600">(11) 9999-9999</span>
              </li>
              <li>
                <Link to="/contato" className="text-trans-blue hover:underline">
                  Formulário de Contato
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Linha de Copyright */}
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 TransCare. Todos os direitos reservados. 
            <span className="mx-2">•</span>
            Plataforma segura e inclusiva para a comunidade trans.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
