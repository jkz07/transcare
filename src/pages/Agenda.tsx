
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarDays, Clock, MapPin, Plus, Edit, Trash2, Filter, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

type EventType = 'consulta' | 'exame' | 'medicamento' | 'terapia';

interface AgendaEvent {
  id: string;
  title: string;
  type: EventType;
  date: string;
  time: string;
  description?: string;
  user_id: string;
}

const eventTypes = [
  { value: 'consulta' as const, label: 'Consulta Médica', color: 'bg-blue-500' },
  { value: 'exame' as const, label: 'Exame', color: 'bg-orange-500' },
  { value: 'medicamento' as const, label: 'Medicamento', color: 'bg-green-500' },
  { value: 'terapia' as const, label: 'Terapia', color: 'bg-purple-500' }
];

const Agenda = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<AgendaEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<AgendaEvent[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<AgendaEvent | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    type: 'consulta' as EventType,
    date: '',
    time: '',
    description: ''
  });
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [events, selectedType]);

  const loadEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('agenda_events')
        .select('*')
        .order('date', { ascending: true });

      if (error) throw error;
      
      // Type assertion to ensure the data matches our interface
      const typedEvents = (data || []).map(event => ({
        ...event,
        type: event.type as EventType
      })) as AgendaEvent[];
      
      setEvents(typedEvents);
    } catch (error) {
      console.error('Error loading events:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os eventos.",
        variant: "destructive",
      });
    }
  };

  const filterEvents = () => {
    if (selectedType === 'all') {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(events.filter(event => event.type === selectedType));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated || !user) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para criar eventos.",
        variant: "destructive",
      });
      return;
    }

    try {
      const eventData = {
        ...formData,
        user_id: user.id
      };

      if (editingEvent) {
        const { error } = await supabase
          .from('agenda_events')
          .update(eventData)
          .eq('id', editingEvent.id);

        if (error) throw error;

        toast({
          title: "Sucesso",
          description: "Evento atualizado com sucesso!",
        });
      } else {
        const { error } = await supabase
          .from('agenda_events')
          .insert([eventData]);

        if (error) throw error;

        toast({
          title: "Sucesso",
          description: "Evento criado com sucesso!",
        });
      }

      setIsDialogOpen(false);
      setEditingEvent(null);
      setFormData({
        title: '',
        type: 'consulta',
        date: '',
        time: '',
        description: ''
      });
      loadEvents();
    } catch (error) {
      console.error('Error saving event:', error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar o evento.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (eventId: string) => {
    try {
      const { error } = await supabase
        .from('agenda_events')
        .delete()
        .eq('id', eventId);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Evento excluído com sucesso!",
      });
      loadEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
      toast({
        title: "Erro",
        description: "Não foi possível excluir o evento.",
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (event: AgendaEvent) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      type: event.type,
      date: event.date,
      time: event.time,
      description: event.description || ''
    });
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingEvent(null);
    setFormData({
      title: '',
      type: 'consulta',
      date: '',
      time: '',
      description: ''
    });
  };

  const getEventTypeInfo = (type: string) => {
    return eventTypes.find(t => t.value === type) || eventTypes[0];
  };

  const getTodayEvents = () => {
    if (!selectedDate) return [];
    const today = format(selectedDate, 'yyyy-MM-dd');
    return filteredEvents.filter(event => event.date === today);
  };

  const getUpcomingEvents = () => {
    const today = new Date();
    const todayStr = format(today, 'yyyy-MM-dd');
    return filteredEvents
      .filter(event => event.date >= todayStr)
      .slice(0, 5);
  };

  const eventDatesByType = events.length > 0 ? events.reduce((acc, event) => {
    const dateKey = event.date;
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    if (!acc[dateKey].includes(event.type)) {
      acc[dateKey].push(event.type);
    }
    return acc;
  }, {} as Record<string, EventType[]>) : {};

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

  return (
    <div className="min-h-screen py-8 bg-gradient-to-br from-trans-blue/10 via-white to-trans-pink/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">Agenda</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Organize seus compromissos médicos, exames e medicamentos
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="card-trans">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <CalendarDays className="w-6 h-6 text-trans-blue" />
                  Calendário
                </CardTitle>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      className="bg-gradient-to-r from-trans-blue to-trans-pink border-0"
                      disabled={!isAuthenticated}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Novo Evento
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>
                        {editingEvent ? 'Editar Evento' : 'Novo Evento'}
                      </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="title">Título</Label>
                        <Input
                          id="title"
                          value={formData.title}
                          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="type">Tipo</Label>
                        <Select 
                          value={formData.type} 
                          onValueChange={(value: EventType) => setFormData(prev => ({ ...prev, type: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {eventTypes.map(type => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="date">Data</Label>
                        <Input
                          id="date"
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="time">Horário</Label>
                        <Input
                          id="time"
                          type="time"
                          value={formData.time}
                          onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="description">Descrição</Label>
                        <Textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Adicione detalhes sobre o evento..."
                        />
                      </div>
                      <div className="flex gap-2 pt-4">
                        <Button type="submit" className="flex-1">
                          {editingEvent ? 'Atualizar' : 'Criar'}
                        </Button>
                        <Button type="button" variant="outline" onClick={closeDialog}>
                          Cancelar
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent className="flex justify-center">
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
          </div>

          <div className="space-y-6">
            <Card className="card-trans">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-trans-blue" />
                  Filtros
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os eventos</SelectItem>
                    {eventTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card className="card-trans">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-trans-blue" />
                  {selectedDate ? `Eventos de ${format(selectedDate, 'dd/MM/yyyy')}` : 'Hoje'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getTodayEvents().map((event) => {
                    const typeInfo = getEventTypeInfo(event.type);
                    return (
                      <div key={event.id} className="p-3 rounded-lg border bg-white/50 hover:bg-white/80 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <div className={`w-3 h-3 rounded-full ${typeInfo.color}`}></div>
                              <span className="font-medium text-gray-900">{event.title}</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">
                              {typeInfo.label} • {event.time}
                            </p>
                            {event.description && (
                              <p className="text-sm text-gray-500">{event.description}</p>
                            )}
                          </div>
                          {canUserEditEvent(event) && (
                            <div className="flex gap-1 ml-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => openEditDialog(event)}
                                className="p-1 h-8 w-8"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="p-1 h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Tem certeza de que deseja excluir o evento "{event.title}"? 
                                      Esta ação não pode ser desfeita.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction 
                                      onClick={() => handleDelete(event.id)}
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
                      </div>
                    );
                  })}
                  {getTodayEvents().length === 0 && (
                    <p className="text-gray-500 text-center py-4">
                      Nenhum evento para {selectedDate ? 'este dia' : 'hoje'}.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="card-trans">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-trans-blue" />
                  Próximos Eventos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getUpcomingEvents().map((event) => {
                    const typeInfo = getEventTypeInfo(event.type);
                    return (
                      <div key={event.id} className="p-3 rounded-lg border bg-white/50 hover:bg-white/80 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <div className={`w-3 h-3 rounded-full ${typeInfo.color}`}></div>
                              <span className="font-medium text-gray-900">{event.title}</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">
                              {typeInfo.label} • {format(new Date(event.date), 'dd/MM/yyyy')} às {event.time}
                            </p>
                            {event.description && (
                              <p className="text-sm text-gray-500">{event.description}</p>
                            )}
                          </div>
                          {canUserEditEvent(event) && (
                            <div className="flex gap-1 ml-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => openEditDialog(event)}
                                className="p-1 h-8 w-8"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="p-1 h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Tem certeza de que deseja excluir o evento "{event.title}"? 
                                      Esta ação não pode ser desfeita.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction 
                                      onClick={() => handleDelete(event.id)}
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
                      </div>
                    );
                  })}
                  {getUpcomingEvents().length === 0 && (
                    <p className="text-gray-500 text-center py-4">
                      Nenhum evento próximo.
                    </p>
                  )}
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
