import React, { useState, useEffect } from 'react';
import { 
  Student, 
  Assessment, 
  UserProfile, 
  Language 
} from './types';
import { StorageService } from './services/storage';
import { translations } from './i18n/translations';
import { Navbar } from './components/Navbar';
import { TeacherDashboard } from './components/TeacherView/TeacherDashboard';
import { AssessmentModal } from './components/TeacherView/AssessmentModal';
import { ParentStudentCard } from './components/ParentView/ParentStudentCard';
import { SubjectTestView } from './components/StudentIQ/SubjectTestView';
import { ProblemSolvingLeaderboard } from './components/StudentIQ/ProblemSolvingLeaderboard';
import { LiveClassroomView } from './components/Classroom/LiveClassroomView';
import { AuthModal } from './components/Auth/AuthModal';

export default function App() {
  const [students, setStudents] = useState<Student[]>(StorageService.getStudents());
  const [assessments, setAssessments] = useState<Assessment[]>(StorageService.getAssessments());
  const [currentUser, setCurrentUser] = useState<UserProfile>(StorageService.getCurrentUser());
  const [language, setLanguage] = useState<Language>(StorageService.getLanguage());
  const [currentTab, setCurrentTab] = useState<'teacher' | 'parent' | 'iq' | 'classroom' | 'ranks'>('teacher');

  // Selected student for assessment modal and parent view
  const [selectedStudentForAssess, setSelectedStudentForAssess] = useState<Student | null>(null);
  const [selectedStudentForParentView, setSelectedStudentForParentView] = useState<Student>(
    students[0] || {
      id: 'std-1',
      name: 'Ramesh Patel',
      rollNo: '01',
      grade: 3,
      section: 'A',
      gender: 'M',
      avatar: '👦🏽',
      parentName: 'Rajesh Patel',
      parentPhone: '+91 98765 43210',
    }
  );

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Sync language with StorageService
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    StorageService.setLanguage(lang);
  };

  // Add new student
  const handleAddStudent = (newStudentData: Omit<Student, 'id'>) => {
    const created = StorageService.addStudent(newStudentData);
    setStudents(StorageService.getStudents());
    setSelectedStudentForAssess(created);
  };

  // Assessment saved callback
  const handleAssessmentSaved = (newAssessment: Assessment, isLevelUp: boolean) => {
    setAssessments(StorageService.getAssessments());
    setStudents(StorageService.getStudents());
  };

  const handleUserAuthenticated = (user: UserProfile) => {
    setCurrentUser(user);
    if (user.role === 'student' || user.role === 'parent') {
      setCurrentTab('parent');
      // If student is logged in, find matching student
      const match = students.find((s) => s.name.toLowerCase().includes('ramesh')) || students[0];
      if (match) setSelectedStudentForParentView(match);
    } else {
      setCurrentTab('teacher');
    }
  };

  const handleLogout = () => {
    const defaultUser: UserProfile = {
      id: 'user-teacher-1',
      name: 'Sunita Sharma',
      email: 'sunita.sharma@odisha.gov.in',
      role: 'teacher',
      avatar: '👩🏽‍🏫',
      schoolName: 'Govt. Primary School Chandpur',
      villageCluster: 'Chandpur CRC',
      authProvider: 'google',
    };
    StorageService.setCurrentUser(defaultUser);
    setCurrentUser(defaultUser);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#2C2621] flex flex-col font-sans selection:bg-[#F4A340]/30 selection:text-[#165A44]">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        language={language}
        setLanguage={handleSetLanguage}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 lg:p-8 space-y-6">
        {currentTab === 'teacher' && (
          <TeacherDashboard
            students={students}
            assessments={assessments}
            language={language}
            onAddStudent={handleAddStudent}
            onSelectStudentForAssess={(std) => setSelectedStudentForAssess(std)}
            onViewStudentParentCard={(std) => {
              setSelectedStudentForParentView(std);
              setCurrentTab('parent');
            }}
          />
        )}

        {currentTab === 'parent' && (
          <ParentStudentCard
            students={students}
            selectedStudent={selectedStudentForParentView}
            onSelectStudent={(std) => setSelectedStudentForParentView(std)}
            language={language}
          />
        )}

        {currentTab === 'iq' && (
          <SubjectTestView
            currentStudent={selectedStudentForParentView}
            language={language}
            onTestCompleted={() => {
              setStudents(StorageService.getStudents());
            }}
          />
        )}

        {currentTab === 'ranks' && (
          <ProblemSolvingLeaderboard
            students={students}
            language={language}
            onSelectStudent={(std) => {
              setSelectedStudentForParentView(std);
              setCurrentTab('parent');
            }}
          />
        )}

        {currentTab === 'classroom' && (
          <LiveClassroomView
            currentUser={currentUser}
            language={language}
          />
        )}
      </main>

      {/* Quick Tap Assessment Modal */}
      {selectedStudentForAssess && (
        <AssessmentModal
          student={selectedStudentForAssess}
          isOpen={Boolean(selectedStudentForAssess)}
          onClose={() => setSelectedStudentForAssess(null)}
          onAssessmentSaved={handleAssessmentSaved}
          language={language}
        />
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onUserAuthenticated={handleUserAuthenticated}
        language={language}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-[#F4A340]/20 bg-[#FFF8EE] py-4 text-center text-xs text-[#8C7B68] no-print">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="font-heading font-bold text-[#165A44]">
              {StorageService.getLanguage() && translations[language].footer.brand}
            </span>
            <span>•</span>
            <span>{translations[language].footer.methodology}</span>
          </div>
          <div className="text-[11px] text-[#A89885] break-words">
            {translations[language].footer.tagline}
          </div>
        </div>
      </footer>
    </div>
  );
}
