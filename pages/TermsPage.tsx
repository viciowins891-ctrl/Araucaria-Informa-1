
import React from 'react';

const TermsPage: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 font-display">Termos de Uso</h1>
            
            <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                <h3>1. Aceitação dos Termos</h3>
                <p>
                    Ao acessar e usar o site <strong>Araucária Informa</strong>, você aceita e concorda em estar vinculado aos termos e disposições deste acordo. Se você não concordar em cumprir estes termos, por favor, não use nosso site.
                </p>

                <h3>2. Uso do Conteúdo</h3>
                <p>
                    Todo o conteúdo fornecido neste site é apenas para fins informativos. O proprietário deste site não faz representações quanto à precisão ou integridade de qualquer informação neste site ou encontrada seguindo qualquer link neste site.
                </p>
                <p>
                    O conteúdo, layout, design, dados, gráficos e marcas registradas neste site são protegidos por leis de propriedade intelectual e são de propriedade do Araucária Informa ou de seus licenciadores.
                </p>

                <h3>3. Conduta do Usuário</h3>
                <p>Você concorda em não usar o site para:</p>
                <ul>
                    <li>Violar qualquer lei local, estadual, nacional ou internacional aplicável;</li>
                    <li>Enviar publicidade não solicitada ou não autorizada (spam);</li>
                    <li>Transmitir vírus ou qualquer outro código de natureza destrutiva.</li>
                </ul>

                <h3>4. Links Externos</h3>
                <p>
                    Nosso site pode conter links para sites de terceiros que não são de nossa propriedade ou controlados por nós. 
                    Não temos controle sobre, e não assumimos responsabilidade pelo conteúdo, políticas de privacidade ou práticas de quaisquer sites de terceiros.
                </p>

                <h3>5. Isenção de Responsabilidade</h3>
                <p>
                    As informações contidas neste site são fornecidas "como estão". O Araucária Informa não oferece garantias, expressas ou implícitas, e por meio deste isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização.
                </p>

                <h3>6. Alterações nos Termos</h3>
                <p>
                    O Araucária Informa reserva-se o direito de modificar estes termos a qualquer momento. Você deve verificar esta página periodicamente para alterações. O uso continuado do site após a publicação de alterações constituirá sua aceitação das mesmas.
                </p>

                <h3>7. Contato</h3>
                <p>
                    Para quaisquer questões relacionadas a estes termos, entre em contato através do e-mail: humberto_485@hotmail.com.
                </p>
            </div>
        </div>
    );
};

export default TermsPage;
