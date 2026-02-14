
import React, { useState, useEffect } from 'react';
import { Analytics } from "@vercel/analytics/react";
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { HeroCard } from './components/HeroCard';
import { GameCard } from './components/GameCard';
import { GameDetailsModal } from './components/GameDetailsModal';
import { ClassManager } from './components/ClassManager';
import { SettingsModal } from './components/SettingsModal';
import { ActiveTool } from './components/ActiveTool';
import { Onboarding } from './components/Onboarding';
import { DonationSheet } from './components/DonationSheet';
import { ConsentBanner } from './components/ConsentBanner';
import { PrivacyPolicy, TermsOfService, AboutPage } from './components/InfoPages';
import { GAMES, HERO_GAMES } from './constants';
import { Game, HeroGame } from './types';

// Constants for Donation Logic
const GAMES_THRESHOLD = 10;
const DAYS_THRESHOLD = 5;
const KEY_GAME_COUNT = 'classplay_game_count';
const KEY_LAST_PROMPT = 'classplay_last_donation_prompt';
const KEY_ONBOARDING = 'classplay_onboarding_done';
const KEY_ANALYTICS_CONSENT = 'classplay_analytics_consent';

const App: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [activeGameId, setActiveGameId] = useState<string | null>(null);
  const [isClassManagerOpen, setIsClassManagerOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [randomHeroes, setRandomHeroes] = useState<HeroGame[]>([]);
  
  // Page Routing State
  const [activePage, setActivePage] = useState<'home' | 'privacy' | 'terms' | 'about'>('home');
  
  // Feature State
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showDonation, setShowDonation] = useState(false);
  
  // Analytics State: null = not asked, true = allow, false = deny
  const [analyticsConsent, setAnalyticsConsent] = useState<boolean | null>(null);

  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Store Front');

  // Initialization & Recommendations
  useEffect(() => {
    // Randomize Hero
    const shuffled = [...HERO_GAMES].sort(() => 0.5 - Math.random());
    setRandomHeroes(shuffled);

    // Check Onboarding
    const hasSeenOnboarding = localStorage.getItem(KEY_ONBOARDING);
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }

    // Check Analytics Consent
    const storedConsent = localStorage.getItem(KEY_ANALYTICS_CONSENT);
    if (storedConsent === 'true') setAnalyticsConsent(true);
    else if (storedConsent === 'false') setAnalyticsConsent(false);
    // else remains null, showing banner

    // Check Passive Donation Logic (Days elapsed)
    checkDonationStatus();
  }, []);

  const checkDonationStatus = () => {
    const lastPromptStr = localStorage.getItem(KEY_LAST_PROMPT);
    const gameCountStr = localStorage.getItem(KEY_GAME_COUNT) || '0';
    const gameCount = parseInt(gameCountStr);
    
    // Check Games Played
    if (gameCount >= GAMES_THRESHOLD) {
      setShowDonation(true);
      return;
    }

    // Check Time Elapsed
    if (lastPromptStr) {
      const lastPrompt = parseInt(lastPromptStr);
      const now = Date.now();
      const daysDiff = (now - lastPrompt) / (1000 * 60 * 60 * 24);
      if (daysDiff >= DAYS_THRESHOLD) {
        setShowDonation(true);
      }
    } else {
      // First time initialization for time tracking
      localStorage.setItem(KEY_LAST_PROMPT, Date.now().toString());
    }
  };

  const handleDismissDonation = () => {
    setShowDonation(false);
    // Reset counters
    localStorage.setItem(KEY_GAME_COUNT, '0');
    localStorage.setItem(KEY_LAST_PROMPT, Date.now().toString());
  };

  const handleCompleteOnboarding = () => {
    localStorage.setItem(KEY_ONBOARDING, 'true');
    setShowOnboarding(false);
  };

  const setConsent = (choice: boolean) => {
    setAnalyticsConsent(choice);
    localStorage.setItem(KEY_ANALYTICS_CONSENT, choice.toString());
  };

  // Helper to find game object by ID (checking both lists)
  const getActiveGame = (id: string) => {
    return [...GAMES, ...HERO_GAMES].find(g => g.id === id);
  };

  const handlePlayGame = (gameId: string) => {
    // Increment Game Counter
    const count = parseInt(localStorage.getItem(KEY_GAME_COUNT) || '0');
    localStorage.setItem(KEY_GAME_COUNT, (count + 1).toString());

    setActiveGameId(gameId);
    setSelectedGame(null); // Close modal if open
  };

  const handleRandomGame = () => {
    const randomGame = GAMES[Math.floor(Math.random() * GAMES.length)];
    handlePlayGame(randomGame.id);
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

  // Main Render Logic
  const renderMainContent = () => {
    if (activeGame) {
      return (
        <ActiveTool 
          game={activeGame as Game} 
          onExit={() => {
            setActiveGameId(null);
            checkDonationStatus(); // Check donation logic after game finishes
          }} 
        />
      );
    }

    if (activePage === 'privacy') return <PrivacyPolicy onBack={() => setActivePage('home')} />;
    if (activePage === 'terms') return <TermsOfService onBack={() => setActivePage('home')} />;
    if (activePage === 'about') return <AboutPage onBack={() => setActivePage('home')} />;

    // Home / Store Front
    return (
      <>
        <Header 
          onMenuClick={() => setIsSidebarOpen(true)} 
          onSettingsClick={() => setIsSettingsOpen(true)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
          {/* Recommended Section */}
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
              <button onClick={() => setActivePage('privacy')} className="text-slate-500 dark:text-[#92b7c9] text-sm hover:text-primary transition-colors">Privacy</button>
              <button onClick={() => setActivePage('terms')} className="text-slate-500 dark:text-[#92b7c9] text-sm hover:text-primary transition-colors">Terms</button>
              <button onClick={() => setActivePage('about')} className="text-slate-500 dark:text-[#92b7c9] text-sm hover:text-primary transition-colors">About ClassPlay</button>
            </div>
          </div>
        </footer>
      </>
    );
  };

  return (
    <div className="flex h-screen overflow-hidden font-display relative">
      {/* Vercel Analytics - Conditionally Rendered based on Consent */}
      {analyticsConsent && <Analytics />}

      <Sidebar 
        onOpenClassManager={() => setIsClassManagerOpen(true)}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setActivePage('home');
        }}
        onRandomGame={handleRandomGame}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full bg-slate-50 dark:bg-[#0b1419] overflow-y-auto relative w-full">
        {renderMainContent()}
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
        analyticsEnabled={analyticsConsent === true}
        onAnalyticsChange={setConsent}
      />

      {isClassManagerOpen && (
        <ClassManager onClose={() => setIsClassManagerOpen(false)} />
      )}

      {/* Feature Overlays */}
      {showOnboarding && <Onboarding onComplete={handleCompleteOnboarding} />}
      
      {/* Show Consent Banner if not decided and not in onboarding */}
      {analyticsConsent === null && !showOnboarding && (
        <ConsentBanner 
          onAccept={() => setConsent(true)} 
          onDecline={() => setConsent(false)} 
        />
      )}

      <DonationSheet isOpen={showDonation} onDismiss={handleDismissDonation} />
    </div>
  );
};

export default App;
