export type Language = 'en' | 'hi' | 'or' | 'kn';

export type UserRole = 'teacher' | 'student' | 'parent' | 'headmaster';

export type AuthProvider = 'google' | 'microsoft' | 'outlook' | 'demo' | 'email';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  schoolName: string;
  villageCluster?: string;
  authProvider: AuthProvider;
  avatar: string;
  assignedGrade?: number; // for student
  studentId?: string;
}

export type LiteracyLevel = 1 | 2 | 3 | 4 | 5;
// 1: Beginner (No letter recognition)
// 2: Letters (Letter identification)
// 3: Words (2-3 letter words)
// 4: Simple Sentences (Short sentences)
// 5: Story (Fluent reader with comprehension)

export type NumeracyLevel = 1 | 2 | 3 | 4;
// 1: Beginner (Number 1-9 recognition)
// 2: 1-digit addition / subtraction
// 3: 2-digit operations (carry/borrow)
// 4: Word problems & Multiplication/Division

export type AssessmentTerm = 'baseline' | 'term1' | 'term2' | 'endline';

export interface Student {
  id: string;
  name: string;
  rollNo: string;
  grade: number; // 1 to 5
  section: string;
  gender: 'M' | 'F' | 'O';
  avatar: string;
  parentName: string;
  parentPhone: string;
}

export interface Assessment {
  id: string;
  studentId: string;
  date: string;
  term: AssessmentTerm;
  literacyLevel: LiteracyLevel;
  numeracyLevel: NumeracyLevel;
  assessedBy: string;
  notes?: string;
}

export interface LearningGroup {
  id: string;
  type: 'literacy' | 'numeracy';
  level: number;
  groupName: string;
  displayName: string;
  tagline: string;
  studentIds: string[];
  recommendedActivities: {
    title: string;
    description: string;
    materials: string;
    icon: string;
  }[];
  themeColor: string;
  badge: string;
}

export type Subject = 'math' | 'evs' | 'science' | 'hindi' | 'english';

export interface QuizQuestion {
  id: string;
  subject: Subject;
  gradeLevel: number;
  question: string;
  emoji: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface SubjectAssessmentScore {
  studentId: string;
  studentName: string;
  subject: Subject;
  score: number; // out of 20
  total: number;
  completedAt: string;
  iqBand: 'Emerging' | 'Progressing' | 'Proficient' | 'Advanced' | 'Master';
  points: number;
}

export interface StudentRank {
  studentId: string;
  studentName: string;
  grade: number;
  avatar: string;
  totalPoints: number;
  testsCompleted: number;
  solvedProblems: number;
  rank: number;
  badge: string;
}

export interface ClassroomAssignment {
  id: string;
  title: string;
  subject: Subject;
  grade: number;
  description: string;
  dueText: string;
  assignedDate: string;
  workUrl?: string;
  completedCount: number;
  totalStudents: number;
}

export interface StudentHandRaise {
  id: string;
  studentId: string;
  studentName: string;
  questionText: string;
  timestamp: string;
  status: 'pending' | 'addressed';
}

export interface LiveChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  text: string;
  timestamp: string;
  encrypted: boolean;
}

export interface ClassroomMessage {
  id: string;
  senderName: string;
  senderRole: UserRole;
  text: string;
  timestamp: string;
  encrypted: boolean;
}

export interface StudentLeaderboardEntry {
  studentId: string;
  studentName: string;
  grade: number;
  avatar: string;
  points: number;
  testsCompleted: number;
  problemsSolved: number;
  rank: number;
  badges: string[];
}
