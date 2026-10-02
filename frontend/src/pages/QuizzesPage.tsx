import React, { useState, useEffect, useMemo } from 'react';
import {
  HelpCircle,
  Check,
  X,
  ArrowRight,
  Zap,
  CheckCircle2,
  Clock,
  Shuffle,
  RotateCcw,
  Sparkles,
  BookOpen,
  Filter,
  Flame,
  Award,
  Bookmark,
  CheckSquare,
  AlertTriangle,
  Play,
  FileCode,
  Terminal,
  Trophy
} from 'lucide-react';
import { QUIZ_QUESTIONS, QuizQuestion, QuizCategory, QuestionType } from '../data/quizData';
import { UserAccount, awardXPToUser, saveAccount } from '../lib/authStore';

interface QuizzesPageProps {
  user: UserAccount;
  onUpdateUser: (user: UserAccount) => void;
}

type QuizMode = 'practice' | 'timed' | 'exam';

export const QuizzesPage: React.FC<QuizzesPageProps> = ({ user, onUpdateUser }) => {
  // Option filters
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [quizMode, setQuizMode] = useState<QuizMode>('practice');

  // Quiz state
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>(QUIZ_QUESTIONS);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedSingle, setSelectedSingle] = useState<number | null>(null);
  const [selectedMulti, setSelectedMulti] = useState<number[]>([]);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [combo, setCombo] = useState<number>(0);
  const [xpGainedSession, setXpGainedSession] = useState<number>(0);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());

  // Timed mode state
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // Results Modal State
  const [isQuizFinished, setIsQuizFinished] = useState<boolean>(false);
  const [userAnswersHistory, setUserAnswersHistory] = useState<{
    [qId: string]: { isCorrect: boolean; selected: number | number[] };
  }>({});

  // Filter available questions based on options
  const filteredQuestions = useMemo(() => {
    return QUIZ_QUESTIONS.filter(q => {
      const matchCat = selectedCategory === 'All' || q.category === selectedCategory;
      const matchDiff = selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;
      const matchType = selectedType === 'All' || q.type === selectedType;
      return matchCat && matchDiff && matchType;
    });
  }, [selectedCategory, selectedDifficulty, selectedType]);

  // When filters or mode changes, re-initialize questions
  useEffect(() => {
    let list = [...filteredQuestions];
    if (list.length === 0) list = QUIZ_QUESTIONS;

    if (quizMode === 'exam') {
      // 10 random questions
      list = [...list].sort(() => Math.random() - 0.5).slice(0, 10);
    }

    setActiveQuestions(list);
    setCurrentIdx(0);
    setSelectedSingle(null);
    setSelectedMulti([]);
    setIsAnswered(false);
    setShowHint(false);
    setUserAnswersHistory({});
    setIsQuizFinished(false);
    setTimeLeft(quizMode === 'timed' ? 30 : 0);
    setIsTimerRunning(quizMode === 'timed');
  }, [filteredQuestions, quizMode]);

  // Timer countdown for Timed Speed Run mode
  useEffect(() => {
    if (quizMode !== 'timed' || !isTimerRunning || isAnswered || isQuizFinished) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeExpire();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizMode, isTimerRunning, isAnswered, isQuizFinished, currentIdx]);

  const currentQ: QuizQuestion | undefined = activeQuestions[currentIdx];

  // Auto-fail when timer runs out
  const handleTimeExpire = () => {
    if (!currentQ || isAnswered) return;
    setIsAnswered(true);
    setCombo(0);
    setUserAnswersHistory(prev => ({
      ...prev,
      [currentQ.id]: { isCorrect: false, selected: -1 }
    }));
  };

  const handleShuffleQuestions = () => {
    const shuffled = [...activeQuestions].sort(() => Math.random() - 0.5);
    setActiveQuestions(shuffled);
    setCurrentIdx(0);
    setSelectedSingle(null);
    setSelectedMulti([]);
    setIsAnswered(false);
    setShowHint(false);
    setScore(0);
    setCombo(0);
    setIsQuizFinished(false);
    setTimeLeft(quizMode === 'timed' ? 30 : 0);
  };

  const handleToggleBookmark = (id: string) => {
    setBookmarkedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;

    if (currentQ?.type === 'multiple-select') {
      setSelectedMulti(prev =>
        prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
      );
    } else {
      setSelectedSingle(idx);
    }
  };

  const handleCheckAnswer = () => {
    if (!currentQ || isAnswered) return;

    let correct = false;
    if (currentQ.type === 'multiple-select') {
      if (selectedMulti.length === 0) return;
      const expected = (currentQ.correct as number[]).sort();
      const actual = [...selectedMulti].sort();
      correct =
        expected.length === actual.length &&
        expected.every((val, i) => val === actual[i]);
    } else {
      if (selectedSingle === null) return;
      correct = selectedSingle === currentQ.correct;
    }

    setIsAnswered(true);

    let xpEarned = 0;
    if (correct) {
      setScore(prev => prev + 1);
      const newCombo = combo + 1;
      setCombo(newCombo);

      // Multiplier bonus for combos or timed mode
      const multiplier = quizMode === 'timed' ? 1.5 : newCombo >= 3 ? 1.25 : 1.0;
      xpEarned = Math.round(currentQ.xpReward * multiplier);
      setXpGainedSession(prev => prev + xpEarned);

      // Award live XP to user account
      const updatedUser = awardXPToUser(user, xpEarned);
      onUpdateUser(updatedUser);
    } else {
      setCombo(0);
    }

    setUserAnswersHistory(prev => ({
      ...prev,
      [currentQ.id]: {
        isCorrect: correct,
        selected: currentQ.type === 'multiple-select' ? selectedMulti : (selectedSingle ?? -1)
      }
    }));
  };

  const handleNext = () => {
    if (currentIdx < activeQuestions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedSingle(null);
      setSelectedMulti([]);
      setIsAnswered(false);
      setShowHint(false);
      setTimeLeft(quizMode === 'timed' ? 30 : 0);
    } else {
      // Quiz finished
      setIsQuizFinished(true);
      // Update user quizzes completed count
      const updatedUser: UserAccount = {
        ...user,
        quizzesCompleted: (user.quizzesCompleted || 0) + 1,
        quizScore: Math.max(user.quizScore || 0, Math.round((score / activeQuestions.length) * 100))
      };
      saveAccount(updatedUser);
      onUpdateUser(updatedUser);
    }
  };

  const handleJumpToQuestion = (idx: number) => {
    if (idx < 0 || idx >= activeQuestions.length) return;
    setCurrentIdx(idx);
    setSelectedSingle(null);
    setSelectedMulti([]);
    setIsAnswered(false);
    setShowHint(false);
    setTimeLeft(quizMode === 'timed' ? 30 : 0);
  };

  const categories: string[] = [
    'All',
    'Algorithms & DSA',
    'Frontend & React',
    'Backend & APIs',
    'SQL & Databases',
    'System Design'
  ];

  const difficulties: string[] = ['All', 'Easy', 'Medium', 'Hard'];

  const questionTypes: { id: string; label: string }[] = [
    { id: 'All', label: 'All Question Types' },
    { id: 'single-choice', label: 'Single Choice' },
    { id: 'multiple-select', label: 'Multiple Select' },
    { id: 'code-output', label: 'Code Output' },
    { id: 'bug-spotting', label: 'Bug Spotting' },
    { id: 'fill-blank', label: 'Query Fill-in-Blank' },
    { id: 'true-false', label: 'True / False' }
  ];

  if (!currentQ) {
    return (
      <div className="p-8 text-center text-slate-400">
        No questions found for the selected filter. Try adjusting your filters above.
      </div>
    );
  }

  const isMulti = currentQ.type === 'multiple-select';
  const isSelected = (idx: number) =>
    isMulti ? selectedMulti.includes(idx) : selectedSingle === idx;

  const isCorrectChoice = (idx: number) => {
    if (isMulti) {
      return (currentQ.correct as number[]).includes(idx);
    }
    return idx === currentQ.correct;
  };

  const isUserChoice = (idx: number) => {
    if (isMulti) {
      return selectedMulti.includes(idx);
    }
    return selectedSingle === idx;
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-5xl mx-auto">
      {/* Top Header with Active Account banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1c2438]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-white tracking-tight">Interactive Quizzes & Assessments</h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-300">
              Live & Dynamic
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Test and sharpen real-world engineering concepts across various question formats and domains.
          </p>
        </div>

        {/* User stats indicator */}
        <div className="flex items-center gap-2.5">
          <div className="px-3 py-1.5 rounded-xl bg-[#121724] border border-[#232f48] flex items-center gap-2">
            <span className="text-[10px] text-slate-400 font-mono">Quizzing as:</span>
            <span className="text-xs font-bold text-purple-300">@{user.username}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono font-bold">
              +{xpGainedSession} XP
            </span>
          </div>

          {combo >= 2 && (
            <div className="px-2.5 py-1.5 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold flex items-center gap-1 animate-pulse">
              <Flame className="w-3.5 h-3.5 fill-orange-400" />
              <span>{combo}x Combo!</span>
            </div>
          )}
        </div>
      </div>

      {/* QUIZ OPTIONS BAR: Mode Tabs + Topic Tabs + Difficulty + Question Type Filter */}
      <div className="bg-[#121724] border border-[#1c2438] rounded-2xl p-4 shadow-xl space-y-4">
        
        {/* Row 1: Mode Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 bg-[#0b0e14] p-1 rounded-xl border border-[#1c2438]">
            <button
              onClick={() => setQuizMode('practice')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer flex items-center gap-1.5 ${
                quizMode === 'practice'
                  ? 'bg-purple-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Practice Mode</span>
            </button>
            <button
              onClick={() => setQuizMode('timed')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer flex items-center gap-1.5 ${
                quizMode === 'timed'
                  ? 'bg-orange-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Timed Speed Run</span>
            </button>
            <button
              onClick={() => setQuizMode('exam')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer flex items-center gap-1.5 ${
                quizMode === 'exam'
                  ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>10-Q Certification Exam</span>
            </button>
          </div>

          {/* Quick Actions: Shuffle & Restart */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleShuffleQuestions}
              className="px-3 py-1.5 rounded-xl bg-[#182030] hover:bg-[#202c42] border border-[#232f48] text-xs font-medium text-slate-300 flex items-center gap-1.5 transition cursor-pointer"
              title="Shuffle & randomize questions"
            >
              <Shuffle className="w-3.5 h-3.5 text-purple-400" />
              <span>Shuffle New Set</span>
            </button>
          </div>
        </div>

        {/* Row 2: Category Topic Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Topics:
          </span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition whitespace-nowrap cursor-pointer shrink-0 ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white font-semibold'
                  : 'bg-[#0b0e14] text-slate-400 border border-[#1c2438] hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Row 3: Filter Dropdowns (Difficulty & Question Types) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#1c2438]/80 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            {/* Difficulty Filter */}
            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-[11px]">Difficulty:</span>
              <div className="flex items-center gap-1 bg-[#0b0e14] p-0.5 rounded-lg border border-[#1c2438]">
                {difficulties.map(diff => (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`px-2 py-0.5 rounded text-[11px] font-medium transition cursor-pointer ${
                      selectedDifficulty === diff
                        ? 'bg-purple-600/40 text-purple-200 font-bold border border-purple-500/30'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>

            {/* Question Type Filter */}
            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-[11px]">Question Type:</span>
              <select
                value={selectedType}
                onChange={e => setSelectedType(e.target.value)}
                className="bg-[#0b0e14] border border-[#1c2438] rounded-lg px-2.5 py-1 text-slate-300 text-[11px] focus:outline-none focus:border-purple-500 cursor-pointer"
              >
                {questionTypes.map(t => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Question counter & Score tracker */}
          <div className="flex items-center gap-3">
            <span className="text-slate-400 text-xs font-mono">
              Question <span className="text-white font-bold">{currentIdx + 1}</span> / {activeQuestions.length}
            </span>
            <div className="px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-bold">
              Score: {score} / {activeQuestions.length}
            </div>
          </div>
        </div>

      </div>

      {/* QUESTION NAVIGATOR PILLS STRIP (Jump to any question) */}
      <div className="flex items-center gap-1.5 overflow-x-auto p-2 bg-[#121724] border border-[#1c2438] rounded-xl">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 shrink-0">
          Navigator:
        </span>
        {activeQuestions.map((q, idx) => {
          const isCurr = idx === currentIdx;
          const ans = userAnswersHistory[q.id];
          const isBookmarked = bookmarkedIds.has(q.id);

          let pillBg = 'bg-[#0b0e14] text-slate-400 border-[#1c2438] hover:border-slate-500';
          if (ans) {
            pillBg = ans.isCorrect
              ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 font-bold'
              : 'bg-rose-950/60 border-rose-500 text-rose-300 font-bold';
          }
          if (isCurr) {
            pillBg = 'bg-purple-600 border-purple-400 text-white font-bold ring-2 ring-purple-500/50';
          }

          return (
            <button
              key={q.id}
              onClick={() => handleJumpToQuestion(idx)}
              className={`w-7 h-7 rounded-lg border text-xs font-mono flex items-center justify-center transition shrink-0 cursor-pointer relative ${pillBg}`}
              title={`Question ${idx + 1}: ${q.category} (${q.type})`}
            >
              {idx + 1}
              {isBookmarked && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400 ring-1 ring-[#121724]" />
              )}
            </button>
          );
        })}
      </div>

      {/* MAIN QUESTION CARD */}
      <div className="bg-[#121724] border border-[#1c2438] rounded-2xl p-5 sm:p-6 shadow-2xl space-y-6 relative overflow-hidden">
        
        {/* Top Badges & Timers */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-purple-600/20 text-purple-300 font-semibold border border-purple-500/30 text-[11px]">
              {currentQ.category}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#182030] text-slate-300 border border-[#232f48] text-[10px] font-mono capitalize">
              {currentQ.type.replace('-', ' ')}
            </span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                currentQ.difficulty === 'Easy'
                  ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/30'
                  : currentQ.difficulty === 'Medium'
                  ? 'bg-amber-950/40 text-amber-400 border-amber-500/30'
                  : 'bg-rose-950/40 text-rose-400 border-rose-500/30'
              }`}
            >
              {currentQ.difficulty}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Bookmark button */}
            <button
              onClick={() => handleToggleBookmark(currentQ.id)}
              className={`p-1.5 rounded-lg border text-xs transition cursor-pointer ${
                bookmarkedIds.has(currentQ.id)
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                  : 'bg-[#182030] border-[#232f48] text-slate-400 hover:text-white'
              }`}
              title="Bookmark for review"
            >
              <Bookmark className="w-3.5 h-3.5" />
            </button>

            {/* Timed countdown indicator */}
            {quizMode === 'timed' && (
              <div
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-mono font-bold ${
                  timeLeft <= 10
                    ? 'bg-rose-950/60 border-rose-500 text-rose-300 animate-pulse'
                    : 'bg-orange-950/40 border-orange-500/40 text-orange-300'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>{timeLeft}s</span>
              </div>
            )}

            <div className="text-[11px] text-purple-400 font-mono font-semibold flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 fill-purple-400" />
              <span>+{currentQ.xpReward} XP</span>
            </div>
          </div>
        </div>

        {/* Question Title & Prompt */}
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
            {currentQ.question}
          </h3>
          {isMulti && (
            <p className="text-xs text-purple-300 font-medium mt-1 flex items-center gap-1">
              <CheckSquare className="w-3.5 h-3.5" /> Select all correct options that apply:
            </p>
          )}
        </div>

        {/* Optional Syntax-Highlighted Monospace Code Snippet */}
        {currentQ.codeSnippet && (
          <div className="rounded-xl overflow-hidden border border-[#232f48] bg-[#070a10]">
            <div className="flex items-center justify-between px-3 py-1.5 bg-[#0e1320] border-b border-[#232f48] text-[11px] text-slate-400 font-mono">
              <div className="flex items-center gap-1.5">
                <FileCode className="w-3.5 h-3.5 text-purple-400" />
                <span>code_snippet.{currentQ.codeLanguage || 'ts'}</span>
              </div>
              <span className="text-[10px] text-slate-500 uppercase">{currentQ.codeLanguage}</span>
            </div>
            <pre className="p-4 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
              <code>{currentQ.codeSnippet}</code>
            </pre>
          </div>
        )}

        {/* Options List with tailored rendering for single vs multi-select */}
        <div className="space-y-3">
          {currentQ.options.map((opt, idx) => {
            const selected = isSelected(idx);
            const correct = isCorrectChoice(idx);

            let cardStyle = 'bg-[#0b0e14] border-[#1c2438] text-slate-300 hover:border-slate-600';

            if (isAnswered) {
              if (correct) {
                cardStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500/50';
              } else if (selected && !correct) {
                cardStyle = 'bg-rose-950/40 border-rose-500 text-rose-200 ring-1 ring-rose-500/50';
              } else {
                cardStyle = 'bg-[#0b0e14]/50 border-[#1c2438] text-slate-500 opacity-60';
              }
            } else if (selected) {
              cardStyle = 'bg-purple-950/40 border-purple-500 text-purple-100 ring-1 ring-purple-500/50';
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                disabled={isAnswered}
                className={`w-full text-left p-3.5 sm:p-4 rounded-xl border text-xs font-medium flex items-center justify-between transition cursor-pointer ${cardStyle}`}
              >
                <div className="flex items-center gap-3">
                  {/* Indicator: Checkbox for multi-select, Letter Circle for single-choice */}
                  {isMulti ? (
                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center transition shrink-0 ${
                        selected
                          ? 'bg-purple-600 border-purple-400 text-white'
                          : 'border-slate-600 bg-[#121724]'
                      }`}
                    >
                      {selected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  ) : (
                    <span
                      className={`w-6 h-6 rounded-lg text-[10px] font-mono font-bold flex items-center justify-center shrink-0 ${
                        selected
                          ? 'bg-purple-600 text-white'
                          : 'bg-[#182030] text-slate-400 border border-[#232f48]'
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                  )}
                  <span className="leading-snug">{opt}</span>
                </div>

                {/* Status icon after answered */}
                {isAnswered && correct && (
                  <div className="flex items-center gap-1 text-emerald-400 text-[11px] font-bold shrink-0">
                    <Check className="w-4 h-4" />
                    <span className="hidden sm:inline">Correct</span>
                  </div>
                )}
                {isAnswered && selected && !correct && (
                  <div className="flex items-center gap-1 text-rose-400 text-[11px] font-bold shrink-0">
                    <X className="w-4 h-4" />
                    <span className="hidden sm:inline">Incorrect</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Hint toggle box */}
        {showHint && !isAnswered && (
          <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-amber-300 block mb-0.5">Clue / Hint:</span>
              <span>{currentQ.hint}</span>
            </div>
          </div>
        )}

        {/* Detailed Explanation upon submission */}
        {isAnswered && (
          <div className="p-4 rounded-xl bg-[#0b0e14] border border-[#232f48] text-xs text-slate-300 leading-relaxed space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-bold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Comprehensive Explanation:
              </span>
            </div>
            <p className="text-slate-300 font-sans leading-relaxed">{currentQ.explanation}</p>
          </div>
        )}

        {/* Bottom Actions Bar */}
        <div className="flex items-center justify-between pt-4 border-t border-[#1c2438]">
          <div className="flex items-center gap-2">
            {!isAnswered && (
              <button
                onClick={() => setShowHint(!showHint)}
                className="text-xs text-slate-400 hover:text-amber-300 transition flex items-center gap-1 cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>{showHint ? 'Hide Hint' : 'Show Hint'}</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {!isAnswered ? (
              <button
                onClick={handleCheckAnswer}
                disabled={
                  isMulti ? selectedMulti.length === 0 : selectedSingle === null
                }
                className="px-6 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold disabled:opacity-40 transition cursor-pointer flex items-center gap-1.5 shadow-md shadow-purple-600/30"
              >
                <span>Check & Submit</span>
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-6 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-md shadow-purple-600/30"
              >
                <span>{currentIdx < activeQuestions.length - 1 ? 'Next Question' : 'Finish & View Report'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

      </div>

      {/* QUIZ FINISHED RESULTS SUMMARY MODAL */}
      {isQuizFinished && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121724] border border-[#232f48] rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-purple-600/20 border border-purple-500/40 flex items-center justify-center mx-auto text-2xl shadow-lg">
                <Trophy className="w-8 h-8 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Quiz Assessment Completed!</h3>
              <p className="text-xs text-slate-400">
                Great job testing your developer knowledge, <span className="text-purple-300 font-bold">@{user.username}</span>!
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-[#0b0e14] p-3 rounded-xl border border-[#1c2438]">
                <div className="text-[11px] text-slate-400 font-mono">Final Score</div>
                <div className="text-xl font-bold text-emerald-400 font-mono mt-1">
                  {score} / {activeQuestions.length}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  {Math.round((score / activeQuestions.length) * 100)}% Pass
                </div>
              </div>

              <div className="bg-[#0b0e14] p-3 rounded-xl border border-[#1c2438]">
                <div className="text-[11px] text-slate-400 font-mono">XP Earned</div>
                <div className="text-xl font-bold text-purple-400 font-mono mt-1">
                  +{xpGainedSession}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">Profile Updated</div>
              </div>

              <div className="bg-[#0b0e14] p-3 rounded-xl border border-[#1c2438]">
                <div className="text-[11px] text-slate-400 font-mono">Rank Level</div>
                <div className="text-xl font-bold text-orange-400 font-mono mt-1">
                  Lv. {user.level}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">{user.title}</div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-4 border-t border-[#1c2438]">
              <button
                onClick={handleShuffleQuestions}
                className="flex-1 py-2.5 rounded-xl bg-[#182030] hover:bg-[#202c42] border border-[#232f48] text-xs font-semibold text-slate-200 transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Shuffle className="w-3.5 h-3.5 text-purple-400" />
                <span>Try Another Set</span>
              </button>

              <button
                onClick={() => {
                  setIsQuizFinished(false);
                  setCurrentIdx(0);
                  setSelectedSingle(null);
                  setSelectedMulti([]);
                  setIsAnswered(false);
                  setScore(0);
                }}
                className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-purple-600/30"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake This Quiz</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
