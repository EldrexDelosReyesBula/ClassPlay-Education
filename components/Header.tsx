import React from 'react';

interface HeaderProps {
  onMenuClick: () => void;
  onSettingsClick: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onMenuClick, 
  onSettingsClick,
  searchQuery,
  setSearchQuery
}) => {
  return (
    <header className="flex items-center justify-between px-4 md:px-8 py-4 sticky top-0 bg-slate-50/80 dark:bg-[#0b1419]/80 backdrop-blur-md z-10 border-b border-slate-200 dark:border-[#233c48]">
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2 -ml-2 text-slate-600 dark:text-white"
          aria-label="Open Menu"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        
        <div className="relative w-full max-w-xl">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#92b7c9]">
            search
          </span>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-12 pr-4 rounded-xl border-none bg-slate-200/50 dark:bg-[#233c48] text-slate-900 dark:text-white placeholder:text-[#92b7c9] focus:ring-2 focus:ring-primary transition-all outline-none"
            placeholder="Search games..."
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center gap-4 ml-4">
        <button 
          onClick={onSettingsClick}
          className="flex items-center justify-center size-11 rounded-xl bg-white dark:bg-[#233c48] text-slate-600 dark:text-white border border-slate-200 dark:border-none shadow-sm hover:bg-slate-50 dark:hover:brightness-110 transition-all"
          aria-label="Open Settings"
        >
          <span className="material-symbols-outlined">settings</span>
        </button>
      </div>
    </header>
  );
};