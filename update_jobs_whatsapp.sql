-- Atualiza TODAS as vagas para direcionar ao seu WhatsApp
-- Com mensagem personalizada automática incluindo o nome da vaga!

UPDATE jobs
SET contact_link = 'https://wa.me/5541999904961?text=Olá, vi a vaga de ' || title || ' no Araucaria Informa e gostaria de me candidatar.';
