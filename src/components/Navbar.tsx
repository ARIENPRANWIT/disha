import React, { useState } from 'react';
import { UserProfile, Language } from '../types';
import { translations } from '../i18n/translations';
import { 
  Sprout, 
  ShieldCheck, 
  Wifi, 
  Globe, 
  User, 
  Video, 
  Award, 
  BookOpen, 
  Users, 
  LogOut, 
  CheckCircle2,
  Lock
} from 'lucide-react';

interface NavbarProps {
  currentTab: 'teacher' | 'parent' | 'iq' | 'classroom' | 'ranks';
  setCurrentTab: (tab: 'teacher' | 'parent' | 'iq' | 'classroom' | 'ranks') => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  currentUser: UserProfile;
  onOpenAuth: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  language,
  setLanguage,
  currentUser,
  onOpenAuth,
  onLogout,
}) => {
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const t = translations[language];

  const languages: { code: Language; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'or', label: 'Odia', native: 'ଓଡ଼ିଆ' },
    { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FFF8EE]/95 backdrop-blur-md border-b border-[#F4A340]/20 transition-all shadow-xs no-print">
      {/* Top Banner for Village School & Encryption status */}
      <div className="bg-[#1F7A5C] text-[#FFF8EE] text-xs px-3 sm:px-4 py-1.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-medium min-w-0">
          <span className="inline-flex items-center gap-1.5 bg-emerald-800/80 px-2 py-0.5 rounded-full text-[11px] shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
            <Wifi className="w-3 h-3 text-emerald-300 shrink-0" />
            <span className="truncate max-w-[180px] sm:max-w-none">{t.offlineReady}</span>
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 bg-emerald-900/60 px-2 py-0.5 rounded-full text-[11px] text-emerald-100 truncate">
            <Lock className="w-3 h-3 text-[#F4A340] shrink-0" />
            <span className="truncate">{t.encryptedNotice}</span>
          </span>
        </div>

        <div className="flex items-center gap-2 text-emerald-100 text-[11px] shrink-0">
          <span className="hidden md:inline truncate max-w-[200px]">
            📍 {currentUser.schoolName || t.nav.schoolTag}
          </span>
          <span className="bg-amber-400/20 text-amber-200 px-2 py-0.5 rounded-md font-semibold whitespace-nowrap">
            {t.nav.classTag}
          </span>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2">
          {/* Logo & Brand */}
          <div 
            onClick={() => setCurrentTab('teacher')}
            className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br from-[#F4A340] to-[#E8734A] flex items-center justify-center text-white shadow-sm shadow-orange-200 group-hover:scale-105 transition-transform shrink-0">
              <Sprout className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold text-xl sm:text-2xl text-[#165A44] tracking-tight">
                  {t.appName}
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 sm:py-0.5 rounded-md bg-[#F4A340]/20 text-[#E8734A] shrink-0">
                  TaRL
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-[#7A6A58] hidden sm:block -mt-1 font-medium truncate max-w-[200px] lg:max-w-none">
                {t.appSubtitle}
              </p>
            </div>
          </div>

          {/* Center Navigation Tabs (Balanced, responsive, no overflowing) */}
          <nav className="hidden md:flex items-center gap-1 bg-[#FCF5E8] p-1 rounded-2xl border border-[#F4A340]/25 overflow-x-auto max-w-[620px]">
            <button
              onClick={() => setCurrentTab('teacher')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                currentTab === 'teacher'
                  ? 'bg-[#1F7A5C] text-white shadow-xs'
                  : 'text-[#5C5042] hover:text-[#1F7A5C] hover:bg-white/60'
              }`}
            >
              <Users className="w-3.5 h-3.5 shrink-0" />
              <span>{t.nav.teacher}</span>
            </button>

            <button
              onClick={() => setCurrentTab('parent')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                currentTab === 'parent'
                  ? 'bg-[#1F7A5C] text-white shadow-xs'
                  : 'text-[#5C5042] hover:text-[#1F7A5C] hover:bg-white/60'
              }`}
            >
              <Sprout className="w-3.5 h-3.5 text-[#F4A340] shrink-0" />
              <span>{t.nav.parent}</span>
            </button>

            <button
              onClick={() => setCurrentTab('iq')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                currentTab === 'iq'
                  ? 'bg-[#1F7A5C] text-white shadow-xs'
                  : 'text-[#5C5042] hover:text-[#1F7A5C] hover:bg-white/60'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 shrink-0" />
              <span>{t.nav.iq}</span>
            </button>

            <button
              onClick={() => setCurrentTab('ranks')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                currentTab === 'ranks'
                  ? 'bg-[#1F7A5C] text-white shadow-xs'
                  : 'text-[#5C5042] hover:text-[#1F7A5C] hover:bg-white/60'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-[#E8734A] shrink-0" />
              <span>{t.nav.ranks}</span>
            </button>

            <button
              onClick={() => setCurrentTab('classroom')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 relative ${
                currentTab === 'classroom'
                  ? 'bg-[#E8734A] text-white shadow-xs'
                  : 'text-[#5C5042] hover:text-[#E8734A] hover:bg-white/60'
              }`}
            >
              <Video className="w-3.5 h-3.5 shrink-0" />
              <span>{t.nav.classroom}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping absolute -top-0.5 -right-0.5"></span>
            </button>
          </nav>

          {/* Right Controls: Language & User Profile */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-[#F4A340]/30 bg-white/80 hover:bg-white text-xs font-semibold text-[#4A3E31] transition-all cursor-pointer"
                title={t.nav.selectLang}
              >
                <Globe className="w-3.5 h-3.5 text-[#1F7A5C] shrink-0" />
                <span className="uppercase font-bold">{language}</span>
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 rounded-2xl bg-white border border-[#F4A340]/30 shadow-lg p-1.5 z-50 animate-in fade-in zoom-in-95">
                  <div className="text-[10px] font-bold text-[#8A7A66] px-2 py-1 uppercase tracking-wider">
                    {t.nav.selectLang}
                  </div>
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs text-left font-medium transition-colors cursor-pointer ${
                        language === l.code
                          ? 'bg-[#1F7A5C] text-white font-bold'
                          : 'hover:bg-[#FFF8EE] text-[#3D3328]'
                      }`}
                    >
                      <span>{l.native}</span>
                      {language === l.code && <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Profile / Login Pill */}
            <div className="relative">
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center gap-1.5 sm:gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-2xl border border-[#F4A340]/30 bg-white/90 hover:bg-white transition-all shadow-xs cursor-pointer"
              >
                <div className="w-7 h-7 rounded-xl bg-[#FFF8EE] border border-[#F4A340]/30 flex items-center justify-center text-base shrink-0">
                  {currentUser.avatar}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-bold text-[#165A44] leading-tight truncate max-w-[100px]">
                    {currentUser.name}
                  </div>
                  <div className="text-[10px] text-[#8C7B68] capitalize font-medium truncate max-w-[100px]">
                    {currentUser.role}
                  </div>
                </div>
              </button>

              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white border border-[#F4A340]/30 shadow-xl p-3 z-50">
                  <div className="flex items-center gap-2.5 pb-2.5 border-b border-[#F4A340]/15">
                    <span className="text-2xl shrink-0">{currentUser.avatar}</span>
                    <div className="truncate">
                      <div className="text-sm font-bold text-[#165A44] truncate">{currentUser.name}</div>
                      <div className="text-xs text-[#8C7B68] truncate">{currentUser.email}</div>
                      <span className="inline-block mt-0.5 text-[10px] px-2 py-0.2 rounded-full bg-[#1F7A5C]/10 text-[#1F7A5C] font-semibold capitalize">
                        {currentUser.role}
                      </span>
                    </div>
                  </div>

                  <div className="py-2 space-y-1 text-xs text-[#5C5042]">
                    <div className="flex items-center justify-between py-1 px-1">
                      <span>{t.nav.authProvider}:</span>
                      <span className="font-semibold capitalize text-[#165A44] bg-[#FFF8EE] px-2 py-0.5 rounded-md border border-[#F4A340]/20">
                        {currentUser.authProvider}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-1 px-1">
                      <span>{t.nav.security}:</span>
                      <span className="font-semibold text-emerald-700 inline-flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        AES-256 E2E
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#F4A340]/15 flex flex-col gap-1.5">
                    <button
                      onClick={() => {
                        setProfileMenuOpen(false);
                        onOpenAuth();
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-xl hover:bg-[#FFF8EE] text-xs font-semibold text-[#1F7A5C] flex items-center gap-1.5 cursor-pointer"
                    >
                      <User className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{t.nav.switchAccount}</span>
                    </button>
                    <button
                      onClick={() => {
                        setProfileMenuOpen(false);
                        onLogout();
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-xl hover:bg-rose-50 text-xs font-semibold text-rose-600 flex items-center gap-1.5 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{t.nav.logout}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar (No text overflowing out of screen border) */}
      <div className="md:hidden border-t border-[#F4A340]/20 bg-[#FFF8EE] px-1 py-1.5 grid grid-cols-5 gap-0.5">
        <button
          onClick={() => setCurrentTab('teacher')}
          className={`flex flex-col items-center justify-center py-1 px-0.5 rounded-xl text-[10px] font-bold transition-all min-w-0 ${
            currentTab === 'teacher' ? 'text-[#1F7A5C] bg-[#1F7A5C]/10' : 'text-[#7A6A58]'
          }`}
        >
          <Users className="w-4 h-4 mb-0.5 shrink-0" />
          <span className="w-full truncate text-center leading-tight">{t.nav.teacher}</span>
        </button>

        <button
          onClick={() => setCurrentTab('parent')}
          className={`flex flex-col items-center justify-center py-1 px-0.5 rounded-xl text-[10px] font-bold transition-all min-w-0 ${
            currentTab === 'parent' ? 'text-[#1F7A5C] bg-[#1F7A5C]/10' : 'text-[#7A6A58]'
          }`}
        >
          <Sprout className="w-4 h-4 mb-0.5 text-[#F4A340] shrink-0" />
          <span className="w-full truncate text-center leading-tight">{t.nav.parent}</span>
        </button>

        <button
          onClick={() => setCurrentTab('iq')}
          className={`flex flex-col items-center justify-center py-1 px-0.5 rounded-xl text-[10px] font-bold transition-all min-w-0 ${
            currentTab === 'iq' ? 'text-[#1F7A5C] bg-[#1F7A5C]/10' : 'text-[#7A6A58]'
          }`}
        >
          <BookOpen className="w-4 h-4 mb-0.5 shrink-0" />
          <span className="w-full truncate text-center leading-tight">{t.nav.iq}</span>
        </button>

        <button
          onClick={() => setCurrentTab('ranks')}
          className={`flex flex-col items-center justify-center py-1 px-0.5 rounded-xl text-[10px] font-bold transition-all min-w-0 ${
            currentTab === 'ranks' ? 'text-[#1F7A5C] bg-[#1F7A5C]/10' : 'text-[#7A6A58]'
          }`}
        >
          <Award className="w-4 h-4 mb-0.5 text-[#E8734A] shrink-0" />
          <span className="w-full truncate text-center leading-tight">{t.nav.ranks}</span>
        </button>

        <button
          onClick={() => setCurrentTab('classroom')}
          className={`flex flex-col items-center justify-center py-1 px-0.5 rounded-xl text-[10px] font-bold transition-all min-w-0 relative ${
            currentTab === 'classroom' ? 'text-[#E8734A] bg-[#E8734A]/10' : 'text-[#7A6A58]'
          }`}
        >
          <Video className="w-4 h-4 mb-0.5 shrink-0" />
          <span className="w-full truncate text-center leading-tight">{t.nav.classroom}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 absolute top-1 right-2"></span>
        </button>
      </div>
    </header>
  );
};
