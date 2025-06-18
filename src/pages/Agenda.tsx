
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Plus, MapPin, User, Pill, Stethoscope, CalendarDays } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface AgendaEvent {
  id: string;
  title: string;
  type: string;
  date: string;
  time: string;
  description?: string;
  user_id: string;
}

const Agenda = () => {
  const { isAuthenticated, user } = useAuth();
  const [events, setEvents] = useState<AgendaEvent[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    type: '',
    date: '',
    time: '',
    description: ''
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from('agenda_events')
      .select('*')
      .order('date', { ascending: true })
      .order('time', { ascending: true });

    if (data && !error) {
      setEvents(data);
    }
  };

  const handleCreateEvent = async () => {
    if (!newEvent.title || !newEvent.type || !newEvent.date || !newEvent.time || !user) {
      return;
    }

    const { error } = await supabase
      .from('agenda_events')
      .insert([{
        title: newEvent.title,
        type: newEvent.type,
        date: newEvent.date,
        time: newEvent.time,
        description: newEvent.description,
        user_id: user.id
      }]);

    if (!error) {
      setNewEvent({ title: '', type: '', date: '', time: '', description: '' });
      setIsDialogOpen(false);
      fetchEvents();
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'consulta': return Stethoscope;
      case 'medicamento': return Pill;
      case 'exame': return CalendarDays;
      case 'terapia': return User;
      default: return Calendar;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'consulta': return 'border-l-trans-blue bg-trans-blue/5';
      case 'medicamento': return 'border-l-safe-green bg-safe-green/5';
      case 'exame': return 'border-l-warm-orange bg-warm-orange/5';
      case 'terapia': return 'border-l-trans-pink bg-trans-pink/5';
      default: return 'border-l-gray-400 bg-gray-50';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'consulta': return 'Consulta';
      case 'medicamento': return 'Medicamento';
      case 'exame': return 'Exame';
      case 'terapia': return 'Terapia';
      default: return type;
    }
  };

  const groupEventsByDate = (events: AgendaEvent[]) => {
    const grouped: { [key: string]: AgendaEvent[] } = {};
    events.forEach(event => {
      const date = event.date;
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(event);
    });
    return grouped;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const groupedEvents = groupEventsByDate(events);

  return (
    <div className="min-h-screen bg-gradient-to-br from-trans-blue/10 via-white to-trans-pink/10 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 gradient-text">
            Agenda da Comunidade
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Acompanhe eventos importantes da comunidade e organize sua jornada
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-trans-blue/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Stethoscope className="w-6 h-6 text-trans-blue" />
              </div>
              <p className="text-2xl font-bold text-trans-blue">
                {events.filter(e => e.type === 'consulta').length}
              </p>
              <p className="text-sm text-gray-600">Consultas</p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-safe-green/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Pill className="w-6 h-6 text-safe-green" />
              </div>
              <p className="text-2xl font-bold text-safe-green">
                {events.filter(e => e.type === 'medicamento').length}
              </p>
              <p className="text-sm text-gray-600">Medicamentos</p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-warm-orange/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <CalendarDays className="w-6 h-6 text-warm-orange" />
              </div>
              <p className="text-2xl font-bold text-warm-orange">
                {events.filter(e => e.type === 'exame').length}
              </p>
              <p className="text-sm text-gray-600">Exames</p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-trans-pink/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <User className="w-6 h-6 text-trans-pink" />
              </div>
              <p className="text-2xl font-bold text-trans-pink">
                {events.filter(e => e.type === 'terapia').length}
              </p>
              <p className="text-sm text-gray-600">Terapias</p>
            </CardContent>
          </Card>
        </div>

        {/* Add Event Button */}
        <div className="flex justify-center mb-8">
          {isAuthenticated ? (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-gradient-to-r from-trans-blue to-trans-pink text-white hover:shadow-lg transition-all">
                  <Plus className="w-5 h-5 mr-2" />
                  Criar Novo Evento
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold gradient-text">Criar Novo Evento</DialogTitle>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título do Evento</Label>
                    <Input 
                      id="title" 
                      placeholder="Ex: Consulta com Dr. Silva"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="type">Tipo de Evento</Label>
                    <Select value={newEvent.type} onValueChange={(value) => setNewEvent(prev => ({ ...prev, type: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="consulta">🩺 Consulta Médica</SelectItem>
                        <SelectItem value="medicamento">💊 Medicamento</SelectItem>
                        <SelectItem value="exame">🔬 Exame</SelectItem>
                        <SelectItem value="terapia">👤 Terapia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Data</Label>
                      <Input 
                        id="date" 
                        type="date" 
                        value={newEvent.date}
                        onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="time">Horário</Label>
                      <Input 
                        id="time" 
                        type="time" 
                        value={newEvent.time}
                        onChange={(e) => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição (opcional)</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Adicione detalhes sobre o evento..."
                      value={newEvent.description}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button 
                    className="bg-gradient-to-r from-trans-blue to-trans-pink text-white"
                    onClick={handleCreateEvent}
                  >
                    Criar Evento
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          ) : (
            <div className="text-center">
              <p className="text-gray-600 mb-4">Faça login para criar eventos</p>
              <Button variant="outline" onClick={() => window.location.href = '/login'}>
                Entrar
              </Button>
            </div>
          )}
        </div>

        {/* Events Timeline */}
        <div className="space-y-8">
          {Object.keys(groupedEvents).length > 0 ? Object.entries(groupedEvents).map(([date, dayEvents]) => (
            <div key={date} className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-gradient-to-r from-trans-blue to-trans-pink rounded-full"></div>
                <h3 className="text-xl font-semibold text-gray-800 capitalize">
                  {formatDate(date)}
                </h3>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {dayEvents.map((event) => {
                  const EventIcon = getEventIcon(event.type);
                  return (
                    <Card key={event.id} className={`${getEventColor(event.type)} border-l-4 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300`}>
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                            <EventIcon className="w-5 h-5 text-gray-600" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-gray-900 truncate">{event.title}</h4>
                              <Badge variant="secondary" className="capitalize text-xs">
                                {getTypeLabel(event.type)}
                              </Badge>
                            </div>
                            
                            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                              <Clock className="w-4 h-4" />
                              <span>{event.time}</span>
                            </div>
                            
                            {event.description && (
                              <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                                {event.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )) : (
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <Calendar className="w-16 h-16 mx-auto text-gray-400 mb-6" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Nenhum evento cadastrado
                </h3>
                <p className="text-gray-500 mb-6">
                  {isAuthenticated 
                    ? "Comece criando seu primeiro evento na agenda" 
                    : "Faça login para ver e criar eventos"}
                </p>
                {isAuthenticated && (
                  <Button 
                    onClick={() => setIsDialogOpen(true)}
                    className="bg-gradient-to-r from-trans-blue to-trans-pink text-white"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Criar Primeiro Evento
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Agenda;
