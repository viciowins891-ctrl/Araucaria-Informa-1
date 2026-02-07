-- Garante que o usuario publico possa VER as vagas
DROP POLICY IF EXISTS "Public can view jobs" ON jobs;
CREATE POLICY "Public can view jobs" ON jobs FOR SELECT USING (true);

-- Permite inserção também (para o admin logado ou anonimo, já que estamos sem auth completo)
DROP POLICY IF EXISTS "Public can insert jobs" ON jobs;
CREATE POLICY "Public can insert jobs" ON jobs FOR INSERT WITH CHECK (true);

-- Permite update
DROP POLICY IF EXISTS "Public can update jobs" ON jobs;
CREATE POLICY "Public can update jobs" ON jobs FOR UPDATE USING (true);

-- Permite delete
DROP POLICY IF EXISTS "Public can delete jobs" ON jobs;
CREATE POLICY "Public can delete jobs" ON jobs FOR DELETE USING (true);

-- Habilita RLS (mas tudo liberado acima)
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
