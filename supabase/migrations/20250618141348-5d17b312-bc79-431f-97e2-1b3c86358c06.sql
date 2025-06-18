
-- Habilitar RLS na tabela agenda_events
ALTER TABLE public.agenda_events ENABLE ROW LEVEL SECURITY;

-- Política para permitir que usuários vejam apenas seus próprios eventos
CREATE POLICY "Users can view their own events" 
  ON public.agenda_events 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Política para permitir que usuários criem seus próprios eventos
CREATE POLICY "Users can create their own events" 
  ON public.agenda_events 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Política para permitir que usuários atualizem seus próprios eventos
CREATE POLICY "Users can update their own events" 
  ON public.agenda_events 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Política para permitir que usuários excluam seus próprios eventos
CREATE POLICY "Users can delete their own events" 
  ON public.agenda_events 
  FOR DELETE 
  USING (auth.uid() = user_id);
