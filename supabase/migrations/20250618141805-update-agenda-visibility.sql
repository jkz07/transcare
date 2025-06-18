
-- Remover a política restritiva de visualização
DROP POLICY IF EXISTS "Users can view their own events" ON public.agenda_events;

-- Criar nova política que permite qualquer um ver todos os eventos
CREATE POLICY "Anyone can view events" 
  ON public.agenda_events 
  FOR SELECT 
  USING (true);

-- As políticas de INSERT, UPDATE e DELETE permanecem inalteradas
-- para manter a segurança na criação e edição de eventos
