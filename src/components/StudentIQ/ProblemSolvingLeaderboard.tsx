import React, { useState } from 'react';
import { Student, StudentLeaderboardEntry, Language } from '../../types';
import { StorageService } from '../../services/storage';
import { translations } from '../../i18n/translations';
import { 
  Star, 
  Search, 
  BrainCircuit, 
} from 'lucide-react';

interface ProblemSolvingLeaderboardProps {
  students: Student[];
  language: Language;
  onSelectStudent: (student: Student) => void;
}

export const ProblemSolvingLeaderboard: React.FC<ProblemSolvingLeaderboardProps> = ({
  students,
  language,
  onSelectStudent,
}) => {
  const t = translations[language];
  const [selectedGrade, setSelectedGrade] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const leaderboard = StorageService.getLeaderboard();

  // Combine with students
  const studentMap = new Map(students.map((s) => [s.id, s]));

  const filtered = leaderboard.filter((entry) => {
    const student = studentMap.get(entry.studentId);
    if (!student) return false;

    const matchesSearch =
      entry.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNo.includes(searchQuery);

    const matchesGrade = selectedGrade === 'all' || entry.grade === selectedGrade;

    return matchesSearch && matchesGrade;
  });

  const top3 = filtered.slice(0, 3);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#FFF0DB] via-[#FCEDD4] to-[#FCE3BE] border-2 border-[#F4A340]/40 rounded-3xl p-4 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 sm:gap-4 text-center sm:text-left min-w-0">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-gradient-to-br from-[#F4A340] to-[#E8734A] text-white flex items-center justify-center text-3xl shadow-md shrink-0">
            🏆
          </div>
          <div className="min-w-0">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1F7A5C] text-white text-[11px] font-bold mb-1">
              <Star className="w-3 h-3 text-[#F4A340] shrink-0" />
              <span className="truncate">{t.leaderboard.badge}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-[#165A44] break-words">
              {t.rankings}
            </h2>
            <p className="text-xs text-[#5C4D3C] font-medium break-words">
              {t.leaderboard.subtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-bold text-[#165A44] bg-white/80 px-3.5 py-2 rounded-2xl border border-[#F4A340]/30 shadow-2xs whitespace-nowrap">
            ⭐ {t.leaderboard.formula}
          </span>
        </div>
      </div>

      {/* Top 3 Podium (Visual Celebration) */}
      {top3.length >= 3 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* 2nd Place */}
          <div className="bg-white rounded-3xl p-4 border border-stone-200 text-center shadow-xs flex flex-col justify-between order-2 sm:order-1 sm:mt-6 min-w-0">
            <div className="min-w-0">
              <div className="w-8 h-8 rounded-full bg-stone-100 text-stone-700 font-extrabold text-sm flex items-center justify-center mx-auto mb-2">
                🥈 2
              </div>
              <div className="text-3xl mb-1">{top3[1].avatar}</div>
              <div className="font-heading font-extrabold text-[#165A44] text-sm truncate">
                {top3[1].studentName}
              </div>
              <div className="text-[11px] text-[#7A6A58] whitespace-nowrap">
                {t.roster.classPrefix} {top3[1].grade}
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-stone-100">
              <span className="text-xs font-extrabold text-[#E8734A] block">
                {top3[1].points} {t.leaderboard.pointsUnit}
              </span>
              <div className="text-[10px] text-stone-500 truncate">
                {t.leaderboard.problemsSolvedCount(top3[1].problemsSolved)}
              </div>
            </div>
          </div>

          {/* 1st Place (Center Champion) */}
          <div className="bg-gradient-to-b from-[#FFF7EA] to-white rounded-3xl p-5 border-2 border-[#F4A340] text-center shadow-md flex flex-col justify-between order-1 sm:order-2 ring-2 ring-[#F4A340]/20 min-w-0">
            <div className="min-w-0">
              <div className="w-10 h-10 rounded-full bg-[#F4A340] text-white font-extrabold text-lg flex items-center justify-center mx-auto mb-2 shadow-sm">
                🥇 1
              </div>
              <div className="text-4xl mb-1">{top3[0].avatar}</div>
              <div className="font-heading font-extrabold text-[#165A44] text-base truncate">
                {top3[0].studentName}
              </div>
              <div className="text-xs text-[#7A6A58] font-bold truncate">
                {t.roster.classPrefix} {top3[0].grade} • {t.leaderboard.topSolverTag}
              </div>
              <div className="mt-2 flex flex-wrap justify-center gap-1">
                {top3[0].badges.map((b, i) => (
                  <span key={i} className="text-[10px] bg-[#1F7A5C]/10 text-[#1F7A5C] px-2 py-0.5 rounded-md font-bold truncate max-w-[120px]">
                    {b}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-4 pt-2 border-t border-[#F4A340]/20">
              <span className="text-sm font-extrabold text-[#165A44] block">
                {top3[0].points} {t.leaderboard.pointsUnit}
              </span>
              <div className="text-[11px] text-[#7A6A58] font-semibold truncate">
                {t.leaderboard.problemsSolvedCount(top3[0].problemsSolved)}
              </div>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="bg-white rounded-3xl p-4 border border-stone-200 text-center shadow-xs flex flex-col justify-between order-3 sm:order-3 sm:mt-8 min-w-0">
            <div className="min-w-0">
              <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 font-extrabold text-sm flex items-center justify-center mx-auto mb-2">
                🥉 3
              </div>
              <div className="text-3xl mb-1">{top3[2].avatar}</div>
              <div className="font-heading font-extrabold text-[#165A44] text-sm truncate">
                {top3[2].studentName}
              </div>
              <div className="text-[11px] text-[#7A6A58] whitespace-nowrap">
                {t.roster.classPrefix} {top3[2].grade}
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-stone-100">
              <span className="text-xs font-extrabold text-[#E8734A] block">
                {top3[2].points} {t.leaderboard.pointsUnit}
              </span>
              <div className="text-[10px] text-stone-500 truncate">
                {t.leaderboard.problemsSolvedCount(top3[2].problemsSolved)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-[#F4A340]/30 shadow-xs">
        <div className="relative flex-1 max-w-sm min-w-0">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.leaderboard.searchPlaceholder}
            className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-[#FFFDF9] border border-[#F4A340]/25 focus:outline-none focus:ring-2 focus:ring-[#1F7A5C]/40"
          />
        </div>

        <div className="flex items-center gap-1 bg-[#FCF5E8] p-1 rounded-xl border border-[#F4A340]/25 overflow-x-auto shrink-0">
          <button
            onClick={() => setSelectedGrade('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer whitespace-nowrap ${
              selectedGrade === 'all' ? 'bg-[#1F7A5C] text-white' : 'text-[#5C5042]'
            }`}
          >
            {t.leaderboard.allGrades}
          </button>
          {[1, 2, 3, 4, 5].map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGrade(g)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold cursor-pointer whitespace-nowrap ${
                selectedGrade === g ? 'bg-[#1F7A5C] text-white' : 'text-[#5C5042]'
              }`}
            >
              {t.roster.classPrefix} {g}
            </button>
          ))}
        </div>
      </div>

      {/* Full Leaderboard Table */}
      <div className="bg-white rounded-3xl border border-[#F4A340]/30 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-stone-100 flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-heading font-extrabold text-sm text-[#165A44] flex items-center gap-2 break-words">
            <BrainCircuit className="w-4 h-4 text-[#F4A340] shrink-0" />
            <span>{t.leaderboard.tableTitle}</span>
          </h3>
          <span className="text-xs text-[#8C7B68] font-semibold whitespace-nowrap">
            {t.leaderboard.studentsListed(filtered.length)}
          </span>
        </div>

        <div className="divide-y divide-stone-100">
          {filtered.map((entry) => {
            const student = studentMap.get(entry.studentId);

            return (
              <div
                key={entry.studentId}
                className="p-3.5 sm:p-4 flex items-center justify-between gap-3 hover:bg-[#FFF8EE]/60 transition-colors min-w-0"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Rank Badge */}
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-extrabold shrink-0 ${
                      entry.rank === 1
                        ? 'bg-amber-400 text-amber-950 shadow-2xs'
                        : entry.rank === 2
                        ? 'bg-stone-200 text-stone-800'
                        : entry.rank === 3
                        ? 'bg-orange-200 text-orange-900'
                        : 'bg-[#FFF8EE] text-[#7A6A58] border border-[#F4A340]/25'
                    }`}
                  >
                    #{entry.rank}
                  </div>

                  {/* Student Details */}
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-2xl shrink-0">{entry.avatar}</span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-sm font-bold text-[#2C2621] truncate max-w-[140px]">
                          {entry.studentName}
                        </span>
                        <span className="text-[10px] font-bold bg-[#1F7A5C]/15 text-[#1F7A5C] px-1.5 py-0.2 rounded-md whitespace-nowrap shrink-0">
                          {t.roster.classPrefix} {entry.grade}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-0.5">
                        {entry.badges.map((b, i) => (
                          <span
                            key={i}
                            className="text-[10px] text-[#7A6A58] font-medium bg-stone-100 px-1.5 py-0.2 rounded truncate max-w-[100px]"
                          >
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Score & Action */}
                <div className="flex items-center gap-2 sm:gap-4 text-right shrink-0">
                  <div>
                    <div className="text-xs sm:text-sm font-heading font-extrabold text-[#165A44] whitespace-nowrap">
                      {entry.points} {t.leaderboard.pointsUnit}
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-[#8C7B68] font-medium whitespace-nowrap">
                      {entry.problemsSolved} {t.leaderboard.solvedUnit}
                    </div>
                  </div>

                  {student && (
                    <button
                      onClick={() => onSelectStudent(student)}
                      className="hidden sm:inline-flex px-3 py-1.5 rounded-xl border border-[#F4A340]/30 hover:bg-[#FFF8EE] text-xs font-bold text-[#165A44] cursor-pointer whitespace-nowrap"
                    >
                      {t.roster.growthCardBtn}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
