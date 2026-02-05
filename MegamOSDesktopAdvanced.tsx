import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Search, Menu, X, Minus, Square, MessageSquare, Code, BarChart3, Settings,
  Terminal, HardDrive, Globe, Mail, Lock, Zap, Grid, Home, Clock, Volume2, Scan, Mic,
  Server, Cpu, Database, Music, Smartphone, Megaphone, Box, ShieldAlert, Atom,
  Workflow, Palette, Building2, Calculator, Plane, Package, Book, Edit3,
  UserCheck, CloudOff, GitMerge, Users, Network, Shield, Briefcase, Send, Trash2,
  Plus, Save, Bold, Italic, Type, Check, Minimize2, Maximize2, Copy, Download,
  MoreVertical, RefreshCw, TrendingUp, UsersIcon, Activity, Wifi, Battery,
  FileText, Inbox, Pencil, Eye, Calendar as CalendarIcon, CheckCircle, AlertCircle,
  Bell, LogOut, Zap as Power, MapPin, Gauge, Lightbulb, Smartphone as Phone,
  Share2, Flag, Archive, Star, Filter, ChevronRight, ChevronLeft, Play, Pause,
  Volume, Maximize, Minimize, SkipBack, SkipForward
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

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

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Real-time data generators
const generateMetricsData = () => [
  { time: '12:00', cpu: 45 + Math.random() * 20, memory: 60 + Math.random() * 15, disk: 75 + Math.random() * 10 },
  { time: '12:15', cpu: 50 + Math.random() * 20, memory: 65 + Math.random() * 15, disk: 76 + Math.random() * 10 },
  { time: '12:30', cpu: 55 + Math.random() * 20, memory: 70 + Math.random() * 15, disk: 77 + Math.random() * 10 },
  { time: '12:45', cpu: 48 + Math.random() * 20, memory: 62 + Math.random() * 15, disk: 78 + Math.random() * 10 },
  { time: '13:00', cpu: 52 + Math.random() * 20, memory: 68 + Math.random() * 15, disk: 79 + Math.random() * 10 },
];

const generateAnalyticsData = () => [
  { name: 'Mon', users: 2400, revenue: 2210, engagement: 65 },
  { name: 'Tue', users: 2210, revenue: 2290, engagement: 72 },
  { name: 'Wed', users: 2290, revenue: 2000, engagement: 68 },
  { name: 'Thu', users: 2000, revenue: 2181, engagement: 75 },
  { name: 'Fri', users: 2181, revenue: 2500, engagement: 82 },
  { name: 'Sat', users: 2500, revenue: 2100, engagement: 88 },
  { name: 'Sun', users: 2100, revenue: 2300, engagement: 76 },
];

// Application Data
const APPS: App[] = [
  { id: 'ai', name: 'AI Studio', icon: MessageSquare, color: 'bg-pink-500', description: 'AI Chat', category: 'Productivity' },
  { id: 'documents', name: 'Documents', icon: FileText, color: 'bg-blue-500', description: 'Word Processor', category: 'Productivity' },
  { id: 'spreadsheet', name: 'Spreadsheet', icon: Grid, color: 'bg-green-500', description: 'Excel Clone', category: 'Productivity' },
  { id: 'mail', name: 'Mail', icon: Mail, color: 'bg-red-500', description: 'Email Client', category: 'Productivity' },
  { id: 'calendar', name: 'Calendar', icon: CalendarIcon, color: 'bg-purple-500', description: 'Calendar', category: 'Productivity' },
  { id: 'tasks', name: 'Tasks', icon: CheckCircle, color: 'bg-orange-500', description: 'Task Manager', category: 'Productivity' },
  { id: 'notes', name: 'Notes', icon: Pencil, color: 'bg-yellow-500', description: 'Note Taking', category: 'Productivity' },
  { id: 'dashboard', name: 'Dashboard', icon: BarChart3, color: 'bg-indigo-500', description: 'Analytics', category: 'System' },
  { id: 'files', name: 'Files', icon: HardDrive, color: 'bg-amber-500', description: 'File Manager', category: 'System' },
  { id: 'terminal', name: 'Terminal', icon: Code, color: 'bg-gray-700', description: 'Command Line', category: 'System' },
  { id: 'browser', name: 'Browser', icon: Globe, color: 'bg-orange-600', description: 'Web Browser', category: 'System' },
  { id: 'calculator', name: 'Calculator', icon: Calculator, color: 'bg-slate-500', description: 'Calculator', category: 'System' },
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
  const [systemTime, setSystemTime] = useState(new Date());
  const [systemStats, setSystemStats] = useState({ cpu: 45, memory: 60, disk: 75, network: 85 });
  const desktopRef = useRef<HTMLDivElement>(null);

  // Update system time
  useEffect(() => {
    const timer = setInterval(() => setSystemTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Update system stats
  useEffect(() => {
    const timer = setInterval(() => {
      setSystemStats({
        cpu: Math.max(20, Math.min(95, 45 + (Math.random() - 0.5) * 30)),
        memory: Math.max(30, Math.min(95, 60 + (Math.random() - 0.5) * 25)),
        disk: Math.max(50, Math.min(100, 75 + (Math.random() - 0.5) * 15)),
        network: Math.max(20, Math.min(100, 85 + (Math.random() - 0.5) * 20)),
      });
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const launchApp = useCallback((appId: string) => {
    const existingWindow = windows.find(w => w.appId === appId && !w.isMinimized);
    if (existingWindow) {
      bringToFront(existingWindow.id);
      return;
    }

    const newWindow: WindowState = {
      id: `window-${Date.now()}`,
      appId,
      x: 50 + Math.random() * 150,
      y: 50 + Math.random() * 150,
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
    setWindows(prev => prev.map(w => 
      w.id === id 
        ? { ...w, isMaximized: !w.isMaximized, x: w.isMaximized ? 50 : 0, y: w.isMaximized ? 50 : 0, width: w.isMaximized ? 900 : window.innerWidth - 40, height: w.isMaximized ? 600 : window.innerHeight - 80 }
        : w
    ));
  }, []);

  const bringToFront = useCallback((id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: zIndexCounter } : w));
    setZIndexCounter(prev => prev + 1);
  }, [zIndexCounter]);

  const restoreWindow = useCallback((appId: string) => {
    setWindows(prev => prev.map(w => w.appId === appId ? { ...w, isMinimized: false, zIndex: zIndexCounter } : w));
    setZIndexCounter(prev => prev + 1);
  }, [zIndexCounter]);

  const filteredApps = APPS.filter(app =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const minimizedApps = windows.filter(w => w.isMinimized);

  return (
    <div 
      ref={desktopRef}
      className="w-screen h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col overflow-hidden"
      style={{
        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      }}
    >
      {/* Desktop Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,.1) 2px, rgba(255,255,255,.1) 4px)',
      }}/>

      {/* Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,.5) 2px, rgba(255,255,255,.5) 4px)',
      }}/>

      {/* Windows */}
      <div className="relative flex-1 overflow-hidden">
        {windows.map(window => {
          const app = APPS.find(a => a.id === window.appId);
          if (!app || window.isMinimized) return null;

          return (
            <AppWindow
              key={window.id}
              window={window}
              app={app}
              onClose={closeWindow}
              onMinimize={minimizeWindow}
              onMaximize={maximizeWindow}
              onBringToFront={bringToFront}
              setWindows={setWindows}
              zIndexCounter={zIndexCounter}
              setZIndexCounter={setZIndexCounter}
            />
          );
        })}
      </div>

      {/* Start Menu */}
      {startMenuOpen && (
        <div className="absolute bottom-16 left-0 w-96 bg-slate-800 border border-slate-600 rounded-lg shadow-2xl z-50 max-h-[70vh] overflow-y-auto">
          <div className="p-4 border-b border-slate-600">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search apps..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="p-4 space-y-2">
            {filteredApps.map(app => (
              <button
                key={app.id}
                onClick={() => launchApp(app.id)}
                className="w-full flex items-center gap-3 p-3 rounded hover:bg-slate-700 transition-colors"
              >
                <div className={`${app.color} p-2 rounded flex-shrink-0`}>
                  <app.icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-left flex-1">
                  <div className="text-sm font-medium text-white">{app.name}</div>
                  <div className="text-xs text-slate-400">{app.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Taskbar */}
      <div className="bg-slate-950 border-t border-slate-700 px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setStartMenuOpen(!startMenuOpen)}
            className="p-2 hover:bg-slate-800 rounded transition-colors"
            title="Start Menu"
          >
            <Menu className="w-5 h-5 text-blue-400" />
          </button>
          <div className="w-px h-6 bg-slate-700" />
          {minimizedApps.map(window => {
            const app = APPS.find(a => a.id === window.appId);
            const IconComponent = app?.icon;
            return (
              <button
                key={window.id}
                onClick={() => restoreWindow(window.appId)}
                className={`${app?.color} p-2 rounded text-white hover:opacity-80 transition-opacity`}
                title={app?.name}
              >
                {IconComponent && <IconComponent className="w-4 h-4" />}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-4 text-slate-300 text-sm">
          <div className="flex items-center gap-2">
            <Wifi className="w-4 h-4" />
            <span>{Math.round(systemStats.network)}%</span>
          </div>
          <div className="flex items-center gap-2">
            <Battery className="w-4 h-4" />
            <span>87%</span>
          </div>
          <div className="text-right">
            <div className="font-medium">{systemTime.toLocaleTimeString()}</div>
            <div className="text-xs">{systemTime.toLocaleDateString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// App Window Component
interface AppWindowProps {
  window: WindowState;
  app: App;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onMaximize: (id: string) => void;
  onBringToFront: (id: string) => void;
  setWindows: React.Dispatch<React.SetStateAction<WindowState[]>>;
  zIndexCounter: number;
  setZIndexCounter: React.Dispatch<React.SetStateAction<number>>;
}

const AppWindow: React.FC<AppWindowProps> = ({
  window: windowState,
  app,
  onClose,
  onMinimize,
  onMaximize,
  onBringToFront,
  setWindows,
  zIndexCounter,
  setZIndexCounter,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button, input, textarea, select')) return;
    
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - windowState.x,
      y: e.clientY - windowState.y,
    });
    onBringToFront(windowState.id);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;

    const newX = Math.max(0, Math.min(e.clientX - dragOffset.x, window.innerWidth - windowState.width - 20));
    const newY = Math.max(0, Math.min(e.clientY - dragOffset.y, window.innerHeight - windowState.height - 40));

    setWindows(prev => prev.map(w => w.id === windowState.id ? { ...w, x: newX, y: newY } : w));
  }, [isDragging, dragOffset, windowState.id, windowState.width, windowState.height, setWindows]);

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove]);

  return (
    <div
      ref={windowRef}
      onClick={() => onBringToFront(windowState.id)}
      className="absolute bg-slate-800 border border-slate-700 rounded-lg shadow-2xl flex flex-col overflow-hidden"
      style={{
        left: `${windowState.x}px`,
        top: `${windowState.y}px`,
        width: `${windowState.width}px`,
        height: `${windowState.height}px`,
        zIndex: windowState.zIndex,
      }}
    >
      {/* Title Bar */}
      <div
        onMouseDown={handleMouseDown}
        className={`${app.color} text-white px-4 py-3 flex items-center justify-between cursor-move hover:opacity-90 transition-opacity`}
      >
        <div className="flex items-center gap-3">
          <app.icon className="w-5 h-5" />
          <span className="font-semibold">{app.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => onMinimize(windowState.id)} className="hover:bg-black/20 p-1 rounded transition-colors">
            <Minimize2 className="w-4 h-4" />
          </button>
          <button onClick={() => onMaximize(windowState.id)} className="hover:bg-black/20 p-1 rounded transition-colors">
            <Square className="w-4 h-4" />
          </button>
          <button onClick={() => onClose(windowState.id)} className="hover:bg-red-600 p-1 rounded transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto bg-slate-900">
        <AppContent appId={app.id} />
      </div>
    </div>
  );
};

// App Content Component
const AppContent: React.FC<{ appId: string }> = ({ appId }) => {
  switch (appId) {
    case 'ai':
      return <AIStudioApp />;
    case 'documents':
      return <DocumentsApp />;
    case 'spreadsheet':
      return <SpreadsheetApp />;
    case 'mail':
      return <MailApp />;
    case 'calendar':
      return <CalendarApp />;
    case 'tasks':
      return <TasksApp />;
    case 'notes':
      return <NotesApp />;
    case 'dashboard':
      return <DashboardApp />;
    case 'files':
      return <FilesApp />;
    case 'terminal':
      return <TerminalApp />;
    case 'browser':
      return <BrowserApp />;
    case 'calculator':
      return <CalculatorApp />;
    case 'server':
      return <ServerApp />;
    case 'database':
      return <DatabaseApp />;
    case 'settings':
      return <SettingsApp />;
    default:
      return <div className="p-4 text-slate-400">App not found</div>;
  }
};

// ===== ADVANCED APPLICATION COMPONENTS =====

// 1. AI STUDIO
const AIStudioApp: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: 'Welcome to AI Studio! I\'m powered by advanced AI. Ask me anything about code, writing, analysis, or creative projects.', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionInfo, setSessionInfo] = useState({ tokens: 2048, models: 3, temperature: 0.7 });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate API response with real-time typing
    setTimeout(() => {
      const responses = [
        'That\'s an insightful question. Let me break this down for you with concrete examples and use cases.',
        'I can help you with that. Here are the key points to consider: 1) Context matters, 2) Implementation details are crucial, 3) Testing is essential.',
        'Interesting perspective! This relates to several important concepts in modern software development.',
        'Great question! Let me provide you with a comprehensive analysis covering theory, practice, and best practices.',
      ];

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-full p-4 space-y-4">
      {/* Session Info */}
      <div className="bg-slate-800 p-3 rounded border border-slate-700 flex justify-between items-center">
        <div className="flex gap-6 text-sm">
          <div><span className="text-slate-400">Tokens:</span> <span className="text-blue-400 font-medium">{sessionInfo.tokens}</span></div>
          <div><span className="text-slate-400">Models:</span> <span className="text-blue-400 font-medium">{sessionInfo.models}</span></div>
          <div><span className="text-slate-400">Temp:</span> <span className="text-blue-400 font-medium">{sessionInfo.temperature}</span></div>
        </div>
        <RefreshCw className="w-4 h-4 text-slate-400 cursor-pointer hover:text-blue-400" />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 bg-slate-900 p-3 rounded border border-slate-700">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-md px-4 py-3 rounded-lg ${
              msg.role === 'user'
                ? 'bg-blue-600 text-white rounded-br-none'
                : 'bg-slate-700 text-gray-100 rounded-bl-none'
            }`}>
              <p className="text-sm">{msg.content}</p>
              <span className="text-xs mt-1 block opacity-70">{msg.timestamp.toLocaleTimeString()}</span>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-700 text-gray-100 px-4 py-3 rounded-lg rounded-bl-none">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded text-white text-sm focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleSend}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// 2. DOCUMENTS APP
const DocumentsApp: React.FC = () => {
  const [content, setContent] = useState('Welcome to Documents\n\nStart typing here...');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    setWordCount(content.trim().split(/\s+/).length);
  }, [content]);

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="bg-slate-800 border-b border-slate-700 p-3 flex gap-2 flex-wrap">
        <button className="p-2 hover:bg-slate-700 rounded text-slate-300 hover:text-white transition-colors" title="Bold">
          <Bold className="w-4 h-4" />
        </button>
        <button className="p-2 hover:bg-slate-700 rounded text-slate-300 hover:text-white transition-colors" title="Italic">
          <Italic className="w-4 h-4" />
        </button>
        <button className="p-2 hover:bg-slate-700 rounded text-slate-300 hover:text-white transition-colors" title="Underline">
          <Type className="w-4 h-4" />
        </button>
        <div className="w-px bg-slate-700" />
        <button className="p-2 hover:bg-slate-700 rounded text-slate-300 hover:text-white transition-colors" title="Save">
          <Save className="w-4 h-4" />
        </button>
        <button className="p-2 hover:bg-slate-700 rounded text-slate-300 hover:text-white transition-colors" title="Download">
          <Download className="w-4 h-4" />
        </button>
        <div className="flex-1" />
        <div className="text-slate-400 text-sm">Words: {wordCount}</div>
      </div>

      {/* Editor */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-1 p-6 bg-slate-900 text-white resize-none focus:outline-none font-serif text-base leading-relaxed"
        spellCheck="true"
      />
    </div>
  );
};

// 3. SPREADSHEET APP
const SpreadsheetApp: React.FC = () => {
  const [data, setData] = useState<Array<Array<string>>>([
    ['Name', 'Q1', 'Q2', 'Q3', 'Q4', 'Total'],
    ['Product A', '1200', '1400', '1600', '1800', '6000'],
    ['Product B', '2000', '2100', '2200', '2300', '8600'],
    ['Product C', '1500', '1600', '1700', '1900', '6700'],
    ['Product D', '900', '1100', '1300', '1400', '4700'],
  ]);

  const handleCellChange = (row: number, col: number, value: string) => {
    const newData = [...data];
    newData[row][col] = value;
    setData(newData);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Toolbar */}
      <div className="bg-slate-800 border-b border-slate-700 p-3 flex gap-2">
        <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium">+ Row</button>
        <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium">+ Column</button>
        <div className="flex-1" />
        <button className="p-1 hover:bg-slate-700 rounded text-slate-300">
          <Save className="w-4 h-4" />
        </button>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-auto bg-slate-900">
        <table className="w-full border-collapse text-sm">
          <tbody>
            {data.map((row, rowIdx) => (
              <tr key={rowIdx}>
                {row.map((cell, colIdx) => (
                  <td
                    key={colIdx}
                    className="border border-slate-700 bg-slate-800 hover:bg-slate-700 transition-colors"
                  >
                    <input
                      type="text"
                      value={cell}
                      onChange={(e) => handleCellChange(rowIdx, colIdx, e.target.value)}
                      className="w-full px-3 py-2 bg-transparent text-white border-none focus:outline-none focus:bg-slate-600"
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

// 4. MAIL APP
const MailApp: React.FC = () => {
  const [emails, setEmails] = useState([
    { id: 1, from: 'team@company.com', subject: 'Project Update - Q1 Goals', date: 'Today 10:30 AM', preview: 'Great progress on the new features...', isRead: false },
    { id: 2, from: 'boss@company.com', subject: 'Meeting Tomorrow at 2 PM', date: 'Today 9:15 AM', preview: 'Please confirm your attendance...', isRead: false },
    { id: 3, from: 'support@service.com', subject: 'Ticket #12345 Resolved', date: 'Yesterday 4:20 PM', preview: 'Your support ticket has been resolved...', isRead: true },
  ]);

  const [selectedEmail, setSelectedEmail] = useState<number | null>(null);
  const [composing, setComposing] = useState(false);

  return (
    <div className="flex h-full">
      {/* List */}
      <div className="w-96 border-r border-slate-700 flex flex-col bg-slate-900">
        <div className="p-3 border-b border-slate-700 flex gap-2">
          <button className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" /> Compose
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {emails.map(email => (
            <button
              key={email.id}
              onClick={() => setSelectedEmail(email.id)}
              className={`w-full p-4 border-b border-slate-800 text-left hover:bg-slate-800 transition-colors ${!email.isRead ? 'bg-slate-800' : ''}`}
            >
              <div className="flex items-start gap-2">
                <div className={`w-2 h-2 rounded-full mt-1 flex-shrink-0 ${!email.isRead ? 'bg-blue-500' : 'bg-transparent'}`} />
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-medium truncate ${!email.isRead ? 'text-white' : 'text-slate-400'}`}>
                    {email.from}
                  </div>
                  <div className="text-sm text-slate-400 truncate">{email.subject}</div>
                  <div className="text-xs text-slate-500 mt-1">{email.date}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Preview */}
      {selectedEmail && (
        <div className="flex-1 flex flex-col p-6 bg-slate-800">
          {emails.find(e => e.id === selectedEmail) && (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-white mb-2">{emails.find(e => e.id === selectedEmail)?.subject}</h2>
                <p className="text-slate-400 text-sm">{emails.find(e => e.id === selectedEmail)?.from}</p>
              </div>
              <div className="text-slate-300">{emails.find(e => e.id === selectedEmail)?.preview}</div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

// 5. CALENDAR APP
const CalendarApp: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 1));
  const [events] = useState([
    { date: 5, title: 'Team Meeting', time: '2:00 PM' },
    { date: 12, title: 'Project Deadline', time: 'All Day' },
    { date: 20, title: 'Client Review', time: '3:30 PM' },
  ]);

  const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const days: (number | null)[] = [];
  for (let i = 0; i < getFirstDayOfMonth(currentDate); i++) {
    days.push(null);
  }
  for (let i = 1; i <= getDaysInMonth(currentDate); i++) {
    days.push(i);
  }

  return (
    <div className="p-6 bg-slate-800 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}>
          <ChevronLeft className="w-5 h-5 text-blue-400" />
        </button>
        <h2 className="text-xl font-bold text-white">
          {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h2>
        <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}>
          <ChevronRight className="w-5 h-5 text-blue-400" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 flex-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-slate-400 text-sm font-medium py-2">{day}</div>
        ))}
        {days.map((day, idx) => {
          const hasEvent = events.some(e => e.date === day);
          return (
            <div
              key={idx}
              className={`p-3 rounded border ${
                day === null
                  ? 'bg-slate-900 border-slate-900'
                  : hasEvent
                  ? 'bg-blue-900 border-blue-600 cursor-pointer hover:bg-blue-800'
                  : 'bg-slate-700 border-slate-600 cursor-pointer hover:bg-slate-600'
              }`}
            >
              {day && <div className="text-white font-medium text-sm">{day}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// 6. TASKS APP
const TasksApp: React.FC = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Complete API Documentation', done: false, priority: 'high', dueDate: 'Today' },
    { id: 2, title: 'Review Pull Requests', done: false, priority: 'medium', dueDate: 'Tomorrow' },
    { id: 3, title: 'Update Dependencies', done: true, priority: 'low', dueDate: 'Yesterday' },
    { id: 4, title: 'Prepare Presentation', done: false, priority: 'high', dueDate: '2 days' },
  ]);

  const [newTask, setNewTask] = useState('');

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const addTask = () => {
    if (newTask.trim()) {
      setTasks(prev => [...prev, {
        id: Math.max(...prev.map(t => t.id), 0) + 1,
        title: newTask,
        done: false,
        priority: 'medium',
        dueDate: 'Today',
      }]);
      setNewTask('');
    }
  };

  return (
    <div className="flex flex-col h-full p-4 space-y-4 bg-slate-800">
      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={addTask}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Tasks */}
      <div className="flex-1 overflow-y-auto space-y-2">
        {tasks.map(task => (
          <div
            key={task.id}
            className="flex items-center gap-3 p-3 bg-slate-700 rounded hover:bg-slate-600 transition-colors group"
          >
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleTask(task.id)}
              className="cursor-pointer w-5 h-5 accent-blue-500"
            />
            <div className="flex-1">
              <div className={`text-sm font-medium ${task.done ? 'line-through text-slate-400' : 'text-white'}`}>
                {task.title}
              </div>
              <div className="text-xs text-slate-400 flex gap-2 mt-1">
                <span className={`px-2 py-0.5 rounded ${
                  task.priority === 'high' ? 'bg-red-900 text-red-200' : 'bg-slate-600 text-slate-300'
                }`}>
                  {task.priority}
                </span>
                <span>{task.dueDate}</span>
              </div>
            </div>
            <button className="p-1 opacity-0 group-hover:opacity-100 hover:bg-slate-800 rounded transition-all">
              <Trash2 className="w-4 h-4 text-red-400" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// 7. NOTES APP
const NotesApp: React.FC = () => {
  const [notes, setNotes] = useState([
    { id: 1, title: 'Project Ideas', date: 'Today', content: 'New features to implement...' },
    { id: 2, title: 'Code Snippets', date: 'Yesterday', content: 'Useful functions and utilities...' },
    { id: 3, title: 'Meeting Notes', date: '2 days ago', content: 'Action items from team meeting...' },
  ]);

  const [selectedNote, setSelectedNote] = useState<number | null>(notes[0]?.id || null);
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    const note = notes.find(n => n.id === selectedNote);
    if (note) setEditContent(note.content);
  }, [selectedNote, notes]);

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-64 border-r border-slate-700 bg-slate-900 flex flex-col">
        <button className="p-3 border-b border-slate-700 bg-blue-600 hover:bg-blue-700 text-white rounded-none font-medium">
          + New Note
        </button>

        <div className="flex-1 overflow-y-auto">
          {notes.map(note => (
            <button
              key={note.id}
              onClick={() => setSelectedNote(note.id)}
              className={`w-full p-3 text-left border-b border-slate-800 hover:bg-slate-800 transition-colors ${
                selectedNote === note.id ? 'bg-slate-700' : ''
              }`}
            >
              <div className="font-medium text-sm text-white">{note.title}</div>
              <div className="text-xs text-slate-400 mt-1">{note.date}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 flex flex-col p-4 space-y-4 bg-slate-800">
        {selectedNote && (
          <>
            <h2 className="text-lg font-bold text-white">{notes.find(n => n.id === selectedNote)?.title}</h2>
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="flex-1 p-4 bg-slate-900 text-white border border-slate-700 rounded resize-none focus:outline-none focus:border-blue-500"
              placeholder="Type here..."
            />
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium">Save</button>
              <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded text-sm font-medium">Delete</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// 8. DASHBOARD APP
const DashboardApp: React.FC = () => {
  const [metricsData] = useState(generateAnalyticsData());
  const [realTimeStats, setRealTimeStats] = useState({ cpu: 45, memory: 60, disk: 75, requests: 1250 });

  useEffect(() => {
    const timer = setInterval(() => {
      setRealTimeStats({
        cpu: Math.max(20, Math.min(95, 45 + (Math.random() - 0.5) * 30)),
        memory: Math.max(30, Math.min(95, 60 + (Math.random() - 0.5) * 25)),
        disk: Math.max(50, Math.min(100, 75 + (Math.random() - 0.5) * 15)),
        requests: Math.max(1000, 1250 + Math.floor((Math.random() - 0.5) * 500)),
      });
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-4 bg-slate-800 h-full overflow-auto space-y-4">
      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-slate-700 p-4 rounded border border-slate-600">
          <div className="text-slate-400 text-sm">CPU Usage</div>
          <div className="text-2xl font-bold text-blue-400 mt-2">{Math.round(realTimeStats.cpu)}%</div>
          <div className="text-xs text-slate-500 mt-2">Real-time</div>
        </div>
        <div className="bg-slate-700 p-4 rounded border border-slate-600">
          <div className="text-slate-400 text-sm">Memory</div>
          <div className="text-2xl font-bold text-green-400 mt-2">{Math.round(realTimeStats.memory)}%</div>
          <div className="text-xs text-slate-500 mt-2">Real-time</div>
        </div>
        <div className="bg-slate-700 p-4 rounded border border-slate-600">
          <div className="text-slate-400 text-sm">Storage</div>
          <div className="text-2xl font-bold text-yellow-400 mt-2">{Math.round(realTimeStats.disk)}%</div>
          <div className="text-xs text-slate-500 mt-2">Real-time</div>
        </div>
        <div className="bg-slate-700 p-4 rounded border border-slate-600">
          <div className="text-slate-400 text-sm">Requests</div>
          <div className="text-2xl font-bold text-purple-400 mt-2">{realTimeStats.requests}</div>
          <div className="text-xs text-slate-500 mt-2">Last hour</div>
        </div>
      </div>

      {/* Charts */}
      <div className="bg-slate-700 p-4 rounded border border-slate-600">
        <h3 className="font-semibold text-white mb-4">Weekly Analytics</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={metricsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis dataKey="name" stroke="#94a3b8" />
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
  );
};

// 9. FILES APP
const FilesApp: React.FC = () => {
  const [files] = useState([
    { id: 1, name: 'Project Proposal.docx', size: '2.4 MB', modified: 'Today', type: 'document' },
    { id: 2, name: 'Budget Analysis.xlsx', size: '1.8 MB', modified: 'Yesterday', type: 'spreadsheet' },
    { id: 3, name: 'Team Photo.jpg', size: '3.2 MB', modified: '2 days ago', type: 'image' },
    { id: 4, name: 'Meeting Recording.mp4', size: '456 MB', modified: '1 week ago', type: 'video' },
  ]);

  const [selectedFile, setSelectedFile] = useState<number | null>(null);

  return (
    <div className="flex h-full">
      {/* Toolbar */}
      <div className="w-full flex flex-col">
        <div className="bg-slate-800 border-b border-slate-700 p-3 flex gap-2">
          <button className="p-2 hover:bg-slate-700 rounded text-slate-300 hover:text-white">
            <SkipBack className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-slate-700 rounded text-slate-300 hover:text-white">
            <SkipForward className="w-4 h-4" />
          </button>
          <div className="flex-1" />
          <input
            type="text"
            placeholder="Search files..."
            className="px-3 py-1 bg-slate-700 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* File List */}
        <div className="flex-1 overflow-auto bg-slate-900">
          {files.map(file => (
            <div
              key={file.id}
              onClick={() => setSelectedFile(file.id)}
              className={`p-4 border-b border-slate-800 cursor-pointer hover:bg-slate-800 transition-colors ${
                selectedFile === file.id ? 'bg-slate-700' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                <Box className="w-8 h-8 text-slate-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-white font-medium truncate">{file.name}</div>
                  <div className="text-sm text-slate-400 mt-1">{file.size} • {file.modified}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 10. TERMINAL APP
const TerminalApp: React.FC = () => {
  const [commands] = useState([
    '$ npm install',
    '✓ Added 47 packages',
    '$ npm run dev',
    '> vite',
    'VITE v6.4.1 ready in 837ms',
    'Local: http://localhost:3000/',
    '$ git status',
    'On branch main',
    'Your branch is up to date',
  ]);

  const [input, setInput] = useState('');

  return (
    <div className="flex flex-col h-full p-4 font-mono text-sm space-y-1 bg-slate-900">
      {/* Command history */}
      <div className="flex-1 overflow-y-auto space-y-1 mb-4">
        {commands.map((cmd, idx) => (
          <div key={idx} className={cmd.startsWith('$') ? 'text-blue-400' : 'text-green-400'}>
            {cmd}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 text-blue-400">
        <span>$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent border-none text-white focus:outline-none"
          placeholder="Type a command..."
        />
      </div>
    </div>
  );
};

// 11. BROWSER APP
const BrowserApp: React.FC = () => {
  const [url, setUrl] = useState('https://example.com');

  return (
    <div className="flex flex-col h-full">
      {/* Address bar */}
      <div className="bg-slate-800 border-b border-slate-700 p-3 flex gap-2">
        <button className="p-2 hover:bg-slate-700 rounded text-slate-300 hover:text-white">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button className="p-2 hover:bg-slate-700 rounded text-slate-300 hover:text-white">
          <ChevronRight className="w-4 h-4" />
        </button>
        <button className="p-2 hover:bg-slate-700 rounded text-slate-300 hover:text-white">
          <RefreshCw className="w-4 h-4" />
        </button>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Content */}
      <div className="flex-1 bg-white flex items-center justify-center">
        <div className="text-center text-gray-600">
          <Globe className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>Web browser - {url}</p>
        </div>
      </div>
    </div>
  );
};

// 12. CALCULATOR APP
const CalculatorApp: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);

  const handleNumber = (num: string) => {
    setDisplay(display === '0' ? num : display + num);
  };

  const handleOperation = (op: string) => {
    setPreviousValue(parseFloat(display));
    setOperation(op);
    setDisplay('0');
  };

  const handleEquals = () => {
    if (previousValue !== null && operation) {
      const current = parseFloat(display);
      let result = previousValue;
      if (operation === '+') result += current;
      else if (operation === '-') result -= current;
      else if (operation === '*') result *= current;
      else if (operation === '/') result /= current;
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
    <div className="p-6 bg-slate-800 h-full flex flex-col">
      {/* Display */}
      <div className="bg-slate-900 p-4 rounded mb-4 text-right">
        <div className="text-3xl font-mono font-bold text-white truncate">{display}</div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-4 gap-2 flex-1">
        {buttons.map((row, rowIdx) => (
          row.map((btn, btnIdx) => (
            <button
              key={`${rowIdx}-${btnIdx}`}
              onClick={() => {
                if (btn === '=') handleEquals();
                else if (['+', '-', '*', '/'].includes(btn)) handleOperation(btn);
                else handleNumber(btn);
              }}
              className={`py-4 rounded font-bold text-white text-lg transition-colors ${
                ['+', '-', '*', '/'].includes(btn)
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : btn === '='
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-slate-700 hover:bg-slate-600'
              }`}
            >
              {btn}
            </button>
          ))
        ))}
      </div>
    </div>
  );
};

// 13. SERVER APP
const ServerApp: React.FC = () => {
  const [serverStatus, setServerStatus] = useState({ status: 'running', uptime: '45 days 2h', processes: 247 });

  return (
    <div className="p-4 bg-slate-800 h-full space-y-4 overflow-auto">
      {/* Status */}
      <div className="bg-green-900 border border-green-600 p-4 rounded">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <div>
            <div className="font-semibold text-green-300">Server Status: {serverStatus.status}</div>
            <div className="text-sm text-green-200">Uptime: {serverStatus.uptime}</div>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-700 p-4 rounded border border-slate-600">
          <div className="text-slate-400 text-sm">Processes</div>
          <div className="text-2xl font-bold text-white mt-2">{serverStatus.processes}</div>
        </div>
        <div className="bg-slate-700 p-4 rounded border border-slate-600">
          <div className="text-slate-400 text-sm">Connections</div>
          <div className="text-2xl font-bold text-white mt-2">1,247</div>
        </div>
      </div>

      {/* Services */}
      <div className="bg-slate-700 p-4 rounded border border-slate-600 space-y-2">
        <h3 className="font-semibold text-white">Services</h3>
        <div className="space-y-2">
          {['Node.js', 'PostgreSQL', 'Redis', 'Nginx'].map(service => (
            <div key={service} className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-slate-300">{service}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 14. DATABASE APP
const DatabaseApp: React.FC = () => {
  const [tables] = useState([
    { name: 'users', rows: 1247, size: '2.4 MB' },
    { name: 'posts', rows: 45230, size: '12.8 MB' },
    { name: 'comments', rows: 123456, size: '45.2 MB' },
    { name: 'analytics', rows: 987654, size: '156 MB' },
  ]);

  return (
    <div className="p-4 bg-slate-800 h-full flex flex-col space-y-4">
      {/* Query input */}
      <div>
        <label className="text-slate-300 text-sm">SQL Query</label>
        <textarea
          className="w-full mt-2 p-3 bg-slate-900 border border-slate-600 rounded text-white font-mono text-sm focus:outline-none focus:border-blue-500"
          placeholder="SELECT * FROM users..."
          rows={4}
        />
      </div>

      {/* Tables */}
      <div>
        <h3 className="font-semibold text-white mb-3">Tables</h3>
        <div className="space-y-2 overflow-auto max-h-64">
          {tables.map(table => (
            <div key={table.name} className="bg-slate-700 p-3 rounded border border-slate-600 text-sm">
              <div className="font-medium text-white">{table.name}</div>
              <div className="text-slate-400 text-xs mt-1">
                Rows: {table.rows.toLocaleString()} • Size: {table.size}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 15. SETTINGS APP
const SettingsApp: React.FC = () => {
  return (
    <div className="p-4 bg-slate-800 h-full space-y-4 overflow-auto">
      {/* System Section */}
      <div className="bg-slate-700 p-4 rounded border border-slate-600">
        <h3 className="font-semibold text-white mb-3">System</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-300">Dark Mode</span>
            <input type="checkbox" defaultChecked className="w-4 h-4 accent-blue-500" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-300">Auto-update</span>
            <input type="checkbox" defaultChecked className="w-4 h-4 accent-blue-500" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-300">Notifications</span>
            <input type="checkbox" defaultChecked className="w-4 h-4 accent-blue-500" />
          </div>
        </div>
      </div>

      {/* Performance */}
      <div className="bg-slate-700 p-4 rounded border border-slate-600">
        <h3 className="font-semibold text-white mb-3">Performance</h3>
        <div className="space-y-3">
          <div>
            <label className="text-slate-300 text-sm">Animation Quality</label>
            <select className="w-full mt-2 px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white text-sm focus:outline-none">
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* About */}
      <div className="bg-slate-700 p-4 rounded border border-slate-600">
        <h3 className="font-semibold text-white mb-3">About MegamOS</h3>
        <div className="space-y-2 text-sm text-slate-300">
          <div>Version: 2.0.1</div>
          <div>Build: 2026.05</div>
          <div>Last Updated: Today</div>
        </div>
      </div>
    </div>
  );
};

export default MegamOSDesktop;
