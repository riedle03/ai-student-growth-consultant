
import React, { useEffect, useRef } from 'react';
import { SparklesIcon, AlertTriangleIcon } from './icons';
import Spinner from './Spinner';

interface ResultDisplayProps {
    isLoading: boolean;
    error: string | null;
    responseHtml: string;
}

const InitialMessage: React.FC = () => (
    <div className="text-center p-8 bg-slate-50 rounded-lg h-full flex flex-col justify-center items-center">
        <SparklesIcon />
        <h2 className="text-lg font-semibold text-slate-700 mt-4">AI 컨설턴트가 솔루션을 제안해 드립니다.</h2>
        <p className="text-slate-500 mt-2">성장 지원이 필요한 학생의 행동 특성이나 어려움을 아래 입력창에 구체적으로 작성해주세요.</p>
    </div>
);

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
    <div className="text-center p-8 bg-red-50 rounded-lg h-full flex flex-col justify-center items-center">
        <AlertTriangleIcon />
        <h2 className="text-lg font-semibold text-red-700 mt-4">오류가 발생했습니다.</h2>
        <p className="text-red-500 mt-2">{message}</p>
    </div>
);

const ResultDisplay: React.FC<ResultDisplayProps> = ({ isLoading, error, responseHtml }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [responseHtml]);

    return (
        <main ref={containerRef} className="flex-grow overflow-y-auto p-6 md:p-8">
            {isLoading && (
                <div className="text-center p-8 h-full flex flex-col justify-center items-center">
                    <Spinner />
                    <span className="text-lg text-slate-600 mt-4">AI 컨설턴트가 분석 중입니다...</span>
                </div>
            )}
            {!isLoading && error && <ErrorMessage message={error} />}
            {!isLoading && !error && responseHtml && (
                 <div className="prose max-w-none prose-slate" dangerouslySetInnerHTML={{ __html: responseHtml }} />
            )}
            {!isLoading && !error && !responseHtml && <InitialMessage />}
        </main>
    );
};

export default ResultDisplay;
