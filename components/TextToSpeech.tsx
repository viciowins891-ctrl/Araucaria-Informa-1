import React, { useState, useEffect, useRef } from 'react';

interface TextToSpeechProps {
    text: string;
}

const TextToSpeech: React.FC<TextToSpeechProps> = ({ text }) => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [supported, setSupported] = useState(false);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

    // Chunking for better performance on long texts
    const [chunks, setChunks] = useState<string[]>([]);

    const synthesis = useRef(window.speechSynthesis);
    const playingRef = useRef(false);

    useEffect(() => {
        if ('speechSynthesis' in window) {
            setSupported(true);

            const loadVoices = () => {
                const availableVoices = window.speechSynthesis.getVoices();
                setVoices(availableVoices);
            };

            window.speechSynthesis.onvoiceschanged = loadVoices;
            loadVoices();
        }
    }, []);

    useEffect(() => {
        // Break text into chunks by punctuation to avoid browser timeouts
        if (!text) return;
        // Regex splits by period, exclamation, question mark, but keeps the delimiter.
        const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [text];
        setChunks(sentences);

        return () => {
            playingRef.current = false;
            synthesis.current.cancel();
        };
    }, [text]);

    const speakChunk = (index: number) => {
        if (!playingRef.current) return;

        // If finished all chunks
        if (index >= chunks.length) {
            setIsSpeaking(false);
            playingRef.current = false;
            return;
        }

        const utterance = new SpeechSynthesisUtterance(chunks[index]);
        utterance.lang = 'pt-BR';
        utterance.rate = 1.0;

        // Try to pick a Brazilian voice
        const ptVoice = voices.find(v => v.lang.includes('pt-BR')) || voices[0];
        if (ptVoice) utterance.voice = ptVoice;

        utterance.onend = () => {
            if (playingRef.current) {
                speakChunk(index + 1);
            }
        };

        utterance.onerror = (e) => {
            console.error("Audio error", e);
            // On error, try to skip to next or stop? Let's stop to be safe.
            setIsSpeaking(false);
            playingRef.current = false;
        };

        synthesis.current.speak(utterance);
    };

    const handlePlay = () => {
        if (isPaused) {
            synthesis.current.resume();
            setIsPaused(false);
            setIsSpeaking(true);
            return;
        }

        if (isSpeaking) {
            synthesis.current.pause();
            setIsPaused(true);
            setIsSpeaking(false);
            return;
        }

        // Enable playing and start from 0
        synthesis.current.cancel(); // Clear queue
        playingRef.current = true;
        setIsSpeaking(true);
        setIsPaused(false);

        // Small delay to ensure cancel is processed
        setTimeout(() => speakChunk(0), 50);
    };

    const handleStop = () => {
        playingRef.current = false;
        synthesis.current.cancel();
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
                {isSpeaking && !isPaused ? (
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
                {isSpeaking && !isPaused ? "Lendo..." : isPaused ? "Pausado" : "Ouvir"}
            </span>
        </div>
    );
};

export default TextToSpeech;
