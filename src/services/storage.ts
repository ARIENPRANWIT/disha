import { Student, Assessment, LearningGroup, SubjectAssessmentScore, StudentRank, UserProfile, ClassroomAssignment, LiveChatMessage, StudentHandRaise, Language, ClassroomMessage, StudentLeaderboardEntry } from '../types';
import { INITIAL_STUDENTS, INITIAL_ASSESSMENTS, INITIAL_ASSIGNMENTS } from '../data/seedData';

const STORAGE_KEYS = {
  STUDENTS: 'disha_students_v1',
  ASSESSMENTS: 'disha_assessments_v1',
  USER_PROFILE: 'disha_user_profile_v1',
  LANGUAGE: 'disha_language_v1',
  IQ_SCORES: 'disha_iq_scores_v1',
  ASSIGNMENTS: 'disha_assignments_v1',
  LIVE_CHATS: 'disha_live_chats_v1',
  HAND_RAISES: 'disha_hand_raises_v1',
  ENCRYPTION_KEY: 'disha_e2e_key_v1',
};

export const DEFAULT_TEACHER: UserProfile = {
  id: 't1',
  name: 'Sunita Sharma',
  email: 'sunita.sharma@gov.in',
  role: 'teacher',
  schoolName: 'Govt. Primary School Chandpur (Block B)',
  villageCluster: 'District Angul / Chandpur CRC',
  authProvider: 'google',
  avatar: '👩🏽‍🏫',
};

export const DEFAULT_STUDENT: UserProfile = {
  id: 's1',
  name: 'Ramesh Patel',
  email: 'ramesh.p@student.disha.org',
  role: 'student',
  schoolName: 'Govt. Primary School Chandpur',
  villageCluster: 'Chandpur Village',
  authProvider: 'google',
  avatar: '👦🏽',
  assignedGrade: 3,
  studentId: 's1',
};

// Safe LocalStorage wrappers with encryption metadata
export const StorageService = {
  getStudents(): Student[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.STUDENTS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(INITIAL_STUDENTS));
        return INITIAL_STUDENTS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_STUDENTS;
    }
  },

  saveStudents(students: Student[]): void {
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
  },

  addStudent(student: Omit<Student, 'id'>): Student {
    const students = this.getStudents();
    const newStudent: Student = {
      ...student,
      id: 's_' + Date.now(),
    };
    students.push(newStudent);
    this.saveStudents(students);
    return newStudent;
  },

  getAssessments(): Assessment[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ASSESSMENTS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.ASSESSMENTS, JSON.stringify(INITIAL_ASSESSMENTS));
        return INITIAL_ASSESSMENTS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_ASSESSMENTS;
    }
  },

  saveAssessments(assessments: Assessment[]): void {
    localStorage.setItem(STORAGE_KEYS.ASSESSMENTS, JSON.stringify(assessments));
  },

  recordAssessment(assessment: Omit<Assessment, 'id' | 'date'>): { assessment: Assessment; isLevelUp: boolean } {
    const assessments = this.getAssessments();
    // check previous assessment for level-up celebration
    const studentAssessments = assessments
      .filter((a) => a.studentId === assessment.studentId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    const previous = studentAssessments[0];
    const isLevelUp = previous
      ? assessment.literacyLevel > previous.literacyLevel || assessment.numeracyLevel > previous.numeracyLevel
      : false;

    const newAssessment: Assessment = {
      ...assessment,
      id: 'a_' + Date.now(),
      date: new Date().toISOString().split('T')[0],
    };

    assessments.push(newAssessment);
    this.saveAssessments(assessments);
    return { assessment: newAssessment, isLevelUp };
  },

  getLatestAssessment(studentId: string): Assessment | undefined {
    const assessments = this.getAssessments().filter((a) => a.studentId === studentId);
    if (assessments.length === 0) return undefined;
    return assessments.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
  },

  getBaselineAssessment(studentId: string): Assessment | undefined {
    return this.getAssessments().find((a) => a.studentId === studentId && a.term === 'baseline');
  },

  getUserProfile(): UserProfile {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(DEFAULT_TEACHER));
        return DEFAULT_TEACHER;
      }
      return JSON.parse(data);
    } catch {
      return DEFAULT_TEACHER;
    }
  },

  getCurrentUser(): UserProfile {
    return this.getUserProfile();
  },

  saveUserProfile(profile: UserProfile): void {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
  },

  setCurrentUser(profile: UserProfile): void {
    this.saveUserProfile(profile);
  },

  getLanguage(): Language {
    try {
      const lang = localStorage.getItem(STORAGE_KEYS.LANGUAGE) as Language;
      return lang && ['en', 'hi', 'or', 'kn'].includes(lang) ? lang : 'en';
    } catch {
      return 'en';
    }
  },

  setLanguage(lang: Language): void {
    try {
      localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
    } catch {
      // no-op
    }
  },

  getIQScores(): SubjectAssessmentScore[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.IQ_SCORES);
      if (!data) {
        // seed initial scores for ranking
        const sample: SubjectAssessmentScore[] = [
          { studentId: 's5', studentName: 'Meena Nayak', subject: 'math', score: 19, total: 20, completedAt: '2026-09-15', iqBand: 'Master', points: 380 },
          { studentId: 's8', studentName: 'Anand Gowda', subject: 'math', score: 18, total: 20, completedAt: '2026-09-14', iqBand: 'Master', points: 360 },
          { studentId: 's2', studentName: 'Priya Sharma', subject: 'science', score: 17, total: 20, completedAt: '2026-09-16', iqBand: 'Advanced', points: 340 },
          { studentId: 's10', studentName: 'Vikram Yadav', subject: 'evs', score: 16, total: 20, completedAt: '2026-09-17', iqBand: 'Advanced', points: 320 },
          { studentId: 's1', studentName: 'Ramesh Patel', subject: 'math', score: 14, total: 20, completedAt: '2026-09-18', iqBand: 'Proficient', points: 280 },
          { studentId: 's4', studentName: 'Sunita Soren', subject: 'hindi', score: 15, total: 20, completedAt: '2026-09-18', iqBand: 'Proficient', points: 300 },
          { studentId: 's6', studentName: 'Ravi Singh', subject: 'english', score: 13, total: 20, completedAt: '2026-09-17', iqBand: 'Progressing', points: 260 },
        ];
        localStorage.setItem(STORAGE_KEYS.IQ_SCORES, JSON.stringify(sample));
        return sample;
      }
      return JSON.parse(data);
    } catch {
      return [];
    }
  },

  saveIQScore(score: SubjectAssessmentScore): void {
    const scores = this.getIQScores();
    scores.push(score);
    localStorage.setItem(STORAGE_KEYS.IQ_SCORES, JSON.stringify(scores));
  },

  getLeaderboard(): StudentLeaderboardEntry[] {
    const students = this.getStudents();
    const scores = this.getIQScores();
    const map = new Map<string, { totalPoints: number; count: number; solved: number }>();

    scores.forEach((s) => {
      const prev = map.get(s.studentId) || { totalPoints: 0, count: 0, solved: 0 };
      prev.totalPoints += s.points;
      prev.count += 1;
      prev.solved += s.score;
      map.set(s.studentId, prev);
    });

    const ranks: StudentLeaderboardEntry[] = students.map((std) => {
      const data = map.get(std.id) || { totalPoints: 120 + (std.grade * 30), count: 1, solved: 8 + std.grade };
      let badge = 'Seedling Thinker 🌱';
      if (data.totalPoints >= 450) badge = 'Banyan Scholar 🌳';
      else if (data.totalPoints >= 350) badge = 'Math & Logic Star ⭐';
      else if (data.totalPoints >= 250) badge = 'Word Champion 🏆';
      else if (data.totalPoints >= 180) badge = 'Curious Explorer 🔍';

      return {
        studentId: std.id,
        studentName: std.name,
        grade: std.grade,
        avatar: std.avatar,
        points: data.totalPoints,
        testsCompleted: data.count,
        problemsSolved: data.solved,
        rank: 0,
        badges: [badge, `Class ${std.grade} Achiever`],
      };
    });

    ranks.sort((a, b) => b.points - a.points);
    return ranks.map((r, idx) => ({ ...r, rank: idx + 1 }));
  },

  getAssignments(): ClassroomAssignment[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ASSIGNMENTS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(INITIAL_ASSIGNMENTS));
        return INITIAL_ASSIGNMENTS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_ASSIGNMENTS;
    }
  },

  addAssignment(assignment: Omit<ClassroomAssignment, 'id' | 'assignedDate' | 'completedCount'>): ClassroomAssignment {
    const items = this.getAssignments();
    const newItem: ClassroomAssignment = {
      ...assignment,
      id: 'as_' + Date.now(),
      assignedDate: new Date().toISOString().split('T')[0],
      completedCount: 0,
    };
    items.unshift(newItem);
    localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(items));
    return newItem;
  },

  getLiveChats(): LiveChatMessage[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.LIVE_CHATS);
      if (!data) {
        const seed: LiveChatMessage[] = [
          {
            id: 'c1',
            senderId: 't1',
            senderName: 'Sunita Sharma (Teacher)',
            senderRole: 'teacher',
            text: 'Namaste everyone! Today we will practice 2-digit sums with pebble bundles. Keep your notebooks ready.',
            timestamp: '10:02 AM',
            encrypted: true,
          },
          {
            id: 'c2',
            senderId: 's1',
            senderName: 'Ramesh Patel',
            senderRole: 'student',
            text: 'Teacher ji, I have collected 20 neem seeds for the count game!',
            timestamp: '10:04 AM',
            encrypted: true,
          },
        ];
        localStorage.setItem(STORAGE_KEYS.LIVE_CHATS, JSON.stringify(seed));
        return seed;
      }
      return JSON.parse(data);
    } catch {
      return [];
    }
  },

  sendLiveChat(sender: UserProfile, text: string): LiveChatMessage {
    const chats = this.getLiveChats();
    const newMsg: LiveChatMessage = {
      id: 'c_' + Date.now(),
      senderId: sender.id,
      senderName: sender.name,
      senderRole: sender.role,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      encrypted: true,
    };
    chats.push(newMsg);
    localStorage.setItem(STORAGE_KEYS.LIVE_CHATS, JSON.stringify(chats));
    return newMsg;
  },

  getClassroomMessages(): ClassroomMessage[] {
    return this.getLiveChats().map((c) => ({
      id: c.id,
      senderName: c.senderName,
      senderRole: c.senderRole,
      text: c.text,
      timestamp: c.timestamp,
      encrypted: c.encrypted,
    }));
  },

  addClassroomMessage(msg: ClassroomMessage): void {
    const chats = this.getLiveChats();
    chats.push({
      id: msg.id,
      senderId: 'user',
      senderName: msg.senderName,
      senderRole: msg.senderRole,
      text: msg.text,
      timestamp: msg.timestamp,
      encrypted: msg.encrypted,
    });
    localStorage.setItem(STORAGE_KEYS.LIVE_CHATS, JSON.stringify(chats));
  },

  getHandRaises(): StudentHandRaise[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.HAND_RAISES);
      if (!data) return [];
      return JSON.parse(data);
    } catch {
      return [];
    }
  },

  raiseHand(studentId: string, studentName: string, questionText: string): StudentHandRaise {
    const items = this.getHandRaises();
    const newRaise: StudentHandRaise = {
      id: 'hr_' + Date.now(),
      studentId,
      studentName,
      questionText: questionText || 'Raised hand to ask a question aloud during live class!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'pending',
    };
    items.unshift(newRaise);
    localStorage.setItem(STORAGE_KEYS.HAND_RAISES, JSON.stringify(items));
    return newRaise;
  },

  addressHandRaise(id: string): void {
    const items = this.getHandRaises().map((hr) => (hr.id === id ? { ...hr, status: 'addressed' as const } : hr));
    localStorage.setItem(STORAGE_KEYS.HAND_RAISES, JSON.stringify(items));
  },

  // TaRL Auto-Grouping Logic: Groups students across classes into targeted skill level groups
  computeTaRLGroups(): { literacyGroups: LearningGroup[]; numeracyGroups: LearningGroup[] } {
    const students = this.getStudents();
    const latestAssessments = new Map<string, Assessment>();

    students.forEach((s) => {
      const a = this.getLatestAssessment(s.id);
      if (a) latestAssessments.set(s.id, a);
    });

    // Literacy Groups (Levels 1 to 5)
    const litGroups: LearningGroup[] = [
      {
        id: 'lit_5',
        type: 'literacy',
        level: 5,
        groupName: 'Group A: Story Readers (Kahani)',
        displayName: 'Fluent Readers & Comprehension',
        tagline: 'Reads with expression, answers deep inferential questions',
        studentIds: [],
        badge: '🌳 Tree Level',
        themeColor: 'emerald',
        recommendedActivities: [
          {
            title: 'Paired Reading & Drama',
            description: 'Children read short folklore together, enact characters, and write 3-sentence reviews.',
            materials: 'Pratham level 4 storybooks, character role slips',
            icon: '🎭',
          },
          {
            title: 'Village News Wall',
            description: 'Children write small 2-sentence notices about school events for the classroom wall.',
            materials: 'Chart paper, sketch pens',
            icon: '📰',
          },
        ],
      },
      {
        id: 'lit_4',
        type: 'literacy',
        level: 4,
        groupName: 'Group B: Sentence Level (Vakya)',
        displayName: 'Simple Sentence Readers',
        tagline: 'Connecting words into sentences, understanding punctuation',
        studentIds: [],
        badge: '🌸 Flower Level',
        themeColor: 'teal',
        recommendedActivities: [
          {
            title: 'Sentence Jumble Puzzle',
            description: 'Provide cut-out words from sentences. Children arrange them in meaningful order.',
            materials: 'Sentence strips, cardboard cards',
            icon: '🧩',
          },
          {
            title: 'Picture Description',
            description: 'Show a village fair picture. Each student speaks and writes two complete sentences.',
            materials: 'Big picture posters',
            icon: '🖼️',
          },
        ],
      },
      {
        id: 'lit_3',
        type: 'literacy',
        level: 3,
        groupName: 'Group C: Word Level (Shabd)',
        displayName: 'Word Decoding Masters',
        tagline: 'Blends sounds to read 2 and 3 letter matra words',
        studentIds: [],
        badge: '🪴 Plant Level',
        themeColor: 'amber',
        recommendedActivities: [
          {
            title: 'Word Ladder & Grid',
            description: 'Change one letter to form new words (e.g., जल → नल → कल → फल).',
            materials: 'Blackboard grid, chalk, letter blocks',
            icon: '🪜',
          },
          {
            title: 'Sight Word Flash Bingo',
            description: 'Teacher calls out common words; kids mark cards with pebbles.',
            materials: 'Bingo cards, tamarind seeds',
            icon: '🎯',
          },
        ],
      },
      {
        id: 'lit_2',
        type: 'literacy',
        level: 2,
        groupName: 'Group D: Letter Level (Akshar)',
        displayName: 'Letter Sound Explorers',
        tagline: 'Recognizes distinct letters and phonemes',
        studentIds: [],
        badge: '🌿 Sprout Level',
        themeColor: 'orange',
        recommendedActivities: [
          {
            title: 'Sand Letter Tracing',
            description: 'Finger trace letters in shallow sand trays or soil while pronouncing the sound.',
            materials: 'Sand plates, twig sticks',
            icon: '🏖️',
          },
          {
            title: 'Letter Hopscotch',
            description: 'Draw chalk grid with letters on floor. Kids jump on the letter called out.',
            materials: 'Floor chalk',
            icon: '🦶',
          },
        ],
      },
      {
        id: 'lit_1',
        type: 'literacy',
        level: 1,
        groupName: 'Group E: Beginner (Prarambhik)',
        displayName: 'Foundational Oral Learners',
        tagline: 'Building vocabulary, listening skills & sound awareness',
        studentIds: [],
        badge: '🌱 Seedling Level',
        themeColor: 'rose',
        recommendedActivities: [
          {
            title: 'Picture & Object Talk',
            description: 'Hold up familiar objects (leaf, spoon, ball) and have children describe them orally.',
            materials: 'Household and nature objects',
            icon: '🗣️',
          },
          {
            title: 'Rhymes & Rhythm Clap',
            description: 'Sing local folk songs and clap on rhyming syllables.',
            materials: 'Rhythm / clapping',
            icon: '👏',
          },
        ],
      },
    ];

    // Numeracy Groups (Levels 1 to 4)
    const numGroups: LearningGroup[] = [
      {
        id: 'num_4',
        type: 'numeracy',
        level: 4,
        groupName: 'Math Group A: Word Math & Multi-Operations',
        displayName: 'Practical Problem Solvers',
        tagline: 'Multiplication, division, and everyday word sums',
        studentIds: [],
        badge: '🌳 Banyan Level',
        themeColor: 'emerald',
        recommendedActivities: [
          {
            title: 'Kirana Store Simulation',
            description: 'Students set up a mock village shop with price tags and calculate bills & balance.',
            materials: 'Paper notes, empty clean wrappers, scale',
            icon: '🏪',
          },
          {
            title: 'Division by Equal Sharing',
            description: 'Distribute 36 marbles equally among 4 plates. Understand sharing as division.',
            materials: 'Marbles, paper bowls',
            icon: '➗',
          },
        ],
      },
      {
        id: 'num_3',
        type: 'numeracy',
        level: 3,
        groupName: 'Math Group B: 2-Digit Operations (Carry/Borrow)',
        displayName: 'Tens & Ones Operations',
        tagline: 'Double-digit addition & subtraction with regrouping',
        studentIds: [],
        badge: '🪴 Plant Level',
        themeColor: 'teal',
        recommendedActivities: [
          {
            title: 'Bundle & Sticks Regrouping',
            description: '10 single sticks become 1 bundle of ten. Physical carry-over demonstration.',
            materials: 'Neem sticks, rubber bands',
            icon: '🥢',
          },
          {
            title: 'Number Line Hop Game',
            description: 'Step forward 25, then step back 12 on a drawn floor line.',
            materials: 'Floor number line',
            icon: '📏',
          },
        ],
      },
      {
        id: 'num_2',
        type: 'numeracy',
        level: 2,
        groupName: 'Math Group C: 1-Digit Operations',
        displayName: 'Single-Digit Add & Subtract',
        tagline: 'Mental and concrete single-digit sums',
        studentIds: [],
        badge: '🌿 Sprout Level',
        themeColor: 'amber',
        recommendedActivities: [
          {
            title: 'Pebble Count & Take Away',
            description: 'Hands-on adding 4 pebbles to 3 pebbles, then removing 2.',
            materials: 'River stones / seeds',
            icon: '⚪',
          },
          {
            title: 'Dice Roll Quick Add',
            description: 'Roll two large handmade dice and call out total first.',
            materials: 'Wooden dice',
            icon: '🎲',
          },
        ],
      },
      {
        id: 'num_1',
        type: 'numeracy',
        level: 1,
        groupName: 'Math Group D: Number Recognition (1-9)',
        displayName: 'Number Sense & Counting',
        tagline: 'Associating quantity with digit symbol 1-9',
        studentIds: [],
        badge: '🌱 Seedling Level',
        themeColor: 'rose',
        recommendedActivities: [
          {
            title: 'Number Flashcard Match',
            description: 'Match digit card "5" with 5 leaves or bottle caps.',
            materials: 'Handmade digit cards, leaves',
            icon: '🃏',
          },
          {
            title: 'Count Steps to Flagpole',
            description: 'Walk and count aloud each step from classroom to tree.',
            materials: 'School courtyard',
            icon: '🚶',
          },
        ],
      },
    ];

    // Distribute students
    students.forEach((std) => {
      const assess = latestAssessments.get(std.id);
      const litLevel = assess ? assess.literacyLevel : 1;
      const numLevel = assess ? assess.numeracyLevel : 1;

      const lg = litGroups.find((g) => g.level === litLevel);
      if (lg) lg.studentIds.push(std.id);

      const ng = numGroups.find((g) => g.level === numLevel);
      if (ng) ng.studentIds.push(std.id);
    });

    return { literacyGroups: litGroups, numeracyGroups: numGroups };
  },
};
