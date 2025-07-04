
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Shield, Users, Calendar, ArrowRight, Play } from "lucide-react";

const Home = () => {
  const features = [
    {
      icon: Heart,
      title: "Cuidado Personalizado",
      description: "Acompanhamento individualizado na sua jornada de terapia hormonal",
      color: "from-trans-pink to-pink-400"
    },
    {
      icon: Shield,
      title: "Ambiente Seguro",
      description: "Espaço protegido e acolhedor para toda a comunidade trans",
      color: "from-trans-blue to-blue-400"
    },
    {
      icon: Users,
      title: "Comunidade Ativa",
      description: "Conecte-se com pessoas que compartilham experiências similares",
      color: "from-pride-purple to-purple-400"
    },
    {
      icon: Calendar,
      title: "Agenda Inteligente",
      description: "Organize suas consultas, medicamentos e marcos importantes",
      color: "from-safe-green to-green-400"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Sua jornada,{" "}
              <span className="gradient-text">nossa comunidade</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Um espaço seguro e acolhedor para pessoas trans navegarem sua jornada de terapia hormonal com apoio, informação e comunidade.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/perfil">
                <Button size="lg" className="btn-trans text-lg px-8 py-4">
                  Começar Jornada
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/comunidade">
                <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-trans-blue text-trans-blue hover:bg-trans-blue hover:text-white">
                  Explorar Comunidade
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Por que escolher o TransCare?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Oferecemos um ecossistema completo de apoio para sua jornada de afirmação de gênero
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card-trans group hover:scale-105 transition-all duration-300 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Conheça o TransCare</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Assista ao vídeo para entender melhor como nossa plataforma pode apoiar sua jornada
            </p>
          </div>
          
          <div className="relative">
            <Card className="card-trans overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-video bg-gradient-to-br from-trans-blue/10 to-trans-pink/10 flex items-center justify-center">
                  {/* Placeholder para o vídeo */}
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-trans-blue to-trans-pink flex items-center justify-center">
                      <Play className="w-8 h-8 text-white ml-1" />
                    </div>
                    <p className="text-gray-600 text-lg">
                      Área reservada para seu vídeo
                    </p>
                    <p className="text-gray-500 text-sm mt-2">
                      Substitua este espaço pelo seu conteúdo de vídeo
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-trans-blue/10 to-trans-pink/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Pronto para começar?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Junte-se a milhares de pessoas que já encontraram apoio e informação no TransCare
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/perfil">
              <Button size="lg" className="btn-trans text-lg px-8 py-4">
                Criar Conta Gratuita
              </Button>
            </Link>
            <Link to="/terapia">
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-trans-blue text-trans-blue hover:bg-trans-blue hover:text-white">
                Saiba Mais
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="animate-slide-up">
              <div className="text-4xl font-bold gradient-text mb-2">15k+</div>
              <div className="text-gray-600">Pessoas na comunidade</div>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="text-4xl font-bold gradient-text mb-2">500+</div>
              <div className="text-gray-600">Eventos realizados</div>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl font-bold gradient-text mb-2">98%</div>
              <div className="text-gray-600">Satisfação dos usuários</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
