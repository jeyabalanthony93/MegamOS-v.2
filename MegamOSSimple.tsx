import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle, FileText, Grid, Mail, Calendar, CheckSquare, Sticky, BarChart3,
  Folder, Terminal, Globe, Calculator, Server, Database, Settings, Menu, X,
  Search, Plus, Trash2, Send, Edit, Save, Download, Bold, Italic, List, Code,
  Eye, Play, Clock, Wifi, Cpu, HardDrive, Zap, Minimize2, Maximize2, ChevronRight,
  ChevronLeft, Star, RefreshCw, Filter, Share2, Share, Bookmark, Flag, Archive, Copy
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { create } from 'zustand';

// ====== ZUSTAND STORE ======
const useWindowStore = create((set) => ({
  windows: {},
  addWindow: (id, data) => set((state) => ({ windows: { ...state.windows, [id]: data } })),
  updateWindow: (id, updates) => set((state) => ({ windows: { ...state.windows, [id]: { ...state.windows[id], ...updates } } })),
  removeWindow: (id) => set((state) => {
    const newWindows = { ...state.windows };
    delete newWindows[id];
    return { windows: newWindows };
  }),
}));

// ====== MOCK DATA ======
const generateChartData = () => Array.from({ length: 12 }, (_, i) => ({
  time: `${i}:00`,
  cpu: Math.floor(Math.random() * 40 + 30),
  memory: Math.floor(Math.random() * 50 + 40),
}));

// ====== AI STUDIO ======
const AIStudioApp = () => {
  const [messages, setMessages] = useState([{ id: '1', role: 'assistant', text: 'Welcome to AI Studio! Ask me anything.' }]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now().toString(), role: 'user', text: input }]);
    setTimeout(() => {
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', text: 'That\'s an interesting question! Let me help you with that.' }]);
    }, 1000);
    setInput('');
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs px-4 py-2 rounded ${msg.role === 'user' ? 'bg-blue-600' : 'bg-slate-700'}`}>{msg.text}</div>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-700 p-3 flex gap-2">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder="Type message..." className="flex-1 bg-slate-700 text-white px-3 py-2 rounded outline-none" />
        <button onClick={handleSend} className="bg-blue-600 text-white px-4 py-2 rounded"><Send size={18} /></button>
      </div>
    </div>
  );
};

// ====== DASHBOARD ======
const DashboardApp = () => {
  const data = generateChartData();
  return (
    <div className="h-full flex flex-col bg-slate-900 p-4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">System Dashboard</h2>
      <div className="grid grid-cols-4 gap-4 mb-4">
        {[{ label: 'CPU', value: '42%', icon: Cpu }, { label: 'Memory', value: '68%', icon: HardDrive }, { label: 'Disk', value: '73%', icon: Zap }, { label: 'Network', value: '2.3 GB', icon: Wifi }].map((kpi, i) => (
          <div key={i} className="bg-slate-800 border border-slate-700 rounded p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-slate-400 text-sm">{kpi.label}</span>
              <kpi.icon size={18} />
            </div>
            <div className="text-2xl font-bold">{kpi.value}</div>
          </div>
        ))}
      </div>
      <div className="bg-slate-800 border border-slate-700 rounded p-4">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid stroke="#334155" />
            <XAxis dataKey="time" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="cpu" stroke="#3b82f6" dot={false} />
            <Line type="monotone" dataKey="memory" stroke="#10b981" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// ====== CALCULATOR ======
const CalculatorApp = () => {
  const [display, setDisplay] = useState('0');
  const [prev, setPrev] = useState(null);
  const [op, setOp] = useState(null);

  const handleNum = (n) => setDisplay(display === '0' ? n : display + n);
  const handleOp = (o) => { setPrev(parseFloat(display)); setOp(o); setDisplay('0'); };
  const handleEq = () => {
    if (op && prev !== null) {
      let result = prev;
      const curr = parseFloat(display);
      if (op === '+') result = prev + curr;
      if (op === '-') result = prev - curr;
      if (op === '×') result = prev * curr;
      if (op === '÷') result = prev / curr;
      setDisplay(result.toString());
      setOp(null);
      setPrev(null);
    }
  };

  return (
    <div className="h-full flex items-center justify-center p-4">
      <div className="w-80 space-y-4">
        <div className="bg-slate-800 border border-slate-700 rounded p-4 text-right text-4xl font-bold">{display}</div>
        <div className="grid grid-cols-4 gap-2">
          {['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '-', '0', '.', '=', '+'].map(btn => (
            <button key={btn} onClick={() => { if (btn === '=') handleEq(); else if (['+', '-', '×', '÷'].includes(btn)) handleOp(btn); else handleNum(btn); }} className={`p-4 rounded font-bold ${['+', '-', '×', '÷', '='].includes(btn) ? 'bg-blue-600' : 'bg-slate-700'}`}>{btn}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

// ====== TERMINAL ======
const TerminalApp = () => {
  const [history, setHistory] = useState(['$ welcome to terminal']);
  const [input, setInput] = useState('');

  const handleCmd = () => {
    const cmds = { whoami: 'megamos_user', date: new Date().toString(), help: 'Commands: whoami, date, help, clear', clear: '' };
    const out = cmds[input.toLowerCase()] || `Command not found: ${input}`;
    setHistory(prev => [...prev, `$ ${input}`, ...(out ? [out] : [])]);
    setInput('');
  };

  return (
    <div className="h-full flex flex-col bg-black font-mono p-4">
      <div className="flex-1 overflow-y-auto space-y-1 mb-4">
        {history.map((line, i) => (
          <div key={i} className={line.startsWith('$') ? 'text-green-400' : 'text-slate-300'}>{line}</div>
        ))}
      </div>
      <div className="flex gap-2">
        <span className="text-green-400">$</span>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleCmd()} className="flex-1 bg-transparent text-green-400 outline-none" autoFocus />
      </div>
    </div>
  );
};

// ====== BROWSER ======
const BrowserApp = () => {
  const [url, setUrl] = useState('https://example.com');
  return (
    <div className="h-full flex flex-col">
      <div className="bg-slate-800 border-b border-slate-700 p-3 flex gap-2">
        <button className="p-2 hover:bg-slate-700"><ChevronLeft size={18} /></button>
        <button className="p-2 hover:bg-slate-700"><ChevronRight size={18} /></button>
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} className="flex-1 bg-slate-700 text-white px-3 py-2 rounded outline-none text-sm" />
      </div>
      <div className="flex-1 flex items-center justify-center text-center">
        <div><h1 className="text-4xl font-bold mb-4">MegamOS Browser</h1><p className="text-slate-400">Type a URL above to browse</p></div>
      </div>
    </div>
  );
};

// ====== FILES ======
const FilesApp = () => {
  const files = [
    { id: '1', name: 'Project.docx', size: '245 KB', date: '2026-02-05' },
    { id: '2', name: 'Data.xlsx', size: '156 KB', date: '2026-02-04' },
    { id: '3', name: 'Presentation.pptx', size: '3.2 MB', date: '2026-02-03' },
  ];
  return (
    <div className="h-full flex flex-col">
      <div className="bg-slate-800 border-b border-slate-700 p-3"><input type="text" placeholder="Search..." className="w-full bg-slate-700 text-white px-3 py-2 rounded outline-none text-sm" /></div>
      <div className="flex-1 overflow-y-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-800 sticky top-0"><tr><th className="p-3 text-left">Name</th><th className="p-3">Size</th><th className="p-3">Date</th></tr></thead>
          <tbody>
            {files.map(f => (
              <tr key={f.id} className="border-b border-slate-700 hover:bg-slate-800"><td className="p-3">{f.name}</td><td className="p-3">{f.size}</td><td className="p-3">{f.date}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ====== SERVER ======
const ServerApp = () => {
  const services = [
    { name: 'API Server', status: 'running', uptime: '45d', port: 8000 },
    { name: 'Database', status: 'running', uptime: '120d', port: 5432 },
    { name: 'Cache', status: 'running', uptime: '30d', port: 6379 },
  ];
  return (
    <div className="h-full p-4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Server Status</h2>
      <div className="grid grid-cols-1 gap-4">
        {services.map((s, i) => (
          <div key={i} className="bg-slate-800 border border-slate-700 rounded p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">{s.name}</h3>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div className="text-sm text-slate-400">Port: {s.port} | Uptime: {s.uptime}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ====== DATABASE ======
const DatabaseApp = () => {
  return (
    <div className="h-full flex flex-col">
      <textarea defaultValue="SELECT * FROM users LIMIT 10;" className="flex-1 bg-slate-800 text-white p-4 m-4 rounded font-mono outline-none resize-none" />
      <button className="mx-4 mb-4 bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"><Play size={16} /> Execute</button>
    </div>
  );
};

// ====== SETTINGS ======
const SettingsApp = () => {
  return (
    <div className="h-full overflow-y-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <div className="space-y-4 max-w-2xl">
        <div className="bg-slate-800 rounded p-4 border border-slate-700">
          <h2 className="font-semibold mb-3">System</h2>
          <div className="space-y-2 text-sm text-slate-400"><div>OS: MegamOS v2.0</div><div>Build: 2026.02.05</div></div>
        </div>
        <div className="bg-slate-800 rounded p-4 border border-slate-700">
          <h2 className="font-semibold mb-3">Display</h2>
          <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Dark Mode</label>
        </div>
      </div>
    </div>
  );
};

// ====== TASKS ======
const TasksApp = () => {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Complete project', priority: 'high', done: false },
    { id: '2', title: 'Code review', priority: 'medium', done: false },
    { id: '3', title: 'Update docs', priority: 'low', done: true },
  ]);

  return (
    <div className="h-full flex flex-col p-4">
      <h2 className="text-xl font-bold mb-4">Tasks</h2>
      <div className="flex-1 overflow-y-auto space-y-2">
        {tasks.map(t => (
          <motion.div key={t.id} className={`flex items-center gap-3 p-3 bg-slate-800 border border-slate-700 rounded ${t.done ? 'opacity-50' : ''}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <input type="checkbox" defaultChecked={t.done} className="w-5 h-5" />
            <span className={t.done ? 'line-through' : ''}>{t.title}</span>
            <span className={`ml-auto px-2 py-1 text-xs rounded ${t.priority === 'high' ? 'bg-red-900' : t.priority === 'medium' ? 'bg-yellow-900' : 'bg-blue-900'}`}>{t.priority}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ====== NOTES ======
const NotesApp = () => {
  const [notes] = useState([
    { id: '1', title: 'Ideas', color: 'bg-yellow-500' },
    { id: '2', title: 'Code Snippets', color: 'bg-blue-500' },
  ]);
  const [selected, setSelected] = useState('1');

  return (
    <div className="h-full flex">
      <div className="w-48 bg-slate-800 border-r border-slate-700 p-3 space-y-2">
        {notes.map(n => (
          <button key={n.id} onClick={() => setSelected(n.id)} className={`w-full text-left p-2 rounded ${selected === n.id ? 'bg-blue-600' : 'hover:bg-slate-700'}`}>
            <div className={`w-full h-3 rounded mb-2 ${n.color}`} />{n.title}
          </button>
        ))}
      </div>
      <div className="flex-1 p-4"><textarea className="w-full h-full bg-slate-800 text-white p-4 rounded outline-none resize-none" placeholder="Type your note..." /></div>
    </div>
  );
};

// ====== CALENDAR ======
const CalendarApp = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 5));
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="h-full flex flex-col p-4">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}><ChevronLeft /></button>
        <h2 className="text-xl font-bold">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
        <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}><ChevronRight /></button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
          <div key={d} className="text-center font-semibold text-slate-400 text-xs py-2">{d}</div>
        ))}
        {Array.from({ length: firstDay }).map((_, i) => (<div key={`e-${i}`} />))}
        {days.map(day => (
          <div key={day} className="border border-slate-700 rounded p-2 min-h-16 bg-slate-800 hover:bg-slate-700 cursor-pointer text-center">{day}</div>
        ))}
      </div>
    </div>
  );
};

// ====== MAIL ======
const MailApp = () => {
  const emails = [
    { id: '1', from: 'team@company.com', subject: 'Project Update', preview: 'New features released...' },
    { id: '2', from: 'manager@company.com', subject: 'Meeting Tomorrow', preview: 'Quarterly review...' },
  ];
  const [selected, setSelected] = useState('1');

  return (
    <div className="h-full flex">
      <div className="w-64 bg-slate-800 border-r border-slate-700 overflow-y-auto">
        {emails.map(e => (
          <div key={e.id} onClick={() => setSelected(e.id)} className={`border-b border-slate-700 p-3 cursor-pointer ${selected === e.id ? 'bg-slate-700' : 'hover:bg-slate-750'}`}>
            <div className="font-semibold text-sm">{e.from}</div>
            <div className="text-xs text-slate-400">{e.subject}</div>
          </div>
        ))}
      </div>
      <div className="flex-1 p-4">{emails.find(e => e.id === selected) && <div><h2 className="text-2xl font-bold mb-2">{emails.find(e => e.id === selected)?.subject}</h2><p className="text-slate-400">{emails.find(e => e.id === selected)?.preview}</p></div>}</div>
    </div>
  );
};

// ====== SPREADSHEET ======
const SpreadsheetApp = () => {
  const [cells, setCells] = useState({});
  const cols = Array.from({ length: 10 }, (_, i) => String.fromCharCode(65 + i));
  const rows = Array.from({ length: 20 }, (_, i) => i + 1);

  return (
    <div className="h-full flex flex-col overflow-auto">
      <table className="border-collapse">
        <thead><tr className="bg-slate-800 sticky top-0"><th className="border border-slate-700 p-2 w-8"></th>{cols.map(c => (<th key={c} className="border border-slate-700 p-2 w-24 text-center text-xs bg-slate-800">{c}</th>))}</tr></thead>
        <tbody>{rows.map(r => (<tr key={r}><td className="border border-slate-700 p-2 w-8 text-center text-xs bg-slate-800">{r}</td>{cols.map(c => (<td key={`${c}${r}`} className="border border-slate-700 p-0 w-24"><input type="text" className="w-full h-full p-2 bg-slate-900 text-white text-sm border-0 outline-none" onChange={(e) => setCells({ ...cells, [`${c}${r}`]: e.target.value })} /></td>))}</tr>))}</tbody>
      </table>
    </div>
  );
};

// ====== DOCUMENTS ======
const DocumentsApp = () => {
  const [docs] = useState([{ id: '1', title: 'Report Q1' }]);
  const [selected] = useState('1');

  return (
    <div className="h-full flex flex-col">
      <div className="bg-slate-800 border-b border-slate-700 p-3 flex gap-2"><button className="bg-blue-600 text-white px-3 py-1 rounded text-sm flex items-center gap-1"><Plus size={14} /> New</button></div>
      <div className="flex flex-1">
        <div className="w-48 bg-slate-800 border-r border-slate-700 p-3">{docs.map(d => (<div key={d.id} className={`p-2 rounded cursor-pointer ${selected === d.id ? 'bg-blue-600' : 'hover:bg-slate-700'}`}>{d.title}</div>))}</div>
        <div className="flex-1 p-6"><textarea className="w-full h-full bg-slate-800 text-white p-4 rounded outline-none resize-none" placeholder="Document content..." /></div>
      </div>
    </div>
  );
};

// ====== WINDOW COMPONENT ======
const AppWindow = ({ window: win, children, onRemove, onUpdate }) => {
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragRef.current = { x: e.clientX - win.x, y: e.clientY - win.y };
  };

  useEffect(() => {
    const handleMove = (e) => {
      if (!isDragging) return;
      onUpdate(win.id, { x: e.clientX - dragRef.current.x, y: e.clientY - dragRef.current.y });
    };
    if (isDragging) {
      document.addEventListener('mousemove', handleMove);
      return () => document.removeEventListener('mousemove', handleMove);
    }
  }, [isDragging, win.id, onUpdate]);

  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} style={{ left: win.x, top: win.y, width: win.width, height: win.height, zIndex: win.zIndex }} className="absolute bg-slate-900 border border-slate-700 rounded-lg shadow-2xl overflow-hidden flex flex-col">
      <div onMouseDown={handleMouseDown} className="bg-gradient-to-r from-slate-800 to-slate-700 border-b border-slate-600 px-4 py-3 flex items-center justify-between cursor-move select-none">
        <span className="font-semibold">{win.title}</span>
        <div className="flex gap-2">
          <button onClick={() => onUpdate(win.id, { isMinimized: true })} className="hover:bg-slate-600 p-1 rounded"><Minimize2 size={14} /></button>
          <button onClick={() => onUpdate(win.id, { isMaximized: !win.isMaximized })} className="hover:bg-slate-600 p-1 rounded"><Maximize2 size={14} /></button>
          <button onClick={() => onRemove(win.id)} className="hover:bg-red-600 p-1 rounded"><X size={14} /></button>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">{children}</div>
    </motion.div>
  );
};

// ====== APP RENDERER ======
const RenderApp = ({ appId }) => {
  const apps = {
    ai: <AIStudioApp />,
    documents: <DocumentsApp />,
    spreadsheet: <SpreadsheetApp />,
    mail: <MailApp />,
    calendar: <CalendarApp />,
    tasks: <TasksApp />,
    notes: <NotesApp />,
    dashboard: <DashboardApp />,
    files: <FilesApp />,
    terminal: <TerminalApp />,
    browser: <BrowserApp />,
    calculator: <CalculatorApp />,
    server: <ServerApp />,
    database: <DatabaseApp />,
    settings: <SettingsApp />,
  };
  return apps[appId] || <div className="p-4 text-slate-400">Unknown app</div>;
};

// ====== MAIN MEGAMOS ======
export default function MegamOS() {
  const { windows, addWindow, updateWindow, removeWindow } = useWindowStore();
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [systemTime, setSystemTime] = useState(new Date());
  const [zIndexCounter, setZIndexCounter] = useState(100);

  useEffect(() => {
    const timer = setInterval(() => setSystemTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const APPS = [
    { id: 'ai', name: 'AI Studio', icon: <MessageCircle size={20} /> },
    { id: 'documents', name: 'Documents', icon: <FileText size={20} /> },
    { id: 'spreadsheet', name: 'Spreadsheet', icon: <Grid size={20} /> },
    { id: 'mail', name: 'Mail', icon: <Mail size={20} /> },
    { id: 'calendar', name: 'Calendar', icon: <Calendar size={20} /> },
    { id: 'tasks', name: 'Tasks', icon: <CheckSquare size={20} /> },
    { id: 'notes', name: 'Notes', icon: <Sticky size={20} /> },
    { id: 'dashboard', name: 'Dashboard', icon: <BarChart3 size={20} /> },
    { id: 'files', name: 'Files', icon: <Folder size={20} /> },
    { id: 'terminal', name: 'Terminal', icon: <Terminal size={20} /> },
    { id: 'browser', name: 'Browser', icon: <Globe size={20} /> },
    { id: 'calculator', name: 'Calculator', icon: <Calculator size={20} /> },
    { id: 'server', name: 'Server', icon: <Server size={20} /> },
    { id: 'database', name: 'Database', icon: <Database size={20} /> },
    { id: 'settings', name: 'Settings', icon: <Settings size={20} /> },
  ];

  const filteredApps = useMemo(() => APPS.filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase())), [searchQuery]);

  const launchApp = (appId) => {
    const app = APPS.find(a => a.id === appId);
    if (!app) return;
    const windowId = `${appId}-${Date.now()}`;
    addWindow(windowId, {
      id: windowId,
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

  const minimizedWindows = Object.values(windows).filter(w => w?.isMinimized);

  return (
    <div className="w-screen h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      <AnimatePresence>
        {Object.entries(windows).map(([id, win]) => (
          <AppWindow key={id} window={win} onRemove={removeWindow} onUpdate={updateWindow}>
            <RenderApp appId={win.appId} />
          </AppWindow>
        ))}
      </AnimatePresence>

      <motion.div initial={{ y: 100 }} animate={{ y: 0 }} className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-slate-900 to-slate-800 border-t border-slate-700 px-4 py-3 flex items-center justify-between z-50">
        <div className="relative">
          <motion.button whileHover={{ scale: 1.05 }} onClick={() => setStartMenuOpen(!startMenuOpen)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2 font-bold">
            <Menu size={18} /> Start
          </motion.button>
          <AnimatePresence>
            {startMenuOpen && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="absolute bottom-full left-0 mb-2 w-96 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl p-4 max-h-96 overflow-y-auto">
                <div className="flex gap-2 mb-3"><Search size={18} /><input type="text" autoFocus placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="flex-1 bg-slate-700 text-white px-2 py-1 rounded outline-none text-sm" /></div>
                <div className="grid grid-cols-3 gap-2">
                  {filteredApps.map(app => (
                    <motion.button key={app.id} whileHover={{ scale: 1.05 }} onClick={() => launchApp(app.id)} className="flex flex-col items-center gap-2 p-3 rounded hover:bg-slate-700">
                      <div className="text-2xl">{app.icon}</div>
                      <span className="text-xs text-center">{app.name}</span>
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
              <button key={win.id} onClick={() => updateWindow(win.id, { isMinimized: false })} className="px-3 py-1 text-xs bg-slate-700 hover:bg-slate-600 text-white rounded">
                {win.title}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Wifi size={14} />
          <Cpu size={14} />
          <Clock size={14} />
          <span>{systemTime.toLocaleTimeString()}</span>
        </div>
      </motion.div>
    </div>
  );
}
