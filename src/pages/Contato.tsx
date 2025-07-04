import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Mail, Phone, Clock, AlertTriangle, Heart, HelpCircle } from "lucide-react";

const Contato = () => {
  const contactOptions = [
    {
      icon: MessageSquare,
      title: "Suporte Geral",
      description: "Dúvidas sobre a plataforma, funcionalidades ou sua conta",
      response: "Resposta em até 24h",
      color: "from-trans-blue to-blue-400"
    },
    {
      icon: AlertTriangle,
      title: "Denúncias",
      description: "Reporte comportamentos inadequados ou violações das diretrizes",
      response: "Análise em até 2h",
      color: "from-red-500 to-red-600"
    },
    {
      icon: Heart,
      title: "Apoio Emocional",
      description: "Precisa de suporte? Nossa equipe está aqui para ajudar",
      response: "Resposta prioritária",
      color: "from-trans-pink to-pink-400"
    },
    {
      icon: HelpCircle,
      title: "Sugestões",
      description: "Compartilhe ideias para melhorar nossa comunidade",
      response: "Análise em até 7 dias",
      color: "from-pride-purple to-purple-400"
    }
  ];

  const emergencyContacts = [
    {
      name: "CVV - Centro de Valorização da Vida",
      phone: "188",
      description: "Prevenção ao suicídio - 24h/dia",
      type: "Emergência"
    },
    {
      name: "Disque 100",
      phone: "100",
      description: "Denúncias de violações de direitos humanos",
      type: "Denúncia"
    },
    {
      name: "ANTRA - Associação Nacional de Travestis e Transexuais",
      email: "contato@antrabrasil.org",
      description: "Suporte específico para pessoas trans",
      type: "Suporte"
    }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Contato</span> e Suporte
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Estamos aqui para ajudar. Entre em contato conosco para tirar dúvidas, fazer sugestões ou buscar apoio
          </p>
        </div>

        {/* Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactOptions.map((option, index) => (
            <Card key={index} className="card-trans group hover:scale-105 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${option.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <option.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{option.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{option.description}</p>
                <p className="text-xs text-gray-500 font-medium">{option.response}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="card-trans">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="w-6 h-6 text-trans-blue" />
                <span>Enviar Mensagem</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome</Label>
                  <Input id="name" placeholder="Seu nome" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="seu@email.com" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="category">Categoria</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de contato" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="support">Suporte Geral</SelectItem>
                    <SelectItem value="report">Denúncia</SelectItem>
                    <SelectItem value="emotional">Apoio Emocional</SelectItem>
                    <SelectItem value="suggestion">Sugestão</SelectItem>
                    <SelectItem value="technical">Problema Técnico</SelectItem>
                    <SelectItem value="other">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="subject">Assunto</Label>
                <Input id="subject" placeholder="Resumo da sua mensagem" />
              </div>
              
              <div>
                <Label htmlFor="message">Mensagem</Label>
                <Textarea 
                  id="message" 
                  placeholder="Descreva sua dúvida, sugestão ou problema..."
                  className="min-h-[120px]"
                />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="urgent" className="rounded" />
                  <Label htmlFor="urgent" className="text-sm">
                    Marque se for urgente ou emergencial
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="privacy" className="rounded" />
                  <Label htmlFor="privacy" className="text-sm">
                    Concordo com a <button className="text-trans-blue underline">política de privacidade</button>
                  </Label>
                </div>
              </div>
              
              <Button className="btn-trans w-full">
                <Mail className="w-4 h-4 mr-2" />
                Enviar Mensagem
              </Button>
            </CardContent>
          </Card>

          {/* Contact Info & Emergency */}
          <div className="space-y-8">
            {/* Direct Contact */}
            <Card className="card-trans">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Phone className="w-6 h-6 text-safe-green" />
                  <span>Contato Direto</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="w-5 h-5 text-trans-blue" />
                  <div>
                    <p className="font-semibold">Email Geral</p>
                    <p className="text-sm text-gray-600">contato@transcare.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="font-semibold">Emergências</p>
                    <p className="text-sm text-gray-600">emergencia@transcare.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Clock className="w-5 h-5 text-trans-pink" />
                  <div>
                    <p className="font-semibold">Horário de Atendimento</p>
                    <p className="text-sm text-gray-600">Segunda a Sexta: 8h às 18h</p>
                    <p className="text-sm text-gray-600">Emergências: 24h/dia</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contacts */}
            <Card className="card-trans bg-gradient-to-r from-red-50 to-pink-50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                  <span>Contatos de Emergência</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4 text-sm">
                  Se você está em crise ou precisa de ajuda imediata, entre em contato com:
                </p>
                <div className="space-y-4">
                  {emergencyContacts.map((contact, index) => (
                    <div key={index} className="border border-red-200 rounded-lg p-4 bg-white">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-red-800">{contact.name}</h4>
                        <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                          {contact.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{contact.description}</p>
                      <div className="flex items-center space-x-2">
                        {contact.phone ? (
                          <>
                            <Phone className="w-4 h-4 text-red-600" />
                            <span className="font-bold text-red-800">{contact.phone}</span>
                          </>
                        ) : (
                          <>
                            <Mail className="w-4 h-4 text-red-600" />
                            <span className="font-bold text-red-800">{contact.email}</span>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* FAQ Quick Links */}
            <Card className="card-trans">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <HelpCircle className="w-6 h-6 text-pride-purple" />
                  <span>Perguntas Frequentes</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 text-sm">
                  Antes de entrar em contato, veja se sua dúvida já foi respondida:
                </p>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start text-left">
                    Como começar minha jornada na plataforma?
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-left">
                    Como configurar minha privacidade?
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-left">
                    Como reportar comportamento inadequado?
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-left">
                    Como participar da comunidade?
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contato;
