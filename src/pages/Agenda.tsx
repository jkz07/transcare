
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, Clock, Plus, Bell, User, Pill, Stethoscope } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ptBR } from "date-fns/locale";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface AgendaEvent {
  id: string;
  title: string;
  type: string;
  date: string;
  time: string;
  description?: string;
}

const Agenda = () => {
  const { isAuthenticated, user } = useAuth();
  const [view, setView] = useState<'day' | 'week' | 'month'>('week');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
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
      .order('date', { ascending: true });

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

  // Dias com eventos para marcar no calendário
  const daysWithEvents = events.map(event => new Date(event.date));

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'consulta':
        return Stethoscope;
      case 'medicamento':
        return Pill;
      case 'exame':
        return CalendarIcon;
      case 'terapia':
        return User;
      default:
        return CalendarIcon;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'consulta':
        return 'bg-trans-blue/10 text-trans-blue border-trans-blue';
      case 'medicamento':
        return 'bg-safe-green/10 text-safe-green border-safe-green';
      case 'exame':
        return 'bg-warm-orange/10 text-warm-orange border-warm-orange';
      case 'terapia':
        return 'bg-trans-pink/10 text-trans-pink border-trans-pink';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-300';
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

  return (
    <div className="min-h-screen py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div className="animate-fade-in">
            <h1 className="text-3xl lg:text-4xl font-bold mb-2">
              Minha <span className="gradient-text">Agenda</span>
            </h1>
            <p className="text-gray-600 text-sm lg:text-base">
              Organize sua jornada de terapia hormonal com lembretes personalizados
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            {/* View Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <Button
                variant={view === 'day' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setView('day')}
                className="px-3 text-sm"
              >
                Dia
              </Button>
              <Button
                variant={view === 'week' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setView('week')}
                className="px-3 text-sm"
              >
                Semana
              </Button>
              <Button
                variant={view === 'month' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setView('month')}
                className="px-3 text-sm"
              >
                Mês
              </Button>
            </div>
            
            {/* Add Event Dialog - Only show if authenticated */}
            {isAuthenticated && (
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="btn-trans whitespace-nowrap">
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Evento
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Adicionar Novo Evento</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="title" className="text-right">
                        Título
                      </Label>
                      <Input 
                        id="title" 
                        className="col-span-3" 
                        value={newEvent.title}
                        onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="type" className="text-right">
                        Tipo
                      </Label>
                      <Select value={newEvent.type} onValueChange={(value) => setNewEvent(prev => ({ ...prev, type: value }))}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="consulta">Consulta</SelectItem>
                          <SelectItem value="medicamento">Medicamento</SelectItem>
                          <SelectItem value="exame">Exame</SelectItem>
                          <SelectItem value="terapia">Terapia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="date" className="text-right">
                        Data
                      </Label>
                      <Input 
                        id="date" 
                        type="date" 
                        className="col-span-3" 
                        value={newEvent.date}
                        onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="time" className="text-right">
                        Hora
                      </Label>
                      <Input 
                        id="time" 
                        type="time" 
                        className="col-span-3" 
                        value={newEvent.time}
                        onChange={(e) => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="description" className="text-right">
                        Descrição
                      </Label>
                      <Textarea 
                        id="description" 
                        className="col-span-3" 
                        value={newEvent.description}
                        onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
                    <Button className="btn-trans" onClick={handleCreateEvent}>Salvar Evento</Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
            
            {/* Login prompt for non-authenticated users */}
            {!isAuthenticated && (
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Faça login para criar eventos</p>
                <Button variant="outline" onClick={() => window.location.href = '/login'}>
                  Entrar
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Calendar Section */}
          <div className="xl:col-span-1">
            <Card className="card-trans">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <CalendarIcon className="w-5 h-5" />
                  <span>Calendário</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  locale={ptBR}
                  className="rounded-md border shadow w-full"
                  modifiers={{
                    hasEvent: daysWithEvents
                  }}
                  modifiersStyles={{
                    hasEvent: {
                      backgroundColor: 'rgb(59, 130, 246)',
                      color: 'white',
                      borderRadius: '50%'
                    }
                  }}
                />
                <div className="mt-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Dias com eventos</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 gap-4 mt-6">
              <Card className="card-trans">
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-trans-blue">
                      {events.filter(e => e.type === 'consulta').length}
                    </p>
                    <p className="text-sm text-gray-600">Consultas este mês</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="card-trans">
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-safe-green">98%</p>
                    <p className="text-sm text-gray-600">Adesão aos medicamentos</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Events Section */}
          <div className="xl:col-span-3">
            <Card className="card-trans">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CalendarIcon className="w-6 h-6" />
                  <span>Próximos Eventos</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {events.length > 0 ? events.map((event) => {
                    const EventIcon = getEventIcon(event.type);
                    return (
                      <div key={event.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getEventColor(event.type)}`}>
                          <EventIcon className="w-6 h-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-3 mb-1">
                            <h4 className="font-semibold truncate">{event.title}</h4>
                            <Badge variant="outline" className="capitalize flex-shrink-0">
                              {getTypeLabel(event.type)}
                            </Badge>
                          </div>
                          {event.description && (
                            <p className="text-sm text-gray-600 mb-1 truncate">{event.description}</p>
                          )}
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <CalendarIcon className="w-4 h-4" />
                              <span>{new Date(event.date).toLocaleDateString('pt-BR')}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{event.time}</span>
                            </div>
                          </div>
                        </div>
                        {isAuthenticated && (
                          <Button variant="ghost" size="sm" className="flex-shrink-0">
                            Editar
                          </Button>
                        )}
                      </div>
                    );
                  }) : (
                    <div className="text-center py-8">
                      <CalendarIcon className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-500">Nenhum evento cadastrado ainda</p>
                      {isAuthenticated ? (
                        <p className="text-sm text-gray-400">Clique em "Novo Evento" para começar</p>
                      ) : (
                        <p className="text-sm text-gray-400">Faça login para criar eventos</p>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Tips Section */}
            <Card className="mt-6 card-trans bg-gradient-to-r from-trans-blue/5 to-trans-pink/5">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="w-6 h-6 text-trans-blue" />
                  <span>Dicas para uma Agenda Eficiente</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Medicamentos:</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• Configure lembretes diários para seus hormônios</li>
                      <li>• Mantenha um registro de como se sente</li>
                      <li>• Anote efeitos colaterais para reportar ao médico</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Consultas:</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• Agende com antecedência suas consultas</li>
                      <li>• Prepare uma lista de dúvidas antes da consulta</li>
                      <li>• Mantenha seus exames sempre organizados</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agenda;
