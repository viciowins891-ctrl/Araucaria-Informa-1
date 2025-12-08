
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

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 font-display">
                Painel de Redação (IA)
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
                Gere artigos originais e profundos para aprovação no AdSense. 
                Use esta ferramenta para criar o conteúdo, copie o código e cole no arquivo <code>data.ts</code>.
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
                        className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
                <p className="text-xs text-gray-500 mt-2 text-center">Isso pode levar até 20 segundos. A IA está pesquisando e escrevendo.</p>
            </div>

            {generatedArticle && (
                <div className="space-y-8">
                    {/* Preview Visual */}
                    <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                        <h2 className="text-xl font-bold text-green-600 mb-4">Pré-visualização do Artigo:</h2>
                        <article className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                            <img src={generatedArticle.imageUrl} alt="Capa" className="w-full h-48 object-cover rounded-lg mb-4"/>
                            <h1 className="text-2xl font-bold mb-2 dark:text-white">{generatedArticle.title}</h1>
                            <div className="prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{__html: generatedArticle.content || ''}} />
                        </article>
                    </div>

                    {/* Área de Código */}
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
    );
};

export default AdminGeneratorPage;
