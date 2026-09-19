const fs = require('fs');

// We will construct the complete translations.ts with full TranslationDict interface and en, hi, or, kn implementations.
const fileContent = `import { Language } from '../types';

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
    // Extended properties
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
    // Extended properties
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
    // Extended properties
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
      understand: string;
      repeat: string;
      doubt: string;
      gotIt: string;
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
`;

fs.writeFileSync('scripts/template.txt', fileContent);
console.log('Template written successfully');
