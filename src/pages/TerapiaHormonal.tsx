
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Heart, Users, Shield, Calendar, AlertCircle, CheckCircle } from "lucide-react";

const TerapiaHormonal = () => {
  const faqItems = [
    {
      question: "O que é terapia hormonal?",
      answer: "A terapia hormonal é um tratamento médico que utiliza hormônios para ajudar pessoas trans a desenvolver características físicas que se alinhem com sua identidade de gênero. É um processo gradual e supervisionado por profissionais de saúde especializados."
    },
    {
      question: "Quando posso começar a terapia hormonal?",
      answer: "O início da terapia hormonal depende de vários fatores, incluindo idade, acompanhamento psicológico e avaliação médica. É essencial ter o acompanhamento de profissionais especializados em saúde trans para determinar o momento adequado."
    },
    {
      question: "Quais são os efeitos da testosterona?",
      answer: "Os efeitos da testosterona incluem: engrossamento da voz, crescimento de pelos faciais e corporais, redistribuição de gordura, crescimento muscular, interrupção da menstruação e mudanças no humor. Os efeitos variam de pessoa para pessoa."
    },
    {
      question: "Quais são os efeitos do estrogênio?",
      answer: "Os efeitos do estrogênio incluem: desenvolvimento mamário, redistribuição de gordura corporal, pele mais macia, diminuição da massa muscular, mudanças emocionais e redução dos pelos corporais. Os resultados são graduais e individuais."
    },
    {
      question: "É seguro fazer terapia hormonal?",
      answer: "Quando feita com acompanhamento médico adequado, a terapia hormonal é considerada segura. É importante fazer exames regulares, seguir as prescrições médicas e manter comunicação aberta com a equipe de saúde."
    },
    {
      question: "Quanto tempo leva para ver resultados?",
      answer: "Os primeiros efeitos podem aparecer em algumas semanas, mas mudanças significativas geralmente levam meses a anos. Cada corpo responde de forma diferente, e é importante ter paciência e expectativas realistas."
    }
  ];

  const masculineEffects = [
    { effect: "Engrossamento da voz", timeline: "3-12 meses", permanent: true },
    { effect: "Crescimento de pelos faciais", timeline: "6-24 meses", permanent: true },
    { effect: "Interrupção da menstruação", timeline: "1-6 meses", permanent: false },
    { effect: "Redistribuição de gordura", timeline: "6-24 meses", permanent: false },
    { effect: "Crescimento muscular", timeline: "6-24 meses", permanent: false },
    { effect: "Crescimento do clitóris", timeline: "1-6 meses", permanent: true }
  ];

  const feminineEffects = [
    { effect: "Desenvolvimento mamário", timeline: "6-24 meses", permanent: true },
    { effect: "Redistribuição de gordura", timeline: "6-24 meses", permanent: false },
    { effect: "Pele mais macia", timeline: "1-6 meses", permanent: false },
    { effect: "Redução massa muscular", timeline: "3-12 meses", permanent: false },
    { effect: "Mudanças emocionais", timeline: "1-3 meses", permanent: false },
    { effect: "Redução pelos corporais", timeline: "6-12 meses", permanent: false }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Terapia <span className="gradient-text">Hormonal</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Informações completas e acessíveis sobre terapia hormonal para pessoas trans. 
            Conheça os processos, efeitos e cuidados necessários para uma jornada segura.
          </p>
        </div>

        {/* Alert Info */}
        <Card className="mb-8 border-amber-200 bg-amber-50">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-amber-800 mb-2">Importante</h3>
                <p className="text-amber-700">
                  As informações desta página são apenas educativas. Sempre consulte profissionais de saúde 
                  especializados antes de iniciar qualquer tratamento hormonal. Cada pessoa é única e merece 
                  cuidado individualizado.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Introduction */}
        <Card className="mb-12 card-trans">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="w-6 h-6 text-trans-pink" />
              <span>O que é Terapia Hormonal</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              A terapia hormonal de afirmação de gênero é um tratamento médico que utiliza hormônios 
              para ajudar pessoas transgênero a desenvolver características físicas secundárias que 
              se alinhem com sua identidade de gênero.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Este processo é gradual, reversível em muitos aspectos, e deve sempre ser supervisionado 
              por profissionais de saúde experientes em cuidados trans. O objetivo é proporcionar 
              bem-estar físico e emocional através do alinhamento corporal com a identidade de gênero.
            </p>
          </CardContent>
        </Card>

        {/* Hormonal Effects Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Masculine Effects */}
          <Card className="card-trans">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded bg-gradient-to-r from-trans-blue to-blue-500"></div>
                <span>Terapia com Testosterona</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                Efeitos esperados da terapia hormonal masculinizante:
              </p>
              <div className="space-y-4">
                {masculineEffects.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-trans-blue" />
                      <span className="font-medium">{item.effect}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">{item.timeline}</div>
                      <Badge variant={item.permanent ? "default" : "secondary"} className="text-xs">
                        {item.permanent ? "Permanente" : "Reversível"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Feminine Effects */}
          <Card className="card-trans">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded bg-gradient-to-r from-trans-pink to-pink-500"></div>
                <span>Terapia com Estrogênio</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                Efeitos esperados da terapia hormonal feminizante:
              </p>
              <div className="space-y-4">
                {feminineEffects.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-pink-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-trans-pink" />
                      <span className="font-medium">{item.effect}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">{item.timeline}</div>
                      <Badge variant={item.permanent ? "default" : "secondary"} className="text-xs">
                        {item.permanent ? "Permanente" : "Reversível"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Safety Guidelines */}
        <Card className="mb-12 card-trans">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-6 h-6 text-safe-green" />
              <span>Diretrizes de Segurança</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-safe-green">Cuidados Essenciais:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-safe-green" />
                    <span>Acompanhamento médico regular</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-safe-green" />
                    <span>Exames de sangue periódicos</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-safe-green" />
                    <span>Seguir prescrições médicas</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-safe-green" />
                    <span>Comunicação aberta com médicos</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-amber-600">Sinais de Alerta:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <span>Dores no peito ou pernas</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <span>Mudanças súbitas de humor</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <span>Problemas de pele graves</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <span>Efeitos colaterais intensos</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card className="card-trans">
          <CardHeader>
            <CardTitle>Perguntas Frequentes</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TerapiaHormonal;
