import React, { useState } from 'react';
import { Student, LearningGroup, Language } from '../../types';
import { translations } from '../../i18n/translations';
import { 
  Layers, 
  Users, 
  Sparkles, 
  Printer, 
  BookOpen, 
  Clock, 
  Award,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface AutoGroupingViewProps {
  students: Student[];
  literacyGroups: LearningGroup[];
  numeracyGroups: LearningGroup[];
  language: Language;
  onSelectStudentForAssess: (student: Student) => void;
}

export const AutoGroupingView: React.FC<AutoGroupingViewProps> = ({
  students,
  literacyGroups,
  numeracyGroups,
  language,
  onSelectStudentForAssess,
}) => {
  const [activeTab, setActiveTab] = useState<'literacy' | 'numeracy'>('literacy');
  const t = translations[language];

  const currentGroups = activeTab === 'literacy' ? literacyGroups : numeracyGroups;

  return (
    <div className="space-y-6">
      {/* Top TaRL Methodology Banner */}
      <div className="bg-gradient-to-r from-[#FFF5E6] via-[#FFF0DB] to-[#FCECD4] border-2 border-[#F4A340]/40 rounded-3xl p-4 sm:p-6 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="max-w-2xl min-w-0">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1F7A5C] text-white text-[11px] font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#F4A340] shrink-0" />
              <span className="truncate">{t.groups.bannerBadge}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-[#165A44] leading-tight break-words">
              {t.groups.bannerTitle}
            </h2>
            <p className="text-xs text-[#5C4D3C] mt-1.5 leading-relaxed break-words">
              {t.groups.bannerDesc}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0 w-full sm:w-auto">
            <div className="flex items-center gap-2 bg-white/90 px-3.5 py-2 rounded-2xl border border-[#F4A340]/30 shadow-2xs">
              <Clock className="w-4 h-4 text-[#F4A340] shrink-0" />
              <span className="text-xs font-bold text-[#165A44] whitespace-nowrap">
                {t.groups.recoTime}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-[#E8F6F0] px-3.5 py-2 rounded-2xl border border-[#1F7A5C]/20 shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-[#1F7A5C] shrink-0" />
              <span className="text-xs font-bold text-[#1F7A5C] whitespace-nowrap">
                {t.groups.peerLearning}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Switcher Pill: Reading vs Math Groups */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 bg-[#FCF5E8] p-1.5 rounded-2xl border border-[#F4A340]/30 overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveTab('literacy')}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
              activeTab === 'literacy'
                ? 'bg-[#1F7A5C] text-white shadow-xs'
                : 'text-[#5C5042] hover:bg-white/70'
            }`}
          >
            📖 {t.groups.readingTab}
          </button>
          <button
            onClick={() => setActiveTab('numeracy')}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
              activeTab === 'numeracy'
                ? 'bg-[#1F7A5C] text-white shadow-xs'
                : 'text-[#5C5042] hover:bg-white/70'
            }`}
          >
            🔢 {t.groups.mathTab}
          </button>
        </div>

        <button
          onClick={() => window.print()}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-2xl bg-white border border-[#F4A340]/30 hover:bg-[#FFF8EE] text-[#165A44] text-xs font-bold transition-all shadow-xs cursor-pointer whitespace-nowrap shrink-0"
        >
          <Printer className="w-3.5 h-3.5 shrink-0" />
          <span>{t.groups.printBtn}</span>
        </button>
      </div>

      {/* Dynamic Group Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentGroups.map((group) => {
          const groupStudents = students.filter((s) => group.studentIds.includes(s.id));
          const levelInfo = activeTab === 'literacy' ? t.litLevels[group.level as 1|2|3|4|5] : t.numLevels[group.level as 1|2|3|4];
          const stageKeys = ['seedling', 'sprout', 'plant', 'bloomed', 'banyan'] as const;
          const stageKey = stageKeys[Math.min(Math.max(group.level - 1, 0), 4)];
          const stageLabel = t.parentCard.plantStages[stageKey];

          return (
            <div
              key={group.id}
              className="bg-gradient-to-b from-[#FFFDF9] to-[#FFF8EE] border-2 border-[#F4A340]/30 rounded-3xl p-4 sm:p-5 shadow-xs flex flex-col justify-between hover:border-[#F4A340]/60 transition-all min-w-0"
            >
              <div className="min-w-0">
                {/* Group Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-11 h-11 rounded-2xl bg-white border border-[#F4A340]/30 flex items-center justify-center text-2xl shadow-2xs shrink-0">
                      {levelInfo?.icon || group.badge.split(' ')[0]}
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <h3 className="font-heading font-extrabold text-base text-[#165A44] leading-tight break-words">
                          {levelInfo ? levelInfo.name : group.displayName}
                        </h3>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E8734A]/15 text-[#E8734A] shrink-0 max-w-[140px] truncate">
                          {stageLabel || group.badge}
                        </span>
                      </div>
                      <p className="text-xs text-[#7A6A58] mt-0.5 break-words">
                        {levelInfo ? levelInfo.desc : group.tagline}
                      </p>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-white border border-[#F4A340]/30 text-[#165A44] shadow-2xs shrink-0 whitespace-nowrap">
                    {t.groups.childrenCount(groupStudents.length)}
                  </span>
                </div>

                {/* Students Roster in this Group */}
                <div className="bg-white/80 rounded-2xl p-3 border border-[#F4A340]/20 mb-4 min-w-0">
                  <div className="text-[11px] font-bold text-[#8C7B68] uppercase tracking-wider mb-2 flex flex-wrap items-center justify-between gap-1">
                    <span>{t.groups.assignedTitle}</span>
                    <span className="text-[10px] text-[#A36C28] font-bold">
                      {t.groups.multiGradeTip}
                    </span>
                  </div>

                  {groupStudents.length === 0 ? (
                    <p className="text-xs text-stone-400 py-2 italic text-center">
                      {t.groups.noChildren}
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {groupStudents.map((std) => (
                        <button
                          key={std.id}
                          onClick={() => onSelectStudentForAssess(std)}
                          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#FFF8EE] hover:bg-[#FFEECF] border border-[#F4A340]/30 text-xs font-semibold text-[#2C2621] transition-colors cursor-pointer group shrink-0"
                          title={t.groups.reassessTooltip}
                        >
                          <span className="shrink-0">{std.avatar}</span>
                          <span className="group-hover:text-[#165A44] truncate max-w-[120px]">{std.name}</span>
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-[#1F7A5C]/15 text-[#1F7A5C] shrink-0">
                            {t.roster.classPrefix} {std.grade}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Recommended TaRL Group Teaching Activities */}
                <div className="space-y-2 min-w-0">
                  <div className="text-[11px] font-bold text-[#165A44] uppercase tracking-wider flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-[#F4A340] shrink-0" />
                    <span>{t.groups.activitiesTitle}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {group.recommendedActivities.map((act, i) => (
                      <div
                        key={i}
                        className="bg-white/90 rounded-2xl p-3 border border-[#F4A340]/25 text-xs flex flex-col justify-between min-w-0"
                      >
                        <div>
                          <div className="flex items-center gap-1.5 font-bold text-[#2C2621] mb-1">
                            <span className="shrink-0">{act.icon}</span>
                            <span className="truncate">{act.title}</span>
                          </div>
                          <p className="text-[11px] text-[#6D5D4B] leading-relaxed break-words">
                            {act.description}
                          </p>
                        </div>
                        <div className="mt-2 pt-1.5 border-t border-stone-100 text-[10px] text-[#8C7B68] font-medium break-words">
                          <span className="font-bold text-[#1F7A5C]">{t.groups.materialsLabel}</span> {act.materials}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Tip */}
              <div className="mt-4 pt-3 border-t border-[#F4A340]/20 flex flex-wrap items-center justify-between gap-1 text-[11px] text-[#7A6A58]">
                <span className="break-words">{t.groups.teacherTip}</span>
                <span className="font-bold text-[#1F7A5C] whitespace-nowrap">{group.badge}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
