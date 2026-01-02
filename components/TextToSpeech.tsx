import React, { useState, useEffect } from 'react';

interface TextToSpeechProps {
    text: string;
}

const TextToSpeech: React.FC<TextToSpeechProps> = ({ text }) => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);
    const [supported, setSupported] = useState(false);

    useEffect(() => {
        if ('speechSynthesis' in window) {
            setSupported(true);
        }
    }, []);

    useEffect(() => {
        // Cancel active speech when unmounting or text changing
        return () => {
            window.speechSynthesis.cancel();
        };
    }, [text]);

    const handlePlay = () => {
        if (isPaused) {
            window.speechSynthesis.resume();
            setIsPaused(false);
            setIsSpeaking(true);
            return;
        }

        if (isSpeaking) {
            window.speechSynthesis.pause();
            setIsPaused(true);
            setIsSpeaking(false);
            return;
        }

        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'pt-BR'; // Portuguese Brazil
        u.onend = () => {
            setIsSpeaking(false);
            setIsPaused(false);
        };

        // Try to find a good voice
        const voices = window.speechSynthesis.getVoices();
        const ptVoice = voices.find(v => v.lang.includes('pt-BR'));
        if (ptVoice) u.voice = ptVoice;

        setUtterance(u);
        window.speechSynthesis.speak(u);
        setIsSpeaking(true);
    };

    const handleStop = () => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        setIsPaused(false);
    };

    if (!supported) return null;

    return (
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-zinc-800 p-2 rounded-lg border border-gray-200 dark:border-zinc-700">
            <button
                onClick={handlePlay}
                className={`p-2 rounded-full transition-colors flex items-center justify-center ${isSpeaking
                    ? 'bg-primary text-white shadow-md'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700'}`}
                title={isSpeaking ? "Pausar Leitura" : "Ouvir Notícia"}
            >
                {isSpeaking ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                )}
            </button>

            {(isSpeaking || isPaused) && (
                <button
                    onClick={handleStop}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                    title="Parar Leitura"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" /></svg>
                </button>
            )}

            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 select-none">
                {isSpeaking ? "Lendo..." : "Ouvir"}
            </span>
        </div>
    );
};

export default TextToSpeech;
