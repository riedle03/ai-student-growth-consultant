
import React, { useState, useCallback } from 'react';
import { marked } from 'marked';
import Header from './components/Header';
import InputArea from './components/InputArea';
import ResultDisplay from './components/ResultDisplay';
import { generateSolutionStream } from './services/geminiService';

function App() {
    const [userInput, setUserInput] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isStreaming, setIsStreaming] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [apiResponse, setApiResponse] = useState<string>('');

    const handleSubmit = useCallback(async () => {
        if (!userInput.trim()) {
            setApiResponse('');
            setError('학생의 특성을 입력해주세요.');
            return;
        }

        setIsLoading(true);
        setIsStreaming(true);
        setError(null);
        setApiResponse('');

        let fullResponse = '';
        let isFirstChunk = true;

        try {
            await generateSolutionStream(userInput, (chunk) => {
                if (isFirstChunk) {
                    setIsLoading(false); // Hide spinner and start showing the response
                    isFirstChunk = false;
                }
                fullResponse += chunk;
                setApiResponse(marked.parse(fullResponse) as string);
            });
            
            // If the stream finishes without any data, ensure the loading spinner is turned off.
            if (isFirstChunk) {
                setIsLoading(false);
            }
        } catch (err) {
            console.error(err);
            const errorMessage = err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.';
            setError(`분석 요청 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요. (${errorMessage})`);
            setIsLoading(false); // Ensure loading is off on error
        } finally {
            setIsStreaming(false);
            setUserInput('');
        }
    }, [userInput]);

    const responseHtml = apiResponse + (isStreaming ? '<span class="blinking-cursor"></span>' : '');

    return (
        <div className="text-slate-800 flex items-center justify-center min-h-screen p-4 bg-slate-100">
            <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl flex flex-col" style={{ height: '90vh' }}>
                <Header />
                <ResultDisplay
                    isLoading={isLoading}
                    error={error}
                    responseHtml={responseHtml}
                />
                <InputArea
                    userInput={userInput}
                    setUserInput={setUserInput}
                    onSubmit={handleSubmit}
                    isLoading={isLoading || isStreaming}
                />
                 <footer className="p-4 md:p-6 border-t border-slate-200 flex-shrink-0 bg-white rounded-b-2xl">
                    <p className="text-center text-xs text-slate-400">© 2025 이대형. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
}

export default App;
