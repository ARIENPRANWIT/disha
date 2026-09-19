import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Student, Assessment, LiteracyLevel, NumeracyLevel, AssessmentTerm, Language } from '../../types';
import { StorageService } from '../../services/storage';
import { translations } from '../../i18n/translations';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  Calendar, 
  ArrowRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

interface AssessmentModalProps {
  student: Student;
  isOpen: boolean;
  onClose: () => void;
  onAssessmentSaved: (newAssessment: Assessment, isLevelUp: boolean) => void;
  language: Language;
}

export const AssessmentModal: React.FC<AssessmentModalProps> = ({
  student,
  isOpen,
  onClose,
  onAssessmentSaved,
  language,
}) => {
  const t = translations[language];
  const [term, setTerm] = useState<AssessmentTerm>('term1');
  const [selectedLit, setSelectedLit] = useState<LiteracyLevel>(2);
  const [selectedNum, setSelectedNum] = useState<NumeracyLevel>(2);
  const [notes, setNotes] = useState<string>('');
  const [previousAssessment, setPreviousAssessment] = useState<Assessment | undefined>(undefined);

  useEffect(() => {
    if (student) {
      const latest = StorageService.getLatestAssessment(student.id);
      setPreviousAssessment(latest);
      if (latest) {
        setSelectedLit(latest.literacyLevel);
        setSelectedNum(latest.numeracyLevel);
        setNotes('');
      } else {
        setSelectedLit(1);
        setSelectedNum(1);
      }
    }
  }, [student]);

  if (!isOpen || !student) return null;

  const handleSave = () => {
    const { assessment, isLevelUp } = StorageService.recordAssessment({
      studentId: student.id,
      term,
      literacyLevel: selectedLit,
      numeracyLevel: selectedNum,
      assessedBy: 'Sunita Sharma (Teacher)',
      notes: notes || undefined,
    });

    if (isLevelUp) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F4A340', '#1F7A5C', '#E8734A', '#F97316'],
      });
    }

    onAssessmentSaved(assessment, isLevelUp);
    onClose();
  };

  const isLevelUpPredicted =
    previousAssessment &&
    (selectedLit > previousAssessment.literacyLevel || selectedNum > previousAssessment.numeracyLevel);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/50 backdrop-blur-xs animate-in fade-in">
      <div className="bg-[#FFFDF9] w-full max-w-xl rounded-3xl border-2 border-[#F4A340]/30 shadow-2xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#FFF3DF] to-[#FCF1DC] border-b border-[#F4A340]/25 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 rounded-2xl bg-white border border-[#F4A340]/40 flex items-center justify-center text-2xl shadow-xs shrink-0">
              {student.avatar}
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-1.5">
                <h3 className="text-base sm:text-lg font-heading font-extrabold text-[#165A44] truncate">
                  {student.name}
                </h3>
                <span className="bg-[#1F7A5C] text-white text-[11px] font-bold px-2 py-0.5 rounded-full shrink-0">
                  {t.roster.classPrefix} {student.grade}-{student.section}
                </span>
              </div>
              <p className="text-xs text-[#7A6A58] font-medium break-words">
                {t.roster.rollPrefix}{student.rollNo} • {t.assessModal.tapSubtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/80 hover:bg-white text-[#7A6A58] hover:text-[#2C2621] flex items-center justify-center transition-all border border-[#F4A340]/20 cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-5">
          {/* Term Selector */}
          <div>
            <label className="block text-xs font-bold text-[#6D5D4B] mb-2 uppercase tracking-wider">
              {t.assessModal.phaseLabel}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['baseline', 'term1', 'term2', 'endline'] as AssessmentTerm[]).map((tKey) => (
                <button
                  key={tKey}
                  type="button"
                  onClick={() => setTerm(tKey)}
                  className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all border cursor-pointer truncate ${
                    term === tKey
                      ? 'bg-[#1F7A5C] text-white border-[#1F7A5C] shadow-xs'
                      : 'bg-white text-[#5C5042] border-[#F4A340]/25 hover:bg-[#FFF8EE]'
                  }`}
                >
                  {t[tKey]}
                </button>
              ))}
            </div>
          </div>

          {/* Previous Level Context */}
          {previousAssessment && (
            <div className="bg-[#FFF4E5] border border-[#F4A340]/30 rounded-2xl p-3 flex flex-wrap items-center justify-between text-xs gap-2">
              <div className="flex items-center gap-2 text-[#7A5016] min-w-0">
                <TrendingUp className="w-4 h-4 text-[#E8734A] shrink-0" />
                <span className="font-medium whitespace-nowrap">{t.assessModal.prevRecorded}:</span>
                <span className="font-bold truncate">
                  {t.litLevels[previousAssessment.literacyLevel].name} & {t.numLevels[previousAssessment.numeracyLevel].name}
                </span>
              </div>
              <span className="text-[11px] text-[#A36C28] flex items-center gap-1 font-semibold shrink-0">
                <Calendar className="w-3 h-3" />
                {previousAssessment.date}
              </span>
            </div>
          )}

          {/* 1. Literacy Levels (EGRA) */}
          <div>
            <div className="flex items-center justify-between mb-2 gap-2">
              <span className="text-sm font-heading font-extrabold text-[#165A44] flex items-center gap-1.5 truncate">
                📖 {t.assessModal.readingSection}
              </span>
              <span className="text-xs font-bold text-[#E8734A] bg-[#FFF0E8] px-2.5 py-0.5 rounded-full border border-[#E8734A]/25 shrink-0">
                {t.litLevels[selectedLit].name}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
              {([1, 2, 3, 4, 5] as LiteracyLevel[]).map((lvl) => {
                const isSelected = selectedLit === lvl;
                const info = t.litLevels[lvl];
                return (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSelectedLit(lvl)}
                    className={`p-2.5 sm:p-2 rounded-2xl text-left sm:text-center flex sm:flex-col items-center justify-between sm:justify-center gap-1.5 transition-all border-2 cursor-pointer min-w-0 ${
                      isSelected
                        ? 'bg-gradient-to-b from-[#FFF0DB] to-[#FCE4C3] border-[#E8734A] shadow-md scale-[1.02]'
                        : 'bg-white hover:bg-[#FFF8EE] border-[#F4A340]/25'
                    }`}
                  >
                    <div className="flex items-center sm:flex-col gap-2 min-w-0">
                      <span className="text-xl sm:text-2xl shrink-0">{info.icon}</span>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-[#2C2621] leading-tight truncate sm:whitespace-normal">
                          {info.name}
                        </div>
                        <div className="text-[10px] text-[#7A6A58] line-clamp-1 mt-0.5 font-medium sm:hidden">
                          {info.desc}
                        </div>
                      </div>
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-[#E8734A] shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
            <p className="text-[11px] text-[#6D5D4B] mt-1.5 italic break-words">
              {t.litLevels[selectedLit].desc}
            </p>
          </div>

          {/* 2. Numeracy Levels (EGMA) */}
          <div>
            <div className="flex items-center justify-between mb-2 gap-2">
              <span className="text-sm font-heading font-extrabold text-[#165A44] flex items-center gap-1.5 truncate">
                🔢 {t.assessModal.mathSection}
              </span>
              <span className="text-xs font-bold text-[#1F7A5C] bg-[#E8F6F0] px-2.5 py-0.5 rounded-full border border-[#1F7A5C]/25 shrink-0">
                {t.numLevels[selectedNum].name}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
              {([1, 2, 3, 4] as NumeracyLevel[]).map((lvl) => {
                const isSelected = selectedNum === lvl;
                const info = t.numLevels[lvl];
                return (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSelectedNum(lvl)}
                    className={`p-2.5 sm:p-2 rounded-2xl text-left sm:text-center flex sm:flex-col items-center justify-between sm:justify-center gap-1.5 transition-all border-2 cursor-pointer min-w-0 ${
                      isSelected
                        ? 'bg-gradient-to-b from-[#E6F7F0] to-[#CFEFE1] border-[#1F7A5C] shadow-md scale-[1.02]'
                        : 'bg-white hover:bg-[#FFF8EE] border-[#F4A340]/25'
                    }`}
                  >
                    <div className="flex items-center sm:flex-col gap-2 min-w-0">
                      <span className="text-xl sm:text-2xl shrink-0">{info.icon}</span>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-[#2C2621] leading-tight truncate sm:whitespace-normal">
                          {info.name}
                        </div>
                        <div className="text-[10px] text-[#7A6A58] line-clamp-1 mt-0.5 font-medium sm:hidden">
                          {info.desc}
                        </div>
                      </div>
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-[#1F7A5C] shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
            <p className="text-[11px] text-[#6D5D4B] mt-1.5 italic break-words">
              {t.numLevels[selectedNum].desc}
            </p>
          </div>

          {/* Celebration Indicator */}
          {isLevelUpPredicted && (
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-300 rounded-2xl p-3 flex items-center gap-3 text-emerald-800 animate-pulse min-w-0">
              <Sparkles className="w-5 h-5 text-emerald-600 shrink-0" />
              <div className="text-xs font-semibold min-w-0">
                <span className="font-extrabold text-emerald-900 break-words">{t.assessModal.levelUpAwesome}</span>
                <p className="text-[11px] text-emerald-700 break-words">
                  {t.assessModal.levelUpDetail(student.name)}
                </p>
              </div>
            </div>
          )}

          {/* Quick Optional Observation */}
          <div>
            <label className="block text-xs font-bold text-[#6D5D4B] mb-1">
              {t.assessModal.obsLabel}
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t.assessModal.obsPlaceholder}
              className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#F4A340]/30 text-xs text-[#2C2621] placeholder:text-[#A89885] focus:outline-none focus:ring-2 focus:ring-[#1F7A5C]/40"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-white border-t border-[#F4A340]/25 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-[#F4A340]/30 text-xs font-bold text-[#6D5D4B] hover:bg-[#FFF8EE] cursor-pointer whitespace-nowrap"
          >
            {t.assessModal.cancelBtn}
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="flex-1 sm:flex-none px-5 sm:px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#1F7A5C] to-[#165A44] hover:from-[#165A44] hover:to-[#124836] text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-sm shadow-emerald-700/20 active:scale-98 transition-all cursor-pointer whitespace-nowrap"
          >
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{t.assessModal.saveBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
