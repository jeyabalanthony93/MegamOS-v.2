import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, Zap, Brain, Code, Cloud, Database, Shield, Rocket, Settings, Home,
  Search, Plus, X, Minimize2, Copy, Download, Upload, Save, Send, Calendar,
  Mail, Phone, Users, BarChart3, GitBranch, Terminal, Globe, Lock, Menu, Bell,
  User, LogOut, Share2, Edit, Trash2, Eye, CheckCircle, AlertCircle, Info,
  Clock, MapPin, FileText, Image, Video, Music, ArrowRight, ArrowLeft,
  ChevronDown, ChevronRight, Grid, List, Maximize2, Settings as SettingsIcon
} from 'lucide-react';

const MegamOSPro = () => {
  const [windows, setWindows] = useState({});
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [time, setTime] = useState(new Date());
  const [zIndex, setZIndex] = useState(100);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const APPLICATIONS = [
    // AI & Generation
    { id: 'ai-studio', name: 'AI Studio', icon: Brain, color: '#667eea', gradient: 'from-blue-600 to-purple-600', desc: 'GPT-4 powered with generation, prompts, history' },
    { id: 'ai-assistant', name: 'AI Assistant', icon: Sparkles, color: '#764ba2', gradient: 'from-purple-500 to-pink-500', desc: 'Smart assistant with task automation' },
    { id: 'document-gen', name: 'Doc Generator', icon: FileText, color: '#00c7b7', gradient: 'from-teal-500 to-cyan-500', desc: 'Create documents with AI' },
    
    // Development
    { id: 'code-studio', name: 'Code Studio', icon: Code, color: '#764ba2', gradient: 'from-purple-500 to-pink-500', desc: 'Full-stack editor with GitHub integration' },
    { id: 'git-hub', name: 'GitHub Pro', icon: GitBranch, color: '#f093fb', gradient: 'from-pink-500 to-rose-500', desc: 'Repository management and cloning' },
    { id: 'terminal', name: 'Terminal', icon: Terminal, color: '#6bcf7f', gradient: 'from-green-500 to-teal-500', desc: 'Advanced command interface' },
    { id: 'api-console', name: 'API Console', icon: Rocket, color: '#00f2fe', gradient: 'from-cyan-400 to-blue-400', desc: 'REST & GraphQL testing' },
    
    // Data & Analytics
    { id: 'dashboard-pro', name: 'Dashboard Pro', icon: BarChart3, color: '#4facfe', gradient: 'from-cyan-500 to-blue-500', desc: 'Advanced analytics with visualization' },
    { id: 'database-pro', name: 'Database Pro', icon: Database, color: '#00c7b7', gradient: 'from-teal-500 to-cyan-500', desc: 'Multi-database management' },
    { id: 'data-forge', name: 'Data Forge', icon: Grid, color: '#5a67d8', gradient: 'from-indigo-500 to-purple-500', desc: 'Data transformation and visualization' },
    
    // Communication
    { id: 'mail-pro', name: 'Mail Pro', icon: Mail, color: '#ff6b6b', gradient: 'from-red-500 to-pink-500', desc: 'Email with bulk send & scheduling' },
    { id: 'calendar-pro', name: 'Calendar Pro', icon: Calendar, color: '#ffd93d', gradient: 'from-yellow-500 to-amber-500', desc: 'Meetings, scheduling, reminders' },
    { id: 'phone-pro', name: 'Phone Pro', icon: Phone, color: '#ff8fab', gradient: 'from-rose-500 to-pink-500', desc: 'VoIP with conferencing' },
    
    // Cloud & Infrastructure
    { id: 'cloud-hub', name: 'Cloud Hub', icon: Cloud, color: '#5a67d8', gradient: 'from-indigo-500 to-purple-500', desc: 'Multi-cloud orchestration' },
    { id: 'server-admin', name: 'Server Admin', icon: Shield, color: '#ff6b6b', gradient: 'from-red-500 to-pink-500', desc: 'Server management & monitoring' },
    { id: 'storage-pro', name: 'Storage Pro', icon: Home, color: '#00f2fe', gradient: 'from-cyan-400 to-blue-400', desc: 'File management with cloud sync' },
    
    // Business Tools
    { id: 'crm-system', name: 'CRM System', icon: Users, color: '#667eea', gradient: 'from-blue-600 to-purple-600', desc: 'Customer relationship management' },
    { id: 'project-hub', name: 'Project Hub', icon: Rocket, color: '#f093fb', gradient: 'from-pink-500 to-rose-500', desc: 'Project management suite' },
    { id: 'finance-pro', name: 'Finance Pro', icon: BarChart3, color: '#6bcf7f', gradient: 'from-green-500 to-teal-500', desc: 'Financial management' },
    
    // Security & Compliance
    { id: 'security-pro', name: 'Security Pro', icon: Lock, color: '#ff6b6b', gradient: 'from-red-500 to-pink-500', desc: 'Advanced security & compliance' },
    { id: 'vpn-manager', name: 'VPN Manager', icon: Globe, color: '#667eea', gradient: 'from-blue-600 to-purple-600', desc: 'Network security & encryption' },
    { id: 'auth-hub', name: 'Auth Hub', icon: User, color: '#00c7b7', gradient: 'from-teal-500 to-cyan-500', desc: 'Authentication & SSO' },
    
    // Content & Media
    { id: 'media-studio', name: 'Media Studio', icon: Image, color: '#f093fb', gradient: 'from-pink-500 to-rose-500', desc: 'Image & video editing' },
    { id: 'design-pro', name: 'Design Pro', icon: Sparkles, color: '#764ba2', gradient: 'from-purple-500 to-pink-500', desc: 'UI/UX design tools' },
    { id: 'docs-hub', name: 'Docs Hub', icon: FileText, color: '#4facfe', gradient: 'from-cyan-500 to-blue-500', desc: 'Documentation generation' },
    
    // Learning & Development
    { id: 'academy', name: 'Academy', icon: Brain, color: '#ffd93d', gradient: 'from-yellow-500 to-amber-500', desc: 'Online learning platform' },
    { id: 'training-hub', name: 'Training Hub', icon: Users, color: '#667eea', gradient: 'from-blue-600 to-purple-600', desc: 'Employee training system' },
    
    // Advanced Features
    { id: 'ai-ml', name: 'AI/ML Studio', icon: Zap, color: '#764ba2', gradient: 'from-purple-500 to-pink-500', desc: 'Machine learning platform' },
    { id: 'automation-pro', name: 'Automation', icon: Rocket, color: '#ffd93d', gradient: 'from-yellow-500 to-amber-500', desc: 'Workflow automation' },
    { id: 'analytics-pro', name: 'Analytics Pro', icon: BarChart3, color: '#00f2fe', gradient: 'from-cyan-400 to-blue-400', desc: 'Advanced analytics engine' },
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
        width: 1100,
        height: 750,
        isMinimized: false,
        zIdx: zIndex,
      }
    }));
    setZIndex(prev => prev + 1);
    setStartMenuOpen(false);
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
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
          animate={{
            x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
            y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
            opacity: [0.1, 0.5, 0.1],
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
          <AdvancedWindow
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
        className={`absolute bottom-0 left-0 right-0 h-24 ${isDarkMode ? 'bg-slate-900/95' : 'bg-white/95'} backdrop-blur-xl border-t ${isDarkMode ? 'border-slate-700' : 'border-gray-200'} flex items-center justify-between px-6 z-40`}
      >
        {/* Start Menu */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setStartMenuOpen(!startMenuOpen)}
            className={`w-14 h-14 rounded-lg flex items-center justify-center text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg transition-all`}
          >
            🚀
          </motion.button>

          <AnimatePresence>
            {startMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: -10 }}
                exit={{ opacity: 0, y: 10 }}
                className={`absolute bottom-20 left-0 w-[500px] max-h-[500px] rounded-xl ${isDarkMode ? 'bg-slate-800' : 'bg-gray-100'} shadow-2xl p-5 overflow-y-auto border ${isDarkMode ? 'border-slate-700' : 'border-gray-200'}`}
              >
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="🔍 Search 30+ applications..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg ${isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-gray-200 border-gray-300'} border outline-none focus:ring-2 focus:ring-purple-500 font-semibold`}
                  />
                </div>

                <div className="grid grid-cols-4 gap-3">
                  {filteredApps.map(app => (
                    <motion.button
                      key={app.id}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => launchApp(app)}
                      className={`p-4 rounded-lg ${isDarkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-200 hover:bg-gray-300'} transition-all flex flex-col items-center gap-2 hover:shadow-lg`}
                      title={app.desc}
                    >
                      <app.icon className="w-8 h-8" />
                      <span className="text-xs font-bold text-center leading-tight">{app.name}</span>
                    </motion.button>
                  ))}
                </div>

                <motion.div
                  className="mt-4 p-3 rounded-lg bg-purple-600/20 border border-purple-500/30 text-sm text-purple-300"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ✨ {filteredApps.length} applications available
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Minimized Apps */}
        <div className="flex gap-2 flex-1 mx-6 overflow-x-auto max-h-20">
          {minimizedWindows.map(win => (
            <motion.button
              key={win.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleMinimize(win.id)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap ${isDarkMode ? 'bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500' : 'bg-gradient-to-r from-gray-200 to-gray-100'} transition-all hover:shadow-lg`}
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
            onClick={() => setStartMenuOpen(false)}
            className={`p-2 rounded-lg ${isDarkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-200 hover:bg-gray-300'} transition`}
          >
            {isDarkMode ? '🌙' : '☀️'}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-200'} transition`}
          >
            <Bell className="w-5 h-5" />
          </motion.button>

          <motion.div
            className="text-sm font-mono font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {time.toLocaleTimeString()}
          </motion.div>
        </div>
      </motion.div>

      {/* Welcome Screen */}
      {Object.keys(windows).length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        >
          <motion.div
            animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="text-8xl mb-4"
          >
            🚀
          </motion.div>
          <motion.h1
            className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            MegamOS Pro
          </motion.h1>
          <motion.p
            className={`text-2xl ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            The Future of Operating Systems
          </motion.p>
        </motion.div>
      )}
    </div>
  );
};

// Advanced Window Component
function AdvancedWindow({ windowId, window: win, onClose, onMinimize, onFocus, isDarkMode }) {
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
      initial={{ opacity: 0, scale: 0.85, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85, y: 40 }}
      style={{ left: position.x, top: position.y, zIndex: win.zIdx }}
      className="absolute rounded-2xl overflow-hidden shadow-2xl border"
      onMouseDown={() => onFocus()}
    >
      <div className={`flex flex-col ${isDarkMode ? 'bg-slate-800' : 'bg-white'} border ${isDarkMode ? 'border-slate-700' : 'border-gray-200'}`} style={{ width: win.width, height: win.height }}>
        {/* Title Bar */}
        <motion.div
          onMouseDown={handleMouseDown}
          className={`h-16 bg-gradient-to-r ${isDarkMode ? 'from-slate-700 to-slate-600' : 'from-gray-100 to-gray-50'} border-b ${isDarkMode ? 'border-slate-600' : 'border-gray-200'} flex items-center justify-between px-5 cursor-move hover:brightness-110 transition-all gap-3`}
        >
          <div className="flex items-center gap-3 flex-1">
            {win.icon && <win.icon className="w-6 h-6 text-purple-400" />}
            <span className="font-bold text-lg">{win.title}</span>
          </div>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={onMinimize}
              className={`p-2 rounded hover:${isDarkMode ? 'bg-slate-600' : 'bg-gray-200'} transition`}
            >
              <Minimize2 className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className={`p-2 rounded hover:bg-red-600/50 transition`}
            >
              <X className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>

        {/* Content */}
        <div className={`flex-1 overflow-auto p-6 space-y-4`}>
          <AppContentRouter appId={win.appId} isDarkMode={isDarkMode} />
        </div>
      </div>
    </motion.div>
  );
}

// Advanced App Content Router
function AppContentRouter({ appId, isDarkMode }) {
  const contentMap = {
    'ai-studio': <AIStudioAdvanced isDarkMode={isDarkMode} />,
    'code-studio': <CodeStudioAdvanced isDarkMode={isDarkMode} />,
    'dashboard-pro': <DashboardAdvanced isDarkMode={isDarkMode} />,
    'mail-pro': <MailAdvanced isDarkMode={isDarkMode} />,
    'calendar-pro': <CalendarAdvanced isDarkMode={isDarkMode} />,
    'database-pro': <DatabaseAdvanced isDarkMode={isDarkMode} />,
    'storage-pro': <StorageAdvanced isDarkMode={isDarkMode} />,
    'crm-system': <CRMAdvanced isDarkMode={isDarkMode} />,
    'media-studio': <MediaStudioAdvanced isDarkMode={isDarkMode} />,
    'security-pro': <SecurityAdvanced isDarkMode={isDarkMode} />,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="w-full h-full"
    >
      {contentMap[appId] || <DefaultAdvancedApp isDarkMode={isDarkMode} appId={appId} />}
    </motion.div>
  );
}

// AI Studio Advanced
function AIStudioAdvanced({ isDarkMode }) {
  const [messages, setMessages] = useState([
    { id: 1, role: 'ai', text: 'Welcome! I can help you with generation, research, analysis, and more. What can I create for you today?', time: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const prompts = [
    '✍️ Write Article', '📝 Create Report', '💻 Generate Code', '📊 Analyze Data',
    '🎨 Design Brief', '📱 App Idea', '📚 Learning Plan', '🚀 Business Plan'
  ];

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg = { id: messages.length + 1, role: 'user', text: input, time: new Date() };
    setMessages([...messages, newMsg]);
    setInput('');
    setIsGenerating(true);

    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        role: 'ai',
        text: `Generated response for: "${input}". Advanced AI analysis complete with insights and recommendations.`,
        time: new Date()
      }]);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Prompt Templates */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {prompts.map((prompt, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setInput(prompt)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap font-semibold text-sm ${isDarkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-200 hover:bg-gray-300'} transition`}
          >
            {prompt}
          </motion.button>
        ))}
      </div>

      {/* Messages */}
      <div className={`flex-1 overflow-y-auto space-y-4 p-4 rounded-lg ${isDarkMode ? 'bg-slate-900/50' : 'bg-gray-50'}`}>
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs px-5 py-3 rounded-2xl ${msg.role === 'user' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' : `${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'}`}`}>
                <p className="text-sm">{msg.text}</p>
                <p className="text-xs opacity-70 mt-1">{msg.time.toLocaleTimeString()}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isGenerating && (
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="text-sm text-gray-400 flex items-center gap-2"
          >
            <span className="inline-block w-2 h-2 bg-purple-500 rounded-full animate-bounce"></span>
            AI is generating...
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask me anything or choose a template above..."
          className={`flex-1 px-5 py-3 rounded-lg ${isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-gray-200 border-gray-300'} border outline-none focus:ring-2 focus:ring-purple-500`}
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSend}
          disabled={isGenerating}
          className="px-5 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-semibold transition disabled:opacity-50"
        >
          <Send className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}

// Code Studio Advanced
function CodeStudioAdvanced({ isDarkMode }) {
  const [code, setCode] = useState('// Start coding here...\nconsole.log("Hello, MegamOS!");');
  const [language, setLanguage] = useState('javascript');
  const [isSaved, setIsSaved] = useState(true);

  const languages = ['javascript', 'python', 'java', 'cpp', 'typescript', 'go', 'rust'];

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${language === 'javascript' ? 'js' : language === 'python' ? 'py' : 'txt'}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    alert('✓ Code copied to clipboard!');
  };

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Controls */}
      <div className="flex gap-3 flex-wrap">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-gray-200'} border outline-none focus:ring-2 focus:ring-purple-500`}
        >
          {languages.map(lang => (
            <option key={lang} value={lang}>{lang.toUpperCase()}</option>
          ))}
        </select>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => { setCode(''); setIsSaved(false); }}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition flex items-center gap-2"
        >
          <Trash2 className="w-4 h-4" /> Clear
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCopy}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition flex items-center gap-2"
        >
          <Copy className="w-4 h-4" /> Copy
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDownload}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition flex items-center gap-2"
        >
          <Download className="w-4 h-4" /> Download
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsSaved(true)}
          className={`px-4 py-2 rounded-lg font-semibold transition flex items-center gap-2 ${isSaved ? 'bg-green-600' : 'bg-yellow-600 hover:bg-yellow-700'}`}
        >
          <Save className="w-4 h-4" /> {isSaved ? 'Saved' : 'Save'}
        </motion.button>
      </div>

      {/* Code Editor */}
      <textarea
        value={code}
        onChange={(e) => { setCode(e.target.value); setIsSaved(false); }}
        className={`flex-1 p-4 rounded-lg font-mono text-sm ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-gray-100 border-gray-200'} border outline-none focus:ring-2 focus:ring-purple-500 resize-none`}
      />

      {/* Stats */}
      <div className="flex gap-4 text-sm opacity-75">
        <span>Lines: {code.split('\n').length}</span>
        <span>Characters: {code.length}</span>
        <span>Language: {language.toUpperCase()}</span>
      </div>
    </div>
  );
}

// Dashboard Advanced
function DashboardAdvanced({ isDarkMode }) {
  const [viewMode, setViewMode] = useState('cards');
  const [data, setData] = useState([
    { name: 'Monday', value: 65 },
    { name: 'Tuesday', value: 78 },
    { name: 'Wednesday', value: 92 },
    { name: 'Thursday', value: 81 },
    { name: 'Friday', value: 95 },
    { name: 'Saturday', value: 87 },
    { name: 'Sunday', value: 73 },
  ]);

  const stats = [
    { label: 'Total Revenue', value: '$124,500', change: '+12.5%', color: 'from-green-500 to-teal-500' },
    { label: 'Users Online', value: '2,847', change: '+8.2%', color: 'from-blue-500 to-cyan-500' },
    { label: 'Conversion Rate', value: '3.42%', change: '+4.1%', color: 'from-purple-500 to-pink-500' },
    { label: 'Bounce Rate', value: '28.4%', change: '-2.3%', color: 'from-orange-500 to-red-500' },
  ];

  const handleExportCSV = () => {
    const csv = data.map(d => `${d.name},${d.value}`).join('\n');
    const blob = new Blob(['Day,Value\n' + csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dashboard-data.csv';
    a.click();
  };

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Controls */}
      <div className="flex gap-3 items-center">
        <button
          onClick={() => setViewMode('cards')}
          className={`px-4 py-2 rounded-lg font-semibold transition ${viewMode === 'cards' ? 'bg-purple-600' : `${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'}`}`}
        >
          Cards
        </button>
        <button
          onClick={() => setViewMode('chart')}
          className={`px-4 py-2 rounded-lg font-semibold transition ${viewMode === 'chart' ? 'bg-purple-600' : `${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'}`}`}
        >
          Chart
        </button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleExportCSV}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition flex items-center gap-2"
        >
          <Download className="w-4 h-4" /> Export CSV
        </motion.button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {viewMode === 'cards' ? (
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`p-4 rounded-lg bg-gradient-to-br ${stat.color} p-5 text-white rounded-xl shadow-lg`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">{stat.label}</h3>
                  <span className="text-sm bg-white/20 px-2 py-1 rounded">{stat.change}</span>
                </div>
                <p className="text-3xl font-bold">{stat.value}</p>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-slate-700/50' : 'bg-gray-100'}`}>
            <div className="flex items-end justify-around h-64 gap-2">
              {data.map((d, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${(d.value / 100) * 100}%` }}
                  transition={{ delay: i * 0.1, type: 'spring' }}
                  className={`flex-1 bg-gradient-to-t from-purple-600 to-pink-600 rounded-t-lg hover:shadow-lg transition flex items-end justify-center pb-2`}
                >
                  <span className="text-white text-sm font-bold">{d.value}%</span>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-around mt-4 text-sm">
              {data.map((d, i) => (
                <span key={i}>{d.name}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Mail Advanced
function MailAdvanced({ isDarkMode }) {
  const [emails, setEmails] = useState([
    { id: 1, from: 'admin@megamos.com', subject: 'Welcome to MegamOS', preview: 'Your account is ready...', read: false, date: '10:30 AM' },
    { id: 2, from: 'team@megamos.com', subject: 'Project Update', preview: 'Status: On track...', read: true, date: '9:15 AM' },
    { id: 3, from: 'support@megamos.com', subject: 'Help Documentation', preview: 'New features guide...', read: false, date: '8:00 AM' },
  ]);
  const [bulkSendMode, setBulkSendMode] = useState(false);
  const [bulkMessage, setBulkMessage] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');

  const handleBulkSend = () => {
    if (!bulkMessage) return;
    alert(`✓ Scheduled ${emails.length} emails for: ${scheduleTime || 'Now'}`);
    setBulkMessage('');
    setBulkSendMode(false);
  };

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Top Controls */}
      <div className="flex gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setBulkSendMode(!bulkSendMode)}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition flex items-center gap-2"
        >
          <Send className="w-4 h-4" /> {bulkSendMode ? 'Cancel' : 'Bulk Send'}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> New Email
        </motion.button>
      </div>

      {bulkSendMode ? (
        <div className="space-y-3 flex-1 flex flex-col">
          <input
            type="text"
            placeholder="Email subject..."
            className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'} border outline-none focus:ring-2 focus:ring-purple-500`}
          />
          <textarea
            value={bulkMessage}
            onChange={(e) => setBulkMessage(e.target.value)}
            placeholder="Email message..."
            className={`flex-1 px-4 py-2 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'} border outline-none focus:ring-2 focus:ring-purple-500 resize-none`}
          />
          <input
            type="datetime-local"
            value={scheduleTime}
            onChange={(e) => setScheduleTime(e.target.value)}
            className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'} border outline-none focus:ring-2 focus:ring-purple-500`}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBulkSend}
            className="px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 rounded-lg font-bold transition"
          >
            📅 Schedule & Send to {emails.length} Recipients
          </motion.button>
        </div>
      ) : (
        <div className={`flex-1 overflow-y-auto space-y-2 rounded-lg p-2`}>
          {emails.map((email, i) => (
            <motion.div
              key={email.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-4 rounded-lg cursor-pointer transition ${email.read ? `${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'}` : 'bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-500/50'}`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="font-bold">{email.from}</span>
                <span className="text-xs opacity-75">{email.date}</span>
              </div>
              <p className="font-semibold">{email.subject}</p>
              <p className="text-sm opacity-75">{email.preview}</p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

// Calendar Advanced
function CalendarAdvanced({ isDarkMode }) {
  const [month, setMonth] = useState(1);
  const [events, setEvents] = useState([
    { date: 5, title: 'Team Meeting', time: '10:00 AM' },
    { date: 12, title: 'Project Deadline', time: '5:00 PM' },
    { date: 20, title: 'Conference Call', time: '2:00 PM' },
  ]);
  const [newEvent, setNewEvent] = useState({ date: '', title: '', time: '' });

  const daysInMonth = new Date(2026, month, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handleAddEvent = () => {
    if (!newEvent.date || !newEvent.title || !newEvent.time) return;
    setEvents([...events, { ...newEvent, date: parseInt(newEvent.date) }]);
    setNewEvent({ date: '', title: '', time: '' });
  };

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Month Navigation */}
      <div className="flex items-center justify-between">
        <button onClick={() => setMonth(m => m > 1 ? m - 1 : 12)} className="px-4 py-2 bg-purple-600 rounded-lg">◀</button>
        <h2 className="text-2xl font-bold">February 2026</h2>
        <button onClick={() => setMonth(m => m < 12 ? m + 1 : 1)} className="px-4 py-2 bg-purple-600 rounded-lg">▶</button>
      </div>

      {/* Calendar Grid */}
      <div className={`grid grid-cols-7 gap-2 flex-1 p-3 rounded-lg ${isDarkMode ? 'bg-slate-700/30' : 'bg-gray-100'}`}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-bold text-sm opacity-75">{day}</div>
        ))}
        {days.map(day => {
          const dayEvents = events.filter(e => e.date === day);
          return (
            <motion.div
              key={day}
              whileHover={{ scale: 1.05 }}
              className={`p-2 rounded-lg text-center cursor-pointer transition ${dayEvents.length ? 'bg-gradient-to-r from-purple-600 to-pink-600' : `${isDarkMode ? 'bg-slate-600 hover:bg-slate-500' : 'bg-gray-200 hover:bg-gray-300'}`}`}
            >
              <p className="font-bold">{day}</p>
              {dayEvents.length > 0 && (
                <p className="text-xs mt-1 truncate">{dayEvents[0].title}</p>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Event Form */}
      <div className="space-y-2">
        <div className="grid grid-cols-3 gap-2">
          <input
            type="number"
            min="1"
            max="28"
            value={newEvent.date}
            onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
            placeholder="Date"
            className={`px-3 py-2 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'} border outline-none focus:ring-2 focus:ring-purple-500`}
          />
          <input
            type="text"
            value={newEvent.title}
            onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
            placeholder="Event title"
            className={`px-3 py-2 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'} border outline-none focus:ring-2 focus:ring-purple-500`}
          />
          <input
            type="time"
            value={newEvent.time}
            onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
            className={`px-3 py-2 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'} border outline-none focus:ring-2 focus:ring-purple-500`}
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddEvent}
          className="w-full px-4 py-2 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 rounded-lg font-bold transition"
        >
          ➕ Add Event
        </motion.button>
      </div>
    </div>
  );
}

// Database Advanced
function DatabaseAdvanced({ isDarkMode }) {
  const [query, setQuery] = useState('SELECT * FROM users;');
  const [results, setResults] = useState([]);
  const [dbType, setDbType] = useState('postgresql');

  const handleExecute = () => {
    setResults([
      { id: 1, name: 'John Doe', email: 'john@megamos.com', status: 'Active' },
      { id: 2, name: 'Jane Smith', email: 'jane@megamos.com', status: 'Active' },
      { id: 3, name: 'Bob Wilson', email: 'bob@megamos.com', status: 'Inactive' },
    ]);
  };

  const handleDownloadSQL = () => {
    const blob = new Blob([query], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'query.sql';
    a.click();
  };

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Database Selection */}
      <select
        value={dbType}
        onChange={(e) => setDbType(e.target.value)}
        className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'} border outline-none focus:ring-2 focus:ring-purple-500 font-semibold`}
      >
        <option value="postgresql">PostgreSQL</option>
        <option value="mongodb">MongoDB</option>
        <option value="mysql">MySQL</option>
        <option value="elasticsearch">Elasticsearch</option>
      </select>

      {/* Query Editor */}
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={`flex-1 p-4 rounded-lg font-mono text-sm ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-gray-100'} border outline-none focus:ring-2 focus:ring-purple-500 resize-none`}
        placeholder="Enter your SQL query..."
      />

      {/* Controls */}
      <div className="flex gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleExecute}
          className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-lg font-bold transition flex items-center gap-2"
        >
          ▶ Execute
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDownloadSQL}
          className="px-6 py-2 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 rounded-lg font-bold transition flex items-center gap-2"
        >
          <Download className="w-4 h-4" /> Export SQL
        </motion.button>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className={`flex-1 overflow-auto rounded-lg border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-gray-100 border-gray-200'}`}>
          <table className="w-full text-sm">
            <thead className={`${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'}`}>
              <tr>
                {Object.keys(results[0]).map(key => (
                  <th key={key} className="px-4 py-2 text-left font-bold">{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.map((row, i) => (
                <tr key={i} className={`border-t ${isDarkMode ? 'border-slate-700 hover:bg-slate-700/50' : 'border-gray-200 hover:bg-gray-200'}`}>
                  {Object.values(row).map((val, j) => (
                    <td key={j} className="px-4 py-2">{String(val)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// Storage Advanced
function StorageAdvanced({ isDarkMode }) {
  const [files, setFiles] = useState([
    { id: 1, name: 'project.zip', size: '245 MB', type: 'archive', date: '2 days ago' },
    { id: 2, name: 'presentation.pdf', size: '12.5 MB', type: 'document', date: '1 day ago' },
    { id: 3, name: 'video.mp4', size: '756 MB', type: 'video', date: '3 hours ago' },
  ]);

  const handleUpload = () => {
    alert('✓ Files ready to upload. Click to select files.');
  };

  const handleDownload = (file) => {
    alert(`✓ Downloading ${file.name}...`);
  };

  const handleClone = (file) => {
    setFiles([...files, { ...file, id: files.length + 1, name: `${file.name} (copy)` }]);
    alert(`✓ Cloned: ${file.name}`);
  };

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Upload Area */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={`p-6 rounded-lg border-2 border-dashed ${isDarkMode ? 'border-slate-600 bg-slate-700/30' : 'border-gray-300 bg-gray-100'} text-center cursor-pointer transition`}
        onClick={handleUpload}
      >
        <p className="text-xl font-bold mb-2">📁 Drop files or click to upload</p>
        <p className="text-sm opacity-75">Max size: 5GB per file</p>
      </motion.div>

      {/* Files List */}
      <div className="flex-1 overflow-y-auto space-y-2">
        {files.map((file, i) => (
          <motion.div
            key={file.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-4 rounded-lg flex items-center justify-between ${isDarkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-200 hover:bg-gray-300'} transition`}
          >
            <div className="flex items-center gap-4 flex-1">
              {file.type === 'archive' && <span className="text-2xl">📦</span>}
              {file.type === 'document' && <span className="text-2xl">📄</span>}
              {file.type === 'video' && <span className="text-2xl">🎬</span>}
              <div>
                <p className="font-bold">{file.name}</p>
                <p className="text-sm opacity-75">{file.size} • {file.date}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleDownload(file)}
                className="p-2 bg-blue-600 hover:bg-blue-700 rounded transition"
              >
                <Download className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleClone(file)}
                className="p-2 bg-purple-600 hover:bg-purple-700 rounded transition"
              >
                <Copy className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stats */}
      <div className="text-sm opacity-75">
        <p>Total Files: {files.length} • Total Size: {(245 + 12.5 + 756).toFixed(1)} MB</p>
      </div>
    </div>
  );
}

// CRM Advanced
function CRMAdvanced({ isDarkMode }) {
  const [customers, setCustomers] = useState([
    { id: 1, name: 'Acme Corp', email: 'contact@acme.com', status: 'Active', value: '$50,000' },
    { id: 2, name: 'TechStart', email: 'info@techstart.com', status: 'Prospect', value: '$25,000' },
  ]);
  const [newCustomer, setNewCustomer] = useState({ name: '', email: '', status: 'Prospect' });

  const handleAddCustomer = () => {
    if (!newCustomer.name || !newCustomer.email) return;
    setCustomers([...customers, { id: customers.length + 1, ...newCustomer, value: '$0' }]);
    setNewCustomer({ name: '', email: '', status: 'Prospect' });
  };

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Add Customer Form */}
      <div className="space-y-2">
        <div className="grid grid-cols-3 gap-2">
          <input
            type="text"
            value={newCustomer.name}
            onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
            placeholder="Company name"
            className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'} border outline-none focus:ring-2 focus:ring-purple-500`}
          />
          <input
            type="email"
            value={newCustomer.email}
            onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
            placeholder="Email"
            className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'} border outline-none focus:ring-2 focus:ring-purple-500`}
          />
          <select
            value={newCustomer.status}
            onChange={(e) => setNewCustomer({...newCustomer, status: e.target.value})}
            className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'} border outline-none focus:ring-2 focus:ring-purple-500`}
          >
            <option>Prospect</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddCustomer}
          className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-lg font-bold transition"
        >
          ➕ Add Customer
        </motion.button>
      </div>

      {/* Customers List */}
      <div className="flex-1 overflow-y-auto space-y-2">
        {customers.map((customer, i) => (
          <motion.div
            key={customer.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-4 rounded-lg ${isDarkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-200 hover:bg-gray-300'} transition cursor-pointer`}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg">{customer.name}</h3>
              <span className={`text-xs px-3 py-1 rounded-full ${customer.status === 'Active' ? 'bg-green-600/50' : 'bg-yellow-600/50'}`}>
                {customer.status}
              </span>
            </div>
            <div className="flex justify-between text-sm opacity-75">
              <span>{customer.email}</span>
              <span className="font-bold">{customer.value}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Media Studio Advanced
function MediaStudioAdvanced({ isDarkMode }) {
  const [media, setMedia] = useState([
    { id: 1, name: 'banner.png', type: 'image', size: '2.3 MB', date: 'Today' },
    { id: 2, name: 'intro.mp4', type: 'video', size: '45 MB', date: 'Yesterday' },
    { id: 3, name: 'podcast.mp3', type: 'audio', size: '8.5 MB', date: '2 days ago' },
  ]);

  return (
    <div className="flex flex-col h-full gap-4">
      <p className="text-sm opacity-75">🎨 Image, Video & Audio Editing Suite</p>

      <div className="grid grid-cols-3 gap-3">
        {[{ icon: 'Image', label: 'Edit Image', color: 'from-pink-600 to-rose-600' },
          { icon: 'Video', label: 'Edit Video', color: 'from-purple-600 to-pink-600' },
          { icon: 'Audio', label: 'Edit Audio', color: 'from-blue-600 to-cyan-600' }].map((tool, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-4 rounded-lg bg-gradient-to-br ${tool.color} font-bold transition`}
          >
            {tool.label}
          </motion.button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto space-y-2">
        {media.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className={`p-4 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'} flex justify-between items-center`}
          >
            <div>
              <p className="font-bold">{item.name}</p>
              <p className="text-sm opacity-75">{item.size} • {item.date}</p>
            </div>
            <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition">Edit</button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Security Advanced
function SecurityAdvanced({ isDarkMode }) {
  return (
    <div className="flex flex-col h-full gap-4">
      <div className="grid grid-cols-2 gap-4">
        {[
          { title: 'Firewall', status: 'Protected', color: 'from-green-600 to-teal-600' },
          { title: 'Encryption', status: 'Enabled', color: 'from-blue-600 to-cyan-600' },
          { title: 'Backup', status: 'Daily', color: 'from-purple-600 to-pink-600' },
          { title: 'Audit Log', status: 'Active', color: 'from-yellow-600 to-amber-600' },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className={`p-4 rounded-lg bg-gradient-to-br ${item.color} text-white`}
          >
            <h3 className="font-bold text-lg">{item.title}</h3>
            <p className="text-sm opacity-90">✓ {item.status}</p>
          </motion.div>
        ))}
      </div>

      <div className={`flex-1 p-4 rounded-lg ${isDarkMode ? 'bg-slate-700/50' : 'bg-gray-100'} overflow-y-auto`}>
        <h3 className="font-bold mb-3">Security Alerts</h3>
        <div className="space-y-2">
          {[
            '✓ SSL Certificate valid until 2027',
            '✓ All systems updated',
            '⚠️ 3 failed login attempts detected',
            '✓ Backup completed successfully',
          ].map((alert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-sm opacity-85"
            >
              {alert}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Default Advanced App
function DefaultAdvancedApp({ isDarkMode, appId }) {
  return (
    <div className="text-center space-y-4">
      <p className="text-2xl font-bold">🚀 Advanced App Module</p>
      <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        App ID: <span className="font-mono">{appId}</span>
      </p>
      <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-slate-700/50' : 'bg-gray-100'} space-y-3`}>
        <p className="font-bold">Features Available:</p>
        <ul className="text-left space-y-2 text-sm">
          <li>✅ Advanced animations with Framer Motion</li>
          <li>✅ Real-time data visualization</li>
          <li>✅ Export/Download functionality</li>
          <li>✅ Bulk operations & scheduling</li>
          <li>✅ Full CRUD operations</li>
          <li>✅ Dark/Light theme support</li>
          <li>✅ Responsive design</li>
          <li>✅ Copy to clipboard</li>
          <li>✅ File upload/download</li>
          <li>✅ Calendar & scheduling</li>
        </ul>
      </div>
    </div>
  );
}

export default MegamOSPro;
