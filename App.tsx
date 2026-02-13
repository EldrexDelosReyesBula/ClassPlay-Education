import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { HeroCard } from './components/HeroCard';
import { GameCard } from './components/GameCard';
import { GameDetailsModal } from './components/GameDetailsModal';
import { ClassManager } from './components/ClassManager';
import { SettingsModal } from './components/SettingsModal';
import { ActiveTool } from './components/ActiveTool';
import { GAMES, HERO_GAMES } from './constants';
import { Game, HeroGame } from './types';

const App: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [activeGameId, setActiveGameId] = useState<string | null>(null);
  const [isClassManagerOpen, setIsClassManagerOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [randomHeroes, setRandomHeroes] = useState<HeroGame[]>([]);
  
  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Store Front');

  // Randomize recommendations on mount
  useEffect(() => {
    const shuffled = [...HERO_GAMES].sort(() => 0.5 - Math.random());
    setRandomHeroes(shuffled);
  }, []);

  // Helper to find game object by ID (checking both lists)
  const getActiveGame = (id: string) => {
    return [...GAMES, ...HERO_GAMES].find(g => g.id === id);
  };

  const handlePlayGame = (gameId: string) => {
    setActiveGameId(gameId);
    setSelectedGame(null); // Close modal if open
  };

  const handleRandomGame = () => {
    const randomGame = GAMES[Math.floor(Math.random() * GAMES.length)];
    setActiveGameId(randomGame.id);
  };

  // Filter Logic
  const filteredGames = GAMES.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          game.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesCategory = true;
    if (activeCategory !== 'Store Front') {
      matchesCategory = game.category === activeCategory;
    }

    return matchesSearch && matchesCategory;
  });

  const displayGames = activeCategory === 'Store Front' && !searchQuery
    ? GAMES 
    : filteredGames;

  const activeGame = activeGameId ? getActiveGame(activeGameId) : null;

  return (
    <div className="flex h-screen overflow-hidden font-display relative">
      <Sidebar 
        onOpenClassManager={() => setIsClassManagerOpen(true)}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        onRandomGame={handleRandomGame}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full bg-slate-50 dark:bg-[#0b1419] overflow-y-auto relative w-full">
        
        {activeGame ? (
          <ActiveTool 
            game={activeGame as Game} 
            onExit={() => setActiveGameId(null)} 
          />
        ) : (
          <>
            <Header 
              onMenuClick={() => setIsSidebarOpen(true)} 
              onSettingsClick={() => setIsSettingsOpen(true)}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />

            <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
              {/* Recommended Section - Only show on Store Front and no search */}
              {activeCategory === 'Store Front' && !searchQuery && (
                <section className="mb-10">
                  <div className="flex items-center justify-between mb-6 px-1">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold dark:text-white">Recommended for today</h2>
                    </div>
                  </div>
                  
                  <div className="flex gap-6 overflow-x-auto pb-6 custom-scrollbar snap-x scroll-smooth">
                    {randomHeroes.map(game => (
                      <div key={game.id} onClick={() => handlePlayGame(game.id)} className="cursor-pointer snap-center hover:scale-[1.02] transition-transform duration-300">
                         <HeroCard game={game} />
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Grid Section */}
              <section>
                <div className="flex items-center justify-between mb-8 px-1">
                  <h2 className="text-xl md:text-2xl font-bold dark:text-white">
                    {searchQuery ? `Search Results (${displayGames.length})` : activeCategory}
                  </h2>
                </div>

                {displayGames.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 pb-20">
                    {displayGames.map(game => (
                      <GameCard 
                        key={game.id} 
                        game={game} 
                        onClick={setSelectedGame}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                     <div className="w-24 h-24 bg-slate-200 dark:bg-[#1a2b34] rounded-full flex items-center justify-center mb-6">
                        <span className="material-symbols-outlined text-4xl text-slate-400">search_off</span>
                     </div>
                     <h3 className="text-xl font-bold dark:text-white mb-2">No games found</h3>
                     <p className="text-slate-500">Try adjusting your search terms or category.</p>
                     <button 
                       onClick={() => { setSearchQuery(''); setActiveCategory('Store Front'); }}
                       className="mt-6 text-primary font-bold hover:underline"
                     >
                       Clear filters
                     </button>
                  </div>
                )}
              </section>
            </div>

            {/* Footer Section */}
            <footer className="mt-auto p-8 border-t border-slate-200 dark:border-[#233c48] bg-slate-50 dark:bg-[#0b1419]">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-slate-500 dark:text-[#92b7c9] text-sm">© 2026 ClassPlay Education. All rights reserved.</p>
                <div className="flex gap-6">
                  <a className="text-slate-500 dark:text-[#92b7c9] text-sm hover:text-primary transition-colors" href="#">Privacy</a>
                  <a className="text-slate-500 dark:text-[#92b7c9] text-sm hover:text-primary transition-colors" href="#">Terms</a>
                  <a className="text-slate-500 dark:text-[#92b7c9] text-sm hover:text-primary transition-colors" href="#">Support</a>
                </div>
              </div>
            </footer>
          </>
        )}
      </main>

      {/* Modals & Overlays */}
      <GameDetailsModal 
        game={selectedGame} 
        isOpen={!!selectedGame} 
        onClose={() => setSelectedGame(null)} 
        onPlay={handlePlayGame}
      />

      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />

      {isClassManagerOpen && (
        <ClassManager onClose={() => setIsClassManagerOpen(false)} />
      )}
    </div>
  );
};

export default App;