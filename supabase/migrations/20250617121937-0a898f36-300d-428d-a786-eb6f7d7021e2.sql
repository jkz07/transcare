
-- Remover políticas restritivas existentes para agenda_events
DROP POLICY IF EXISTS "Usuários podem ver seus próprios eventos" ON public.agenda_events;

-- Criar nova política que permite qualquer um ver todos os eventos
CREATE POLICY "Qualquer um pode ver eventos" 
  ON public.agenda_events FOR SELECT 
  USING (true);

-- Manter as políticas de criação, atualização e exclusão apenas para usuários autenticados
-- (as políticas de INSERT, UPDATE e DELETE já existem e estão corretas)

-- Atualizar tabela de perfis para remover colunas desnecessárias
ALTER TABLE public.profiles 
DROP COLUMN IF EXISTS pronouns,
DROP COLUMN IF EXISTS bio,
DROP COLUMN IF EXISTS age;

-- Adicionar coluna de data de nascimento
ALTER TABLE public.profiles 
ADD COLUMN birth_date DATE;

-- Atualizar a função handle_new_user para não incluir campos removidos
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, name, birth_date, location, th_type, journey_time)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'name', 'Usuário'),
    CASE 
      WHEN NEW.raw_user_meta_data ->> 'birth_date' IS NOT NULL 
      THEN (NEW.raw_user_meta_data ->> 'birth_date')::DATE
      ELSE NULL 
    END,
    NEW.raw_user_meta_data ->> 'location',
    NEW.raw_user_meta_data ->> 'th_type',
    NEW.raw_user_meta_data ->> 'journey_time'
  );
  RETURN NEW;
END;
$$;
