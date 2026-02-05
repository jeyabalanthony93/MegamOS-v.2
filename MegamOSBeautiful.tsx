import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, Zap, Brain, Code, Cloud, Database, Shield, Rocket,
  Settings, Home, Search, Plus, X, Minimize2, Maximize2, ChevronDown,
  BarChart3, GitBranch, Terminal, Globe, Lock, Users, Flame,
  Play, Pause, Volume2, Moon, Sun, Menu, Bell, User, LogOut
} from 'lucide-react';

const MegamOS = () => {
  const [windows, setWindows] = useState({});
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [time, setTime] = useState(new Date());
  const [zIndex, setZIndex] = useState(100);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'AI Processing', message: 'Quantum algorithm compiled successfully', type: 'success' }
  ]);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const APPLICATIONS = [
    { id: 'ai-chat', name: 'AI Studio', icon: Brain, color: '#667eea', gradient: 'from-blue-600 to-purple-600', desc: 'GPT-powered intelligent assistant' },
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3, color: '#4facfe', gradient: 'from-cyan-500 to-blue-500', desc: 'Real-time analytics & metrics' },
    { id: 'code-editor', name: 'Code Studio', icon: Code, color: '#764ba2', gradient: 'from-purple-500 to-pink-500', desc: 'Full-stack development environment' },
    { id: 'database', name: 'Data Forge', icon: Database, color: '#00c7b7', gradient: 'from-teal-500 to-cyan-500', desc: 'Advanced data management' },
    { id: 'cloud', name: 'Cloud Hub', icon: Cloud, color: '#5a67d8', gradient: 'from-indigo-500 to-purple-500', desc: 'Multi-cloud orchestration' },
    { id: 'security', name: 'Sentinel Pro', icon: Shield, color: '#ff6b6b', gradient: 'from-red-500 to-pink-500', desc: 'Enterprise security suite' },
    { id: 'git', name: 'DevOps Pro', icon: GitBranch, color: '#f093fb', gradient: 'from-pink-500 to-rose-500', desc: 'CI/CD pipeline management' },
    { id: 'terminal', name: 'Terminal', icon: Terminal, color: '#6bcf7f', gradient: 'from-green-500 to-teal-500', desc: 'Advanced command interface' },
    { id: 'globe', name: 'Web Browser', icon: Globe, color: '#ff9500', gradient: 'from-amber-500 to-orange-500', desc: 'Next-gen browser engine' },
    { id: 'automation', name: 'Automation', icon: Zap, color: '#ffd93d', gradient: 'from-yellow-500 to-amber-500', desc: 'Workflow automation engine' },
    { id: 'ml', name: 'ML Studio', icon: Spark, color: '#764ba2', gradient: 'from-purple-600 to-blue-600', desc: 'Machine learning platform' },
    { id: 'api', name: 'API Console', icon: Rocket, color: '#00f2fe', gradient: 'from-cyan-400 to-blue-400', desc: 'REST & GraphQL APIs' },
  ];

  const launchApp = (app) => {
    const windowId = `${app.id}-${Date.now()}`;
    setWindows(prev => ({
      ...prev,
      [windowId]: {
        id: windowId,
        appId: app.id,
        title: app.name,
        icon: app.icon,
        x: Math.random() * 300 + 100,
        y: Math.random() * 200 + 80,
        width: 1000,
        height: 700,
        isMinimized: false,
        zIdx: zIndex,
      }
    }));
    setZIndex(prev => prev + 1);
    setStartMenuOpen(false);
    setSelectedApp(app);
  };

  const closeWindow = (id) => {
    setWindows(prev => {
      const newWindows = { ...prev };
      delete newWindows[id];
      return newWindows;
    });
  };

  const toggleMinimize = (id) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: !prev[id].isMinimized }
    }));
  };

  const bringToFront = (id) => {
    setZIndex(prev => prev + 1);
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], zIdx: zIndex + 1 }
    }));
  };

  const filteredApps = APPLICATIONS.filter(app =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const minimizedWindows = Object.values(windows).filter(w => w.isMinimized);
  const visibleWindows = Object.entries(windows).filter(([_, w]) => !w.isMinimized);

  return (
    <div className={`w-screen h-screen overflow-hidden ${isDarkMode ? 'bg-gray-950 text-white' : 'bg-white text-gray-900'}`}>
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{
          background: isDarkMode
            ? ['linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
               'linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #1e293b 100%)']
            : ['linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f8fafc 100%)',
               'linear-gradient(135deg, #e2e8f0 0%, #f8fafc 50%, #e2e8f0 100%)']
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Floating Particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-purple-500 rounded-full opacity-20"
          animate={{
            x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
            y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      {/* Windows */}
      <AnimatePresence>
        {visibleWindows.map(([windowId, win]) => (
          <WindowComponent
            key={windowId}
            windowId={windowId}
            window={win}
            onClose={() => closeWindow(windowId)}
            onMinimize={() => toggleMinimize(windowId)}
            onFocus={() => bringToFront(windowId)}
            isDarkMode={isDarkMode}
          />
        ))}
      </AnimatePresence>

      {/* Taskbar */}
      <motion.div
        className={`absolute bottom-0 left-0 right-0 h-20 ${isDarkMode ? 'bg-slate-900/95' : 'bg-white/95'} backdrop-blur-xl border-t ${isDarkMode ? 'border-slate-700' : 'border-gray-200'} flex items-center justify-between px-6 z-40`}
      >
        {/* Start Menu */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setStartMenuOpen(!startMenuOpen)}
            className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl font-bold ${isDarkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-500 hover:bg-purple-600'} shadow-lg transition-all`}
          >
            🚀
          </motion.button>

          <AnimatePresence>
            {startMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: -10 }}
                exit={{ opacity: 0, y: 10 }}
                className={`absolute bottom-20 left-0 w-96 max-h-96 rounded-xl ${isDarkMode ? 'bg-slate-800' : 'bg-gray-100'} shadow-2xl p-4 overflow-y-auto border ${isDarkMode ? 'border-slate-700' : 'border-gray-200'}`}
              >
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Search applications..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg ${isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-gray-200 border-gray-300'} border outline-none focus:ring-2 focus:ring-purple-500`}
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {filteredApps.map(app => (
                    <motion.button
                      key={app.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => launchApp(app)}
                      className={`p-3 rounded-lg ${isDarkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-200 hover:bg-gray-300'} transition-all flex flex-col items-center gap-2`}
                    >
                      <app.icon className="w-6 h-6" />
                      <span className="text-xs font-semibold text-center">{app.name}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Minimized Apps */}
        <div className="flex gap-2 flex-1 mx-6 overflow-x-auto">
          {minimizedWindows.map(win => (
            <motion.button
              key={win.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleMinimize(win.id)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap ${isDarkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-200 hover:bg-gray-300'} transition-all`}
            >
              {win.title}
            </motion.button>
          ))}
        </div>

        {/* System Tray */}
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-lg ${isDarkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </motion.button>

          <Bell className="w-5 h-5 cursor-pointer hover:text-purple-400 transition" />
          <User className="w-5 h-5 cursor-pointer hover:text-purple-400 transition" />

          <motion.div
            className="text-sm font-mono"
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {time.toLocaleTimeString()}
          </motion.div>
        </div>
      </motion.div>

      {/* Welcome Screen (if no windows open) */}
      {Object.keys(windows).length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
          >
            🚀 MegamOS
          </motion.div>
          <motion.p
            className={`text-xl ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            The Future of Operating Systems
          </motion.p>
          <motion.div
            className="mt-8 text-center text-sm"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <p className={isDarkMode ? 'text-gray-500' : 'text-gray-500'}>Click the 🚀 button to get started</p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

// Window Component
function WindowComponent({ windowId, window: win, onClose, onMinimize, onFocus, isDarkMode }) {
  const [position, setPosition] = useState({ x: win.x, y: win.y });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef(null);

  const handleMouseDown = (e) => {
    if (e.target.closest('button')) return;
    setIsDragging(true);
    setDragOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
    onFocus();
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y });
    };

    const handleMouseUp = () => setIsDragging(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  return (
    <motion.div
      ref={windowRef}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      style={{ left: position.x, top: position.y, zIndex: win.zIdx }}
      className="absolute w-96 h-96 rounded-2xl overflow-hidden shadow-2xl border"
      onMouseDown={() => onFocus()}
    >
      {/* Window Background */}
      <div className={`w-full h-full flex flex-col ${isDarkMode ? 'bg-slate-800' : 'bg-white'} border ${isDarkMode ? 'border-slate-700' : 'border-gray-200'}`}>
        {/* Title Bar */}
        <motion.div
          onMouseDown={handleMouseDown}
          className={`h-14 ${isDarkMode ? 'bg-gradient-to-r from-slate-700 to-slate-600' : 'bg-gradient-to-r from-gray-100 to-gray-50'} border-b ${isDarkMode ? 'border-slate-600' : 'border-gray-200'} flex items-center justify-between px-4 cursor-move hover:brightness-110 transition-all`}
        >
          <div className="flex items-center gap-3">
            {win.icon && <win.icon className="w-5 h-5" />}
            <span className="font-semibold">{win.title}</span>
          </div>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onMinimize}
              className={`p-1 rounded hover:${isDarkMode ? 'bg-slate-600' : 'bg-gray-200'} transition`}
            >
              <Minimize2 className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className={`p-1 rounded hover:${isDarkMode ? 'bg-red-600/50' : 'bg-red-100'} transition`}
            >
              <X className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>

        {/* Content */}
        <div className={`flex-1 overflow-auto p-6`}>
          <AppContent appId={win.appId} isDarkMode={isDarkMode} />
        </div>
      </div>
    </motion.div>
  );
}

// App Content Router
function AppContent({ appId, isDarkMode }) {
  const contentMap = {
    'ai-chat': <AIStudioApp isDarkMode={isDarkMode} />,
    'dashboard': <DashboardApp isDarkMode={isDarkMode} />,
    'code-editor': <CodeEditorApp isDarkMode={isDarkMode} />,
    'database': <DatabaseApp isDarkMode={isDarkMode} />,
    'cloud': <CloudApp isDarkMode={isDarkMode} />,
    'security': <SecurityApp isDarkMode={isDarkMode} />,
    'git': <DevOpsApp isDarkMode={isDarkMode} />,
    'terminal': <TerminalApp isDarkMode={isDarkMode} />,
    'globe': <BrowserApp isDarkMode={isDarkMode} />,
    'automation': <AutomationApp isDarkMode={isDarkMode} />,
    'ml': <MLApp isDarkMode={isDarkMode} />,
    'api': <APIApp isDarkMode={isDarkMode} />,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="w-full h-full"
    >
      {contentMap[appId] || <DefaultApp isDarkMode={isDarkMode} />}
    </motion.div>
  );
}

// Individual App Components
function AIStudioApp({ isDarkMode }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Welcome to AI Studio powered by GPT-4. How can I help you today?' }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSend = () => {
    if (!message.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text: message }]);
    setMessage('');
    setIsProcessing(true);

    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', text: 'Processing your request with advanced AI algorithms...' }]);
      setIsProcessing(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full">
      <div className={`flex-1 overflow-y-auto mb-4 space-y-3 p-4 rounded-lg ${isDarkMode ? 'bg-slate-900/50' : 'bg-gray-50'}`}>
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs px-4 py-2 rounded-lg ${msg.role === 'user' ? `${isDarkMode ? 'bg-purple-600' : 'bg-purple-500'} text-white` : `${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'}`}`}>
              {msg.text}
            </div>
          </motion.div>
        ))}
        {isProcessing && (
          <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity }} className="text-sm text-gray-400">
            ⚡ AI is thinking...
          </motion.div>
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask me anything..."
          className={`flex-1 px-4 py-2 rounded-lg ${isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-gray-200 border-gray-300'} border outline-none focus:ring-2 focus:ring-purple-500`}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSend}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-all"
        >
          <Sparkles className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}

function DashboardApp({ isDarkMode }) {
  const stats = [
    { label: 'CPU Usage', value: 45, color: 'from-red-500 to-orange-500' },
    { label: 'Memory', value: 62, color: 'from-blue-500 to-cyan-500' },
    { label: 'Network', value: 28, color: 'from-green-500 to-teal-500' },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">System Dashboard</h2>
      <div className="grid grid-cols-3 gap-3">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-4 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-100'}`}
          >
            <div className="text-sm text-gray-400 mb-2">{stat.label}</div>
            <div className="text-3xl font-bold mb-2">{stat.value}%</div>
            <div className={`w-full h-2 rounded-full bg-gradient-to-r ${stat.color}`} style={{ opacity: stat.value / 100 }} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function CodeEditorApp({ isDarkMode }) {
  const [code, setCode] = useState('// Welcome to Code Studio\nconsole.log("Hello, World!");');

  return (
    <div className="flex flex-col h-full space-y-3">
      <div className="flex gap-2 pb-2 border-b border-slate-700">
        <motion.button whileHover={{ scale: 1.05 }} className="px-3 py-1 bg-green-600 rounded text-sm">▶ Run</motion.button>
        <motion.button whileHover={{ scale: 1.05 }} className="px-3 py-1 bg-blue-600 rounded text-sm">💾 Save</motion.button>
      </div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className={`flex-1 p-3 rounded font-mono text-sm ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-gray-50 border-gray-200'} border outline-none focus:ring-2 focus:ring-purple-500`}
      />
    </div>
  );
}

function DatabaseApp({ isDarkMode }) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">Data Forge</h3>
      <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-slate-700/50' : 'bg-gray-100'} border ${isDarkMode ? 'border-slate-600' : 'border-gray-200'}`}>
        <p className="text-sm mb-3">MongoDB • PostgreSQL • Elasticsearch</p>
        <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 py-2 rounded font-semibold hover:shadow-lg transition">
          + Connect Database
        </button>
      </div>
    </div>
  );
}

function CloudApp({ isDarkMode }) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">Cloud Hub</h3>
      <div className="grid grid-cols-2 gap-3">
        {['AWS', 'Azure', 'GCP', 'DigitalOcean'].map(provider => (
          <motion.button
            key={provider}
            whileHover={{ scale: 1.05 }}
            className={`p-3 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-100'} hover:shadow-lg transition`}
          >
            {provider}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

function SecurityApp({ isDarkMode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <h3 className="text-xl font-bold flex items-center gap-2">
        <Shield className="w-6 h-6 text-green-500" /> Sentinel Pro
      </h3>
      <div className="text-sm">🟢 All systems secure</div>
    </motion.div>
  );
}

function DevOpsApp({ isDarkMode }) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">DevOps Pro</h3>
      <button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 py-2 rounded font-semibold">
        🚀 Deploy Now
      </button>
    </div>
  );
}

function TerminalApp({ isDarkMode }) {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState(['$ Welcome to Terminal']);

  const handleCommand = () => {
    setOutput(prev => [...prev, `$ ${command}`, 'Command executed']);
    setCommand('');
  };

  return (
    <div className="flex flex-col h-full space-y-3">
      <div className={`flex-1 overflow-auto p-3 rounded font-mono text-sm ${isDarkMode ? 'bg-black' : 'bg-gray-100'}`}>
        {output.map((line, i) => <div key={i}>{line}</div>)}
      </div>
      <input
        type="text"
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleCommand()}
        className={`px-3 py-2 rounded font-mono text-sm ${isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-gray-200 border-gray-300'} border outline-none focus:ring-2 focus:ring-purple-500`}
      />
    </div>
  );
}

function BrowserApp({ isDarkMode }) {
  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="https://example.com"
        className={`w-full px-4 py-2 rounded-lg ${isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-gray-200 border-gray-300'} border`}
      />
      <div className={`p-4 rounded-lg text-center ${isDarkMode ? 'bg-slate-700/50' : 'bg-gray-100'}`}>
        Web content renders here
      </div>
    </div>
  );
}

function AutomationApp({ isDarkMode }) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">Workflow Automation</h3>
      <button className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 py-2 rounded font-semibold">
        ⚡ Create Workflow
      </button>
    </div>
  );
}

function MLApp({ isDarkMode }) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">ML Studio</h3>
      <p className="text-sm">Build and train ML models</p>
    </div>
  );
}

function APIApp({ isDarkMode }) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">API Console</h3>
      <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 py-2 rounded font-semibold">
        🚀 API Docs
      </button>
    </div>
  );
}

function DefaultApp({ isDarkMode }) {
  return (
    <div className="text-center">
      <p className="text-2xl font-bold mb-2">Welcome!</p>
      <p className="text-sm text-gray-400">Application loaded successfully</p>
    </div>
  );
}

// Fix for missing Spark icon
function Spark(props) {
  return <Zap {...props} />;
}

export default MegamOS;
