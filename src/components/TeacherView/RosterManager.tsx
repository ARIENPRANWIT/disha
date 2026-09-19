import React, { useState } from 'react';
import { Student, Assessment, Language } from '../../types';
import { StorageService } from '../../services/storage';
import { translations } from '../../i18n/translations';
import { 
  UserPlus, 
  Search, 
  Filter, 
  Sparkles, 
  Calendar, 
  Phone, 
  Check, 
  TrendingUp,
  X
} from 'lucide-react';

interface RosterManagerProps {
  students: Student[];
  onAddStudent: (student: Omit<Student, 'id'>) => void;
  onSelectStudentForAssess: (student: Student) => void;
  onViewStudentParentCard: (student: Student) => void;
  language: Language;
}

export const RosterManager: React.FC<RosterManagerProps> = ({
  students,
  onAddStudent,
  onSelectStudentForAssess,
  onViewStudentParentCard,
  language,
}) => {
  const t = translations[language];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<number | 'all'>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Student Form State
  const [newName, setNewName] = useState('');
  const [newRollNo, setNewRollNo] = useState('');
  const [newGrade, setNewGrade] = useState<number>(3);
  const [newSection, setNewSection] = useState('A');
  const [newGender, setNewGender] = useState<'M' | 'F' | 'O'>('M');
  const [newParentName, setNewParentName] = useState('');
  const [newParentPhone, setNewParentPhone] = useState('');
  const [newAvatar, setNewAvatar] = useState('👦🏽');

  const filtered = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.rollNo.includes(searchQuery);
    const matchesGrade = selectedGrade === 'all' || s.grade === selectedGrade;
    return matchesSearch && matchesGrade;
  });

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    onAddStudent({
      name: newName.trim(),
      rollNo: newRollNo.trim() || String(students.length + 1).padStart(2, '0'),
      grade: newGrade,
      section: newSection,
      gender: newGender,
      avatar: newAvatar,
      parentName: newParentName.trim() || 'Parent',
      parentPhone: newParentPhone.trim() || '+91 98000 00000',
    });

    // Reset & close
    setNewName('');
    setNewRollNo('');
    setNewParentName('');
    setNewParentPhone('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-5">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex flex-1 items-center gap-2 max-w-md min-w-0">
          <div className="relative flex-1 min-w-0">
            <Search className="w-4 h-4 text-[#8C7B68] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.roster.searchPlaceholder}
              className="w-full pl-9 pr-8 py-2 rounded-2xl bg-white border border-[#F4A340]/30 text-xs text-[#2C2621] placeholder:text-[#A89885] focus:outline-none focus:ring-2 focus:ring-[#1F7A5C]/40"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Grade filter pills */}
          <div className="flex items-center gap-1 bg-[#FCF5E8] p-1 rounded-2xl border border-[#F4A340]/25 overflow-x-auto shrink-0">
            <button
              onClick={() => setSelectedGrade('all')}
              className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold cursor-pointer whitespace-nowrap ${
                selectedGrade === 'all'
                  ? 'bg-[#1F7A5C] text-white shadow-2xs'
                  : 'text-[#5C5042] hover:bg-white'
              }`}
            >
              {t.roster.filterAll}
            </button>
            {[1, 2, 3, 4, 5].map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGrade(g)}
                className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold cursor-pointer whitespace-nowrap ${
                  selectedGrade === g
                    ? 'bg-[#1F7A5C] text-white shadow-2xs'
                    : 'text-[#5C5042] hover:bg-white'
                }`}
              >
                {t.roster.classPrefix} {g}
              </button>
            ))}
          </div>
        </div>

        {/* Add Student Button */}
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-[#F4A340] hover:bg-[#E68A1E] text-white text-xs font-extrabold shadow-sm shadow-orange-300 transition-all cursor-pointer whitespace-nowrap shrink-0"
        >
          <UserPlus className="w-4 h-4 shrink-0" />
          <span>{t.roster.addChildBtn}</span>
        </button>
      </div>

      {/* Roster Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filtered.map((std) => {
          const latest = StorageService.getLatestAssessment(std.id);
          const baseline = StorageService.getBaselineAssessment(std.id);
          const litInfo = latest ? t.litLevels[latest.literacyLevel] : t.litLevels[1];
          const numInfo = latest ? t.numLevels[latest.numeracyLevel] : t.numLevels[1];

          const hasProgressed =
            baseline && latest && (latest.literacyLevel > baseline.literacyLevel || latest.numeracyLevel > baseline.numeracyLevel);

          return (
            <div
              key={std.id}
              className="bg-white rounded-3xl p-4 border border-[#F4A340]/25 shadow-xs hover:border-[#1F7A5C]/40 hover:shadow-md transition-all flex flex-col justify-between min-w-0"
            >
              <div className="min-w-0">
                <div className="flex items-start justify-between gap-2 mb-3 min-w-0">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-11 h-11 rounded-2xl bg-[#FFF8EE] border border-[#F4A340]/30 flex items-center justify-center text-2xl shrink-0">
                      {std.avatar}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-[#165A44] leading-tight truncate">
                        {std.name}
                      </h4>
                      <p className="text-[11px] text-[#8C7B68] font-medium mt-0.5 truncate">
                        {t.roster.classPrefix} {std.grade}-{std.section} • {t.roster.rollPrefix}{std.rollNo}
                      </p>
                    </div>
                  </div>

                  {hasProgressed && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-300 shrink-0 whitespace-nowrap">
                      <TrendingUp className="w-3 h-3 shrink-0" />
                      {t.roster.levelUp}
                    </span>
                  )}
                </div>

                {/* Verified Learning Levels */}
                <div className="bg-[#FFFDF9] rounded-2xl p-2.5 border border-[#F4A340]/20 space-y-2 mb-3 min-w-0">
                  <div className="flex items-center justify-between text-xs gap-2 min-w-0">
                    <span className="text-[#6D5D4B] font-medium flex items-center gap-1 min-w-0 truncate">
                      <span className="shrink-0">{litInfo.icon}</span>
                      <span className="truncate">{t.roster.readingLevel}:</span>
                    </span>
                    <span className="font-bold text-[#E8734A] bg-[#FFF0E8] px-2 py-0.5 rounded-lg border border-[#E8734A]/20 shrink-0 max-w-[55%] truncate text-right">
                      {litInfo.name}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs gap-2 min-w-0">
                    <span className="text-[#6D5D4B] font-medium flex items-center gap-1 min-w-0 truncate">
                      <span className="shrink-0">{numInfo.icon}</span>
                      <span className="truncate">{t.roster.mathLevel}:</span>
                    </span>
                    <span className="font-bold text-[#1F7A5C] bg-[#E8F6F0] px-2 py-0.5 rounded-lg border border-[#1F7A5C]/20 shrink-0 max-w-[55%] truncate text-right">
                      {numInfo.name}
                    </span>
                  </div>
                </div>

                {/* Parent Contact */}
                <div className="text-[11px] text-[#8C7B68] flex items-center justify-between mb-3 px-1 gap-2 min-w-0">
                  <span className="truncate">{t.roster.parentLabel}: {std.parentName}</span>
                  <span className="font-mono text-[10px] shrink-0">{std.parentPhone}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2 border-t border-stone-100">
                <button
                  onClick={() => onSelectStudentForAssess(std)}
                  className="flex-1 py-2 px-2 rounded-xl bg-[#1F7A5C] hover:bg-[#165A44] text-white text-xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer truncate min-w-0"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#F4A340] shrink-0" />
                  <span className="truncate">{t.roster.tapAssessBtn}</span>
                </button>

                <button
                  onClick={() => onViewStudentParentCard(std)}
                  className="py-2 px-2.5 rounded-xl bg-[#FFF8EE] hover:bg-[#FFEECF] text-[#E8734A] border border-[#F4A340]/30 text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0"
                >
                  {t.roster.growthCardBtn}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Student Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl border-2 border-[#F4A340]/35 shadow-2xl p-5 overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#F4A340]/20 mb-4">
              <h3 className="font-heading font-extrabold text-base text-[#165A44] flex items-center gap-2 break-words">
                <UserPlus className="w-5 h-5 text-[#F4A340] shrink-0" />
                <span>{t.roster.modalTitle}</span>
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-xl bg-stone-100 flex items-center justify-center text-stone-500 hover:bg-stone-200 cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateStudent} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-[#5C5042] mb-1">{t.roster.childNameLabel} *</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder={t.roster.childNamePlaceholder}
                  className="w-full px-3 py-2 rounded-xl border border-[#F4A340]/30 focus:outline-none focus:ring-2 focus:ring-[#1F7A5C]/40"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#5C5042] mb-1">{t.roster.gradeLabel}</label>
                  <select
                    value={newGrade}
                    onChange={(e) => setNewGrade(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-[#F4A340]/30 bg-white"
                  >
                    {[1, 2, 3, 4, 5].map((g) => (
                      <option key={g} value={g}>{t.roster.classPrefix} {g}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-[#5C5042] mb-1">{t.roster.rollLabel}</label>
                  <input
                    type="text"
                    value={newRollNo}
                    onChange={(e) => setNewRollNo(e.target.value)}
                    placeholder="13"
                    className="w-full px-3 py-2 rounded-xl border border-[#F4A340]/30"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#5C5042] mb-1">{t.roster.avatarLabel}</label>
                <div className="flex gap-2 text-2xl flex-wrap">
                  {['👦🏽', '👧🏽', '👦🏾', '👧🏾', '🧒🏽', '🧒🏾'].map((av) => (
                    <button
                      key={av}
                      type="button"
                      onClick={() => setNewAvatar(av)}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all cursor-pointer ${
                        newAvatar === av ? 'border-[#1F7A5C] bg-emerald-50 scale-110' : 'border-stone-200'
                      }`}
                    >
                      {av}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#5C5042] mb-1">{t.roster.parentNameLabel}</label>
                  <input
                    type="text"
                    value={newParentName}
                    onChange={(e) => setNewParentName(e.target.value)}
                    placeholder="Sanjeev Soren"
                    className="w-full px-3 py-2 rounded-xl border border-[#F4A340]/30"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#5C5042] mb-1">{t.roster.parentPhoneLabel}</label>
                  <input
                    type="text"
                    value={newParentPhone}
                    onChange={(e) => setNewParentPhone(e.target.value)}
                    placeholder="+91 98..."
                    className="w-full px-3 py-2 rounded-xl border border-[#F4A340]/30"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border text-stone-600 hover:bg-stone-50 font-bold cursor-pointer"
                >
                  {t.roster.cancelBtn}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#1F7A5C] text-white font-extrabold hover:bg-[#165A44] transition-all cursor-pointer"
                >
                  {t.roster.saveBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
