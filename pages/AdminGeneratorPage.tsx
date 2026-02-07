
import React, { useState } from 'react';
import { generateDeepArticle } from '../services/aiService';
import { NewsArticle } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';

const AdminGeneratorPage: React.FC = () => {
    const [topic, setTopic] = useState('');
    const [loading, setLoading] = useState(false);
    const [generatedArticle, setGeneratedArticle] = useState<NewsArticle | null>(null);
    const [jsonResult, setJsonResult] = useState('');

    const handleGenerate = async () => {
        setLoading(true);
        setGeneratedArticle(null);
        setJsonResult('');
        try {
            // Gera 1 artigo por vez para garantir qualidade máxima e evitar timeout
            const articles = await generateDeepArticle(topic);
            if (articles && articles.length > 0) {
                const article = articles[0];
                setGeneratedArticle(article);

                // Formata para o arquivo data.ts
                const codeSnippet = `
    {
        id: ${Math.floor(Math.random() * 10000)},
        title: '${article.title.replace(/'/g, "\\'")}',
        summary: '${article.summary.replace(/'/g, "\\'")}',
        content: \`
${article.content}
        \`,
        imageUrl: '${article.imageUrl}',
        category: '${article.category}',
        categoryColor: '${article.categoryColor}',
        internalImageUrl: '', // Cole aqui a URL da imagem interna (opcional)
        publishDate: '${article.publishDate}',
        author: '${article.author}',
        sourceName: '${article.sourceName || ''}'
    },`;
                setJsonResult(codeSnippet);
            }
        } catch (error) {
            alert("Erro ao gerar. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(jsonResult);
        alert("Código copiado! Agora cole no arquivo 'data.ts' dentro do array 'newsArticles'.");
    };

    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState('');

    const [activeTab, setActiveTab] = useState<'articles' | 'jobs'>('articles');

    // States para Vagas
    const [jobForm, setJobForm] = useState({
        title: '',
        company: '',
        description: '',
        salary: '',
        type: 'CLT',
        location: 'Araucária',
        contactLink: ''
    });
    const [jobStatus, setJobStatus] = useState('');

    const handleJobSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { jobsService } = await import('../services/JobsService');
            // @ts-ignore
            const success = await jobsService.addJob(jobForm);

            if (success) {
                setJobStatus('Vaga publicada com sucesso!');
                setJobForm({
                    title: '',
                    company: '',
                    description: '',
                    salary: '',
                    type: 'CLT',
                    location: 'Araucária',
                    contactLink: ''
                });
                setTimeout(() => setJobStatus(''), 3000);
            } else {
                setJobStatus('Erro ao publicar vaga. Verifique o console.');
            }
        } catch (e) {
            setJobStatus('Erro fatal.');
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'Bia1981#') {
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('Senha incorreta. Tente novamente.');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="container mx-auto px-4 py-20 min-h-[60vh] flex items-center justify-center max-w-md">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full border border-gray-200 dark:border-gray-700">
                    <div className="text-center mb-6">
                        <span className="material-icons text-5xl text-primary mb-2">lock</span>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Área Restrita</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Entre com a senha de administrador</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Senha"
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                autoFocus
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm text-center font-medium bg-red-50 dark:bg-red-900/20 py-2 rounded animate-shake">{error}</p>}
                        <button
                            type="submit"
                            className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-lg shadow-lg shadow-primary/30 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
                        >
                            <span className="material-icons">login</span>
                            Acessar Dashboard
                        </button>
                    </form>

                </div>
            </div>
        );
    }


    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 font-display">
                Painel Administrativo
            </h1>

            {/* Tabs */}
            <div className="flex gap-4 mb-8 border-b border-gray-200 dark:border-gray-700">
                <button
                    onClick={() => setActiveTab('articles')}
                    className={`pb-2 px-4 font-bold border-b-2 transition-colors ${activeTab === 'articles' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                    Gerador de Artigos (IA)
                </button>
                <button
                    onClick={() => setActiveTab('jobs')}
                    className={`pb-2 px-4 font-bold border-b-2 transition-colors ${activeTab === 'jobs' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                    Publicar Vaga
                </button>
            </div>

            {activeTab === 'articles' ? (
                // --- TAB ARTIGOS ---
                <div>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                        Gere artigos originais e profundos para aprovação no AdSense.
                    </p>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 mb-8">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Sobre o que você quer escrever hoje? (Opcional)
                            </label>
                            <input
                                type="text"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                placeholder="Ex: Obras no centro, Festa do Pêssego, Acidente na rodovia..."
                                className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                            />
                        </div>
                        <button
                            onClick={handleGenerate}
                            disabled={loading}
                            className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-lg transition-colors flex justify-center items-center gap-2"
                        >
                            {loading ? <LoadingSpinner /> : (
                                <>
                                    <span className="material-icons">auto_awesome</span>
                                    Gerar Artigo Jornalístico Profundo
                                </>
                            )}
                        </button>
                    </div>

                    {generatedArticle && (
                        <div className="space-y-8">
                            <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                                <h2 className="text-xl font-bold text-green-600 mb-4">Pré-visualização:</h2>
                                <article className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                                    <img src={generatedArticle.imageUrl} alt="Capa" className="w-full h-48 object-cover rounded-lg mb-4" />
                                    <h1 className="text-2xl font-bold mb-2 dark:text-white">{generatedArticle.title}</h1>
                                    <div className="prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: generatedArticle.content || '' }} />
                                </article>
                            </div>

                            <div className="bg-zinc-900 p-6 rounded-xl shadow-lg">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-white font-mono text-lg">Código para data.ts</h2>
                                    <button
                                        onClick={copyToClipboard}
                                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-bold flex items-center gap-2"
                                    >
                                        <span className="material-icons text-sm">content_copy</span>
                                        Copiar Código
                                    </button>
                                </div>
                                <pre className="bg-black text-green-400 p-4 rounded-lg overflow-x-auto text-xs font-mono whitespace-pre-wrap">
                                    {jsonResult}
                                </pre>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                // --- TAB VAGAS ---
                <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Nova Vaga de Emprego</h2>

                    {jobStatus && (
                        <div className={`p-4 mb-6 rounded-lg ${jobStatus.includes('sucesso') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {jobStatus}
                        </div>
                    )}

                    <form onSubmit={handleJobSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Título da Vaga</label>
                                <input required className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    value={jobForm.title} onChange={e => setJobForm({ ...jobForm, title: e.target.value })} placeholder="Ex: Vendedor Externo" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Empresa</label>
                                <input required className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    value={jobForm.company} onChange={e => setJobForm({ ...jobForm, company: e.target.value })} placeholder="Ex: Loja do Centro" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Salário</label>
                                <input required className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    value={jobForm.salary} onChange={e => setJobForm({ ...jobForm, salary: e.target.value })} placeholder="Ex: R$ 1.800 + Comissão" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Tipo de Contrato</label>
                                <select className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    value={jobForm.type} onChange={e => setJobForm({ ...jobForm, type: e.target.value })}>
                                    <option value="CLT">CLT</option>
                                    <option value="PJ">PJ</option>
                                    <option value="Estágio">Estágio</option>
                                    <option value="Temporário">Temporário</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Localização</label>
                            <input required className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                value={jobForm.location} onChange={e => setJobForm({ ...jobForm, location: e.target.value })} placeholder="Ex: Centro, Araucária" />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Link de Contato ou WhatsApp</label>
                            <input required className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                value={jobForm.contactLink} onChange={e => setJobForm({ ...jobForm, contactLink: e.target.value })}
                                placeholder="Ex: https://wa.me/5541999999999 ou mailto:rh@empresa.com" />
                            <p className="text-xs text-gray-500 mt-1">Insira o link completo. Para WhatsApp use: https://wa.me/55 + DDD + Numero</p>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Descrição da Vaga</label>
                            <textarea required rows={4} className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                value={jobForm.description} onChange={e => setJobForm({ ...jobForm, description: e.target.value })}
                                placeholder="Descreva as atividades, horários e requisitos..."></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors shadow-lg"
                        >
                            {loading ? <LoadingSpinner /> : 'Publicar Vaga Agora'}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AdminGeneratorPage;
