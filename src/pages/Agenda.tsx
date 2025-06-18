
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Clock, Plus, Stethoscope, Pill, CalendarDays, User, Edit, Trash2, Lock } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

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
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<AgendaEvent | null>(null);
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
    // Buscar todos os eventos - agora qualquer pessoa pode ver
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

    if (editingEvent) {
      // Só permite editar se for o próprio usuário
      if (editingEvent.user_id !== user.id) {
        return;
      }

      const { error } = await supabase
        .from('agenda_events')
        .update({
          title: newEvent.title,
          type: newEvent.type,
          date: newEvent.date,
          time: newEvent.time,
          description: newEvent.description
        })
        .eq('id', editingEvent.id);

      if (!error) {
        setEditingEvent(null);
        resetForm();
        fetchEvents();
      }
    } else {
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
        resetForm();
        fetchEvents();
      }
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (!user) return;
    
    // Verificar se o evento pertence ao usuário
    const event = events.find(e => e.id === eventId);
    if (!event || event.user_id !== user.id) {
      return;
    }

    const { error } = await supabase
      .from('agenda_events')
      .delete()
      .eq('id', eventId);

    if (!error) {
      fetchEvents();
    }
  };

  const handleEditEvent = (event: AgendaEvent) => {
    // Só permite editar se for o próprio usuário
    if (!user || event.user_id !== user.id) {
      return;
    }

    setEditingEvent(event);
    setNewEvent({
      title: event.title,
      type: event.type,
      date: event.date,
      time: event.time,
      description: event.description || ''
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setNewEvent({ title: '', type: '', date: '', time: '', description: '' });
    setIsDialogOpen(false);
    setEditingEvent(null);
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'consulta': return Stethoscope;
      case 'medicamento': return Pill;
      case 'exame': return CalendarDays;
      case 'terapia': return User;
      default: return CalendarDays;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'consulta': return 'border-l-blue-500 bg-blue-50';
      case 'medicamento': return 'border-l-green-500 bg-green-50';
      case 'exame': return 'border-l-orange-500 bg-orange-50';
      case 'terapia': return 'border-l-purple-500 bg-purple-50';
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

  const selectedDateEvents = events.filter(event => 
    selectedDate && event.date === format(selectedDate, 'yyyy-MM-dd')
  );

  const eventDates = events.map(event => new Date(event.date));

  const canUserEditEvent = (event: AgendaEvent) => {
    return isAuthenticated && user && event.user_id === user.id;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-trans-blue/10 via-white to-trans-pink/10 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 gradient-text">
            Agenda da Comunidade
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Veja os eventos da comunidade e {isAuthenticated ? 'organize seus compromissos' : 'faça login para criar seus próprios eventos'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-1">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarDays className="w-5 h-5" />
                  Calendário
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  locale={ptBR}
                  className="rounded-md border"
                  modifiers={{
                    hasEvent: eventDates
                  }}
                  modifiersStyles={{
                    hasEvent: {
                      backgroundColor: 'rgb(59 130 246 / 0.2)',
                      color: 'rgb(29 78 216)'
                    }
                  }}
                />
              </CardContent>
            </Card>

            {/* Add Event Button - Only for authenticated users */}
            <Card className="bg-white/80 backdrop-blur-sm mt-6">
              <CardContent className="p-6">
                {isAuthenticated ? (
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        className="w-full bg-gradient-to-r from-trans-blue to-trans-pink text-white"
                        onClick={() => {
                          if (selectedDate) {
                            setNewEvent(prev => ({ 
                              ...prev, 
                              date: format(selectedDate, 'yyyy-MM-dd') 
                            }));
                          }
                        }}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Novo Evento
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-bold gradient-text">
                          {editingEvent ? 'Editar Evento' : 'Criar Novo Evento'}
                        </DialogTitle>
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
                        <Button variant="outline" onClick={resetForm}>
                          Cancelar
                        </Button>
                        <Button 
                          className="bg-gradient-to-r from-trans-blue to-trans-pink text-white"
                          onClick={handleCreateEvent}
                        >
                          {editingEvent ? 'Atualizar' : 'Criar'} Evento
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                ) : (
                  <div className="text-center">
                    <Lock className="w-8 h-8 mx-auto text-gray-400 mb-3" />
                    <p className="text-sm text-gray-500 mb-4">
                      Faça login para criar eventos
                    </p>
                    <Button 
                      onClick={() => window.location.href = '/login'}
                      className="w-full bg-gradient-to-r from-trans-blue to-trans-pink text-white"
                    >
                      Fazer Login
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Events for Selected Date */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Eventos - {selectedDate ? format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : 'Selecione uma data'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedDateEvents.length > 0 ? (
                  <div className="space-y-4">
                    {selectedDateEvents.map((event) => {
                      const EventIcon = getEventIcon(event.type);
                      const canEdit = canUserEditEvent(event);
                      
                      return (
                        <Card key={event.id} className={`${getEventColor(event.type)} border-l-4`}>
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start space-x-3">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                                  <EventIcon className="w-5 h-5 text-gray-600" />
                                </div>
                                
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-semibold text-gray-900">{event.title}</h4>
                                    <Badge variant="secondary" className="capitalize text-xs">
                                      {getTypeLabel(event.type)}
                                    </Badge>
                                  </div>
                                  
                                  <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                                    <Clock className="w-4 h-4" />
                                    <span>{event.time}</span>
                                  </div>
                                  
                                  {event.description && (
                                    <p className="text-sm text-gray-600">
                                      {event.description}
                                    </p>
                                  )}
                                </div>
                              </div>
                              
                              {canEdit && (
                                <div className="flex gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleEditEvent(event)}
                                  >
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleDeleteEvent(event.id)}
                                    className="text-red-600 hover:text-red-800"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CalendarDays className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500">
                      Nenhum evento para esta data
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Summary Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <Card className="bg-white/70 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Stethoscope className="w-4 h-4 text-blue-600" />
                  </div>
                  <p className="text-lg font-bold text-blue-600">
                    {events.filter(e => e.type === 'consulta').length}
                  </p>
                  <p className="text-xs text-gray-600">Consultas</p>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Pill className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="text-lg font-bold text-green-600">
                    {events.filter(e => e.type === 'medicamento').length}
                  </p>
                  <p className="text-xs text-gray-600">Medicamentos</p>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CalendarDays className="w-4 h-4 text-orange-600" />
                  </div>
                  <p className="text-lg font-bold text-orange-600">
                    {events.filter(e => e.type === 'exame').length}
                  </p>
                  <p className="text-xs text-gray-600">Exames</p>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <User className="w-4 h-4 text-purple-600" />
                  </div>
                  <p className="text-lg font-bold text-purple-600">
                    {events.filter(e => e.type === 'terapia').length}
                  </p>
                  <p className="text-xs text-gray-600">Terapias</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agenda;
