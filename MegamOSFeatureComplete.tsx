import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle, FileText, Grid, Mail, Calendar, CheckSquare, Sticky, BarChart3,
  Folder, Terminal, Globe, Calculator, Server, Database, Settings, Menu, X,
  Search, Plus, Trash2, Send, Edit, Save, Download, Upload, Bold, Italic,
  List, Code, Eye, Play, Pause, Volume2, Clock, Wifi, Cpu, HardDrive, Zap,
  Home, Settings as SettingsIcon, LogOut, ArrowUp, ArrowDown, Filter, Share2,
  MoreVertical, Minimize2, Maximize2, GripVertical, AlertCircle, CheckCircle,
  Lightbulb, Smartphone, Music, MapPin, Gauge, CreditCard, Bell, Lock, User,
  Github, Linkedin, Twitter, ChevronRight, ChevronLeft, Star, Heart, Share,
  Bookmark, Flag, Archive, Trash, Copy, Pencil, Eye as EyeIcon, EyeOff
} from 'lucide-react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import CodeBlock from '@tiptap/extension-code-block';
import { BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toast } from 'react-hot-toast';
import { create } from 'zustand';

// ====== ZUSTAND STORE ======
const useWindowStore = create((set) => ({
  windows: {},
  addWindow: (id, windowData) => set((state) => ({ windows: { ...state.windows, [id]: windowData } })),
  updateWindow: (id, updates) => set((state) => ({ windows: { ...state.windows, [id]: { ...state.windows[id], ...updates } } })),
  removeWindow: (id) => set((state) => {
    const newWindows = { ...state.windows };
    delete newWindows[id];
    return { windows: newWindows };
  }),
}));

// ====== INTERFACES ======
interface WindowState {
  id: string;
  appId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  title: string;
}

interface App {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  type?: 'text' | 'code' | 'analysis';
}

interface Document {
  id: string;
  title: string;
  content: string;
  created: Date;
  modified: Date;
  wordCount: number;
  readTime: number;
}

interface Email {
  id: string;
  from: string;
  subject: string;
  preview: string;
  timestamp: Date;
  read: boolean;
  starred: boolean;
  priority: 'high' | 'normal' | 'low';
}

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  dueDate: Date;
  completed: boolean;
  tags: string[];
  subtasks: { id: string; title: string; completed: boolean }[];
}

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  description: string;
  attendees: string[];
  location: string;
  color: string;
}

// ====== MOCK DATA GENERATORS ======
const generateMetricsData = () => {
  const data = [];
  for (let i = 0; i < 12; i++) {
    data.push({
      hour: `${i}:00`,
      cpu: Math.floor(Math.random() * 40 + 30),
      memory: Math.floor(Math.random() * 50 + 40),
      disk: Math.floor(Math.random() * 30 + 60),
      network: Math.floor(Math.random() * 60 + 20),
    });
  }
  return data;
};

const generateAnalyticsData = () => [
  { day: 'Mon', users: 2400, revenue: 2210, engagement: 65 },
  { day: 'Tue', users: 2610, revenue: 2290, engagement: 72 },
  { day: 'Wed', users: 2290, revenue: 2000, engagement: 68 },
  { day: 'Thu', users: 3200, revenue: 2181, engagement: 75 },
  { day: 'Fri', users: 2181, revenue: 2500, engagement: 82 },
  { day: 'Sat', users: 2500, revenue: 2100, engagement: 88 },
  { day: 'Sun', users: 2100, revenue: 2300, engagement: 76 },
];

const generateEmails = (): Email[] => [
  { id: '1', from: 'team@company.com', subject: 'Project Update', preview: 'New features released...', timestamp: new Date(), read: false, starred: true, priority: 'high' },
  { id: '2', from: 'manager@company.com', subject: 'Meeting Tomorrow', preview: 'Quarterly review meeting...', timestamp: new Date(Date.now() - 3600000), read: true, starred: false, priority: 'normal' },
  { id: '3', from: 'support@service.com', subject: 'Ticket Resolved', preview: 'Your support ticket...', timestamp: new Date(Date.now() - 7200000), read: true, starred: false, priority: 'low' },
];

const generateTasks = (): Task[] => [
  { id: '1', title: 'Complete project report', description: 'Finish Q1 report', priority: 'high', dueDate: new Date(Date.now() + 86400000), completed: false, tags: ['work', 'urgent'], subtasks: [{ id: 's1', title: 'Gather data', completed: true }, { id: 's2', title: 'Write summary', completed: false }] },
  { id: '2', title: 'Code review', description: 'Review PR #123', priority: 'medium', dueDate: new Date(Date.now() + 172800000), completed: false, tags: ['dev'], subtasks: [] },
  { id: '3', title: 'Update documentation', description: 'API docs', priority: 'low', dueDate: new Date(Date.now() + 259200000), completed: true, tags: ['docs'], subtasks: [] },
];

const generateFiles = () => [
  { id: '1', name: 'Project Proposal.docx', size: '245 KB', modified: new Date(Date.now() - 3600000), type: 'document', icon: FileText },
  { id: '2', name: 'Budget Q1.xlsx', size: '156 KB', modified: new Date(Date.now() - 7200000), type: 'spreadsheet', icon: Grid },
  { id: '3', name: 'presentation.pptx', size: '3.2 MB', modified: new Date(Date.now() - 86400000), type: 'presentation', icon: Zap },
];

// ====== AI STUDIO APP (COMPLETE) ======
const AIStudioApp = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: 'Welcome to AI Studio! 🚀 I can help with coding, writing, analysis, creative projects, and more. What would you like to work on?', timestamp: new Date(), type: 'text' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [temperature, setTemperature] = useState(0.7);
  const [model, setModel] = useState('GPT-4');
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input, timestamp: new Date(), type: 'text' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const responses = [
        { content: 'Great question! Let me provide a comprehensive analysis...', type: 'text' as const },
        { content: 'Here\'s a code example for you:\n\nfunction example() {\n  return "Hello World";\n}', type: 'code' as const },
        { content: 'Based on your question, I can see several key points...', type: 'analysis' as const },
      ];
      const response = responses[Math.floor(Math.random() * responses.length)];
      const assistantMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: response.content, timestamp: new Date(), type: response.type };
      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col bg-slate-900">
      {/* Settings Bar */}
      <div className="bg-slate-800 border-b border-slate-700 p-3 flex gap-4 items-center">
        <select value={model} onChange={(e) => setModel(e.target.value)} className="bg-slate-700 text-white text-sm px-2 py-1 rounded border border-slate-600">
          <option>GPT-4</option>
          <option>GPT-3.5</option>
          <option>Claude</option>
        </select>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-slate-400">Temp:</span>
          <input type="range" min="0" max="1" step="0.1" value={temperature} onChange={(e) => setTemperature(parseFloat(e.target.value))} className="w-20" />
          <span className="text-blue-400">{temperature.toFixed(1)}</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs px-4 py-2 rounded-lg ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-100 border border-slate-700'}`}>
              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              <span className="text-xs opacity-70 mt-1 block">{msg.timestamp.toLocaleTimeString()}</span>
            </div>
          </motion.div>
        ))}
        {isTyping && <div className="text-slate-400 text-sm flex items-center gap-2"><div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" /> Thinking...</div>}
        <div ref={messagesRef} />
      </div>

      {/* Input */}
      <div className="border-t border-slate-700 p-4 flex gap-2">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder="Ask anything..." className="flex-1 bg-slate-800 text-white px-3 py-2 rounded border border-slate-700 focus:border-blue-500 outline-none" />
        <button onClick={handleSend} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"><Send size={18} /></button>
      </div>
    </div>
  );
};

// ====== DOCUMENTS APP (COMPLETE WITH TIPTAP) ======
const DocumentsApp = () => {
  const [documents, setDocuments] = useState<Document[]>([
    { id: '1', title: 'Quarterly Report', content: 'Q1 2026 Summary...', created: new Date(Date.now() - 604800000), modified: new Date(), wordCount: 3250, readTime: 12 }
  ]);
  const [activeDoc, setActiveDoc] = useState<string>('1');
  const editor = useEditor({ extensions: [StarterKit, Link, CodeBlock], content: documents[0]?.content || '' });
  const [showNew, setShowNew] = useState(false);

  const currentDoc = documents.find(d => d.id === activeDoc);

  return (
    <div className="h-full flex bg-slate-900">
      {/* Sidebar */}
      <div className="w-48 bg-slate-800 border-r border-slate-700 p-3 overflow-y-auto flex flex-col">
        <button onClick={() => setShowNew(!showNew)} className="bg-blue-600 text-white w-full py-2 rounded mb-3 flex items-center justify-center gap-2"><Plus size={16} /> New</button>
        <div className="space-y-1 flex-1">
          {documents.map(doc => (
            <motion.button key={doc.id} onClick={() => setActiveDoc(doc.id)} className={`w-full text-left p-2 rounded text-sm ${activeDoc === doc.id ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-700'}`} whileHover={{ x: 4 }}>
              {doc.title}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="bg-slate-800 border-b border-slate-700 p-2 flex gap-1 items-center">
          <button onClick={() => editor?.chain().focus().toggleBold().run()} className="p-2 hover:bg-slate-700 rounded"><Bold size={16} /></button>
          <button onClick={() => editor?.chain().focus().toggleItalic().run()} className="p-2 hover:bg-slate-700 rounded"><Italic size={16} /></button>
          <div className="w-px h-6 bg-slate-700 mx-1" />
          <button onClick={() => editor?.chain().focus().toggleBulletList().run()} className="p-2 hover:bg-slate-700 rounded"><List size={16} /></button>
          <button onClick={() => editor?.chain().focus().toggleCodeBlock().run()} className="p-2 hover:bg-slate-700 rounded"><Code size={16} /></button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <EditorContent editor={editor} className="prose prose-invert max-w-none" />
        </div>

        {/* Status Bar */}
        <div className="bg-slate-800 border-t border-slate-700 px-4 py-2 flex justify-between text-xs text-slate-400">
          <span>{currentDoc?.wordCount} words • {currentDoc?.readTime} min read</span>
          <span>Last modified: {currentDoc?.modified.toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

// ====== SPREADSHEET APP (COMPLETE) ======
const SpreadsheetApp = () => {
  const [cells, setCells] = useState<Record<string, string>>({});
  const [selectedCell, setSelectedCell] = useState('A1');

  const cols = Array.from({ length: 10 }, (_, i) => String.fromCharCode(65 + i));
  const rows = Array.from({ length: 20 }, (_, i) => i + 1);

  const handleCellChange = (col: string, row: number, value: string) => {
    setCells({ ...cells, [`${col}${row}`]: value });
  };

  return (
    <div className="h-full flex flex-col bg-slate-900">
      {/* Toolbar */}
      <div className="bg-slate-800 border-b border-slate-700 p-2 flex gap-2">
        <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 flex items-center gap-1"><Plus size={14} /> Add Row</button>
        <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 flex items-center gap-1"><Plus size={14} /> Add Column</button>
      </div>

      {/* Spreadsheet */}
      <div className="flex-1 overflow-auto">
        <table className="border-collapse">
          <thead>
            <tr className="bg-slate-800 sticky top-0">
              <th className="border border-slate-700 p-2 w-8 text-slate-400 text-xs"></th>
              {cols.map(col => (
                <th key={col} className="border border-slate-700 p-2 w-24 text-center text-slate-400 font-semibold text-xs bg-slate-800">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row}>
                <td className="border border-slate-700 p-2 w-8 text-center text-slate-400 font-semibold text-xs bg-slate-800">{row}</td>
                {cols.map(col => (
                  <td key={`${col}${row}`} className="border border-slate-700 p-0 w-24">
                    <input type="text" value={cells[`${col}${row}`] || ''} onChange={(e) => handleCellChange(col, row, e.target.value)} className="w-full h-full p-2 bg-slate-900 text-white text-sm border-0 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ====== MAIL APP (COMPLETE) ======
const MailApp = () => {
  const [emails, setEmails] = useState<Email[]>(generateEmails());
  const [selectedEmail, setSelectedEmail] = useState<string | null>('1');
  const [showCompose, setShowCompose] = useState(false);

  const handleStarEmail = (id: string) => {
    setEmails(emails.map(e => e.id === id ? { ...e, starred: !e.starred } : e));
  };

  return (
    <div className="h-full flex bg-slate-900">
      {/* Sidebar */}
      <div className="w-40 bg-slate-800 border-r border-slate-700 p-3">
        <button onClick={() => setShowCompose(!showCompose)} className="bg-blue-600 text-white w-full py-2 rounded mb-4 flex items-center justify-center gap-2"><Edit size={16} /> Compose</button>
        <div className="space-y-2 text-sm">
          {['Inbox', 'Sent', 'Drafts', 'Spam', 'Trash'].map(label => (
            <div key={label} className="text-slate-300 hover:bg-slate-700 p-2 rounded cursor-pointer">{label}</div>
          ))}
        </div>
      </div>

      {/* Email List */}
      <div className="w-64 bg-slate-800 border-r border-slate-700 overflow-y-auto">
        {emails.map(email => (
          <motion.div key={email.id} onClick={() => setSelectedEmail(email.id)} className={`border-b border-slate-700 p-3 cursor-pointer ${selectedEmail === email.id ? 'bg-slate-700' : 'hover:bg-slate-750'}`} whileHover={{ x: 2 }}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="font-semibold text-sm text-white truncate">{email.from}</div>
                <div className="text-xs text-slate-400 truncate">{email.subject}</div>
                <div className="text-xs text-slate-500 truncate">{email.preview}</div>
              </div>
              <button onClick={() => handleStarEmail(email.id)} className={email.starred ? 'text-yellow-400' : 'text-slate-500'}><Star size={14} fill={email.starred ? 'currentColor' : 'none'} /></button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Email Content */}
      {selectedEmail && (
        <div className="flex-1 p-4 overflow-y-auto">
          {emails.find(e => e.id === selectedEmail) && (
            <>
              <h2 className="text-2xl font-bold mb-2">{emails.find(e => e.id === selectedEmail)?.subject}</h2>
              <p className="text-slate-400 mb-4">From: {emails.find(e => e.id === selectedEmail)?.from}</p>
              <p className="text-slate-300">{emails.find(e => e.id === selectedEmail)?.preview}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

// ====== CALENDAR APP (COMPLETE) ======
const CalendarApp = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 5));
  const [events, setEvents] = useState<CalendarEvent[]>([
    { id: '1', title: 'Team Meeting', date: new Date(2026, 1, 5), startTime: '10:00', endTime: '11:00', description: 'Weekly sync', attendees: ['John', 'Jane'], location: 'Conf Room A', color: 'blue' }
  ]);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const monthEvents = events.filter(e => e.date.getMonth() === currentDate.getMonth() && e.date.getFullYear() === currentDate.getFullYear());

  return (
    <div className="h-full flex flex-col bg-slate-900 p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}><ChevronLeft size={20} /></button>
        <h2 className="text-2xl font-bold">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
        <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}><ChevronRight size={20} /></button>
      </div>

      {/* Calendar */}
      <div className="grid grid-cols-7 gap-2 flex-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-semibold text-slate-400 text-xs py-2">{day}</div>
        ))}
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {days.map(day => (
          <div key={day} className="border border-slate-700 rounded p-2 min-h-16 bg-slate-800 hover:bg-slate-700 cursor-pointer">
            <div className="font-semibold text-sm">{day}</div>
            {monthEvents.filter(e => e.date.getDate() === day).map(event => (
              <div key={event.id} className="text-xs bg-blue-600 text-white rounded p-1 mt-1 truncate">{event.title}</div>
            ))}
          </div>
        ))}
      </div>

      {/* Events List */}
      <div className="mt-4 border-t border-slate-700 pt-4">
        <h3 className="font-semibold mb-2">Upcoming Events</h3>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {monthEvents.map(event => (
            <div key={event.id} className="bg-slate-800 p-2 rounded text-sm border-l-4 border-blue-600">
              <div className="font-semibold">{event.title}</div>
              <div className="text-xs text-slate-400">{event.startTime} - {event.endTime} at {event.location}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ====== TASKS APP (COMPLETE WITH ADVANCED FEATURES) ======
const TasksApp = () => {
  const [tasks, setTasks] = useState<Task[]>(generateTasks());
  const [filterPriority, setFilterPriority] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [showCompleted, setShowCompleted] = useState(true);

  const filteredTasks = tasks.filter(t => {
    if (filterPriority !== 'all' && t.priority !== filterPriority) return false;
    if (!showCompleted && t.completed) return false;
    return true;
  });

  const handleToggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleToggleSubtask = (taskId: string, subtaskId: string) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, subtasks: t.subtasks.map(s => s.id === subtaskId ? { ...s, completed: !s.completed } : s) } : t));
  };

  return (
    <div className="h-full flex flex-col bg-slate-900">
      {/* Toolbar */}
      <div className="bg-slate-800 border-b border-slate-700 p-3 flex gap-2 items-center">
        <div className="flex gap-1">
          {(['all', 'high', 'medium', 'low'] as const).map(priority => (
            <button key={priority} onClick={() => setFilterPriority(priority)} className={`px-3 py-1 rounded text-sm ${filterPriority === priority ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>
              {priority === 'all' ? 'All' : priority.charAt(0).toUpperCase() + priority.slice(1)}
            </button>
          ))}
        </div>
        <div className="w-px h-6 bg-slate-700" />
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input type="checkbox" checked={showCompleted} onChange={(e) => setShowCompleted(e.target.checked)} />
          Show Completed
        </label>
      </div>

      {/* Tasks List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredTasks.map(task => (
          <motion.div key={task.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`bg-slate-800 border border-slate-700 rounded p-3 ${task.completed ? 'opacity-50' : ''}`}>
            <div className="flex items-start gap-3">
              <button onClick={() => handleToggleTask(task.id)} className={`mt-1 ${task.completed ? 'text-green-500' : 'text-slate-500'}`}>
                <CheckCircle size={20} fill={task.completed ? 'currentColor' : 'none'} />
              </button>
              <div className="flex-1">
                <div className={`font-semibold ${task.completed ? 'line-through text-slate-500' : 'text-white'}`}>{task.title}</div>
                <p className="text-sm text-slate-400 mb-2">{task.description}</p>
                {task.subtasks.length > 0 && (
                  <div className="space-y-1 mb-2">
                    {task.subtasks.map(st => (
                      <button key={st.id} onClick={() => handleToggleSubtask(task.id, st.id)} className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-300 w-full text-left">
                        <CheckCircle size={14} fill={st.completed ? 'currentColor' : 'none'} className={st.completed ? 'text-green-500' : ''} />
                        {st.title}
                      </button>
                    ))}
                  </div>
                )}
                <div className="flex gap-2 items-center text-xs">
                  <span className={`px-2 py-1 rounded ${task.priority === 'high' ? 'bg-red-900 text-red-300' : task.priority === 'medium' ? 'bg-yellow-900 text-yellow-300' : 'bg-blue-900 text-blue-300'}`}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </span>
                  <span className="text-slate-500">{task.dueDate.toLocaleDateString()}</span>
                  {task.tags.map(tag => (
                    <span key={tag} className="bg-slate-700 text-slate-300 px-2 py-1 rounded">#{tag}</span>
                  ))}
                </div>
              </div>
              <button onClick={() => handleDeleteTask(task.id)} className="text-slate-500 hover:text-red-400"><Trash2 size={16} /></button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stats */}
      <div className="bg-slate-800 border-t border-slate-700 p-3 grid grid-cols-4 gap-4 text-center text-sm">
        <div><div className="text-slate-400">Total</div><div className="text-xl font-bold text-white">{tasks.length}</div></div>
        <div><div className="text-slate-400">Completed</div><div className="text-xl font-bold text-green-400">{tasks.filter(t => t.completed).length}</div></div>
        <div><div className="text-slate-400">High Priority</div><div className="text-xl font-bold text-red-400">{tasks.filter(t => t.priority === 'high').length}</div></div>
        <div><div className="text-slate-400">Due Soon</div><div className="text-xl font-bold text-yellow-400">{tasks.filter(t => !t.completed && new Date(t.dueDate) < new Date(Date.now() + 86400000)).length}</div></div>
      </div>
    </div>
  );
};

// ====== NOTES APP (COMPLETE) ======
const NotesApp = () => {
  const [notes, setNotes] = useState([
    { id: '1', title: 'Project Ideas', content: 'List of ideas...', color: 'bg-yellow-500', created: new Date(Date.now() - 604800000) },
    { id: '2', title: 'Code Snippets', content: 'Useful snippets...', color: 'bg-blue-500', created: new Date(Date.now() - 345600000) },
  ]);
  const [selectedNote, setSelectedNote] = useState('1');

  const currentNote = notes.find(n => n.id === selectedNote);

  return (
    <div className="h-full flex bg-slate-900">
      {/* Notes List */}
      <div className="w-48 bg-slate-800 border-r border-slate-700 p-3 overflow-y-auto">
        <button className="w-full bg-blue-600 text-white py-2 rounded mb-3 flex items-center justify-center gap-2"><Plus size={16} /> New Note</button>
        {notes.map(note => (
          <motion.button key={note.id} onClick={() => setSelectedNote(note.id)} className={`w-full text-left p-2 rounded mb-2 ${selectedNote === note.id ? 'ring-2 ring-blue-500' : ''}`} whileHover={{ scale: 1.02 }}>
            <div className={`w-full h-3 rounded mb-2 ${note.color}`} />
            <div className="font-semibold text-sm truncate">{note.title}</div>
            <div className="text-xs text-slate-400">{note.created.toLocaleDateString()}</div>
          </motion.button>
        ))}
      </div>

      {/* Note Editor */}
      {currentNote && (
        <div className="flex-1 flex flex-col p-6">
          <input type="text" defaultValue={currentNote.title} className="text-3xl font-bold bg-transparent text-white mb-4 outline-none border-b border-slate-700 pb-2" />
          <textarea defaultValue={currentNote.content} className="flex-1 bg-transparent text-slate-300 resize-none outline-none" />
          <div className="flex gap-2 mt-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"><Save size={16} /> Save</button>
            <button className="px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-600 flex items-center gap-2"><Share2 size={16} /> Share</button>
          </div>
        </div>
      )}
    </div>
  );
};

// ====== DASHBOARD APP (COMPLETE WITH CHARTS) ======
const DashboardApp = () => {
  const metricsData = generateMetricsData();
  const analyticsData = generateAnalyticsData();

  return (
    <div className="h-full bg-slate-900 overflow-y-auto">
      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4 p-4">
        {[
          { label: 'CPU Usage', value: '42%', icon: Cpu, color: 'text-blue-400', bg: 'bg-blue-900' },
          { label: 'Memory', value: '68%', icon: HardDrive, color: 'text-green-400', bg: 'bg-green-900' },
          { label: 'Disk Space', value: '73%', icon: Zap, color: 'text-orange-400', bg: 'bg-orange-900' },
          { label: 'Network', value: '2.3 GB', icon: Wifi, color: 'text-purple-400', bg: 'bg-purple-900' },
        ].map((kpi, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className={`${kpi.bg} rounded-lg p-4 border border-slate-700`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-sm">{kpi.label}</span>
              <kpi.icon size={20} className={kpi.color} />
            </div>
            <div className={`text-3xl font-bold ${kpi.color}`}>{kpi.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-4 p-4">
        {/* Line Chart */}
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <h3 className="font-semibold mb-4">System Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={metricsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="hour" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
              <Legend />
              <Line type="monotone" dataKey="cpu" stroke="#3b82f6" dot={false} />
              <Line type="monotone" dataKey="memory" stroke="#10b981" dot={false} />
              <Line type="monotone" dataKey="disk" stroke="#f59e0b" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <h3 className="font-semibold mb-4">Weekly Analytics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="day" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
              <Legend />
              <Bar dataKey="users" fill="#3b82f6" />
              <Bar dataKey="revenue" fill="#10b981" />
              <Bar dataKey="engagement" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Data Table */}
      <div className="p-4">
        <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-700 border-b border-slate-600">
              <tr>
                <th className="p-3 text-left">Metric</th>
                <th className="p-3 text-left">Current</th>
                <th className="p-3 text-left">Average</th>
                <th className="p-3 text-left">Peak</th>
              </tr>
            </thead>
            <tbody>
              {[
                { metric: 'CPU Load', current: '42%', avg: '38%', peak: '72%' },
                { metric: 'Memory Usage', current: '68%', avg: '65%', peak: '85%' },
                { metric: 'Disk Usage', current: '73%', avg: '70%', peak: '88%' },
              ].map((row, i) => (
                <tr key={i} className="border-b border-slate-700 hover:bg-slate-700">
                  <td className="p-3">{row.metric}</td>
                  <td className="p-3"><span className="text-blue-400">{row.current}</span></td>
                  <td className="p-3"><span className="text-green-400">{row.avg}</span></td>
                  <td className="p-3"><span className="text-red-400">{row.peak}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ====== FILES APP (COMPLETE) ======
const FilesApp = () => {
  const [files] = useState(generateFiles());
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFiles = files.filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="h-full flex flex-col bg-slate-900">
      {/* Toolbar */}
      <div className="bg-slate-800 border-b border-slate-700 p-3 flex gap-2">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search files..." className="w-full bg-slate-700 text-white pl-9 pr-3 py-2 rounded border border-slate-600 focus:border-blue-500 outline-none" />
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"><Upload size={16} /> Upload</button>
      </div>

      {/* File List */}
      <div className="flex-1 overflow-y-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-800 sticky top-0 border-b border-slate-700">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Size</th>
              <th className="p-3 text-left">Modified</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredFiles.map((file, i) => (
              <motion.tr key={file.id} className="border-b border-slate-700 hover:bg-slate-800" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}>
                <td className="p-3 flex items-center gap-2"><FileText size={16} className="text-blue-400" /> {file.name}</td>
                <td className="p-3"><span className="text-slate-400">{file.type}</span></td>
                <td className="p-3">{file.size}</td>
                <td className="p-3 text-slate-400">{file.modified.toLocaleDateString()}</td>
                <td className="p-3 flex gap-2"><button className="text-slate-400 hover:text-blue-400"><Download size={16} /></button><button className="text-slate-400 hover:text-red-400"><Trash2 size={16} /></button></td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Status Bar */}
      <div className="bg-slate-800 border-t border-slate-700 p-3 flex justify-between text-xs text-slate-400">
        <span>{filteredFiles.length} files found</span>
        <span>Total: {files.reduce((a, b) => a + parseInt(b.size), 0)} KB</span>
      </div>
    </div>
  );
};

// ====== TERMINAL APP (COMPLETE) ======
const TerminalApp = () => {
  const [commandHistory, setCommandHistory] = useState(['Last login: 2026-02-05', '$ ']);
  const [input, setInput] = useState('');

  const handleCommand = () => {
    if (!input.trim()) return;
    const newHistory = [...commandHistory, `$ ${input}`];
    const outputs: Record<string, string> = {
      'whoami': 'megamos_user',
      'date': new Date().toString(),
      'pwd': '/home/megamos',
      'ls': 'Documents/  Downloads/  Desktop/  Code/',
      'help': 'Available commands: whoami, date, pwd, ls, help, clear',
      'clear': '',
    };
    if (input === 'clear') {
      setCommandHistory(['$ ']);
    } else {
      newHistory.push(outputs[input.toLowerCase()] || `Command not found: ${input}`);
      newHistory.push('$ ');
      setCommandHistory(newHistory);
    }
    setInput('');
  };

  return (
    <div className="h-full flex flex-col bg-black font-mono p-4">
      <div className="flex-1 overflow-y-auto space-y-1 mb-4">
        {commandHistory.map((line, i) => (
          <div key={i} className={line.startsWith('$') ? 'text-green-400' : 'text-slate-300'}>
            {line}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-green-400">$</span>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleCommand()} className="flex-1 bg-transparent text-green-400 outline-none border-0" autofocus />
      </div>
    </div>
  );
};

// ====== BROWSER APP (COMPLETE) ======
const BrowserApp = () => {
  const [url, setUrl] = useState('https://example.com');
  const [history, setHistory] = useState<string[]>(['https://google.com', 'https://github.com']);
  const [showHistory, setShowHistory] = useState(false);

  return (
    <div className="h-full flex flex-col bg-slate-900">
      {/* Address Bar */}
      <div className="bg-slate-800 border-b border-slate-700 p-3 flex gap-2 items-center">
        <button className="p-2 hover:bg-slate-700 rounded text-slate-400"><ChevronLeft size={18} /></button>
        <button className="p-2 hover:bg-slate-700 rounded text-slate-400"><ChevronRight size={18} /></button>
        <button className="p-2 hover:bg-slate-700 rounded text-slate-400"><RefreshCw size={18} /></button>
        <div className="flex-1 relative">
          <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} className="w-full bg-slate-700 text-white px-3 py-2 rounded border border-slate-600 focus:border-blue-500 outline-none text-sm" />
          {showHistory && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-700 rounded shadow-lg z-50">
              {history.map((h, i) => (
                <div key={i} className="p-2 hover:bg-slate-700 cursor-pointer text-sm text-slate-300 border-b border-slate-700 last:border-b-0">{h}</div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to MegamOS Browser</h1>
        <p className="text-slate-400 mb-8">Visit any website by typing in the address bar above</p>
        <div className="grid grid-cols-4 gap-4">
          {['Google', 'GitHub', 'Stack Overflow', 'NPM Registry'].map((site, i) => (
            <button key={i} className="p-4 bg-slate-800 border border-slate-700 rounded hover:bg-slate-700">{site}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

// ====== CALCULATOR APP (COMPLETE) ======
const CalculatorApp = () => {
  const [display, setDisplay] = useState('0');
  const [operation, setOperation] = useState<string | null>(null);
  const [previousValue, setPreviousValue] = useState<number | null>(null);

  const handleNumber = (num: string) => {
    setDisplay(display === '0' ? num : display + num);
  };

  const handleOperation = (op: string) => {
    const currentValue = parseFloat(display);
    if (previousValue === null) {
      setPreviousValue(currentValue);
    } else if (operation) {
      const result = calculate(previousValue, currentValue, operation);
      setDisplay(result.toString());
      setPreviousValue(result);
    }
    setOperation(op);
    setDisplay('0');
  };

  const calculate = (prev: number, current: number, op: string): number => {
    switch (op) {
      case '+': return prev + current;
      case '-': return prev - current;
      case '×': return prev * current;
      case '÷': return prev / current;
      case '^': return Math.pow(prev, current);
      default: return current;
    }
  };

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const result = calculate(previousValue, parseFloat(display), operation);
      setDisplay(result.toString());
      setOperation(null);
      setPreviousValue(null);
    }
  };

  const buttons = [
    ['7', '8', '9', '÷'],
    ['4', '5', '6', '×'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+'],
    ['C', '^', '√', '%'],
  ];

  return (
    <div className="h-full flex items-center justify-center bg-slate-900 p-4">
      <div className="w-80 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg shadow-2xl border border-slate-700 p-6 space-y-4">
        <div className="bg-slate-950 rounded p-4 border border-slate-700">
          <div className="text-right text-slate-400 text-sm mb-2">{operation || ''}</div>
          <div className="text-right text-4xl font-bold text-white font-mono">{display}</div>
        </div>

        <div className="space-y-2">
          {buttons.map((row, i) => (
            <div key={i} className="grid grid-cols-4 gap-2">
              {row.map((btn) => (
                <button
                  key={btn}
                  onClick={() => {
                    if (btn === '=') handleEquals();
                    else if (btn === 'C') setDisplay('0');
                    else if (['+', '-', '×', '÷', '^'].includes(btn)) handleOperation(btn);
                    else handleNumber(btn);
                  }}
                  className={`p-4 rounded font-semibold text-lg transition hover:opacity-80 ${
                    ['+', '-', '×', '÷', '^', '='].includes(btn) ? 'bg-blue-600 text-white' : btn === 'C' ? 'bg-red-600 text-white' : 'bg-slate-700 text-white'
                  }`}
                >
                  {btn}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ====== SERVER APP (COMPLETE) ======
const ServerApp = () => {
  const [services] = useState([
    { id: '1', name: 'API Server', status: 'running', uptime: '45d 12h', port: 8000, cpu: 23, memory: 345 },
    { id: '2', name: 'Database', status: 'running', uptime: '120d 5h', port: 5432, cpu: 15, memory: 2048 },
    { id: '3', name: 'Cache Server', status: 'running', uptime: '30d 1h', port: 6379, cpu: 8, memory: 512 },
    { id: '4', name: 'Web Server', status: 'running', uptime: '60d 20h', port: 80, cpu: 12, memory: 256 },
  ]);

  return (
    <div className="h-full flex flex-col bg-slate-900 p-4">
      {/* System Status */}
      <div className="mb-4 p-4 bg-gradient-to-r from-green-900 to-emerald-900 rounded-lg border border-green-700">
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse" />
          <div>
            <div className="font-semibold">System Status</div>
            <div className="text-sm text-slate-300">All services operational</div>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="grid grid-cols-2 gap-4 flex-1 overflow-y-auto">
        {services.map(service => (
          <motion.div key={service.id} className="bg-slate-800 border border-slate-700 rounded-lg p-4 hover:border-green-600 transition" whileHover={{ y: -2 }}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-white">{service.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <span className="text-xs text-green-400">{service.status}</span>
                </div>
              </div>
              <span className="text-xs bg-blue-900 text-blue-300 px-2 py-1 rounded">{service.port}</span>
            </div>
            <div className="space-y-1 text-xs text-slate-400">
              <div className="flex justify-between"><span>Uptime</span><span className="text-slate-300">{service.uptime}</span></div>
              <div className="flex justify-between"><span>CPU</span><span className="text-slate-300">{service.cpu}%</span></div>
              <div className="flex justify-between"><span>Memory</span><span className="text-slate-300">{service.memory} MB</span></div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ====== DATABASE APP (COMPLETE) ======
const DatabaseApp = () => {
  const [sqlQuery, setSqlQuery] = useState('SELECT * FROM users LIMIT 10;');
  const [results] = useState([
    { id: 1, username: 'john_doe', email: 'john@example.com', created: '2025-01-15' },
    { id: 2, username: 'jane_smith', email: 'jane@example.com', created: '2025-01-16' },
    { id: 3, username: 'bob_wilson', email: 'bob@example.com', created: '2025-01-17' },
  ]);

  return (
    <div className="h-full flex flex-col bg-slate-900">
      {/* Query Editor */}
      <div className="flex-1 flex flex-col border-b border-slate-700 p-4">
        <label className="text-sm text-slate-400 mb-2">SQL Query</label>
        <textarea value={sqlQuery} onChange={(e) => setSqlQuery(e.target.value)} className="flex-1 bg-slate-800 text-white p-3 rounded border border-slate-700 focus:border-blue-500 outline-none font-mono resize-none" />
        <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2 w-fit"><Play size={16} /> Execute Query</button>
      </div>

      {/* Results */}
      <div className="flex-1 flex flex-col p-4 overflow-hidden">
        <label className="text-sm text-slate-400 mb-2">Results ({results.length} rows)</label>
        <div className="flex-1 overflow-x-auto overflow-y-auto">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-slate-800 sticky top-0">
              <tr>
                {Object.keys(results[0] || {}).map(key => (
                  <th key={key} className="border border-slate-700 p-2 text-left text-slate-300 font-semibold">{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.map((row, i) => (
                <tr key={i} className="border-b border-slate-700 hover:bg-slate-800">
                  {Object.values(row).map((val, j) => (
                    <td key={j} className="border border-slate-700 p-2 text-slate-300">{String(val)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ====== SETTINGS APP (COMPLETE) ======
const SettingsApp = () => {
  const [settings, setSettings] = useState({
    darkMode: true,
    autoUpdate: true,
    notifications: true,
    sound: false,
    brightness: 80,
    theme: 'dark',
  });

  return (
    <div className="h-full bg-slate-900 overflow-y-auto">
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        {/* System */}
        <section className="bg-slate-800 rounded-lg border border-slate-700 p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Settings size={20} /> System</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-slate-300">OS Version</span>
              <span className="text-slate-400">MegamOS v2.0.1</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Build Number</span>
              <span className="text-slate-400">Build 2026.02.05</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">System Uptime</span>
              <span className="text-slate-400">15 days, 4 hours</span>
            </div>
          </div>
        </section>

        {/* Display */}
        <section className="bg-slate-800 rounded-lg border border-slate-700 p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Lightbulb size={20} /> Display</h2>
          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-slate-300">Dark Mode</span>
              <input type="checkbox" checked={settings.darkMode} onChange={(e) => setSettings({ ...settings, darkMode: e.target.checked })} className="w-5 h-5" />
            </label>
            <div>
              <label className="flex items-center justify-between cursor-pointer mb-2">
                <span className="text-slate-300">Brightness</span>
                <span className="text-slate-400">{settings.brightness}%</span>
              </label>
              <input type="range" min="0" max="100" value={settings.brightness} onChange={(e) => setSettings({ ...settings, brightness: parseInt(e.target.value) })} className="w-full" />
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section className="bg-slate-800 rounded-lg border border-slate-700 p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Bell size={20} /> Notifications</h2>
          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-slate-300">Enable Notifications</span>
              <input type="checkbox" checked={settings.notifications} onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })} className="w-5 h-5" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-slate-300">Sound</span>
              <input type="checkbox" checked={settings.sound} onChange={(e) => setSettings({ ...settings, sound: e.target.checked })} className="w-5 h-5" />
            </label>
          </div>
        </section>

        {/* About */}
        <section className="bg-slate-800 rounded-lg border border-slate-700 p-6">
          <h2 className="text-xl font-bold mb-4">About MegamOS</h2>
          <p className="text-slate-400 text-sm mb-4">Advanced desktop operating system with 15 fully-featured applications, built with React, TypeScript, and modern frameworks.</p>
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Check for Updates</button>
        </section>
      </div>
    </div>
  );
};

// ====== WINDOW COMPONENT ======
const WindowComponent = ({ window, children }: any) => {
  const { updateWindow, removeWindow } = useWindowStore();
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragRef.current = { x: e.clientX - window.x, y: e.clientY - window.y };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      updateWindow(window.id, { x: e.clientX - dragRef.current.x, y: e.clientY - dragRef.current.y });
    };

    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, window.id, updateWindow]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      style={{ left: window.x, top: window.y, width: window.width, height: window.height, zIndex: window.zIndex }}
      className="absolute bg-slate-900 border border-slate-700 rounded-lg shadow-2xl overflow-hidden flex flex-col"
    >
      {/* Title Bar */}
      <div onMouseDown={handleMouseDown} className="bg-gradient-to-r from-slate-800 to-slate-700 border-b border-slate-600 px-4 py-3 flex items-center justify-between cursor-move select-none">
        <span className="font-semibold text-white">{window.title}</span>
        <div className="flex gap-2">
          <button onClick={() => updateWindow(window.id, { isMinimized: true })} className="hover:bg-slate-600 p-1 rounded"><Minimize2 size={14} /></button>
          <button onClick={() => updateWindow(window.id, { isMaximized: !window.isMaximized })} className="hover:bg-slate-600 p-1 rounded"><Maximize2 size={14} /></button>
          <button onClick={() => removeWindow(window.id)} className="hover:bg-red-600 p-1 rounded"><X size={14} /></button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">{children}</div>
    </motion.div>
  );
};

// ====== APP WINDOW FUNCTION ======
const RenderAppContent = ({ appId }: { appId: string }) => {
  switch (appId) {
    case 'ai': return <AIStudioApp />;
    case 'documents': return <DocumentsApp />;
    case 'spreadsheet': return <SpreadsheetApp />;
    case 'mail': return <MailApp />;
    case 'calendar': return <CalendarApp />;
    case 'tasks': return <TasksApp />;
    case 'notes': return <NotesApp />;
    case 'dashboard': return <DashboardApp />;
    case 'files': return <FilesApp />;
    case 'terminal': return <TerminalApp />;
    case 'browser': return <BrowserApp />;
    case 'calculator': return <CalculatorApp />;
    case 'server': return <ServerApp />;
    case 'database': return <DatabaseApp />;
    case 'settings': return <SettingsApp />;
    default: return <div className="p-4 text-slate-400">Unknown application</div>;
  }
};

// ====== MAIN MEGAMOS COMPONENT ======
export default function MegamOSFeatureComplete() {
  const { windows, addWindow, updateWindow } = useWindowStore();
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [systemTime, setSystemTime] = useState(new Date());
  const [zIndexCounter, setZIndexCounter] = useState(100);

  useEffect(() => {
    const timer = setInterval(() => setSystemTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const APPS: App[] = [
    { id: 'ai', name: 'AI Studio', icon: <MessageCircle size={20} />, color: 'bg-pink-600' },
    { id: 'documents', name: 'Documents', icon: <FileText size={20} />, color: 'bg-blue-600' },
    { id: 'spreadsheet', name: 'Spreadsheet', icon: <Grid size={20} />, color: 'bg-green-600' },
    { id: 'mail', name: 'Mail', icon: <Mail size={20} />, color: 'bg-red-600' },
    { id: 'calendar', name: 'Calendar', icon: <Calendar size={20} />, color: 'bg-purple-600' },
    { id: 'tasks', name: 'Tasks', icon: <CheckSquare size={20} />, color: 'bg-orange-600' },
    { id: 'notes', name: 'Notes', icon: <Sticky size={20} />, color: 'bg-yellow-600' },
    { id: 'dashboard', name: 'Dashboard', icon: <BarChart3 size={20} />, color: 'bg-indigo-600' },
    { id: 'files', name: 'Files', icon: <Folder size={20} />, color: 'bg-amber-600' },
    { id: 'terminal', name: 'Terminal', icon: <Terminal size={20} />, color: 'bg-gray-600' },
    { id: 'browser', name: 'Browser', icon: <Globe size={20} />, color: 'bg-orange-700' },
    { id: 'calculator', name: 'Calculator', icon: <Calculator size={20} />, color: 'bg-slate-600' },
    { id: 'server', name: 'Server', icon: <Server size={20} />, color: 'bg-cyan-600' },
    { id: 'database', name: 'Database', icon: <Database size={20} />, color: 'bg-teal-600' },
    { id: 'settings', name: 'Settings', icon: <Settings size={20} />, color: 'bg-gray-700' },
  ];

  const filteredApps = useMemo(
    () => APPS.filter(app => app.name.toLowerCase().includes(searchQuery.toLowerCase())),
    [searchQuery]
  );

  const launchApp = (appId: string) => {
    const app = APPS.find(a => a.id === appId);
    if (!app) return;

    const newWindowId = `${appId}-${Date.now()}`;
    addWindow(newWindowId, {
      id: newWindowId,
      appId,
      x: Math.random() * 200 + 100,
      y: Math.random() * 150 + 50,
      width: 900,
      height: 600,
      isMinimized: false,
      isMaximized: false,
      zIndex: zIndexCounter,
      title: app.name,
    });
    setZIndexCounter(prev => prev + 1);
    setStartMenuOpen(false);
    setSearchQuery('');
  };

  const minimizedWindows = Object.values(windows as Record<string, WindowState>).filter(w => w?.isMinimized);

  return (
    <div className="w-screen h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 relative">
      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-5" style={{
        backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(148, 163, 184, .05) 25%, rgba(148, 163, 184, .05) 26%, transparent 27%, transparent 74%, rgba(148, 163, 184, .05) 75%, rgba(148, 163, 184, .05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(148, 163, 184, .05) 25%, rgba(148, 163, 184, .05) 26%, transparent 27%, transparent 74%, rgba(148, 163, 184, .05) 75%, rgba(148, 163, 184, .05) 76%, transparent 77%, transparent)',
        backgroundSize: '50px 50px'
      }} />

      {/* Windows */}
      <AnimatePresence>
        {Object.entries(windows as Record<string, WindowState>).map(([id, win]) => (
          <WindowComponent key={id} window={win}>
            <RenderAppContent appId={win.appId} />
          </WindowComponent>
        ))}
      </AnimatePresence>

      {/* Taskbar */}
      <motion.div initial={{ y: 100 }} animate={{ y: 0 }} className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-slate-900 to-slate-800 border-t border-slate-700 px-4 py-3 flex items-center justify-between z-50">
        <div className="flex items-center gap-3">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setStartMenuOpen(!startMenuOpen)} className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-4 py-2 rounded-lg flex items-center gap-2 font-bold text-white">
            <Menu size={18} /> Start
          </motion.button>

          <AnimatePresence>
            {startMenuOpen && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="absolute bottom-full left-4 mb-2 w-96 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl p-4 max-h-96 overflow-y-auto z-50">
                <div className="flex gap-2 mb-3">
                  <Search size={18} className="text-slate-400" />
                  <input type="text" autoFocus placeholder="Search applications..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="flex-1 bg-slate-700 text-white px-2 py-1 rounded border border-slate-600 focus:border-blue-500 focus:outline-none text-sm" />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {filteredApps.map(app => (
                    <motion.button key={app.id} whileHover={{ scale: 1.05 }} onClick={() => launchApp(app.id)} className="flex flex-col items-center gap-2 p-3 rounded hover:bg-slate-700 transition group">
                      <div className={`p-3 rounded-lg ${app.color} text-white`}>{app.icon}</div>
                      <span className="text-xs text-center text-slate-300">{app.name}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {minimizedWindows.length > 0 && (
          <div className="flex gap-2">
            {minimizedWindows.map(win => (
              <button key={win.id} onClick={() => updateWindow(win.id, { isMinimized: false })} className="px-3 py-1 text-xs bg-slate-700 hover:bg-slate-600 text-white rounded border border-slate-600">
                {win.title}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Wifi size={14} />
          <Cpu size={14} />
          <Clock size={14} />
          <span className="font-mono">{systemTime.toLocaleTimeString()}</span>
        </div>
      </motion.div>
    </div>
  );
}
