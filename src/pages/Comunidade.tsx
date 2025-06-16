
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarContent, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, MessageSquare, Users, Plus, Search, Filter, MapPin, Clock } from "lucide-react";

const Comunidade = () => {
  const [activeTab, setActiveTab] = useState("feed");

  const mockPosts = [
    {
      id: 1,
      author: "Maria Silva",
      avatar: "MS",
      time: "2 horas atrás",
      category: "Experiência",
      title: "6 meses de TH - Compartilhando minha jornada",
      content: "Olá pessoal! Faz 6 meses que comecei minha terapia hormonal e queria compartilhar como tem sido. Os primeiros meses foram desafiadores, mas agora estou me sentindo muito mais eu...",
      likes: 24,
      comments: 8,
      location: "São Paulo, SP"
    },
    {
      id: 2,
      author: "João Santos",
      avatar: "JS",
      time: "5 horas atrás",
      category: "Dúvida",
      title: "Dúvidas sobre efeitos da testosterona",
      content: "Pessoal, estou pensando em começar TH masculinizante e tenho algumas dúvidas sobre os efeitos. Alguém pode compartilhar experiências sobre as mudanças na voz?",
      likes: 12,
      comments: 15,
      location: "Rio de Janeiro, RJ"
    },
    {
      id: 3,
      author: "Ana Costa",
      avatar: "AC",
      time: "1 dia atrás",
      category: "Suporte",
      title: "Grupo de apoio online - quartas 19h",
      content: "Pessoal, estamos organizando um grupo de apoio online toda quarta-feira às 19h. É um espaço seguro para conversar, tirar dúvidas e se apoiar mutuamente. Quem tiver interesse...",
      likes: 18,
      comments: 6,
      location: "Online"
    }
  ];

  const mockGroups = [
    {
      id: 1,
      name: "TH Feminizante - SP",
      members: 234,
      description: "Grupo para pessoas fazendo terapia hormonal feminizante em São Paulo",
      category: "Local"
    },
    {
      id: 2,
      name: "Primeiros Passos",
      members: 567,
      description: "Espaço acolhedor para quem está começando a entender sua identidade",
      category: "Iniciantes"
    },
    {
      id: 3,
      name: "TH Masculinizante",
      members: 189,
      description: "Discussões e experiências sobre terapia hormonal masculinizante",
      category: "Experiência"
    },
    {
      id: 4,
      name: "Bem-estar Mental",
      members: 312,
      description: "Cuidados com saúde mental durante a transição",
      category: "Saúde"
    }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Nossa <span className="gradient-text">Comunidade</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Um espaço seguro para conectar, compartilhar experiências e encontrar apoio em sua jornada
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="card-trans text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-trans-blue to-blue-400 rounded-xl mx-auto mb-3 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-bold gradient-text">15.2k</p>
              <p className="text-sm text-gray-600">Membros ativos</p>
            </CardContent>
          </Card>
          
          <Card className="card-trans text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-trans-pink to-pink-400 rounded-xl mx-auto mb-3 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-bold gradient-text">2.8k</p>
              <p className="text-sm text-gray-600">Discussões ativas</p>
            </CardContent>
          </Card>
          
          <Card className="card-trans text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-safe-green to-green-400 rounded-xl mx-auto mb-3 flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-bold gradient-text">45k</p>
              <p className="text-sm text-gray-600">Apoios dados</p>
            </CardContent>
          </Card>
          
          <Card className="card-trans text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-pride-purple to-purple-400 rounded-xl mx-auto mb-3 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-bold gradient-text">127</p>
              <p className="text-sm text-gray-600">Grupos ativos</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="feed">Feed da Comunidade</TabsTrigger>
            <TabsTrigger value="groups">Grupos</TabsTrigger>
            <TabsTrigger value="create">Criar Post</TabsTrigger>
          </TabsList>

          {/* Feed Tab */}
          <TabsContent value="feed" className="space-y-6">
            {/* Search and Filters */}
            <Card className="card-trans">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input placeholder="Buscar discussões..." className="pl-10" />
                  </div>
                  <Button variant="outline" className="flex items-center space-x-2">
                    <Filter className="w-4 h-4" />
                    <span>Filtros</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Posts */}
            <div className="space-y-6">
              {mockPosts.map((post) => (
                <Card key={post.id} className="card-trans">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarContent>{post.avatar}</AvatarContent>
                          <AvatarFallback>{post.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">{post.author}</h4>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Clock className="w-4 h-4" />
                            <span>{post.time}</span>
                            <MapPin className="w-4 h-4" />
                            <span>{post.location}</span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary">{post.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-semibold text-lg mb-3">{post.title}</h3>
                    <p className="text-gray-700 mb-4">{post.content}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm" className="text-trans-pink hover:text-trans-pink hover:bg-trans-pink/10">
                          <Heart className="w-4 h-4 mr-2" />
                          {post.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-trans-blue hover:text-trans-blue hover:bg-trans-blue/10">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          {post.comments}
                        </Button>
                      </div>
                      <Button variant="outline" size="sm">
                        Responder
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Groups Tab */}
          <TabsContent value="groups" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockGroups.map((group) => (
                <Card key={group.id} className="card-trans">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{group.name}</CardTitle>
                      <Badge variant="outline">{group.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{group.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Users className="w-4 h-4" />
                        <span>{group.members} membros</span>
                      </div>
                      <Button size="sm" className="btn-trans">
                        <Plus className="w-4 h-4 mr-2" />
                        Participar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Create Post Tab */}
          <TabsContent value="create" className="space-y-6">
            <Card className="card-trans">
              <CardHeader>
                <CardTitle>Criar Nova Publicação</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Título</label>
                  <Input placeholder="Digite um título para sua publicação..." />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Categoria</label>
                  <div className="flex flex-wrap gap-2">
                    {["Experiência", "Dúvida", "Suporte", "Informação", "Desabafo"].map((category) => (
                      <Badge key={category} variant="outline" className="cursor-pointer hover:bg-trans-blue hover:text-white">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Conteúdo</label>
                  <Textarea 
                    placeholder="Compartilhe sua experiência, faça uma pergunta ou ofereça apoio..."
                    className="min-h-[120px]"
                  />
                </div>
                
                <div className="flex justify-end space-x-4">
                  <Button variant="outline">Salvar Rascunho</Button>
                  <Button className="btn-trans">Publicar</Button>
                </div>
              </CardContent>
            </Card>

            {/* Community Guidelines */}
            <Card className="card-trans bg-gradient-to-r from-trans-blue/5 to-trans-pink/5">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="w-6 h-6 text-trans-pink" />
                  <span>Diretrizes da Comunidade</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-safe-green">Seja respeitoso/a:</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Respeite identidades e pronomes</li>
                      <li>• Evite linguagem ofensiva</li>
                      <li>• Seja empático/a com experiências diferentes</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-trans-blue">Mantenha-se seguro/a:</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Não compartilhe informações pessoais</li>
                      <li>• Busque sempre orientação médica</li>
                      <li>• Reporte comportamentos inadequados</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Comunidade;
