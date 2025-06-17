
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, FileText, Globe, ExternalLink } from "lucide-react";

const Credits = () => {
  const links = [
    {
      title: "GitHub",
      description: "Acesse o código fonte do projeto",
      icon: Github,
      url: "https://github.com",
      color: "bg-gray-900 hover:bg-gray-800 text-white",
      iconColor: "text-white"
    },
    {
      title: "Documentação",
      description: "Consulte a documentação completa",
      icon: FileText,
      url: "https://docs.example.com",
      color: "bg-blue-600 hover:bg-blue-700 text-white",
      iconColor: "text-white"
    },
    {
      title: "Site Oficial",
      description: "Visite nosso site principal",
      icon: Globe,
      url: "https://example.com",
      color: "bg-green-600 hover:bg-green-700 text-white",
      iconColor: "text-white"
    }
  ];

  const handleCardClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">Créditos & Links</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore os recursos e links importantes relacionados ao projeto TransCare
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {links.map((link, index) => {
            const IconComponent = link.icon;
            return (
              <Card 
                key={index}
                className="card-trans cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                onClick={() => handleCardClick(link.url)}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${link.color}`}>
                    <IconComponent className={`w-8 h-8 ${link.iconColor}`} />
                  </div>
                  <CardTitle className="text-xl font-bold">
                    {link.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 mb-6">
                    {link.description}
                  </p>
                  <Button 
                    className={`w-full ${link.color} transition-colors`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(link.url);
                    }}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Acessar
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Info */}
        <Card className="card-trans bg-gradient-to-r from-trans-blue/5 to-trans-pink/5">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              Sobre o TransCare
            </h2>
            <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
              O TransCare é uma plataforma desenvolvida para apoiar pessoas trans em sua jornada, 
              oferecendo recursos para organização de agenda médica, informações sobre terapia hormonal, 
              e uma comunidade acolhedora para compartilhamento de experiências.
            </p>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Desenvolvido com ❤️ para a comunidade trans
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Credits;
