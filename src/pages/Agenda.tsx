
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Plus, Bell, User, Pill, Stethoscope } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const Agenda = () => {
  const [view, setView] = useState<'day' | 'week' | 'month'>('week');
  
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

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'consulta':
        return Stethoscope;
      case 'medicamento':
        return Pill;
      case 'exame':
        return Calendar;
      case 'terapia':
        return User;
      default:
        return Calendar;
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

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="card-trans">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-trans-blue to-blue-400 rounded-xl flex items-center justify-center">
                  <Stethoscope className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-sm text-gray-600">Consultas este mês</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-trans">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-safe-green to-green-400 rounded-xl flex items-center justify-center">
                  <Pill className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold">98%</p>
                  <p className="text-sm text-gray-600">Adesão medicamentos</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-trans">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-warm-orange to-orange-400 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold">2</p>
                  <p className="text-sm text-gray-600">Exames pendentes</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-trans">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-trans-pink to-pink-400 rounded-xl flex items-center justify-center">
                  <Bell className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold">5</p>
                  <p className="text-sm text-gray-600">Lembretes ativos</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Calendar View */}
        <Card className="card-trans">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-6 h-6" />
              <span>Cronograma de Junho 2025</span>
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
                          <Calendar className="w-4 h-4" />
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
        <Card className="mt-8 card-trans bg-gradient-to-r from-trans-blue/5 to-trans-pink/5">
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
  );
};

export default Agenda;
