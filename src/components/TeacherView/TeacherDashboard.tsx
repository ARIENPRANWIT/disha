import React, { useState } from 'react';
import { Student, Assessment, LearningGroup, Language } from '../../types';
import { StorageService } from '../../services/storage';
import { translations } from '../../i18n/translations';
import { AutoGroupingView } from './AutoGroupingView';
import { RosterManager } from './RosterManager';
import { HeadmasterSummaryPrint } from './HeadmasterSummaryPrint';
import { 
  Users, 
  BarChart3, 
  Layers, 
  FileSpreadsheet, 
  Sparkles, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2,
  Clock,
  ArrowRight,
  BookOpen,
  Calculator,
  UserCheck
} from 'lucide-react';

interface TeacherDashboardProps {
  students: Student[];
  assessments: Assessment[];
  language: Language;
  onAddStudent: (student: Omit<Student, 'id'>) => void;
  onSelectStudentForAssess: (student: Student) => void;
  onViewStudentParentCard: (student: Student) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  students,
  assessments,
  language,
  onAddStudent,
  onSelectStudentForAssess,
  onViewStudentParentCard,
}) => {
  const [subTab, setSubTab] = useState<'overview' | 'groups' | 'roster' | 'report'>('overview');
  const t = translations[language];

  const { literacyGroups, numeracyGroups } = StorageService.computeTaRLGroups();

  // Aggregate stats computation
  const total = students.length || 1;
  const latestData = students.map((std) => ({
    student: std,
    latest: StorageService.getLatestAssessment(std.id),
    baseline: StorageService.getBaselineAssessment(std.id),
  }));

  // Reading Level Counts
  let litBeginner = 0; // Level 1
  let litDeveloping = 0; // Level 2 & 3
  let litFluent = 0; // Level 4 & 5

  // Math Level Counts
  let numBeginner = 0; // Level 1
  let numDeveloping = 0; // Level 2
  let numFluent = 0; // Level 3 & 4

  latestData.forEach(({ latest }) => {
    const lLevel = latest ? latest.literacyLevel : 1;
    const nLevel = latest ? latest.numeracyLevel : 1;

    if (lLevel === 1) litBeginner += 1;
    else if (lLevel <= 3) litDeveloping += 1;
    else litFluent += 1;

    if (nLevel === 1) numBeginner += 1;
    else if (nLevel === 2) numDeveloping += 1;
    else numFluent += 1;
  });

  const litBeginnerPct = Math.round((litBeginner / total) * 100);
  const litDevelopingPct = Math.round((litDeveloping / total) * 100);
  const litFluentPct = Math.round((litFluent / total) * 100);

  const numBeginnerPct = Math.round((numBeginner / total) * 100);
  const numDevelopingPct = Math.round((numDeveloping / total) * 100);
  const numFluentPct = Math.round((numFluent / total) * 100);

  // Reality Gap: Students in Class 3, 4, 5 who are at Beginner or Letter level
  const gapStudents = latestData.filter(({ student, latest }) => {
    if (student.grade >= 3) {
      const lvl = latest ? latest.literacyLevel : 1;
      return lvl <= 2; // Class 3+ still at beginner/letter level
    }
    return false;
  });

  return (
    <div className="space-y-6">
      {/* Sub navigation bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#F4A340]/25 pb-3">
        <div className="flex items-center gap-1.5 bg-[#FCF5E8] p-1.5 rounded-2xl border border-[#F4A340]/30 overflow-x-auto max-w-full">
          <button
            onClick={() => setSubTab('overview')}
            className={`flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
              subTab === 'overview'
                ? 'bg-[#1F7A5C] text-white shadow-xs'
                : 'text-[#5C5042] hover:bg-white/60'
            }`}
          >
            <BarChart3 className="w-4 h-4 shrink-0" />
            <span>{t.teacher.chartTab}</span>
          </button>

          <button
            onClick={() => setSubTab('groups')}
            className={`flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
              subTab === 'groups'
                ? 'bg-[#1F7A5C] text-white shadow-xs'
                : 'text-[#5C5042] hover:bg-white/60'
            }`}
          >
            <Layers className="w-4 h-4 text-[#F4A340] shrink-0" />
            <span>{t.teacher.groupsTab} ({literacyGroups.length})</span>
          </button>

          <button
            onClick={() => setSubTab('roster')}
            className={`flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
              subTab === 'roster'
                ? 'bg-[#1F7A5C] text-white shadow-xs'
                : 'text-[#5C5042] hover:bg-white/60'
            }`}
          >
            <Users className="w-4 h-4 shrink-0" />
            <span>{t.teacher.rosterTab} ({students.length})</span>
          </button>

          <button
            onClick={() => setSubTab('report')}
            className={`flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
              subTab === 'report'
                ? 'bg-[#1F7A5C] text-white shadow-xs'
                : 'text-[#5C5042] hover:bg-white/60'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4 text-[#E8734A] shrink-0" />
            <span>{t.teacher.reportTab}</span>
          </button>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onSelectStudentForAssess(students[0])}
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-2xl bg-gradient-to-r from-[#F4A340] to-[#E8734A] hover:opacity-95 text-white text-xs font-extrabold shadow-sm transition-all cursor-pointer whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4 text-white shrink-0" />
            <span>{t.teacher.startAssess}</span>
          </button>
        </div>
      </div>

      {/* Render Sub Tabs */}
      {subTab === 'groups' && (
        <AutoGroupingView
          students={students}
          literacyGroups={literacyGroups}
          numeracyGroups={numeracyGroups}
          language={language}
          onSelectStudentForAssess={onSelectStudentForAssess}
        />
      )}

      {subTab === 'roster' && (
        <RosterManager
          students={students}
          onAddStudent={onAddStudent}
          onSelectStudentForAssess={onSelectStudentForAssess}
          onViewStudentParentCard={onViewStudentParentCard}
          language={language}
        />
      )}

      {subTab === 'report' && (
        <HeadmasterSummaryPrint
          students={students}
          assessments={assessments}
          language={language}
          onBack={() => setSubTab('overview')}
        />
      )}

      {subTab === 'overview' && (
        <div className="space-y-6">
          {/* Quick TaRL Insight Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-[#FFFDF9] to-[#FFF3DF] border border-[#F4A340]/30 rounded-3xl p-4 shadow-xs min-w-0">
              <div className="flex items-center justify-between text-[#8C7B68] text-xs font-bold mb-1 gap-1">
                <span className="truncate">{t.teacher.totalAssessed}</span>
                <Users className="w-4 h-4 text-[#1F7A5C] shrink-0" />
              </div>
              <div className="text-3xl font-heading font-extrabold text-[#165A44]">
                {students.length}
              </div>
              <p className="text-[11px] text-[#7A6A58] mt-1 font-medium break-words">
                {t.teacher.enrolledClass}
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#F4FAF7] to-[#E2F7ED] border border-emerald-300 rounded-3xl p-4 shadow-xs min-w-0">
              <div className="flex items-center justify-between text-emerald-800 text-xs font-bold mb-1 gap-1">
                <span className="truncate">{t.teacher.storyLevel}</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              </div>
              <div className="text-3xl font-heading font-extrabold text-emerald-800">
                {litFluentPct}%
              </div>
              <p className="text-[11px] text-emerald-700 mt-1 font-medium break-words">
                {t.teacher.storyDesc(litFluent, students.length)}
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#FFFDF2] to-[#FFF6D4] border border-amber-300 rounded-3xl p-4 shadow-xs min-w-0">
              <div className="flex items-center justify-between text-amber-800 text-xs font-bold mb-1 gap-1">
                <span className="truncate">{t.teacher.developingLevel}</span>
                <TrendingUp className="w-4 h-4 text-amber-600 shrink-0" />
              </div>
              <div className="text-3xl font-heading font-extrabold text-amber-800">
                {litDevelopingPct}%
              </div>
              <p className="text-[11px] text-amber-700 mt-1 font-medium break-words">
                {t.teacher.developingDesc(litDeveloping)}
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#FFF5F2] to-[#FFEBE6] border border-rose-300 rounded-3xl p-4 shadow-xs min-w-0">
              <div className="flex items-center justify-between text-rose-800 text-xs font-bold mb-1 gap-1">
                <span className="truncate">{t.teacher.beginnerLevel}</span>
                <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
              </div>
              <div className="text-3xl font-heading font-extrabold text-rose-700">
                {litBeginnerPct}%
              </div>
              <p className="text-[11px] text-rose-600 mt-1 font-medium break-words">
                {t.teacher.beginnerDesc(litBeginner)}
              </p>
            </div>
          </div>

          {/* Core Traffic-Light Learning Level Distribution Chart */}
          <div className="bg-white border-2 border-[#F4A340]/30 rounded-3xl p-4 sm:p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-heading font-extrabold text-[#165A44] break-words">
                  {t.teacher.chartTitle}
                </h3>
                <p className="text-xs text-[#7A6A58] font-medium break-words">
                  {t.teacher.chartSubtitle}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs font-bold shrink-0">
                <span className="flex items-center gap-1.5 whitespace-nowrap">
                  <span className="w-3 h-3 rounded-full bg-rose-500 shrink-0"></span>
                  {t.teacher.legendBeginner}
                </span>
                <span className="flex items-center gap-1.5 whitespace-nowrap">
                  <span className="w-3 h-3 rounded-full bg-amber-400 shrink-0"></span>
                  {t.teacher.legendDeveloping}
                </span>
                <span className="flex items-center gap-1.5 whitespace-nowrap">
                  <span className="w-3 h-3 rounded-full bg-emerald-600 shrink-0"></span>
                  {t.teacher.legendMastery}
                </span>
              </div>
            </div>

            {/* Reading Band */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-between text-xs font-extrabold text-[#2C2621] gap-1">
                <span className="flex items-center gap-1.5">
                  📖 {t.teacher.oralReadingLabel}
                </span>
                <span className="text-[#165A44] font-bold">
                  {t.teacher.gradeReadersLabel(litFluentPct)}
                </span>
              </div>

              <div className="h-9 w-full bg-stone-100 rounded-2xl overflow-hidden flex shadow-inner border border-stone-200">
                <div
                  style={{ width: `${litBeginnerPct}%` }}
                  className="bg-rose-500 hover:bg-rose-600 transition-all flex items-center justify-center text-white text-xs font-bold"
                  title={`${t.teacher.legendBeginner}: ${litBeginner} (${litBeginnerPct}%)`}
                >
                  {litBeginnerPct > 10 && `🌱 ${litBeginnerPct}%`}
                </div>
                <div
                  style={{ width: `${litDevelopingPct}%` }}
                  className="bg-amber-400 hover:bg-amber-500 transition-all flex items-center justify-center text-stone-900 text-xs font-bold"
                  title={`${t.teacher.legendDeveloping}: ${litDeveloping} (${litDevelopingPct}%)`}
                >
                  {litDevelopingPct > 10 && `🪴 ${litDevelopingPct}%`}
                </div>
                <div
                  style={{ width: `${litFluentPct}%` }}
                  className="bg-emerald-600 hover:bg-emerald-700 transition-all flex items-center justify-center text-white text-xs font-bold"
                  title={`${t.teacher.legendMastery}: ${litFluent} (${litFluentPct}%)`}
                >
                  {litFluentPct > 10 && `🌳 ${litFluentPct}%`}
                </div>
              </div>
            </div>

            {/* Numeracy Band */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-between text-xs font-extrabold text-[#2C2621] gap-1">
                <span className="flex items-center gap-1.5">
                  🔢 {t.teacher.mathLabel}
                </span>
                <span className="text-[#165A44] font-bold">
                  {t.teacher.mathOpsLabel(numFluentPct)}
                </span>
              </div>

              <div className="h-9 w-full bg-stone-100 rounded-2xl overflow-hidden flex shadow-inner border border-stone-200">
                <div
                  style={{ width: `${numBeginnerPct}%` }}
                  className="bg-rose-500 hover:bg-rose-600 transition-all flex items-center justify-center text-white text-xs font-bold"
                  title={`${t.teacher.legendBeginner}: ${numBeginner} (${numBeginnerPct}%)`}
                >
                  {numBeginnerPct > 10 && `🌱 ${numBeginnerPct}%`}
                </div>
                <div
                  style={{ width: `${numDevelopingPct}%` }}
                  className="bg-amber-400 hover:bg-amber-500 transition-all flex items-center justify-center text-stone-900 text-xs font-bold"
                  title={`${t.teacher.legendDeveloping}: ${numDeveloping} (${numDevelopingPct}%)`}
                >
                  {numDevelopingPct > 10 && `🌿 ${numDevelopingPct}%`}
                </div>
                <div
                  style={{ width: `${numFluentPct}%` }}
                  className="bg-emerald-600 hover:bg-emerald-700 transition-all flex items-center justify-center text-white text-xs font-bold"
                  title={`${t.teacher.legendMastery}: ${numFluent} (${numFluentPct}%)`}
                >
                  {numFluentPct > 10 && `🌳 ${numFluentPct}%`}
                </div>
              </div>
            </div>
          </div>

          {/* The TaRL "Grade vs Actual Level" Reality Check */}
          <div className="bg-gradient-to-r from-[#FFF8EE] to-[#FFF2DF] border border-[#F4A340]/30 rounded-3xl p-4 sm:p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row items-start justify-between gap-3 mb-4">
              <div className="min-w-0">
                <div className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#E8734A]/15 text-[#E8734A] mb-1">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>{t.teacher.realityGapBadge}</span>
                </div>
                <h3 className="text-base font-heading font-extrabold text-[#165A44] break-words">
                  {t.teacher.realityGapTitle}
                </h3>
                <p className="text-xs text-[#6D5D4B] break-words">
                  {t.teacher.realityGapDesc}
                </p>
              </div>

              <button
                onClick={() => setSubTab('groups')}
                className="text-xs font-bold text-[#1F7A5C] hover:underline flex items-center gap-1 shrink-0 cursor-pointer whitespace-nowrap"
              >
                <span>{t.teacher.viewGroupsBtn}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {gapStudents.length === 0 ? (
              <div className="bg-emerald-50 text-emerald-800 p-3 rounded-2xl text-xs font-semibold">
                {t.teacher.allFluentMsg}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {gapStudents.map(({ student, latest }) => (
                  <div
                    key={student.id}
                    className="bg-white rounded-2xl p-3 border border-rose-200 flex items-center justify-between gap-2 shadow-2xs min-w-0"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-2xl shrink-0">{student.avatar}</span>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-[#2C2621] truncate">{student.name}</div>
                        <div className="text-[10px] text-rose-600 font-bold truncate">
                          {t.teacher.enrolledClassText(student.grade)} • {t.teacher.actualLabel}: {latest ? t.litLevels[latest.literacyLevel].name : t.litLevels[1].name}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectStudentForAssess(student)}
                      className="px-2.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-[11px] font-bold shrink-0 cursor-pointer whitespace-nowrap"
                    >
                      {t.teacher.assessBtn}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
