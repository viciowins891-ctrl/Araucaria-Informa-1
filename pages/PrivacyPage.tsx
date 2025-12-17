import React, { useEffect } from 'react';

const PrivacyPage: React.FC = () => {
    useEffect(() => {
        document.title = "Política de Privacidade - Araucária Informa";
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl text-zinc-800 dark:text-zinc-200">
            <h1 className="text-4xl font-bold mb-8 text-primary">Política de Privacidade</h1>

            <div className="space-y-6 text-lg leading-relaxed">
                <p>
                    A sua privacidade é importante para nós. É política do <strong>Araucária Informa</strong> respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site <a href="https://araucariainforma.com" className="text-primary hover:underline">Araucária Informa</a>.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">Informações que coletamos</h2>
                <p>
                    Solicitamos informações pessoais, como nome e e-mail, apenas quando realmente precisamos delas para lhe fornecer um serviço (como nossa Newsletter). Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">Uso de Dados</h2>
                <p>
                    Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis ​​para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">Cookies e Publicidade</h2>
                <p>
                    Usamos cookies para melhorar sua experiência em nosso site. Este site usa o <strong>Google AdSense</strong> para exibir anúncios. O Google usa cookies para veicular anúncios com base em suas visitas anteriores ao nosso site ou a outros sites na Internet.
                </p>
                <p>
                    O Google e seus parceiros usam cookies de publicidade para veicular anúncios para nossos usuários com base em sua visita ao nosso site e/ou outros sites na Internet. Os usuários podem optar por desativar a publicidade personalizada visitando as Configurações de anúncios.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">Links para Sites de Terceiros</h2>
                <p>
                    O nosso site pode ter links para sites externos que não são operados por nós. Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas políticas de privacidade.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">Compromisso do Usuário</h2>
                <p>
                    O usuário se compromete a fazer uso adequado dos conteúdos e da informação que o Araucária Informa oferece no site e com caráter enunciativo, mas não limitativo:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Não se envolver em atividades que sejam ilegais ou contrárias à boa fé e à ordem pública;</li>
                    <li>Não difundir propaganda ou conteúdo de natureza racista, xenofóbica, ou azar, qualquer tipo de pornografia ilegal, de apologia ao terrorismo ou contra os direitos humanos;</li>
                    <li>Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares) do Araucária Informa, de seus fornecedores ou terceiros.</li>
                </ul>

                <h2 className="text-2xl font-bold mt-8 mb-4">Mais informações</h2>
                <p>
                    Esperamos que esteja esclarecido e, como mencionado anteriormente, se houver algo que você não tem certeza se precisa ou não, geralmente é mais seguro deixar os cookies ativados, caso interaja com um dos recursos que você usa em nosso site.
                </p>
                <p className="mt-8 text-sm text-zinc-500">
                    Esta política é efetiva a partir de <strong>Dezembro/2025</strong>.
                </p>
            </div>
        </div>
    );
};

export default PrivacyPage;
