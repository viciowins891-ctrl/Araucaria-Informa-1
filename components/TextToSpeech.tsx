import React, { useState, useEffect, useRef } from 'react';

interface TextToSpeechProps {
    text: string;
}

const TextToSpeech: React.FC<TextToSpeechProps> = ({ text }) => {
    // Track initialization to avoid repetitive setups
    const initializedRef = useRef(false);

    // State variables (assuming these exist elsewhere in the original code, not provided in snippet)
    const [supported, setSupported] = useState(false);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [chunks, setChunks] = useState<string[]>([]);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const playingRef = useRef(false);
    const synthesis = useRef(window.speechSynthesis);


    useEffect(() => {
        if (!('speechSynthesis' in window)) return;
        setSupported(true);

        const initVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            if (availableVoices.length > 0) {
                setVoices(availableVoices);
            }
        };

        // Try to load immediately
        initVoices();

        // Also listen for async loading (common in Chrome)
        window.speechSynthesis.onvoiceschanged = initVoices;

    }, []);

    useEffect(() => {
        // Break text into chunks by punctuation to avoid browser timeouts
        if (!text) return;
        // Regex splits by period, exclamation, question mark, but keeps the delimiter.
        // Also split by commas if sentences are too long, to make flow better
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
        utterance.rate = 1.0; // Use current rate state

        // Try to pick a Brazilian voice preferred Google/Microsoft if available
        // Google voices often have lower latency than native OS voices in Chrome
        const ptVoice = voices.find(v => v.lang.includes('pt-BR') && (v.name.includes('Google') || v.name.includes('Microsoft'))) ||
            voices.find(v => v.lang.includes('pt-BR')) ||
            voices[0];

        if (ptVoice) utterance.voice = ptVoice;

        utterance.onend = () => {
            if (playingRef.current) {
                speakChunk(index + 1);
            }
        };

        utterance.onerror = (e) => {
            console.error("Audio error", e);
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

        // Enable playing and start from 0 immediately
        synthesis.current.cancel(); // Clear queue immediately
        playingRef.current = true;
        setIsSpeaking(true);
        setIsPaused(false);

        // removed setTimeout, call directly
        speakChunk(0);
    };

    const handleStop = () => {
        playingRef.current = false;
        synthesis.current.cancel();
        setIsSpeaking(false);
        setIsPaused(false);
    };

    if (!supported) return null;

    return (
        <div className="flex items-center gap-3 bg-white dark:bg-zinc-800 p-2 pr-4 rounded-full border-2 border-primary/10 dark:border-primary/20 shadow-sm hover:border-primary/30 transition-colors group">
            <button
                onClick={handlePlay}
                className={`p-3 rounded-full transition-all active:scale-95 flex items-center justify-center ${isSpeaking
                    ? 'bg-primary text-white shadow-md ring-4 ring-primary/20'
                    : 'bg-primary/10 text-primary hover:bg-primary hover:text-white dark:bg-primary/20 dark:hover:bg-primary'}`}
                title={isSpeaking ? "Pausar Leitura" : "Ouvir Notícia"}
            >
                {isSpeaking && !isPaused ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                ) : (
                    <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                )}
            </button>

            {(isSpeaking || isPaused) && (
                <button
                    onClick={handleStop}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                    title="Parar Leitura"
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" /></svg>
                </button>
            )}

            <div className="flex flex-col">
                <span className="text-xs font-bold text-primary dark:text-primary-light uppercase tracking-wide leading-none mb-0.5">
                    {isSpeaking && !isPaused ? "Lendo..." : isPaused ? "Pausado" : "Ouvir"}
                </span>
                <span className="text-[10px] text-gray-500 dark:text-gray-400 leading-none">
                    Notícia em áudio
                </span>
            </div>
        </div>
    );
};

export default TextToSpeech;
