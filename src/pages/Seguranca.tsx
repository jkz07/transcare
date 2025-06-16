
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Eye, EyeOff, AlertTriangle, CheckCircle, Users, MessageSquare } from "lucide-react";

const Seguranca = () => {
  const securityFeatures = [
    {
      icon: Shield,
      title: "Criptografia de Ponta a Ponta",
      description: "Todas suas conversas e dados pessoais são protegidos com criptografia avançada",
      status: "Ativo"
    },
    {
      icon: Lock,
      title: "Autenticação de Dois Fatores",
      description: "Adicione uma camada extra de segurança à sua conta",
      status: "Recomendado"
    },
    {
      icon: Eye,
      title: "Controle de Visibilidade",
      description: "Decida quais informações são visíveis para outros membros",
      status: "Configurável"
    },
    {
      icon: Users,
      title: "Moderação Ativa",
      description: "Nossa equipe monitora a plataforma 24/7 para manter um ambiente seguro",
      status: "Ativo"
    }
  ];

  const privacySettings = [
    {
      title: "Perfil Público",
      description: "Permitir que outros usuários vejam seu perfil",
      enabled: true
    },
    {
      title: "Mostrar Localização",
      description: "Exibir sua cidade nos seus posts",
      enabled: false
    },
    {
      title: "Receber Mensagens Diretas",
      description: "Permitir que outros membros enviem mensagens privadas",
      enabled: true
    },
    {
      title: "Notificações por Email",
      description: "Receber notificações sobre atividades na comunidade",
      enabled: true
    },
    {
      title: "Aparecer em Buscas",
      description: "Permitir que seu perfil apareça nos resultados de busca",
      enabled: false
    }
  ];

  const dataProtection = [
    {
      title: "Coleta de Dados",
      description: "Coletamos apenas dados essenciais para funcionamento da plataforma",
      items: [
        "Informações de perfil (nome, pronouns, bio)",
        "Dados de interação (posts, comentários, curtidas)",
        "Informações técnicas (IP, dispositivo, navegador)",
        "Dados de uso (tempo na plataforma, páginas visitadas)"
      ]
    },
    {
      title: "Uso dos Dados",
      description: "Seus dados são utilizados exclusivamente para:",
      items: [
        "Personalizar sua experiência na plataforma",
        "Conectar você com conteúdo relevante",
        "Melhorar a segurança e funcionalidade",
        "Enviar notificações importantes"
      ]
    },
    {
      title: "Compartilhamento",
      description: "Nunca compartilhamos seus dados com terceiros, exceto:",
      items: [
        "Quando exigido por lei",
        "Para proteger a segurança da comunidade",
        "Com seu consentimento explícito",
        "Com provedores de serviços essenciais (sempre com proteção)"
      ]
    }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Segurança</span> e Privacidade
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Sua segurança é nossa prioridade. Conheça como protegemos seus dados e como você pode controlar sua privacidade
          </p>
        </div>

        {/* Security Overview */}
        <Card className="mb-12 card-trans bg-gradient-to-r from-safe-green/5 to-trans-blue/5">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-6 h-6 text-safe-green" />
              <span>Compromisso com a Segurança</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed mb-6">
              Entendemos que para a comunidade trans, privacidade e segurança não são apenas conveniências - são necessidades fundamentais. 
              Por isso, construímos o TransCare com as mais altas medidas de proteção e controle de privacidade.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {securityFeatures.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-safe-green to-trans-blue rounded-2xl mx-auto mb-4 flex items-center justify-center">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{feature.description}</p>
                  <Badge variant="outline" className="text-xs">
                    {feature.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card className="mb-12 card-trans">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Eye className="w-6 h-6 text-trans-blue" />
              <span>Configurações de Privacidade</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">
              Controle como suas informações são compartilhadas e quem pode ver seu conteúdo
            </p>
            <div className="space-y-6">
              {privacySettings.map((setting, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{setting.title}</h4>
                    <p className="text-sm text-gray-600">{setting.description}</p>
                  </div>
                  <Switch checked={setting.enabled} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Data Protection */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {dataProtection.map((section, index) => (
            <Card key={index} className="card-trans">
              <CardHeader>
                <CardTitle className="text-lg">{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{section.description}</p>
                <ul className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-safe-green mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Safety Guidelines */}
        <Card className="mb-12 card-trans">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-6 h-6 text-trans-pink" />
              <span>Diretrizes da Comunidade</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-safe-green mb-4">Comportamentos Encorajados:</h4>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-safe-green mt-0.5" />
                    <span>Respeitar identidades de gênero e pronomes</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-safe-green mt-0.5" />
                    <span>Oferecer apoio emocional e informativo</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-safe-green mt-0.5" />
                    <span>Compartilhar experiências de forma construtiva</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-safe-green mt-0.5" />
                    <span>Reportar comportamentos inadequados</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-red-600 mb-4">Comportamentos Proibidos:</h4>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                    <span>Discriminação por identidade de gênero</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                    <span>Assédio ou bullying</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                    <span>Compartilhamento de informações pessoais de terceiros</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                    <span>Conteúdo ofensivo ou spam</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Report System */}
        <Card className="mb-12 card-trans bg-gradient-to-r from-red-50 to-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-6 h-6 text-red-600" />
              <span>Sistema de Denúncias</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-6">
              Se você presenciar ou for vítima de comportamento inadequado, temos um sistema rápido e confidencial de denúncias.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-red-100 rounded-xl mx-auto mb-3 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-red-600" />
                </div>
                <h4 className="font-semibold mb-2">Reporte Imediatamente</h4>
                <p className="text-sm text-gray-600">Use o botão de denúncia em qualquer post ou perfil</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-xl mx-auto mb-3 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-orange-600" />
                </div>
                <h4 className="font-semibold mb-2">Análise Rápida</h4>
                <p className="text-sm text-gray-600">Nossa equipe analisa todas as denúncias em até 24h</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-safe-green/20 rounded-xl mx-auto mb-3 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-safe-green" />
                </div>
                <h4 className="font-semibold mb-2">Ação Imediata</h4>
                <p className="text-sm text-gray-600">Medidas apropriadas são tomadas para proteger a comunidade</p>
              </div>
            </div>
            <div className="text-center mt-6">
              <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
                Fazer uma Denúncia
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="card-trans">
          <CardHeader>
            <CardTitle className="text-center">Precisa de Ajuda?</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-6">
              Nossa equipe de segurança está sempre disponível para ajudar com questões de privacidade e segurança
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline">
                privacidade@transcare.com
              </Button>
              <Button className="btn-trans">
                Falar com Suporte
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Seguranca;
