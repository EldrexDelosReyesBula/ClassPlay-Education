import React from 'react';
import { Game } from '../types';
// Existing
import { QuickPick } from './tools/QuickPick';
import { TeamMaker } from './tools/TeamMaker';
import { ClassTimer } from './tools/ClassTimer';
import { Stopwatch } from './tools/Stopwatch';
import { DiceRoll } from './tools/DiceRoll';
import { CoinFlip } from './tools/CoinFlip';
import { ThinkPairShare } from './tools/ThinkPairShare';
import { ExitTicket } from './tools/ExitTicket';
import { WheelSpin } from './tools/WheelSpin';
import { NoiseLevel } from './tools/NoiseLevel';
import { DebateDuel } from './tools/DebateDuel';
import { IcebreakerRoulette } from './tools/IcebreakerRoulette';
import { ZenForest } from './tools/ZenForest';
import { HotPotato } from './tools/HotPotato';
import { TrafficLight } from './tools/TrafficLight';
import { Scoreboard } from './tools/Scoreboard';
import { PollMaker } from './tools/PollMaker';
import { TurnOrder } from './tools/TurnOrder';
import { SkillSpinner } from './tools/SkillSpinner';
import { QuestionBag } from './tools/QuestionBag';
import { EmojiStory } from './tools/EmojiStory';
import { ReactionGame } from './tools/ReactionGame';
import { TwoTruthsLie } from './tools/TwoTruthsLie';
import { HumanBingo } from './tools/HumanBingo';
import { MysteryBox } from './tools/MysteryBox';
import { ProbabilityQuiz } from './tools/ProbabilityQuiz';
import { PopcornReading } from './tools/PopcornReading';
import { SpeedDebate } from './tools/SpeedDebate';
import { StoryChain } from './tools/StoryChain';
import { CollaborativePuzzle } from './tools/CollaborativePuzzle';
import { RelayChallenge } from './tools/RelayChallenge';
import { PeerQuiz } from './tools/PeerQuiz';
import { StretchMove } from './tools/StretchMove';
import { MindfulBreathing } from './tools/MindfulBreathing';
import { QuickDance } from './tools/QuickDance';
import { FocusTracker } from './tools/FocusTracker';
import { ParticipationPoints } from './tools/ParticipationPoints';
import { BehaviorBingo } from './tools/BehaviorBingo';
import { VirtualBadge } from './tools/VirtualBadge';
import { QuickQuiz } from './tools/QuickQuiz';
import { RankVote } from './tools/RankVote';
import { ReflectionCards } from './tools/ReflectionCards';

// New Imports
import { MathRelay } from './tools/math/MathRelay';
import { NumberHunt } from './tools/math/NumberHunt';
import { EquationBuilder } from './tools/math/EquationBuilder';
import { BMICalculator } from './tools/health/BMICalculator';
import { HeartRate } from './tools/health/HeartRate';
import { IntervalTimer } from './tools/health/IntervalTimer';
import { ElementHunt } from './tools/science/ElementHunt';
import { LabSim } from './tools/science/LabSim';
import { HumanBody } from './tools/science/HumanBody';
import { WordBuilder } from './tools/language/WordBuilder';
import { StoryPrompter } from './tools/language/StoryPrompter';
import { MapQuiz } from './tools/social/MapQuiz';
import { TimelineChallenge } from './tools/social/TimelineChallenge';

interface ActiveToolProps {
  game: Game;
  onExit: () => void;
}

export const ActiveTool: React.FC<ActiveToolProps> = ({ game, onExit }) => {
  const renderTool = () => {
    switch (game.id) {
      // Store Front
      case 'quick-pick':
      case 'quick-pick-hero': return <QuickPick />;
      case 'skill-spinner': return <SkillSpinner />;
      case 'question-bag': return <QuestionBag />;

      // Mathematics
      case 'math-relay':
      case 'math-relay-hero': return <MathRelay />;
      case 'equation-builder': return <EquationBuilder />;
      case 'number-hunt': return <NumberHunt />;

      // Science
      case 'periodic-table':
      case 'periodic-hero': return <ElementHunt />;
      case 'human-body': return <HumanBody />;
      case 'lab-sim': return <LabSim />;

      // Language
      case 'word-builder': return <WordBuilder />;
      case 'story-builder': return <StoryPrompter />;

      // Social Studies
      case 'map-quiz': return <MapQuiz />;
      case 'timeline-challenge': return <TimelineChallenge />;

      // Health
      case 'bmi-calc':
      case 'bmi-hero': return <BMICalculator />;
      case 'heart-rate': return <HeartRate />;
      case 'pe-timer': return <IntervalTimer />;

      // Social
      case 'icebreaker-roulette': return <IcebreakerRoulette />;
      case 'emoji-story': return <EmojiStory />;
      case 'two-truths-lie': return <TwoTruthsLie />;
      case 'human-bingo': return <HumanBingo />;

      // Decision
      case 'dice-roll': return <DiceRoll />;
      case 'coin-flip': return <CoinFlip />;
      case 'wheel-spin': return <WheelSpin />;
      case 'mystery-box': return <MysteryBox />;
      case 'probability-quiz': return <ProbabilityQuiz />;

      // Speaking
      case 'debate-duel': return <DebateDuel />;
      case 'popcorn-reading': return <PopcornReading />;
      case 'speed-debate': return <SpeedDebate />;
      case 'story-chain': return <StoryChain />;

      // Group
      case 'team-maker': return <TeamMaker />;
      case 'think-pair-share': return <ThinkPairShare />;
      case 'collaborative-puzzle': return <CollaborativePuzzle />;
      case 'relay-challenge': return <RelayChallenge />;
      case 'peer-quiz': return <PeerQuiz />;

      // Wellness
      case 'zen-forest': return <ZenForest />;
      case 'hot-potato': return <HotPotato />;
      case 'stretch-move': return <StretchMove />;
      case 'mindful-breathing': return <MindfulBreathing />;
      case 'quick-dance': return <QuickDance />;

      // Management
      case 'class-timer': return <ClassTimer />;
      case 'stopwatch': return <Stopwatch />;
      case 'turn-order':
      case 'turn-order-hero': return <TurnOrder />;
      case 'noise-level': return <NoiseLevel />;
      case 'traffic-light': return <TrafficLight />;
      case 'focus-tracker': return <FocusTracker />;
      case 'participation-points': return <ParticipationPoints />;
      case 'behavior-bingo': return <BehaviorBingo />;

      // Fun
      case 'reaction-challenge': return <ReactionGame />;
      case 'virtual-badge': return <VirtualBadge />;

      // Assessment
      case 'poll-maker': return <PollMaker />;
      case 'quick-quiz': return <QuickQuiz />;
      case 'rank-vote': return <RankVote />;
      case 'reflection-cards': return <ReflectionCards />;
      case 'exit-ticket': return <ExitTicket />;
      case 'scoreboard': return <Scoreboard />;

      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">construction</span>
            <h2 className="text-2xl font-bold dark:text-white mb-2">Coming Soon</h2>
            <p className="text-slate-500 max-w-md mb-6">
              The <strong>{game.title}</strong> tool is currently under development. 
            </p>
            <button onClick={onExit} className="px-6 py-2 bg-slate-200 dark:bg-[#233c48] rounded-xl font-bold text-slate-600 dark:text-white hover:brightness-95">
               Go Back
            </button>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-[#0b1419] animate-[fadeIn_0.3s_ease-out]">
      {/* Tool Header */}
      <div className="flex items-center justify-between px-4 md:px-8 py-4 bg-white dark:bg-[#111c22] border-b border-slate-200 dark:border-[#233c48] shadow-sm z-10 shrink-0">
        <div className="flex items-center gap-3 md:gap-4">
          <div className={`p-2 rounded-lg bg-slate-100 dark:bg-[#1a2b34] ${game.iconColorClass}`}>
            <span className="material-symbols-outlined text-2xl" aria-hidden="true">{game.icon}</span>
          </div>
          <div>
            <h1 className="text-lg font-bold dark:text-white leading-tight">{game.title}</h1>
            <p className="text-xs text-slate-500 dark:text-[#92b7c9]">{game.category}</p>
          </div>
        </div>
        
        <button 
          onClick={onExit}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#233c48] font-bold text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400"
          aria-label="Exit Tool"
        >
          <span className="material-symbols-outlined text-xl" aria-hidden="true">close</span>
          <span className="hidden md:inline">Exit Tool</span>
        </button>
      </div>

      {/* Tool Content Area - Scrollable */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-8 relative">
        {renderTool()}
      </div>
    </div>
  );
};
