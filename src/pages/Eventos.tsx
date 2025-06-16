
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, Users, Search, Filter, Plus, ExternalLink } from "lucide-react";

const Eventos = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  const mockEvents = [
    {
      id: 1,
      title: "Roda de Conversa: Primeiros Passos na TH",
      type: "presencial",
      date: "2025-06-22",
      time: "15:00",
      location: "Centro Comunitário - São Paulo, SP",
      organizer: "Coletivo TransSP",
      attendees: 23,
      maxAttendees: 30,
      description: "Uma roda de conversa acolhedora para pessoas que estão começando ou considerando iniciar terapia hormonal. Vamos compartilhar experiências e tirar dúvidas em um ambiente seguro.",
      category: "Workshop",
      price: "Gratuito"
    },
    {
      id: 2,
      title: "Live: Cuidados com a Saúde Mental",
      type: "online",
      date: "2025-06-25",
      time: "19:00",
      location: "YouTube - Canal TransCare",
      organizer: "Dra. Maria Santos",
      attendees: 145,
      maxAttendees: 500,
      description: "Live com psicóloga especialista em questões trans para discutir estratégias de cuidado com a saúde mental durante a transição.",
      category: "Palestra",
      price: "Gratuito"
    },
    {
      id: 3,
      title: "Encontro Regional - Rio de Janeiro",
      type: "presencial",
      date: "2025-06-28",
      time: "14:00",
      location: "Espaço Cultural - Rio de Janeiro, RJ",
      organizer: "TransRio Coletivo",
      attendees: 78,
      maxAttendees: 100,
      description: "Encontro mensal da comunidade trans do Rio de Janeiro com atividades, palestras e muito networking.",
      category: "Encontro",
      price: "R$ 10,00"
    },
    {
      id: 4,
      title: "Workshop: Autocuidado e Bem-estar",
      type: "híbrido",
      date: "2025-07-05",
      time: "10:00",
      location: "Centro de Bem-estar - Belo Horizonte, MG",
      organizer: "Instituto TransVida",
      attendees: 34,
      maxAttendees: 50,
      description: "Workshop prático sobre técnicas de autocuidado, mindfulness e bem-estar para pessoas trans.",
      category: "Workshop",
      price: "R$ 25,00"
    }
  ];

  const pastEvents = [
    {
      id: 5,
      title: "Parada do Orgulho Trans 2025",
      date: "2025-01-29",
      location: "Avenida Paulista - São Paulo, SP",
      attendees: 5000,
      category: "Manifestação"
    },
    {
      id: 6,
      title: "Simpósio de Saúde Trans",
      date: "2025-03-15",
      location: "Universidade Federal - Brasília, DF",
      attendees: 200,
      category: "Acadêmico"
    }
  ];

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'presencial':
        return 'bg-trans-blue text-white';
      case 'online':
        return 'bg-safe-green text-white';
      case 'híbrido':
        return 'bg-trans-pink text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Workshop':
        return 'border-trans-blue text-trans-blue';
      case 'Palestra':
        return 'border-trans-pink text-trans-pink';
      case 'Encontro':
        return 'border-pride-purple text-pride-purple';
      default:
        return 'border-gray-400 text-gray-600';
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Eventos</span> da Comunidade
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Participe de encontros, workshops e lives para se conectar com a comunidade e aprender mais sobre sua jornada
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input placeholder="Buscar eventos..." className="pl-10" />
            </div>
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Filtros</span>
            </Button>
          </div>
          <Button className="btn-trans">
            <Plus className="w-4 h-4 mr-2" />
            Criar Evento
          </Button>
        </div>

        {/* Event Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming">Próximos Eventos</TabsTrigger>
            <TabsTrigger value="past">Eventos Passados</TabsTrigger>
          </TabsList>

          {/* Upcoming Events */}
          <TabsContent value="upcoming" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockEvents.map((event) => (
                <Card key={event.id} className="card-trans">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Badge className={getEventTypeColor(event.type)}>
                          {event.type}
                        </Badge>
                        <Badge variant="outline" className={getCategoryColor(event.category)}>
                          {event.category}
                        </Badge>
                      </div>
                      <span className="text-sm font-semibold text-safe-green">{event.price}</span>
                    </div>
                    <CardTitle className="text-xl mb-2">{event.title}</CardTitle>
                    <p className="text-sm text-gray-600">Por {event.organizer}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700">{event.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4 text-trans-blue" />
                        <span>{new Date(event.date).toLocaleDateString('pt-BR', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4 text-trans-blue" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-trans-blue" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Users className="w-4 h-4 text-trans-blue" />
                        <span>{event.attendees}/{event.maxAttendees} participantes</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-trans-blue to-trans-pink h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                      ></div>
                    </div>

                    <div className="flex gap-2">
                      <Button className="btn-trans flex-1">
                        Participar
                      </Button>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Past Events */}
          <TabsContent value="past" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastEvents.map((event) => (
                <Card key={event.id} className="card-trans opacity-75">
                  <CardContent className="p-6">
                    <Badge variant="outline" className="mb-3">{event.category}</Badge>
                    <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(event.date).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4" />
                        <span>{event.attendees} participantes</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <Card className="mt-12 card-trans bg-gradient-to-r from-trans-blue/10 to-trans-pink/10">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Quer organizar um evento?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Ajude a fortalecer nossa comunidade organizando workshops, rodas de conversa ou encontros. 
              Oferecemos suporte completo para organizar eventos seguros e acolhedores.
            </p>
            <Button className="btn-trans">
              <Plus className="w-4 h-4 mr-2" />
              Criar Meu Evento
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Eventos;
