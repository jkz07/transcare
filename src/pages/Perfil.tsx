import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Edit, Settings, MessageSquare, Camera, Shield, Heart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Perfil = () => {
  const { isAuthenticated, profile, updateProfile, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    birth_date: '',
    location: '',
    phone: '',
    th_type: '',
    journey_time: ''
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        birth_date: profile.birth_date || '',
        location: profile.location || '',
        phone: profile.phone || '',
        th_type: profile.th_type || '',
        journey_time: profile.journey_time || ''
      });
    }
  }, [profile]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-trans-blue"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleSave = async () => {
    const { error } = await updateProfile({
      name: formData.name,
      birth_date: formData.birth_date,
      location: formData.location,
      phone: formData.phone,
      th_type: formData.th_type,
      journey_time: formData.journey_time
    });
    
    if (!error) {
      setIsEditing(false);
    }
  };

  const userStats = {
    postsCount: 23,
    likesReceived: 156,
    commentsCount: 89,
    joinDate: "Janeiro 2025"
  };

  const recentActivity = [
    {
      type: "post",
      title: "Compartilhou uma experiência sobre TH",
      date: "2 dias atrás",
      likes: 12
    },
    {
      type: "comment",
      title: "Comentou no post 'Primeiros passos'",
      date: "3 dias atrás",
      likes: 5
    },
    {
      type: "like",
      title: "Curtiu 8 posts na comunidade",
      date: "5 dias atrás",
      likes: 0
    }
  ];

  const getThTypeLabel = (type: string) => {
    switch (type) {
      case 'feminizante': return 'TH Feminizante';
      case 'masculinizante': return 'TH Masculinizante';
      case 'nao-binaria': return 'TH Não-binária';
      case 'considerando': return 'Considerando TH';
      default: return 'Não selecionado';
    }
  };

  const getJourneyTimeLabel = (time: string) => {
    switch (time) {
      case 'considerando': return 'Considerando';
      case '0-6meses': return '0-6 meses';
      case '6meses-1ano': return '6 meses - 1 ano';
      case '1-2anos': return '1-2 anos';
      case '2-5anos': return '2-5 anos';
      case '5anos+': return '5+ anos';
      default: return 'Não selecionado';
    }
  };

  const calculateAge = (birthDate: string) => {
    if (!birthDate) return null;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const age = profile?.birth_date ? calculateAge(profile.birth_date) : null;

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <Card className="mb-8 card-trans">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              {/* Avatar */}
              <div className="relative">
                <Avatar className="w-32 h-32">
                  <AvatarFallback className="text-4xl">
                    {profile?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <Button size="sm" className="absolute bottom-0 right-0 rounded-full w-10 h-10 p-0" variant="outline">
                  <Camera className="w-4 h-4" />
                </Button>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{profile?.name || 'Usuário'}</h1>
                    <p className="text-gray-600 mb-2">
                      {age ? `${age} anos` : ''} {age && profile?.location && '•'} {profile?.location || ''}
                      {profile?.phone && <><br /><span className="text-sm">📞 {profile.phone}</span></>}
                    </p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                      <Badge className="bg-trans-blue text-white">
                        {getThTypeLabel(profile?.th_type || 'feminizante')}
                      </Badge>
                      <Badge variant="outline">
                        {getJourneyTimeLabel(profile?.journey_time || '1-2anos')}
                      </Badge>
                      <Badge variant="outline">Membro</Badge>
                    </div>
                  </div>
                  <Button onClick={isEditing ? handleSave : () => setIsEditing(true)} className="btn-trans">
                    <Edit className="w-4 h-4 mr-2" />
                    {isEditing ? 'Salvar' : 'Editar Perfil'}
                  </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-trans-blue">{userStats.postsCount}</p>
                    <p className="text-sm text-gray-600">Posts</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-trans-pink">{userStats.likesReceived}</p>
                    <p className="text-sm text-gray-600">Curtidas</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-safe-green">{userStats.commentsCount}</p>
                    <p className="text-sm text-gray-600">Comentários</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-pride-purple">Membro desde</p>
                    <p className="text-sm text-gray-600">{userStats.joinDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Perfil</TabsTrigger>
            <TabsTrigger value="activity">Atividade</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>

          {/* Profile Edit Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="card-trans">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-6 h-6" />
                  <span>Informações Pessoais</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Nome</Label>
                    <Input 
                      id="name" 
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      disabled={!isEditing} 
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="birth_date">Data de Nascimento</Label>
                    <Input 
                      id="birth_date" 
                      type="date" 
                      value={formData.birth_date}
                      onChange={(e) => setFormData(prev => ({ ...prev, birth_date: e.target.value }))}
                      disabled={!isEditing} 
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="location">Localização</Label>
                    <Input 
                      id="location" 
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      disabled={!isEditing} 
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Telefone</Label>
                    <Input 
                      id="phone" 
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      disabled={!isEditing}
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                </div>

                <div>
                  <Label>Jornada Trans</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <Label htmlFor="th-type">Tipo de TH</Label>
                      <Select 
                        value={formData.th_type} 
                        onValueChange={(value) => setFormData(prev => ({ ...prev, th_type: value }))}
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="feminizante">TH Feminizante</SelectItem>
                          <SelectItem value="masculinizante">TH Masculinizante</SelectItem>
                          <SelectItem value="nao-binaria">TH Não-binária</SelectItem>
                          <SelectItem value="considerando">Considerando TH</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="journey-time">Tempo de jornada</Label>
                      <Select 
                        value={formData.journey_time} 
                        onValueChange={(value) => setFormData(prev => ({ ...prev, journey_time: value }))}
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="considerando">Considerando</SelectItem>
                          <SelectItem value="0-6meses">0-6 meses</SelectItem>
                          <SelectItem value="6meses-1ano">6 meses - 1 ano</SelectItem>
                          <SelectItem value="1-2anos">1-2 anos</SelectItem>
                          <SelectItem value="2-5anos">2-5 anos</SelectItem>
                          <SelectItem value="5anos+">5+ anos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card className="card-trans">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="w-6 h-6" />
                  <span>Atividade Recente</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.type === 'post' ? 'bg-trans-blue' : activity.type === 'comment' ? 'bg-trans-pink' : 'bg-safe-green'}`}>
                        {activity.type === 'post' ? <MessageSquare className="w-5 h-5 text-white" /> : activity.type === 'comment' ? <MessageSquare className="w-5 h-5 text-white" /> : <Heart className="w-5 h-5 text-white" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-gray-600">{activity.date}</p>
                      </div>
                      {activity.likes > 0 && <div className="flex items-center space-x-1 text-trans-pink">
                          <Heart className="w-4 h-4" />
                          <span className="text-sm">{activity.likes}</span>
                        </div>}
                    </div>)}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="card-trans">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-6 h-6" />
                  <span>Configurações da Conta</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold">Perfil Público</h4>
                      <p className="text-sm text-gray-600">Permitir que outros vejam seu perfil</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold">Notificações por Email</h4>
                      <p className="text-sm text-gray-600">Receber atualizações da comunidade</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold">Mostrar Jornada Trans</h4>
                      <p className="text-sm text-gray-600">Exibir informações sobre sua jornada</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold">Mensagens Diretas</h4>
                      <p className="text-sm text-gray-600">Permitir mensagens de outros usuários</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-trans">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-6 h-6" />
                  <span>Segurança</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  Alterar Senha
                </Button>
                <Button variant="destructive" className="w-full justify-start">
                  Excluir Conta
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Perfil;
