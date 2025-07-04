
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Clock, Plus, Stethoscope, Pill, CalendarDays, User, Edit, Trash2, Lock } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { format, parseISO, isAfter, isBefore, startOfDay } from "date-fns";
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
    if (isAuthenticated) {
      fetchEvents();
    }
  }, [isAuthenticated]);

  const fetchEvents = async () => {
    // Só buscar eventos se o usuário estiver logado
    if (!isAuthenticated) {
      setEvents([]);
      return;
    }

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

  // Filtrar eventos apenas se estiver logado
  const selectedDateEvents = isAuthenticated ? events.filter(event => {
    if (!selectedDate) return false;
    const eventDate = new Date(event.date + 'T00:00:00');
    const selectedDateOnly = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
    const eventDateOnly = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
    return eventDateOnly.getTime() === selectedDateOnly.getTime();
  }) : [];

  // Separar eventos futuros e passados
  const today = startOfDay(new Date());
  const upcomingEvents = isAuthenticated ? events.filter(event => {
    const eventDateTime = new Date(event.date + 'T' + event.time);
    return isAfter(eventDateTime, new Date());
  }).slice(0, 5) : []; // Mostrar apenas os próximos 5

  const pastEvents = isAuthenticated ? events.filter(event => {
    const eventDateTime = new Date(event.date + 'T' + event.time);
    return isBefore(eventDateTime, new Date());
  }).slice(-5) : []; // Mostrar os últimos 5

  // Criar objetos de data com cores baseadas no tipo de evento
  const eventDatesByType = isAuthenticated ? events.reduce((acc, event) => {
    const eventDate = new Date(event.date + 'T00:00:00');
    const dateKey = eventDate.toDateString();
    
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(event.type);
    return acc;
  }, {} as Record<string, string[]>) : {};

  // Criar modifiers dinâmicos por tipo de evento
  const consultaEvents = Object.keys(eventDatesByType).filter(dateKey => 
    eventDatesByType[dateKey].includes('consulta')
  ).map(dateStr => new Date(dateStr));

  const exameEvents = Object.keys(eventDatesByType).filter(dateKey => 
    eventDatesByType[dateKey].includes('exame')
  ).map(dateStr => new Date(dateStr));

  const medicamentoEvents = Object.keys(eventDatesByType).filter(dateKey => 
    eventDatesByType[dateKey].includes('medicamento')
  ).map(dateStr => new Date(dateStr));

  const terapiaEvents = Object.keys(eventDatesByType).filter(dateKey => 
    eventDatesByType[dateKey].includes('terapia')
  ).map(dateStr => new Date(dateStr));

  const canUserEditEvent = (event: AgendaEvent) => {
    return isAuthenticated && user && event.user_id === user.id;
  };

  const renderEventsList = (eventsList: AgendaEvent[], title: string) => (
    <Card className="bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!isAuthenticated ? (
          <div className="text-center py-8">
            <Lock className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">
              Você precisa estar logado para ver seus compromissos
            </p>
          </div>
        ) : eventsList.length > 0 ? (
          <div className="space-y-4">
            {eventsList.map((event) => {
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
                            <span>{format(new Date(event.date), "dd/MM/yyyy", { locale: ptBR })} às {event.time}</span>
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
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 hover:text-red-800"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Tem certeza que deseja excluir o compromisso "{event.title}"? Esta ação não pode ser desfeita.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction 
                                  onClick={() => handleDeleteEvent(event.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Excluir
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
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
              Nenhum compromisso encontrado
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-trans-blue/10 via-white to-trans-pink/10 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 gradient-text">
            {isAuthenticated ? 'Minha Agenda' : 'Agenda Pessoal'}
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {isAuthenticated 
              ? 'Organize seus compromissos médicos e eventos importantes' 
              : 'Faça login para acessar e organizar sua agenda pessoal'
            }
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
              <CardContent className="p-1 flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  locale={ptBR}
                  className="rounded-md border"
                  modifiers={{
                    consulta: consultaEvents,
                    exame: exameEvents,
                    medicamento: medicamentoEvents,
                    terapia: terapiaEvents
                  }}
                  modifiersStyles={{
                    consulta: {
                      backgroundColor: 'rgb(59 130 246 / 0.2)',
                      color: 'rgb(29 78 216)',
                      fontWeight: 'bold'
                    },
                    exame: {
                      backgroundColor: 'rgb(249 115 22 / 0.2)',
                      color: 'rgb(194 65 12)',
                      fontWeight: 'bold'
                    },
                    medicamento: {
                      backgroundColor: 'rgb(34 197 94 / 0.2)',
                      color: 'rgb(21 128 61)',
                      fontWeight: 'bold'
                    },
                    terapia: {
                      backgroundColor: 'rgb(168 85 247 / 0.2)',
                      color: 'rgb(124 58 237)',
                      fontWeight: 'bold'
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
                            // Corrigir a formatação da data para evitar problemas de fuso horário
                            const year = selectedDate.getFullYear();
                            const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
                            const day = String(selectedDate.getDate()).padStart(2, '0');
                            const formattedDate = `${year}-${month}-${day}`;
                            
                            setNewEvent(prev => ({ 
                              ...prev, 
                              date: formattedDate
                            }));
                          }
                        }}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Novo Compromisso
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-bold gradient-text">
                          {editingEvent ? 'Editar Compromisso' : 'Criar Novo Compromisso'}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-6 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="title">Título do Compromisso</Label>
                          <Input 
                            id="title" 
                            placeholder="Ex: Consulta com Dr. Silva"
                            value={newEvent.title}
                            onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="type">Tipo de Compromisso</Label>
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
                            placeholder="Adicione detalhes sobre o compromisso..."
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
                          {editingEvent ? 'Atualizar' : 'Criar'} Compromisso
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                ) : (
                  <div className="text-center">
                    <Lock className="w-8 h-8 mx-auto text-gray-400 mb-3" />
                    <p className="text-sm text-gray-500 mb-4">
                      Faça login para criar compromissos
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
                  {isAuthenticated 
                    ? `Compromissos - ${selectedDate ? format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : 'Selecione uma data'}`
                    : 'Faça login para ver seus compromissos'
                  }
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!isAuthenticated ? (
                  <div className="text-center py-8">
                    <Lock className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500">
                      Você precisa estar logado para ver seus compromissos
                    </p>
                  </div>
                ) : selectedDateEvents.length > 0 ? (
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
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-red-600 hover:text-red-800"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          Tem certeza que deseja excluir o compromisso "{event.title}"? Esta ação não pode ser desfeita.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                        <AlertDialogAction 
                                          onClick={() => handleDeleteEvent(event.id)}
                                          className="bg-red-600 hover:bg-red-700"
                                        >
                                          Excluir
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
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
                      Nenhum compromisso para esta data
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Summary Statistics - Only show if authenticated */}
            {isAuthenticated && (
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
            )}

            {/* Próximos Compromissos e Compromissos Passados */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <div>
                {renderEventsList(upcomingEvents, "Próximos Compromissos")}
              </div>
              <div>
                {renderEventsList(pastEvents, "Compromissos Passados")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agenda;
