import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Shield, Users, Calendar, ArrowRight, Play, ExternalLink, Maximize2 } from "lucide-react";
import { useState } from "react";

const Home = () => {
  const [showEmbeddedVideo, setShowEmbeddedVideo] = useState(false);

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

  const handleVideoClick = () => {
    setShowEmbeddedVideo(true);
  };

  const handleExternalVideoClick = () => {
    window.open('https://drive.google.com/file/d/1pp42nWTHn54REgEnvZ-4YI9pm-zZ2FEE/view?usp=sharing', '_blank');
  };

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
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4">Experiência Profissional</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
              Conheça o depoimento do Dr. Ailton Santos, gestor do ambulatório estadual de pessoas trans, que compartilha sua experiência prática com o TransCare e como nossa plataforma tem apoiado pacientes em sua jornada de terapia hormonal.
            </p>
          </div>
          
          <div className="relative">
            <Card className="card-trans overflow-hidden">
              <CardContent className="p-0">
                {!showEmbeddedVideo ? (
                  <div 
                    className="relative aspect-video bg-gradient-to-br from-trans-blue/20 to-trans-pink/20 overflow-hidden cursor-pointer group"
                    onClick={handleVideoClick}
                  >
                    {/* Custom Video Cover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-trans-blue/10 to-trans-pink/10">
                      <img 
                        src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                        alt="Dr. Ailton Santos no ambulatório"
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-90 transition-opacity duration-300"
                      />
                    </div>
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-all duration-300">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-r from-trans-blue to-trans-pink flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-8 h-8 text-white ml-1" fill="white" />
                      </div>
                    </div>
                    
                    {/* Video Title Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-white text-xl font-semibold mb-2">
                            Depoimento: Dr. Ailton Santos
                          </h3>
                          <p className="text-white/80 text-sm">
                            Gestor do Ambulatório Estadual de Pessoas Trans
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleExternalVideoClick();
                            }}
                            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                          >
                            <Maximize2 className="w-4 h-4 text-white/80" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative aspect-video">
                    <iframe
                      src="https://drive.google.com/file/d/1pp42nWTHn54REgEnvZ-4YI9pm-zZ2FEE/preview"
                      className="w-full h-full"
                      allow="autoplay"
                      title="Depoimento Dr. Ailton Santos - TransCare"
                    />
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button
                        onClick={() => setShowEmbeddedVideo(false)}
                        className="px-3 py-1 bg-black/60 text-white text-sm rounded hover:bg-black/80 transition-colors"
                      >
                        Fechar
                      </button>
                      <button
                        onClick={handleExternalVideoClick}
                        className="p-2 bg-black/60 text-white rounded hover:bg-black/80 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
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
