import React, { useState, useRef, useEffect } from 'react';
import { UserProfile, ClassroomMessage, ClassroomAssignment, Language } from '../../types';
import { StorageService } from '../../services/storage';
import { translations } from '../../i18n/translations';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Hand, 
  MessageSquare, 
  FileText, 
  ShieldCheck, 
  Lock, 
  Send, 
  PhoneOff, 
  Plus, 
  Wifi,
} from 'lucide-react';

interface LiveClassroomViewProps {
  currentUser: UserProfile;
  language: Language;
}

export const LiveClassroomView: React.FC<LiveClassroomViewProps> = ({
  currentUser,
  language,
}) => {
  const t = translations[language];
  const [activeTab, setActiveTab] = useState<'video' | 'chat' | 'assignments'>('video');
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [handRaised, setHandRaised] = useState(false);
  const [lowBandwidthMode, setLowBandwidthMode] = useState(false);

  // Chat & Assignments
  const [messages, setMessages] = useState<ClassroomMessage[]>(StorageService.getClassroomMessages());
  const [assignments, setAssignments] = useState<ClassroomAssignment[]>(StorageService.getAssignments());
  const [inputMessage, setInputMessage] = useState('');
  const [newAssignmentTitle, setNewAssignmentTitle] = useState('');
  const [newAssignmentSubject, setNewAssignmentSubject] = useState('math');
  const [showAddAssignment, setShowAddAssignment] = useState(false);

  // Hand raise queue
  const [raisedHands, setRaisedHands] = useState<string[]>(['Ramesh Patel (Class 3)']);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Camera stream handler
  useEffect(() => {
    if (isCameraOn) {
      navigator.mediaDevices
        ?.getUserMedia({ video: true, audio: false })
        .then((stream) => {
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          console.warn('Camera access not granted or not available:', err);
          setIsCameraOn(false);
        });
    } else {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    }

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isCameraOn]);

  const toggleHandRaise = () => {
    const nextState = !handRaised;
    setHandRaised(nextState);

    if (nextState) {
      setRaisedHands((prev) => [...prev, `${currentUser.name} (${currentUser.role})`]);
      const autoMsg: ClassroomMessage = {
        id: `msg-${Date.now()}`,
        senderName: currentUser.name,
        senderRole: currentUser.role,
        text: '✋ Raised hand with a question!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        encrypted: true,
      };
      StorageService.addClassroomMessage(autoMsg);
      setMessages((prev) => [...prev, autoMsg]);
    } else {
      setRaisedHands((prev) => prev.filter((n) => !n.includes(currentUser.name)));
    }
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMsg: ClassroomMessage = {
      id: `msg-${Date.now()}`,
      senderName: currentUser.name,
      senderRole: currentUser.role,
      text: inputMessage.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      encrypted: true,
    };

    StorageService.addClassroomMessage(newMsg);
    setMessages((prev) => [...prev, newMsg]);
    setInputMessage('');
  };

  const sendQuickChat = (text: string) => {
    const quickMsg: ClassroomMessage = {
      id: `msg-${Date.now()}`,
      senderName: currentUser.name,
      senderRole: currentUser.role,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      encrypted: true,
    };
    StorageService.addClassroomMessage(quickMsg);
    setMessages((prev) => [...prev, quickMsg]);
  };

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAssignmentTitle.trim()) return;

    const newAss: ClassroomAssignment = {
      id: `asg-${Date.now()}`,
      title: newAssignmentTitle.trim(),
      subject: (newAssignmentSubject as any) || 'math',
      grade: 3,
      dueText: 'Tomorrow Morning',
      assignedDate: new Date().toISOString().split('T')[0],
      description: 'Complete with slate or home pebbles, upload photo or bring to school.',
      completedCount: 0,
      totalStudents: 12,
    };

    StorageService.addAssignment(newAss);
    setAssignments((prev) => [newAss, ...prev]);
    setNewAssignmentTitle('');
    setShowAddAssignment(false);
  };

  return (
    <div className="space-y-4 max-w-6xl mx-auto">
      {/* Encryption & Security Header */}
      <div className="bg-[#1F7A5C] text-white p-3.5 sm:p-4 rounded-3xl flex flex-wrap items-center justify-between gap-3 shadow-sm min-w-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-2xl bg-emerald-800 flex items-center justify-center text-xl shrink-0">
            <Lock className="w-5 h-5 text-[#F4A340]" />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-heading font-extrabold text-base sm:text-lg text-[#FFF8EE] truncate">
                {t.classroom.title}
              </h2>
              <span className="bg-emerald-900/80 text-emerald-200 text-[10px] font-mono px-2 py-0.5 rounded-full border border-emerald-700 whitespace-nowrap">
                AES-256 E2E
              </span>
            </div>
            <p className="text-xs text-emerald-100 break-words">
              {t.classroom.subtitle}
            </p>
          </div>
        </div>

        {/* Low-bandwidth audio mode toggle */}
        <div className="flex items-center gap-2 bg-emerald-900/60 p-1.5 rounded-2xl border border-emerald-700/50 shrink-0">
          <Wifi className="w-3.5 h-3.5 text-[#F4A340] shrink-0" />
          <span className="text-[11px] text-emerald-200 font-semibold whitespace-nowrap">{t.classroom.lowBandwidth}:</span>
          <button
            onClick={() => setLowBandwidthMode(!lowBandwidthMode)}
            className={`px-2.5 py-0.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${
              lowBandwidthMode ? 'bg-[#F4A340] text-stone-900' : 'bg-emerald-800 text-emerald-200'
            }`}
          >
            {lowBandwidthMode ? t.classroom.lowBandwidthOn : t.classroom.lowBandwidthOff}
          </button>
        </div>
      </div>

      {/* Main Classroom Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left 2 Cols: Video Tiles & Stage */}
        <div className="lg:col-span-2 space-y-3 min-w-0">
          {/* Main Stage Video Grid */}
          <div className="bg-stone-900 rounded-3xl p-3 sm:p-4 aspect-video flex flex-col justify-between relative overflow-hidden shadow-lg border-2 border-stone-800">
            {/* Top Video Overlay */}
            <div className="flex items-center justify-between z-10 gap-2">
              <span className="inline-flex items-center gap-1.5 bg-black/60 backdrop-blur-xs text-white text-xs px-3 py-1 rounded-full border border-white/10 font-semibold whitespace-nowrap truncate">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
                <span>{t.classroom.liveSessionTag}</span>
              </span>

              {raisedHands.length > 0 && (
                <div className="bg-[#E8734A] text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md animate-bounce whitespace-nowrap truncate max-w-[200px]">
                  <Hand className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{t.classroom.handRaisedTag} ({raisedHands[0]})</span>
                </div>
              )}
            </div>

            {/* Center Video Area */}
            <div className="flex-1 flex items-center justify-center relative my-2">
              {isCameraOn && !lowBandwidthMode ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover rounded-2xl"
                />
              ) : (
                <div className="text-center text-stone-300 p-4 sm:p-6 flex flex-col items-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#1F7A5C] to-[#165A44] border-2 border-[#F4A340] flex items-center justify-center text-3xl sm:text-4xl shadow-xl mb-3 animate-pulse">
                    👩🏽‍🏫
                  </div>
                  <h3 className="font-heading font-extrabold text-white text-sm sm:text-base">
                    Sunita Sharma (Teacher)
                  </h3>
                  <p className="text-xs text-stone-400 max-w-xs mt-1 break-words">
                    {lowBandwidthMode
                      ? t.classroom.audioOnlyNote
                      : t.classroom.videoReadyNote}
                  </p>
                </div>
              )}

              {/* Student Floating Picture-in-Picture / Grid */}
              <div className="absolute bottom-2 right-2 flex gap-2 z-10">
                <div className="w-24 h-20 bg-stone-800/90 backdrop-blur-xs rounded-xl border border-stone-700 flex flex-col items-center justify-center text-center p-1">
                  <span className="text-xl">👦🏽</span>
                  <span className="text-[10px] text-white font-bold truncate max-w-[80px]">
                    Ramesh (Cl.3)
                  </span>
                  <span className="text-[9px] text-emerald-400 whitespace-nowrap">{t.classroom.listening}</span>
                </div>

                <div className="w-24 h-20 bg-stone-800/90 backdrop-blur-xs rounded-xl border border-stone-700 flex flex-col items-center justify-center text-center p-1 hidden sm:flex">
                  <span className="text-xl">👧🏽</span>
                  <span className="text-[10px] text-white font-bold truncate max-w-[80px]">
                    Meera (Cl.2)
                  </span>
                  <span className="text-[9px] text-emerald-400 whitespace-nowrap">{t.classroom.listening}</span>
                </div>
              </div>
            </div>

            {/* Bottom Controls Bar */}
            <div className="flex items-center justify-between z-10 pt-2 border-t border-white/10 gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMicOn(!isMicOn)}
                  className={`p-2 sm:p-2.5 rounded-2xl transition-all cursor-pointer ${
                    isMicOn ? 'bg-stone-800 text-white hover:bg-stone-700' : 'bg-rose-600 text-white'
                  }`}
                  title={isMicOn ? 'Mute Mic' : 'Unmute Mic'}
                >
                  {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => setIsCameraOn(!isCameraOn)}
                  disabled={lowBandwidthMode}
                  className={`p-2 sm:p-2.5 rounded-2xl transition-all cursor-pointer ${
                    isCameraOn ? 'bg-[#1F7A5C] text-white' : 'bg-stone-800 text-white hover:bg-stone-700'
                  }`}
                  title={isCameraOn ? 'Turn Off Camera' : 'Turn On Camera'}
                >
                  {isCameraOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                </button>

                {/* Raise Hand Button */}
                <button
                  onClick={toggleHandRaise}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl font-bold text-xs transition-all cursor-pointer whitespace-nowrap ${
                    handRaised
                      ? 'bg-[#E8734A] text-white ring-2 ring-orange-300'
                      : 'bg-stone-800 text-stone-200 hover:bg-stone-700'
                  }`}
                >
                  <Hand className="w-4 h-4 shrink-0" />
                  <span>{handRaised ? t.classroom.handRaisedBtn : t.classroom.askQuestion}</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert('Classroom session remains active in background.')}
                  className="p-2 sm:p-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white cursor-pointer"
                  title="Leave Classroom"
                >
                  <PhoneOff className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Low-Connectivity Message Chips for Children */}
          <div className="bg-white p-3 rounded-2xl border border-[#F4A340]/25 flex items-center gap-2 overflow-x-auto text-xs font-semibold">
            <span className="text-[#8C7B68] whitespace-nowrap text-[11px] font-bold">
              {t.classroom.oneTapLabel}:
            </span>
            <button
              onClick={() => sendQuickChat(t.classroom.quickChips.present)}
              className="px-2.5 py-1 rounded-xl bg-[#FFF8EE] hover:bg-[#FFEECF] text-[#165A44] border border-[#F4A340]/30 shrink-0 cursor-pointer whitespace-nowrap"
            >
              {t.classroom.quickChips.present}
            </button>
            <button
              onClick={() => sendQuickChat(t.classroom.quickChips.understood)}
              className="px-2.5 py-1 rounded-xl bg-[#FFF8EE] hover:bg-[#FFEECF] text-[#165A44] border border-[#F4A340]/30 shrink-0 cursor-pointer whitespace-nowrap"
            >
              {t.classroom.quickChips.understood}
            </button>
            <button
              onClick={() => sendQuickChat(t.classroom.quickChips.repeat)}
              className="px-2.5 py-1 rounded-xl bg-[#FFF8EE] hover:bg-[#FFEECF] text-[#165A44] border border-[#F4A340]/30 shrink-0 cursor-pointer whitespace-nowrap"
            >
              {t.classroom.quickChips.repeat}
            </button>
            <button
              onClick={() => sendQuickChat(t.classroom.quickChips.answer)}
              className="px-2.5 py-1 rounded-xl bg-[#FFF8EE] hover:bg-[#FFEECF] text-[#165A44] border border-[#F4A340]/30 shrink-0 cursor-pointer whitespace-nowrap"
            >
              {t.classroom.quickChips.answer}
            </button>
          </div>
        </div>

        {/* Right 1 Col: Tabbed Side-Panel for Chat & Assignments */}
        <div className="bg-white rounded-3xl border-2 border-[#F4A340]/30 shadow-xs flex flex-col h-[520px] overflow-hidden min-w-0">
          {/* Panel Header Tabs */}
          <div className="flex border-b border-stone-100 p-2 bg-[#FCF5E8] gap-1">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap truncate ${
                activeTab === 'chat'
                  ? 'bg-white text-[#165A44] shadow-xs'
                  : 'text-[#6D5D4B] hover:text-[#165A44]'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{t.classroom.tabChat(messages.length)}</span>
            </button>

            <button
              onClick={() => setActiveTab('assignments')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap truncate ${
                activeTab === 'assignments'
                  ? 'bg-white text-[#165A44] shadow-xs'
                  : 'text-[#6D5D4B] hover:text-[#165A44]'
              }`}
            >
              <FileText className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{t.classroom.tabClasswork(assignments.length)}</span>
            </button>
          </div>

          {/* Panel Body */}
          {activeTab === 'chat' ? (
            <div className="flex-1 flex flex-col justify-between p-3 overflow-hidden min-w-0">
              {/* Chat Message List */}
              <div className="overflow-y-auto space-y-2.5 pr-1 flex-1">
                <div className="text-center py-1">
                  <span className="text-[10px] text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full inline-flex items-center gap-1 break-words">
                    <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>{t.classroom.encryptionNote}</span>
                  </span>
                </div>

                {messages.map((msg) => {
                  const isMe = msg.senderName === currentUser.name;
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                    >
                      <div className="text-[10px] text-[#8C7B68] px-1 font-semibold break-words">
                        {msg.senderName} ({msg.senderRole}) • {msg.timestamp}
                      </div>
                      <div
                        className={`max-w-[85%] rounded-2xl px-3 py-2 text-xs font-medium mt-0.5 shadow-2xs break-words ${
                          isMe
                            ? 'bg-[#1F7A5C] text-white rounded-tr-xs'
                            : 'bg-[#FFF8EE] text-[#2C2621] border border-[#F4A340]/25 rounded-tl-xs'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="mt-2 pt-2 border-t border-stone-100 flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={t.classroom.chatPlaceholder}
                  className="flex-1 px-3 py-2 text-xs rounded-xl bg-[#FFFDF9] border border-[#F4A340]/30 focus:outline-none focus:ring-2 focus:ring-[#1F7A5C]/40 min-w-0"
                />
                <button
                  type="submit"
                  className="p-2 rounded-xl bg-[#1F7A5C] hover:bg-[#165A44] text-white transition-all cursor-pointer shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          ) : (
            /* Assignments / Classwork Tab */
            <div className="flex-1 flex flex-col justify-between p-3 overflow-hidden min-w-0">
              <div className="overflow-y-auto space-y-2.5 pr-1 flex-1">
                <div className="flex items-center justify-between pb-1 gap-2">
                  <span className="text-xs font-bold text-[#165A44] truncate">
                    {t.classroom.homeworkTitle}
                  </span>
                  <button
                    onClick={() => setShowAddAssignment(!showAddAssignment)}
                    className="text-[11px] font-bold text-[#1F7A5C] flex items-center gap-1 hover:underline cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{t.classroom.newTaskBtn}</span>
                  </button>
                </div>

                {showAddAssignment && (
                  <form onSubmit={handleCreateAssignment} className="bg-[#FFF8EE] p-3 rounded-2xl border border-[#F4A340]/30 space-y-2 text-xs">
                    <input
                      type="text"
                      required
                      value={newAssignmentTitle}
                      onChange={(e) => setNewAssignmentTitle(e.target.value)}
                      placeholder={t.classroom.taskPlaceholder}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-[#F4A340]/30"
                    />
                    <div className="flex items-center justify-between gap-2">
                      <select
                        value={newAssignmentSubject}
                        onChange={(e) => setNewAssignmentSubject(e.target.value)}
                        className="px-2 py-1 rounded-lg bg-white border border-[#F4A340]/30 text-xs"
                      >
                        <option value="math">{t.subjects.math}</option>
                        <option value="reading">{t.teacher.tarlLiteracy}</option>
                        <option value="evs">{t.subjects.evs}</option>
                      </select>
                      <button
                        type="submit"
                        className="px-3 py-1 rounded-lg bg-[#1F7A5C] text-white font-bold cursor-pointer whitespace-nowrap"
                      >
                        {t.classroom.assignBtn}
                      </button>
                    </div>
                  </form>
                )}

                {assignments.map((asg) => (
                  <div
                    key={asg.id}
                    className="bg-[#FFFDF9] border border-[#F4A340]/25 rounded-2xl p-3 text-xs space-y-1 min-w-0"
                  >
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-bold text-[#2C2621] leading-tight break-words">
                        {asg.title}
                      </h4>
                      <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-md bg-[#1F7A5C]/15 text-[#1F7A5C] shrink-0 whitespace-nowrap">
                        {asg.subject}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#7A6A58] break-words">{asg.description}</p>
                    <div className="pt-1 flex flex-wrap items-center justify-between text-[10px] text-[#8C7B68] gap-1">
                      <span className="whitespace-nowrap">{t.classroom.duePrefix} {asg.dueText}</span>
                      <span className="font-semibold text-emerald-700 whitespace-nowrap">
                        {t.classroom.submittedCount(asg.completedCount, asg.totalStudents)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
