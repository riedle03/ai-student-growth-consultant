
import React, { useRef } from 'react';
import { SendHorizontalIcon } from './icons';

interface InputAreaProps {
    userInput: string;
    setUserInput: (value: string) => void;
    onSubmit: () => void;
    isLoading: boolean;
}

const InputArea: React.FC<InputAreaProps> = ({ userInput, setUserInput, onSubmit, isLoading }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserInput(e.target.value);
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (!isLoading) {
                onSubmit();
            }
        }
    };

    return (
        <div className="p-4 md:p-6 border-t border-slate-200 flex-shrink-0 bg-white">
            <div className="flex items-end space-x-4">
                <textarea
                    ref={textareaRef}
                    value={userInput}
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                    rows={1}
                    className="flex-grow p-3 bg-slate-100 rounded-lg focus:ring-2 focus:ring-sky-400 focus:outline-none resize-none transition-all duration-200 max-h-40"
                    placeholder="예: 수업 시간에 계속 떠들고 집중하지 못해요."
                    disabled={isLoading}
                />
                <button
                    onClick={onSubmit}
                    disabled={isLoading || !userInput.trim()}
                    className="bg-sky-500 hover:bg-sky-600 text-white font-bold p-3 rounded-lg flex items-center justify-center transition-colors shadow hover:shadow-md disabled:bg-slate-400 disabled:cursor-not-allowed"
                >
                    <SendHorizontalIcon />
                </button>
            </div>
        </div>
    );
};

export default InputArea;
