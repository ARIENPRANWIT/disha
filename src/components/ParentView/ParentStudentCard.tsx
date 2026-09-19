import React, { useState } from 'react';
import { Student, Assessment, Language } from '../../types';
import { StorageService } from '../../services/storage';
import { HOME_ACTIVITIES_BY_LEVEL } from '../../data/seedData';
import { translations } from '../../i18n/translations';
import { 
  Share2, 
  Printer, 
  CheckCircle, 
  Smile,
} from 'lucide-react';

interface ParentStudentCardProps {
  students: Student[];
  selectedStudent: Student;
  onSelectStudent: (student: Student) => void;
  language: Language;
}

export const ParentStudentCard: React.FC<ParentStudentCardProps> = ({
  students,
  selectedStudent,
  onSelectStudent,
  language,
}) => {
  const t = translations[language];
  const [copiedShare, setCopiedShare] = useState(false);

  const latestAssessment = StorageService.getLatestAssessment(selectedStudent.id);
  const baseline = StorageService.getBaselineAssessment(selectedStudent.id);

  const litLevel = latestAssessment ? latestAssessment.literacyLevel : 1;
  const numLevel = latestAssessment ? latestAssessment.numeracyLevel : 1;

  const litInfo = t.litLevels[litLevel];
  const numInfo = t.numLevels[numLevel];

  // Auto-generate plain language "What your child can proudly do today"
  const getCanDoSentence = () => {
    const litSentence = t.parentCard.canDoSentences.lit[litLevel as 1|2|3|4|5] || t.parentCard.canDoSentences.lit[1];
    const numSentence = t.parentCard.canDoSentences.num[numLevel as 1|2|3|4] || t.parentCard.canDoSentences.num[1];
    return `${selectedStudent.name} ${litSentence}, ${numSentence}!`;
  };

  // Picture-based home practice activities for this child's level
  const litActivities = HOME_ACTIVITIES_BY_LEVEL.literacy[litLevel as 1 | 2 | 3 | 4 | 5] || [];

  // Plant Growth Stage Visualizer
  const plantStages = [
    { level: 1, label: t.parentCard.plantSeedling, emoji: '🌱' },
    { level: 2, label: t.parentCard.plantSprout, emoji: '🌿' },
    { level: 3, label: t.parentCard.plantPlant, emoji: '🪴' },
    { level: 4, label: t.parentCard.plantBloomed, emoji: '🌸' },
    { level: 5, label: t.parentCard.plantBanyan, emoji: '🌳' },
  ];

  const handleShareWhatsApp = () => {
    const text = `🌟 *Disha Learning Growth Card for ${selectedStudent.name}* (${t.roster.classPrefix} ${selectedStudent.grade})\n` +
      `🌱 *${t.roster.readingLevel}:* ${litInfo.name} (${litInfo.icon})\n` +
      `🔢 *${t.roster.mathLevel}:* ${numInfo.name} (${numInfo.icon})\n\n` +
      `✨ *${t.parentCard.canDoTitle}:*\n"${getCanDoSentence()}"\n\n` +
      `🎯 *${t.parentCard.homeActivitiesTitle}:*\n${litActivities[0]?.icon || '📖'} ${litActivities[0]?.title || ''}: ${litActivities[0]?.text || ''}\n\n` +
      `_Govt. Primary School Chandpur • TaRL Program_`;

    const encoded = encodeURIComponent(text);
    const phone = selectedStudent.parentPhone.replace(/[^0-9]/g, '');
    const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encoded}`;
    
    // Copy to clipboard fallback
    navigator.clipboard?.writeText(text);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 3000);

    window.open(url, '_blank');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Student Selector Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 sm:p-4 rounded-3xl border border-[#F4A340]/30 shadow-xs">
        <div className="flex items-center gap-2 overflow-x-auto py-1 max-w-full sm:max-w-xl">
          <span className="text-xs font-bold text-[#8C7B68] whitespace-nowrap hidden sm:inline">
            {t.parentCard.selectChild}:
          </span>
          {students.map((s) => (
            <button
              key={s.id}
              onClick={() => onSelectStudent(s)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedStudent.id === s.id
                  ? 'bg-[#1F7A5C] text-white shadow-xs scale-102'
                  : 'bg-[#FFF8EE] hover:bg-[#FFEECF] text-[#4A3E31] border border-[#F4A340]/25'
              }`}
            >
              <span>{s.avatar}</span>
              <span className="truncate max-w-[100px]">{s.name}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleShareWhatsApp}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-extrabold shadow-sm shadow-emerald-200 transition-all cursor-pointer whitespace-nowrap"
          >
            <Share2 className="w-3.5 h-3.5 shrink-0" />
            <span>{t.parentCard.whatsAppShare}</span>
          </button>
          <button
            onClick={() => window.print()}
            className="p-2 rounded-2xl border border-[#F4A340]/30 hover:bg-[#FFF8EE] text-[#165A44] cursor-pointer"
            title="Print Card"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {copiedShare && (
        <div className="bg-emerald-100 text-emerald-800 text-xs font-bold px-4 py-2 rounded-2xl border border-emerald-300 text-center animate-in fade-in break-words">
          ✓ {t.parentCard.whatsAppCopied}
        </div>
      )}

      {/* Main Growth Card (Aesthetic, Warm, Intuitive for Low-Literacy Parents) */}
      <div className="bg-gradient-to-b from-[#FFFDF9] via-[#FFF9F0] to-[#FCF4E6] border-2 border-[#F4A340]/35 rounded-3xl p-4 sm:p-8 shadow-md relative overflow-hidden">
        {/* Background decorative flower & sun glow */}
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-gradient-to-br from-[#F4A340]/20 to-transparent pointer-events-none"></div>

        {/* Card Header: Student Avatar & Verified Badge */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 text-center sm:text-left pb-6 border-b border-[#F4A340]/20">
          <div className="flex flex-col sm:flex-row items-center gap-4 min-w-0">
            <div className="relative shrink-0">
              <div className="w-20 h-20 rounded-3xl bg-white border-2 border-[#F4A340]/40 flex items-center justify-center text-4xl shadow-md">
                {selectedStudent.avatar}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-emerald-600 text-white rounded-full p-1 shadow-xs">
                <CheckCircle className="w-4 h-4" />
              </div>
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-[#165A44] truncate">
                  {selectedStudent.name}
                </h2>
                <span className="bg-[#1F7A5C] text-white text-xs font-bold px-2.5 py-0.5 rounded-full whitespace-nowrap shrink-0">
                  {t.roster.classPrefix} {selectedStudent.grade}-{selectedStudent.section}
                </span>
              </div>
              <p className="text-xs text-[#7A6A58] mt-1 font-medium break-words">
                {t.roster.parentLabel}: {selectedStudent.parentName} • {t.roster.rollPrefix}{selectedStudent.rollNo}
              </p>
              <p className="text-[11px] text-[#A36C28] mt-0.5 font-semibold break-words">
                Govt. Primary School Chandpur • TaRL Growth Track
              </p>
            </div>
          </div>

          <div className="bg-white/90 px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl border border-[#F4A340]/30 shadow-2xs text-center shrink-0 max-w-full sm:max-w-[220px]">
            <div className="text-[10px] uppercase font-bold text-[#8C7B68]">{t.parentCard.currentStage}</div>
            <div className="text-sm sm:text-base font-heading font-extrabold text-[#E8734A] flex items-center justify-center gap-1.5 break-words mt-0.5">
              <span>{litInfo.icon}</span>
              <span>{litInfo.name}</span>
            </div>
          </div>
        </div>

        {/* CORE PLANT GROWTH METAPHOR FOR LOW-LITERACY PARENTS */}
        <div className="py-6 border-b border-[#F4A340]/20">
          <div className="text-center mb-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#165A44] bg-[#E8F6F0] px-3 py-1 rounded-full border border-[#1F7A5C]/20 break-words inline-block">
              {t.parentCard.growthPathTitle}
            </span>
            <p className="text-xs text-[#7A6A58] mt-1 break-words">
              {t.parentCard.growthPathSub(selectedStudent.name)}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 max-w-2xl mx-auto">
            {plantStages.map((stage) => {
              const isAchieved = litLevel >= stage.level;
              const isCurrent = litLevel === stage.level;

              return (
                <div
                  key={stage.level}
                  className={`flex flex-col items-center text-center p-2 sm:p-2.5 rounded-2xl border transition-all min-w-0 ${
                    isCurrent
                      ? 'bg-white border-[#E8734A] shadow-md scale-105 ring-2 ring-[#F4A340]/30'
                      : isAchieved
                      ? 'bg-[#EBF7F2] border-[#1F7A5C]/30'
                      : 'bg-stone-100/70 border-stone-200 opacity-50'
                  }`}
                >
                  <div className="text-2xl sm:text-3xl mb-1 shrink-0">{stage.emoji}</div>
                  <div className={`text-[10px] sm:text-[11px] font-bold leading-tight break-words w-full min-h-[26px] flex items-center justify-center ${isCurrent ? 'text-[#E8734A]' : 'text-[#2C2621]'}`}>
                    {stage.label}
                  </div>
                  <div className="text-[10px] text-[#7A6A58] mt-0.5 whitespace-nowrap">
                    {t.parentCard.levelPrefix} {stage.level}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* WHAT YOUR CHILD CAN PROUDLY DO TODAY (PLAIN LANGUAGE) */}
        <div className="py-6 border-b border-[#F4A340]/20">
          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#F4A340]/30 shadow-xs flex flex-col sm:flex-row items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#F4A340] to-[#E8734A] text-white flex items-center justify-center shrink-0 text-2xl shadow-xs">
              🌟
            </div>
            <div className="min-w-0 w-full">
              <h3 className="text-sm font-heading font-extrabold text-[#165A44] break-words">
                {t.parentCard.canDoTitle}:
              </h3>
              <p className="text-xs sm:text-sm font-bold text-[#2C2621] mt-1.5 leading-relaxed bg-[#FFF8EE] p-3 rounded-2xl border border-[#F4A340]/20 break-words">
                "{getCanDoSentence()}"
              </p>
            </div>
          </div>
        </div>

        {/* HOME PICTURE ACTIVITIES (NO LITERACY NEEDED) */}
        <div className="pt-6 space-y-4">
          <div>
            <h3 className="text-base font-heading font-extrabold text-[#165A44] flex items-center gap-2 break-words">
              <span>🏡</span>
              <span>{t.parentCard.homeActivitiesTitle}</span>
            </h3>
            <p className="text-xs text-[#7A6A58] break-words">
              {t.parentCard.homeActivitiesSub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {litActivities.map((act) => (
              <div
                key={act.id}
                className="bg-white rounded-2xl p-4 border border-[#F4A340]/25 shadow-2xs hover:border-[#1F7A5C]/40 transition-all flex flex-col justify-between min-w-0"
              >
                <div>
                  <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-[#2C2621] mb-1.5 min-w-0">
                    <span className="text-2xl shrink-0">{act.icon}</span>
                    <span className="truncate">{act.title}</span>
                  </div>
                  <p className="text-xs text-[#5C4D3C] leading-relaxed break-words">
                    {act.text}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-[#1F7A5C] font-bold">
                  <span className="break-words">{t.parentCard.noReadingNeeded}</span>
                  <Smile className="w-3.5 h-3.5 text-[#F4A340] shrink-0" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-8 pt-4 border-t border-[#F4A340]/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8C7B68]">
          <span className="break-words">{t.parentCard.assessedBy}</span>
          <span className="font-semibold text-[#165A44] break-words">
            {t.parentCard.groupLabel}: {litLevel >= 4 ? 'Group A (Story)' : litLevel === 3 ? 'Group B (Words)' : 'Group C (Foundational)'}
          </span>
        </div>
      </div>
    </div>
  );
};
