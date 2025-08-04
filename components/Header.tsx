
import React from 'react';
import { BotIcon } from './icons';

const Header: React.FC = () => {
    return (
        <header className="p-6 border-b border-slate-200 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center space-x-3">
                <div className="bg-sky-500 p-2 rounded-lg">
                    <BotIcon />
                </div>
                <h1 className="text-xl md:text-2xl font-bold text-slate-800">학생 맞춤형 성장 솔루션 제안</h1>
            </div>
            <span className="text-sm font-semibold text-slate-500">AI 교육공학 컨설턴트</span>
        </header>
    );
};

export default Header;
