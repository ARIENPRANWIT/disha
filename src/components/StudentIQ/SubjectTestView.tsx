import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Student, Subject, QuizQuestion, SubjectAssessmentScore, Language } from '../../types';
import { SUBJECT_QUESTIONS } from '../../data/seedData';
import { StorageService } from '../../services/storage';
import { translations } from '../../i18n/translations';
import { 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  ChevronRight,
} from 'lucide-react';

interface SubjectTestViewProps {
  currentStudent: Student;
  language: Language;
  onTestCompleted: () => void;
}

export const SubjectTestView: React.FC<SubjectTestViewProps> = ({
  currentStudent,
  language,
  onTestCompleted,
}) => {
  const t = translations[language];
  const [selectedSubject, setSelectedSubject] = useState<Subject>('math');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [isFinished, setIsFinished] = useState(false);

  const questions: QuizQuestion[] = SUBJECT_QUESTIONS[selectedSubject] || [];
  const currentQ = questions[currentIdx];

  const subjects: { id: Subject; label: string; icon: string }[] = [
    { id: 'math', label: t.subjects.math, icon: '📐' },
    { id: 'evs', label: t.subjects.evs, icon: '🌿' },
    { id: 'science', label: t.subjects.science, icon: '🔬' },
    { id: 'hindi', label: t.subjects.hindi, icon: '📜' },
    { id: 'english', label: t.subjects.english, icon: '🔤' },
  ];

  const handleSelectOption = (idx: number) => {
    if (showExplanation) return;
    setSelectedOption(idx);
    setShowExplanation(true);
    setAnswers((prev) => ({ ...prev, [currentIdx]: idx }));
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOption(answers[currentIdx + 1] !== undefined ? answers[currentIdx + 1] : null);
      setShowExplanation(answers[currentIdx + 1] !== undefined);
    } else {
      finishTest();
    }
  };

  const finishTest = () => {
    let score = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correctIndex) {
        score += 1;
      }
    });

    let iqBand: SubjectAssessmentScore['iqBand'] = 'Progressing';
    if (score >= 18) iqBand = 'Master';
    else if (score >= 15) iqBand = 'Advanced';
    else if (score >= 12) iqBand = 'Proficient';
    else if (score >= 8) iqBand = 'Progressing';
    else iqBand = 'Emerging';

    const points = score * 20;

    StorageService.saveIQScore({
      studentId: currentStudent.id,
      studentName: currentStudent.name,
      subject: selectedSubject,
      score,
      total: questions.length,
      completedAt: new Date().toISOString().split('T')[0],
      iqBand,
      points,
    });

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    setIsFinished(true);
    onTestCompleted();
  };

  const restartTest = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setAnswers({});
    setIsFinished(false);
  };

  const correctCount = Object.keys(answers).filter((k) => answers[Number(k)] === questions[Number(k)]?.correctIndex).length;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Subject Header Tabs */}
      <div className="bg-white p-3 sm:p-4 rounded-3xl border border-[#F4A340]/30 shadow-xs min-w-0">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-xl shrink-0">🧠</span>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-base font-heading font-extrabold text-[#165A44] break-words">
                {t.subjectTest.title}
              </h2>
              <p className="text-xs text-[#7A6A58] break-words">
                {t.subjectTest.studentLabel(currentStudent.name, currentStudent.grade)}
              </p>
            </div>
          </div>
        </div>

        {/* 5 Subjects Pill Switcher */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
          {subjects.map((sub) => (
            <button
              key={sub.id}
              onClick={() => {
                setSelectedSubject(sub.id);
                restartTest();
              }}
              className={`p-2 sm:p-2.5 rounded-2xl text-left flex items-center gap-2 border transition-all cursor-pointer min-w-0 ${
                selectedSubject === sub.id
                  ? 'bg-gradient-to-r from-[#1F7A5C] to-[#165A44] text-white border-[#1F7A5C] shadow-xs scale-102 font-bold'
                  : 'bg-[#FFF8EE] text-[#4A3E31] border-[#F4A340]/25 hover:bg-[#FFEECF]'
              }`}
            >
              <span className="text-lg sm:text-xl shrink-0">{sub.icon}</span>
              <div className="min-w-0 truncate">
                <div className="text-xs font-bold truncate leading-tight">{sub.label}</div>
                <div className="text-[10px] opacity-80 whitespace-nowrap">{t.subjectTest.questionCount}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Test Runner */}
      {isFinished ? (
        /* Results View */
        <div className="bg-gradient-to-b from-white to-[#FFF8EE] border-2 border-[#1F7A5C]/40 rounded-3xl p-6 sm:p-8 text-center shadow-lg space-y-6 animate-in zoom-in-95">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#F4A340] to-[#E8734A] text-white flex items-center justify-center text-4xl mx-auto shadow-md">
            🏆
          </div>

          <div>
            <h3 className="text-2xl font-heading font-extrabold text-[#165A44] break-words">
              {t.subjectTest.assessmentComplete}
            </h3>
            <p className="text-sm text-[#7A6A58] mt-1 font-medium break-words">
              {t.subjectTest.subjectLabel(t.subjects[selectedSubject] || selectedSubject)}
            </p>
          </div>

          {/* Score Circle */}
          <div className="bg-[#FFFDF9] border border-[#F4A340]/30 max-w-sm mx-auto p-5 rounded-3xl shadow-xs space-y-2">
            <div className="text-4xl font-heading font-extrabold text-[#1F7A5C]">
              {correctCount} / 20
            </div>
            <div className="text-xs font-bold text-[#8C7B68] uppercase break-words">{t.subjectTest.correctProblemAnswers}</div>
            <div className="pt-2 border-t border-stone-100 flex items-center justify-around text-xs gap-2">
              <span className="font-bold text-[#E8734A] whitespace-nowrap">
                {t.subjectTest.pointsEarned(correctCount * 20)}
              </span>
              <span className="font-bold text-[#1F7A5C] bg-[#E8F6F0] px-2.5 py-0.5 rounded-full whitespace-nowrap">
                {t.subjectTest.rankUpdated}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={restartTest}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#F4A340]/30 text-xs font-bold text-[#5C5042] hover:bg-white cursor-pointer whitespace-nowrap"
            >
              <RotateCcw className="w-4 h-4 shrink-0" />
              <span>{t.subjectTest.retakeTest}</span>
            </button>
            <button
              onClick={() => {
                const nextSub = subjects[(subjects.findIndex((s) => s.id === selectedSubject) + 1) % subjects.length].id;
                setSelectedSubject(nextSub);
                restartTest();
              }}
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-xl bg-[#1F7A5C] text-white text-xs font-extrabold shadow-sm hover:bg-[#165A44] cursor-pointer whitespace-nowrap"
            >
              <span>{t.subjectTest.nextSubjectQuiz}</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </div>
      ) : (
        /* Active Question Card */
        currentQ && (
          <div className="bg-white rounded-3xl border-2 border-[#F4A340]/30 p-4 sm:p-7 shadow-xs space-y-5 min-w-0">
            {/* Progress Bar & Header */}
            <div>
              <div className="flex flex-wrap items-center justify-between text-xs font-bold text-[#7A6A58] mb-2 gap-1">
                <span>{t.subjectTest.questionProgress(currentIdx + 1, questions.length)}</span>
                <span className="bg-[#FFF8EE] border border-[#F4A340]/25 px-2.5 py-0.5 rounded-full text-[#165A44] whitespace-nowrap">
                  {t.subjectTest.classCurriculum(currentQ.gradeLevel)}
                </span>
              </div>
              <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#F4A340] to-[#1F7A5C] h-full rounded-full transition-all duration-300"
                  style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Question Text */}
            <div className="flex items-start gap-3 py-2 min-w-0">
              <span className="text-3xl sm:text-4xl shrink-0">{currentQ.emoji}</span>
              <h3 className="text-base sm:text-xl font-heading font-extrabold text-[#2C2621] leading-snug break-words">
                {currentQ.question}
              </h3>
            </div>

            {/* Options List (Large tap targets for rural touch devices) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQ.options.map((opt, oIdx) => {
                const isSelected = selectedOption === oIdx;
                const isCorrect = oIdx === currentQ.correctIndex;
                let btnStyle = 'bg-[#FFFDF9] border-[#F4A340]/25 hover:bg-[#FFF8EE] text-[#2C2621]';

                if (showExplanation) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-extrabold ring-2 ring-emerald-300';
                  } else if (isSelected && !isCorrect) {
                    btnStyle = 'bg-rose-50 border-rose-400 text-rose-800 opacity-90';
                  } else {
                    btnStyle = 'bg-stone-50 border-stone-200 text-stone-400';
                  }
                }

                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelectOption(oIdx)}
                    disabled={showExplanation}
                    className={`p-3.5 sm:p-4 rounded-2xl border-2 text-left flex items-center justify-between transition-all cursor-pointer min-w-0 ${btnStyle}`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-7 h-7 rounded-xl bg-white border border-stone-300 flex items-center justify-center text-xs font-bold text-stone-700 shrink-0">
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span className="text-xs sm:text-sm font-bold break-words">{opt}</span>
                    </div>

                    {showExplanation && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                    {showExplanation && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback & Explanation Box */}
            {showExplanation && (
              <div className="bg-[#FFF8EE] rounded-2xl p-4 border border-[#F4A340]/30 animate-in fade-in space-y-2 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-extrabold">
                    {selectedOption === currentQ.correctIndex ? (
                      <span className="text-emerald-700 flex items-center gap-1 whitespace-nowrap">
                        <CheckCircle2 className="w-4 h-4 shrink-0" /> {t.subjectTest.correctAnswer}
                      </span>
                    ) : (
                      <span className="text-rose-600 flex items-center gap-1 whitespace-nowrap">
                        <XCircle className="w-4 h-4 shrink-0" /> {t.subjectTest.incorrectAnswer}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={handleNext}
                    className="px-4 sm:px-5 py-2 rounded-xl bg-[#1F7A5C] hover:bg-[#165A44] text-white text-xs font-extrabold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <span>{currentIdx < questions.length - 1 ? t.subjectTest.nextQuestion : t.subjectTest.viewResults}</span>
                    <ChevronRight className="w-4 h-4 shrink-0" />
                  </button>
                </div>

                <p className="text-xs text-[#5C4D3C] font-medium break-words">
                  <span className="font-bold text-[#165A44]">{t.subjectTest.whyLabel}: </span>
                  {currentQ.explanation}
                </p>
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
};
