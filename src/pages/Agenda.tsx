
import { useState } from "react";
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

const Agenda = () => {
  const [view, setView] = useState<'day' | 'week' | 'month'>('week');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  const mockEvents = [
    {
      id: 1,
      title: "Consulta com Endocrinologista",
      type: "consulta",
      date: "2025-06-20",
      time: "14:00",
      description: "Consulta de rotina para acompanhamento hormonal"
    },
    {
      id: 2,
      title: "Tomar Hormônio",
      type: "medicamento",
      date: "2025-06-16",
      time: "08:00",
      description: "Dose diária de estrogênio"
    },
    {
      id: 3,
      title: "Exames de Sangue",
      type: "exame",
      date: "2025-06-25",
      time: "07:30",
      description: "Hemograma completo e perfil hormonal"
    },
    {
      id: 4,
      title: "Terapia Psicológica",
      type: "terapia",
      date: "2025-06-18",
      time: "16:00",
      description: "Sessão semanal de acompanhamento"
    }
  ];

  // Dias com eventos para marcar no calendário
  const daysWithEvents = mockEvents.map(event => new Date(event.date));

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

  const isDayWithEvent = (date: Date) => {
    return daysWithEvents.some(eventDate => 
      eventDate.toDateString() === date.toDateString()
    );
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="animate-fade-in">
            <h1 className="text-4xl font-bold mb-2">
              Minha <span className="gradient-text">Agenda</span>
            </h1>
            <p className="text-gray-600">
              Organize sua jornada de terapia hormonal com lembretes personalizados
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0">
            {/* View Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <Button
                variant={view === 'day' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setView('day')}
                className="px-4"
              >
                Dia
              </Button>
              <Button
                variant={view === 'week' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setView('week')}
                className="px-4"
              >
                Semana
              </Button>
              <Button
                variant={view === 'month' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setView('month')}
                className="px-4"
              >
                Mês
              </Button>
            </div>
            
            {/* Add Event Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="btn-trans">
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
                    <Input id="title" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">
                      Tipo
                    </Label>
                    <Select>
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
                    <Input id="date" type="date" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="time" className="text-right">
                      Hora
                    </Label>
                    <Input id="time" type="time" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Descrição
                    </Label>
                    <Textarea id="description" className="col-span-3" />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Cancelar</Button>
                  <Button className="btn-trans">Salvar Evento</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Calendar Section */}
          <div className="lg:col-span-1">
            <Card className="card-trans">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CalendarIcon className="w-6 h-6" />
                  <span>Calendário</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
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
                    <p className="text-2xl font-bold text-trans-blue">3</p>
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
          <div className="lg:col-span-3">
            <Card className="card-trans">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CalendarIcon className="w-6 h-6" />
                  <span>Próximos Eventos</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockEvents.map((event) => {
                    const EventIcon = getEventIcon(event.type);
                    return (
                      <div key={event.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getEventColor(event.type)}`}>
                          <EventIcon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-1">
                            <h4 className="font-semibold">{event.title}</h4>
                            <Badge variant="outline" className="capitalize">
                              {event.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{event.description}</p>
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
                        <Button variant="ghost" size="sm">
                          Editar
                        </Button>
                      </div>
                    );
                  })}
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
