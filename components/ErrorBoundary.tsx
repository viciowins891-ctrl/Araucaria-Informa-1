
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
                    <h1 className="text-3xl font-bold text-red-500 mb-4">Ops! Algo deu errado.</h1>
                    <p className="text-xl mb-4">Ocorreu um erro ao renderizar a página.</p>
                    <div className="bg-black p-4 rounded border border-gray-700 max-w-2xl overflow-auto">
                        <code className="text-sm font-mono text-red-300">
                            {this.state.error && this.state.error.toString()}
                        </code>
                    </div>
                    <button
                        className="mt-6 px-6 py-2 bg-blue-600 rounded hover:bg-blue-700"
                        onClick={() => window.location.reload()}
                    >
                        Tentar Novamente
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
