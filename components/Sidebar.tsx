
import React from 'react';
import { NAV_ITEMS } from '../constants';

interface SidebarProps {
  onOpenClassManager: () => void;
  isOpen: boolean;
  onClose: () => void;
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  onRandomGame: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  onOpenClassManager, 
  isOpen, 
  onClose,
  activeCategory,
  onSelectCategory,
  onRandomGame
}) => {
  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-30 transition-opacity md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar Content */}
      <aside 
        className={`fixed md:sticky top-0 left-0 h-full w-72 bg-background-light dark:bg-background-dark border-r border-slate-200 dark:border-[#233c48] flex flex-col z-40 transform transition-transform duration-300 md:transform-none ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        aria-label="Sidebar Navigation"
      >
        <div className="p-6 flex flex-col h-full justify-between">
          <div className="flex flex-col gap-8">
            {/* Logo */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-primary p-2 rounded-lg text-white">
                  <span className="material-symbols-outlined text-2xl" aria-hidden="true">school</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold tracking-tight">ClassPlay</h1>
                  <p className="text-slate-500 dark:text-[#92b7c9] text-xs">Game Store</p>
                </div>
              </div>
              <button 
                onClick={onClose} 
                className="md:hidden text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white"
                aria-label="Close Sidebar"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-2" aria-label="Main Categories">
              {NAV_ITEMS.map((item) => {
                const isActive = activeCategory === item.label || (activeCategory === 'Store Front' && item.label === 'Store Front');
                return (
                  <button
                    key={item.label}
                    onClick={() => {
                      onSelectCategory(item.label);
                      if (window.innerWidth < 768) onClose();
                    }}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-colors w-full text-left focus:outline-none focus:ring-2 focus:ring-primary ${
                      isActive
                        ? 'bg-primary/10 text-primary font-bold'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#233c48] font-medium'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span className={`material-symbols-outlined ${isActive ? 'fill-1' : ''}`} aria-hidden="true">
                      {item.icon}
                    </span>
                    <span className="text-sm">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Bottom Actions */}
          <div className="mt-auto pt-6">
            <button 
              onClick={() => { onOpenClassManager(); onClose(); }}
              className="w-full mb-3 flex items-center justify-center gap-2 rounded-xl h-12 bg-white dark:bg-[#1a2b34] text-slate-700 dark:text-white font-bold border border-slate-200 dark:border-[#233c48] hover:bg-slate-50 dark:hover:bg-[#233c48] transition-all shadow-sm focus:outline-none focus:ring-4 focus:ring-slate-200 dark:focus:ring-slate-700"
              aria-label="Open Class Lists Manager"
            >
              <span className="material-symbols-outlined" aria-hidden="true">group</span>
              <span>Class lists</span>
            </button>
            
            <button 
              onClick={() => {
                onRandomGame();
                onClose();
              }}
              className="w-full flex items-center justify-center gap-2 rounded-xl h-12 bg-primary text-white font-bold hover:brightness-110 transition-all shadow-lg shadow-primary/20 focus:outline-none focus:ring-4 focus:ring-primary/50"
              aria-label="Launch a Random Game"
            >
              <span className="material-symbols-outlined" aria-hidden="true">shuffle</span>
              <span>Random Game</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
