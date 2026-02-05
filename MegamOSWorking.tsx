import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle, FileText, Grid, Mail, Calendar, CheckSquare, Sticky, BarChart3,
  Folder, Terminal, Globe, Calculator, Server, Database, Settings, Menu, X,
  Search, Send, Minimize2, Maximize2, Wifi, Cpu, Clock
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Simple Window Manager Component
const WindowManager = () => {
  const [windows, setWindows] = useState({});
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [systemTime, setSystemTime] = useState(new Date());
  const [zIndex, setZIndex] = useState(100);

  useEffect(() => {
    const timer = setInterval(() => setSystemTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const APPS = [
    { id: 'ai', name: 'AI Studio', icon: MessageCircle, color: 'bg-pink-600' },
    { id: 'docs', name: 'Documents', icon: FileText, color: 'bg-blue-600' },
    { id: 'sheet', name: 'Spreadsheet', icon: Grid, color: 'bg-green-600' },
    { id: 'mail', name: 'Mail', icon: Mail, color: 'bg-red-600' },
    { id: 'calendar', name: 'Calendar', icon: Calendar, color: 'bg-yellow-600' },
    { id: 'tasks', name: 'Tasks', icon: CheckSquare, color: 'bg-purple-600' },
    { id: 'notes', name: 'Notes', icon: Sticky, color: 'bg-orange-600' },
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3, color: 'bg-cyan-600' },
    { id: 'files', name: 'Files', icon: Folder, color: 'bg-amber-600' },
    { id: 'terminal', name: 'Terminal', icon: Terminal, color: 'bg-slate-600' },
    { id: 'browser', name: 'Browser', icon: Globe, color: 'bg-indigo-600' },
    { id: 'calc', name: 'Calculator', icon: Calculator, color: 'bg-lime-600' },
    { id: 'server', name: 'Server', icon: Server, color: 'bg-rose-600' },
    { id: 'db', name: 'Database', icon: Database, color: 'bg-teal-600' },
    { id: 'settings', name: 'Settings', icon: Settings, color: 'bg-stone-600' },
  ];

  const launchApp = (appId) => {
    const app = APPS.find(a => a.id === appId);
    if (!app) return;
    
    const windowId = `${appId}-${Date.now()}`;
    setWindows(prev => ({
      ...prev,
      [windowId]: {
        id: windowId,
        appId,
        title: app.name,
        x: Math.random() * 200 + 100,
        y: Math.random() * 200 + 50,
        width: 800,
        height: 500,
        minified: false,
        maximized: false,
        zIndex: zIndex,
      }
    }));
    setZIndex(prev => prev + 1);
    setStartMenuOpen(false);
    setSearchQuery('');
  };

  const closeWindow = (windowId) => {
    setWindows(prev => {
      const newWindows = { ...prev };
      delete newWindows[windowId];
      return newWindows;
    });
  };

  const toggleMinify = (windowId) => {
    setWindows(prev => ({
      ...prev,
      [windowId]: { ...prev[windowId], minified: !prev[windowId].minified }
    }));
  };

  const toggleMaximize = (windowId) => {
    setWindows(prev => ({
      ...prev,
      [windowId]: { ...prev[windowId], maximized: !prev[windowId].maximized }
    }));
  };

  const minimizedWindows = Object.values(windows).filter(w => w?.minified);
  const filteredApps = APPS.filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="w-screen h-screen bg-slate-950 overflow-hidden relative">
      {/* Windows */}
      <AnimatePresence>
        {Object.entries(windows).filter(([_, w]) => !w.minified).map(([id, win]) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            style={{
              position: 'absolute',
              left: win.x,
              top: win.y,
              width: win.maximized ? '100%' : win.width,
              height: win.maximized ? '100%' : win.height,
              zIndex: win.zIndex,
            }}
            className="flex flex-col bg-slate-900 border border-slate-700 rounded-lg shadow-2xl overflow-hidden"
          >
            {/* Title Bar */}
            <div className="bg-slate-800 border-b border-slate-700 px-3 py-2 flex items-center justify-between flex-shrink-0">
              <span className="font-bold text-white text-sm">{win.title}</span>
              <div className="flex gap-2">
                <button onClick={() => toggleMaximize(id)} className="text-slate-400 hover:text-white">
                  <Maximize2 size={16} />
                </button>
                <button onClick={() => toggleMinify(id)} className="text-slate-400 hover:text-white">
                  <Minimize2 size={16} />
                </button>
                <button onClick={() => closeWindow(id)} className="text-slate-400 hover:text-red-500">
                  <X size={16} />
                </button>
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 overflow-y-auto bg-slate-900 p-4">
              <AppContent appId={win.appId} />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Taskbar */}
      <div className="absolute bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700 px-4 py-3 flex items-center justify-between z-50">
        <div className="relative">
          <button
            onClick={() => setStartMenuOpen(!startMenuOpen)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2 font-bold"
          >
            <Menu size={18} /> Start
          </button>

          {startMenuOpen && (
            <div className="absolute bottom-full left-0 mb-2 w-96 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl p-4">
              <div className="flex gap-2 mb-3">
                <Search size={18} className="text-slate-400" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Search apps..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-slate-700 text-white px-2 py-1 rounded outline-none text-sm"
                />
              </div>
              <div className="grid grid-cols-3 gap-2 max-h-80 overflow-y-auto">
                {filteredApps.map(app => {
                  const Icon = app.icon;
                  return (
                    <button
                      key={app.id}
                      onClick={() => launchApp(app.id)}
                      className={`flex flex-col items-center gap-2 p-3 rounded ${app.color} bg-opacity-20 hover:bg-opacity-40 transition`}
                    >
                      <Icon size={24} className="text-white" />
                      <span className="text-xs text-center text-white">{app.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {minimizedWindows.length > 0 && (
          <div className="flex gap-2">
            {minimizedWindows.map(win => (
              <button
                key={win.id}
                onClick={() => toggleMinify(win.id)}
                className="px-3 py-1 text-xs bg-slate-700 hover:bg-slate-600 text-white rounded"
              >
                {win.title}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center gap-3 text-xs text-slate-400">
          <Wifi size={14} />
          <Cpu size={14} />
          <Clock size={14} className="mr-1" />
          <span>{systemTime.toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
};

// App Content Component
const AppContent = ({ appId }) => {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Welcome to AI Studio!' }
  ]);
  const [input, setInput] = useState('');
  const [docs, setDocs] = useState(['Document 1', 'Document 2']);
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Build MegamOS', done: false },
    { id: 2, text: 'Add features', done: false },
  ]);
  const [emails, setEmails] = useState([
    { from: 'User', subject: 'Hello', body: 'This is a test email' },
  ]);
  const [notes, setNotes] = useState(['Note 1', 'Note 2']);

  if (appId === 'ai') {
    return (
      <div className="h-full flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-3">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs px-4 py-2 rounded ${msg.role === 'user' ? 'bg-blue-600' : 'bg-slate-700'} text-white`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-3 flex-shrink-0">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && input.trim()) {
                setMessages([...messages, { role: 'user', text: input }]);
                setTimeout(() => {
                  setMessages(prev => [...prev, { role: 'assistant', text: 'Got it! How can I help?' }]);
                }, 500);
                setInput('');
              }
            }}
            placeholder="Type a message..."
            className="flex-1 bg-slate-700 text-white px-3 py-2 rounded outline-none"
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
            <Send size={18} />
          </button>
        </div>
      </div>
    );
  }

  if (appId === 'docs') {
    return (
      <div className="h-full flex gap-4">
        <div className="w-48 border-r border-slate-700 pr-4">
          <h3 className="font-bold mb-3">Documents</h3>
          {docs.map(doc => (
            <div key={doc} className="py-2 px-2 rounded hover:bg-slate-700 cursor-pointer text-sm text-white">
              {doc}
            </div>
          ))}
        </div>
        <div className="flex-1 flex flex-col">
          <textarea
            placeholder="Type your document here..."
            className="flex-1 bg-slate-800 text-white p-3 rounded outline-none resize-none"
          />
        </div>
      </div>
    );
  }

  if (appId === 'sheet') {
    return (
      <div className="h-full overflow-auto">
        <table className="w-full border-collapse border border-slate-700">
          <thead>
            <tr className="bg-slate-800">
              {Array.from({ length: 5 }).map((_, i) => (
                <th key={i} className="border border-slate-700 p-2 text-white font-bold w-24">
                  Col {i + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }).map((_, i) => (
              <tr key={i}>
                {Array.from({ length: 5 }).map((_, j) => (
                  <td key={j} className="border border-slate-700 p-1">
                    <input type="text" className="w-full bg-slate-700 text-white p-1 text-xs outline-none" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (appId === 'mail') {
    return (
      <div className="h-full flex gap-4">
        <div className="w-48 border-r border-slate-700 pr-4">
          <h3 className="font-bold mb-3 text-white">Inbox</h3>
          {emails.map((email, i) => (
            <div key={i} className="py-2 px-2 rounded hover:bg-slate-700 cursor-pointer border-b border-slate-700 text-sm text-white">
              <div className="font-bold">{email.from}</div>
              <div className="text-xs text-slate-400">{email.subject}</div>
            </div>
          ))}
        </div>
        <div className="flex-1">
          <h3 className="font-bold mb-3 text-white">{emails[0]?.subject}</h3>
          <p className="text-white">{emails[0]?.body}</p>
        </div>
      </div>
    );
  }

  if (appId === 'calendar') {
    return (
      <div className="p-4">
        <h3 className="font-bold mb-4 text-white text-lg">February 2026</h3>
        <div className="grid grid-cols-7 gap-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center font-bold text-white text-sm py-2">
              {day}
            </div>
          ))}
          {Array.from({ length: 35 }).map((_, i) => (
            <div
              key={i}
              className={`p-2 rounded text-center text-sm cursor-pointer ${
                (i + 1) <= 28 ? 'bg-slate-700 text-white hover:bg-blue-600' : 'text-slate-600'
              }`}
            >
              {(i + 1) <= 28 ? i + 1 : ''}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (appId === 'tasks') {
    return (
      <div className="p-4">
        <h3 className="font-bold mb-4 text-white">Tasks</h3>
        <div className="space-y-2">
          {tasks.map(task => (
            <div key={task.id} className="flex items-center gap-3 p-2 bg-slate-800 rounded">
              <input type="checkbox" defaultChecked={task.done} className="w-4 h-4" />
              <span className={`text-white ${task.done ? 'line-through' : ''}`}>{task.text}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (appId === 'notes') {
    return (
      <div className="h-full flex gap-4">
        <div className="w-32 border-r border-slate-700 pr-4">
          <h3 className="font-bold mb-3 text-white">Notes</h3>
          {notes.map(note => (
            <div key={note} className="py-2 px-2 rounded hover:bg-slate-700 cursor-pointer text-sm text-white">
              {note}
            </div>
          ))}
        </div>
        <textarea className="flex-1 bg-slate-800 text-white p-3 rounded outline-none resize-none" placeholder="Write a note..." />
      </div>
    );
  }

  if (appId === 'dashboard') {
    const data = Array.from({ length: 12 }, (_, i) => ({
      time: `${i}:00`,
      cpu: Math.floor(Math.random() * 50 + 30),
      memory: Math.floor(Math.random() * 60 + 30),
    }));

    return (
      <div className="h-full flex flex-col">
        <h3 className="font-bold mb-4 text-white text-lg">System Dashboard</h3>
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[{ label: 'CPU', value: '45%' }, { label: 'Memory', value: '62%' }, { label: 'Disk', value: '71%' }, { label: 'Network', value: '2.1 GB' }].map((kpi, i) => (
            <div key={i} className="bg-slate-800 border border-slate-700 rounded p-4">
              <div className="text-slate-400 text-xs">{kpi.label}</div>
              <div className="text-2xl font-bold text-white">{kpi.value}</div>
            </div>
          ))}
        </div>
        <div className="flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid stroke="#334155" />
              <XAxis dataKey="time" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="cpu" stroke="#3b82f6" />
              <Line type="monotone" dataKey="memory" stroke="#10b981" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }

  if (appId === 'files') {
    return (
      <div className="p-4">
        <h3 className="font-bold mb-4 text-white">Files</h3>
        <table className="w-full text-sm">
          <thead className="border-b border-slate-700">
            <tr className="text-slate-400">
              <th className="text-left py-2">Name</th>
              <th className="text-left py-2">Size</th>
              <th className="text-left py-2">Date</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {['Document.txt', 'Image.jpg', 'Archive.zip'].map((file, i) => (
              <tr key={i} className="border-b border-slate-700 hover:bg-slate-800">
                <td className="py-2">{file}</td>
                <td>256 KB</td>
                <td>2/5/2026</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (appId === 'terminal') {
    return (
      <div className="h-full flex flex-col font-mono text-sm">
        <div className="flex-1 overflow-y-auto p-3 text-slate-300">
          <div>$ whoami</div>
          <div className="text-cyan-400">user@megamos</div>
          <div>$ date</div>
          <div className="text-cyan-400">Wed Feb 5 08:45:42 2026</div>
          <div>$ ls</div>
          <div className="text-cyan-400">Desktop Documents Downloads Music Pictures</div>
        </div>
        <div className="border-t border-slate-700 p-3">
          <input type="text" className="w-full bg-slate-800 text-cyan-400 outline-none" defaultValue="$ " />
        </div>
      </div>
    );
  }

  if (appId === 'browser') {
    return (
      <div className="h-full flex flex-col">
        <div className="flex gap-2 p-3 border-b border-slate-700 bg-slate-800">
          <button className="px-3 py-1 bg-slate-700 rounded text-white text-sm">← Back</button>
          <button className="px-3 py-1 bg-slate-700 rounded text-white text-sm">Forward →</button>
          <input type="text" placeholder="http://example.com" className="flex-1 bg-slate-700 text-white px-3 py-1 rounded outline-none text-sm" />
        </div>
        <div className="flex-1 p-4 overflow-y-auto text-white">
          <h2 className="text-xl font-bold mb-3">Welcome to MegamOS Browser</h2>
          <p>Start browsing the internet with this simple browser.</p>
        </div>
      </div>
    );
  }

  if (appId === 'calc') {
    const [display, setDisplay] = useState('0');
    return (
      <div className="p-4">
        <div className="bg-slate-800 text-white text-right p-4 rounded mb-4 text-2xl font-bold">
          {display}
        </div>
        <div className="grid grid-cols-4 gap-2">
          {['7', '8', '9', '/'].map(btn => (
            <button key={btn} className="bg-slate-700 hover:bg-slate-600 text-white p-3 rounded font-bold">
              {btn}
            </button>
          ))}
          {['4', '5', '6', '*'].map(btn => (
            <button key={btn} className="bg-slate-700 hover:bg-slate-600 text-white p-3 rounded font-bold">
              {btn}
            </button>
          ))}
          {['1', '2', '3', '-'].map(btn => (
            <button key={btn} className="bg-slate-700 hover:bg-slate-600 text-white p-3 rounded font-bold">
              {btn}
            </button>
          ))}
          {['0', '.', '=', '+'].map(btn => (
            <button key={btn} className="bg-slate-700 hover:bg-slate-600 text-white p-3 rounded font-bold">
              {btn}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (appId === 'server') {
    return (
      <div className="p-4">
        <h3 className="font-bold mb-4 text-white">Server Status</h3>
        <div className="space-y-3">
          {['Web Server', 'Database', 'Cache', 'API Gateway'].map((service, i) => (
            <div key={i} className="bg-slate-800 border border-slate-700 rounded p-3 flex items-center justify-between">
              <span className="text-white">{service}</span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-500 text-sm">Running</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (appId === 'db') {
    return (
      <div className="h-full flex flex-col">
        <textarea
          className="flex-1 bg-slate-800 text-white p-3 rounded outline-none font-mono text-sm resize-none"
          defaultValue="SELECT * FROM users WHERE active = true;"
          placeholder="Enter SQL query..."
        />
        <button className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold">
          Execute Query
        </button>
      </div>
    );
  }

  if (appId === 'settings') {
    return (
      <div className="p-4 space-y-4">
        <div>
          <h3 className="font-bold mb-2 text-white">System Information</h3>
          <div className="space-y-1 text-sm text-slate-300">
            <div>OS: MegamOS v2.0</div>
            <div>Version: 2026.02.05</div>
            <div>Kernel: 5.10.0</div>
          </div>
        </div>
        <div className="border-t border-slate-700 pt-4">
          <h3 className="font-bold mb-2 text-white">Display</h3>
          <label className="flex items-center gap-2 text-white">
            <input type="checkbox" defaultChecked /> Dark Mode
          </label>
        </div>
      </div>
    );
  }

  return (
    <div className="text-white p-4">
      <p>App not found: {appId}</p>
    </div>
  );
};

export default WindowManager;
