import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Search, Menu, X, Minus, Square, MessageSquare, Code, BarChart3, Settings,
  Terminal, HardDrive, Globe, Mail, Lock, Zap, Grid, Home, Clock, Volume2, Scan, Mic,
  Server, Cpu, Database, Music, Smartphone, Megaphone, Box, ShieldAlert, Atom,
  Workflow, Palette, Building2, Calculator, Plane, Package, Book, Edit3,
  UserCheck, CloudOff, GitMerge, Users, Network, Shield, Briefcase, Send, Trash2,
  Plus, Save, Bold, Italic, Type, Check, Minimize2, Maximize2, Copy, Download,
  MoreVertical, RefreshCw, TrendingUp, Users as UsersIcon, Activity,
  FileText, Inbox, Pencil, Eye, Calendar as CalendarIcon, CheckCircle, AlertCircle,
  Bell, LogOut
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface App {
  id: string;
  name: string;
  icon: any;
  color: string;
  description: string;
  category: string;
}

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
}

// Application Data
const APPS: App[] = [
  // Productivity
  { id: 'ai', name: 'AI Studio', icon: MessageSquare, color: 'bg-pink-500', description: 'AI Chat', category: 'Productivity' },
  { id: 'documents', name: 'Documents', icon: FileText, color: 'bg-blue-500', description: 'Word Processor', category: 'Productivity' },
  { id: 'spreadsheet', name: 'Spreadsheet', icon: Grid, color: 'bg-green-500', description: 'Excel Clone', category: 'Productivity' },
  { id: 'mail', name: 'Mail', icon: Mail, color: 'bg-red-500', description: 'Email Client', category: 'Productivity' },
  { id: 'calendar', name: 'Calendar', icon: CalendarIcon, color: 'bg-purple-500', description: 'Calendar', category: 'Productivity' },
  { id: 'tasks', name: 'Tasks', icon: CheckCircle, color: 'bg-orange-500', description: 'Task Manager', category: 'Productivity' },
  { id: 'notes', name: 'Notes', icon: Pencil, color: 'bg-yellow-500', description: 'Note Taking', category: 'Productivity' },

  // System
  { id: 'dashboard', name: 'Dashboard', icon: BarChart3, color: 'bg-indigo-500', description: 'Analytics', category: 'System' },
  { id: 'files', name: 'Files', icon: HardDrive, color: 'bg-amber-500', description: 'File Manager', category: 'System' },
  { id: 'terminal', name: 'Terminal', icon: Code, color: 'bg-gray-700', description: 'Command Line', category: 'System' },
  { id: 'browser', name: 'Browser', icon: Globe, color: 'bg-orange-600', description: 'Web Browser', category: 'System' },
  { id: 'calculator', name: 'Calculator', icon: Calculator, color: 'bg-slate-500', description: 'Calculator', category: 'System' },

  // Development
  { id: 'server', name: 'Server', icon: Server, color: 'bg-cyan-500', description: 'Server Admin', category: 'Development' },
  { id: 'database', name: 'Database', icon: Database, color: 'bg-teal-500', description: 'DB Manager', category: 'Development' },
  { id: 'settings', name: 'Settings', icon: Settings, color: 'bg-gray-600', description: 'System Settings', category: 'System' },
];

// Main Component
const MegamOSDesktop: React.FC = () => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [zIndexCounter, setZIndexCounter] = useState(100);
  const desktopRef = useRef<HTMLDivElement>(null);

  const launchApp = useCallback((appId: string) => {
    const existingWindow = windows.find(w => w.appId === appId && !w.isMinimized);
    if (existingWindow) {
      bringToFront(existingWindow.id);
      return;
    }

    const newWindow: WindowState = {
      id: `window-${Date.now()}`,
      appId,
      x: 100 + Math.random() * 100,
      y: 100 + Math.random() * 100,
      width: 900,
      height: 600,
      isMinimized: false,
      isMaximized: false,
      zIndex: zIndexCounter,
    };

    setWindows(prev => [...prev, newWindow]);
    setZIndexCounter(prev => prev + 1);
    setStartMenuOpen(false);
  }, [windows, zIndexCounter]);

  const closeWindow = useCallback((id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
  }, []);

  const maximizeWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w));
  }, []);

  const bringToFront = useCallback((id: string) => {
    setZIndexCounter(prev => prev + 1);
    setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: zIndexCounter } : w));
  }, [zIndexCounter]);

  const filteredApps = APPS.filter(app =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getWindowContent = (window: WindowState) => {
    switch (window.appId) {
      case 'ai':
        return <AIStudio />;
      case 'documents':
        return <DocumentEditor />;
      case 'spreadsheet':
        return <Spreadsheet />;
      case 'mail':
        return <MailClient />;
      case 'calendar':
        return <Calendar />;
      case 'tasks':
        return <TaskManager />;
      case 'notes':
        return <NotesApp />;
      case 'dashboard':
        return <DashboardApp />;
      case 'files':
        return <FileManager />;
      case 'terminal':
        return <TerminalApp />;
      case 'browser':
        return <BrowserApp />;
      case 'calculator':
        return <CalculatorApp />;
      case 'server':
        return <ServerManager />;
      case 'database':
        return <DatabaseManager />;
      case 'settings':
        return <SettingsApp />;
      default:
        return <div className="p-4">App not implemented</div>;
    }
  };

  return (
    <div ref={desktopRef} className="w-full h-screen bg-gradient-to-b from-slate-900 to-slate-800 overflow-hidden flex flex-col">
      {/* Desktop Background with Grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />

      {/* Windows Container */}
      <div className="relative flex-1 overflow-hidden">
        {windows.map(win => (
          <OSWindow
            key={win.id}
            window={win}
            onClose={() => closeWindow(win.id)}
            onMinimize={() => minimizeWindow(win.id)}
            onMaximize={() => maximizeWindow(win.id)}
            onFocus={() => bringToFront(win.id)}
            content={getWindowContent(win)}
          />
        ))}
      </div>

      {/* Taskbar */}
      <div className="bg-slate-900 border-t border-slate-700 px-4 py-2 flex items-center gap-2 shadow-2xl">
        <button
          onClick={() => setStartMenuOpen(!startMenuOpen)}
          className="p-2 hover:bg-slate-800 rounded transition"
        >
          <Menu size={20} className="text-white" />
        </button>

        <div className="flex-1 max-w-xs">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search apps..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800 text-white text-sm py-2 pl-8 pr-3 rounded border border-slate-700 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {windows.filter(w => w.isMinimized).length > 0 && (
          <div className="flex gap-1">
            {windows.filter(w => w.isMinimized).map(w => {
              const app = APPS.find(a => a.id === w.appId);
              return (
                <button
                  key={w.id}
                  onClick={() => setWindows(prev => prev.map(x => x.id === w.id ? { ...x, isMinimized: false } : x))}
                  className="p-2 hover:bg-slate-800 rounded text-xs text-white max-w-[100px] truncate flex items-center gap-1"
                  title={app?.name}
                >
                  {app?.icon && <app.icon size={14} />}
                  <span className="truncate">{app?.name}</span>
                </button>
              );
            })}
          </div>
        )}

        <div className="ml-auto flex items-center gap-2 text-white text-sm">
          <Clock size={16} />
          <span>{new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Start Menu */}
      {startMenuOpen && (
        <div className="absolute bottom-16 left-4 bg-slate-800 border border-slate-700 rounded-lg shadow-2xl p-4 w-80 max-h-96 overflow-y-auto z-50">
          <div className="text-white font-semibold mb-4">Applications</div>
          <div className="grid grid-cols-2 gap-2">
            {filteredApps.map(app => {
              const Icon = app.icon;
              return (
                <button
                  key={app.id}
                  onClick={() => launchApp(app.id)}
                  className="p-3 hover:bg-slate-700 rounded flex flex-col items-center gap-2 text-white transition"
                >
                  <div className={`${app.color} p-2 rounded`}>
                    <Icon size={20} className="text-white" />
                  </div>
                  <span className="text-xs text-center">{app.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

// OS Window Component
interface OSWindowProps {
  window: WindowState;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  content: React.ReactNode;
}

const OSWindow: React.FC<OSWindowProps> = ({ window, onClose, onMinimize, onMaximize, onFocus, content }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: window.x, y: window.y });
  const [size, setSize] = useState({ width: window.width, height: window.height });
  const windowRef = useRef<HTMLDivElement>(null);

  const app = APPS.find(a => a.id === window.appId);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('[data-draggable="false"]')) return;
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
    onFocus();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    };

    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  if (window.isMinimized) return null;

  const windowStyle = window.isMaximized ? {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: 'calc(100% - 56px)',
    zIndex: window.zIndex
  } : {
    position: 'absolute' as const,
    left: `${position.x}px`,
    top: `${position.y}px`,
    width: `${size.width}px`,
    height: `${size.height}px`,
    zIndex: window.zIndex
  };

  return (
    <div ref={windowRef} style={windowStyle} className="bg-slate-800 border border-slate-700 rounded-lg shadow-2xl flex flex-col">
      {/* Title Bar */}
      <div
        onMouseDown={handleMouseDown}
        className={`${app?.color} p-3 rounded-t-lg flex items-center justify-between cursor-move select-none`}
      >
        <div className="flex items-center gap-2">
          {app?.icon && <app.icon size={18} className="text-white" />}
          <span className="text-white font-semibold text-sm">{app?.name}</span>
        </div>
        <div className="flex gap-1" data-draggable="false">
          <button onClick={onMinimize} className="p-1 hover:bg-white hover:bg-opacity-20 rounded">
            <Minimize2 size={14} className="text-white" />
          </button>
          <button onClick={onMaximize} className="p-1 hover:bg-white hover:bg-opacity-20 rounded">
            <Maximize2 size={14} className="text-white" />
          </button>
          <button onClick={onClose} className="p-1 hover:bg-red-500 rounded">
            <X size={14} className="text-white" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto bg-slate-700 text-white">
        {content}
      </div>
    </div>
  );
};

// ===== APPLICATION COMPONENTS =====

// 1. AI STUDIO
const AIStudio: React.FC = () => {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    { role: 'assistant', content: 'Hello! I\'m your AI assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        'That\'s a great question! Let me help you with that.',
        'I understand. Here\'s what I can help you with...',
        'Interesting! I have some insights on that topic.',
        'Let me process that and provide you with a comprehensive answer.',
      ];
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)]
      }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex-1 overflow-y-auto mb-4 space-y-3">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs px-4 py-2 rounded-lg ${
              msg.role === 'user'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-600 text-gray-100'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && <div className="text-gray-400 text-sm">Thinking...</div>}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask me anything..."
          className="flex-1 bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none"
        />
        <button
          onClick={handleSend}
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-4 py-2 rounded flex items-center gap-2"
        >
          <Send size={16} />
        </button>
        <button
          onClick={() => setMessages([{ role: 'assistant', content: 'Chat cleared. How can I help?' }])}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

// 2. DOCUMENT EDITOR
const DocumentEditor: React.FC = () => {
  const [content, setContent] = useState('# Welcome to MegamOS Documents\n\nStart typing here...');
  const [isBold, setIsBold] = useState(false);
  const [fontSize, setFontSize] = useState(14);

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="bg-slate-600 p-3 border-b border-slate-500 flex gap-2 items-center flex-wrap">
        <button className="bg-slate-700 hover:bg-slate-600 p-2 rounded" onClick={() => setIsBold(!isBold)}>
          <Bold size={16} className={isBold ? 'text-blue-400' : ''} />
        </button>
        <button className="bg-slate-700 hover:bg-slate-600 p-2 rounded">
          <Italic size={16} />
        </button>
        <div className="w-px h-6 bg-slate-500" />
        <select
          value={fontSize}
          onChange={(e) => setFontSize(parseInt(e.target.value))}
          className="bg-slate-700 border border-slate-500 rounded px-2 py-1 text-sm"
        >
          {[12, 14, 16, 18, 20, 24, 28, 32].map(size => (
            <option key={size} value={size}>{size}px</option>
          ))}
        </select>
        <button className="bg-green-600 hover:bg-green-700 px-4 py-1 rounded text-sm ml-auto flex items-center gap-2">
          <Save size={16} /> Save
        </button>
      </div>

      {/* Editor */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-1 bg-slate-700 text-white p-4 border-none resize-none focus:outline-none font-mono"
        style={{ fontSize: `${fontSize}px` }}
      />

      {/* Status Bar */}
      <div className="bg-slate-600 px-4 py-2 text-xs text-gray-400 border-t border-slate-500">
        Words: {content.split(/\s+/).filter(Boolean).length} | Characters: {content.length}
      </div>
    </div>
  );
};

// 3. SPREADSHEET
const Spreadsheet: React.FC = () => {
  const [cells, setCells] = useState<Record<string, string>>(
    Array.from({ length: 26 }, (_, i) => `${String.fromCharCode(65 + i)}1`).reduce((acc, cell) => {
      acc[cell] = '';
      return acc;
    }, {} as Record<string, string>)
  );
  const [selectedCell, setSelectedCell] = useState('A1');

  const columns = Array.from({ length: 10 }, (_, i) => String.fromCharCode(65 + i));
  const rows = Array.from({ length: 15 }, (_, i) => i + 1);

  const handleCellChange = (col: string, row: number, value: string) => {
    setCells(prev => ({ ...prev, [`${col}${row}`]: value }));
  };

  return (
    <div className="flex flex-col h-full">
      {/* Input Bar */}
      <div className="bg-slate-600 p-3 border-b border-slate-500 flex gap-2">
        <div className="bg-slate-700 px-3 py-2 rounded text-sm font-mono">{selectedCell}</div>
        <input
          type="text"
          value={cells[selectedCell] || ''}
          onChange={(e) => {
            setCells(prev => ({ ...prev, [selectedCell]: e.target.value }));
          }}
          placeholder="Enter value..."
          className="flex-1 bg-slate-700 border border-slate-500 rounded px-3 py-2 focus:outline-none focus:border-blue-400"
        />
      </div>

      {/* Spreadsheet Grid */}
      <div className="flex-1 overflow-auto">
        <table className="border-collapse">
          <thead>
            <tr>
              <td className="w-12 h-8 bg-slate-600 border border-slate-500 text-center text-xs" />
              {columns.map(col => (
                <td key={col} className="w-24 h-8 bg-slate-600 border border-slate-500 text-center text-xs font-semibold text-gray-300">
                  {col}
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row}>
                <td className="w-12 h-8 bg-slate-600 border border-slate-500 text-center text-xs text-gray-300">
                  {row}
                </td>
                {columns.map(col => (
                  <td key={`${col}${row}`} className="w-24 h-8 border border-slate-500">
                    <input
                      type="text"
                      value={cells[`${col}${row}`] || ''}
                      onChange={(e) => handleCellChange(col, row, e.target.value)}
                      onFocus={() => setSelectedCell(`${col}${row}`)}
                      className="w-full h-full bg-slate-700 border-none focus:outline-none focus:bg-blue-900 px-2 text-xs"
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

// 4. MAIL CLIENT
const MailClient: React.FC = () => {
  const [emails, setEmails] = useState<Array<{ id: number; from: string; subject: string; preview: string; date: string }>>([
    { id: 1, from: 'Support@megamos.com', subject: 'Welcome to MegamOS', preview: 'Your account has been created...', date: 'Today' },
    { id: 2, from: 'updates@megamos.com', subject: 'System Update Available', preview: 'Version 2.0 is ready to install...', date: 'Yesterday' },
  ]);
  const [selectedEmail, setSelectedEmail] = useState<number | null>(null);
  const [composeMode, setComposeMode] = useState(false);
  const [composeTo, setComposeTo] = useState('');
  const [composeSubject, setComposeSubject] = useState('');
  const [composeBody, setComposeBody] = useState('');

  const handleSendEmail = () => {
    if (composeTo && composeSubject) {
      setEmails(prev => [...prev, {
        id: prev.length + 1,
        from: composeTo,
        subject: composeSubject,
        preview: composeBody.substring(0, 50),
        date: 'Now'
      }]);
      setComposeMode(false);
      setComposeTo('');
      setComposeSubject('');
      setComposeBody('');
    }
  };

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-48 bg-slate-600 border-r border-slate-500 p-4 flex flex-col">
        <button
          onClick={() => setComposeMode(true)}
          className="bg-blue-600 hover:bg-blue-700 w-full py-2 rounded mb-4 flex items-center justify-center gap-2"
        >
          <Plus size={16} /> New Email
        </button>
        <div className="space-y-2">
          {['Inbox', 'Sent', 'Drafts', 'Trash'].map(folder => (
            <button key={folder} className="w-full text-left px-3 py-2 hover:bg-slate-700 rounded">
              {folder}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {composeMode ? (
          <div className="p-4 space-y-4">
            <h2 className="text-lg font-semibold">New Email</h2>
            <input
              type="email"
              placeholder="To:"
              value={composeTo}
              onChange={(e) => setComposeTo(e.target.value)}
              className="w-full bg-slate-600 border border-slate-500 rounded px-3 py-2 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Subject:"
              value={composeSubject}
              onChange={(e) => setComposeSubject(e.target.value)}
              className="w-full bg-slate-600 border border-slate-500 rounded px-3 py-2 focus:outline-none"
            />
            <textarea
              placeholder="Message body..."
              value={composeBody}
              onChange={(e) => setComposeBody(e.target.value)}
              className="w-full h-64 bg-slate-600 border border-slate-500 rounded px-3 py-2 focus:outline-none resize-none"
            />
            <div className="flex gap-2">
              <button onClick={handleSendEmail} className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded flex items-center gap-2">
                <Send size={16} /> Send
              </button>
              <button onClick={() => setComposeMode(false)} className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </div>
        ) : selectedEmail ? (
          <div className="p-4 space-y-2">
            <button onClick={() => setSelectedEmail(null)} className="mb-4 px-3 py-1 bg-slate-600 rounded text-sm">
              ← Back
            </button>
            {(() => {
              const email = emails.find(e => e.id === selectedEmail);
              return email ? (
                <>
                  <h2 className="text-lg font-semibold">{email.subject}</h2>
                  <p className="text-sm text-gray-400">From: {email.from}</p>
                  <div className="bg-slate-600 p-4 rounded mt-4 flex-1">
                    {email.preview}
                  </div>
                </>
              ) : null;
            })()}
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto">
            {emails.map(email => (
              <button
                key={email.id}
                onClick={() => setSelectedEmail(email.id)}
                className="w-full text-left p-4 border-b border-slate-500 hover:bg-slate-600 transition"
              >
                <div className="font-semibold">{email.subject}</div>
                <div className="text-sm text-gray-400">{email.from}</div>
                <div className="text-sm text-gray-500 truncate">{email.preview}</div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// 5. CALENDAR
const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const daysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const days = [];
  for (let i = 0; i < firstDayOfMonth(currentDate); i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth(currentDate); i++) {
    days.push(i);
  }

  return (
    <div className="p-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}>
          &lt;
        </button>
        <h2 className="text-xl font-semibold">
          {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h2>
        <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}>
          &gt;
        </button>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-semibold text-gray-400">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 flex-1">
        {days.map((day, idx) => (
          <button
            key={idx}
            onClick={() => day && setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
            className={`p-2 rounded text-center ${
              day ? 'hover:bg-blue-600 bg-slate-600' : ''
            } ${
              selectedDate?.getDate() === day ? 'bg-blue-700 font-bold' : ''
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {selectedDate && (
        <div className="mt-6 p-4 bg-slate-600 rounded">
          <p className="font-semibold">{selectedDate.toLocaleDateString()}</p>
          <p className="text-sm text-gray-400">No events scheduled</p>
        </div>
      )}
    </div>
  );
};

// 6. TASK MANAGER
const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Array<{ id: number; title: string; completed: boolean }>>([
    { id: 1, title: 'Setup MegamOS environment', completed: true },
    { id: 2, title: 'Create main applications', completed: true },
    { id: 3, title: 'Implement AI integration', completed: false },
  ]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks(prev => [...prev, { id: Date.now(), title: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: number) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="p-4 h-full flex flex-col">
      <h2 className="text-lg font-semibold mb-4">Tasks</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
          placeholder="Add a new task..."
          className="flex-1 bg-slate-600 border border-slate-500 rounded px-3 py-2 focus:outline-none"
        />
        <button onClick={addTask} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded flex items-center gap-2">
          <Plus size={16} /> Add
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2">
        {tasks.map(task => (
          <div key={task.id} className="flex items-center gap-3 p-3 bg-slate-600 rounded hover:bg-slate-500">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
              className="w-5 h-5 cursor-pointer"
            />
            <span className={task.completed ? 'line-through text-gray-400 flex-1' : 'flex-1'}>
              {task.title}
            </span>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-400 hover:text-red-300"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// 7. NOTES APP
const NotesApp: React.FC = () => {
  const [notes, setNotes] = useState<Array<{ id: number; title: string; content: string; date: string }>>([
    { id: 1, title: 'Welcome', content: 'Welcome to MegamOS Notes', date: 'Today' },
  ]);
  const [selectedNote, setSelectedNote] = useState<number>(1);
  const [newNoteTitle, setNewNoteTitle] = useState('');

  const currentNote = notes.find(n => n.id === selectedNote);
  const createNote = () => {
    if (newNoteTitle.trim()) {
      const newNote = {
        id: Date.now(),
        title: newNoteTitle,
        content: '',
        date: 'Today'
      };
      setNotes(prev => [...prev, newNote]);
      setSelectedNote(newNote.id);
      setNewNoteTitle('');
    }
  };

  return (
    <div className="flex h-full">
      <div className="w-56 bg-slate-600 border-r border-slate-500 p-4 flex flex-col">
        <button
          onClick={() => setNewNoteTitle('')}
          onKeyDown={(e) => e.key === 'Enter' && createNote()}
          className="mb-4 bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded text-sm flex items-center gap-2"
        >
          <Plus size={16} /> New Note
        </button>
        <div className="space-y-2 overflow-y-auto flex-1">
          {notes.map(note => (
            <button
              key={note.id}
              onClick={() => setSelectedNote(note.id)}
              className={`w-full text-left p-3 rounded ${selectedNote === note.id ? 'bg-blue-600' : 'hover:bg-slate-700'}`}
            >
              <div className="font-semibold text-sm truncate">{note.title}</div>
              <div className="text-xs text-gray-400">{note.date}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {currentNote && (
          <>
            <div className="p-4 border-b border-slate-500">
              <h2 className="text-lg font-semibold">{currentNote.title}</h2>
            </div>
            <textarea
              value={currentNote.content}
              onChange={(e) => setNotes(prev => prev.map(n => n.id === selectedNote ? { ...n, content: e.target.value } : n))}
              className="flex-1 bg-slate-700 p-4 resize-none focus:outline-none"
              placeholder="Start typing..."
            />
          </>
        )}
      </div>
    </div>
  );
};

// 8. DASHBOARD
const DashboardApp: React.FC = () => {
  const data = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 600 },
    { name: 'Mar', value: 800 },
    { name: 'Apr', value: 700 },
    { name: 'May', value: 900 },
  ];

  return (
    <div className="p-6 h-full overflow-y-auto">
      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-600 p-4 rounded">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active Users</p>
              <p className="text-2xl font-bold">2,543</p>
            </div>
            <UsersIcon size={24} className="text-blue-400" />
          </div>
        </div>
        <div className="bg-slate-600 p-4 rounded">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Revenue</p>
              <p className="text-2xl font-bold">$45.2K</p>
            </div>
            <TrendingUp size={24} className="text-green-400" />
          </div>
        </div>
        <div className="bg-slate-600 p-4 rounded">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">System Health</p>
              <p className="text-2xl font-bold">99.8%</p>
            </div>
            <Activity size={24} className="text-yellow-400" />
          </div>
        </div>
        <div className="bg-slate-600 p-4 rounded">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Tasks Done</p>
              <p className="text-2xl font-bold">847</p>
            </div>
            <CheckCircle size={24} className="text-purple-400" />
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-slate-600 p-4 rounded mb-6">
        <h3 className="font-semibold mb-4">Monthly Revenue</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid stroke="#475569" />
            <XAxis stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none' }} />
            <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Table */}
      <div className="bg-slate-600 p-4 rounded">
        <h3 className="font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-2">
          {['User registered', 'Payment received', 'System updated', 'Report generated'].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-2 bg-slate-700 rounded">
              <span className="text-sm">{item}</span>
              <span className="text-xs text-gray-400">2 hours ago</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 9. FILE MANAGER
const FileManager: React.FC = () => {
  const [files] = useState<Array<{ name: string; type: 'file' | 'folder'; size: string; modified: string }>>([
    { name: 'Documents', type: 'folder', size: '-', modified: 'Today' },
    { name: 'Desktop', type: 'folder', size: '-', modified: 'Today' },
    { name: 'Downloads', type: 'folder', size: '-', modified: 'Today' },
    { name: 'config.json', type: 'file', size: '2.4 KB', modified: 'Yesterday' },
    { name: 'data.xlsx', type: 'file', size: '156 KB', modified: '2 days ago' },
    { name: 'report.pdf', type: 'file', size: '1.2 MB', modified: '3 days ago' },
  ]);
  const [currentPath] = useState('/home/user');

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4 p-2 bg-slate-600 rounded">
        <span className="text-sm text-gray-400">{currentPath}</span>
      </div>

      <div className="flex-1 overflow-y-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-500">
              <th className="text-left p-3 text-sm font-semibold text-gray-400">Name</th>
              <th className="text-right p-3 text-sm font-semibold text-gray-400">Size</th>
              <th className="text-right p-3 text-sm font-semibold text-gray-400">Modified</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file, idx) => (
              <tr key={idx} className="border-b border-slate-600 hover:bg-slate-600 cursor-pointer">
                <td className="p-3 flex items-center gap-2">
                  {file.type === 'folder' ? <HardDrive size={16} className="text-blue-400" /> : <FileText size={16} className="text-gray-400" />}
                  <span className="text-sm">{file.name}</span>
                </td>
                <td className="text-right p-3 text-sm text-gray-400">{file.size}</td>
                <td className="text-right p-3 text-sm text-gray-400">{file.modified}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// 10. TERMINAL
const TerminalApp: React.FC = () => {
  const [output, setOutput] = useState(['MegamOS Terminal v1.0\n> Ready for commands\n']);
  const [input, setInput] = useState('');

  const executeCommand = (cmd: string) => {
    let response = '';
    if (cmd.includes('help')) {
      response = 'Available commands: help, clear, date, whoami, ls, echo [text]';
    } else if (cmd.includes('clear')) {
      setOutput([]);
      return;
    } else if (cmd.includes('date')) {
      response = new Date().toString();
    } else if (cmd.includes('whoami')) {
      response = 'user@megamos';
    } else if (cmd.includes('ls')) {
      response = 'Documents  Downloads  Desktop  Applications  System';
    } else if (cmd.includes('echo')) {
      response = cmd.replace('echo', '').trim();
    } else {
      response = `command not found: ${cmd}`;
    }
    setOutput(prev => [...prev, `> ${cmd}`, response]);
    setInput('');
  };

  return (
    <div className="p-4 h-full flex flex-col font-mono text-sm">
      <div className="flex-1 overflow-y-auto mb-4">
        {output.map((line, idx) => (
          <div key={idx} className="text-green-400 mb-1">{line}</div>
        ))}
      </div>

      <div className="flex gap-2">
        <span className="text-green-400">$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && executeCommand(input)}
          autoFocus
          className="flex-1 bg-transparent border-none text-green-400 focus:outline-none"
        />
      </div>
    </div>
  );
};

// 11. BROWSER
const BrowserApp: React.FC = () => {
  const [url, setUrl] = useState('https://megamos.local');
  const [history] = useState<string[]>(['google.com', 'github.com', 'stackoverflow.com']);

  return (
    <div className="flex flex-col h-full">
      <div className="bg-slate-600 p-3 border-b border-slate-500 flex gap-2 items-center">
        <button className="px-3 py-1 bg-slate-700 rounded text-sm">←</button>
        <button className="px-3 py-1 bg-slate-700 rounded text-sm">→</button>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 bg-slate-700 border border-slate-500 rounded px-3 py-2 text-sm focus:outline-none"
          placeholder="Enter URL..."
        />
        <button className="px-4 py-2 bg-blue-600 rounded text-sm">Go</button>
      </div>
      <div className="flex-1 bg-white p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to MegamOS Browser</h1>
        <p className="text-gray-600">You are visiting: <code className="bg-gray-200 px-2 py-1 rounded">{url}</code></p>
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">History</h2>
          <ul className="space-y-2">
            {history.map((h, i) => (
              <li key={i} className="text-blue-600 hover:underline cursor-pointer">{h}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// 12. CALCULATOR
const CalculatorApp: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [operation, setOperation] = useState<string | null>(null);
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const handleNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperation = (op: string) => {
    const currentValue = parseFloat(display);
    if (previousValue !== null && operation && !waitingForNewValue) {
      const result = performOperation(previousValue, currentValue, operation);
      setDisplay(result.toString());
      setPreviousValue(result);
    } else {
      setPreviousValue(currentValue);
    }
    setOperation(op);
    setWaitingForNewValue(true);
  };

  const performOperation = (prev: number, current: number, op: string): number => {
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
      const result = performOperation(previousValue, parseFloat(display), operation);
      setDisplay(result.toString());
      setOperation(null);
      setPreviousValue(null);
      setWaitingForNewValue(true);
    }
  };

  const buttons = [
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+'],
  ];

  return (
    <div className="p-6 h-full flex flex-col items-center justify-center">
      <div className="bg-slate-600 p-6 rounded-lg w-64">
        <div className="bg-slate-800 p-4 rounded mb-4 text-right text-3xl font-mono text-blue-400 border-2 border-slate-500">
          {display}
        </div>
        <div className="grid grid-cols-4 gap-2">
          {buttons.map((row, i) => (
            <div key={i} className="contents">
              {row.map(btn => (
                <button
                  key={btn}
                  onClick={() => {
                    if (btn === '=') handleEquals();
                    else if (['+', '-', '*', '/'].includes(btn)) handleOperation(btn);
                    else handleNumber(btn);
                  }}
                  className={`p-4 rounded font-semibold text-white ${
                    btn === '=' ? 'bg-green-600 hover:bg-green-700' :
                    ['+', '-', '*', '/'].includes(btn) ? 'bg-orange-600 hover:bg-orange-700' :
                    'bg-slate-700 hover:bg-slate-600'
                  }`}
                >
                  {btn}
                </button>
              ))}
            </div>
          ))}
          <button
            onClick={() => setDisplay('0')}
            className="col-span-4 p-3 bg-red-600 hover:bg-red-700 rounded font-semibold text-white"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

// 13. SERVER MANAGER
const ServerManager: React.FC = () => {
  const [servers] = useState<Array<{ name: string; status: 'running' | 'stopped'; cpu: number; memory: number }>>([
    { name: 'API Server', status: 'running', cpu: 45, memory: 62 },
    { name: 'Database', status: 'running', cpu: 28, memory: 78 },
    { name: 'Cache', status: 'running', cpu: 12, memory: 34 },
    { name: 'Worker', status: 'stopped', cpu: 0, memory: 0 },
  ]);

  return (
    <div className="p-4 h-full flex flex-col">
      <h2 className="text-lg font-semibold mb-4">Server Status</h2>
      <div className="space-y-3 flex-1">
        {servers.map(server => (
          <div key={server.name} className="bg-slate-600 p-4 rounded">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">{server.name}</span>
              <span className={`text-xs px-2 py-1 rounded ${
                server.status === 'running' ? 'bg-green-600' : 'bg-red-600'
              }`}>
                {server.status}
              </span>
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>CPU</span>
                <span>{server.cpu}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: `${server.cpu}%` }} />
              </div>
              <div className="flex justify-between">
                <span>Memory</span>
                <span>{server.memory}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${server.memory}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 14. DATABASE MANAGER
const DatabaseManager: React.FC = () => {
  const [tables] = useState<Array<{ name: string; rows: number; size: string }>>([
    { name: 'users', rows: 2543, size: '5.2 MB' },
    { name: 'products', rows: 15234, size: '23.8 MB' },
    { name: 'orders', rows: 98765, size: '145.6 MB' },
    { name: 'transactions', rows: 456789, size: '678.9 MB' },
  ]);

  return (
    <div className="p-4 h-full flex flex-col">
      <h2 className="text-lg font-semibold mb-4">Database Tables</h2>
      <div className="flex-1 overflow-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-500 sticky top-0">
              <th className="text-left p-3 text-sm font-semibold text-gray-400">Table Name</th>
              <th className="text-right p-3 text-sm font-semibold text-gray-400">Rows</th>
              <th className="text-right p-3 text-sm font-semibold text-gray-400">Size</th>
            </tr>
          </thead>
          <tbody>
            {tables.map(table => (
              <tr key={table.name} className="border-b border-slate-600 hover:bg-slate-600">
                <td className="p-3 text-sm">{table.name}</td>
                <td className="text-right p-3 text-sm text-gray-400">{table.rows.toLocaleString()}</td>
                <td className="text-right p-3 text-sm text-gray-400">{table.size}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// 15. SETTINGS
const SettingsApp: React.FC = () => {
  const [theme, setTheme] = useState('dark');
  const [notifications, setNotifications] = useState(true);
  const [autoUpdate, setAutoUpdate] = useState(true);

  return (
    <div className="p-6 h-full overflow-y-auto max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">System Settings</h1>

      <div className="space-y-6">
        {/* Display */}
        <div className="border-b border-slate-600 pb-4">
          <h2 className="text-lg font-semibold mb-4">Display</h2>
          <div className="flex items-center justify-between">
            <label>Theme</label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="bg-slate-600 border border-slate-500 rounded px-3 py-2"
            >
              <option>dark</option>
              <option>light</option>
              <option>auto</option>
            </select>
          </div>
        </div>

        {/* Notifications */}
        <div className="border-b border-slate-600 pb-4">
          <h2 className="text-lg font-semibold mb-4">Notifications</h2>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
            />
            <span>Enable notifications</span>
          </label>
        </div>

        {/* System */}
        <div>
          <h2 className="text-lg font-semibold mb-4">System</h2>
          <label className="flex items-center gap-3 mb-3">
            <input
              type="checkbox"
              checked={autoUpdate}
              onChange={(e) => setAutoUpdate(e.target.checked)}
            />
            <span>Auto-update</span>
          </label>
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
            Check for Updates
          </button>
        </div>
      </div>
    </div>
  );
};

export default MegamOSDesktop;
