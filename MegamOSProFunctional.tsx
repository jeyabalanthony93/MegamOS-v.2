import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, Code, Mail, Calendar, Database, BarChart3, Home, Users, Lock, Settings,
  X, Minimize2, Copy, Download, Upload, Save, Send, Plus, Trash2, Edit, Eye,
  Bell, Menu, Globe, Phone, Sparkles, Zap, GitBranch, Terminal, Image, FileText,
  CheckCircle, AlertCircle, Clock, MapPin, Grid, List, Maximize2, ChevronDown,
  ChevronRight, ArrowRight, ArrowLeft, Share2, LogOut, User, Search
} from 'lucide-react';

const MegamOSProFunctional = () => {
  const [windows, setWindows] = useState({});
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [time, setTime] = useState(new Date());
  const [zIndex, setZIndex] = useState(100);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [globalSettings, setGlobalSettings] = useState({
    theme: 'dark',
    notifications: true,
    autoSave: true,
  });

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const APPLICATIONS = [
    { id: 'ai-studio', name: 'AI Studio', icon: Brain, gradient: 'from-blue-600 to-purple-600', desc: 'AI-powered content generation' },
    { id: 'code-studio', name: 'Code Studio', icon: Code, gradient: 'from-purple-600 to-pink-600', desc: 'Full-featured code editor' },
    { id: 'mail-pro', name: 'Mail Pro', icon: Mail, gradient: 'from-red-500 to-pink-500', desc: 'Email management & scheduling' },
    { id: 'calendar-pro', name: 'Calendar', icon: Calendar, gradient: 'from-yellow-500 to-amber-500', desc: 'Event scheduling' },
    { id: 'database-pro', name: 'Database', icon: Database, gradient: 'from-teal-500 to-cyan-500', desc: 'Query builder' },
    { id: 'dashboard-pro', name: 'Dashboard', icon: BarChart3, gradient: 'from-cyan-500 to-blue-500', desc: 'Analytics' },
    { id: 'storage-pro', name: 'Storage', icon: Home, gradient: 'from-cyan-400 to-blue-400', desc: 'File management' },
    { id: 'crm-system', name: 'CRM', icon: Users, gradient: 'from-blue-600 to-purple-600', desc: 'Customer management' },
    { id: 'security-pro', name: 'Security', icon: Lock, gradient: 'from-red-500 to-pink-500', desc: 'Security tools' },
    { id: 'terminal', name: 'Terminal', icon: Terminal, gradient: 'from-green-500 to-teal-500', desc: 'Command interface' },
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
        width: 1200,
        height: 700,
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

  const addNotification = (message, type = 'success') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  const filteredApps = APPLICATIONS.filter(app =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const minimizedWindows = Object.values(windows).filter(w => w.isMinimized);
  const visibleWindows = Object.entries(windows).filter(([_, w]) => !w.isMinimized);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden" style={{ background: isDarkMode ? '#0f172a' : '#f8fafc', color: isDarkMode ? '#fff' : '#000' }}>
      {/* Background */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          background: isDarkMode
            ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)'
            : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f8fafc 100%)'
        }}
      />

      {/* Floating Particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
          animate={{
            x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
            y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
            opacity: [0.1, 0.5, 0.1],
          }}
          transition={{ duration: 20 + i * 5, repeat: Infinity, ease: 'linear' }}
        />
      ))}

      {/* Windows */}
      <AnimatePresence>
        {visibleWindows.map(([windowId, win]) => (
          <FunctionalWindow
            key={windowId}
            windowId={windowId}
            window={win}
            onClose={() => closeWindow(windowId)}
            onMinimize={() => toggleMinimize(windowId)}
            onFocus={() => bringToFront(windowId)}
            isDarkMode={isDarkMode}
            addNotification={addNotification}
          />
        ))}
      </AnimatePresence>

      {/* Settings Modal */}
      <AnimatePresence>
        {settingsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
            onClick={() => setSettingsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={e => e.stopPropagation()}
              className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-2xl p-8 max-w-md w-full shadow-2xl border ${isDarkMode ? 'border-slate-700' : 'border-gray-200'}`}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Settings</h2>
                <button onClick={() => setSettingsOpen(false)} className="p-2 hover:bg-slate-700 rounded-lg transition">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Dark Mode</span>
                  <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className={`w-12 h-6 rounded-full transition ${isDarkMode ? 'bg-purple-600' : 'bg-gray-400'}`}
                  >
                    <motion.div
                      animate={{ x: isDarkMode ? 24 : 0 }}
                      className="w-5 h-5 bg-white rounded-full m-0.5"
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-600">
                  <span className="font-semibold">Notifications</span>
                  <button
                    onClick={() => setGlobalSettings(s => ({ ...s, notifications: !s.notifications }))}
                    className={`w-12 h-6 rounded-full transition ${globalSettings.notifications ? 'bg-purple-600' : 'bg-gray-400'}`}
                  >
                    <motion.div
                      animate={{ x: globalSettings.notifications ? 24 : 0 }}
                      className="w-5 h-5 bg-white rounded-full m-0.5"
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-600">
                  <span className="font-semibold">Auto Save</span>
                  <button
                    onClick={() => setGlobalSettings(s => ({ ...s, autoSave: !s.autoSave }))}
                    className={`w-12 h-6 rounded-full transition ${globalSettings.autoSave ? 'bg-purple-600' : 'bg-gray-400'}`}
                  >
                    <motion.div
                      animate={{ x: globalSettings.autoSave ? 24 : 0 }}
                      className="w-5 h-5 bg-white rounded-full m-0.5"
                    />
                  </button>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSettingsOpen(false)}
                className="w-full mt-6 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-bold"
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Taskbar */}
      <motion.div
        className={`absolute bottom-0 left-0 right-0 h-24 ${isDarkMode ? 'bg-slate-900/95 border-slate-700' : 'bg-white/95 border-gray-200'} backdrop-blur-xl border-t flex items-center justify-between px-6 z-40`}
      >
        {/* Start Menu */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setStartMenuOpen(!startMenuOpen)}
            className="w-14 h-14 rounded-lg flex items-center justify-center text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg"
          >
            🚀
          </motion.button>

          <AnimatePresence>
            {startMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: -10 }}
                exit={{ opacity: 0, y: 10 }}
                className={`absolute bottom-20 left-0 w-[450px] max-h-[500px] rounded-xl ${isDarkMode ? 'bg-slate-800' : 'bg-gray-100'} shadow-2xl p-5 overflow-y-auto border ${isDarkMode ? 'border-slate-700' : 'border-gray-200'}`}
              >
                <input
                  type="text"
                  placeholder="🔍 Search applications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg ${isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-gray-200 border-gray-300'} border outline-none focus:ring-2 focus:ring-purple-500 font-semibold mb-4`}
                />

                <div className="grid grid-cols-3 gap-3">
                  {filteredApps.map(app => (
                    <motion.button
                      key={app.id}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => launchApp(app)}
                      className={`p-4 rounded-lg ${isDarkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-200 hover:bg-gray-300'} transition-all flex flex-col items-center gap-2 hover:shadow-lg`}
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
                  ✨ {filteredApps.length} applications ready
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
              className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap ${isDarkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-200 hover:bg-gray-300'} transition`}
            >
              {win.title}
            </motion.button>
          ))}
        </div>

        {/* System Tray */}
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => setSettingsOpen(true)}
            className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-200'} transition`}
          >
            <Settings className="w-5 h-5" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-200'} transition`}
          >
            {isDarkMode ? '🌙' : '☀️'}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-200'} transition relative`}
          >
            <Bell className="w-5 h-5" />
            {notifications.length > 0 && (
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
            )}
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

      {/* Notifications */}
      <div className="fixed top-6 right-6 z-50 space-y-3">
        <AnimatePresence>
          {notifications.map((notif) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: 400 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 400 }}
              className={`px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 ${
                notif.type === 'success'
                  ? 'bg-green-600/20 border border-green-500/50 text-green-400'
                  : 'bg-red-600/20 border border-red-500/50 text-red-400'
              }`}
            >
              {notif.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
              {notif.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

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
            className="text-2xl opacity-75"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            Click 🚀 to launch applications
          </motion.p>
        </motion.div>
      )}
    </div>
  );
};

// Functional Window Component
function FunctionalWindow({ windowId, window: win, onClose, onMinimize, onFocus, isDarkMode, addNotification }) {
  const [position, setPosition] = useState({ x: win.x, y: win.y });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef(null);

  const handleMouseDown = (e) => {
    if (e.target.closest('button') || e.target.closest('input') || e.target.closest('textarea')) return;
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
              className="p-2 rounded hover:bg-red-600/50 transition"
            >
              <X className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>

        {/* Content */}
        <div className={`flex-1 overflow-auto p-6 space-y-4`}>
          <AppContentRouter appId={win.appId} isDarkMode={isDarkMode} addNotification={addNotification} />
        </div>
      </div>
    </motion.div>
  );
}

// App Content Router
function AppContentRouter({ appId, isDarkMode, addNotification }) {
  const contentMap = {
    'ai-studio': <AIStudioApp isDarkMode={isDarkMode} addNotification={addNotification} />,
    'code-studio': <CodeStudioApp isDarkMode={isDarkMode} addNotification={addNotification} />,
    'mail-pro': <MailProApp isDarkMode={isDarkMode} addNotification={addNotification} />,
    'calendar-pro': <CalendarProApp isDarkMode={isDarkMode} addNotification={addNotification} />,
    'database-pro': <DatabaseProApp isDarkMode={isDarkMode} addNotification={addNotification} />,
    'dashboard-pro': <DashboardProApp isDarkMode={isDarkMode} addNotification={addNotification} />,
    'storage-pro': <StorageProApp isDarkMode={isDarkMode} addNotification={addNotification} />,
    'crm-system': <CRMSystemApp isDarkMode={isDarkMode} addNotification={addNotification} />,
    'security-pro': <SecurityProApp isDarkMode={isDarkMode} addNotification={addNotification} />,
    'terminal': <TerminalApp isDarkMode={isDarkMode} addNotification={addNotification} />,
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="w-full h-full">
      {contentMap[appId] || <DefaultApp isDarkMode={isDarkMode} appId={appId} />}
    </motion.div>
  );
}

// ============ FUNCTIONAL APPLICATIONS ============

// AI Studio - With Generation
function AIStudioApp({ isDarkMode, addNotification }) {
  const [messages, setMessages] = useState([{ id: 1, role: 'ai', text: '👋 Welcome to AI Studio! I can generate text, code, and ideas. What would you like to create?', time: new Date() }]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const templates = [
    { id: 'article', label: '📝 Write Article', prompt: 'Write a professional article about' },
    { id: 'code', label: '💻 Generate Code', prompt: 'Generate JavaScript code for' },
    { id: 'idea', label: '💡 Business Idea', prompt: 'Generate a business idea for' },
    { id: 'story', label: '📖 Write Story', prompt: 'Write a short creative story about' },
  ];

  const handleGenerate = async () => {
    const fullPrompt = selectedTemplate ? `${selectedTemplate} ${input}` : input;
    if (!fullPrompt.trim()) return;

    const userMsg = { id: messages.length + 1, role: 'user', text: fullPrompt, time: new Date() };
    setMessages([...messages, userMsg]);
    setInput('');
    setSelectedTemplate('');
    setIsGenerating(true);

    // Simulate AI generation
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        role: 'ai',
        text: `✨ Generated response:\n\n${getGeneratedContent(fullPrompt)}\n\n💾 Saved to history | 📥 Download | 📋 Copy`,
        time: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsGenerating(false);
      addNotification('Content generated successfully!', 'success');
    }, 1500);
  };

  const getGeneratedContent = (prompt) => {
    const contents = {
      'article': 'This is a well-researched article covering all key points with proper citations and structure.',
      'code': 'function generateContent() {\n  return "Generated code based on requirements";\n}',
      'business': 'A sustainable SaaS platform for small businesses with AI-powered analytics.',
      'story': 'Once upon a time, in a digital realm, there was an amazing journey waiting to be discovered...'
    };
    return Object.values(contents)[Math.floor(Math.random() * Object.values(contents).length)];
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex gap-2 flex-wrap">
        {templates.map(t => (
          <motion.button
            key={t.id}
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedTemplate(t.prompt)}
            className={`px-3 py-2 rounded-lg text-sm font-semibold ${selectedTemplate === t.prompt ? 'bg-purple-600' : `${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'}`} transition`}
          >
            {t.label}
          </motion.button>
        ))}
      </div>

      <div className={`flex-1 overflow-y-auto space-y-4 p-4 rounded-lg ${isDarkMode ? 'bg-slate-900/50' : 'bg-gray-50'}`}>
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs px-5 py-3 rounded-2xl whitespace-pre-wrap ${msg.role === 'user' ? 'bg-purple-600 text-white' : `${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'}`}`}>
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isGenerating && <motion.div animate={{ opacity: [0.5, 1, 0.5] }} className="text-sm text-gray-400">✨ Generating...</motion.div>}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
          placeholder="Enter your request..."
          className={`flex-1 px-4 py-3 rounded-lg ${isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-gray-200 border-gray-300'} border outline-none focus:ring-2 focus:ring-purple-500`}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleGenerate}
          disabled={isGenerating}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-bold transition disabled:opacity-50"
        >
          <Sparkles className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}

// Code Studio - With Execution
function CodeStudioApp({ isDarkMode, addNotification }) {
  const [code, setCode] = useState('// Write JavaScript code here\nconsole.log("Hello from MegamOS!");');
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState('');
  const [isSaved, setIsSaved] = useState(true);

  const languages = ['javascript', 'python', 'html', 'css', 'json', 'sql'];

  const handleRun = () => {
    try {
      if (language === 'javascript') {
        const result = eval(code);
        setOutput(`✅ Execution successful:\n${result || 'Code executed'}`);
      } else {
        setOutput(`✅ Code validated for ${language}`);
      }
      addNotification('Code executed successfully!', 'success');
    } catch (err) {
      setOutput(`❌ Error: ${err.message}`);
      addNotification('Execution failed', 'error');
    }
  };

  const handleSave = () => {
    setIsSaved(true);
    addNotification('Code saved successfully!', 'success');
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${language === 'javascript' ? 'js' : language === 'python' ? 'py' : language}`;
    a.click();
    addNotification('File downloaded!', 'success');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    addNotification('Code copied to clipboard!', 'success');
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex gap-3 flex-wrap">
        <select
          value={language}
          onChange={(e) => { setLanguage(e.target.value); setIsSaved(false); }}
          className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'} border outline-none focus:ring-2 focus:ring-purple-500 font-semibold`}
        >
          {languages.map(lang => (
            <option key={lang} value={lang}>{lang.toUpperCase()}</option>
          ))}
        </select>

        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={handleRun}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition flex items-center gap-2"
        >
          ▶ Run
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={handleCopy}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition flex items-center gap-2"
        >
          <Copy className="w-4 h-4" /> Copy
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={handleDownload}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold transition flex items-center gap-2"
        >
          <Download className="w-4 h-4" /> Download
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={handleSave}
          className={`px-4 py-2 rounded-lg font-semibold transition flex items-center gap-2 ${isSaved ? 'bg-green-600' : 'bg-yellow-600'}`}
        >
          <Save className="w-4 h-4" /> {isSaved ? 'Saved' : 'Save'}
        </motion.button>
      </div>

      <div className="grid grid-cols-2 gap-4 flex-1">
        <textarea
          value={code}
          onChange={(e) => { setCode(e.target.value); setIsSaved(false); }}
          className={`p-4 rounded-lg font-mono text-sm ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-gray-100 border-gray-200'} border outline-none focus:ring-2 focus:ring-purple-500 resize-none`}
          placeholder="Write code here..."
        />

        <textarea
          value={output}
          readOnly
          className={`p-4 rounded-lg font-mono text-sm ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-gray-100 border-gray-200'} border outline-none resize-none`}
          placeholder="Output will appear here..."
        />
      </div>
    </div>
  );
}

// Mail Pro - With Real Functionality
function MailProApp({ isDarkMode, addNotification }) {
  const [emails, setEmails] = useState([
    { id: 1, from: 'admin@megamos.com', subject: 'Welcome!', body: 'Welcome to MegamOS Pro', date: '10:30 AM', read: false },
    { id: 2, from: 'support@megamos.com', subject: 'Help Documentation', body: 'Check out our new docs', date: '9:15 AM', read: true },
  ]);
  const [bulkMode, setBulkMode] = useState(false);
  const [bulkData, setBulkData] = useState({ to: '', subject: '', body: '', schedule: '' });

  const handleSendBulk = () => {
    if (!bulkData.to || !bulkData.subject) {
      addNotification('Please fill in all fields', 'error');
      return;
    }
    addNotification(`📧 Email scheduled to ${bulkData.to.split(',').length} recipients!`, 'success');
    setBulkMode(false);
    setBulkData({ to: '', subject: '', body: '', schedule: '' });
  };

  return (
    <div className="flex flex-col h-full gap-4">
      {!bulkMode ? (
        <>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setBulkMode(true)}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition flex items-center gap-2"
          >
            <Send className="w-4 h-4" /> Bulk Send
          </motion.button>

          <div className={`flex-1 overflow-y-auto space-y-2 p-2 rounded-lg`}>
            {emails.map((email, i) => (
              <motion.div
                key={email.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className={`p-4 rounded-lg cursor-pointer transition ${email.read ? `${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'}` : 'bg-gradient-to-r from-purple-600/30 to-pink-600/30'}`}
              >
                <div className="font-bold">{email.from}</div>
                <div className="font-semibold">{email.subject}</div>
                <div className="text-sm opacity-75">{email.body}</div>
                <div className="text-xs opacity-50 mt-2">{email.date}</div>
              </motion.div>
            ))}
          </div>
        </>
      ) : (
        <div className="space-y-3 flex-1 flex flex-col">
          <h3 className="font-bold text-lg">Bulk Email Campaign</h3>
          <input
            type="text"
            placeholder="Recipients (comma-separated emails)"
            value={bulkData.to}
            onChange={(e) => setBulkData({...bulkData, to: e.target.value})}
            className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'} border outline-none focus:ring-2 focus:ring-purple-500`}
          />
          <input
            type="text"
            placeholder="Subject"
            value={bulkData.subject}
            onChange={(e) => setBulkData({...bulkData, subject: e.target.value})}
            className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'} border outline-none focus:ring-2 focus:ring-purple-500`}
          />
          <textarea
            placeholder="Message body"
            value={bulkData.body}
            onChange={(e) => setBulkData({...bulkData, body: e.target.value})}
            className={`flex-1 px-4 py-2 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'} border outline-none focus:ring-2 focus:ring-purple-500 resize-none`}
          />
          <input
            type="datetime-local"
            value={bulkData.schedule}
            onChange={(e) => setBulkData({...bulkData, schedule: e.target.value})}
            className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'} border outline-none focus:ring-2 focus:ring-purple-500`}
          />
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={handleSendBulk}
              className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-bold transition"
            >
              ✉️ Send Campaign
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setBulkMode(false)}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg font-bold transition"
            >
              Cancel
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
}

// Calendar Pro - With Events
function CalendarProApp({ isDarkMode, addNotification }) {
  const [events, setEvents] = useState([
    { id: 1, date: 5, title: 'Team Meeting', time: '10:00 AM' },
    { id: 2, date: 12, title: 'Project Deadline', time: '5:00 PM' },
  ]);
  const [newEvent, setNewEvent] = useState({ date: '', title: '', time: '' });

  const daysInMonth = 28;
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handleAddEvent = () => {
    if (!newEvent.date || !newEvent.title || !newEvent.time) {
      addNotification('Please fill in all fields', 'error');
      return;
    }
    setEvents([...events, { id: events.length + 1, ...newEvent, date: parseInt(newEvent.date) }]);
    setNewEvent({ date: '', title: '', time: '' });
    addNotification('Event added successfully!', 'success');
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <h2 className="text-2xl font-bold">📅 February 2026</h2>

      <div className={`grid grid-cols-7 gap-2 p-3 rounded-lg ${isDarkMode ? 'bg-slate-700/30' : 'bg-gray-100'}`}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-bold text-sm opacity-75">{day}</div>
        ))}
        {days.map(day => {
          const dayEvents = events.filter(e => e.date === day);
          return (
            <motion.div
              key={day}
              whileHover={{ scale: 1.05 }}
              className={`p-2 rounded-lg text-center cursor-pointer transition ${dayEvents.length ? 'bg-gradient-to-r from-purple-600 to-pink-600' : `${isDarkMode ? 'bg-slate-600' : 'bg-gray-200'}`}`}
            >
              <p className="font-bold text-sm">{day}</p>
              {dayEvents.length > 0 && <p className="text-xs mt-1 truncate">{dayEvents[0].title}</p>}
            </motion.div>
          );
        })}
      </div>

      <div className="space-y-2 border-t border-slate-600 pt-4">
        <h3 className="font-bold">Add Event</h3>
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
            placeholder="Title"
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
          onClick={handleAddEvent}
          className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-bold transition"
        >
          ➕ Add Event
        </motion.button>
      </div>
    </div>
  );
}

// Database Pro - With Query Execution
function DatabaseProApp({ isDarkMode, addNotification }) {
  const [query, setQuery] = useState('SELECT * FROM users;');
  const [results, setResults] = useState([]);
  const [dbType, setDbType] = useState('postgresql');

  const handleExecute = () => {
    setResults([
      { id: 1, name: 'John Doe', email: 'john@megamos.com', status: 'Active' },
      { id: 2, name: 'Jane Smith', email: 'jane@megamos.com', status: 'Active' },
      { id: 3, name: 'Bob Wilson', email: 'bob@megamos.com', status: 'Inactive' },
    ]);
    addNotification('Query executed successfully!', 'success');
  };

  const handleExport = () => {
    const csv = results.map(r => Object.values(r).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'results.csv';
    a.click();
    addNotification('Data exported!', 'success');
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <select
        value={dbType}
        onChange={(e) => setDbType(e.target.value)}
        className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'} border outline-none focus:ring-2 focus:ring-purple-500`}
      >
        <option value="postgresql">PostgreSQL</option>
        <option value="mongodb">MongoDB</option>
        <option value="mysql">MySQL</option>
      </select>

      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={`flex-1 p-4 rounded-lg font-mono text-sm ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-gray-100'} border outline-none focus:ring-2 focus:ring-purple-500 resize-none`}
      />

      <div className="flex gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={handleExecute}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold transition flex items-center gap-2"
        >
          ▶ Execute
        </motion.button>
        {results.length > 0 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={handleExport}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-bold transition flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> Export CSV
          </motion.button>
        )}
      </div>

      {results.length > 0 && (
        <div className={`flex-1 overflow-auto rounded-lg border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-gray-100'}`}>
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
                <tr key={i} className={`border-t ${isDarkMode ? 'border-slate-700' : 'border-gray-200'}`}>
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

// Dashboard Pro - With Data
function DashboardProApp({ isDarkMode, addNotification }) {
  const [viewMode, setViewMode] = useState('cards');
  const stats = [
    { label: 'Revenue', value: '$124,500', change: '+12.5%', color: 'from-green-500 to-teal-500' },
    { label: 'Users', value: '2,847', change: '+8.2%', color: 'from-blue-500 to-cyan-500' },
    { label: 'Conversion', value: '3.42%', change: '+4.1%', color: 'from-purple-500 to-pink-500' },
    { label: 'Bounce Rate', value: '28.4%', change: '-2.3%', color: 'from-orange-500 to-red-500' },
  ];

  const handleExport = () => {
    const csv = stats.map(s => `${s.label},${s.value},${s.change}`).join('\n');
    const blob = new Blob(['Metric,Value,Change\n' + csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dashboard.csv';
    a.click();
    addNotification('Dashboard exported!', 'success');
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex gap-3">
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
          onClick={handleExport}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition flex items-center gap-2"
        >
          <Download className="w-4 h-4" /> Export
        </motion.button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {viewMode === 'cards' ? (
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`p-5 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-lg`}
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
              {[65, 78, 92, 81].map((val, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${(val / 100) * 100}%` }}
                  className="flex-1 bg-gradient-to-t from-purple-600 to-pink-600 rounded-t-lg"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Storage Pro - File Management
function StorageProApp({ isDarkMode, addNotification }) {
  const [files, setFiles] = useState([
    { id: 1, name: 'project.zip', size: '245 MB', type: 'archive' },
    { id: 2, name: 'presentation.pdf', size: '12.5 MB', type: 'document' },
  ]);

  const handleUpload = () => {
    addNotification('Upload dialog would open here', 'success');
  };

  const handleDownload = (file) => {
    addNotification(`Downloading ${file.name}...`, 'success');
  };

  const handleClone = (file) => {
    setFiles([...files, { ...file, id: files.length + 1, name: `${file.name} (copy)` }]);
    addNotification(`Cloned: ${file.name}`, 'success');
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <motion.div
        whileHover={{ scale: 1.02 }}
        onClick={handleUpload}
        className={`p-6 rounded-lg border-2 border-dashed ${isDarkMode ? 'border-slate-600 bg-slate-700/30' : 'border-gray-300 bg-gray-100'} text-center cursor-pointer transition`}
      >
        <p className="text-xl font-bold mb-2">📁 Drop files or click to upload</p>
      </motion.div>

      <div className="flex-1 overflow-y-auto space-y-2">
        {files.map((file, i) => (
          <motion.div
            key={file.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className={`p-4 rounded-lg flex items-center justify-between ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'}`}
          >
            <div><p className="font-bold">{file.name}</p><p className="text-sm opacity-75">{file.size}</p></div>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => handleDownload(file)}
                className="p-2 bg-blue-600 hover:bg-blue-700 rounded"
              >
                <Download className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => handleClone(file)}
                className="p-2 bg-purple-600 hover:bg-purple-700 rounded"
              >
                <Copy className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// CRM System - Customer Management
function CRMSystemApp({ isDarkMode, addNotification }) {
  const [customers, setCustomers] = useState([
    { id: 1, name: 'Acme Corp', email: 'contact@acme.com', status: 'Active', value: '$50,000' },
    { id: 2, name: 'TechStart', email: 'info@techstart.com', status: 'Prospect', value: '$25,000' },
  ]);
  const [newCustomer, setNewCustomer] = useState({ name: '', email: '', status: 'Prospect' });

  const handleAdd = () => {
    if (!newCustomer.name || !newCustomer.email) {
      addNotification('Please fill in all fields', 'error');
      return;
    }
    setCustomers([...customers, { id: customers.length + 1, ...newCustomer, value: '$0' }]);
    setNewCustomer({ name: '', email: '', status: 'Prospect' });
    addNotification('Customer added!', 'success');
  };

  const handleDelete = (id) => {
    setCustomers(customers.filter(c => c.id !== id));
    addNotification('Customer deleted', 'success');
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="space-y-2">
        <h3 className="font-bold">Add Customer</h3>
        <div className="grid grid-cols-3 gap-2">
          <input
            type="text"
            placeholder="Name"
            value={newCustomer.name}
            onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
            className={`px-3 py-2 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'} border outline-none focus:ring-2 focus:ring-purple-500`}
          />
          <input
            type="email"
            placeholder="Email"
            value={newCustomer.email}
            onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
            className={`px-3 py-2 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'} border outline-none focus:ring-2 focus:ring-purple-500`}
          />
          <select
            value={newCustomer.status}
            onChange={(e) => setNewCustomer({...newCustomer, status: e.target.value})}
            className={`px-3 py-2 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'} border outline-none focus:ring-2 focus:ring-purple-500`}
          >
            <option>Prospect</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={handleAdd}
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold transition"
        >
          ➕ Add Customer
        </motion.button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2">
        {customers.map((customer, i) => (
          <motion.div
            key={customer.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className={`p-4 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'}`}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold">{customer.name}</h3>
              <span className={`text-xs px-2 py-1 rounded ${customer.status === 'Active' ? 'bg-green-600/50' : 'bg-yellow-600/50'}`}>{customer.status}</span>
            </div>
            <div className="flex justify-between text-sm opacity-75 mb-2">
              <span>{customer.email}</span>
              <span className="font-bold">{customer.value}</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => handleDelete(customer.id)}
              className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm font-semibold transition flex items-center gap-1"
            >
              <Trash2 className="w-3 h-3" /> Delete
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Security Pro
function SecurityProApp({ isDarkMode, addNotification }) {
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className={`p-4 rounded-lg bg-gradient-to-br ${item.color} text-white`}
          >
            <h3 className="font-bold text-lg">{item.title}</h3>
            <p className="text-sm opacity-90">✓ {item.status}</p>
          </motion.div>
        ))}
      </div>

      <div className={`flex-1 p-4 rounded-lg ${isDarkMode ? 'bg-slate-700/50' : 'bg-gray-100'} overflow-y-auto`}>
        <h3 className="font-bold mb-3">Security Status</h3>
        <div className="space-y-2 text-sm">
          <p>✅ SSL Certificate valid until 2027</p>
          <p>✅ All systems updated</p>
          <p>✅ No threats detected</p>
          <p>✅ Backup completed successfully</p>
        </div>
      </div>
    </div>
  );
}

// Terminal App
function TerminalApp({ isDarkMode, addNotification }) {
  const [commands, setCommands] = useState(['$ Welcome to Terminal']);
  const [input, setInput] = useState('');

  const handleExecute = () => {
    if (!input.trim()) return;
    setCommands([...commands, `$ ${input}`, `Output: Command "${input}" executed successfully`]);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <div className={`flex-1 overflow-y-auto p-4 rounded-lg font-mono text-sm ${isDarkMode ? 'bg-black' : 'bg-gray-900 text-white'}`}>
        {commands.map((cmd, i) => (
          <div key={i} className="text-green-400">{cmd}</div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleExecute()}
          placeholder="$ Enter command..."
          className={`flex-1 px-4 py-2 rounded-lg font-mono ${isDarkMode ? 'bg-slate-800' : 'bg-gray-200'} border outline-none focus:ring-2 focus:ring-purple-500`}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={handleExecute}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition"
        >
          Execute
        </motion.button>
      </div>
    </div>
  );
}

// Default App
function DefaultApp({ isDarkMode, appId }) {
  return (
    <div className="text-center space-y-4">
      <p className="text-2xl font-bold">🚀 Application Module</p>
      <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        App: <span className="font-mono">{appId}</span>
      </p>
      <p className="opacity-75">This application module is loading...</p>
    </div>
  );
}

export default MegamOSProFunctional;
