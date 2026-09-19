import React, { useState } from 'react';
import { UserProfile, UserRole, Language } from '../../types';
import { StorageService } from '../../services/storage';
import { translations } from '../../i18n/translations';
import { 
  X, 
  ShieldCheck, 
  Mail
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUserAuthenticated: (user: UserProfile) => void;
  language: Language;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onUserAuthenticated,
  language,
}) => {
  const t = translations[language];
  const [selectedRole, setSelectedRole] = useState<UserRole>('teacher');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const schoolName = 'Govt. Primary School Chandpur';

  if (!isOpen) return null;

  const handleOAuthSignIn = (provider: 'google' | 'microsoft' | 'outlook') => {
    let userName = 'Sunita Sharma';
    let userEmail = 'sunita.sharma@odisha.gov.in';
    let avatar = '👩🏽‍🏫';

    if (selectedRole === 'student') {
      userName = 'Ramesh Patel';
      userEmail = 'ramesh.cl3@disha-learning.org';
      avatar = '👦🏽';
    } else if (selectedRole === 'parent') {
      userName = 'Rajesh Patel';
      userEmail = 'rajesh.patel@gmail.com';
      avatar = '👨🏽';
    } else if (selectedRole === 'headmaster') {
      userName = 'Rajendra Verma';
      userEmail = 'headmaster.chandpur@odisha.gov.in';
      avatar = '👨🏽‍💼';
    }

    if (provider === 'microsoft' || provider === 'outlook') {
      userEmail = userEmail.replace('@gmail.com', '@outlook.com');
    }

    const authenticatedUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name: userName,
      email: userEmail,
      role: selectedRole,
      avatar,
      schoolName,
      authProvider: provider,
    };

    StorageService.setCurrentUser(authenticatedUser);
    onUserAuthenticated(authenticatedUser);
    onClose();
  };

  const handleEmailPasswordAuth = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = name.trim() || (selectedRole === 'teacher' ? 'Sunita Sharma' : 'Learner');
    const finalEmail = email.trim() || `${finalName.toLowerCase().replace(/\s+/g, '')}@school.in`;

    const authenticatedUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name: finalName,
      email: finalEmail,
      role: selectedRole,
      avatar: selectedRole === 'teacher' ? '👩🏽‍🏫' : selectedRole === 'student' ? '👦🏽' : '👨🏽',
      schoolName,
      authProvider: 'email',
    };

    StorageService.setCurrentUser(authenticatedUser);
    onUserAuthenticated(authenticatedUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white w-full max-w-md rounded-3xl border-2 border-[#F4A340]/30 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#FFF2DF] to-[#FCEDD4] p-4 sm:p-5 border-b border-[#F4A340]/25 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#1F7A5C] text-white mb-1 whitespace-nowrap">
              <ShieldCheck className="w-3 h-3 text-[#F4A340] shrink-0" />
              <span>Multi-Provider SSO</span>
            </div>
            <h3 className="text-lg sm:text-xl font-heading font-extrabold text-[#165A44] truncate">
              {t.auth.title}
            </h3>
            <p className="text-xs text-[#7A6A58] font-medium break-words">
              {t.auth.subtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white/80 hover:bg-white text-[#7A6A58] flex items-center justify-center border border-[#F4A340]/20 shrink-0 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-5 space-y-4 overflow-y-auto max-h-[80vh]">
          {/* Role selector */}
          <div>
            <label className="block text-xs font-bold text-[#6D5D4B] mb-1.5 uppercase tracking-wider truncate">
              {t.auth.selectRole}
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {[
                { r: 'teacher', label: t.auth.roleTeacher, icon: '👩🏽‍🏫' },
                { r: 'headmaster', label: t.auth.roleHeadmaster, icon: '👨🏽‍💼' },
                { r: 'student', label: t.auth.roleStudent, icon: '👦🏽' },
                { r: 'parent', label: t.auth.roleParent, icon: '👨🏽' },
              ].map(({ r, label, icon }) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setSelectedRole(r as UserRole)}
                  className={`p-2 rounded-xl text-center border transition-all cursor-pointer min-w-0 ${
                    selectedRole === r
                      ? 'bg-[#1F7A5C] text-white border-[#1F7A5C] shadow-2xs font-bold'
                      : 'bg-[#FFFDF9] border-[#F4A340]/25 text-[#4A3E31] hover:bg-[#FFF8EE]'
                  }`}
                >
                  <div className="text-xl mb-0.5">{icon}</div>
                  <div className="text-[10px] leading-tight font-medium truncate">{label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Social OAuth Buttons */}
          <div className="space-y-2 pt-1">
            {/* Google Sign In */}
            <button
              onClick={() => handleOAuthSignIn('google')}
              className="w-full flex items-center justify-center gap-2.5 py-2.5 px-3 rounded-2xl border border-stone-300 hover:bg-stone-50 font-bold text-xs text-stone-700 transition-all shadow-2xs cursor-pointer min-w-0"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span className="truncate">{t.auth.googleLogin}</span>
            </button>

            {/* Microsoft Sign In */}
            <button
              onClick={() => handleOAuthSignIn('microsoft')}
              className="w-full flex items-center justify-center gap-2.5 py-2.5 px-3 rounded-2xl border border-stone-300 hover:bg-stone-50 font-bold text-xs text-stone-700 transition-all shadow-2xs cursor-pointer min-w-0"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 23 23">
                <path fill="#f35325" d="M1 1h10v10H1z" />
                <path fill="#81bc06" d="M12 1h10v10H12z" />
                <path fill="#05a6f0" d="M1 12h10v10H1z" />
                <path fill="#ffba08" d="M12 12h10v10H12z" />
              </svg>
              <span className="truncate">{t.auth.microsoftLogin}</span>
            </button>

            {/* Outlook / Office 365 */}
            <button
              onClick={() => handleOAuthSignIn('outlook')}
              className="w-full flex items-center justify-center gap-2.5 py-2.5 px-3 rounded-2xl border border-blue-200 hover:bg-blue-50 font-bold text-xs text-blue-800 transition-all shadow-2xs cursor-pointer min-w-0"
            >
              <Mail className="w-4 h-4 text-blue-600 shrink-0" />
              <span className="truncate">{t.auth.outlookLogin}</span>
            </button>
          </div>

          <div className="flex items-center gap-2 my-2">
            <div className="flex-1 h-px bg-stone-200"></div>
            <span className="text-[11px] text-stone-400 font-bold uppercase truncate">{t.auth.ruralLoginTitle}</span>
            <div className="flex-1 h-px bg-stone-200"></div>
          </div>

          {/* Email/Teacher ID form for rural connectivity fallback */}
          <form onSubmit={handleEmailPasswordAuth} className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-[#5C5042] mb-1 truncate">{t.auth.schoolCode}</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="teacher@school.in"
                className="w-full px-3 py-2 rounded-xl border border-[#F4A340]/30"
              />
            </div>

            <div>
              <label className="block font-bold text-[#5C5042] mb-1 truncate">{t.auth.pin}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••"
                className="w-full px-3 py-2 rounded-xl border border-[#F4A340]/30"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#1F7A5C] hover:bg-[#165A44] text-white font-extrabold text-xs transition-all shadow-sm cursor-pointer truncate"
            >
              {t.auth.signInBtn}
            </button>
          </form>

          {/* 1-Click Fast Switch Demo Buttons */}
          <div className="pt-2 border-t border-stone-100">
            <div className="text-[10px] uppercase font-bold text-stone-400 mb-1.5 text-center break-words">
              {t.auth.demoNote}
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedRole('teacher');
                  handleOAuthSignIn('google');
                }}
                className="p-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-center text-[10px] font-bold text-amber-900 cursor-pointer truncate"
              >
                👩🏽‍🏫 Sunita
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedRole('student');
                  handleOAuthSignIn('google');
                }}
                className="p-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-center text-[10px] font-bold text-emerald-900 cursor-pointer truncate"
              >
                👦🏽 Ramesh
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedRole('parent');
                  handleOAuthSignIn('google');
                }}
                className="p-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 border border-teal-200 text-center text-[10px] font-bold text-teal-900 cursor-pointer truncate"
              >
                👨🏽 Rajesh
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
