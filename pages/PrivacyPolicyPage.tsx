
import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 font-display">Política de Privacidade</h1>
            
            <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                <p>Última atualização: 05 de Dezembro de 2025</p>

                <h3>1. Introdução</h3>
                <p>
                    O <strong>Araucária Informa</strong> compromete-se a proteger a sua privacidade. Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos suas informações quando você visita nosso site.
                </p>

                <h3>2. Coleta de Dados</h3>
                <p>Podemos coletar informações pessoais que você nos fornece voluntariamente, como:</p>
                <ul>
                    <li>Endereço de e-mail (ao assinar nossa newsletter);</li>
                    <li>Nome (ao entrar em contato conosco).</li>
                </ul>
                <p>
                    Também coletamos automaticamente certas informações quando você visita o site, como seu endereço IP, tipo de navegador, sistema operacional, URLs de referência e dados de interação com o site.
                </p>

                <h3>3. Uso de Cookies e Tecnologias de Rastreamento</h3>
                <p>
                    Utilizamos cookies e tecnologias semelhantes para rastrear a atividade em nosso serviço e armazenar certas informações. 
                    Cookies são arquivos com pequena quantidade de dados que podem incluir um identificador exclusivo anônimo.
                </p>
                <p>
                    Utilizamos cookies de terceiros, incluindo o <strong>Google AdSense</strong> e <strong>Google Analytics</strong>. 
                    O Google usa cookies para veicular anúncios com base em suas visitas anteriores ao nosso site ou a outros sites na Internet.
                    Os usuários podem optar por sair da publicidade personalizada visitando as Configurações de Anúncios do Google.
                </p>

                <h3>4. Publicidade (Google AdSense)</h3>
                <p>
                    Este site utiliza o Google AdSense para veicular anúncios. O Google pode usar cookies DART para exibir anúncios aos nossos usuários com base em sua visita ao nosso site e a outros sites na Internet. 
                    O Araucária Informa não tem acesso ou controle sobre esses cookies que são usados por anunciantes terceiros.
                </p>

                <h3>5. Compartilhamento de Informações</h3>
                <p>
                    Não vendemos, trocamos ou alugamos suas informações de identificação pessoal para terceiros. Podemos compartilhar informações demográficas agregadas genéricas não vinculadas a nenhuma informação de identificação pessoal.
                </p>

                <h3>6. Segurança</h3>
                <p>
                    Adotamos práticas adequadas de coleta, armazenamento e processamento de dados e medidas de segurança para proteger contra acesso não autorizado, alteração, divulgação ou destruição de seus dados pessoais.
                </p>

                <h3>7. Seus Direitos</h3>
                <p>
                    Você tem o direito de acessar, corrigir ou excluir suas informações pessoais. Se você assinou nossa newsletter, pode cancelar a inscrição a qualquer momento seguindo as instruções incluídas em cada e-mail.
                </p>

                <h3>8. Contato</h3>
                <p>
                    Se você tiver dúvidas sobre esta Política de Privacidade, entre em contato conosco através da nossa página de contato ou pelo e-mail: humberto_485@hotmail.com.
                </p>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;
