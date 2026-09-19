const fs = require('fs');

const code = `import { Language } from '../types';

export interface TranslationDict {
  appName: string;
  appSubtitle: string;
  tagline: string;
  offlineReady: string;
  encryptedNotice: string;
  rankings: string;

  baseline: string;
  term1: string;
  term2: string;
  endline: string;

  nav: {
    teacher: string;
    parent: string;
    iq: string;
    ranks: string;
    classroom: string;
    classTag: string;
    selectLang: string;
    switchAccount: string;
    logout: string;
    authProvider: string;
    security: string;
    schoolTag: string;
  };

  teacher: {
    chartTab: string;
    groupsTab: string;
    rosterTab: string;
    reportTab: string;
    startAssess: string;
    totalAssessed: string;
    enrolledClass: string;
    storyLevel: string;
    storyDesc: (fluent: number, total: number) => string;
    developingLevel: string;
    developingDesc: (dev: number) => string;
    beginnerLevel: string;
    beginnerDesc: (beg: number) => string;
    chartTitle: string;
    chartSubtitle: string;
    legendBeginner: string;
    legendDeveloping: string;
    legendMastery: string;
    oralReadingLabel: string;
    gradeReadersLabel: (pct: number) => string;
    mathLabel: string;
    mathOpsLabel: (pct: number) => string;
    realityGapBadge: string;
    realityGapTitle: string;
    realityGapDesc: string;
    allFluentMsg: string;
    enrolledClassText: (grade: number) => string;
    actualLabel: string;
    viewGroupsBtn: string;
    assessBtn: string;
    tarlLiteracy: string;
  };

  groups: {
    bannerBadge: string;
    bannerTitle: string;
    bannerDesc: string;
    recoTime: string;
    peerLearning: string;
    readingTab: string;
    mathTab: string;
    printBtn: string;
    childrenCount: (count: number) => string;
    assignedTitle: string;
    multiGradeTip: string;
    noChildren: string;
    activitiesTitle: string;
    materialsLabel: string;
    teacherTip: string;
    reassessTooltip: string;
  };

  roster: {
    searchPlaceholder: string;
    allGrades: string;
    classPrefix: string;
    addStudentBtn: string;
    levelUp: string;
    readingLevel: string;
    mathLevel: string;
    parent: string;
    tapAssess: string;
    growthCard: string;
    modalTitle: string;
    childName: string;
    childNamePlaceholder: string;
    enrolledGrade: string;
    rollNo: string;
    rollNoPlaceholder: string;
    avatarLabel: string;
    parentName: string;
    parentPhone: string;
    cancel: string;
    submit: string;
    filterAll: string;
    addChildBtn: string;
    rollPrefix: string;
    parentLabel: string;
    tapAssessBtn: string;
    growthCardBtn: string;
    childNameLabel: string;
    gradeLabel: string;
    rollLabel: string;
    parentNameLabel: string;
    parentPhoneLabel: string;
    cancelBtn: string;
    saveBtn: string;
  };

  assessModal: {
    modalSubtitle: string;
    termLabel: string;
    prevRecorded: string;
    readingTitle: string;
    mathTitle: string;
    levelUpAlert: string;
    levelUpSub: (name: string) => string;
    notesLabel: string;
    notesPlaceholder: string;
    cancel: string;
    saveBtn: string;
    tapSubtitle: string;
    phaseLabel: string;
    readingSection: string;
    mathSection: string;
    levelUpAwesome: string;
    levelUpDetail: (name: string) => string;
    obsLabel: string;
    obsPlaceholder: string;
    cancelBtn: string;
  };

  headmaster: {
    backBtn: string;
    printBtn: string;
    districtOffice: string;
    reportTitle: string;
    schoolMeta: string;
    academicTerm: string;
    generatedOn: string;
    totalAssessed: string;
    storyReaders: string;
    beginnerTier: string;
    leveledUpCount: string;
    readingTableTitle: string;
    colLevel: string;
    colSubskill: string;
    colChildren: string;
    colPct: string;
    colVisual: string;
    mathTableTitle: string;
    teacherSign: string;
    headmasterSign: string;
    officerSign: string;
  };

  report: {
    backBtn: string;
    printBtn: string;
    deptTitle: string;
    reportTitle: string;
    schoolInfo: string;
    academicYear: string;
    generatedOn: string;
    totalAssessed: string;
    storyReaders: string;
    beginnerTier: string;
    leveledUp: string;
    rosterTableTitle: string;
    thRoll: string;
    thName: string;
    thGrade: string;
    thReading: string;
    thMath: string;
    thStatus: string;
    teacherSign: string;
    headmasterSign: string;
    officialSeal: string;
  };

  parentCard: {
    title: string;
    canDoTitle: string;
    homeActivitiesTitle: string;
    shareWhatsApp: string;
    printBadge: string;
    selectChild: string;
    copiedNotice: string;
    currentStage: string;
    growthPathTitle: string;
    growthPathSub: (name: string) => string;
    homeActivitiesSub: string;
    noReadingNeeded: string;
    assessedBy: string;
    tarlGroup: string;
    groupA: string;
    groupB: string;
    groupC: string;
    plantStages: {
      seedling: string;
      sprout: string;
      plant: string;
      bloomed: string;
      banyan: string;
    };
    canDo: {
      lit1: string;
      lit2: string;
      lit3: string;
      lit4: string;
      lit5: string;
      num1: string;
      num2: string;
      num3: string;
      num4: string;
      format: (name: string, lit: string, num: string) => string;
    };
    canDoSentences: {
      lit: Record<1 | 2 | 3 | 4 | 5, string>;
      num: Record<1 | 2 | 3 | 4, string>;
    };
    plantSeedling: string;
    plantSprout: string;
    plantPlant: string;
    plantBloomed: string;
    plantBanyan: string;
    whatsAppShare: string;
    whatsAppCopied: string;
    levelPrefix: string;
    groupLabel: string;
  };

  subjectTest: {
    title: string;
    studentLabel: (name: string, grade: number) => string;
    questionCount: string;
    assessmentComplete: string;
    subjectLabel: (sub: string) => string;
    correctProblemAnswers: string;
    pointsEarned: (pts: number) => string;
    rankUpdated: string;
    retakeTest: string;
    nextSubjectQuiz: string;
    questionProgress: (curr: number, total: number) => string;
    classCurriculum: (grade: number) => string;
    correctAnswer: string;
    incorrectAnswer: string;
    nextQuestion: string;
    viewResults: string;
    whyLabel: string;
  };

  quiz: {
    title: string;
    studentLabel: string;
    questionsCount: string;
    completeTitle: string;
    subjectLabel: string;
    correctAnswers: string;
    pointsEarned: (pts: number) => string;
    rankUpdated: string;
    retakeBtn: string;
    nextSubjectBtn: string;
    questionProgress: (curr: number, total: number) => string;
    curriculumLabel: (grade: number) => string;
    explanationLabel: string;
    correctNotice: string;
    incorrectNotice: string;
    nextBtn: string;
    finishBtn: string;
  };

  leaderboard: {
    badge: string;
    title: string;
    subtitle: string;
    formula: string;
    pointsUnit: string;
    problemsSolvedCount: (count: number) => string;
    topSolverTag: string;
    searchPlaceholder: string;
    allGrades: string;
    tableTitle: string;
    studentsListed: (count: number) => string;
    solvedUnit: string;
  };

  ranks: {
    badge: string;
    title: string;
    subtitle: string;
    pointsRule: string;
    rank1Badge: string;
    rank2Badge: string;
    rank3Badge: string;
    points: string;
    problemsSolved: string;
    searchPlaceholder: string;
    allGrades: string;
    thRank: string;
    thStudent: string;
    thGrade: string;
    thScore: string;
    thBadges: string;
    thAction: string;
    viewCard: string;
  };

  classroom: {
    title: string;
    subtitle: string;
    liveTitle: string;
    joinClass: string;
    startClass: string;
    endClass: string;
    askQuestion: string;
    raiseHand: string;
    handRaisedAlert: string;
    assignments: string;
    groupChat: string;
    muted: string;
    unmuted: string;
    videoOn: string;
    videoOff: string;
    lowBandwidth: string;
    lowBandwidthOn: string;
    lowBandwidthOff: string;
    liveSessionTag: string;
    handRaisedTag: string;
    audioOnlyNote: string;
    videoReadyNote: string;
    listening: string;
    handRaisedBtn: string;
    oneTapLabel: string;
    quickChips: {
      present: string;
      understood: string;
      repeat: string;
      answer: string;
      understand?: string;
      doubt?: string;
      gotIt?: string;
    };
    tabChat: (count: number) => string;
    tabClasswork: (count: number) => string;
    encryptionNote: string;
    homeworkTitle: string;
    newTaskBtn: string;
    taskPlaceholder: string;
    duePrefix: string;
    submittedCount: (completed: number, total: number) => string;
    e2eEncrypted: string;
    teacherBadge: string;
    quickChatTitle: string;
    chips: {
      present: string;
      understood: string;
      question: string;
      repeat: string;
    };
    chatPlaceholder: string;
    send: string;
    createAssignment: string;
    assignmentDue: (due: string) => string;
    submitted: (completed: number, total: number) => string;
    newAssignmentTitle: string;
    subject: string;
    instructionsPlaceholder: string;
    assignBtn: string;
    cancelBtn: string;
    tabVideo: string;
    tabAssignments: string;
  };

  auth: {
    title: string;
    subtitle: string;
    roleTeacher: string;
    roleHeadmaster: string;
    roleStudent: string;
    roleParent: string;
    selectRole: string;
    googleLogin: string;
    microsoftLogin: string;
    outlookLogin: string;
    ruralLoginTitle: string;
    schoolCode: string;
    pin: string;
    signInBtn: string;
    demoNote: string;
  };

  footer: {
    brand: string;
    methodology: string;
    tagline: string;
  };

  growthMetaphor: {
    seedling: string;
    sprout: string;
    smallPlant: string;
    floweringPlant: string;
    banyanTree: string;
  };

  litLevels: {
    1: { name: string; desc: string; icon: string };
    2: { name: string; desc: string; icon: string };
    3: { name: string; desc: string; icon: string };
    4: { name: string; desc: string; icon: string };
    5: { name: string; desc: string; icon: string };
  };

  numLevels: {
    1: { name: string; desc: string; icon: string };
    2: { name: string; desc: string; icon: string };
    3: { name: string; desc: string; icon: string };
    4: { name: string; desc: string; icon: string };
  };

  subjects: {
    math: string;
    evs: string;
    science: string;
    hindi: string;
    english: string;
  };
}

export const translations: Record<Language, TranslationDict> = {
  en: {
    appName: "Disha",
    appSubtitle: "Learning Level Visibility Platform",
    tagline: "Teaching at the Right Level (TaRL) for Indian Primary Schools",
    offlineReady: "Offline Ready • Data Saved Locally",
    encryptedNotice: "Secured with DTLS-SRTP 256-bit Encryption",
    rankings: "Weekly Problem-Solving Champions",

    baseline: "Baseline",
    term1: "Term 1",
    term2: "Term 2",
    endline: "Endline",

    nav: {
      teacher: "Teacher",
      parent: "Growth Card",
      iq: "Quiz (20Q)",
      ranks: "Leaderboard",
      classroom: "Live Class",
      classTag: "Class 1-5 TaRL",
      selectLang: "Select Language",
      switchAccount: "Switch Account (Google / Microsoft / Demo)",
      logout: "Reset to Default Session",
      authProvider: "Auth Provider",
      security: "Security",
      schoolTag: "Govt. Primary School",
    },

    teacher: {
      chartTab: "Level Visibility Chart",
      groupsTab: "TaRL Learning Groups",
      rosterTab: "Class Roster",
      reportTab: "1-Page HM Summary",
      startAssess: "Start Quick Assessment",
      totalAssessed: "TOTAL ASSESSED",
      enrolledClass: "Enrolled in Class 1 to 5",
      storyLevel: "STORY / FLUENT LEVEL",
      storyDesc: (fluent, total) => String(fluent) + " of " + String(total) + " read full stories",
      developingLevel: "DEVELOPING (WORDS/MATH)",
      developingDesc: (dev) => String(dev) + " children progressing fast",
      beginnerLevel: "BEGINNER (NEEDS TaRL)",
      beginnerDesc: (beg) => String(beg) + " children in foundational circle",
      chartTitle: "Traffic-Light Learning Level Distribution",
      chartSubtitle: "Red = Beginner tier • Yellow = Developing • Green = Story & Multi-op Mastery",
      legendBeginner: "Beginner",
      legendDeveloping: "Developing",
      legendMastery: "Mastery",
      oralReadingLabel: "Oral Reading (EGRA) Actual Level:",
      gradeReadersLabel: (pct) => String(pct) + "% at Grade-Level Readers",
      mathLabel: "Basic Numeracy (EGMA) Actual Level:",
      mathOpsLabel: (pct) => String(pct) + "% at Double-digit & Word Ops",
      realityGapBadge: "TaRL Reality Gap Diagnostic",
      realityGapTitle: "The Grade vs. Actual Ability Gap in Rural Schools",
      realityGapDesc: "Most children get automatically promoted by grade even if they cannot decode simple words. Below are children in Class 3, 4, or 5 who require immediate foundational level grouping:",
      allFluentMsg: "Superb! All children in Class 3-5 can read words and sentences.",
      enrolledClassText: (grade) => "Enrolled: Class " + grade,
      actualLabel: "Actual",
      viewGroupsBtn: "View Auto-Groups",
      assessBtn: "Assess",
      tarlLiteracy: "TaRL Literacy",
    },

    groups: {
      bannerBadge: "Pedagogical Practice",
      bannerTitle: "Teaching at the Right Level (TaRL) Grouping",
      bannerDesc: "Children are grouped by their verified learning level, NOT their enrolled age or grade. Daily 1-2 hour dedicated level circles help bridge learning gaps rapidly.",
      recoTime: "Recommended Daily Time: 60-90 mins dedicated level sessions",
      peerLearning: "Peer Learning: Older & younger children learn together comfortably",
      readingTab: "Reading Level Groups (EGRA)",
      mathTab: "Math Level Groups (EGMA)",
      printBtn: "Print Group Plan",
      childrenCount: (count) => String(count) + " Children",
      assignedTitle: "Assigned Children",
      multiGradeTip: "Multi-Grade Level Circle",
      noChildren: "No children currently assessed at this tier.",
      activitiesTitle: "Pratham Recommended Activity Set",
      materialsLabel: "Materials Needed:",
      teacherTip: "Teacher Role:",
      reassessTooltip: "Re-assess every 30-45 days to move children to next circle",
    },

    roster: {
      searchPlaceholder: "Search child by name or roll no...",
      allGrades: "All Classes",
      classPrefix: "Class",
      addStudentBtn: "+ Add Student",
      levelUp: "LEVEL UP",
      readingLevel: "Reading Level",
      mathLevel: "Math Level",
      parent: "Parent",
      tapAssess: "Tap Assess",
      growthCard: "Growth Card",
      modalTitle: "Add Student to Class Roster",
      childName: "Child's Full Name",
      childNamePlaceholder: "e.g. Ramesh Patel",
      enrolledGrade: "Enrolled Grade / Class",
      rollNo: "Roll Number",
      rollNoPlaceholder: "e.g. 14",
      avatarLabel: "Avatar Icon",
      parentName: "Parent / Guardian Name",
      parentPhone: "WhatsApp Phone Number",
      cancel: "Cancel",
      submit: "Save to Roster",
      filterAll: "All Classes",
      addChildBtn: "+ Add Child",
      rollPrefix: "Roll #",
      parentLabel: "Parent",
      tapAssessBtn: "Tap Assess",
      growthCardBtn: "Growth Card",
      childNameLabel: "Child's Full Name",
      gradeLabel: "Enrolled Class / Grade",
      rollLabel: "Roll Number",
      parentNameLabel: "Parent / Guardian Name",
      parentPhoneLabel: "WhatsApp Phone Number",
      cancelBtn: "Cancel",
      saveBtn: "Save to Roster",
    },

    assessModal: {
      modalSubtitle: "Tap reading & math sub-skills (No typing needed)",
      termLabel: "Assessment Term / Phase",
      prevRecorded: "Previous Level",
      readingTitle: "1. Literacy Level (EGRA Oral Reading)",
      mathTitle: "2. Numeracy Level (EGMA Basic Arithmetic)",
      levelUpAlert: "Level Up Celebration!",
      levelUpSub: (name) => name + " has advanced to a higher learning tier!",
      notesLabel: "Observation Notes (Optional)",
      notesPlaceholder: "e.g., Struggling with vowel sounds or carry-over math...",
      cancel: "Cancel",
      saveBtn: "Save Assessment",
      tapSubtitle: "Tap oral reading & math level",
      phaseLabel: "Assessment Term / Phase",
      readingSection: "Literacy Level (EGRA Oral Reading)",
      mathSection: "Numeracy Level (EGMA Math Skills)",
      levelUpAwesome: "Level Up! 🎉",
      levelUpDetail: (name) => name + " has advanced to a higher learning tier!",
      obsLabel: "Teacher Observation / Notes (Optional)",
      obsPlaceholder: "E.g., struggling with vowel sounds...",
      cancelBtn: "Cancel",
    },

    headmaster: {
      backBtn: "← Back to Dashboard",
      printBtn: "Print Official Sheet (A4)",
      districtOffice: "District Primary Education Programme • Block Resource Centre",
      reportTitle: "Headmaster Executive Learning Level Summary",
      schoolMeta: "Govt. Primary School Chandpur • U-DISE: 21140201801 • TaRL Cohort",
      academicTerm: "Session 2024-25",
      generatedOn: "Generated on",
      totalAssessed: "Total Assessed",
      storyReaders: "Story Level (Fluent)",
      beginnerTier: "Beginner Level",
      leveledUpCount: "Learning Gains",
      readingTableTitle: "Literacy Level (EGRA Oral Reading) Breakdown",
      colLevel: "Level",
      colSubskill: "Core Sub-skill",
      colChildren: "Children",
      colPct: "% of Class",
      colVisual: "Visual Distribution",
      mathTableTitle: "Numeracy Level (EGMA Arithmetic) Breakdown",
      teacherSign: "Class Teacher Signature",
      headmasterSign: "Headmaster Signature",
      officerSign: "Cluster Resource Person (CRP) Verification",
    },

    report: {
      backBtn: "← Back to Dashboard",
      printBtn: "Print Official Sheet (A4)",
      deptTitle: "Department of School & Mass Education • Sarva Shiksha Abhiyan",
      reportTitle: "Headmaster Executive Summary: Learning Level Visibility Report",
      schoolInfo: "Govt. Primary School Chandpur • U-DISE Code: 21140201801 • Block: Rampur",
      academicYear: "Academic Session: 2024-25 • TaRL Initiative",
      generatedOn: "Generated on",
      totalAssessed: "Total Children Assessed",
      storyReaders: "Story Level Readers",
      beginnerTier: "Beginner Tier (Letters)",
      leveledUp: "Leveled Up This Term",
      rosterTableTitle: "Complete Student Assessment & Level Distribution Rollup",
      thRoll: "Roll",
      thName: "Student Name",
      thGrade: "Enrolled",
      thReading: "EGRA Reading Level",
      thMath: "EGMA Math Level",
      thStatus: "TaRL Action Status",
      teacherSign: "Class Teacher Signature",
      headmasterSign: "Headmaster Signature",
      officialSeal: "School Official Seal",
    },

    parentCard: {
      title: "Student Learning Growth Card",
      canDoTitle: "What your child can proudly do today",
      homeActivitiesTitle: "Playful Learning Activities to do at Home",
      shareWhatsApp: "Share via WhatsApp",
      printBadge: "Print Growth Card",
      selectChild: "Select Child:",
      copiedNotice: "Growth Card summary copied to clipboard!",
      currentStage: "Current Growth Stage:",
      growthPathTitle: "Plant Growth Metaphor for Parents",
      growthPathSub: (name) => name + "'s learning journey from a tiny seed to a flourishing banyan tree",
      homeActivitiesSub: "Simple 10-minute daily games parents can do without needing to read or write",
      noReadingNeeded: "No parent reading required • Audio/visual guided activities",
      assessedBy: "Assessed by Govt. Primary School Teacher",
      tarlGroup: "Current TaRL Level Circle:",
      groupA: "Circle 1: Foundational Letters & Sounds",
      groupB: "Circle 2: Word & Simple Sentences",
      groupC: "Circle 3: Story Fluency & Math Reasoning",
      plantStages: {
        seedling: "Seedling (Letters)",
        sprout: "Sprout (Words)",
        plant: "Plant (Sentences)",
        bloomed: "Bloomed (Story)",
        banyan: "Banyan (Independent)",
      },
      canDo: {
        lit1: "recognizes letter shapes and oral sounds",
        lit2: "identifies letters and decodes sounds",
        lit3: "reads simple everyday words fluently",
        lit4: "reads short sentences with proper pauses",
        lit5: "reads full story paragraphs with deep comprehension",
        num1: "recognizes single digit numbers 1 to 9",
        num2: "solves single-digit addition and subtraction",
        num3: "solves 2-digit arithmetic with carry & borrow",
        num4: "solves word problems, multiplication, and division",
        format: (name, lit, num) => name + " " + lit + " and " + num + "!",
      },
      canDoSentences: {
        lit: {
          1: "is learning to recognize letter sounds and vowels",
          2: "can read letters and individual sounds",
          3: "can read simple words with 2-3 syllables",
          4: "reads sentences and short paragraphs with confidence",
          5: "reads full stories fluently with deep comprehension",
        },
        num: {
          1: "is learning number identification from 1 to 9",
          2: "can solve single-digit additions and subtractions",
          3: "can solve 2-digit calculations with carry/borrow",
          4: "solves multiplication, division, and real-world word problems",
        },
      },
      plantSeedling: "Seedling (Letters)",
      plantSprout: "Sprout (Words)",
      plantPlant: "Plant (Sentences)",
      plantBloomed: "Bloomed (Fluent Story)",
      plantBanyan: "Banyan (Independent)",
      whatsAppShare: "Share via WhatsApp",
      whatsAppCopied: "Report Copied to Clipboard!",
      levelPrefix: "Level",
      groupLabel: "TaRL Learning Group",
    },

    subjectTest: {
      title: "Student Quiz & Daily Problem Solving",
      studentLabel: (name, grade) => "Taking test as: " + name + " (Class " + grade + ")",
      questionCount: "20 Questions • 400 pts",
      assessmentComplete: "Quiz Complete! Fantastic Effort! 🎉",
      subjectLabel: (sub) => sub + " Assessment Results",
      correctProblemAnswers: "Correct Answers",
      pointsEarned: (pts) => "+" + pts + " Leaderboard Points",
      rankUpdated: "Rank Updated!",
      retakeTest: "Retake Subject Test",
      nextSubjectQuiz: "Try Next Subject",
      questionProgress: (curr, total) => "Question " + curr + " of " + total,
      classCurriculum: (grade) => "Class " + grade + " Level",
      correctAnswer: "Correct! Outstanding Thinking!",
      incorrectAnswer: "Not quite! See the helpful explanation below:",
      nextQuestion: "Next Question",
      viewResults: "View Test Results",
      whyLabel: "Why this is correct",
    },

    quiz: {
      title: "Student Subject Test & Daily Problem Solving",
      studentLabel: "Taking test as:",
      questionsCount: "20 Questions • Class Curriculum",
      completeTitle: "Quiz Complete! Fantastic Effort! 🎉",
      subjectLabel: "Subject Test Results",
      correctAnswers: "Correct Answers",
      pointsEarned: (pts) => "+" + pts + " Leaderboard Points",
      rankUpdated: "Rank Updated!",
      retakeBtn: "Retake Subject Test",
      nextSubjectBtn: "Try Next Subject",
      questionProgress: (curr, total) => "Question " + curr + " of " + total,
      curriculumLabel: (grade) => "Class " + grade + " Curriculum Level",
      explanationLabel: "Why this is correct:",
      correctNotice: "Correct! Outstanding Thinking!",
      incorrectNotice: "Not quite! See the helpful explanation below:",
      nextBtn: "Next Question",
      finishBtn: "View Test Results",
    },

    leaderboard: {
      badge: "Real-Time Student Ranking",
      title: "Weekly Champions",
      subtitle: "Points earned through daily subject quizzes & logic puzzles",
      formula: "1 Correct Answer = 20 Points",
      pointsUnit: "pts",
      problemsSolvedCount: (count) => String(count) + " questions solved",
      topSolverTag: "Top Solver",
      searchPlaceholder: "Search by student name or class...",
      allGrades: "All Classes",
      tableTitle: "All Class Champions & Badges",
      studentsListed: (count) => String(count) + " students participating",
      solvedUnit: "solved",
    },

    ranks: {
      badge: "Real-Time Student Ranking",
      title: "Weekly Problem-Solving Champions",
      subtitle: "Points earned through daily subject quizzes & logic puzzles. Tap any student to inspect their Growth Card.",
      pointsRule: "1 Correct Quiz Answer = 20 Points",
      rank1Badge: "Champion",
      rank2Badge: "Runner-Up",
      rank3Badge: "3rd Place",
      points: "Points",
      problemsSolved: "Problems Solved",
      searchPlaceholder: "Search student by name or class...",
      allGrades: "All Classes",
      thRank: "Rank",
      thStudent: "Student",
      thGrade: "Class",
      thScore: "Points Score",
      thBadges: "Badges Earned",
      thAction: "Action",
      viewCard: "View Card",
    },

    classroom: {
      title: "Rural Low-Bandwidth Live Audio/Video Classroom",
      subtitle: "Optimized for 2G/3G connections with instant teacher hand-raise",
      liveTitle: "Rural Low-Bandwidth Live Audio/Video Classroom",
      joinClass: "Join Live Class",
      startClass: "Start Class",
      endClass: "Leave Session",
      askQuestion: "Ask Question",
      raiseHand: "Raise Hand",
      handRaisedAlert: "Hand Raised! Teacher Notified",
      assignments: "Homework & Classwork",
      groupChat: "Class Discussion",
      muted: "Mic Muted",
      unmuted: "Mic Active",
      videoOn: "Camera On",
      videoOff: "Audio Only",
      lowBandwidth: "2G Mode",
      lowBandwidthOn: "2G Audio-Only Mode Active",
      lowBandwidthOff: "Low Bandwidth Mode (2G/3G)",
      liveSessionTag: "LIVE SESSION",
      handRaisedTag: "HAND RAISED",
      audioOnlyNote: "Audio-Only stream enabled to save 90% cellular data",
      videoReadyNote: "Camera paused (Click Video to broadcast)",
      listening: "Listening",
      handRaisedBtn: "Raise Hand",
      oneTapLabel: "One-Tap Instant Student Response:",
      quickChips: {
        present: "Present Sir! ✋",
        understood: "I Understand! 👍",
        repeat: "Please Repeat 🔁",
        answer: "I Have an Answer 💡",
      },
      tabChat: (count) => "Class Chat (" + count + ")",
      tabClasswork: (count) => "Classwork (" + count + ")",
      encryptionNote: "End-to-End Encrypted Session • No external ads",
      homeworkTitle: "Homework & Class Activities",
      newTaskBtn: "+ New Task",
      taskPlaceholder: "E.g., Read Story page 4 and write 5 hard words...",
      duePrefix: "Due:",
      submittedCount: (completed, total) => String(completed) + "/" + String(total) + " Submitted",
      e2eEncrypted: "Secured with DTLS-SRTP 256-bit WebRTC Encryption",
      teacherBadge: "Live Teacher",
      quickChatTitle: "One-Tap Student Response Chips:",
      chips: {
        present: "Present Sir! ✋",
        understood: "I Understand! 👍",
        question: "I Have a Doubt ❓",
        repeat: "Please Repeat 🔁",
      },
      chatPlaceholder: "Send question or comment to teacher...",
      send: "Send",
      createAssignment: "Create New Classwork Task",
      assignmentDue: (due) => "Due: " + due,
      submitted: (completed, total) => String(completed) + "/" + String(total) + " Submitted",
      newAssignmentTitle: "Task Title & Instructions",
      subject: "Subject",
      instructionsPlaceholder: "e.g., Read Story on page 14 and answer 3 questions...",
      assignBtn: "Post to Class",
      cancelBtn: "Cancel",
      tabVideo: "Live Video / Audio",
      tabAssignments: "Classwork & Homework",
    },

    auth: {
      title: "Disha School Access Portal",
      subtitle: "Indian Primary Schools Learning Visibility Network",
      roleTeacher: "Class Teacher",
      roleHeadmaster: "Headmaster / Cluster Officer",
      roleStudent: "Student / Learner",
      roleParent: "Parent / Guardian",
      selectRole: "Select Your Access Role",
      googleLogin: "Continue with Google Workspace",
      microsoftLogin: "Continue with Microsoft 365",
      outlookLogin: "Continue with Outlook Edu",
      ruralLoginTitle: "Or One-Tap Rural Offline Access (No Password)",
      schoolCode: "UDISE School Code",
      pin: "4-Digit Quick PIN",
      signInBtn: "Instant School Login",
      demoNote: "Demo credentials pre-loaded. Switch anytime from the top bar.",
    },

    footer: {
      brand: "Disha • Learning Level Visibility Platform",
      methodology: "Teaching at the Right Level (TaRL) Methodology • J-PAL & Pratham Inspired",
      tagline: "Designed for low-connectivity rural Indian primary schools (Class 1-5)",
    },

    growthMetaphor: {
      seedling: "Seedling (Letters)",
      sprout: "Sprout (Words)",
      smallPlant: "Small Plant (Sentences)",
      floweringPlant: "Flowering Plant (Story Fluent)",
      banyanTree: "Banyan Tree (Independent Reader)",
    },

    litLevels: {
      1: { name: "Beginner", desc: "Cannot recognize letters or oral sounds", icon: "🌱" },
      2: { name: "Letters", desc: "Recognizes individual letters and vowel sounds", icon: "🌿" },
      3: { name: "Words", desc: "Reads simple 2-3 syllable everyday words", icon: "🪴" },
      4: { name: "Sentences", desc: "Reads simple sentences with punctuation pauses", icon: "🌸" },
      5: { name: "Story Fluent", desc: "Reads standard story with deep comprehension", icon: "🌳" },
    },

    numLevels: {
      1: { name: "Number Recognition", desc: "Identifies single digit numbers 1-9", icon: "🌱" },
      2: { name: "Single-Digit Operations", desc: "Solves addition & subtraction up to 9", icon: "🌿" },
      3: { name: "Double-Digit Operations", desc: "Solves addition & subtraction with carry/borrow", icon: "🪴" },
      4: { name: "Word Problems & Mult/Div", desc: "Solves real-world math, multiplication & division", icon: "🌳" },
    },

    subjects: {
      math: "Mathematics",
      evs: "Environmental Studies (EVS)",
      science: "General Science",
      hindi: "Hindi Language",
      english: "English Literacy",
    },
  },

  hi: {
    appName: "दिशा",
    appSubtitle: "शिक्षण स्तर दृश्यता मंच",
    tagline: "भारतीय प्राथमिक विद्यालयों हेतु सही स्तर पर शिक्षण (टीएआरएल)",
    offlineReady: "ऑफ़लाइन सक्षम • डेटा सुरक्षित",
    encryptedNotice: "256-बिट सुरक्षित एन्क्रिप्शन",
    rankings: "साप्ताहिक समस्या समाधान चैंपियन",

    baseline: "आरंभिक",
    term1: "सत्र 1",
    term2: "सत्र 2",
    endline: "अंतिम",

    nav: {
      teacher: "शिक्षक",
      parent: "प्रगति पत्र",
      iq: "प्रश्नोत्तरी",
      ranks: "लीडरबोर्ड",
      classroom: "लाइव कक्षा",
      classTag: "कक्षा 1-5 टीएआरएल",
      selectLang: "भाषा चुनें",
      switchAccount: "खाता बदलें",
      logout: "सत्र रीसेट करें",
      authProvider: "पहचान प्रदाता",
      security: "सुरक्षा",
      schoolTag: "शासकीय प्राथमिक शाला",
    },

    teacher: {
      chartTab: "स्तर दृश्यता चार्ट",
      groupsTab: "टीएआरएल शिक्षण समूह",
      rosterTab: "कक्षा पंजी",
      reportTab: "1-पृष्ठ प्रधान पाठक सारांश",
      startAssess: "त्वरित आकलन करें",
      totalAssessed: "कुल मूल्यांकित छात्र",
      enrolledClass: "कक्षा 1 से 5 में नामांकित",
      storyLevel: "कहानी / धाराप्रवाह स्तर",
      storyDesc: (fluent, total) => String(fluent) + " / " + String(total) + " छात्र कहानी पढ़ते हैं",
      developingLevel: "प्रगतिशील (शब्द/गणित)",
      developingDesc: (dev) => String(dev) + " बच्चे तेजी से सीख रहे हैं",
      beginnerLevel: "आरंभिक (टीएआरएल आवश्यक)",
      beginnerDesc: (beg) => String(beg) + " बच्चों को बुनियादी सहायता चाहिए",
      chartTitle: "ट्रैफिक-लाइट शिक्षण स्तर वितरण",
      chartSubtitle: "लाल = आरंभिक • पीला = प्रगतिशील • हरा = कहानी व गणित में निपुण",
      legendBeginner: "आरंभिक",
      legendDeveloping: "प्रगतिशील",
      legendMastery: "निपुण",
      oralReadingLabel: "मौखिक पठन वास्तविक स्तर:",
      gradeReadersLabel: (pct) => String(pct) + "% कक्षा-अनुरूप पाठक",
      mathLabel: "बुनियादी संख्या ज्ञान वास्तविक स्तर:",
      mathOpsLabel: (pct) => String(pct) + "% दो-अंकीय व इबारती सवालों में निपुण",
      realityGapBadge: "टीएआरएल वास्तविकता निदान",
      realityGapTitle: "कक्षा बनाम वास्तविक सीखने का अंतर",
      realityGapDesc: "अधिकतर बच्चे कक्षा में उत्तीर्ण हो जाते हैं पर साधारण शब्द नहीं पढ़ पाते। कक्षा 3-5 के इन बच्चों को बुनियादी स्तर समूह की आवश्यकता है:",
      allFluentMsg: "शानदार! कक्षा 3-5 के सभी छात्र शब्द और वाक्य पढ़ सकते हैं।",
      enrolledClassText: (grade) => "नामांकित: कक्षा " + grade,
      actualLabel: "वास्तविक",
      viewGroupsBtn: "समूह देखें",
      assessBtn: "आकलन",
      tarlLiteracy: "टीएआरएल साक्षरता",
    },

    groups: {
      bannerBadge: "शिक्षण पद्धति",
      bannerTitle: "सही स्तर पर शिक्षण (टीएआरएल) समूह",
      bannerDesc: "बच्चों को उम्र या कक्षा के आधार पर नहीं, बल्कि उनके वास्तविक सीखने के स्तर पर समूहीकृत किया गया है।",
      recoTime: "दैनिक समय: 60-90 मिनट समर्पित स्तर सत्र",
      peerLearning: "सहपाठी शिक्षण: बच्चे एक-दूसरे से सीखते हैं",
      readingTab: "पठन स्तर समूह (ईजीआरए)",
      mathTab: "गणित स्तर समूह (ईजीएमए)",
      printBtn: "समूह योजना प्रिंट करें",
      childrenCount: (count) => String(count) + " बच्चे",
      assignedTitle: "नामित बच्चे",
      multiGradeTip: "बहु-कक्षा शिक्षण घेरा",
      noChildren: "इस स्तर पर कोई बच्चा नहीं है।",
      activitiesTitle: "प्रथम अनुशंसित गतिविधियां",
      materialsLabel: "आवश्यक सामग्री:",
      teacherTip: "शिक्षक की भूमिका:",
      reassessTooltip: "हर 30-45 दिन में पुनः आकलन करें",
    },

    roster: {
      searchPlaceholder: "नाम या रोल नंबर से खोजें...",
      allGrades: "सभी कक्षाएं",
      classPrefix: "कक्षा",
      addStudentBtn: "+ नया बच्चा जोड़ें",
      levelUp: "स्तर बढ़ा",
      readingLevel: "पठन स्तर",
      mathLevel: "गणित स्तर",
      parent: "अभिभावक",
      tapAssess: "आकलन करें",
      growthCard: "प्रगति पत्र",
      modalTitle: "कक्षा पंजी में बच्चा जोड़ें",
      childName: "बच्चे का पूरा नाम",
      childNamePlaceholder: "उदा. रमेश पटेल",
      enrolledGrade: "दाखिल कक्षा",
      rollNo: "रोल नंबर",
      rollNoPlaceholder: "उदा. 14",
      avatarLabel: "अवतार चिन्ह",
      parentName: "अभिभावक का नाम",
      parentPhone: "व्हाट्सएप फोन नंबर",
      cancel: "रद्द करें",
      submit: "पंजी में जोड़ें",
      filterAll: "सभी कक्षाएं",
      addChildBtn: "+ बच्चा जोड़ें",
      rollPrefix: "रोल #",
      parentLabel: "अभिभावक",
      tapAssessBtn: "आकलन करें",
      growthCardBtn: "प्रगति पत्र",
      childNameLabel: "बच्चे का पूरा नाम",
      gradeLabel: "दाखिल कक्षा / श्रेणी",
      rollLabel: "रोल नंबर",
      parentNameLabel: "अभिभावक का नाम",
      parentPhoneLabel: "व्हाट्सएप फोन नंबर",
      cancelBtn: "रद्द करें",
      saveBtn: "रजिस्टर में जोड़ें",
    },

    assessModal: {
      modalSubtitle: "पठन व गणित कौशल पर सीधे टैप करें (टाइपिंग की आवश्यकता नहीं)",
      termLabel: "मूल्यांकन चरण / अवधि",
      prevRecorded: "पिछला स्तर",
      readingTitle: "1. साक्षरता स्तर (मौखिक पठन)",
      mathTitle: "2. संख्या ज्ञान स्तर (गणित कौशल)",
      levelUpAlert: "स्तर में प्रगति! बधाई!",
      levelUpSub: (name) => name + " उच्च शिक्षण स्तर पर पहुंच गए हैं!",
      notesLabel: "शिक्षक टिप्पणी (वैकल्पिक)",
      notesPlaceholder: "उदा. मात्राओं में कठिनाई या हासिल वाले जोड़ में सुधार...",
      cancel: "रद्द करें",
      saveBtn: "आकलन सहेजें",
      tapSubtitle: "मौखिक पठन व गणित स्तर चुनें",
      phaseLabel: "मूल्यांकन चरण / अवधि",
      readingSection: "साक्षरता स्तर (मौखिक पठन)",
      mathSection: "संख्या ज्ञान (गणित कौशल)",
      levelUpAwesome: "स्तर बढ़ा! 🎉",
      levelUpDetail: (name) => name + " उच्च शिक्षण स्तर पर पहुंच गए हैं!",
      obsLabel: "शिक्षक टिप्पणी (वैकल्पिक)",
      obsPlaceholder: "उदा. मात्राओं में कठिनाई...",
      cancelBtn: "रद्द करें",
    },

    headmaster: {
      backBtn: "← डैशबोर्ड पर वापस",
      printBtn: "आधिकारिक शीट प्रिंट करें (A4)",
      districtOffice: "जिला प्राथमिक शिक्षा कार्यक्रम • ब्लॉक संसाधन केंद्र",
      reportTitle: "प्रधान पाठक कार्यकारी शिक्षण स्तर सारांश",
      schoolMeta: "शासकीय प्राथमिक शाला चांदपुर • यू-डायस: 21140201801 • टीएआरएल समूह",
      academicTerm: "सत्र 2024-25",
      generatedOn: "जारी दिनांक",
      totalAssessed: "कुल मूल्यांकित छात्र",
      storyReaders: "कहानी स्तर (धाराप्रवाह)",
      beginnerTier: "आरंभिक स्तर",
      leveledUpCount: "सीखने में प्रगति",
      readingTableTitle: "साक्षरता स्तर (मौखिक पठन) विवरण तालिका",
      colLevel: "स्तर",
      colSubskill: "मूल उप-कौशल",
      colChildren: "छात्र संख्या",
      colPct: "% अनुपात",
      colVisual: "दृश्य वितरण",
      mathTableTitle: "संख्या ज्ञान (अंकगणित) विवरण तालिका",
      teacherSign: "कक्षा शिक्षक हस्ताक्षर",
      headmasterSign: "प्रधान पाठक हस्ताक्षर",
      officerSign: "सीआरपी / संकुल समन्वयक सत्यापन",
    },

    report: {
      backBtn: "← डैशबोर्ड पर वापस",
      printBtn: "आधिकारिक शीट प्रिंट करें (A4)",
      deptTitle: "स्कूल शिक्षा विभाग • समग्र शिक्षा अभियान",
      reportTitle: "प्रधान पाठक कार्यकारी सारांश: शिक्षण स्तर दृश्यता रिपोर्ट",
      schoolInfo: "शासकीय प्राथमिक शाला चांदपुर • यू-डायस कोड: 21140201801 • ब्लॉक: रामपुर",
      academicYear: "शैक्षणिक सत्र: 2024-25 • टीएआरएल पहल",
      generatedOn: "जारी दिनांक",
      totalAssessed: "कुल मूल्यांकित बच्चे",
      storyReaders: "कहानी स्तर के पाठक",
      beginnerTier: "आरंभिक स्तर (अक्षर)",
      leveledUp: "इस सत्र में स्तर बढ़ा",
      rosterTableTitle: "छात्रवार मूल्यांकन एवं स्तर वितरण तालिका",
      thRoll: "रोल",
      thName: "छात्र का नाम",
      thGrade: "कक्षा",
      thReading: "पठन स्तर",
      thMath: "गणित स्तर",
      thStatus: "टीएआरएल कार्य स्थिति",
      teacherSign: "कक्षा शिक्षक हस्ताक्षर",
      headmasterSign: "प्रधान पाठक हस्ताक्षर",
      officialSeal: "विद्यालय की मुहर",
    },

    parentCard: {
      title: "विद्यार्थी शिक्षण प्रगति पत्र",
      canDoTitle: "आज आपका बच्चा गर्व से क्या कर सकता है",
      homeActivitiesTitle: "घर पर खेल-खेल में सीखने की गतिविधियां",
      shareWhatsApp: "व्हाट्सएप पर भेजें",
      printBadge: "प्रगति पत्र प्रिंट करें",
      selectChild: "बच्चा चुनें:",
      copiedNotice: "प्रगति पत्र क्लिपबोर्ड पर कॉपी हो गया!",
      currentStage: "वर्तमान विकास अवस्था:",
      growthPathTitle: "अभिभावकों हेतु पौधे के विकास का प्रतीक",
      growthPathSub: (name) => name + " की सीखने की यात्रा - छोटे बीज से वटवृक्ष तक",
      homeActivitiesSub: "10 मिनट के दैनिक खेल जिन्हें माता-पिता बिना पढ़े भी करा सकते हैं",
      noReadingNeeded: "माता-पिता के पढ़ने की जरूरत नहीं • चित्रों द्वारा मार्गदर्शित",
      assessedBy: "शासकीय प्राथमिक विद्यालय शिक्षक द्वारा सत्यापित",
      tarlGroup: "वर्तमान टीएआरएल शिक्षण समूह:",
      groupA: "समूह 1: बुनियादी अक्षर एवं ध्वनियां",
      groupB: "समूह 2: शब्द एवं सरल वाक्य",
      groupC: "समूह 3: कहानी धाराप्रवाह व गणितीय तर्क",
      plantStages: {
        seedling: "अंकुर (अक्षर)",
        sprout: "कोंपल (शब्द)",
        plant: "पौधा (वाक्य)",
        bloomed: "फूल (कहानी)",
        banyan: "बरगद (आत्मनिर्भर)",
      },
      canDo: {
        lit1: "अक्षर आकृतियां और ध्वनियां पहचानते हैं",
        lit2: "अक्षर पहचानते हैं और ध्वनियां मिलाते हैं",
        lit3: "रोजमर्रा के सरल शब्द धाराप्रवाह पढ़ते हैं",
        lit4: "छोटे वाक्य उचित ठहराव के साथ पढ़ते हैं",
        lit5: "पूरी कहानी धाराप्रवाह और समझ के साथ पढ़ते हैं",
        num1: "1 से 9 तक की संख्याएं पहचानते हैं",
        num2: "एक अंक का जोड़-घटाव कर लेते हैं",
        num3: "हासिल वाले दो अंकों का जोड़-घटाव करते हैं",
        num4: "इबारती सवाल, गुणा और भाग हल करते हैं",
        format: (name, lit, num) => name + " " + lit + " तथा " + num + "!",
      },
      canDoSentences: {
        lit: {
          1: "अक्षर और ध्वनियां पहचानना सीख रहे हैं",
          2: "अक्षर और उनकी ध्वनियां पढ़ सकते हैं",
          3: "2-3 अक्षरों वाले सरल शब्द पढ़ सकते हैं",
          4: "वाक्य और छोटे अनुच्छेद आत्मविश्वास से पढ़ते हैं",
          5: "पूरी कहानी धाराप्रवाह और समझ के साथ पढ़ते हैं",
        },
        num: {
          1: "1 से 9 तक की संख्याएं पहचानना सीख रहे हैं",
          2: "एक अंक का जोड़-घटाव कर सकते हैं",
          3: "हासिल वाले दो अंकों के जोड़-घटाव कर सकते हैं",
          4: "गुणा, भाग और व्यावहारिक इबारती सवाल हल करते हैं",
        },
      },
      plantSeedling: "अंकुर (अक्षर)",
      plantSprout: "कोंपल (शब्द)",
      plantPlant: "पौधा (वाक्य)",
      plantBloomed: "फूल (कहानी)",
      plantBanyan: "बरगद (आत्मनिर्भर)",
      whatsAppShare: "व्हाट्सएप पर भेजें",
      whatsAppCopied: "रिपोर्ट कॉपी हो गई!",
      levelPrefix: "स्तर",
      groupLabel: "टीएआरएल शिक्षण समूह",
    },

    subjectTest: {
      title: "छात्र प्रश्नोत्तरी व दैनिक समस्या समाधान",
      studentLabel: (name, grade) => "परीक्षार्थी: " + name + " (कक्षा " + grade + ")",
      questionCount: "20 प्रश्न • 400 अंक",
      assessmentComplete: "प्रश्नोत्तरी पूरी हुई! शानदार प्रयास! 🎉",
      subjectLabel: (sub) => sub + " मूल्यांकन परिणाम",
      correctProblemAnswers: "सही उत्तर",
      pointsEarned: (pts) => "+" + pts + " लीडरबोर्ड अंक",
      rankUpdated: "रैंक अपडेट हुआ!",
      retakeTest: "पुनः प्रयास करें",
      nextSubjectQuiz: "अगला विषय चुनें",
      questionProgress: (curr, total) => "प्रश्न " + curr + " / " + total,
      classCurriculum: (grade) => "कक्षा " + grade + " स्तर",
      correctAnswer: "सही जवाब! बहुत बढ़िया!",
      incorrectAnswer: "गलत उत्तर! नीचे स्पष्टीकरण देखें:",
      nextQuestion: "अगला प्रश्न",
      viewResults: "परिणाम देखें",
      whyLabel: "सही उत्तर का कारण",
    },

    quiz: {
      title: "छात्र विषय परीक्षा और दैनिक समस्या समाधान",
      studentLabel: "परीक्षार्थी:",
      questionsCount: "20 प्रश्न • कक्षा पाठ्यक्रम",
      completeTitle: "परीक्षा पूर्ण! बेहतरीन प्रयास! 🎉",
      subjectLabel: "विषय परीक्षा परिणाम",
      correctAnswers: "सही उत्तर",
      pointsEarned: (pts) => "+" + pts + " लीडरबोर्ड अंक",
      rankUpdated: "रैंक अपडेट हुआ!",
      retakeBtn: "पुनः परीक्षा दें",
      nextSubjectBtn: "अगला विषय आजमाएं",
      questionProgress: (curr, total) => "प्रश्न " + curr + " / " + total,
      curriculumLabel: (grade) => "कक्षा " + grade + " पाठ्यक्रम स्तर",
      explanationLabel: "यह उत्तर क्यों सही है:",
      correctNotice: "सही उत्तर! अद्भुत सोच!",
      incorrectNotice: "गलत उत्तर! नीचे दिया गया स्पष्टीकरण देखें:",
      nextBtn: "अगला प्रश्न",
      finishBtn: "परिणाम देखें",
    },

    leaderboard: {
      badge: "छात्र रैंकिंग",
      title: "साप्ताहिक चैंपियन",
      subtitle: "दैनिक विषय प्रश्नोत्तरी और तर्क पहेली से अर्जित अंक",
      formula: "1 सही उत्तर = 20 अंक",
      pointsUnit: "अंक",
      problemsSolvedCount: (count) => String(count) + " सवाल हल किए",
      topSolverTag: "शीर्ष समाधानकर्ता",
      searchPlaceholder: "छात्र का नाम या कक्षा खोजें...",
      allGrades: "सभी कक्षाएं",
      tableTitle: "सभी कक्षा चैंपियन और बैज",
      studentsListed: (count) => String(count) + " छात्र भाग ले रहे हैं",
      solvedUnit: "हल किए",
    },

    ranks: {
      badge: "छात्र रैंकिंग",
      title: "साप्ताहिक समस्या समाधान चैंपियन",
      subtitle: "दैनिक प्रश्नोत्तरी और तर्क पहेली से अर्जित अंक। किसी भी छात्र के प्रगति पत्र को देखने के लिए टैप करें।",
      pointsRule: "1 सही उत्तर = 20 अंक",
      rank1Badge: "प्रथम स्थान",
      rank2Badge: "द्वितीय स्थान",
      rank3Badge: "तृतीय स्थान",
      points: "अंक",
      problemsSolved: "हल किए गए सवाल",
      searchPlaceholder: "नाम या कक्षा से खोजें...",
      allGrades: "सभी कक्षाएं",
      thRank: "रैंक",
      thStudent: "विद्यार्थी",
      thGrade: "कक्षा",
      thScore: "कुल अंक",
      thBadges: "प्राप्त बैज",
      thAction: "क्रिया",
      viewCard: "कार्ड देखें",
    },

    classroom: {
      title: "ग्रामीण कम-बैंडविड्थ लाइव कक्षा",
      subtitle: "2जी/3जी कनेक्शन के लिए अनुकूलित",
      liveTitle: "ग्रामीण कम-बैंडविड्थ लाइव ऑडियो/वीडियो कक्षा",
      joinClass: "कक्षा से जुड़ें",
      startClass: "कक्षा शुरू करें",
      endClass: "सत्र समाप्त करें",
      askQuestion: "प्रश्न पूछें",
      raiseHand: "हाथ उठाएं",
      handRaisedAlert: "हाथ उठाया! शिक्षक को सूचित किया गया",
      assignments: "गृहकार्य एवं कक्षा कार्य",
      groupChat: "कक्षा चर्चा",
      muted: "माइक बंद",
      unmuted: "माइक चालू",
      videoOn: "कैमरा चालू",
      videoOff: "केवल ऑडियो",
      lowBandwidth: "2जी मोड",
      lowBandwidthOn: "2G ऑडियो-ओनली मोड चालू",
      lowBandwidthOff: "कम डेटा मोड (2जी/3जी)",
      liveSessionTag: "लाइव सत्र",
      handRaisedTag: "हाथ उठाया",
      audioOnlyNote: "डेटा बचाने के लिए केवल ऑडियो चालू",
      videoReadyNote: "कैमरा बंद है",
      listening: "सुन रहे हैं",
      handRaisedBtn: "हाथ उठाएं",
      oneTapLabel: "एक-टैप त्वरित छात्र प्रतिक्रिया:",
      quickChips: {
        present: "उपस्थित हूँ! ✋",
        understood: "समझ आ गया! 👍",
        repeat: "कृपया दोहराएं 🔁",
        answer: "मुझे उत्तर पता है 💡",
      },
      tabChat: (count) => "कक्षा चैट (" + count + ")",
      tabClasswork: (count) => "गृहकार्य (" + count + ")",
      encryptionNote: "एन्ड-टू-एन्ड एन्क्रिप्टेड • कोई विज्ञापन नहीं",
      homeworkTitle: "गृहकार्य और कक्षा गतिविधियां",
      newTaskBtn: "+ नया कार्य",
      taskPlaceholder: "उदा. पृष्ठ 4 की कहानी पढ़ें...",
      duePrefix: "अंतिम तिथि:",
      submittedCount: (completed, total) => String(completed) + "/" + String(total) + " जमा किए",
      e2eEncrypted: "256-बिट सुरक्षित एन्क्रिप्शन",
      teacherBadge: "लाइव शिक्षक",
      quickChatTitle: "एक-टैप छात्र प्रतिक्रिया:",
      chips: {
        present: "उपस्थित हूँ! ✋",
        understood: "समझ आ गया! 👍",
        question: "मेरा एक प्रश्न है ❓",
        repeat: "दोबारा समझाइए 🔁",
      },
      chatPlaceholder: "शिक्षक को प्रश्न या संदेश भेजें...",
      send: "भेजें",
      createAssignment: "नया कक्षा कार्य बनाएं",
      assignmentDue: (due) => "अंतिम तिथि: " + due,
      submitted: (completed, total) => String(completed) + "/" + String(total) + " जमा किए",
      newAssignmentTitle: "कार्य का शीर्षक एवं निर्देश",
      subject: "विषय",
      instructionsPlaceholder: "उदा. पृष्ठ 14 की कहानी पढ़ें और 3 प्रश्नों के उत्तर लिखें...",
      assignBtn: "कक्षा में भेजें",
      cancelBtn: "रद्द करें",
      tabVideo: "लाइव वीडियो / ऑडियो",
      tabAssignments: "कक्षा कार्य एवं गृहकार्य",
    },

    auth: {
      title: "दिशा स्कूल प्रवेश पोर्टल",
      subtitle: "भारतीय प्राथमिक विद्यालय शिक्षण दृश्यता नेटवर्क",
      roleTeacher: "कक्षा शिक्षक",
      roleHeadmaster: "प्रधान पाठक / संकुल अधिकारी",
      roleStudent: "छात्र / विद्यार्थी",
      roleParent: "अभिभावक",
      selectRole: "अपनी भूमिका चुनें",
      googleLogin: "गूगल वर्कस्पेस से लॉगिन करें",
      microsoftLogin: "माइक्रोसॉफ्ट 365 से लॉगिन करें",
      outlookLogin: "आउटलुक एडु से लॉगिन करें",
      ruralLoginTitle: "या एक-टैप ग्रामीण ऑफ़लाइन प्रवेश (बिना पासवर्ड)",
      schoolCode: "यू-डायस स्कूल कोड",
      pin: "4-अंकीय त्वरित पिन",
      signInBtn: "त्वरित स्कूल लॉगिन",
      demoNote: "डेमो क्रेडेंशियल पहले से भरे हैं। ऊपर पट्टी से कभी भी बदलें।",
    },

    footer: {
      brand: "दिशा • शिक्षण स्तर दृश्यता मंच",
      methodology: "टीएआरएल पद्धति • जे-पाल और प्रथम से प्रेरित",
      tagline: "कम कनेक्टिविटी वाले ग्रामीण भारतीय प्राथमिक स्कूलों (कक्षा 1-5) के लिए निर्मित",
    },

    growthMetaphor: {
      seedling: "अंकुर (अक्षर)",
      sprout: "कोंपल (शब्द)",
      smallPlant: "छोटा पौधा (वाक्य)",
      floweringPlant: "फूलदार पौधा (कहानी धाराप्रवाह)",
      banyanTree: "बरगद का पेड़ (आत्मनिर्भर पाठक)",
    },

    litLevels: {
      1: { name: "आरंभिक", desc: "अक्षर या मौखिक ध्वनियां नहीं पहचान पाते", icon: "🌱" },
      2: { name: "अक्षर", desc: "वर्ण और मात्राओं की ध्वनि पहचानते हैं", icon: "🌿" },
      3: { name: "शब्द", desc: "2-3 वर्णों वाले सरल शब्द पढ़ते हैं", icon: "🪴" },
      4: { name: "वाक्य", desc: "विराम चिन्हों के साथ सरल वाक्य पढ़ते हैं", icon: "🌸" },
      5: { name: "कहानी", desc: "पूरी कहानी धाराप्रवाह और समझ के साथ पढ़ते हैं", icon: "🌳" },
    },

    numLevels: {
      1: { name: "संख्या पहचान", desc: "1 से 9 तक की संख्या पहचानते हैं", icon: "🌱" },
      2: { name: "एक अंकीय संक्रिया", desc: "9 तक का जोड़-घटाव कर लेते हैं", icon: "🌿" },
      3: { name: "दो अंकीय संक्रिया", desc: "हासिल वाले जोड़-घटाव कर लेते हैं", icon: "🪴" },
      4: { name: "इबारती सवाल व गुणा/भाग", desc: "गुणा, भाग और व्यावहारिक सवाल हल करते हैं", icon: "🌳" },
    },

    subjects: {
      math: "गणित",
      evs: "पर्यावरण अध्ययन (ईवीएस)",
      science: "सामान्य विज्ञान",
      hindi: "हिंदी भाषा",
      english: "अंग्रेजी साक्षरता",
    },
  },

  or: {
    appName: "ଦିଶା",
    appSubtitle: "ଶିକ୍ଷଣ ସ୍ତର ଦୃଶ୍ୟମାନତା ମଞ୍ଚ",
    tagline: "ସଠିକ୍ ସ୍ତରରେ ଶିକ୍ଷାଦାନ (TaRL) - ପ୍ରାଥମିକ ବିଦ୍ୟାଳୟ",
    offlineReady: "ଅଫଲାଇନ୍ ସକ୍ଷମ • ଡାଟା ସୁରକ୍ଷିତ",
    encryptedNotice: "୨୫୬-ବିଟ୍ ସୁରକ୍ଷିତ ଏନକ୍ରିପସନ୍",
    rankings: "ସାପ୍ତାହିକ ସମସ୍ୟା ସମାଧାନ ବିଜେତା",

    baseline: "ପ୍ରାରମ୍ଭିକ",
    term1: "ପର୍ଯ୍ୟାୟ ୧",
    term2: "ପର୍ଯ୍ୟାୟ ୨",
    endline: "ଅନ୍ତିମ",

    nav: {
      teacher: "ଶିକ୍ଷକ",
      parent: "ପ୍ରଗତି ପତ୍ର",
      iq: "କୁଇଜ୍",
      ranks: "ଲିଡରବୋର୍ଡ",
      classroom: "ଲାଇଭ୍ କ୍ଲାସ୍",
      classTag: "ଶ୍ରେଣୀ ୧-୫ TaRL",
      selectLang: "ଭାଷା ବାଛନ୍ତୁ",
      switchAccount: "ଖାତା ବଦଳାନ୍ତୁ",
      logout: "ସେସନ୍ ରିସେଟ୍",
      authProvider: "ପରିଚୟ ପ୍ରଦାତା",
      security: "ସୁରକ୍ଷା",
      schoolTag: "ସରକାରୀ ପ୍ରାଥମିକ ବିଦ୍ୟାଳୟ",
    },

    teacher: {
      chartTab: "ସ୍ତର ଦୃଶ୍ୟମାନତା ଚାର୍ଟ",
      groupsTab: "TaRL ଶିକ୍ଷଣ ଗ୍ରୁପ୍",
      rosterTab: "ଶ୍ରେଣୀ ତାଲିକା",
      reportTab: "ପ୍ରଧାନ ଶିକ୍ଷକ ସାରାଂଶ",
      startAssess: "ମୂଲ୍ୟାୟନ ଆରମ୍ଭ କରନ୍ତୁ",
      totalAssessed: "ସମୁଦାୟ ମୂଲ୍ୟାୟିତ ପିଲା",
      enrolledClass: "ଶ୍ରେଣୀ ୧ ରୁ ୫ ରେ ନାମଲେଖା",
      storyLevel: "ଗଳ୍ପ ସ୍ତର (ନିରବଚ୍ଛିନ୍ନ)",
      storyDesc: (fluent, total) => String(fluent) + " / " + String(total) + " ପିଲା ଗଳ୍ପ ପଢ଼ିପାରୁଛନ୍ତି",
      developingLevel: "ଅଗ୍ରଗାମୀ (ଶବ୍ଦ/ଗଣିତ)",
      developingDesc: (dev) => String(dev) + " ପିଲା ଦ୍ରୁତ ଗତିରେ ଶିଖୁଛନ୍ତି",
      beginnerLevel: "ପ୍ରାରମ୍ଭିକ (TaRL ଆବଶ୍ୟକ)",
      beginnerDesc: (beg) => String(beg) + " ପିଲାଙ୍କୁ ବୁନିଆଦି ସାହାଯ୍ୟ ଦରକାର",
      chartTitle: "ଟ୍ରାଫିକ୍-ଲାଇଟ୍ ଶିକ୍ଷଣ ସ୍ତର ବଣ୍ଟନ",
      chartSubtitle: "ନାଲି = ପ୍ରାରମ୍ଭିକ • ହଳଦିଆ = ଅଗ୍ରଗାମୀ • ସବୁଜ = ଗଳ୍ପ ଓ ଗଣିତରେ ନିପୁଣ",
      legendBeginner: "ପ୍ରାରମ୍ଭିକ",
      legendDeveloping: "ଅଗ୍ରଗାମୀ",
      legendMastery: "ନିପୁଣ",
      oralReadingLabel: "ମୌଖିକ ପଠନ ପ୍ରକୃତ ସ୍ତର:",
      gradeReadersLabel: (pct) => String(pct) + "% ଶ୍ରେଣୀ-ଉପଯୋଗୀ ପାଠକ",
      mathLabel: "ମୌଳିକ ସଂଖ୍ୟା ଜ୍ଞାନ ପ୍ରକୃତ ସ୍ତର:",
      mathOpsLabel: (pct) => String(pct) + "% ଦୁଇ ଅଙ୍କ ଓ ବ୍ୟବହାରିକ ଗଣିତରେ ନିପୁଣ",
      realityGapBadge: "TaRL ବାସ୍ତବତା ପରୀକ୍ଷା",
      realityGapTitle: "ଶ୍ରେଣୀ ବନାମ ପ୍ରକୃତ ଶିକ୍ଷଣ ସ୍ତରର ବ୍ୟବଧାନ",
      realityGapDesc: "ଅଧିକାଂଶ ପିଲା ସହଜରେ ଶ୍ରେଣୀ ଉତ୍ତୀର୍ଣ୍ଣ ହୋଇଯାଆନ୍ତି କିନ୍ତୁ ସରଳ ଶବ୍ଦ ପଢ଼ିପାରନ୍ତି ନାହିଁ। ଶ୍ରେଣୀ ୩-୫ ର ଏହି ପିଲାମାନଙ୍କୁ ତୁରନ୍ତ ବୁନିଆଦି ଗ୍ରୁପ୍ ଦରକାର:",
      allFluentMsg: "ଅତି ଉତ୍ତମ! ଶ୍ରେଣୀ ୩-୫ ର ସମସ୍ତ ପିଲା ଶବ୍ଦ ଓ ବାକ୍ୟ ପଢ଼ିପାରୁଛନ୍ତି।",
      enrolledClassText: (grade) => "ନାମଲେଖା: ଶ୍ରେଣୀ " + grade,
      actualLabel: "ପ୍ରକୃତ",
      viewGroupsBtn: "ଗ୍ରୁପ୍ ଦେଖନ୍ତୁ",
      assessBtn: "ମୂଲ୍ୟାୟନ",
      tarlLiteracy: "TaRL ସାକ୍ଷରତା",
    },

    groups: {
      bannerBadge: "ଶିକ୍ଷାଦାନ ପଦ୍ଧତି",
      bannerTitle: "ସଠିକ୍ ସ୍ତରରେ ଶିକ୍ଷାଦାନ (TaRL) ଗ୍ରୁପ୍",
      bannerDesc: "ପିଲାମାନଙ୍କୁ ବୟସ ବା ଶ୍ରେଣୀ ଅନୁସାରେ ନୁହେଁ, ବରଂ ସେମାନଙ୍କର ପ୍ରକୃତ ଶିକ୍ଷଣ ସ୍ତର ଅନୁଯାୟୀ ଭାଗ କରାଯାଇଛି।",
      recoTime: "ଦୈନିକ ସମୟ: ୬୦-୯୦ ମିନିଟ୍ ସ୍ୱତନ୍ତ୍ର ସ୍ତର ଅଭ୍ୟାସ",
      peerLearning: "ସାଥୀ ଶିକ୍ଷଣ: ପିଲାମାନେ ପରସ୍ପରଠାରୁ ଶିଖନ୍ତି",
      readingTab: "ପଠନ ସ୍ତର ଗ୍ରୁପ୍ (EGRA)",
      mathTab: "ଗଣିତ ସ୍ତର ଗ୍ରୁପ୍ (EGMA)",
      printBtn: "ଗ୍ରୁପ୍ ଯୋଜନା ପ୍ରିଣ୍ଟ୍ କରନ୍ତୁ",
      childrenCount: (count) => String(count) + " ପିଲା",
      assignedTitle: "ନାମିତ ପିଲା",
      multiGradeTip: "ବହୁ-ଶ୍ରେଣୀ ଶିକ୍ଷା ବୃତ୍ତ",
      noChildren: "ଏହି ସ୍ତରରେ କୌଣସି ପିଲା ନାହାନ୍ତି।",
      activitiesTitle: "ପ୍ରଥମ ସଂସ୍ଥା ଅନୁମୋଦିତ କାର୍ଯ୍ୟକଳାପ",
      materialsLabel: "ଆବଶ୍ୟକ ସାମଗ୍ରୀ:",
      teacherTip: "ଶିକ୍ଷକଙ୍କ ଭୂମିକା:",
      reassessTooltip: "ପ୍ରତି ୩୦-୪୫ ଦିନରେ ପୁନଃ ମୂଲ୍ୟାୟନ କରନ୍ତୁ",
    },

    roster: {
      searchPlaceholder: "ନାମ ବା ରୋଲ୍ ନମ୍ବର ଦ୍ୱାରା ଖୋଜନ୍ତୁ...",
      allGrades: "ସମସ୍ତ ଶ୍ରେଣୀ",
      classPrefix: "ଶ୍ରେଣୀ",
      addStudentBtn: "+ ନୂଆ ପିଲା ଯୋଡ଼ନ୍ତୁ",
      levelUp: "ସ୍ତର ବୃଦ୍ଧି",
      readingLevel: "ପଠନ ସ୍ତର",
      mathLevel: "ଗଣିତ ସ୍ତର",
      parent: "ଅଭିଭାବକ",
      tapAssess: "ମୂଲ୍ୟାୟନ",
      growthCard: "ପ୍ରଗତି ପତ୍ର",
      modalTitle: "ଶ୍ରେଣୀ ତାଲିକାରେ ପିଲା ଯୋଡ଼ନ୍ତୁ",
      childName: "ପିଲାର ପୂରା ନାମ",
      childNamePlaceholder: "ଉଦା. ରମେଶ ପଟେଲ",
      enrolledGrade: "ଦାଖଲ ଶ୍ରେଣୀ",
      rollNo: "ରୋଲ୍ ନମ୍ବର",
      rollNoPlaceholder: "ଉଦା. ୧୪",
      avatarLabel: "ଅବତାର ଚିହ୍ନ",
      parentName: "ଅଭିଭାବକଙ୍କ ନାମ",
      parentPhone: "ହ୍ୱାଟ୍ସଆପ୍ ନମ୍ବର",
      cancel: "ବାତିଲ କରନ୍ତୁ",
      submit: "ତାଲିକାରେ ଯୋଡ଼ନ୍ତୁ",
      filterAll: "ସମସ୍ତ ଶ୍ରେଣୀ",
      addChildBtn: "+ ନୂଆ ପିଲା ଯୋଡ଼ନ୍ତୁ",
      rollPrefix: "ରୋଲ୍ #",
      parentLabel: "ଅଭିଭାବକ",
      tapAssessBtn: "ମୂଲ୍ୟାୟନ କରନ୍ତୁ",
      growthCardBtn: "ପ୍ରଗତି ପତ୍ର",
      childNameLabel: "ପିଲାର ପୂରା ନାମ",
      gradeLabel: "ଦାଖଲ ଶ୍ରେଣୀ",
      rollLabel: "ରୋଲ୍ ନମ୍ବର",
      parentNameLabel: "ଅଭିଭାବକଙ୍କ ନାମ",
      parentPhoneLabel: "ହ୍ୱାଟ୍ସଆପ୍ ଫୋନ୍ ନମ୍ବର",
      cancelBtn: "ବାତିଲ କରନ୍ତୁ",
      saveBtn: "ତାଲିକାରେ ଯୋଡ଼ନ୍ତୁ",
    },

    assessModal: {
      modalSubtitle: "ପଠନ ଓ ଗଣିତ ସ୍ତର ଉପରେ ସିଧାସଳଖ ଟ୍ୟାପ୍ କରନ୍ତୁ",
      termLabel: "ମୂଲ୍ୟାୟନ ପର୍ଯ୍ୟାୟ",
      prevRecorded: "ପୂର୍ବ ସ୍ତର",
      readingTitle: "୧. ସାକ୍ଷରତା ସ୍ତର (ମୌଖିକ ପଠନ)",
      mathTitle: "୨. ସଂଖ୍ୟା ଜ୍ଞାନ ସ୍ତର (ଗଣିତ ଦକ୍ଷତା)",
      levelUpAlert: "ସ୍ତର ବୃଦ୍ଧି ପାଇଁ ଅଭିନନ୍ଦନ!",
      levelUpSub: (name) => name + " ଉଚ୍ଚତର ଶିକ୍ଷଣ ସ୍ତରକୁ ଉନ୍ନୀତ ହୋଇଛନ୍ତି!",
      notesLabel: "ଶିକ୍ଷକଙ୍କ ଟିପ୍ପଣୀ (ଇଚ୍ଛାଧୀନ)",
      notesPlaceholder: "ଉଦା. ମାତ୍ରା ବୁଝିବାରେ କଷ୍ଟ ବା ହସ୍ତଗତ ଯୋଗରେ ସୁଧାର...",
      cancel: "ବାତିଲ କରନ୍ତୁ",
      saveBtn: "ମୂଲ୍ୟାୟନ ସଂରକ୍ଷଣ କରନ୍ତୁ",
      tapSubtitle: "ମୌଖିକ ପଠନ ଓ ଗଣିତ ସ୍ତର ଚୟନ କରନ୍ତୁ",
      phaseLabel: "ମୂଲ୍ୟାୟନ ପର୍ଯ୍ୟାୟ",
      readingSection: "ସାକ୍ଷରତା ସ୍ତର (ମୌଖିକ ପଠନ)",
      mathSection: "ସଂଖ୍ୟା ଜ୍ଞାନ (ଗଣିତ ଦକ୍ଷତା)",
      levelUpAwesome: "ସ୍ତର ବୃଦ୍ଧି! 🎉",
      levelUpDetail: (name) => name + " ଉଚ୍ଚତର ଶିକ୍ଷଣ ସ୍ତରକୁ ଉନ୍ନୀତ ହୋଇଛନ୍ତି!",
      obsLabel: "ଶିକ୍ଷକଙ୍କ ଟିପ୍ପଣୀ (ଇଚ୍ଛାଧୀନ)",
      obsPlaceholder: "ଉଦା. ମାତ୍ରା ବୁଝିବାରେ ଅସୁବିଧା...",
      cancelBtn: "ବାତିଲ କରନ୍ତୁ",
    },

    headmaster: {
      backBtn: "← ଡ୍ୟାସବୋର୍ଡକୁ ଫେରନ୍ତୁ",
      printBtn: "ସରକାରୀ ଶୀଟ୍ ପ୍ରିଣ୍ଟ୍ କରନ୍ତୁ (A4)",
      districtOffice: "ଜିଲ୍ଲା ପ୍ରାଥମିକ ଶିକ୍ଷା କାର୍ଯ୍ୟକ୍ରମ • ବ୍ଲକ୍ ସମ୍ବଳ କେନ୍ଦ୍ର",
      reportTitle: "ପ୍ରଧାନ ଶିକ୍ଷକ କାର୍ଯ୍ୟନିର୍ବାହୀ ଶିକ୍ଷଣ ସ୍ତର ସାରାଂଶ",
      schoolMeta: "ସରକାରୀ ପ୍ରାଥମିକ ବିଦ୍ୟାଳୟ ଚାନ୍ଦପୁର • U-DISE: 21140201801",
      academicTerm: "ଶିକ୍ଷା ବର୍ଷ ୨୦୨୪-୨୫",
      generatedOn: "ପ୍ରସ୍ତୁତି ତାରିଖ",
      totalAssessed: "ସମୁଦାୟ ମୂଲ୍ୟାୟିତ",
      storyReaders: "ଗଳ୍ପ ସ୍ତର (ନିରବଚ୍ଛିନ୍ନ)",
      beginnerTier: "ପ୍ରାରମ୍ଭିକ ସ୍ତର",
      leveledUpCount: "ଶିକ୍ଷଣ ଅଗ୍ରଗତି",
      readingTableTitle: "ସାକ୍ଷରତା ସ୍ତର (ମୌଖିକ ପଠନ) ବିବରଣୀ",
      colLevel: "ସ୍ତର",
      colSubskill: "ମୂଳ ଦକ୍ଷତା",
      colChildren: "ପିଲା ସଂଖ୍ୟା",
      colPct: "% ଅନୁପାତ",
      colVisual: "ଚିତ୍ର ପ୍ରଦର୍ଶନ",
      mathTableTitle: "ଗାଣିତିକ ସ୍ତର (ଅଙ୍କଗଣିତ) ବିବରଣୀ",
      teacherSign: "ଶ୍ରେଣୀ ଶିକ୍ଷକଙ୍କ ଦସ୍ତଖତ",
      headmasterSign: "ପ୍ରଧାନ ଶିକ୍ଷକଙ୍କ ଦସ୍ତଖତ",
      officerSign: "ସିଆରପି ଯାଞ୍ଚ ଦସ୍ତଖତ",
    },

    report: {
      backBtn: "← ଡ୍ୟାସବୋର୍ଡକୁ ଫେରନ୍ତୁ",
      printBtn: "ସରକାରୀ ଶୀଟ୍ ପ୍ରିଣ୍ଟ୍ କରନ୍ତୁ (A4)",
      deptTitle: "ବିଦ୍ୟାଳୟ ଓ ଗଣଶିକ୍ଷା ବିଭାଗ • ସମଗ୍ର ଶିକ୍ଷା ଅଭିଯାନ",
      reportTitle: "ପ୍ରଧାନ ଶିକ୍ଷକ କାର୍ଯ୍ୟନିର୍ବାହୀ ସାରାଂଶ: ଶିକ୍ଷଣ ସ୍ତର ଦୃଶ୍ୟମାନତା ରିପୋର୍ଟ",
      schoolInfo: "ସରକାରୀ ପ୍ରାଥମିକ ବିଦ୍ୟାଳୟ ଚାନ୍ଦପୁର • U-DISE କୋଡ୍: 21140201801 • ବ୍ଲକ୍: ରାମପୁର",
      academicYear: "ଶିକ୍ଷା ବର୍ଷ: ୨୦୨୪-୨୫ • TaRL ଅଭିଯାନ",
      generatedOn: "ପ୍ରସ୍ତୁତି ତାରିଖ",
      totalAssessed: "ସମୁଦାୟ ମୂଲ୍ୟାୟିତ ପିଲା",
      storyReaders: "ଗଳ୍ପ ସ୍ତରର ପାଠକ",
      beginnerTier: "ପ୍ରାରମ୍ଭିକ ସ୍ତର (ଅକ୍ଷର)",
      leveledUp: "ଏହି ପର୍ଯ୍ୟାୟରେ ଉନ୍ନତି କରିଥିବା ପିଲା",
      rosterTableTitle: "ଛାତ୍ରବାର ମୂଲ୍ୟାୟନ ଓ ସ୍ତର ବଣ୍ଟନ ତାଲିକା",
      thRoll: "ରୋଲ୍",
      thName: "ପିଲାର ନାମ",
      thGrade: "ଶ୍ରେଣୀ",
      thReading: "ପଠନ ସ୍ତର",
      thMath: "ଗଣିତ ସ୍ତର",
      thStatus: "TaRL କାର୍ଯ୍ୟ ସ୍ଥିତି",
      teacherSign: "ଶ୍ରେଣୀ ଶିକ୍ଷକଙ୍କ ଦସ୍ତଖତ",
      headmasterSign: "ପ୍ରଧାନ ଶିକ୍ଷକଙ୍କ ଦସ୍ତଖତ",
      officialSeal: "ବିଦ୍ୟାଳୟର ସରକାରୀ ମୋହର",
    },

    parentCard: {
      title: "ଛାତ୍ର ଶିକ୍ଷଣ ପ୍ରଗତି ପତ୍ର",
      canDoTitle: "ଆଜି ଆପଣଙ୍କ ପିଲା ଗର୍ବର ସହ କଣ କରିପାରୁଛି",
      homeActivitiesTitle: "ଘରେ ଖେଳ ମାଧ୍ୟମରେ ଶିଖିବା ପାଇଁ କାର୍ଯ୍ୟକଳାପ",
      shareWhatsApp: "ହ୍ୱାଟ୍ସଆପ୍ ରେ ପଠାନ୍ତୁ",
      printBadge: "ପ୍ରଗତି ପତ୍ର ପ୍ରିଣ୍ଟ୍ କରନ୍ତୁ",
      selectChild: "ପିଲା ବାଛନ୍ତୁ:",
      copiedNotice: "ପ୍ରଗତି ପତ୍ର କ୍ଲିପବୋର୍ଡରେ କପି ହୋଇଛି!",
      currentStage: "ବର୍ତ୍ତମାନର ବିକାଶ ସ୍ଥିତି:",
      growthPathTitle: "ଅଭିଭାବକଙ୍କ ପାଇଁ ଗଛର ବିକାଶ ପ୍ରତୀକ",
      growthPathSub: (name) => name + " ର ଶିକ୍ଷଣ ଯାତ୍ରା - ଛୋଟ ମଞ୍ଜିରୁ ବିରାଟ ବରଗଛ ପର୍ଯ୍ୟନ୍ତ",
      homeActivitiesSub: "ପିତାମାତା ବିନା ପଢ଼ାଲେଖାରେ ମଧ୍ୟ ୧୦ ମିନିଟର ଖେଳ କରାଇପାରିବେ",
      noReadingNeeded: "ଅଭିଭାବକଙ୍କ ପଢ଼ିବା ଆବଶ୍ୟକ ନାହିଁ • ଚିତ୍ର ଦ୍ୱାରା ନିର୍ଦ୍ଦେଶିତ",
      assessedBy: "ସରକାରୀ ପ୍ରାଥମିକ ଶିକ୍ଷକଙ୍କ ଦ୍ୱାରା ମୂଲ୍ୟାୟିତ",
      tarlGroup: "ବର୍ତ୍ତମାନର TaRL ଶିକ୍ଷଣ ଗ୍ରୁପ୍:",
      groupA: "ଗ୍ରୁପ୍ ୧: ବୁନିଆଦି ଅକ୍ଷର ଓ ଧ୍ୱନି",
      groupB: "ଗ୍ରୁପ୍ ୨: ଶବ୍ଦ ଓ ସରଳ ବାକ୍ୟ",
      groupC: "ଗ୍ରୁପ୍ ୩: ଗଳ୍ପ ପଠନ ଓ ଗାଣିତିକ ଯୁକ୍ତି",
      plantStages: {
        seedling: "ମଞ୍ଜି (ଅକ୍ଷର)",
        sprout: "ଅଙ୍କୁର (ଶବ୍ଦ)",
        plant: "ଛୋଟ ଗଛ (ବାକ୍ୟ)",
        bloomed: "ଫୁଲ (ଗଳ୍ପ)",
        banyan: "ବରଗଛ (ସ୍ୱାଧୀନ)",
      },
      canDo: {
        lit1: "ଅକ୍ଷର ଆକୃତି ଓ ଧ୍ୱନି ଚିହ୍ନିପାରୁଛନ୍ତି",
        lit2: "ଅକ୍ଷର ଚିହ୍ନି ଧ୍ୱନି ମିଶାଇପାରୁଛନ୍ତି",
        lit3: "ଦୈନନ୍ଦିନ ବ୍ୟବହୃତ ସରଳ ଶବ୍ଦ ପଢ଼ିପାରୁଛନ୍ତି",
        lit4: "ଉଚିତ୍ ବିରାମ ସହ ଛୋଟ ବାକ୍ୟ ପଢ଼ୁଛନ୍ତି",
        lit5: "ସମ୍ପୂର୍ଣ୍ଣ ଗଳ୍ପ ନିରବଚ୍ଛିନ୍ନ ଓ ବୁଝାମଣା ସହ ପଢ଼ୁଛନ୍ତି",
        num1: "୧ ରୁ ୯ ପର୍ଯ୍ୟନ୍ତ ସଂଖ୍ୟା ଚିହ୍ନିପାରୁଛନ୍ତି",
        num2: "ଗୋଟିଏ ଅଙ୍କର ଯୋଗ-ବିୟୋଗ କରିପାରୁଛନ୍ତି",
        num3: "ହସ୍ତଗତ ଯୁକ୍ତ ଦୁଇ ଅଙ୍କର ଯୋଗ-ବିୟୋଗ କରୁଛନ୍ତି",
        num4: "ବ୍ୟବହାରିକ ଗଣିତ, ଗୁଣନ ଓ ହରଣ ସମାଧାନ କରୁଛନ୍ତି",
        format: (name, lit, num) => name + " " + lit + " ଏବଂ " + num + "!",
      },
      canDoSentences: {
        lit: {
          1: "ଅକ୍ଷର ଏବଂ ଧ୍ୱନି ଚିହ୍ନିବା ଶିଖୁଛନ୍ତି",
          2: "ଅକ୍ଷର ଓ ସେଗୁଡ଼ିକର ଧ୍ୱନି ପଢ଼ିପାରୁଛନ୍ତି",
          3: "୨-୩ ଅକ୍ଷର ବିଶିଷ୍ଟ ସରଳ ଶବ୍ଦ ପଢ଼ିପାରୁଛନ୍ତି",
          4: "ବାକ୍ୟ ଏବଂ ଛୋଟ ଅନୁଚ୍ଛେଦ ଆତ୍ମବିଶ୍ୱାସର ସହିତ ପଢ଼ିପାରୁଛନ୍ତି",
          5: "ସମ୍ପୂର୍ଣ୍ଣ ଗଳ୍ପ ନିରବଚ୍ଛିନ୍ନ ଓ ବୁଝାମଣା ସହ ପଢ଼ିପାରୁଛନ୍ତି",
        },
        num: {
          1: "୧ ରୁ ୯ ପର୍ଯ୍ୟନ୍ତ ସଂଖ୍ୟା ଚିହ୍ନିବା ଶିଖୁଛନ୍ତି",
          2: "ଗୋଟିଏ ଅଙ୍କର ଯୋଗ ଓ ବିୟୋଗ କରିପାରୁଛନ୍ତି",
          3: "ହସ୍ତଗତ ଯୁକ୍ତ ଦୁଇ ଅଙ୍କର ଯୋଗ-ବିୟୋଗ କରିପାରୁଛନ୍ତି",
          4: "ଗୁଣନ, ହରଣ ଏବଂ ବ୍ୟବହାରିକ ଗାଣିତିକ ସମସ୍ୟା ସମାଧାନ କରୁଛନ୍ତି",
        },
      },
      plantSeedling: "ମଞ୍ଜି (ଅକ୍ଷର)",
      plantSprout: "ଅଙ୍କୁର (ଶବ୍ଦ)",
      plantPlant: "ଛୋଟ ଗଛ (ବାକ୍ୟ)",
      plantBloomed: "ଫୁଲ (ଗଳ୍ପ)",
      plantBanyan: "ବରଗଛ (ସ୍ୱାଧୀନ)",
      whatsAppShare: "ହ୍ୱାଟ୍ସଆପ୍ ରେ ପଠାନ୍ତୁ",
      whatsAppCopied: "ରିପୋର୍ଟ କପି ହୋଇଛି!",
      levelPrefix: "ସ୍ତର",
      groupLabel: "TaRL ଶିକ୍ଷଣ ଗ୍ରୁପ୍",
    },

    subjectTest: {
      title: "ଛାତ୍ର କୁଇଜ୍ ଓ ଦୈନିକ ସମସ୍ୟା ସମାଧାନ",
      studentLabel: (name, grade) => "ପରୀକ୍ଷାର୍ଥୀ: " + name + " (ଶ୍ରେଣୀ " + grade + ")",
      questionCount: "୨୦ ପ୍ରଶ୍ନ • ୪୦୦ ପଏଣ୍ଟ",
      assessmentComplete: "କୁଇଜ୍ ସମ୍ପୂର୍ଣ୍ଣ! ଉତ୍କୃଷ୍ଟ ପ୍ରୟାସ! 🎉",
      subjectLabel: (sub) => sub + " ମୂଲ୍ୟାୟନ ଫଳାଫଳ",
      correctProblemAnswers: "ସଠିକ୍ ଉତ୍ତର",
      pointsEarned: (pts) => "+" + pts + " ଲିଡରବୋର୍ଡ ପଏଣ୍ଟ",
      rankUpdated: "ର଼୍ୟାଙ୍କ ଅଦ୍ୟତନ ହେଲା!",
      retakeTest: "ପୁନର୍ବାର ପରୀକ୍ଷା ଦିଅନ୍ତୁ",
      nextSubjectQuiz: "ପରବର୍ତ୍ତୀ ବିଷୟ ଚୟନ କରନ୍ତୁ",
      questionProgress: (curr, total) => "ପ୍ରଶ୍ନ " + curr + " / " + total,
      classCurriculum: (grade) => "ଶ୍ରେଣୀ " + grade + " ସ୍ତର",
      correctAnswer: "ସଠିକ୍! ଚମତ୍କାର ଚିନ୍ତାଧାରା!",
      incorrectAnswer: "ଭୁଲ ଉତ୍ତର! ତଳେ ବୁଝାମଣା ଦେଖନ୍ତୁ:",
      nextQuestion: "ପରବର୍ତ୍ତୀ ପ୍ରଶ୍ନ",
      viewResults: "ଫଳାଫଳ ଦେଖନ୍ତୁ",
      whyLabel: "ସଠିକ୍ ଉତ୍ତରର କାରଣ",
    },

    quiz: {
      title: "ଛାତ୍ର ବିଷୟ ପରୀକ୍ଷା ଓ ଦୈନିକ ସମସ୍ୟା ସମାଧାନ",
      studentLabel: "ପରୀକ୍ଷାର୍ଥୀ:",
      questionsCount: "୨୦ ପ୍ରଶ୍ନ • ଶ୍ରେଣୀ ପାଠ୍ୟକ୍ରମ",
      completeTitle: "ପରୀକ୍ଷା ସମ୍ପୂର୍ଣ୍ଣ! ଚମତ୍କାର ପ୍ରୟାସ! 🎉",
      subjectLabel: "ବିଷୟ ପରୀକ୍ଷା ଫଳାଫଳ",
      correctAnswers: "ସଠିକ୍ ଉତ୍ତର",
      pointsEarned: (pts) => "+" + pts + " ଲିଡରବୋର୍ଡ ପଏଣ୍ଟ",
      rankUpdated: "ର଼୍ୟାଙ୍କ ଅଦ୍ୟତନ ହେଲା!",
      retakeBtn: "ପୁନର୍ବାର ପରୀକ୍ଷା ଦିଅନ୍ତୁ",
      nextSubjectBtn: "ପରବର୍ତ୍ତୀ ବିଷୟ ଚୟନ କରନ୍ତୁ",
      questionProgress: (curr, total) => "ପ୍ରଶ୍ନ " + curr + " / " + total,
      curriculumLabel: (grade) => "ଶ୍ରେଣୀ " + grade + " ପାଠ୍ୟକ୍ରମ ସ୍ତର",
      explanationLabel: "କାହିଁକି ଏହି ଉତ୍ତର ସଠିକ୍:",
      correctNotice: "ସଠିକ୍ ଉତ୍ତର! ଉତ୍ତମ ଚିନ୍ତାଧାରା!",
      incorrectNotice: "ଭୁଲ ଉତ୍ତର! ତଳେ ଦିଆଯାଇଥିବା ବୁଝାମଣା ଦେଖନ୍ତୁ:",
      nextBtn: "ପରବର୍ତ୍ତୀ ପ୍ରଶ୍ନ",
      finishBtn: "ଫଳାଫଳ ଦେଖନ୍ତୁ",
    },

    leaderboard: {
      badge: "ଛାତ୍ର ମୂଲ୍ୟାୟନ ର଼୍ୟାଙ୍କ",
      title: "ସାପ୍ତାହିକ ବିଜେତା",
      subtitle: "ଦୈନିକ କୁଇଜ୍ ଓ ତର୍କ ସମାଧାନରୁ ପ୍ରାପ୍ତ ପଏଣ୍ଟ",
      formula: "୧ ସଠିକ୍ ଉତ୍ତର = ୨୦ ପଏଣ୍ଟ",
      pointsUnit: "ପଏଣ୍ଟ",
      problemsSolvedCount: (count) => String(count) + " ପ୍ରଶ୍ନ ସମାଧାନ କଲେ",
      topSolverTag: "ଶ୍ରେଷ୍ଠ ସମାଧାନକାରୀ",
      searchPlaceholder: "ଛାତ୍ରଙ୍କ ନାମ ବା ଶ୍ରେଣୀ ଖୋଜନ୍ତୁ...",
      allGrades: "ସମସ୍ତ ଶ୍ରେଣୀ",
      tableTitle: "ସମସ୍ତ ଶ୍ରେଣୀ ଚାମ୍ପିଅନ୍ ଓ ବ୍ୟାଜ୍",
      studentsListed: (count) => String(count) + " ଛାତ୍ର ଭାଗ ନେଉଛନ୍ତି",
      solvedUnit: "ସମାଧାନ କଲେ",
    },

    ranks: {
      badge: "ଛାତ୍ର ର଼୍ୟାଙ୍କିଙ୍ଗ୍",
      title: "ସାପ୍ତାହିକ ସମସ୍ୟା ସମାଧାନ ଚାମ୍ପିଅନ୍",
      subtitle: "ଦୈନିକ କୁଇଜ୍ ଓ ଗାଣିତିକ ତର୍କରୁ ପ୍ରାପ୍ତ ପଏଣ୍ଟ। ପିଲାର ପ୍ରଗତି ପତ୍ର ଦେଖିବା ପାଇଁ ଟ୍ୟାପ୍ କରନ୍ତୁ।",
      pointsRule: "୧ ଟି ସଠିକ୍ ଉତ୍ତର = ୨୦ ପଏଣ୍ଟ",
      rank1Badge: "ପ୍ରଥମ ସ୍ଥାନ",
      rank2Badge: "ଦ୍ୱିତୀୟ ସ୍ଥାନ",
      rank3Badge: "ତୃତୀୟ ସ୍ଥାନ",
      points: "ପଏଣ୍ଟ",
      problemsSolved: "ସମାଧାନ ହୋଇଥିବା ପ୍ରଶ୍ନ",
      searchPlaceholder: "ନାମ ବା ଶ୍ରେଣୀ ଅନୁସାରେ ଖୋଜନ୍ତୁ...",
      allGrades: "ସମସ୍ତ ଶ୍ରେଣୀ",
      thRank: "ର଼୍ୟାଙ୍କ",
      thStudent: "ଛାତ୍ର",
      thGrade: "ଶ୍ରେଣୀ",
      thScore: "ମୋଟ ପଏଣ୍ଟ",
      thBadges: "ପ୍ରାପ୍ତ ବ୍ୟାଜ୍",
      thAction: "କାର୍ଯ୍ୟ",
      viewCard: "କାର୍ଡ ଦେଖନ୍ତୁ",
    },

    classroom: {
      title: "ଗ୍ରାମୀଣ ଲାଇଭ୍ ଶ୍ରେଣୀକକ୍ଷ",
      subtitle: "୨G/୩G ପାଇଁ ସୁବିଧାଜନକ",
      liveTitle: "ଗ୍ରାମୀଣ କମ୍-ବ୍ୟାଣ୍ଡୱିଡ୍ଥ ଲାଇଭ୍ ଅଡିଓ/ଭିଡିଓ ଶ୍ରେଣୀ",
      joinClass: "ଶ୍ରେଣୀରେ ଯୋଗ ଦିଅନ୍ତୁ",
      startClass: "ଶ୍ରେଣୀ ଆରମ୍ଭ କରନ୍ତୁ",
      endClass: "ଲିଭ୍ କରନ୍ତୁ",
      askQuestion: "ପ୍ରଶ୍ନ ପଚାରନ୍ତୁ",
      raiseHand: "ହାତ ଉଠାନ୍ତୁ",
      handRaisedAlert: "ହାତ ଉଠାଯାଇଛି! ଶିକ୍ଷକଙ୍କୁ ସୂଚନା ଦିଆଗଲା",
      assignments: "ଗୃହକାର୍ଯ୍ୟ ଓ ଶ୍ରେଣୀ କାର୍ଯ୍ୟ",
      groupChat: "ଶ୍ରେଣୀ ଆଲୋଚନା",
      muted: "ମାଇକ୍ ବନ୍ଦ",
      unmuted: "ମାଇକ୍ ଚାଲୁ",
      videoOn: "କ୍ୟାମେରା ଚାଲୁ",
      videoOff: "କେବଳ ଅଡିଓ",
      lowBandwidth: "୨G ମୋଡ୍",
      lowBandwidthOn: "୨G କେବଳ-ଅଡିଓ ସକ୍ରିୟ",
      lowBandwidthOff: "କମ୍ ଡାଟା ମୋଡ୍",
      liveSessionTag: "ଲାଇଭ୍ ସେସନ୍",
      handRaisedTag: "ହାତ ଉଠାଇଲେ",
      audioOnlyNote: "ଡାଟା ବଞ୍ଚାଇବା ପାଇଁ କେବଳ ଅଡିଓ",
      videoReadyNote: "କ୍ୟାମେରା ବନ୍ଦ ଅଛି",
      listening: "ଶୁଣୁଛନ୍ତି",
      handRaisedBtn: "ହାତ ଉଠାନ୍ତୁ",
      oneTapLabel: "ଗୋଟିଏ ଟ୍ୟାପ୍ ରେ ଉତ୍ତର:",
      quickChips: {
        present: "ଉପସ୍ଥିତ ଅଛି! ✋",
        understood: "ବୁଝିପାରିଲି! 👍",
        repeat: "ପୁଣି କୁହନ୍ତୁ 🔁",
        answer: "ମୋତେ ଉତ୍ତର ଜଣାଅଛି 💡",
      },
      tabChat: (count) => "ଶ୍ରେଣୀ ଚାଟ୍ (" + count + ")",
      tabClasswork: (count) => "ଶ୍ରେଣୀ କାର୍ଯ୍ୟ (" + count + ")",
      encryptionNote: "ସୁରକ୍ଷିତ ଲାଇଭ୍ ଶ୍ରେଣୀ • କୌଣସି ବିଜ୍ଞାପନ ନାହିଁ",
      homeworkTitle: "ଗୃହକାର୍ଯ୍ୟ ଓ କାର୍ଯ୍ୟକଳାପ",
      newTaskBtn: "+ ନୂଆ କାର୍ଯ୍ୟ",
      taskPlaceholder: "ଉଦା. ପୃଷ୍ଠା ୪ ର ଗଳ୍ପ ପଢ଼ନ୍ତୁ...",
      duePrefix: "ଶେଷ ତାରିଖ:",
      submittedCount: (completed, total) => String(completed) + "/" + String(total) + " ଦାଖଲ ହୋଇଛି",
      e2eEncrypted: "୨୫୬-ବିଟ୍ ଏନକ୍ରିପସନ୍ ଦ୍ୱାରା ସୁରକ୍ଷିତ",
      teacherBadge: "ଲାଇଭ୍ ଶିକ୍ଷକ",
      quickChatTitle: "ଶୀଘ୍ର ପ୍ରତିକ୍ରିୟା ବଟନ୍:",
      chips: {
        present: "ଉପସ୍ଥିତ ଅଛି! ✋",
        understood: "ବୁଝିପାରିଲି! 👍",
        question: "ମୋର ପ୍ରଶ୍ନ ଅଛି ❓",
        repeat: "ପୁନର୍ବାର କୁହନ୍ତୁ 🔁",
      },
      chatPlaceholder: "ଶିକ୍ଷକଙ୍କୁ ପ୍ରଶ୍ନ ବା ବାର୍ତ୍ତା ପଠାନ୍ତୁ...",
      send: "ପଠାନ୍ତୁ",
      createAssignment: "ନୂଆ କାର୍ଯ୍ୟ ପ୍ରସ୍ତୁତ କରନ୍ତୁ",
      assignmentDue: (due) => "ଦାଖଲ ତାରିଖ: " + due,
      submitted: (completed, total) => String(completed) + "/" + String(total) + " ଦାଖଲ କରିଛନ୍ତି",
      newAssignmentTitle: "କାର୍ଯ୍ୟର ଶୀର୍ଷକ ଓ ନିର୍ଦ୍ଦେଶ",
      subject: "ବିଷୟ",
      instructionsPlaceholder: "ଉଦା. ପୃଷ୍ଠା ୧୪ ର ଗଳ୍ପ ପଢ଼ନ୍ତୁ ଓ ୩ଟି ପ୍ରଶ୍ନର ଉତ୍ତର ଲେଖନ୍ତୁ...",
      assignBtn: "ଶ୍ରେଣୀକୁ ପଠାନ୍ତୁ",
      cancelBtn: "ବାତିଲ କରନ୍ତୁ",
      tabVideo: "ଲାଇଭ୍ ଭିଡିଓ / ଅଡିଓ",
      tabAssignments: "ଶ୍ରେଣୀ କାର୍ଯ୍ୟ ଓ ଗୃହକାର୍ଯ୍ୟ",
    },

    auth: {
      title: "ଦିଶା ସ୍କୁଲ ପ୍ରବେଶ ପୋର୍ଟାଲ",
      subtitle: "ଭାରତୀୟ ପ୍ରାଥମିକ ବିଦ୍ୟାଳୟ ଶିକ୍ଷଣ ନେଟୱାର୍କ",
      roleTeacher: "ଶ୍ରେଣୀ ଶିକ୍ଷକ",
      roleHeadmaster: "ପ୍ରଧାନ ଶିକ୍ଷକ / ସିଆରସିସି",
      roleStudent: "ଛାତ୍ର / ଛାତ୍ରୀ",
      roleParent: "ଅଭିଭାବକ",
      selectRole: "ଆପଣଙ୍କ ଭୂମିକା ଚୟନ କରନ୍ତୁ",
      googleLogin: "ଗୁଗଲ୍ ୱାର୍କସ୍ପେସ୍ ଦ୍ୱାରା ଲଗଇନ୍ କରନ୍ତୁ",
      microsoftLogin: "ମାଇକ୍ରୋସଫ୍ଟ ୩୬୫ ଦ୍ୱାରା ଲଗଇନ୍ କରନ୍ତୁ",
      outlookLogin: "ଆଉଟଲୁକ୍ ଏଡୁ ଦ୍ୱାରା ଲଗଇନ୍ କରନ୍ତୁ",
      ruralLoginTitle: "କିମ୍ବା ଗ୍ରାମୀଣ ଅଫଲାଇନ୍ ସିଧାସଳଖ ପ୍ରବେଶ (ପାସୱାର୍ଡ ବିନା)",
      schoolCode: "UDISE ସ୍କୁଲ କୋଡ୍",
      pin: "୪-ଅଙ୍କ ବିଶିଷ୍ଟ ପିନ୍",
      signInBtn: "ସ୍କୁଲ୍ ଲଗଇନ୍ କରନ୍ତୁ",
      demoNote: "ଡେମୋ ତଥ୍ୟ ପୂର୍ବରୁ ପ୍ରବେଶିତ ଅଛି। ଉପର ପଟିରୁ ଯେକୌଣସି ସମୟରେ ବଦଳାନ୍ତୁ।",
    },

    footer: {
      brand: "ଦିଶା • ଶିକ୍ଷଣ ସ୍ତର ଦୃଶ୍ୟମାନତା ମଞ୍ଚ",
      methodology: "TaRL ଶିକ୍ଷା ପଦ୍ଧତି • J-PAL ଏବଂ ପ୍ରଥମ ଅନୁପ୍ରାଣିତ",
      tagline: "କମ୍ କନେକ୍ଟିଭିଟି ଥିବା ଗ୍ରାମୀଣ ପ୍ରାଥମିକ ବିଦ୍ୟାଳୟ (ଶ୍ରେଣୀ ୧-୫) ପାଇଁ ପ୍ରସ୍ତୁତ",
    },

    growthMetaphor: {
      seedling: "ମଞ୍ଜି (ଅକ୍ଷର)",
      sprout: "ଅଙ୍କୁର (ଶବ୍ଦ)",
      smallPlant: "ଛୋଟ ଗଛ (ବାକ୍ୟ)",
      floweringPlant: "ଫୁଲ ଗଛ (ଗଳ୍ପ ପଠନ)",
      banyanTree: "ବରଗଛ (ସ୍ୱାଧୀନ ପାଠକ)",
    },

    litLevels: {
      1: { name: "ପ୍ରାରମ୍ଭିକ", desc: "ଅକ୍ଷର ବା ମୌଖିକ ଧ୍ୱନି ଚିହ୍ନିପାରନ୍ତି ନାହିଁ", icon: "🌱" },
      2: { name: "ଅକ୍ଷର", desc: "ବର୍ଣ୍ଣ ଏବଂ ମାତ୍ରାର ଧ୍ୱନି ଚିହ୍ନନ୍ତି", icon: "🌿" },
      3: { name: "ଶବ୍ଦ", desc: "୨-୩ ବର୍ଣ୍ଣ ବିଶିଷ୍ଟ ସରଳ ଶବ୍ଦ ପଢ଼ନ୍ତି", icon: "🪴" },
      4: { name: "ବାକ୍ୟ", desc: "ବିରାମ ଚିହ୍ନ ସହ ସରଳ ବାକ୍ୟ ପଢ଼ନ୍ତି", icon: "🌸" },
      5: { name: "ଗଳ୍ପ", desc: "ସମ୍ପୂର୍ଣ୍ଣ ଗଳ୍ପ ନିରବଚ୍ଛିନ୍ନ ଓ ବୁଝି ପଢ଼ନ୍ତି", icon: "🌳" },
    },

    numLevels: {
      1: { name: "ସଂଖ୍ୟା ଚିହ୍ନଟ", desc: "୧ ରୁ ୯ ପର୍ଯ୍ୟନ୍ତ ସଂଖ୍ୟା ଚିହ୍ନନ୍ତି", icon: "🌱" },
      2: { name: "ଏକ ଅଙ୍କ ବିଶିଷ୍ଟ ଗଣିତ", desc: "୯ ପର୍ଯ୍ୟନ୍ତ ଯୋଗ-ବିୟୋଗ କରନ୍ତି", icon: "🌿" },
      3: { name: "ଦୁଇ ଅଙ୍କ ବିଶିଷ୍ଟ ଗଣିତ", desc: "ହସ୍ତଗତ ଯୁକ୍ତ ଯୋଗ-ବିୟୋଗ କରନ୍ତି", icon: "🪴" },
      4: { name: "ବ୍ୟବହାରିକ ଗଣିତ ଓ ଗୁଣନ/ହରଣ", desc: "ଗୁଣନ, ହରଣ ଓ ବ୍ୟବହାରିକ ସମସ୍ୟା ସମାଧାନ କରନ୍ତି", icon: "🌳" },
    },

    subjects: {
      math: "ଗଣିତ",
      evs: "ପରିବେଶ ଅଧ୍ୟୟନ (EVS)",
      science: "ସାଧାରଣ ବିଜ୍ଞାନ",
      hindi: "ହିନ୍ଦୀ ଭାଷା",
      english: "ଇଂରାଜୀ ସାକ୍ଷରତା",
    },
  },

  kn: {
    appName: "ದಿಶಾ",
    appSubtitle: "ಕಲಿಕಾ ಮಟ್ಟ ಗೋಚರತೆ ವೇದಿಕೆ",
    tagline: "ಭಾರತೀಯ ಪ್ರಾಥಮಿಕ ಶಾಲೆಗಳಿಗೆ ಸರಿಯಾದ ಮಟ್ಟದಲ್ಲಿ ಬೋಧನೆ (TaRL)",
    offlineReady: "ಆಫ್‌ಲೈನ್ ಸಿದ್ಧ • ಡೇಟಾ ಸುರಕ್ಷಿತ",
    encryptedNotice: "256-ಬಿಟ್ ಸುರಕ್ಷಿತ ಎನ್‌ಕ್ರಿಪ್ಶನ್",
    rankings: "ಸಾಪ್ತಾಹಿಕ ಸಮಸ್ಯೆ ಪರಿಹಾರ ಚಾಂಪಿಯನ್ಸ್",

    baseline: "ಆರಂಭಿಕ",
    term1: "ಅವಧಿ ೧",
    term2: "ಅವಧಿ ೨",
    endline: "ಅಂತಿಮ",

    nav: {
      teacher: "ಶಿಕ್ಷಕರು",
      parent: "ಪ್ರಗತಿ ಪತ್ರ",
      iq: "ರಸಪ್ರಶ್ನೆ",
      ranks: "ಲೀಡರ್‌ಬೋರ್ಡ್",
      classroom: "ಲೈವ್ ತರಗತಿ",
      classTag: "ತರಗತಿ 1-5 TaRL",
      selectLang: "ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ",
      switchAccount: "ಖಾತೆ ಬದಲಾಯಿಸಿ",
      logout: "ಸೆಷನ್ ಮರುಹೊಂದಿಸಿ",
      authProvider: "ಗುರುತಿಸುವಿಕೆ",
      security: "ಸುರಕ್ಷತೆ",
      schoolTag: "ಸರ್ಕಾರಿ ಪ್ರಾಥಮಿಕ ಶಾಲೆ",
    },

    teacher: {
      chartTab: "ಮಟ್ಟ ಗೋಚರತೆ ನಕ್ಷೆ",
      groupsTab: "TaRL ಕಲಿಕಾ ಗುಂಪುಗಳು",
      rosterTab: "ತರಗತಿ ಪಟ್ಟಿ",
      reportTab: "ಮುಖ್ಯ ಶಿಕ್ಷಕರ ಸಾರಾಂಶ",
      startAssess: "ತ್ವರಿತ ಮೌಲ್ಯಮಾಪನ ಆರಂಭಿಸಿ",
      totalAssessed: "ಒಟ್ಟು ಮೌಲ್ಯಮಾಪನಗೊಂಡ ಮಕ್ಕಳು",
      enrolledClass: "ತರಗತಿ 1 ರಿಂದ 5 ರಲ್ಲಿ ದಾಖಲಾದವರು",
      storyLevel: "ಕಥೆ ಮಟ್ಟ (ನಿರರ್ಗಳ)",
      storyDesc: (fluent, total) => String(fluent) + " / " + String(total) + " ಮಕ್ಕಳು ಕಥೆ ಓದುತ್ತಾರೆ",
      developingLevel: "ಪ್ರಗತಿಯಲ್ಲಿರುವವರು (ಪದ/ಗಣಿತ)",
      developingDesc: (dev) => String(dev) + " ಮಕ್ಕಳು ವೇಗವಾಗಿ ಕಲಿಯುತ್ತಿದ್ದಾರೆ",
      beginnerLevel: "ಆರಂಭಿಕ (TaRL ಅಗತ್ಯ)",
      beginnerDesc: (beg) => String(beg) + " ಮಕ್ಕಳಿಗೆ ಮೂಲಭೂತ ಬೆಂಬಲ ಬೇಕು",
      chartTitle: "ಟ್ರಾಫಿಕ್-ಲೈಟ್ ಕಲಿಕಾ ಮಟ್ಟ ಹಂಚಿಕೆ",
      chartSubtitle: "ಕೆಂಪು = ಆರಂಭಿಕ • ಹಳದಿ = ಪ್ರಗತಿಯಲ್ಲಿ • ಹಸಿರು = ಕಥೆ ಮತ್ತು ಗಣಿತದಲ್ಲಿ ನಿಪುಣ",
      legendBeginner: "ಆರಂಭಿಕ",
      legendDeveloping: "ಪ್ರಗತಿಯಲ್ಲಿರುವ",
      legendMastery: "ನಿಪುಣ",
      oralReadingLabel: "ಮೌಖಿಕ ಓದುವಿಕೆ ನೈಜ ಮಟ್ಟ:",
      gradeReadersLabel: (pct) => String(pct) + "% ತರಗತಿಗೆ ತಕ್ಕ ಓದುಗರು",
      mathLabel: "ಮೂಲಭೂತ ಸಂಖ್ಯಾಜ್ಞಾನ ನೈಜ ಮಟ್ಟ:",
      mathOpsLabel: (pct) => String(pct) + "% ಎರಡಂಕಿಯ ಹಾಗೂ ವ್ಯವಹಾರಿಕ ಲೆಕ್ಕದಲ್ಲಿ ನಿಪುಣ",
      realityGapBadge: "TaRL ನೈಜತೆ ತಪಾಸಣೆ",
      realityGapTitle: "ತರಗತಿ ಮತ್ತು ನೈಜ ಸಾಮರ್ಥ್ಯದ ಅಂತರ",
      realityGapDesc: "ಹೆಚ್ಚಿನ ಮಕ್ಕಳು ತೇರ್ಗಡೆ ಹೊಂದುತ್ತಾರೆ ಆದರೆ ಸರಳ ಪದಗಳನ್ನು ಓದಲಾರರು. ತರಗತಿ 3-5 ರ ಈ ಮಕ್ಕಳಿಗೆ ತಕ್ಷಣದ ಮೂಲಭೂತ ಗುಂಪಿನ ಅಗತ್ಯವಿದೆ:",
      allFluentMsg: "ಅತ್ಯುತ್ತಮ! ತರಗತಿ 3-5 ರ ಎಲ್ಲಾ ಮಕ್ಕಳು ಪದಗಳು ಮತ್ತು ವಾಕ್ಯಗಳನ್ನು ಓದಬಲ್ಲರು.",
      enrolledClassText: (grade) => "ದಾಖಲಾದ ತರಗತಿ: " + grade,
      actualLabel: "ನೈಜ",
      viewGroupsBtn: "ಗುಂಪುಗಳನ್ನು ನೋಡಿ",
      assessBtn: "ಮೌಲ್ಯಮಾಪನ",
      tarlLiteracy: "TaRL ಸಾಕ್ಷರತೆ",
    },

    groups: {
      bannerBadge: "ಬೋಧನಾ ಪದ್ಧತಿ",
      bannerTitle: "ಸರಿಯಾದ ಮಟ್ಟದಲ್ಲಿ ಬೋಧನೆ (TaRL) ಗುಂಪುಗಳು",
      bannerDesc: "ಮಕ್ಕಳನ್ನು ವಯಸ್ಸು ಅಥವಾ ತರಗತಿಯ ಆಧಾರದ ಮೇಲೆ ಅಲ್ಲ, ಬದಲಿಗೆ ಅವರ ನೈಜ ಕಲಿಕಾ ಮಟ್ಟಕ್ಕೆ ತಕ್ಕಂತೆ ಗುಂಪು ಮಾಡಲಾಗಿದೆ.",
      recoTime: "ದೈನಂದಿನ ಸಮಯ: 60-90 ನಿಮಿಷಗಳ ಮೀಸಲಾದ ಮಟ್ಟದ ಅವಧಿ",
      peerLearning: "ಸಹಪಾಠಿ ಕಲಿಕೆ: ಮಕ್ಕಳು ಪರಸ್ಪರರಿಂದ ಸುಲಭವಾಗಿ ಕಲಿಯುತ್ತಾರೆ",
      readingTab: "ಓದುವಿಕೆ ಮಟ್ಟದ ಗುಂಪುಗಳು (EGRA)",
      mathTab: "ಗಣಿತ ಮಟ್ಟದ ಗುಂಪುಗಳು (EGMA)",
      printBtn: "ಗುಂಪು ಯೋಜನೆ ಮುದ್ರಿಸಿ",
      childrenCount: (count) => String(count) + " ಮಕ್ಕಳು",
      assignedTitle: "ನಿಯೋಜಿತ ಮಕ್ಕಳು",
      multiGradeTip: "ಬಹು-ತರಗತಿ ಕಲಿಕಾ ವೃತ್ತ",
      noChildren: "ಈ ಹಂತದಲ್ಲಿ ಯಾವುದೇ ಮಕ್ಕಳಿಲ್ಲ.",
      activitiesTitle: "ಪ್ರಥಮ್ ಶಿಫಾರಸು ಮಾಡಿದ ಚಟುವಟಿಕೆಗಳು",
      materialsLabel: "ಅಗತ್ಯವಿರುವ ಸಾಮಗ್ರಿಗಳು:",
      teacherTip: "ಶಿಕ್ಷಕರ ಪಾತ್ರ:",
      reassessTooltip: "ಪ್ರತಿ 30-45 ದಿನಗಳಿಗೊಮ್ಮೆ ಮರು ಮೌಲ್ಯಮಾಪನ ಮಾಡಿ",
    },

    roster: {
      searchPlaceholder: "ಹೆಸರು ಅಥವಾ ರೋಲ್ ಸಂಖ್ಯೆಯಿಂದ ಹುಡುಕಿ...",
      allGrades: "ಎಲ್ಲಾ ತರಗತಿಗಳು",
      classPrefix: "ತರಗತಿ",
      addStudentBtn: "+ ಹೊಸ ಮಗು ಸೇರಿಸಿ",
      levelUp: "ಮಟ್ಟ ಹೆಚ್ಚಳ",
      readingLevel: "ಓದುವಿಕೆ ಮಟ್ಟ",
      mathLevel: "ಗಣಿತ ಮಟ್ಟ",
      parent: "ಪೋಷಕರು",
      tapAssess: "ಮೌಲ್ಯಮಾಪನ",
      growthCard: "ಪ್ರಗತಿ ಪತ್ರ",
      modalTitle: "ತರಗತಿ ಪಟ್ಟಿಗೆ ಮಗುವನ್ನು ಸೇರಿಸಿ",
      childName: "ಮಗುವಿನ ಪೂರ್ಣ ಹೆಸರು",
      childNamePlaceholder: "ಉದಾ. ರಮೇಶ್ ಪಟೇಲ್",
      enrolledGrade: "ದಾಖಲಾದ ತರಗತಿ",
      rollNo: "ರೋಲ್ ಸಂಖ್ಯೆ",
      rollNoPlaceholder: "ಉದಾ. 14",
      avatarLabel: "ಅವತಾರ ಗುರುತು",
      parentName: "ಪೋಷಕರ ಹೆಸರು",
      parentPhone: "ವಾಟ್ಸಾಪ್ ಸಂಖ್ಯೆ",
      cancel: "ರದ್ದುಮಾಡಿ",
      submit: "ಪಟ್ಟಿಗೆ ಸೇರಿಸಿ",
      filterAll: "ಎಲ್ಲಾ ತರಗತಿಗಳು",
      addChildBtn: "+ ಮಗುವನ್ನು ಸೇರಿಸಿ",
      rollPrefix: "ರೋಲ್ #",
      parentLabel: "ಪೋಷಕರು",
      tapAssessBtn: "ಮೌಲ್ಯಮಾಪನ",
      growthCardBtn: "ಪ್ರಗತಿ ಪತ್ರ",
      childNameLabel: "ಮಗುವಿನ ಪೂರ್ಣ ಹೆಸರು",
      gradeLabel: "ದಾಖಲಾದ ತರಗತಿ",
      rollLabel: "ರೋಲ್ ಸಂಖ್ಯೆ",
      parentNameLabel: "ಪೋಷಕರ ಹೆಸರು",
      parentPhoneLabel: "ವಾಟ್ಸಾಪ್ ಫೋನ್ ಸಂಖ್ಯೆ",
      cancelBtn: "ರದ್ದುಮಾಡಿ",
      saveBtn: "ಪಟ್ಟಿಗೆ ಸೇರಿಸಿ",
    },

    assessModal: {
      modalSubtitle: "ಓದುವಿಕೆ ಮತ್ತು ಗಣಿತ ಕೌಶಲ್ಯಗಳ ಮೇಲೆ ನೇರವಾಗಿ ಟ್ಯಾಪ್ ಮಾಡಿ",
      termLabel: "ಮೌಲ್ಯಮಾಪನ ಹಂತ / ಅವಧಿ",
      prevRecorded: "ಹಿಂದಿನ ಮಟ್ಟ",
      readingTitle: "1. ಸಾಕ್ಷರತಾ ಮಟ್ಟ (ಮೌಖಿಕ ಓದುವಿಕೆ)",
      mathTitle: "2. ಸಂಖ್ಯಾಜ್ಞಾನ ಮಟ್ಟ (ಗಣಿತ ಕೌಶಲ್ಯ)",
      levelUpAlert: "ಮಟ್ಟದಲ್ಲಿ ಪ್ರಗತಿ! ಅಭಿನಂದನೆಗಳು!",
      levelUpSub: (name) => name + " ಉನ್ನತ ಕಲಿಕಾ ಮಟ್ಟಕ್ಕೆ ತಲುಪಿದ್ದಾರೆ!",
      notesLabel: "ಶಿಕ್ಷಕರ ಟಿಪ್ಪಣಿ (ಐಚ್ಛಿಕ)",
      notesPlaceholder: "ಉದಾ. ಒತ್ತಕ್ಷರಗಳಲ್ಲಿ ತೊಂದರೆ ಅಥವಾ ದಶಕದ ಸಂಕಲನದಲ್ಲಿ ಸುಧಾರಣೆ...",
      cancel: "ರದ್ದುಮಾಡಿ",
      saveBtn: "ಮೌಲ್ಯಮಾಪನ ಉಳಿಸಿ",
      tapSubtitle: "ಓದುವಿಕೆ ಮತ್ತು ಗಣಿತ ಮಟ್ಟ ಆಯ್ಕೆಮಾಡಿ",
      phaseLabel: "ಮೌಲ್ಯಮಾಪನ ಹಂತ",
      readingSection: "ಸಾಕ್ಷರತಾ ಮಟ್ಟ (ಮೌಖಿಕ ಓದುವಿಕೆ)",
      mathSection: "ಸಂಖ್ಯಾಜ್ಞಾನ (ಗಣಿತ ಕೌಶಲ್ಯಗಳು)",
      levelUpAwesome: "ಮಟ್ಟ ಹೆಚ್ಚಿದೆ! 🎉",
      levelUpDetail: (name) => name + " ಉನ್ನತ ಕಲಿಕಾ ಮಟ್ಟಕ್ಕೆ ತಲುಪಿದ್ದಾರೆ!",
      obsLabel: "ಶಿಕ್ಷಕರ ಟಿಪ್ಪಣಿ (ಐಚ್ಛಿಕ)",
      obsPlaceholder: "ಉದಾ. ಒತ್ತಕ್ಷರಗಳಲ್ಲಿ ಕಷ್ಟ...",
      cancelBtn: "ರದ್ದುಮಾಡಿ",
    },

    headmaster: {
      backBtn: "← ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಹಿಂತಿರುಗಿ",
      printBtn: "ಅಧಿಕೃತ ಶೀಟ್ ಮುದ್ರಿಸಿ (A4)",
      districtOffice: "ಜಿಲ್ಲಾ ಪ್ರಾಥಮಿಕ ಶಿಕ್ಷಣ ಕಾರ್ಯಕ್ರಮ • ಬ್ಲಾಕ್ ಸಂಪನ್ಮೂಲ ಕೇಂದ್ರ",
      reportTitle: "ಮುಖ್ಯೋಪಾಧ್ಯಾಯರ ಕಾರ್ಯಾಂಗ ಕಲಿಕಾ ಮಟ್ಟದ ಸಾರಾಂಶ",
      schoolMeta: "ಸರ್ಕಾರಿ ಪ್ರಾಥಮಿಕ ಶಾಲೆ ಚಾಂದ್‌ಪುರ • U-DISE: 21140201801",
      academicTerm: "ಶೈಕ್ಷಣಿಕ ವರ್ಷ 2024-25",
      generatedOn: "ರಚಿಸಿದ ದಿನಾಂಕ",
      totalAssessed: "ಒಟ್ಟು ಮೌಲ್ಯಮಾಪನಗೊಂಡವರು",
      storyReaders: "ಕಥೆ ಮಟ್ಟ (ನಿರರ್ಗಳ)",
      beginnerTier: "ಪ್ರಾರಂಭಿಕ ಮಟ್ಟ",
      leveledUpCount: "ಕಲಿಕಾ ಪ್ರಗತಿ",
      readingTableTitle: "ಸಾಕ್ಷರತಾ ಮಟ್ಟ (ಮೌಖಿಕ ಓದುವಿಕೆ) ವಿವರಣೆ",
      colLevel: "ಮಟ್ಟ",
      colSubskill: "ಮೂಲ ಉಪ-ಕೌಶಲ್ಯ",
      colChildren: "ಮಕ್ಕಳು",
      colPct: "% ಪ್ರಮಾಣ",
      colVisual: "ದೃಶ್ಯ ಹಂಚಿಕೆ",
      mathTableTitle: "ಸಂಖ್ಯಾಜ್ಞಾನ ಮಟ್ಟ (ಅಂಕಗಣಿತ) ವಿವರಣೆ",
      teacherSign: "ವರ್ಗ ಶಿಕ್ಷಕರ ಸಹಿ",
      headmasterSign: "ಮುಖ್ಯೋಪಾಧ್ಯಾಯರ ಸಹಿ",
      officerSign: "ಸಿಆರ್‌ಪಿ ಪರಿಶೀಲನಾ ಸಹಿ",
    },

    report: {
      backBtn: "← ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಹಿಂತಿರುಗಿ",
      printBtn: "ಅಧಿಕೃತ ಶೀಟ್ ಮುದ್ರಿಸಿ (A4)",
      deptTitle: "ಶಾಲಾ ಶಿಕ್ಷಣ ಇಲಾಖೆ • ಸಮಗ್ರ ಶಿಕ್ಷಣ ಅಭಿಯಾನ",
      reportTitle: "ಮುಖ್ಯ ಶಿಕ್ಷಕರ ಸಾರಾಂಶ: ಕಲಿಕಾ ಮಟ್ಟ ಗೋಚರತೆ ವರದಿ",
      schoolInfo: "ಸರ್ಕಾರಿ ಪ್ರಾಥಮಿಕ ಶಾಲೆ ಚಾಂದ್‌ಪುರ • U-DISE ಕೋಡ್: 21140201801 • ಬ್ಲಾಕ್: ರಾಮಪುರ",
      academicYear: "ಶೈಕ್ಷಣಿಕ ವರ್ಷ: 2024-25 • TaRL ಯೋಜನೆ",
      generatedOn: "ರಚಿಸಿದ ದಿನಾಂಕ",
      totalAssessed: "ಒಟ್ಟು ಮೌಲ್ಯಮಾಪನಗೊಂಡ ಮಕ್ಕಳು",
      storyReaders: "ಕಥೆ ಮಟ್ಟದ ಓದುಗರು",
      beginnerTier: "ಆರಂಭಿಕ ಹಂತ (ಅಕ್ಷರ)",
      leveledUp: "ಈ ಹಂತದಲ್ಲಿ ಪ್ರಗತಿ ಹೊಂದಿದವರು",
      rosterTableTitle: "ವಿದ್ಯಾರ್ಥಿವಾರು ಮೌಲ್ಯಮಾಪನ ಹಾಗೂ ಮಟ್ಟ ಹಂಚಿಕೆ ಪಟ್ಟಿ",
      thRoll: "ರೋಲ್",
      thName: "ಮಗುವಿನ ಹೆಸರು",
      thGrade: "ತರಗತಿ",
      thReading: "ಓದುವಿಕೆ ಮಟ್ಟ",
      thMath: "ಗಣಿತ ಮಟ್ಟ",
      thStatus: "TaRL ಕಾರ್ಯ ಸ್ಥಿತಿ",
      teacherSign: "ವರ್ಗ ಶಿಕ್ಷಕರ ಸಹಿ",
      headmasterSign: "ಮುಖ್ಯೋಪಾಧ್ಯಾಯರ ಸಹಿ",
      officialSeal: "ಶಾಲೆಯ ಅಧಿಕೃತ ಮೊಹರು",
    },

    parentCard: {
      title: "ವಿದ್ಯಾರ್ಥಿ ಕಲಿಕಾ ಪ್ರಗತಿ ಪತ್ರ",
      canDoTitle: "ಇಂದು ನಿಮ್ಮ ಮಗು ಹೆಮ್ಮೆಯಿಂದ ಏನು ಮಾಡಬಲ್ಲದು",
      homeActivitiesTitle: "ಮನೆಯಲ್ಲಿ ಆಟದ ಮೂಲಕ ಕಲಿಯುವ ಚಟುವಟಿಕೆಗಳು",
      shareWhatsApp: "ವಾಟ್ಸಾಪ್ ಮೂಲಕ ಹಂಚಿಕೊಳ್ಳಿ",
      printBadge: "ಪ್ರಗತಿ ಪತ್ರ ಮುದ್ರಿಸಿ",
      selectChild: "ಮಗು ಆಯ್ಕೆಮಾಡಿ:",
      copiedNotice: "ಪ್ರಗತಿ ಪತ್ರ ನಕಲಿಸಲಾಗಿದೆ!",
      currentStage: "ಪ್ರಸ್ತುತ ಬೆಳವಣಿಗೆಯ ಹಂತ:",
      growthPathTitle: "ಪೋಷಕರಿಗಾಗಿ ಗಿಡದ ಬೆಳವಣಿಗೆಯ ಸಂಕೇತ",
      growthPathSub: (name) => name + " ರವರ ಕಲಿಕಾ ಪ್ರಯಾಣ - ಸಣ್ಣ ಬೀಜದಿಂದ ಆಲದ ಮರದವರೆಗೆ",
      homeActivitiesSub: "ಪೋಷಕರು ಓದು ಬರಹವಿಲ್ಲದೆಯೂ ಮಾಡಿಸಬಹುದಾದ 10 ನಿಮಿಷಗಳ ಆಟಗಳು",
      noReadingNeeded: "ಪೋಷಕರು ಓದುವ ಅಗತ್ಯವಿಲ್ಲ • ಚಿತ್ರಗಳ ಮೂಲಕ ಮಾರ್ಗದರ್ಶನ",
      assessedBy: "ಸರ್ಕಾರಿ ಪ್ರಾಥಮಿಕ ಶಿಕ್ಷಕರಿಂದ ಮೌಲ್ಯಮಾಪನಗೊಂಡಿದೆ",
      tarlGroup: "ಪ್ರಸ್ತುತ TaRL ಕಲಿಕಾ ಗುಂಪು:",
      groupA: "ಗುಂಪು 1: ಮೂಲಭೂತ ಅಕ್ಷರಗಳು ಮತ್ತು ಧ್ವನಿಗಳು",
      groupB: "ಗುಂಪು 2: ಪದಗಳು ಮತ್ತು ಸರಳ ವಾಕ್ಯಗಳು",
      groupC: "ಗುಂಪು 3: ಕಥೆ ಓದುವಿಕೆ ಮತ್ತು ಗಣಿತ ತರ್ಕ",
      plantStages: {
        seedling: "ಮೊಳಕೆ (ಅಕ್ಷರಗಳು)",
        sprout: "ಚಿಗುರು (ಪದಗಳು)",
        plant: "ಗಿಡ (ವಾಕ್ಯಗಳು)",
        bloomed: "ಹೂವು (ಕಥೆ)",
        banyan: "ಆಲದ ಮರ (ಸ್ವತಂತ್ರ)",
      },
      canDo: {
        lit1: "ಅಕ್ಷರಗಳ ಆಕಾರ ಮತ್ತು ಧ್ವನಿ ಗುರುತಿಸುತ್ತಾರೆ",
        lit2: "ಅಕ್ಷರ ಗುರುತಿಸಿ ಧ್ವನಿ ಜೋಡಿಸುತ್ತಾರೆ",
        lit3: "ದೈನಂದಿನ ಸರಳ ಪದಗಳನ್ನು ನಿರರ್ಗಳವಾಗಿ ಓದುತ್ತಾರೆ",
        lit4: "ಸೂಕ್ತ ನಿಲುಗಡೆಯೊಂದಿಗೆ ಸಣ್ಣ ವಾಕ್ಯಗಳನ್ನು ಓದುತ್ತಾರೆ",
        lit5: "ಸಂಪೂರ್ಣ ಕಥೆಯನ್ನು ನಿರರ್ಗಳವಾಗಿ ಮತ್ತು ಅರ್ಥೈಸಿಕೊಂಡು ಓದುತ್ತಾರೆ",
        num1: "1 ರಿಂದ 9 ರವರೆಗಿನ ಸಂಖ್ಯೆಗಳನ್ನು ಗುರುತಿಸುತ್ತಾರೆ",
        num2: "ಒಂದಂಕಿಯ ಸಂಕಲನ ಮತ್ತು ವ್ಯವಕಲನ ಮಾಡುತ್ತಾರೆ",
        num3: "ದಶಕದ ಎರಡಂಕಿಯ ಸಂಕಲನ ಮತ್ತು ವ್ಯವಕಲನ ಮಾಡುತ್ತಾರೆ",
        num4: "ಗುಣಾಕಾರ, ಭಾಗಾಕಾರ ಮತ್ತು ವ್ಯವಹಾರಿಕ ಲೆಕ್ಕಗಳನ್ನು ಬಿಡಿಸುತ್ತಾರೆ",
        format: (name, lit, num) => name + " " + lit + " ಮತ್ತು " + num + "!",
      },
      canDoSentences: {
        lit: {
          1: "ಅಕ್ಷರ ಮತ್ತು ಧ್ವನಿಗಳನ್ನು ಗುರುತಿಸಲು ಕಲಿಯುತ್ತಿದ್ದಾರೆ",
          2: "ಅಕ್ಷರಗಳು ಮತ್ತು ಪ್ರತ್ಯೇಕ ಧ್ವನಿಗಳನ್ನು ಓದಬಲ್ಲರು",
          3: "೨-೩ ಅಕ್ಷರಗಳ ಸರಳ ಪದಗಳನ್ನು ಓದಬಲ್ಲರು",
          4: "ವಾಕ್ಯಗಳನ್ನು ಆತ್ಮವಿಶ್ವಾಸದಿಂದ ಓದುತ್ತಾರೆ",
          5: "ಸಂಪೂರ್ಣ ಕಥೆಯನ್ನು ನಿರರ್ಗಳವಾಗಿ ಓದುತ್ತಾರೆ",
        },
        num: {
          1: "೧ ರಿಂದ ೯ ರವರೆಗಿನ ಸಂಖ್ಯೆಗಳನ್ನು ಕಲಿಯುತ್ತಿದ್ದಾರೆ",
          2: "ಒಂದಂಕಿಯ ಸಂಕಲನ ಮತ್ತು ವ್ಯವಕಲನ ಮಾಡಬಲ್ಲರು",
          3: "ದಶಕದ ಸಂಕಲನ ಮತ್ತು ವ್ಯವಕಲನ ಮಾಡಬಲ್ಲರು",
          4: "ಗುಣಾಕಾರ, ಭಾಗಾಕಾರ ಮತ್ತು ದೈನಂದಿನ ಲೆಕ್ಕಗಳನ್ನು ಪರಿಹರಿಸಬಲ್ಲರು",
        },
      },
      plantSeedling: "ಮೊಳಕೆ (ಅಕ್ಷರಗಳು)",
      plantSprout: "ಚಿಗುರು (ಪದಗಳು)",
      plantPlant: "ಗಿಡ (ವಾಕ್ಯಗಳು)",
      plantBloomed: "ಹೂವು (ಕಥೆ)",
      plantBanyan: "ಆಲದ ಮರ (ಸ್ವತಂತ್ರ)",
      whatsAppShare: "ವಾಟ್ಸಾಪ್ ಮೂಲಕ ಹಂಚಿಕೊಳ್ಳಿ",
      whatsAppCopied: "ವರದಿ ನಕಲಿಸಲಾಗಿದೆ!",
      levelPrefix: "ಹಂತ",
      groupLabel: "TaRL ಕಲಿಕಾ ಗುಂಪು",
    },

    subjectTest: {
      title: "ವಿದ್ಯಾರ್ಥಿ ರಸಪ್ರಶ್ನೆ ಮತ್ತು ದೈನಂದಿನ ಸಮಸ್ಯೆ ಪರಿಹಾರ",
      studentLabel: (name, grade) => "ಪರೀಕ್ಷಾರ್ಥಿ: " + name + " (ತರಗತಿ " + grade + ")",
      questionCount: "೨೦ ಪ್ರಶ್ನೆಗಳು • ೪೦೦ ಅಂಕಗಳು",
      assessmentComplete: "ರಸಪ್ರಶ್ನೆ ಪೂರ್ಣಗೊಂಡಿದೆ! ಅದ್ಭುತ ಪ್ರಯತ್ನ! 🎉",
      subjectLabel: (sub) => sub + " ಮೌಲ್ಯಮಾಪನ ಫಲಿತಾಂಶಗಳು",
      correctProblemAnswers: "ಸರಿಯಾದ ಉತ್ತರಗಳು",
      pointsEarned: (pts) => "+" + pts + " ಲೀಡರ್‌ಬೋರ್ಡ್ ಅಂಕಗಳು",
      rankUpdated: "ಶ್ರೇಯಾಂಕ ನವೀಕರಿಸಲಾಗಿದೆ!",
      retakeTest: "ಮತ್ತೆ ಪರೀಕ್ಷೆ ತೆಗೆದುಕೊಳ್ಳಿ",
      nextSubjectQuiz: "ಮುಂದಿನ ವಿಷಯ ಪ್ರಯತ್ನಿಸಿ",
      questionProgress: (curr, total) => "ಪ್ರಶ್ನೆ " + curr + " / " + total,
      classCurriculum: (grade) => "ತರಗತಿ " + grade + " ಮಟ್ಟ",
      correctAnswer: "ಸರಿ! ಅತ್ಯುತ್ತಮ ಆಲೋಚನೆ!",
      incorrectAnswer: "ತಪ್ಪು ಉತ್ತರ! ಕೆಳಗಿನ ವಿವರಣೆಯನ್ನು ನೋಡಿ:",
      nextQuestion: "ಮುಂದಿನ ಪ್ರಶ್ನೆ",
      viewResults: "ಫಲಿತಾಂಶ ನೋಡಿ",
      whyLabel: "ಇದು ಏಕೆ ಸರಿ",
    },

    quiz: {
      title: "ವಿದ್ಯಾರ್ಥಿ ವಿಷಯ ಪರೀಕ್ಷೆ ಮತ್ತು ದೈನಂದಿನ ಸಮಸ್ಯೆ ಪರಿಹಾರ",
      studentLabel: "ಪರೀಕ್ಷಾರ್ಥಿ:",
      questionsCount: "20 ಪ್ರಶ್ನೆಗಳು • ತರಗತಿ ಪಠ್ಯಕ್ರಮ",
      completeTitle: "ಪರೀಕ್ಷೆ ಪೂರ್ಣಗೊಂಡಿದೆ! ಅತ್ಯುತ್ತಮ ಪ್ರಯತ್ನ! 🎉",
      subjectLabel: "ವಿಷಯ ಪರೀಕ್ಷೆಯ ಫಲಿತಾಂಶಗಳು",
      correctAnswers: "ಸರಿಯಾದ ಉತ್ತರಗಳು",
      pointsEarned: (pts) => "+" + pts + " ಲೀಡರ್‌ಬೋರ್ಡ್ ಅಂಕಗಳು",
      rankUpdated: "ಶ್ರೇಯಾಂಕ ನವೀಕರಿಸಲಾಗಿದೆ!",
      retakeBtn: "ಮತ್ತೆ ಪರೀಕ್ಷೆ ಬರೆಯಿರಿ",
      nextSubjectBtn: "ಮುಂದಿನ ವಿಷಯ ಪ್ರಯತ್ನಿಸಿ",
      questionProgress: (curr, total) => "ಪ್ರಶ್ನೆ " + curr + " / " + total,
      curriculumLabel: (grade) => "ತರಗತಿ " + grade + " ಪಠ್ಯಕ್ರಮ ಮಟ್ಟ",
      explanationLabel: "ಈ ಉತ್ತರ ಏಕೆ ಸರಿ:",
      correctNotice: "ಸರಿಯಾದ ಉತ್ತರ! ಅದ್ಭುತ ಆಲೋಚನೆ!",
      incorrectNotice: "ತಪ್ಪು ಉತ್ತರ! ಕೆಳಗಿನ ವಿವರಣೆಯನ್ನು ಗಮನಿಸಿ:",
      nextBtn: "ಮುಂದಿನ ಪ್ರಶ್ನೆ",
      finishBtn: "ಫಲಿತಾಂಶಗಳನ್ನು ವೀಕ್ಷಿಸಿ",
    },

    leaderboard: {
      badge: "ವಿದ್ಯಾರ್ಥಿ ಶ್ರೇಯಾಂಕ",
      title: "ಸಾಪ್ತಾಹಿಕ ಚಾಂಪಿಯನ್ಸ್",
      subtitle: "ದೈನಂದಿನ ರಸಪ್ರಶ್ನೆ ಮತ್ತು ತರ್ಕ ಒಗಟುಗಳ ಮೂಲಕ ಗಳಿಸಿದ ಅಂಕಗಳು",
      formula: "೧ ಸರಿಯಾದ ಉತ್ತರ = ೨೦ ಅಂಕಗಳು",
      pointsUnit: "ಅಂಕಗಳು",
      problemsSolvedCount: (count) => String(count) + " ಪ್ರಶ್ನೆಗಳನ್ನು ಪರಿಹರಿಸಲಾಗಿದೆ",
      topSolverTag: "ಉನ್ನತ ಪರಿಹಾರಕ",
      searchPlaceholder: "ವಿದ್ಯಾರ್ಥಿ ಹೆಸರು ಅಥವಾ ತರಗತಿ ಹುಡುಕಿ...",
      allGrades: "ಎಲ್ಲಾ ತರಗತಿಗಳು",
      tableTitle: "ಎಲ್ಲಾ ತರಗತಿಯ ಚಾಂಪಿಯನ್ಸ್ ಮತ್ತು ಬ್ಯಾಡ್ಜ್‌ಗಳು",
      studentsListed: (count) => String(count) + " ವಿದ್ಯಾರ್ಥಿಗಳು ಭಾಗವಹಿಸುತ್ತಿದ್ದಾರೆ",
      solvedUnit: "ಪರಿಹರಿಸಲಾಗಿದೆ",
    },

    ranks: {
      badge: "ವಿದ್ಯಾರ್ಥಿ ಶ್ರೇಯಾಂಕ",
      title: "ಸಾಪ್ತಾಹಿಕ ಸಮಸ್ಯೆ ಪರಿಹಾರ ಚಾಂಪಿಯನ್ಸ್",
      subtitle: "ದೈನಂದಿನ ರಸಪ್ರಶ್ನೆ ಮತ್ತು ತರ್ಕ ಒಗಟುಗಳಿಂದ ಗಳಿಸಿದ ಅಂಕಗಳು. ಪ್ರಗತಿ ಪತ್ರ ನೋಡಲು ವಿದ್ಯಾರ್ಥಿಯ ಮೇಲೆ ಟ್ಯಾಪ್ ಮಾಡಿ.",
      pointsRule: "1 ಸರಿಯಾದ ಉತ್ತರ = 20 ಅಂಕಗಳು",
      rank1Badge: "ಪ್ರಥಮ ಸ್ಥಾನ",
      rank2Badge: "ದ್ವಿತೀಯ ಸ್ಥಾನ",
      rank3Badge: "ತೃತೀಯ ಸ್ಥಾನ",
      points: "ಅಂಕಗಳು",
      problemsSolved: "ಪರಿಹರಿಸಿದ ಲೆಕ್ಕಗಳು",
      searchPlaceholder: "ಹೆಸರು ಅಥವಾ ತರಗತಿಯಿಂದ ಹುಡುಕಿ...",
      allGrades: "ಎಲ್ಲಾ ತರಗತಿಗಳು",
      thRank: "ಶ್ರೇಣಿ",
      thStudent: "ವಿದ್ಯಾರ್ಥಿ",
      thGrade: "ತರಗತಿ",
      thScore: "ಒಟ್ಟು ಅಂಕಗಳು",
      thBadges: "ಗಳಿಸಿದ ಬ್ಯಾಡ್ಜ್‌ಗಳು",
      thAction: "ಕ್ರಿಯೆ",
      viewCard: "ಕಾರ್ಡ್ ನೋಡಿ",
    },

    classroom: {
      title: "ಗ್ರಾಮೀಣ ಲೈವ್ ತರಗತಿ ಕೊಠಡಿ",
      subtitle: "2G/3G ಗಾಗಿ ಆಪ್ಟಿಮೈಸ್ ಮಾಡಲಾಗಿದೆ",
      liveTitle: "ಗ್ರಾಮೀಣ ಕಡಿಮೆ-ಬ್ಯಾಂಡ್‌ವಿಡ್ತ್ ಲೈವ್ ಆಡಿಯೋ/ವಿಡಿಯೋ ತರಗತಿ",
      joinClass: "ತರಗತಿಗೆ ಸೇರಿ",
      startClass: "ತರಗತಿ ಆರಂಭಿಸಿ",
      endClass: "ಸೆಷನ್‌ನಿಂದ ನಿರ್ಗಮಿಸಿ",
      askQuestion: "ಪ್ರಶ್ನೆ ಕೇಳಿ",
      raiseHand: "ಕೈ ಎತ್ತಿ",
      handRaisedAlert: "ಕೈ ಎತ್ತಲಾಗಿದೆ! ಶಿಕ್ಷಕರಿಗೆ ತಿಳಿಸಲಾಗಿದೆ",
      assignments: "ಮನೆಕೆಲಸ ಮತ್ತು ತರಗತಿ ಕೆಲಸ",
      groupChat: "ತರಗತಿ ಚರ್ಚೆ",
      muted: "ಮೈಕ್ ಆಫ್",
      unmuted: "ಮೈಕ್ ಆನ್",
      videoOn: "ಕ್ಯಾಮೆರಾ ಆನ್",
      videoOff: "ಕೇವಲ ಆಡಿಯೋ",
      lowBandwidth: "2G ಮೋಡ್",
      lowBandwidthOn: "2G ಆಡಿಯೋ ಮೋಡ್ ಸಕ್ರಿಯ",
      lowBandwidthOff: "ಕಡಿಮೆ ಬ್ಯಾಂಡ್‌ವಿಡ್ತ್ ಮೋಡ್",
      liveSessionTag: "ಲೈವ್ ತರಗತಿ",
      handRaisedTag: "ಕೈ ಎತ್ತಲಾಗಿದೆ",
      audioOnlyNote: "ಡೇಟಾ ಉಳಿಸಲು ಕೇವಲ ಆಡಿಯೋ",
      videoReadyNote: "ಕ್ಯಾಮೆರಾ ವಿರಾಮಗೊಳಿಸಲಾಗಿದೆ",
      listening: "ಕೇಳುತ್ತಿದ್ದಾರೆ",
      handRaisedBtn: "ಕೈ ಎತ್ತಿ",
      oneTapLabel: "ತ್ವರಿತ ಪ್ರತಿಕ್ರಿಯೆ:",
      quickChips: {
        present: "ಹಾಜರಿದ್ದೇನೆ! ✋",
        understood: "ಅರ್ಥವಾಯಿತು! 👍",
        repeat: "ದಯವಿಟ್ಟು ಪುನರಾವರ್ತಿಸಿ 🔁",
        answer: "ನನಗೆ ಉತ್ತರ ತಿಳಿದಿದೆ 💡",
      },
      tabChat: (count) => "ತರಗತಿ ಚಾಟ್ (" + count + ")",
      tabClasswork: (count) => "ತರಗತಿ ಕೆಲಸ (" + count + ")",
      encryptionNote: "ಸುರಕ್ಷಿತ ಎಂಡ್-ಟು-ಎಂಡ್ • ಯಾವುದೇ ಜಾಹೀರಾತುಗಳಿಲ್ಲ",
      homeworkTitle: "ಮನೆಕೆಲಸ ಮತ್ತು ಚಟುವಟಿಕೆಗಳು",
      newTaskBtn: "+ ಹೊಸ ಕಾರ್ಯ",
      taskPlaceholder: "ಉದಾ. ಪುಟ ೪ ರ ಕಥೆಯನ್ನು ಓದಿ...",
      duePrefix: "ಅಂತಿಮ ದಿನಾಂಕ:",
      submittedCount: (completed, total) => String(completed) + "/" + String(total) + " ಸಲ್ಲಿಸಲಾಗಿದೆ",
      e2eEncrypted: "256-ಬಿಟ್ ಎನ್‌ಕ್ರಿಪ್ಶನ್ ಮೂಲಕ ಸುರಕ್ಷಿತ",
      teacherBadge: "ಲೈವ್ ಶಿಕ್ಷಕರು",
      quickChatTitle: "ತ್ವರಿತ ಪ್ರತಿಕ್ರಿಯೆ ಬಟನ್‌ಗಳು:",
      chips: {
        present: "ಹಾಜರಿದ್ದೇನೆ! ✋",
        understood: "ಅರ್ಥವಾಯಿತು! 👍",
        question: "ನನಗೆ ಸಂಶಯವಿದೆ ❓",
        repeat: "ಮತ್ತೆ ಹೇಳಿ 🔁",
      },
      chatPlaceholder: "ಶಿಕ್ಷಕರಿಗೆ ಪ್ರಶ್ನೆ ಅಥವಾ ಸಂದೇಶ ಕಳುಹಿಸಿ...",
      send: "ಕಳುಹಿಸಿ",
      createAssignment: "ಹೊಸ ತರಗತಿ ಕೆಲಸ ರಚಿಸಿ",
      assignmentDue: (due) => "ಸಲ್ಲಿಸಲು ಕೊನೆಯ ದಿನಾಂಕ: " + due,
      submitted: (completed, total) => String(completed) + "/" + String(total) + " ಸಲ್ಲಿಸಿದ್ದಾರೆ",
      newAssignmentTitle: "ಕಾರ್ಯದ ಶೀರ್ಷಿಕೆ ಮತ್ತು ಸೂಚನೆಗಳು",
      subject: "ವಿಷಯ",
      instructionsPlaceholder: "ಉದಾ. ಪುಟ 14 ರಲ್ಲಿರುವ ಕಥೆಯನ್ನು ಓದಿ 3 ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಿಸಿ...",
      assignBtn: "ತರಗತಿಗೆ ಪೋಸ್ಟ್ ಮಾಡಿ",
      cancelBtn: "ರದ್ದುಮಾಡಿ",
      tabVideo: "ಲೈವ್ ವಿಡಿಯೋ / ಆಡಿಯೋ",
      tabAssignments: "ತರಗತಿ ಕೆಲಸ ಮತ್ತು ಮನೆಕೆಲಸ",
    },

    auth: {
      title: "ದಿಶಾ ಶಾಲೆ ಪ್ರವೇಶ ಪೋರ್ಟಲ್",
      subtitle: "ಭಾರತೀಯ ಪ್ರಾಥಮಿಕ ಶಾಲಾ ಕಲಿಕಾ ಗೋಚರತೆ ನೆಟ್‌ವರ್ಕ್",
      roleTeacher: "ತರಗತಿ ಶಿಕ್ಷಕರು",
      roleHeadmaster: "ಮುಖ್ಯ ಶಿಕ್ಷಕರು / ಸಿಆರ್‌ಸಿ",
      roleStudent: "ವಿದ್ಯಾರ್ಥಿ",
      roleParent: "ಪೋಷಕರು",
      selectRole: "ನಿಮ್ಮ ಪಾತ್ರವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
      googleLogin: "ಗೂಗಲ್ ವರ್ಕ್‌ಸ್ಪೇಸ್ ಮೂಲಕ ಪ್ರವೇಶಿಸಿ",
      microsoftLogin: "ಮೈಕ್ರೋಸಾಫ್ಟ್ 365 ಮೂಲಕ ಪ್ರವೇಶಿಸಿ",
      outlookLogin: "ಔಟ್‌ಲುಕ್ ಎಡು ಮೂಲಕ ಪ್ರವೇಶಿಸಿ",
      ruralLoginTitle: "ಅಥವಾ ಒಂದು ಟ್ಯಾಪ್ ಗ್ರಾಮೀಣ ಆಫ್‌ಲೈನ್ ಪ್ರವೇಶ (ಪಾಸ್‌ವರ್ಡ್ ಇಲ್ಲದೆ)",
      schoolCode: "UDISE ಶಾಲಾ ಕೋಡ್",
      pin: "4-ಅಂಕಿಯ ತ್ವರಿತ ಪಿನ್",
      signInBtn: "ತಕ್ಷಣದ ಶಾಲಾ ಲಾಗಿನ್",
      demoNote: "ಡೆಮೊ ಮಾಹಿತಿಯನ್ನು ಮೊದಲೇ ಭರ್ತಿ ಮಾಡಲಾಗಿದೆ. ಮೇಲಿನ ಪಟ್ಟಿಯಿಂದ ಯಾವಾಗ ಬೇಕಾದರೂ ಬದಲಾಯಿಸಿ.",
    },

    footer: {
      brand: "ದಿಶಾ • ಕಲಿಕಾ ಮಟ್ಟ ಗೋಚರತೆ ವೇದಿಕೆ",
      methodology: "TaRL ಬೋಧನಾ ವಿಧಾನ • J-PAL ಮತ್ತು ಪ್ರಥಮ್ ಪ್ರೇರಿತ",
      tagline: "ಕಡಿಮೆ ನೆಟ್‌ವರ್ಕ್ ಇರುವ ಗ್ರಾಮೀಣ ಭಾರತೀಯ ಪ್ರಾಥಮಿಕ ಶಾಲೆಗಳಿಗಾಗಿ (ತರಗತಿ 1-5)",
    },

    growthMetaphor: {
      seedling: "ಮೊಳಕೆ (ಅಕ್ಷರಗಳು)",
      sprout: "ಚಿಗುರು (ಪದಗಳು)",
      smallPlant: "ಸಣ್ಣ ಗಿಡ (ವಾಕ್ಯಗಳು)",
      floweringPlant: "ಹೂವಿನ ಗಿಡ (ಕಥೆ ಓದುಗರು)",
      banyanTree: "ಆಲದ ಮರ (ಸ್ವತಂತ್ರ ಓದುಗರು)",
    },

    litLevels: {
      1: { name: "ಆರಂಭಿಕ", desc: "ಅಕ್ಷರ ಅಥವಾ ಮೌಖಿಕ ಧ್ವನಿ ಗುರುತಿಸಲಾರರು", icon: "🌱" },
      2: { name: "ಅಕ್ಷರ", desc: "ಅಕ್ಷರಗಳು ಮತ್ತು ಸ್ವರ ಧ್ವನಿಗಳನ್ನು ಗುರುತಿಸುತ್ತಾರೆ", icon: "🌿" },
      3: { name: "ಪದ", desc: "2-3 ಅಕ್ಷರಗಳ ಸರಳ ಪದಗಳನ್ನು ಓದುತ್ತಾರೆ", icon: "🪴" },
      4: { name: "ವಾಕ್ಯ", desc: "ವಿರಾಮಚಿಹ್ನೆಗಳೊಂದಿಗೆ ಸರಳ ವಾಕ್ಯ ಓದುತ್ತಾರೆ", icon: "🌸" },
      5: { name: "ಕಥೆ", desc: "ಸಂಪೂರ್ಣ ಕಥೆಯನ್ನು ನಿರರ್ಗಳವಾಗಿ ಓದುತ್ತಾರೆ", icon: "🌳" },
    },

    numLevels: {
      1: { name: "ಸಂಖ್ಯೆ ಗುರುತಿಸುವಿಕೆ", desc: "1 ರಿಂದ 9 ರವರೆಗಿನ ಸಂಖ್ಯೆ ಗುರುತಿಸುತ್ತಾರೆ", icon: "🌱" },
      2: { name: "ಒಂದಂಕಿಯ ಲೆಕ್ಕ", desc: "9 ರವರೆಗಿನ ಸಂಕಲನ-ವ್ಯವಕಲನ ಮಾಡುತ್ತಾರೆ", icon: "🌿" },
      3: { name: "ಎರಡಂಕಿಯ ಲೆಕ್ಕ", desc: "ದಶಕದ ಸಂಕಲನ-ವ್ಯವಕಲನ ಮಾಡುತ್ತಾರೆ", icon: "🪴" },
      4: { name: "ವ್ಯವಹಾರಿಕ ಲೆಕ್ಕ ಮತ್ತು ಗುಣಾಕಾರ/ಭಾಗಾಕಾರ", desc: "ಗುಣಾಕಾರ, ಭಾಗಾಕಾರ ಮತ್ತು ವ್ಯವಹಾರಿಕ ಲೆಕ್ಕ ಪರಿಹರಿಸುತ್ತಾರೆ", icon: "🌳" },
    },

    subjects: {
      math: "ಗಣಿತ",
      evs: "ಪರಿಸರ ಅಧ್ಯಯನ (EVS)",
      science: "ಸಾಮಾನ್ಯ ವಿಜ್ಞಾನ",
      hindi: "ಹಿಂದಿ ಭಾಷೆ",
      english: "ಇಂಗ್ಲಿಷ್ ಸಾಕ್ಷರತೆ",
    },
  },
};
`;

fs.writeFileSync('src/i18n/translations.ts', code);
console.log('Successfully written src/i18n/translations.ts');
