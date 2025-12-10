-- 1. Habilita a extensão UUID (necessária para gerar IDs únicos)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Cria a tabela de paletas
-- Nota: 'user_id' é do tipo TEXT pois o ID vem do Stack Auth externamente,
-- não havendo uma tabela 'auth.users' local neste banco Neon.
CREATE TABLE IF NOT EXISTS public.palettes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  colors JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Cria índice para buscar paletas de um usuário mais rápido
CREATE INDEX IF NOT EXISTS idx_palettes_user_id ON public.palettes(user_id);

-- Opcional: Comentários na tabela e colunas (boas práticas)
COMMENT ON TABLE public.palettes IS 'Armazena as paletas de cores geradas pelos usuários';
COMMENT ON COLUMN public.palettes.user_id IS 'ID do usuário no Stack Auth';
COMMENT ON COLUMN public.palettes.colors IS 'Array JSON contendo as definições de cores';
