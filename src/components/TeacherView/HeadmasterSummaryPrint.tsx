import React from 'react';
import { Student, Assessment, Language } from '../../types';
import { StorageService } from '../../services/storage';
import { translations } from '../../i18n/translations';
import { Printer, ArrowLeft } from 'lucide-react';

interface HeadmasterSummaryPrintProps {
  students: Student[];
  assessments: Assessment[];
  language: Language;
  onBack: () => void;
}

export const HeadmasterSummaryPrint: React.FC<HeadmasterSummaryPrintProps> = ({
  students,
  assessments,
  language,
  onBack,
}) => {
  const t = translations[language];

  // Latest assessments
  const latestAssessments = students.map((s) => ({
    student: s,
    assessment: StorageService.getLatestAssessment(s.id),
    baseline: StorageService.getBaselineAssessment(s.id),
  }));

  const total = students.length || 1;

  // Level counts
  const litCounts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  const numCounts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0 };

  latestAssessments.forEach(({ assessment }) => {
    if (assessment) {
      litCounts[assessment.literacyLevel] = (litCounts[assessment.literacyLevel] || 0) + 1;
      numCounts[assessment.numeracyLevel] = (numCounts[assessment.numeracyLevel] || 0) + 1;
    } else {
      litCounts[1] += 1;
      numCounts[1] += 1;
    }
  });

  // Calculate percentages
  const litPct = (lvl: 1 | 2 | 3 | 4 | 5) => Math.round((litCounts[lvl] / total) * 100);
  const numPct = (lvl: 1 | 2 | 3 | 4) => Math.round((numCounts[lvl] / total) * 100);

  // Baseline comparison for progress calculation
  let totalLevelUps = 0;
  latestAssessments.forEach(({ assessment, baseline }) => {
    if (assessment && baseline) {
      if (assessment.literacyLevel > baseline.literacyLevel || assessment.numeracyLevel > baseline.numeracyLevel) {
        totalLevelUps += 1;
      }
    }
  });

  return (
    <div className="space-y-6">
      {/* Action Bar (hidden when printing) */}
      <div className="flex flex-wrap items-center justify-between gap-3 no-print bg-white p-4 rounded-3xl border border-[#F4A340]/30 shadow-xs">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-[#6D5D4B] hover:bg-[#FFF8EE] border border-[#F4A340]/25 transition-all cursor-pointer whitespace-nowrap"
        >
          <ArrowLeft className="w-4 h-4 shrink-0" />
          <span>{t.headmaster.backBtn}</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1F7A5C] hover:bg-[#165A44] text-white text-xs font-extrabold shadow-sm transition-all cursor-pointer whitespace-nowrap"
          >
            <Printer className="w-4 h-4 shrink-0" />
            <span>{t.headmaster.printBtn}</span>
          </button>
        </div>
      </div>

      {/* Official Printable Sheet (A4 format preview) */}
      <div className="bg-white p-4 sm:p-8 md:p-10 rounded-3xl border-2 border-stone-300 shadow-md print-page max-w-4xl mx-auto text-[#1C1A17] overflow-hidden">
        {/* Official Header */}
        <div className="border-b-2 border-stone-800 pb-4 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="text-[11px] uppercase tracking-wider font-extrabold text-[#7A6A58] break-words">
                {t.headmaster.districtOffice}
              </div>
              <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-[#165A44] mt-0.5 break-words">
                {t.headmaster.reportTitle}
              </h1>
              <p className="text-xs text-[#5C5042] font-semibold break-words">
                {t.headmaster.schoolMeta}
              </p>
            </div>

            <div className="text-left sm:text-right text-xs shrink-0">
              <div className="font-bold text-[#165A44] bg-[#E8F6F0] px-3 py-1 rounded-lg border border-[#1F7A5C]/30 inline-block whitespace-nowrap">
                {t.headmaster.academicTerm}
              </div>
              <div className="text-[11px] text-[#7A6A58] mt-1 whitespace-nowrap">
                {t.headmaster.generatedOn}: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </div>
            </div>
          </div>
        </div>

        {/* Executive Summary Metrics Box */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="bg-[#FFFDF9] border border-stone-300 p-3 rounded-2xl text-center min-w-0">
            <div className="text-2xl font-heading font-extrabold text-[#165A44]">
              {total}
            </div>
            <div className="text-[11px] font-bold text-[#7A6A58] uppercase truncate">{t.headmaster.totalAssessed}</div>
          </div>

          <div className="bg-[#FFFDF9] border border-stone-300 p-3 rounded-2xl text-center min-w-0">
            <div className="text-2xl font-heading font-extrabold text-emerald-700">
              {litPct(5)}%
            </div>
            <div className="text-[11px] font-bold text-[#7A6A58] uppercase truncate">{t.headmaster.storyReaders}</div>
          </div>

          <div className="bg-[#FFFDF9] border border-stone-300 p-3 rounded-2xl text-center min-w-0">
            <div className="text-2xl font-heading font-extrabold text-amber-600">
              {litPct(1)}%
            </div>
            <div className="text-[11px] font-bold text-[#7A6A58] uppercase truncate">{t.headmaster.beginnerTier}</div>
          </div>

          <div className="bg-[#FFFDF9] border border-stone-300 p-3 rounded-2xl text-center min-w-0">
            <div className="text-2xl font-heading font-extrabold text-[#E8734A]">
              +{Math.round((totalLevelUps / total) * 100)}%
            </div>
            <div className="text-[11px] font-bold text-[#7A6A58] uppercase truncate">{t.headmaster.leveledUpCount}</div>
          </div>
        </div>

        {/* Aggregate Rollup: Literacy (EGRA) Breakdown Table */}
        <div className="mb-6 overflow-x-auto">
          <h2 className="text-sm font-extrabold uppercase tracking-wide bg-stone-100 p-2 rounded-lg text-stone-800 mb-2 break-words">
            1. {t.headmaster.readingTableTitle}
          </h2>
          <table className="w-full text-xs text-left border-collapse border border-stone-300 min-w-[500px]">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-300 text-stone-700 font-bold">
                <th className="p-2 border-r border-stone-300">{t.headmaster.colLevel}</th>
                <th className="p-2 border-r border-stone-300">{t.headmaster.colSubskill}</th>
                <th className="p-2 border-r border-stone-300 text-center">{t.headmaster.colChildren}</th>
                <th className="p-2 border-r border-stone-300 text-center">{t.headmaster.colPct}</th>
                <th className="p-2">{t.headmaster.colVisual}</th>
              </tr>
            </thead>
            <tbody>
              {([1, 2, 3, 4, 5] as const).map((lvl) => {
                const info = t.litLevels[lvl];
                const pct = litPct(lvl);
                return (
                  <tr key={lvl} className="border-b border-stone-200">
                    <td className="p-2 font-bold border-r border-stone-200 flex items-center gap-1.5 whitespace-nowrap">
                      <span>{info.icon}</span> {info.name}
                    </td>
                    <td className="p-2 border-r border-stone-200 text-stone-600 break-words">{info.desc}</td>
                    <td className="p-2 border-r border-stone-200 text-center font-bold">{litCounts[lvl]}</td>
                    <td className="p-2 border-r border-stone-200 text-center font-bold text-emerald-800">{pct}%</td>
                    <td className="p-2">
                      <div className="w-full bg-stone-100 h-3 rounded-full overflow-hidden">
                        <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${pct}%` }}></div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Aggregate Rollup: Numeracy (EGMA) Breakdown Table */}
        <div className="mb-6 overflow-x-auto">
          <h2 className="text-sm font-extrabold uppercase tracking-wide bg-stone-100 p-2 rounded-lg text-stone-800 mb-2 break-words">
            2. {t.headmaster.mathTableTitle}
          </h2>
          <table className="w-full text-xs text-left border-collapse border border-stone-300 min-w-[500px]">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-300 text-stone-700 font-bold">
                <th className="p-2 border-r border-stone-300">{t.headmaster.colLevel}</th>
                <th className="p-2 border-r border-stone-300">{t.headmaster.colSubskill}</th>
                <th className="p-2 border-r border-stone-300 text-center">{t.headmaster.colChildren}</th>
                <th className="p-2 border-r border-stone-300 text-center">{t.headmaster.colPct}</th>
                <th className="p-2">{t.headmaster.colVisual}</th>
              </tr>
            </thead>
            <tbody>
              {([1, 2, 3, 4] as const).map((lvl) => {
                const info = t.numLevels[lvl];
                const pct = numPct(lvl);
                return (
                  <tr key={lvl} className="border-b border-stone-200">
                    <td className="p-2 font-bold border-r border-stone-200 flex items-center gap-1.5 whitespace-nowrap">
                      <span>{info.icon}</span> {info.name}
                    </td>
                    <td className="p-2 border-r border-stone-200 text-stone-600 break-words">{info.desc}</td>
                    <td className="p-2 border-r border-stone-200 text-center font-bold">{numCounts[lvl]}</td>
                    <td className="p-2 border-r border-stone-200 text-center font-bold text-teal-800">{pct}%</td>
                    <td className="p-2">
                      <div className="w-full bg-stone-100 h-3 rounded-full overflow-hidden">
                        <div className="bg-teal-600 h-full rounded-full" style={{ width: `${pct}%` }}></div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Verification & Sign-off Footer */}
        <div className="mt-8 pt-4 border-t border-stone-300 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-xs text-stone-600">
          <div>
            <div className="h-8 border-b border-stone-400 mb-1"></div>
            <div className="font-bold text-stone-800">Sunita Sharma</div>
            <div className="text-[10px]">{t.headmaster.teacherSign}</div>
          </div>

          <div>
            <div className="h-8 border-b border-stone-400 mb-1"></div>
            <div className="font-bold text-stone-800">Rajendra Verma</div>
            <div className="text-[10px]">{t.headmaster.headmasterSign}</div>
          </div>

          <div>
            <div className="h-8 border-b border-stone-400 mb-1"></div>
            <div className="font-bold text-stone-800">CRC / BRC Officer</div>
            <div className="text-[10px]">{t.headmaster.officerSign}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
