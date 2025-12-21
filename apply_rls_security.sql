-- Arquivo de Segurança RLS (Row Level Security) para o Araucária Informa
-- Instruções:
-- 1. Copie todo o conteúdo deste arquivo.
-- 2. No painel do Supabase, vá em "SQL Editor".
-- 3. Cole e execute (Run).

-- Habilitar RLS em todas as tabelas (caso ainda não esteja)
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;

-- -----------------------------------------------------------------------------
-- Remover políticas antigas para evitar conflitos (opcional, mas recomendado)
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Public News Access" ON public.news;
DROP POLICY IF EXISTS "Admin News Insert" ON public.news;
DROP POLICY IF EXISTS "Admin News Update" ON public.news;
DROP POLICY IF EXISTS "Admin News Delete" ON public.news;

DROP POLICY IF EXISTS "Public Events Access" ON public.events;
DROP POLICY IF EXISTS "Admin Events Insert" ON public.events;
DROP POLICY IF EXISTS "Admin Events Update" ON public.events;
DROP POLICY IF EXISTS "Admin Events Delete" ON public.events;

DROP POLICY IF EXISTS "Public Business Access" ON public.businesses;
DROP POLICY IF EXISTS "Admin Business Insert" ON public.businesses;
DROP POLICY IF EXISTS "Admin Business Update" ON public.businesses;
DROP POLICY IF EXISTS "Admin Business Delete" ON public.businesses;

-- -----------------------------------------------------------------------------
-- Criar Novas Políticas de Segurança
-- -----------------------------------------------------------------------------

-- NOTÍCIAS (NEWS)
-- Qualquer um pode LER
CREATE POLICY "Public News Access" ON public.news
FOR SELECT USING (true);

-- Apenas usuários AUTENTICADOS podem INSERIR
CREATE POLICY "Admin News Insert" ON public.news
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Apenas usuários AUTENTICADOS podem ATUALIZAR
CREATE POLICY "Admin News Update" ON public.news
FOR UPDATE USING (auth.role() = 'authenticated');

-- Apenas usuários AUTENTICADOS podem DELETAR
CREATE POLICY "Admin News Delete" ON public.news
FOR DELETE USING (auth.role() = 'authenticated');


-- EVENTOS (EVENTS)
-- Qualquer um pode LER
CREATE POLICY "Public Events Access" ON public.events
FOR SELECT USING (true);

-- Apenas usuários AUTENTICADOS podem INSERIR
CREATE POLICY "Admin Events Insert" ON public.events
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Apenas usuários AUTENTICADOS podem ATUALIZAR
CREATE POLICY "Admin Events Update" ON public.events
FOR UPDATE USING (auth.role() = 'authenticated');

-- Apenas usuários AUTENTICADOS podem DELETAR
CREATE POLICY "Admin Events Delete" ON public.events
FOR DELETE USING (auth.role() = 'authenticated');


-- COMÉRCIO (BUSINESSES)
-- Qualquer um pode LER
CREATE POLICY "Public Business Access" ON public.businesses
FOR SELECT USING (true);

-- Apenas usuários AUTENTICADOS podem INSERIR
CREATE POLICY "Admin Business Insert" ON public.businesses
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Apenas usuários AUTENTICADOS podem ATUALIZAR
CREATE POLICY "Admin Business Update" ON public.businesses
FOR UPDATE USING (auth.role() = 'authenticated');

-- Apenas usuários AUTENTICADOS podem DELETAR
CREATE POLICY "Admin Business Delete" ON public.businesses
FOR DELETE USING (auth.role() = 'authenticated');

