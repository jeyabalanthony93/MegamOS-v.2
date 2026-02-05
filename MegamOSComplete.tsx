import React, { useState, useRef, useEffect, useCallback, useMemo, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MoreVertical, Maximize2, Minimize2, X, Search, Plus, Trash2, Star, 
  Menu, Settings, LogOut, Clock, Cpu, HardDrive, Wifi, Zap, Home,
  MessageCircle, FileText, Sheet, Mail, Calendar, CheckSquare, Sticky, 
  BarChart3, Folder, Terminal, Globe, Calculator, Server, Database,
  Edit3, Send, Bold, Italic, UnderlineIcon, List, Code, Image, Eye,
  ChevronLeft, ChevronRight, Play, Save, Download, Upload, Filter,
  SortAsc, Trash, AlertCircle, CheckCircle, Clock as ClockIcon,
  Volume2, Volume1, Smartphone, Music, Lightbulb, GitBranch
} from 'lucide-react';
import { useEditor, EditorContent, FloatingMenu, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import CodeBlock from '@tiptap/extension-code-block';
import Table from '@tiptap/extension-table';
import { BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toast } from 'react-hot-toast';
import { create } from 'zustand';

// ====== DATE HELPER FUNCTIONS ======
const formatTime = (date: Date): string => {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

const formatMonth = (date: Date): string => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
};

const formatFullDate = (date: Date): string => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const subtractDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
};

// ====== ZUSTAND STATE MANAGEMENT ======
const useAppStore = create((set) => ({
  windows: {},
  setWindow: (id, data) => set((state) => ({ windows: { ...state.windows, [id]: data } })),
  updateWindow: (id, updates) => set((state) => ({ windows: { ...state.windows, [id]: { ...state.windows[id], ...updates } } })),
  deleteWindow: (id) => set((state) => {
    const { [id]: _, ...rest } = state.windows;
    return { windows: rest };
  }),
}));

// ====== TYPES ======
interface App {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  component: React.ComponentType<AppProps>;
}

interface AppProps {
  windowId: string;
}

interface WindowState {
  id: string;
  appId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  isMinimized: boolean;
  isMaximized: boolean;
  isDragging: boolean;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// ====== PERFORMANCE-OPTIMIZED DATA GENERATORS ======
const generateMetricsData = (minutes: number = 5) => {
  const data = [];
  const now = new Date();
  for (let i = minutes; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 60000);
    data.push({
      time: formatTime(timestamp),
      CPU: Math.floor(Math.random() * 40 + 20),
      Memory: Math.floor(Math.random() * 35 + 25),
      Storage: Math.floor(Math.random() * 20 + 40),
      Network: Math.floor(Math.random() * 30 + 15),
    });
  }
  return data;
};

const generateAnalyticsData = () => [
  { week: 'Mon', Users: 2400, Revenue: 2400, Engagement: 1200 },
  { week: 'Tue', Users: 2210, Revenue: 1398, Engagement: 2210 },
  { week: 'Wed', Users: 2290, Revenue: 9800, Engagement: 2290 },
  { week: 'Thu', Users: 2000, Revenue: 3908, Engagement: 2000 },
  { week: 'Fri', Users: 2181, Revenue: 4800, Engagement: 2181 },
  { week: 'Sat', Users: 2500, Revenue: 3800, Engagement: 2500 },
  { week: 'Sun', Users: 2100, Revenue: 4300, Engagement: 2100 },
];

// ====== AI STUDIO APPLICATION ======
const AIStudioApp = ({ windowId }: AppProps) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: 'Hello! How can I help you today?', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(scrollToBottom, [messages]);

  const handleSend = useCallback(() => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const responses = [
        "That's an interesting question! Let me think about that...",
        "I can help you with that. Here's what I suggest...",
        "Great question! Let me provide you with some insights...",
        "I understand your concern. Here's my analysis...",
        "Excellent point! Here's what I recommend...",
      ];
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000);
  }, [input]);

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, idx) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs px-4 py-2 rounded-lg ${
              msg.role === 'user'
                ? 'bg-pink-600 text-white'
                : 'bg-slate-700 text-slate-100'
            }`}>
              <p className="text-sm">{msg.content}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {msg.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex space-x-2"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 1.4, delay: i * 0.2, repeat: Infinity }}
                className="w-2 h-2 bg-pink-400 rounded-full"
              />
            ))}
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-slate-700 p-4 space-y-2">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 focus:border-pink-500 focus:outline-none"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <Send size={18} />
          </motion.button>
        </div>
        <div className="flex gap-2 text-xs text-slate-400">
          <button className="hover:text-pink-400">💡 Suggest</button>
          <button className="hover:text-pink-400">🎯 Quick tasks</button>
          <button className="hover:text-pink-400">⚙️ Settings</button>
        </div>
      </div>
    </div>
  );
};

// ====== RICH TEXT DOCUMENT EDITOR ======
const DocumentsApp = ({ windowId }: AppProps) => {
  const [title, setTitle] = useState('Untitled Document');
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      CodeBlock,
      Table.configure({ resizable: true }),
    ],
    content: '<p>Start typing your document here...</p>',
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none p-4 bg-slate-800 text-white'
      }
    }
  });

  const wordCount = editor?.getText().split(/\s+/).length || 0;

  const exportDocument = (format: 'txt' | 'html' | 'json') => {
    let content = '';
    if (format === 'txt') content = editor?.getText() || '';
    if (format === 'html') content = editor?.getHTML() || '';
    if (format === 'json') content = JSON.stringify(editor?.getJSON(), null, 2) || '';

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title}.${format}`;
    a.click();
    toast.success(`Exported as ${format.toUpperCase()}`);
  };

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Toolbar */}
      <div className="border-b border-slate-700 p-3 space-y-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-slate-700 text-white px-3 py-2 rounded border border-slate-600 focus:border-blue-500 focus:outline-none text-lg font-bold"
          placeholder="Document Title"
        />
        
        <div className="flex flex-wrap gap-2 items-center">
          <div className="flex gap-1 bg-slate-700 rounded p-1">
            {[
              { icon: Bold, action: () => editor?.chain().focus().toggleBold().run(), active: editor?.isActive('bold') },
              { icon: Italic, action: () => editor?.chain().focus().toggleItalic().run(), active: editor?.isActive('italic') },
              { icon: UnderlineIcon, action: () => editor?.chain().focus().toggleUnderline().run(), active: editor?.isActive('underline') },
            ].map((btn, idx) => (
              <button
                key={idx}
                onClick={btn.action}
                className={`p-2 rounded transition ${btn.active ? 'bg-blue-600' : 'hover:bg-slate-600'}`}
              >
                <btn.icon size={16} />
              </button>
            ))}
          </div>

          <button onClick={() => editor?.chain().focus().toggleBulletList().run()} className="p-2 hover:bg-slate-700 rounded">
            <List size={16} />
          </button>
          
          <button onClick={() => editor?.chain().focus().toggleCodeBlock().run()} className="p-2 hover:bg-slate-700 rounded">
            <Code size={16} />
          </button>

          <div className="flex-1" />
          
          <span className="text-xs text-slate-400">{wordCount} words</span>
          
          <div className="flex gap-1">
            {[
              { label: 'TXT', format: 'txt' as const },
              { label: 'HTML', format: 'html' as const },
              { label: 'JSON', format: 'json' as const },
            ].map(({ label, format }) => (
              <button
                key={label}
                onClick={() => exportDocument(format)}
                className="text-xs bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-y-auto">
        {editor && (
          <>
            <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }} className="bg-slate-700 rounded shadow-lg border border-slate-600">
              <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`p-2 ${editor.isActive('bold') ? 'bg-slate-600' : ''}`}
              >
                <Bold size={16} />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`p-2 ${editor.isActive('italic') ? 'bg-slate-600' : ''}`}
              >
                <Italic size={16} />
              </button>
            </BubbleMenu>
            <EditorContent editor={editor} className="h-full bg-slate-800" />
          </>
        )}
      </div>
    </div>
  );
};

// ====== ADVANCED SPREADSHEET ======
const SpreadsheetApp = ({ windowId }: AppProps) => {
  const [rows, setRows] = useState(Array(10).fill(null).map((_, i) => 
    Array(5).fill(null).map((_, j) => ({ id: `${i}-${j}`, value: `${String.fromCharCode(65 + j)}${i + 1}` }))
  ));
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);

  const updateCell = (row: number, col: number, value: string) => {
    const newRows = rows.map(r => [...r]);
    newRows[row][col].value = value;
    setRows(newRows);
  };

  const addRow = () => setRows([...rows, Array(5).fill(null).map((_, j) => ({ id: `${rows.length}-${j}`, value: '' }))]);
  const addColumn = () => setRows(rows.map(row => [...row, { id: `${row[0].id.split('-')[0]}-${row.length}`, value: '' }]));

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden">
      {/* Toolbar */}
      <div className="border-b border-slate-700 p-3 flex gap-2 bg-slate-800/50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={addRow}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-3 py-2 rounded text-sm"
        >
          <Plus size={16} /> Row
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={addColumn}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded text-sm"
        >
          <Plus size={16} /> Column
        </motion.button>
      </div>

      {/* Spreadsheet Grid */}
      <div className="flex-1 overflow-auto">
        <table className="border-collapse border border-slate-700 bg-slate-800">
          <tbody>
            {rows.map((row, rowIdx) => (
              <tr key={rowIdx} className="border border-slate-700">
                <td className="border border-slate-700 bg-slate-700 text-slate-300 px-2 py-1 w-8 text-center text-xs font-bold">
                  {rowIdx + 1}
                </td>
                {row.map((cell, colIdx) => (
                  <td key={cell.id} className="border border-slate-700">
                    <input
                      type="text"
                      value={cell.value}
                      onChange={(e) => updateCell(rowIdx, colIdx, e.target.value)}
                      onFocus={() => setSelectedCell([rowIdx, colIdx])}
                      className={`w-24 px-2 py-1 bg-slate-700 text-white border-0 focus:outline-none focus:bg-slate-600 ${
                        selectedCell?.[0] === rowIdx && selectedCell?.[1] === colIdx ? 'ring-2 ring-blue-500' : ''
                      }`}
                    />
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

// ====== PROFESSIONAL EMAIL CLIENT ======
const MailApp = ({ windowId }: AppProps) => {
  const [emails] = useState([
    { id: 1, from: 'John Doe', subject: 'Project Update', body: 'Here is the latest status...', unread: true, date: new Date() },
    { id: 2, from: 'Jane Smith', subject: 'Meeting Scheduled', body: 'Meeting is set for 3 PM...', unread: true, date: new Date() },
    { id: 3, from: 'Admin', subject: 'System Alert', body: 'Please review your account...', unread: false, date: new Date() },
  ]);
  const [selectedEmail, setSelectedEmail] = useState(emails[0]);

  return (
    <div className="w-full h-full flex bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Email List */}
      <div className="w-80 border-r border-slate-700 overflow-y-auto bg-slate-800/50">
        {emails.map((email) => (
          <motion.div
            key={email.id}
            onClick={() => setSelectedEmail(email)}
            whileHover={{ x: 4 }}
            className={`p-3 border-b border-slate-700 cursor-pointer transition ${
              selectedEmail.id === email.id ? 'bg-red-900/30 border-l-4 border-red-600' : 'hover:bg-slate-700'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className={`font-semibold text-sm ${email.unread ? 'text-red-300' : 'text-slate-300'}`}>
                  {email.from}
                </p>
                <p className="text-xs text-slate-400 truncate">{email.subject}</p>
              </div>
              {email.unread && <div className="w-2 h-2 bg-red-600 rounded-full mt-1" />}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Email Preview */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-white">{selectedEmail.subject}</h2>
            <p className="text-slate-400 text-sm">From: {selectedEmail.from}</p>
            <p className="text-slate-500 text-xs">{selectedEmail.date.toLocaleString()}</p>
          </div>
          <div className="border-t border-slate-700 pt-4">
            <p className="text-slate-300 leading-relaxed">{selectedEmail.body}</p>
          </div>
          <div className="flex gap-2">
            <motion.button whileHover={{ scale: 1.05 }} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm">
              Reply
            </motion.button>
            <motion.button whileHover={{ scale: 1.05 }} className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded text-sm">
              Forward
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ====== CALENDAR APPLICATION ======
const CalendarApp = ({ windowId }: AppProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const startDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const days = Array(35).fill(null).map((_, i) => {
    if (i < startDay || i >= startDay + daysInMonth) return null;
    return i - startDay + 1;
  });

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => {
            const newDate = new Date(currentDate);
            newDate.setMonth(newDate.getMonth() - 1);
            setCurrentDate(newDate);
          }}
          className="p-2 hover:bg-slate-700 rounded"
        >
          <ChevronLeft size={20} />
        </motion.button>
        <h2 className="text-2xl font-bold">{formatMonth(currentDate)}</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => {
            const newDate = new Date(currentDate);
            newDate.setMonth(newDate.getMonth() + 1);
            setCurrentDate(newDate);
          }}
          className="p-2 hover:bg-slate-700 rounded"
        >
          <ChevronRight size={20} />
        </motion.button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 mb-6">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center font-bold text-sm text-slate-400 py-2">
            {day}
          </div>
        ))}
        {days.map((day, idx) => (
          <motion.div
            key={idx}
            onClick={() => {
              if (day) {
                const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                setSelectedDate(newDate);
              }
            }}
            whileHover={day ? { scale: 1.05 } : {}}
            className={`p-3 rounded text-center cursor-pointer transition ${
              day
                ? selectedDate?.getDate() === day && selectedDate?.getMonth() === currentDate.getMonth()
                  ? 'bg-purple-600'
                  : 'bg-slate-700 hover:bg-slate-600'
                : 'bg-slate-800'
            }`}
          >
            {day && <span className="text-sm">{day}</span>}
          </motion.div>
        ))}
      </div>

      {/* Selected Date */}
      {selectedDate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-slate-700 p-4 rounded space-y-2"
        >
          <p className="font-bold text-purple-300">Selected: {formatFullDate(selectedDate)}</p>
          <button className="text-sm bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded">Add Event</button>
        </motion.div>
      )}
    </div>
  );
};

// ====== TASK MANAGEMENT APP ======
const TasksApp = ({ windowId }: AppProps) => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Complete project', priority: 'high', done: false, dueDate: addDays(new Date(), 1) },
    { id: 2, title: 'Review documents', priority: 'medium', done: false, dueDate: addDays(new Date(), 2) },
    { id: 3, title: 'Team meeting', priority: 'low', done: true, dueDate: new Date() },
  ]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, {
        id: Date.now(),
        title: newTask,
        priority: 'medium',
        done: false,
        dueDate: addDays(new Date(), 1)
      }]);
      setNewTask('');
      toast.success('Task added!');
    }
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-slate-900 to-slate-800 p-4 space-y-4">
      {/* Add Task */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
          placeholder="Add a new task..."
          className="flex-1 bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 focus:border-orange-500 focus:outline-none"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={addTask}
          className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded"
        >
          <Plus size={20} />
        </motion.button>
      </div>

      {/* Tasks List */}
      <div className="flex-1 overflow-y-auto space-y-2">
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            layout
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-slate-700 p-3 rounded flex items-center gap-3 group hover:bg-slate-600 transition"
          >
            <input
              type="checkbox"
              checked={task.done}
              onChange={(e) => setTasks(tasks.map(t => t.id === task.id ? { ...t, done: e.target.checked } : t))}
              className="w-5 h-5 rounded cursor-pointer accent-orange-600"
            />
            <div className="flex-1">
              <p className={`text-sm ${task.done ? 'line-through text-slate-400' : 'text-white'}`}>
                {task.title}
              </p>
              <p className="text-xs text-slate-400">{task.dueDate.fromNow()}</p>
            </div>
            <span className={`text-xs px-2 py-1 rounded ${
              task.priority === 'high' ? 'bg-red-900 text-red-200' :
              task.priority === 'medium' ? 'bg-yellow-900 text-yellow-200' :
              'bg-green-900 text-green-200'
            }`}>
              {task.priority}
            </span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={() => deleteTask(task.id)}
              className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-600/50 rounded transition"
            >
              <Trash2 size={16} />
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ====== NOTES APP ======
const NotesApp = ({ windowId }: AppProps) => {
  const [notes, setNotes] = useState([
    { id: 1, title: 'Quick Ideas', content: 'Brainstorm new features...', date: new Date() }
  ]);
  const [selectedNote, setSelectedNote] = useState(notes[0]);
  const [content, setContent] = useState(selectedNote.content);

  const updateNote = () => {
    setNotes(notes.map(n => n.id === selectedNote.id ? { ...n, content } : n));
    toast.success('Note saved!');
  };

  return (
    <div className="w-full h-full flex bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Notes List */}
      <div className="w-72 border-r border-slate-700 overflow-y-auto bg-slate-800/50 p-3 space-y-2">
        {notes.map((note) => (
          <motion.div
            key={note.id}
            onClick={() => {
              setSelectedNote(note);
              setContent(note.content);
            }}
            whileHover={{ x: 4 }}
            className={`p-3 rounded cursor-pointer transition ${
              selectedNote.id === note.id ? 'bg-yellow-900/30 border-l-4 border-yellow-600' : 'hover:bg-slate-700'
            }`}
          >
            <p className="font-semibold text-sm text-white truncate">{note.title}</p>
            <p className="text-xs text-slate-400">{note.date.toLocaleDateString()}</p>
          </motion.div>
        ))}
      </div>

      {/* Note Editor */}
      <div className="flex-1 p-4 flex flex-col">
        <input
          type="text"
          value={selectedNote.title}
          onChange={(e) => setSelectedNote({ ...selectedNote, title: e.target.value })}
          className="text-2xl font-bold bg-transparent border-0 focus:outline-none text-white mb-4 pb-2 border-b border-slate-700"
          placeholder="Note Title"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-1 bg-transparent border-0 focus:outline-none text-white resize-none"
          placeholder="Start typing..."
        />
        <div className="flex gap-2 pt-4 border-t border-slate-700">
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={updateNote}
            className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded text-sm flex items-center gap-2"
          >
            <Save size={16} /> Save
          </motion.button>
        </div>
      </div>
    </div>
  );
};

// ====== ADVANCED DASHBOARD WITH REAL-TIME ANALYTICS ======
const DashboardApp = ({ windowId }: AppProps) => {
  const [metricsData, setMetricsData] = useState(generateMetricsData);
  const [analyticsData] = useState(generateAnalyticsData);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetricsData(prev => {
        const updated = [...prev.slice(1), {
          time: formatTime(new Date()),
          CPU: Math.floor(Math.random() * 40 + 20),
          Memory: Math.floor(Math.random() * 35 + 25),
          Storage: Math.floor(Math.random() * 20 + 40),
          Network: Math.floor(Math.random() * 30 + 15),
        }];
        return updated;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const kpis = useMemo(() => [
    { label: 'CPU Usage', value: metricsData[metricsData.length - 1]?.CPU || 0, unit: '%', icon: Cpu, color: 'text-red-400' },
    { label: 'Memory', value: metricsData[metricsData.length - 1]?.Memory || 0, unit: '%', icon: HardDrive, color: 'text-blue-400' },
    { label: 'Storage', value: metricsData[metricsData.length - 1]?.Storage || 0, unit: '%', icon: Zap, color: 'text-yellow-400' },
    { label: 'Network', value: metricsData[metricsData.length - 1]?.Network || 0, unit: 'Mbps', icon: Wifi, color: 'text-green-400' },
  ], [metricsData]);

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-slate-900 to-slate-800 p-4 gap-4 overflow-y-auto">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3">
        {kpis.map((kpi, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-slate-700 p-4 rounded-lg border border-slate-600"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-slate-400">{kpi.label}</p>
                <p className={`text-2xl font-bold ${kpi.color}`}>
                  {kpi.value}{kpi.unit}
                </p>
              </div>
              <kpi.icon className={kpi.color} size={28} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-slate-700 p-4 rounded-lg border border-slate-600 flex-1 min-h-0"
      >
        <h3 className="text-sm font-bold text-slate-300 mb-3">System Metrics (5 min)</h3>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={metricsData}>
            <defs>
              <linearGradient id="colorCPU" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis dataKey="time" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
            <Area type="monotone" dataKey="CPU" stroke="#ef4444" fillOpacity={1} fill="url(#colorCPU)" />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Analytics Chart */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-slate-700 p-4 rounded-lg border border-slate-600 flex-1 min-h-0"
      >
        <h3 className="text-sm font-bold text-slate-300 mb-3">Weekly Analytics</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={analyticsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis dataKey="week" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
            <Legend />
            <Bar dataKey="Users" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

// ====== FILE MANAGER ======
const FilesApp = ({ windowId }: AppProps) => {
  const [files] = useState([
    { id: 1, name: 'Project.docx', size: '2.4 MB', modified: subtractDays(new Date(), 1), type: 'document' },
    { id: 2, name: 'Spreadsheet.xlsx', size: '1.8 MB', modified: subtractDays(new Date(), 2), type: 'spreadsheet' },
    { id: 3, name: 'Presentation.pptx', size: '5.2 MB', modified: subtractDays(new Date(), 3), type: 'presentation' },
    { id: 4, name: 'Image.png', size: '3.1 MB', modified: subtractDays(new Date(), 4), type: 'image' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFiles = files.filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Toolbar */}
      <div className="border-b border-slate-700 p-4 flex gap-2 items-center bg-slate-800/50">
        <Search size={18} className="text-slate-400" />
        <input
          type="text"
          placeholder="Search files..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 bg-slate-700 text-white px-3 py-2 rounded border border-slate-600 focus:border-amber-500 focus:outline-none"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="p-2 hover:bg-slate-700 rounded"
        >
          <Upload size={18} />
        </motion.button>
      </div>

      {/* Files List */}
      <div className="flex-1 overflow-y-auto">
        {filteredFiles.map((file) => (
          <motion.div
            key={file.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="border-b border-slate-700 p-4 flex items-center justify-between hover:bg-slate-700/50 transition"
          >
            <div className="flex items-center gap-3 flex-1">
              <FileText className="text-amber-400" size={24} />
              <div className="flex-1">
                <p className="font-semibold text-white text-sm">{file.name}</p>
                <p className="text-xs text-slate-400">{file.size} • {file.modified.fromNow()}</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="p-2 hover:bg-slate-600 rounded opacity-0 hover:opacity-100"
            >
              <Download size={16} />
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ====== TERMINAL EMULATOR ======
const TerminalApp = ({ windowId }: AppProps) => {
  const [history, setHistory] = useState<string[]>([
    '$ npm run dev',
    '> vite ready in 586ms',
    '> Local: http://localhost:3000/',
    '$ '
  ]);
  const [input, setInput] = useState('');

  const executeCommand = () => {
    if (!input.trim()) return;
    setHistory(prev => [...prev.slice(0, -1), `$ ${input}`, '> Command executed successfully', '$ ']);
    setInput('');
  };

  return (
    <div className="w-full h-full flex flex-col bg-black font-mono p-4 overflow-hidden">
      <div className="flex-1 overflow-y-auto space-y-1 mb-4">
        {history.map((line, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={line.startsWith('$') ? 'text-cyan-400' : 'text-green-400'}
          >
            {line}
          </motion.div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-cyan-400">$ </span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && executeCommand()}
          autoFocus
          className="flex-1 bg-black text-cyan-400 border-0 focus:outline-none caret-cyan-400"
          spellCheck={false}
        />
      </div>
    </div>
  );
};

// ====== WEB BROWSER ======
const BrowserApp = ({ windowId }: AppProps) => {
  const [url, setUrl] = useState('https://example.com');
  const [displayUrl, setDisplayUrl] = useState(url);

  const navigate = () => setDisplayUrl(url);

  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* Address Bar */}
      <div className="border-b border-gray-300 p-3 flex gap-2 items-center bg-gray-100">
        <motion.button whileHover={{ scale: 1.05 }} className="p-2 hover:bg-gray-200 rounded">
          <ChevronLeft size={18} />
        </motion.button>
        <motion.button whileHover={{ scale: 1.05 }} className="p-2 hover:bg-gray-200 rounded">
          <ChevronRight size={18} />
        </motion.button>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && navigate()}
          className="flex-1 bg-white px-3 py-2 rounded border border-gray-300 focus:border-blue-500 focus:outline-none text-sm"
          placeholder="Enter URL..."
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={navigate}
          className="p-2 hover:bg-gray-200 rounded"
        >
          <Play size={18} />
        </motion.button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-8 text-gray-800">
        <h1 className="text-3xl font-bold mb-4">{displayUrl}</h1>
        <p className="text-gray-600 mb-4">This is a browser simulation. Enter a URL to navigate.</p>
        <div className="space-y-4 text-sm">
          <p><strong>URL:</strong> {displayUrl}</p>
          <p><strong>Status:</strong> Page loaded successfully</p>
          <p><strong>Encoding:</strong> UTF-8</p>
          <p><strong>JavaScript:</strong> Enabled</p>
        </div>
      </div>
    </div>
  );
};

// ====== CALCULATOR ======
const CalculatorApp = ({ windowId }: AppProps) => {
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
      case '*': return prev * current;
      case '/': return prev / current;
      default: return current;
    }
  };

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const result = calculate(previousValue, parseFloat(display), operation);
      setDisplay(result.toString());
      setPreviousValue(null);
      setOperation(null);
    }
  };

  const buttons = [
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+'],
  ];

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-slate-900 to-slate-800 p-4 gap-4">
      <input
        type="text"
        value={display}
        readOnly
        className="text-right text-4xl font-bold bg-slate-700 text-white px-4 py-4 rounded border border-slate-600"
      />
      
      <div className="grid grid-cols-4 gap-2 flex-1">
        {buttons.flat().map((btn) => (
          <motion.button
            key={btn}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (btn === '=') handleEquals();
              else if (['+', '-', '*', '/'].includes(btn)) handleOperation(btn);
              else handleNumber(btn);
            }}
            className={`rounded font-bold text-white transition ${
              btn === '=' ? 'bg-slate-600 hover:bg-slate-700' :
              ['+', '-', '*', '/'].includes(btn) ? 'bg-slate-700 hover:bg-slate-600' :
              'bg-slate-800 hover:bg-slate-700'
            }`}
          >
            {btn}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

// ====== SERVER MONITORING ======
const ServerApp = ({ windowId }: AppProps) => {
  const [isRunning, setIsRunning] = useState(true);

  const services = [
    { name: 'Frontend Server', status: 'running', port: 3000, uptime: '2d 14h 23m' },
    { name: 'Backend API', status: 'running', port: 8000, uptime: '2d 10h 15m' },
    { name: 'Database', status: 'running', port: 5432, uptime: '30d 5h 42m' },
    { name: 'Cache Server', status: 'running', port: 6379, uptime: '5d 8h 30m' },
  ];

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-slate-900 to-slate-800 p-4 gap-4">
      {/* Status Header */}
      <div className="bg-slate-700 p-4 rounded flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">System Status</p>
          <div className="flex items-center gap-2 mt-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`w-3 h-3 rounded-full ${isRunning ? 'bg-green-500' : 'bg-red-500'}`}
            />
            <p className="font-bold text-white">{isRunning ? 'Online' : 'Offline'}</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => setIsRunning(!isRunning)}
          className={`px-4 py-2 rounded font-semibold ${isRunning ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
        >
          {isRunning ? 'Stop' : 'Start'}
        </motion.button>
      </div>

      {/* Services List */}
      <div className="flex-1 overflow-y-auto space-y-2">
        {services.map((service, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-slate-700 p-4 rounded border border-slate-600"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-white">{service.name}</p>
                <p className="text-xs text-slate-400">Port: {service.port} • Uptime: {service.uptime}</p>
              </div>
              <span className="bg-green-900 text-green-200 text-xs px-2 py-1 rounded">{service.status}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ====== DATABASE MANAGER ======
const DatabaseApp = ({ windowId }: AppProps) => {
  const [query, setQuery] = useState('SELECT * FROM users WHERE status = "active";');
  const [results, setResults] = useState([
    { id: 1, name: 'John Doe', status: 'active', created: '2024-01-15' },
    { id: 2, name: 'Jane Smith', status: 'active', created: '2024-01-20' },
    { id: 3, name: 'Bob Johnson', status: 'inactive', created: '2024-02-01' },
  ]);

  const executeQuery = () => {
    toast.success('Query executed successfully!');
  };

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-slate-900 to-slate-800 gap-3 p-3">
      {/* Query Editor */}
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="h-32 bg-slate-700 text-white px-3 py-2 rounded border border-slate-600 focus:border-teal-500 focus:outline-none font-mono text-sm resize-none"
      />

      <motion.button
        whileHover={{ scale: 1.05 }}
        onClick={executeQuery}
        className="bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded font-semibold text-sm"
      >
        Execute Query
      </motion.button>

      {/* Results Table */}
      <div className="flex-1 overflow-auto bg-slate-700 rounded border border-slate-600">
        <table className="w-full text-sm">
          <thead className="bg-slate-600 sticky top-0">
            <tr>
              <th className="px-4 py-2 text-left text-slate-300">ID</th>
              <th className="px-4 py-2 text-left text-slate-300">Name</th>
              <th className="px-4 py-2 text-left text-slate-300">Status</th>
              <th className="px-4 py-2 text-left text-slate-300">Created</th>
            </tr>
          </thead>
          <tbody>
            {results.map((row, idx) => (
              <tr key={idx} className="border-t border-slate-600 hover:bg-slate-600/50">
                <td className="px-4 py-2">{row.id}</td>
                <td className="px-4 py-2">{row.name}</td>
                <td className="px-4 py-2">
                  <span className={`text-xs px-2 py-1 rounded ${
                    row.status === 'active' ? 'bg-green-900 text-green-200' : 'bg-gray-900 text-gray-200'
                  }`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-slate-400">{row.created}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ====== SETTINGS APPLICATION ======
const SettingsApp = ({ windowId }: AppProps) => {
  const [settings, setSettings] = useState({
    darkMode: true,
    autoUpdate: true,
    notifications: true,
    soundEnabled: true,
    performanceMode: 'balanced',
  });

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-slate-900 to-slate-800 p-4 overflow-y-auto space-y-4">
      {/* Theme Settings */}
      <div className="bg-slate-700 p-4 rounded space-y-3">
        <h3 className="font-bold text-white text-sm">Appearance</h3>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={settings.darkMode}
            onChange={(e) => setSettings({...settings, darkMode: e.target.checked})}
            className="w-4 h-4 accent-gray-400"
          />
          <span className="text-sm text-slate-300">Dark Mode</span>
        </label>
      </div>

      {/* System Settings */}
      <div className="bg-slate-700 p-4 rounded space-y-3">
        <h3 className="font-bold text-white text-sm">System</h3>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={settings.autoUpdate}
            onChange={(e) => setSettings({...settings, autoUpdate: e.target.checked})}
            className="w-4 h-4 accent-gray-400"
          />
          <span className="text-sm text-slate-300">Auto-update Applications</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={settings.notifications}
            onChange={(e) => setSettings({...settings, notifications: e.target.checked})}
            className="w-4 h-4 accent-gray-400"
          />
          <span className="text-sm text-slate-300">Enable Notifications</span>
        </label>
      </div>

      {/* Audio Settings */}
      <div className="bg-slate-700 p-4 rounded space-y-3">
        <h3 className="font-bold text-white text-sm">Audio</h3>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={settings.soundEnabled}
            onChange={(e) => setSettings({...settings, soundEnabled: e.target.checked})}
            className="w-4 h-4 accent-gray-400"
          />
          <span className="text-sm text-slate-300">Sound Effects</span>
        </label>
      </div>

      {/* Performance */}
      <div className="bg-slate-700 p-4 rounded space-y-3">
        <h3 className="font-bold text-white text-sm">Performance</h3>
        <select
          value={settings.performanceMode}
          onChange={(e) => setSettings({...settings, performanceMode: e.target.value})}
          className="w-full bg-slate-600 text-white px-3 py-2 rounded border border-slate-500 focus:outline-none"
        >
          <option value="power-saver">Power Saver</option>
          <option value="balanced">Balanced</option>
          <option value="performance">Performance</option>
        </select>
      </div>

      {/* About */}
      <div className="bg-slate-700 p-4 rounded space-y-2 mt-auto">
        <h3 className="font-bold text-white text-sm">About</h3>
        <p className="text-xs text-slate-400">MegamOS v2.0 Complete Edition</p>
        <p className="text-xs text-slate-400">© 2026 MegamOS Development</p>
      </div>
    </div>
  );
};

// ====== WINDOW MANAGER COMPONENT ======
const AppWindow = ({ windowId, app }: { windowId: string; app: App }) => {
  const windows = useAppStore((state) => state.windows);
  const updateWindow = useAppStore((state) => state.updateWindow);
  const deleteWindow = useAppStore((state) => state.deleteWindow);
  const dragRef = useRef<HTMLDivElement>(null);

  const windowState = windows[windowId] as WindowState;

  const handleDragStart = (e: React.MouseEvent) => {
    const startX = e.clientX - windowState.x;
    const startY = e.clientY - windowState.y;

    const handleDragMove = (moveEvent: MouseEvent) => {
      updateWindow(windowId, {
        x: moveEvent.clientX - startX,
        y: moveEvent.clientY - startY,
      });
    };

    const handleDragEnd = () => {
      document.removeEventListener('mousemove', handleDragMove);
      document.removeEventListener('mouseup', handleDragEnd);
    };

    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);
  };

  if (windowState.isMinimized) return null;

  const AppComponent = app.component;

  return (
    <motion.div
      ref={dragRef}
      layout
      style={{
        position: 'absolute',
        left: `${windowState.x}px`,
        top: `${windowState.y}px`,
        width: `${windowState.width}px`,
        height: `${windowState.height}px`,
        zIndex: windowState.zIndex,
      }}
      className="bg-slate-800 rounded-lg shadow-2xl border border-slate-700 overflow-hidden flex flex-col"
    >
      {/* Title Bar */}
      <div
        onMouseDown={handleDragStart}
        onClick={() => updateWindow(windowId, { zIndex: 1000 })}
        className={`flex items-center justify-between p-3 cursor-move ${app.color} bg-opacity-20 border-b border-slate-700`}
      >
        <div className="flex items-center gap-2">
          {app.icon}
          <span className="font-semibold text-sm text-white">{app.name}</span>
        </div>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => updateWindow(windowId, { isMaximized: !windowState.isMaximized })}
            className="p-1 hover:bg-slate-600 rounded"
          >
            {windowState.isMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => deleteWindow(windowId)}
            className="p-1 hover:bg-red-600 rounded"
          >
            <X size={16} />
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <AppComponent windowId={windowId} />
      </div>
    </motion.div>
  );
};

// ====== MAIN APPLICATION COMPONENT ======
const APPS: App[] = [
  { id: 'ai', name: 'AI Studio', icon: <MessageCircle size={18} />, color: 'text-pink-400', component: AIStudioApp },
  { id: 'docs', name: 'Documents', icon: <FileText size={18} />, color: 'text-blue-400', component: DocumentsApp },
  { id: 'sheet', name: 'Spreadsheet', icon: <Sheet size={18} />, color: 'text-green-400', component: SpreadsheetApp },
  { id: 'mail', name: 'Mail', icon: <Mail size={18} />, color: 'text-red-400', component: MailApp },
  { id: 'calendar', name: 'Calendar', icon: <Calendar size={18} />, color: 'text-purple-400', component: CalendarApp },
  { id: 'tasks', name: 'Tasks', icon: <CheckSquare size={18} />, color: 'text-orange-400', component: TasksApp },
  { id: 'notes', name: 'Notes', icon: <Sticky size={18} />, color: 'text-yellow-400', component: NotesApp },
  { id: 'dashboard', name: 'Dashboard', icon: <BarChart3 size={18} />, color: 'text-indigo-400', component: DashboardApp },
  { id: 'files', name: 'Files', icon: <Folder size={18} />, color: 'text-amber-400', component: FilesApp },
  { id: 'terminal', name: 'Terminal', icon: <Terminal size={18} />, color: 'text-gray-400', component: TerminalApp },
  { id: 'browser', name: 'Browser', icon: <Globe size={18} />, color: 'text-orange-600', component: BrowserApp },
  { id: 'calc', name: 'Calculator', icon: <Calculator size={18} />, color: 'text-slate-400', component: CalculatorApp },
  { id: 'server', name: 'Server', icon: <Server size={18} />, color: 'text-cyan-400', component: ServerApp },
  { id: 'database', name: 'Database', icon: <Database size={18} />, color: 'text-teal-400', component: DatabaseApp },
  { id: 'settings', name: 'Settings', icon: <Settings size={18} />, color: 'text-gray-400', component: SettingsApp },
];

export default function MegamOSComplete() {
  const windows = useAppStore((state) => state.windows);
  const setWindow = useAppStore((state) => state.setWindow);
  const updateWindow = useAppStore((state) => state.updateWindow);
  const deleteWindow = useAppStore((state) => state.deleteWindow);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [systemTime, setSystemTime] = useState(new Date());
  const [zIndexCounter, setZIndexCounter] = useState(100);

  useEffect(() => {
    const timer = setInterval(() => setSystemTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredApps = useMemo(() => 
    APPS.filter(app => app.name.toLowerCase().includes(searchQuery.toLowerCase())),
    [searchQuery]
  );

  const launchApp = useCallback((appId: string) => {
    const app = APPS.find(a => a.id === appId);
    if (!app) return;

    const newWindowId = `${appId}-${Date.now()}`;
    const randomX = Math.random() * 300;
    const randomY = Math.random() * 300;

    setWindow(newWindowId, {
      id: newWindowId,
      appId,
      x: randomX,
      y: randomY,
      width: 800,
      height: 600,
      zIndex: zIndexCounter,
      isMinimized: false,
      isMaximized: false,
      isDragging: false,
    });

    setZIndexCounter(prev => prev + 1);
    setShowStartMenu(false);
    setSearchQuery('');
    toast.success(`${app.name} launched!`);
  }, [setWindow, zIndexCounter]);

  const minimizedApps = Object.values(windows as Record<string, WindowState>).filter(w => w?.isMinimized);

  return (
    <div className="w-screen h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 relative">
      {/* Background Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(148, 163, 184, .05) 25%, rgba(148, 163, 184, .05) 26%, transparent 27%, transparent 74%, rgba(148, 163, 184, .05) 75%, rgba(148, 163, 184, .05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(148, 163, 184, .05) 25%, rgba(148, 163, 184, .05) 26%, transparent 27%, transparent 74%, rgba(148, 163, 184, .05) 75%, rgba(148, 163, 184, .05) 76%, transparent 77%, transparent)',
          backgroundSize: '50px 50px'
        }}
      />

      {/* Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-5" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, black 0px, black 1px, transparent 1px, transparent 2px)'
      }} />

      {/* Windows */}
      <AnimatePresence>
        {Object.entries(windows as Record<string, WindowState>).map(([windowId, windowState]) => {
          const app = APPS.find(a => a.id === windowState?.appId);
          if (!app) return null;
          return <AppWindow key={windowId} windowId={windowId} app={app} />;
        })}
      </AnimatePresence>

      {/* Taskbar */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-slate-900 to-slate-800 border-t border-slate-700 px-4 py-3 flex items-center justify-between z-50"
      >
        {/* Start Menu Button */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowStartMenu(!showStartMenu)}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-4 py-2 rounded-lg flex items-center gap-2 font-bold text-sm"
          >
            <Menu size={18} /> Start
          </motion.button>

          {/* Start Menu Dropdown */}
          <AnimatePresence>
            {showStartMenu && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-full left-0 mb-2 w-80 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl p-4 space-y-3 max-h-96 overflow-y-auto"
              >
                <div className="flex gap-2 mb-3">
                  <Search size={18} className="text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search applications..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="flex-1 bg-slate-700 text-white px-2 py-1 rounded border border-slate-600 focus:border-blue-500 focus:outline-none text-sm"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {filteredApps.map((app) => (
                    <motion.button
                      key={app.id}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => launchApp(app.id)}
                      className="flex flex-col items-center gap-1 p-3 rounded hover:bg-slate-700 transition group"
                    >
                      <div className={`p-2 rounded-lg ${app.color} bg-opacity-20 group-hover:bg-opacity-30 transition`}>
                        {app.icon}
                      </div>
                      <span className="text-xs text-center text-slate-300 group-hover:text-white transition">{app.name}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* App Icons */}
        <div className="flex gap-2">
          {APPS.slice(0, 5).map((app) => (
            <motion.button
              key={app.id}
              whileHover={{ scale: 1.15, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => launchApp(app.id)}
              title={app.name}
              className={`p-2 rounded-lg ${app.color} bg-opacity-10 hover:bg-opacity-20 transition border border-slate-700 hover:border-slate-600`}
            >
              {app.icon}
            </motion.button>
          ))}
          <div className="w-px bg-slate-700" />
          {minimizedApps.length > 0 && (
            <div className="flex gap-1">
              {minimizedApps.map((windowState) => {
                const app = APPS.find(a => a.id === windowState?.appId);
                if (!app) return null;
                return (
                  <motion.button
                    key={windowState?.id}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => updateWindow(windowState?.id!, { isMinimized: false })}
                    className="px-2 py-1 text-xs bg-slate-700 hover:bg-slate-600 rounded border border-slate-600"
                  >
                    {app.name}
                  </motion.button>
                );
              })}
            </div>
          )}
        </div>

        {/* System Tray */}
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Wifi size={16} />
          <Cpu size={16} />
          <Clock size={16} />
          <span className="font-mono">{systemTime.toLocaleTimeString('en-US', { hour12: false })}</span>
        </div>
      </motion.div>
    </div>
  );
}
