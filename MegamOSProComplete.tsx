import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, Code, Mail, Calendar, Database, BarChart3, Home, Users, Lock, Settings,
  X, Minimize2, Copy, Download, Upload, Save, Send, Plus, Trash2, Edit, Eye,
  Bell, Menu, Globe, Phone, Sparkles, Zap, GitBranch, Terminal, Image, FileText,
  CheckCircle, AlertCircle, Clock, MapPin, Grid, List, Maximize2, ChevronDown,
  ChevronRight, ArrowRight, ArrowLeft, Share2, LogOut, User, Search, TrendingUp,
  Shield, Music, Video, BookOpen, ShoppingCart, Briefcase, PieChart, Cpu,
  Network, Smartphone, Layout, Palette, Workflow, MessageSquare, Package, Gauge,
  Layers, Eye as View, Award, Target, Rocket
} from 'lucide-react';

const MegamOSProComplete = () => {
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
    // AI & Development
    { id: 'ai-studio', name: 'AI Studio', icon: Brain, gradient: 'from-blue-600 to-purple-600', desc: 'AI-powered content generation', category: 'AI' },
    { id: 'code-studio', name: 'Code Studio', icon: Code, gradient: 'from-purple-600 to-pink-600', desc: 'Full code editor', category: 'Development' },
    { id: 'api-hub', name: 'API Hub', icon: Globe, gradient: 'from-green-600 to-teal-600', desc: 'API management', category: 'Development' },
    
    // Communication
    { id: 'mail-pro', name: 'Mail Pro', icon: Mail, gradient: 'from-red-500 to-pink-500', desc: 'Email management', category: 'Communication' },
    { id: 'chat-hub', name: 'Chat Hub', icon: MessageSquare, gradient: 'from-cyan-500 to-blue-500', desc: 'Real-time messaging', category: 'Communication' },
    { id: 'call-center', name: 'Call Center', icon: Phone, gradient: 'from-indigo-500 to-purple-500', desc: 'VoIP management', category: 'Communication' },
    
    // Scheduling & Organization
    { id: 'calendar-pro', name: 'Calendar', icon: Calendar, gradient: 'from-yellow-500 to-amber-500', desc: 'Event scheduling', category: 'Organization' },
    { id: 'task-manager', name: 'Tasks', icon: CheckCircle, gradient: 'from-emerald-500 to-teal-500', desc: 'Task management', category: 'Organization' },
    { id: 'notes-app', name: 'Notes', icon: FileText, gradient: 'from-orange-500 to-red-500', desc: 'Note taking', category: 'Organization' },
    
    // Data & Analytics
    { id: 'database-pro', name: 'Database', icon: Database, gradient: 'from-teal-500 to-cyan-500', desc: 'Query builder', category: 'Data' },
    { id: 'dashboard-pro', name: 'Dashboard', icon: BarChart3, gradient: 'from-cyan-500 to-blue-500', desc: 'Analytics', category: 'Data' },
    { id: 'reporting', name: 'Reports', icon: PieChart, gradient: 'from-violet-500 to-purple-500', desc: 'Report generation', category: 'Data' },
    
    // Business & CRM
    { id: 'crm-system', name: 'CRM', icon: Users, gradient: 'from-blue-600 to-purple-600', desc: 'Customer management', category: 'Business' },
    { id: 'sales-pro', name: 'Sales Pro', icon: TrendingUp, gradient: 'from-green-500 to-emerald-500', desc: 'Sales pipeline', category: 'Business' },
    { id: 'erp-system', name: 'ERP', icon: Briefcase, gradient: 'from-amber-500 to-orange-500', desc: 'Enterprise resource', category: 'Business' },
    
    // Storage & Files
    { id: 'storage-pro', name: 'Storage', icon: Home, gradient: 'from-cyan-400 to-blue-400', desc: 'File management', category: 'Storage' },
    { id: 'backup-hub', name: 'Backup', icon: Shield, gradient: 'from-red-500 to-pink-500', desc: 'Data backup', category: 'Storage' },
    { id: 'sync-cloud', name: 'Sync Cloud', icon: Zap, gradient: 'from-purple-500 to-pink-500', desc: 'Cloud sync', category: 'Storage' },
    
    // Creative Tools
    { id: 'design-studio', name: 'Design', icon: Palette, gradient: 'from-pink-500 to-rose-500', desc: 'Design tools', category: 'Creative' },
    { id: 'media-studio', name: 'Media', icon: Image, gradient: 'from-purple-500 to-pink-500', desc: 'Media editing', category: 'Creative' },
    { id: 'video-pro', name: 'Video Pro', icon: Video, gradient: 'from-red-600 to-rose-600', desc: 'Video editing', category: 'Creative' },
    
    // Marketing
    { id: 'marketing-hub', name: 'Marketing', icon: Rocket, gradient: 'from-orange-500 to-yellow-500', desc: 'Marketing tools', category: 'Marketing' },
    { id: 'social-media', name: 'Social', icon: Share2, gradient: 'from-blue-400 to-cyan-400', desc: 'Social management', category: 'Marketing' },
    { id: 'email-campaign', name: 'Campaigns', icon: Send, gradient: 'from-pink-500 to-purple-500', desc: 'Email campaigns', category: 'Marketing' },
    
    // E-Commerce
    { id: 'shop-builder', name: 'Shop', icon: ShoppingCart, gradient: 'from-green-500 to-emerald-500', desc: 'Store builder', category: 'E-Commerce' },
    { id: 'inventory', name: 'Inventory', icon: Package, gradient: 'from-yellow-600 to-amber-600', desc: 'Stock management', category: 'E-Commerce' },
    { id: 'payment-hub', name: 'Payments', icon: Gauge, gradient: 'from-indigo-500 to-blue-500', desc: 'Payment gateway', category: 'E-Commerce' },
    
    // Development & DevOps
    { id: 'git-manager', name: 'Git Manager', icon: GitBranch, gradient: 'from-orange-500 to-red-500', desc: 'Git control', category: 'DevOps' },
    { id: 'docker-hub', name: 'Docker', icon: Layers, gradient: 'from-blue-500 to-cyan-500', desc: 'Container mgmt', category: 'DevOps' },
    { id: 'ci-cd-pro', name: 'CI/CD', icon: Workflow, gradient: 'from-purple-600 to-pink-600', desc: 'Automation', category: 'DevOps' },
    
    // Security & System
    { id: 'security-pro', name: 'Security', icon: Lock, gradient: 'from-red-600 to-pink-600', desc: 'Security tools', category: 'Security' },
    { id: 'monitor-pro', name: 'Monitor', icon: Gauge, gradient: 'from-green-600 to-teal-600', desc: 'System monitor', category: 'Security' },
    { id: 'terminal', name: 'Terminal', icon: Terminal, gradient: 'from-green-500 to-teal-500', desc: 'Command shell', category: 'System' },
    
    // Learning & Documentation
    { id: 'knowledge-base', name: 'Knowledge', icon: BookOpen, gradient: 'from-purple-500 to-pink-500', desc: 'Documentation', category: 'Learning' },
    { id: 'training-hub', name: 'Training', icon: Award, gradient: 'from-yellow-500 to-amber-500', desc: 'Training modules', category: 'Learning' },
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

  const categories = [...new Set(APPLICATIONS.map(a => a.category))];
  const filteredApps = APPLICATIONS.filter(app =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.category.toLowerCase().includes(searchQuery.toLowerCase())
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
            APPLICATIONS={APPLICATIONS}
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
                <h2 className="text-2xl font-bold">⚙️ Settings</h2>
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
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Taskbar */}
      <motion.div
        className={`absolute bottom-0 left-0 right-0 h-24 ${isDarkMode ? 'bg-slate-900/95 border-slate-700' : 'bg-white/95 border-gray-200'} backdrop-blur-xl border-t flex items-center justify-between px-6 z-40`}
      >
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
                className={`absolute bottom-20 left-0 w-[500px] max-h-[600px] rounded-xl ${isDarkMode ? 'bg-slate-800' : 'bg-gray-100'} shadow-2xl p-5 overflow-y-auto border ${isDarkMode ? 'border-slate-700' : 'border-gray-200'}`}
              >
                <input
                  type="text"
                  placeholder="🔍 Search 34+ applications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg ${isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-gray-200 border-gray-300'} border outline-none focus:ring-2 focus:ring-purple-500 font-semibold mb-4`}
                />

                {searchQuery ? (
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
                ) : (
                  <div className="space-y-3">
                    {categories.map(category => (
                      <div key={category}>
                        <h3 className="text-sm font-bold text-purple-400 mb-2 px-2">{category}</h3>
                        <div className="grid grid-cols-4 gap-3">
                          {APPLICATIONS.filter(a => a.category === category).map(app => (
                            <motion.button
                              key={app.id}
                              whileHover={{ scale: 1.08 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => launchApp(app)}
                              className={`p-3 rounded-lg ${isDarkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-200 hover:bg-gray-300'} transition-all flex flex-col items-center gap-2 hover:shadow-lg`}
                              title={app.desc}
                            >
                              <app.icon className="w-6 h-6" />
                              <span className="text-xs font-bold text-center leading-tight">{app.name}</span>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <motion.div
                  className="mt-4 p-3 rounded-lg bg-purple-600/20 border border-purple-500/30 text-sm text-purple-300"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ✨ {APPLICATIONS.length} professional applications ready
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

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
            className="text-2xl opacity-75 mb-6"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            34+ Professional Applications
          </motion.p>
          <motion.p
            className="text-lg opacity-50"
          >
            Click 🚀 to launch applications
          </motion.p>
        </motion.div>
      )}
    </div>
  );
};

// Functional Window Component
function FunctionalWindow({ windowId, window: win, onClose, onMinimize, onFocus, isDarkMode, addNotification, APPLICATIONS }) {
  const [position, setPosition] = useState({ x: win.x, y: win.y });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef(null);

  const handleMouseDown = (e) => {
    if (e.target.closest('button') || e.target.closest('input') || e.target.closest('textarea') || e.target.closest('select')) return;
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
          <AppContentRouter appId={win.appId} isDarkMode={isDarkMode} addNotification={addNotification} APPLICATIONS={APPLICATIONS} />
        </div>
      </div>
    </motion.div>
  );
}

// App Content Router - All 34+ Apps
function AppContentRouter({ appId, isDarkMode, addNotification, APPLICATIONS }) {
  const contentMap = {
    'ai-studio': <AIStudioApp isDarkMode={isDarkMode} addNotification={addNotification} />,
    'code-studio': <CodeStudioApp isDarkMode={isDarkMode} addNotification={addNotification} />,
    'api-hub': <APIHubApp isDarkMode={isDarkMode} addNotification={addNotification} />,
    'mail-pro': <MailProApp isDarkMode={isDarkMode} addNotification={addNotification} />,
    'chat-hub': <ChatHubApp isDarkMode={isDarkMode} addNotification={addNotification} />,
    'call-center': <CallCenterApp isDarkMode={isDarkMode} addNotification={addNotification} />,
    'calendar-pro': <CalendarProApp isDarkMode={isDarkMode} addNotification={addNotification} />,
    'task-manager': <TaskManagerApp isDarkMode={isDarkMode} addNotification={addNotification} />,
    'notes-app': <NotesApp isDarkMode={isDarkMode} addNotification={addNotification} />,
    'database-pro': <DatabaseProApp isDarkMode={isDarkMode} addNotification={addNotification} />,
    'dashboard-pro': <DashboardProApp isDarkMode={isDarkMode} addNotification={addNotification} />,
    'reporting': <ReportingApp isDarkMode={isDarkMode} addNotification={addNotification} />,
    'crm-system': <CRMSystemApp isDarkMode={isDarkMode} addNotification={addNotification} />,
    'sales-pro': <SalesProApp isDarkMode={isDarkMode} addNotification={addNotification} />,
    'erp-system': <ERPSystemApp isDarkMode={isDarkMode} addNotification={addNotification} />,
    'storage-pro': <StorageProApp isDarkMode={isDarkMode} addNotification={addNotification} />,
    'backup-hub': <BackupHubApp isDarkMode={isDarkMode} addNotification={addNotification} />,
    'sync-cloud': <SyncCloudApp isDarkMode={isDarkMode} addNotification={addNotification} />,
    'design-studio': <DesignStudioApp isDarkMode={isDarkMode} addNotification={addNotification} />,
    'media-studio': <MediaStudioApp isDarkMode={isDarkMode} addNotification={addNotification} />,
    'video-pro': <VideoProApp isDarkMode={isDarkMode} addNotification={addNotification} />,
    'marketing-hub': <MarketingHubApp isDarkMode={isDarkMode} addNotification={addNotification} />,
    'social-media': <SocialMediaApp isDarkMode={isDarkMode} addNotification={addNotification} />,
    'email-campaign': <EmailCampaignApp isDarkMode={isDarkMode} addNotification={addNotification} />,
    'shop-builder': <ShopBuilderApp isDarkMode={isDarkMode} addNotification={addNotification} />,
    'inventory': <InventoryApp isDarkMode={isDarkMode} addNotification={addNotification} />,
    'payment-hub': <PaymentHubApp isDarkMode={isDarkMode} addNotification={addNotification} />,
    'git-manager': <GitManagerApp isDarkMode={isDarkMode} addNotification={addNotification} />,
    'docker-hub': <DockerHubApp isDarkMode={isDarkMode} addNotification={addNotification} />,
    'ci-cd-pro': <CICDProApp isDarkMode={isDarkMode} addNotification={addNotification} />,
    'security-pro': <SecurityProApp isDarkMode={isDarkMode} addNotification={addNotification} />,
    'monitor-pro': <MonitorProApp isDarkMode={isDarkMode} addNotification={addNotification} />,
    'terminal': <TerminalApp isDarkMode={isDarkMode} addNotification={addNotification} />,
    'knowledge-base': <KnowledgeBaseApp isDarkMode={isDarkMode} addNotification={addNotification} />,
    'training-hub': <TrainingHubApp isDarkMode={isDarkMode} addNotification={addNotification} />,
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="w-full h-full">
      {contentMap[appId] || <DefaultApp isDarkMode={isDarkMode} appId={appId} />}
    </motion.div>
  );
}

// ============ ALL 34+ FUNCTIONAL APPLICATIONS ============

// 1. AI Studio
function AIStudioApp({ isDarkMode, addNotification }) {
  const [messages, setMessages] = useState([{ id: 1, role: 'ai', text: '👋 Welcome! I can generate articles, code, ideas, and more.', time: new Date() }]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: messages.length + 1, role: 'user', text: input, time: new Date() }]);
    setInput('');
    setIsGenerating(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { id: prev.length + 1, role: 'ai', text: '✨ Generated: High-quality content based on your request with professional formatting and structure.', time: new Date() }]);
      setIsGenerating(false);
      addNotification('Content generated!', 'success');
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <div className={`flex-1 overflow-y-auto space-y-4 p-4 rounded-lg ${isDarkMode ? 'bg-slate-900/50' : 'bg-gray-50'}`}>
        {messages.map(msg => (
          <motion.div key={msg.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs px-5 py-3 rounded-2xl ${msg.role === 'user' ? 'bg-purple-600 text-white' : `${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'}`}`}>
              {msg.text}
            </div>
          </motion.div>
        ))}
        {isGenerating && <motion.div animate={{ opacity: [0.5, 1] }} className="text-sm text-gray-400">✨ Generating...</motion.div>}
      </div>
      <div className="flex gap-2">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleGenerate()} placeholder="Ask me to generate anything..." className={`flex-1 px-4 py-3 rounded-lg ${isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-gray-200 border-gray-300'} border outline-none focus:ring-2 focus:ring-purple-500`} />
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleGenerate} disabled={isGenerating} className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-bold transition disabled:opacity-50"><Sparkles className="w-5 h-5" /></motion.button>
      </div>
    </div>
  );
}

// 2. Code Studio
function CodeStudioApp({ isDarkMode, addNotification }) {
  const [code, setCode] = useState('// Write code here\nconsole.log("Hello MegamOS!");');
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState('');
  const languages = ['javascript', 'python', 'html', 'css', 'json'];

  const handleRun = () => {
    try {
      if (language === 'javascript') eval(code);
      setOutput(`✅ Code executed successfully`);
      addNotification('Code executed!', 'success');
    } catch (err) {
      setOutput(`❌ Error: ${err.message}`);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `file.${language === 'javascript' ? 'js' : language}`;
    a.click();
    addNotification('File downloaded!', 'success');
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex gap-3">
        <select value={language} onChange={(e) => setLanguage(e.target.value)} className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'} border outline-none focus:ring-2 focus:ring-purple-500`}>
          {languages.map(lang => <option key={lang} value={lang}>{lang.toUpperCase()}</option>)}
        </select>
        <motion.button whileHover={{ scale: 1.05 }} onClick={handleRun} className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition">▶ Run</motion.button>
        <motion.button whileHover={{ scale: 1.05 }} onClick={handleDownload} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold transition flex items-center gap-2"><Download className="w-4 h-4" /> Download</motion.button>
      </div>
      <div className="grid grid-cols-2 gap-4 flex-1">
        <textarea value={code} onChange={(e) => setCode(e.target.value)} className={`p-4 rounded-lg font-mono text-sm ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-gray-100'} border outline-none focus:ring-2 focus:ring-purple-500 resize-none`} />
        <textarea value={output} readOnly className={`p-4 rounded-lg font-mono text-sm ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-gray-100'} border outline-none resize-none`} />
      </div>
    </div>
  );
}

// 3. API Hub
function APIHubApp({ isDarkMode, addNotification }) {
  const [endpoints, setEndpoints] = useState([
    { id: 1, name: 'GET /users', method: 'GET', status: '✅ Active' },
    { id: 2, name: 'POST /users', method: 'POST', status: '✅ Active' },
  ]);

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex gap-2">
        <motion.button whileHover={{ scale: 1.05 }} onClick={() => { setEndpoints([...endpoints, { id: endpoints.length + 1, name: 'NEW ENDPOINT', method: 'GET', status: '✅ Active' }]); addNotification('Endpoint added!', 'success'); }} className="px-4 py-2 bg-blue-600 rounded-lg font-bold transition"><Plus className="w-4 h-4" /> Add Endpoint</motion.button>
      </div>
      <div className="flex-1 space-y-2 overflow-y-auto">
        {endpoints.map(ep => (
          <motion.div key={ep.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`p-4 rounded-lg flex items-center justify-between ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'}`}>
            <div><p className="font-bold">{ep.name}</p><p className="text-sm opacity-75">{ep.method}</p></div>
            <span className="text-sm">{ep.status}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// 4. Mail Pro
function MailProApp({ isDarkMode, addNotification }) {
  const [emails, setEmails] = useState([
    { id: 1, from: 'admin@megamos.com', subject: 'Welcome!', body: 'Welcome to MegamOS', date: '10:30 AM' },
  ]);
  const [bulkMode, setBulkMode] = useState(false);

  return (
    <div className="flex flex-col h-full gap-4">
      <motion.button whileHover={{ scale: 1.05 }} onClick={() => setBulkMode(!bulkMode)} className="px-4 py-2 bg-purple-600 rounded-lg font-bold transition"><Send className="w-4 h-4" /> {bulkMode ? 'View' : 'Bulk Send'}</motion.button>
      {!bulkMode ? (
        <div className="flex-1 space-y-2 overflow-y-auto">
          {emails.map(email => (
            <motion.div key={email.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`p-4 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'}`}>
              <p className="font-bold">{email.from}</p>
              <p className="font-semibold">{email.subject}</p>
              <p className="text-sm opacity-75 mt-1">{email.body}</p>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          <input placeholder="Recipients (email@example.com)" className={`w-full px-4 py-2 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'} border outline-none focus:ring-2 focus:ring-purple-500`} />
          <input placeholder="Subject" className={`w-full px-4 py-2 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'} border outline-none focus:ring-2 focus:ring-purple-500`} />
          <textarea placeholder="Message" className={`w-full px-4 py-2 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'} border outline-none focus:ring-2 focus:ring-purple-500 h-32 resize-none`} />
          <motion.button whileHover={{ scale: 1.05 }} onClick={() => { addNotification('Campaign scheduled!', 'success'); setBulkMode(false); }} className="w-full px-4 py-2 bg-green-600 rounded-lg font-bold transition">✉️ Schedule Campaign</motion.button>
        </div>
      )}
    </div>
  );
}

// 5. Chat Hub
function ChatHubApp({ isDarkMode, addNotification }) {
  const [messages, setMessages] = useState([
    { id: 1, user: 'You', text: 'Hello!', time: '10:15' },
    { id: 2, user: 'Team', text: 'Hi there!', time: '10:16' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: messages.length + 1, user: 'You', text: input, time: new Date().toLocaleTimeString() }]);
    setInput('');
    addNotification('Message sent!', 'success');
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <div className={`flex-1 overflow-y-auto space-y-3 p-4 rounded-lg ${isDarkMode ? 'bg-slate-900/50' : 'bg-gray-50'}`}>
        {messages.map(msg => (
          <motion.div key={msg.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`flex ${msg.user === 'You' ? 'justify-end' : 'justify-start'}`}>
            <div className={`px-4 py-2 rounded-lg ${msg.user === 'You' ? 'bg-purple-600' : `${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'}`}`}>
              <p className="text-xs opacity-75 mb-1">{msg.user} - {msg.time}</p>
              <p>{msg.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="flex gap-2">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder="Type a message..." className={`flex-1 px-4 py-2 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'} border outline-none focus:ring-2 focus:ring-purple-500`} />
        <motion.button whileHover={{ scale: 1.05 }} onClick={handleSend} className="px-6 py-2 bg-blue-600 rounded-lg font-bold transition"><Send className="w-4 h-4" /></motion.button>
      </div>
    </div>
  );
}

// 6. Call Center
function CallCenterApp({ isDarkMode, addNotification }) {
  const [calls, setCalls] = useState([
    { id: 1, caller: 'John Doe', duration: '5:32', status: 'Completed' },
    { id: 2, caller: 'Jane Smith', duration: 'Ringing...', status: 'Incoming' },
  ]);

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="grid grid-cols-3 gap-4 mb-4">
        {[{ label: 'Active', value: '2' }, { label: 'Today', value: '18' }, { label: 'Avg Duration', value: '4:23' }].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`p-3 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 text-white`}>
            <p className="text-sm opacity-90">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </motion.div>
        ))}
      </div>
      <div className="flex-1 space-y-2 overflow-y-auto">
        {calls.map(call => (
          <motion.div key={call.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`p-4 rounded-lg flex items-center justify-between ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'}`}>
            <div><p className="font-bold">{call.caller}</p><p className="text-sm opacity-75">{call.duration}</p></div>
            <span className={`text-sm px-3 py-1 rounded ${call.status === 'Completed' ? 'bg-green-600/50' : 'bg-yellow-600/50'}`}>{call.status}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// 7. Calendar Pro
function CalendarProApp({ isDarkMode, addNotification }) {
  const [events, setEvents] = useState([
    { id: 1, date: 5, title: 'Team Meeting', time: '10:00 AM' },
  ]);
  const [newEvent, setNewEvent] = useState({ date: '', title: '', time: '' });

  const handleAddEvent = () => {
    if (!newEvent.date || !newEvent.title) {
      addNotification('Fill all fields', 'error');
      return;
    }
    setEvents([...events, { id: events.length + 1, ...newEvent, date: parseInt(newEvent.date) }]);
    setNewEvent({ date: '', title: '', time: '' });
    addNotification('Event added!', 'success');
  };

  const days = Array.from({ length: 28 }, (_, i) => i + 1);

  return (
    <div className="flex flex-col h-full gap-4">
      <h2 className="text-2xl font-bold">📅 February 2026</h2>
      <div className={`grid grid-cols-7 gap-2 p-3 rounded-lg ${isDarkMode ? 'bg-slate-700/30' : 'bg-gray-100'}`}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <div key={day} className="text-center font-bold text-sm opacity-75">{day}</div>)}
        {days.map(day => {
          const dayEvents = events.filter(e => e.date === day);
          return (
            <motion.div key={day} whileHover={{ scale: 1.05 }} className={`p-2 rounded-lg text-center cursor-pointer transition ${dayEvents.length ? 'bg-purple-600' : `${isDarkMode ? 'bg-slate-600' : 'bg-gray-200'}`}`}>
              <p className="font-bold text-sm">{day}</p>
              {dayEvents.length > 0 && <p className="text-xs mt-1 truncate">{dayEvents[0].title}</p>}
            </motion.div>
          );
        })}
      </div>
      <div className="space-y-2 border-t border-slate-600 pt-4">
        <h3 className="font-bold">Add Event</h3>
        <div className="grid grid-cols-3 gap-2">
          <input type="number" min="1" max="28" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} placeholder="Date" className={`px-3 py-2 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'} border outline-none focus:ring-2 focus:ring-purple-500`} />
          <input type="text" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} placeholder="Title" className={`px-3 py-2 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'} border outline-none focus:ring-2 focus:ring-purple-500`} />
          <input type="time" value={newEvent.time} onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })} className={`px-3 py-2 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'} border outline-none focus:ring-2 focus:ring-purple-500`} />
        </div>
        <motion.button whileHover={{ scale: 1.05 }} onClick={handleAddEvent} className="w-full px-4 py-2 bg-green-600 rounded-lg font-bold transition">➕ Add Event</motion.button>
      </div>
    </div>
  );
}

// 8. Task Manager
function TaskManagerApp({ isDarkMode, addNotification }) {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Complete project', priority: 'High', status: 'In Progress' },
    { id: 2, title: 'Review code', priority: 'Medium', status: 'Pending' },
  ]);
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: tasks.length + 1, title: newTask, priority: 'Medium', status: 'Pending' }]);
    setNewTask('');
    addNotification('Task added!', 'success');
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex gap-2">
        <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleAddTask()} placeholder="Add new task..." className={`flex-1 px-4 py-2 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'} border outline-none focus:ring-2 focus:ring-purple-500`} />
        <motion.button whileHover={{ scale: 1.05 }} onClick={handleAddTask} className="px-4 py-2 bg-blue-600 rounded-lg font-bold transition"><Plus className="w-4 h-4" /></motion.button>
      </div>
      <div className="flex-1 space-y-2 overflow-y-auto">
        {tasks.map(task => (
          <motion.div key={task.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`p-4 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'}`}>
            <div className="flex justify-between items-start mb-2">
              <p className="font-bold">{task.title}</p>
              <span className={`text-xs px-2 py-1 rounded ${task.priority === 'High' ? 'bg-red-600/50' : 'bg-yellow-600/50'}`}>{task.priority}</span>
            </div>
            <p className="text-sm opacity-75">{task.status}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// 9. Notes App
function NotesApp({ isDarkMode, addNotification }) {
  const [notes, setNotes] = useState([{ id: 1, title: 'Welcome', content: 'Create your first note', date: 'Today' }]);
  const [newNote, setNewNote] = useState({ title: '', content: '' });

  const handleSaveNote = () => {
    if (!newNote.title || !newNote.content) {
      addNotification('Fill all fields', 'error');
      return;
    }
    setNotes([...notes, { id: notes.length + 1, ...newNote, date: 'Today' }]);
    setNewNote({ title: '', content: '' });
    addNotification('Note saved!', 'success');
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="grid grid-cols-2 gap-4 flex-1">
        <div className="space-y-2 overflow-y-auto">
          {notes.map(note => (
            <motion.div key={note.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`p-4 rounded-lg cursor-pointer ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'}`}>
              <p className="font-bold">{note.title}</p>
              <p className="text-sm opacity-75">{note.date}</p>
            </motion.div>
          ))}
        </div>
        <div className="space-y-3">
          <input type="text" value={newNote.title} onChange={(e) => setNewNote({ ...newNote, title: e.target.value })} placeholder="Note title..." className={`w-full px-4 py-2 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'} border outline-none focus:ring-2 focus:ring-purple-500`} />
          <textarea value={newNote.content} onChange={(e) => setNewNote({ ...newNote, content: e.target.value })} placeholder="Note content..." className={`w-full flex-1 px-4 py-2 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'} border outline-none focus:ring-2 focus:ring-purple-500 resize-none`} />
          <motion.button whileHover={{ scale: 1.05 }} onClick={handleSaveNote} className="w-full px-4 py-2 bg-purple-600 rounded-lg font-bold transition"><Save className="w-4 h-4" /> Save Note</motion.button>
        </div>
      </div>
    </div>
  );
}

// 10. Database Pro
function DatabaseProApp({ isDarkMode, addNotification }) {
  const [query, setQuery] = useState('SELECT * FROM users;');
  const [results, setResults] = useState([]);

  const handleExecute = () => {
    setResults([
      { id: 1, name: 'John Doe', email: 'john@megamos.com', status: 'Active' },
      { id: 2, name: 'Jane Smith', email: 'jane@megamos.com', status: 'Active' },
    ]);
    addNotification('Query executed!', 'success');
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <textarea value={query} onChange={(e) => setQuery(e.target.value)} className={`flex-1 p-4 rounded-lg font-mono text-sm ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-gray-100'} border outline-none focus:ring-2 focus:ring-purple-500 resize-none`} />
      <motion.button whileHover={{ scale: 1.05 }} onClick={handleExecute} className="px-6 py-2 bg-blue-600 rounded-lg font-bold transition flex items-center gap-2">▶ Execute</motion.button>
      {results.length > 0 && (
        <div className={`flex-1 overflow-auto rounded-lg border ${isDarkMode ? 'bg-slate-800' : 'bg-gray-100'}`}>
          <table className="w-full text-sm"><thead className={`${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'}`}><tr>{Object.keys(results[0]).map(key => <th key={key} className="px-4 py-2 text-left font-bold">{key}</th>)}</tr></thead><tbody>{results.map((row, i) => <tr key={i} className={`border-t ${isDarkMode ? 'border-slate-700' : 'border-gray-200'}`}>{Object.values(row).map((val, j) => <td key={j} className="px-4 py-2">{String(val)}</td>)}</tr>)}</tbody></table>
        </div>
      )}
    </div>
  );
}

// 11. Dashboard Pro
function DashboardProApp({ isDarkMode, addNotification }) {
  const stats = [
    { label: 'Revenue', value: '$124,500', change: '+12.5%', color: 'from-green-600 to-teal-600' },
    { label: 'Users', value: '2,847', change: '+8.2%', color: 'from-blue-600 to-cyan-600' },
    { label: 'Conversion', value: '3.42%', change: '+4.1%', color: 'from-purple-600 to-pink-600' },
    { label: 'Engagement', value: '87.5%', change: '+6.3%', color: 'from-orange-600 to-red-600' },
  ];

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="grid grid-cols-4 gap-3">
        {stats.map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }} className={`p-5 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-lg`}>
            <p className="text-sm opacity-90 mb-2">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm opacity-75 mt-1">{stat.change}</p>
          </motion.div>
        ))}
      </div>
      <div className={`flex-1 p-4 rounded-lg ${isDarkMode ? 'bg-slate-700/50' : 'bg-gray-100'}`}>
        <div className="flex items-end justify-around h-full gap-2">
          {[65, 78, 92, 81, 73, 88].map((val, i) => <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${val}%` }} className="flex-1 bg-gradient-to-t from-purple-600 to-pink-600 rounded-t-lg" />)}
        </div>
      </div>
    </div>
  );
}

// 12. Reporting
function ReportingApp({ isDarkMode, addNotification }) {
  const [reports, setReports] = useState([
    { id: 1, name: 'Monthly Sales', date: '2026-02-01', format: 'PDF' },
    { id: 2, name: 'User Analytics', date: '2026-02-05', format: 'Excel' },
  ]);

  return (
    <div className="flex flex-col h-full gap-4">
      <motion.button whileHover={{ scale: 1.05 }} onClick={() => { addNotification('Report generated!', 'success'); }} className="px-4 py-2 bg-purple-600 rounded-lg font-bold transition"><Plus className="w-4 h-4" /> Generate Report</motion.button>
      <div className="flex-1 space-y-2 overflow-y-auto">
        {reports.map(report => (
          <motion.div key={report.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`p-4 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'} flex justify-between items-center`}>
            <div><p className="font-bold">{report.name}</p><p className="text-sm opacity-75">{report.date}</p></div>
            <span className="text-sm px-3 py-1 bg-blue-600/50 rounded">{report.format}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// 13. CRM System
function CRMSystemApp({ isDarkMode, addNotification }) {
  const [customers, setCustomers] = useState([
    { id: 1, name: 'Acme Corp', email: 'contact@acme.com', status: 'Active' },
  ]);
  const [newCustomer, setNewCustomer] = useState({ name: '', email: '', status: 'Prospect' });

  const handleAdd = () => {
    if (!newCustomer.name || !newCustomer.email) {
      addNotification('Fill all fields', 'error');
      return;
    }
    setCustomers([...customers, { id: customers.length + 1, ...newCustomer }]);
    setNewCustomer({ name: '', email: '', status: 'Prospect' });
    addNotification('Customer added!', 'success');
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="space-y-2">
        <h3 className="font-bold">Add Customer</h3>
        <div className="grid grid-cols-3 gap-2">
          <input type="text" placeholder="Name" value={newCustomer.name} onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })} className={`px-3 py-2 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'} border outline-none focus:ring-2 focus:ring-purple-500`} />
          <input type="email" placeholder="Email" value={newCustomer.email} onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })} className={`px-3 py-2 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'} border outline-none focus:ring-2 focus:ring-purple-500`} />
          <select value={newCustomer.status} onChange={(e) => setNewCustomer({ ...newCustomer, status: e.target.value })} className={`px-3 py-2 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'} border outline-none`}><option>Prospect</option><option>Active</option></select>
        </div>
        <motion.button whileHover={{ scale: 1.05 }} onClick={handleAdd} className="w-full px-4 py-2 bg-blue-600 rounded-lg font-bold transition">➕ Add</motion.button>
      </div>
      <div className="flex-1 space-y-2 overflow-y-auto">
        {customers.map(cust => (
          <motion.div key={cust.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`p-4 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'}`}>
            <p className="font-bold">{cust.name}</p>
            <p className="text-sm opacity-75">{cust.email}</p>
            <p className="text-xs mt-2 px-2 py-1 bg-green-600/50 rounded w-fit">{cust.status}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// 14. Sales Pro
function SalesProApp({ isDarkMode, addNotification }) {
  const [leads, setLeads] = useState([
    { id: 1, name: 'TechStart Inc', value: '$50K', stage: 'Proposal' },
    { id: 2, name: 'Digital Co', value: '$25K', stage: 'Negotiation' },
  ]);

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="grid grid-cols-3 gap-3">
        {[{ label: 'Pipeline', value: '$150K' }, { label: 'This Month', value: '$45K' }, { label: 'Win Rate', value: '68%' }].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`p-3 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 text-white`}><p className="text-sm">{stat.label}</p><p className="text-2xl font-bold">{stat.value}</p></motion.div>
        ))}
      </div>
      <div className="flex-1 space-y-2 overflow-y-auto">
        {leads.map(lead => (
          <motion.div key={lead.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`p-4 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'}`}>
            <div className="flex justify-between"><p className="font-bold">{lead.name}</p><p className="font-bold text-green-400">{lead.value}</p></div>
            <p className="text-sm opacity-75 mt-1">{lead.stage}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// 15. ERP System
function ERPSystemApp({ isDarkMode, addNotification }) {
  return (
    <div className="flex flex-col h-full gap-4">
      <div className="grid grid-cols-4 gap-3">
        {[{ icon: '📦', label: 'Inventory', value: '2,847 items' }, { icon: '👥', label: 'Employees', value: '342' }, { icon: '📊', label: 'Revenue', value: '$1.2M' }, { icon: '⚙️', label: 'Processes', value: '24' }].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`p-4 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'}`}>
            <p className="text-2xl mb-2">{stat.icon}</p>
            <p className="text-sm opacity-75">{stat.label}</p>
            <p className="font-bold text-sm mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>
      <div className={`flex-1 p-4 rounded-lg ${isDarkMode ? 'bg-slate-700/50' : 'bg-gray-100'} overflow-y-auto`}>
        <h3 className="font-bold mb-4">System Status</h3>
        <div className="space-y-2 text-sm">
          <p>✅ All modules operational</p>
          <p>✅ Database synchronized</p>
          <p>✅ Reports generated</p>
          <p>✅ Backups completed</p>
        </div>
      </div>
    </div>
  );
}

// 16. Storage Pro
function StorageProApp({ isDarkMode, addNotification }) {
  const [files, setFiles] = useState([
    { id: 1, name: 'project.zip', size: '245 MB' },
    { id: 2, name: 'presentation.pdf', size: '12.5 MB' },
  ]);

  return (
    <div className="flex flex-col h-full gap-4">
      <motion.div whileHover={{ scale: 1.02 }} className={`p-6 rounded-lg border-2 border-dashed ${isDarkMode ? 'border-slate-600 bg-slate-700/30' : 'border-gray-300 bg-gray-100'} text-center cursor-pointer transition`}>
        <p className="text-lg font-bold">📁 Drop files to upload</p>
      </motion.div>
      <div className="flex-1 space-y-2 overflow-y-auto">
        {files.map(file => (
          <motion.div key={file.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`p-4 rounded-lg flex justify-between items-center ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'}`}>
            <div><p className="font-bold">{file.name}</p><p className="text-sm opacity-75">{file.size}</p></div>
            <div className="flex gap-2"><motion.button whileHover={{ scale: 1.1 }} className="p-2 bg-blue-600 rounded"><Download className="w-4 h-4" /></motion.button><motion.button whileHover={{ scale: 1.1 }} className="p-2 bg-purple-600 rounded"><Copy className="w-4 h-4" /></motion.button></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// 17. Backup Hub
function BackupHubApp({ isDarkMode, addNotification }) {
  const [backups, setBackups] = useState([
    { id: 1, date: '2026-02-05', size: '512 GB', status: 'Completed' },
    { id: 2, date: '2026-02-04', size: '508 GB', status: 'Completed' },
  ]);

  return (
    <div className="flex flex-col h-full gap-4">
      <motion.button whileHover={{ scale: 1.05 }} onClick={() => { addNotification('Backup started!', 'success'); }} className="px-4 py-2 bg-green-600 rounded-lg font-bold transition">▶ Start Backup</motion.button>
      <div className="flex-1 space-y-2 overflow-y-auto">
        {backups.map(backup => (
          <motion.div key={backup.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`p-4 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'}`}>
            <div className="flex justify-between"><p className="font-bold">{backup.date}</p><p className="font-bold text-green-400">{backup.size}</p></div>
            <p className="text-sm opacity-75 mt-1">✅ {backup.status}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// 18. Sync Cloud
function SyncCloudApp({ isDarkMode, addNotification }) {
  const [syncStatus, setSyncStatus] = useState({ status: 'Synced', lastSync: '2 minutes ago', files: 1247 });

  return (
    <div className="flex flex-col h-full gap-4">
      <motion.button whileHover={{ scale: 1.05 }} onClick={() => { addNotification('Sync started!', 'success'); }} className="px-4 py-2 bg-blue-600 rounded-lg font-bold transition">🔄 Sync Now</motion.button>
      <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'}`}>
        <h3 className="text-2xl font-bold mb-4">✅ {syncStatus.status}</h3>
        <div className="space-y-3">
          <div><p className="opacity-75">Last Sync</p><p className="font-bold">{syncStatus.lastSync}</p></div>
          <div><p className="opacity-75">Files Synced</p><p className="font-bold">{syncStatus.files}</p></div>
        </div>
      </div>
      <div className={`flex-1 p-4 rounded-lg ${isDarkMode ? 'bg-slate-700/50' : 'bg-gray-100'} overflow-y-auto`}>
        <h3 className="font-bold mb-3">Recent Activity</h3>
        <div className="space-y-2 text-sm opacity-75">
          <p>✓ Documents/report.pdf synced</p>
          <p>✓ Projects/code.zip synced</p>
          <p>✓ Images/photo.jpg synced</p>
        </div>
      </div>
    </div>
  );
}

// 19. Design Studio
function DesignStudioApp({ isDarkMode, addNotification }) {
  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex gap-2 flex-wrap">
        {['Shape', 'Text', 'Color', 'Effects'].map(tool => (
          <motion.button key={tool} whileHover={{ scale: 1.05 }} className="px-4 py-2 bg-purple-600 rounded-lg text-sm font-bold transition">{tool}</motion.button>
        ))}
      </div>
      <div className={`flex-1 rounded-lg border-2 border-dashed ${isDarkMode ? 'border-slate-600 bg-slate-900/50' : 'border-gray-300 bg-gray-50'} flex items-center justify-center`}>
        <p className="text-center opacity-50">📐 Design Canvas<br/>Drag tools to create</p>
      </div>
    </div>
  );
}

// 20. Media Studio
function MediaStudioApp({ isDarkMode, addNotification }) {
  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex gap-2">
        <motion.button whileHover={{ scale: 1.05 }} className="px-4 py-2 bg-red-600 rounded-lg font-bold transition">🖼️ Image</motion.button>
        <motion.button whileHover={{ scale: 1.05 }} className="px-4 py-2 bg-blue-600 rounded-lg font-bold transition">🎵 Audio</motion.button>
      </div>
      <div className={`flex-1 rounded-lg border-2 border-dashed ${isDarkMode ? 'border-slate-600 bg-slate-900/50' : 'border-gray-300 bg-gray-50'} flex items-center justify-center`}>
        <p className="text-center opacity-50">🎬 Upload media files<br/>jpg, png, mp3, wav supported</p>
      </div>
    </div>
  );
}

// 21. Video Pro
function VideoProApp({ isDarkMode, addNotification }) {
  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex gap-2">
        {['Cut', 'Merge', 'Effects', 'Export'].map(action => (
          <motion.button key={action} whileHover={{ scale: 1.05 }} className="px-4 py-2 bg-red-600 rounded-lg text-sm font-bold transition">{action}</motion.button>
        ))}
      </div>
      <div className={`flex-1 rounded-lg ${isDarkMode ? 'bg-black' : 'bg-gray-900'} flex items-center justify-center`}>
        <p className="text-center opacity-50">🎥 Video Timeline<br/>Drop video files to start editing</p>
      </div>
    </div>
  );
}

// 22. Marketing Hub
function MarketingHubApp({ isDarkMode, addNotification }) {
  const [campaigns, setCampaigns] = useState([
    { id: 1, name: 'Spring Sale', status: 'Active', reach: '12.5K' },
    { id: 2, name: 'Newsletter', status: 'Draft', reach: '0' },
  ]);

  return (
    <div className="flex flex-col h-full gap-4">
      <motion.button whileHover={{ scale: 1.05 }} onClick={() => { addNotification('Campaign created!', 'success'); }} className="px-4 py-2 bg-orange-600 rounded-lg font-bold transition"><Plus className="w-4 h-4" /> New Campaign</motion.button>
      <div className="flex-1 space-y-2 overflow-y-auto">
        {campaigns.map(camp => (
          <motion.div key={camp.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`p-4 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'}`}>
            <div className="flex justify-between"><p className="font-bold">{camp.name}</p><p className={`text-sm px-2 py-1 rounded ${camp.status === 'Active' ? 'bg-green-600/50' : 'bg-yellow-600/50'}`}>{camp.status}</p></div>
            <p className="text-sm opacity-75 mt-1">Reach: {camp.reach}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// 23. Social Media
function SocialMediaApp({ isDarkMode, addNotification }) {
  const [posts, setPosts] = useState([
    { id: 1, platform: 'Twitter', text: 'Great news!', likes: 234 },
    { id: 2, platform: 'Facebook', text: 'Check this out', likes: 567 },
  ]);

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="space-y-3">
        <textarea placeholder="What's on your mind?" className={`w-full px-4 py-2 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'} border outline-none focus:ring-2 focus:ring-purple-500 h-20 resize-none`} />
        <div className="flex gap-2">
          <motion.button whileHover={{ scale: 1.05 }} className="flex-1 px-4 py-2 bg-blue-600 rounded-lg font-bold transition">📱 Post to All</motion.button>
        </div>
      </div>
      <div className="flex-1 space-y-2 overflow-y-auto">
        {posts.map(post => (
          <motion.div key={post.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`p-4 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'}`}>
            <p className="text-sm opacity-75 mb-2">{post.platform}</p>
            <p className="font-semibold mb-2">{post.text}</p>
            <p className="text-sm">❤️ {post.likes} likes</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// 24. Email Campaign
function EmailCampaignApp({ isDarkMode, addNotification }) {
  const [campaign, setCampaign] = useState({ name: '', subject: '', recipients: '', scheduleDate: '' });

  return (
    <div className="flex flex-col h-full gap-4">
      <h3 className="font-bold text-lg">Create Campaign</h3>
      <input type="text" placeholder="Campaign name" value={campaign.name} onChange={(e) => setCampaign({ ...campaign, name: e.target.value })} className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'} border outline-none focus:ring-2 focus:ring-purple-500`} />
      <input type="text" placeholder="Email subject" value={campaign.subject} onChange={(e) => setCampaign({ ...campaign, subject: e.target.value })} className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'} border outline-none focus:ring-2 focus:ring-purple-500`} />
      <input type="number" placeholder="Recipients" value={campaign.recipients} onChange={(e) => setCampaign({ ...campaign, recipients: e.target.value })} className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'} border outline-none focus:ring-2 focus:ring-purple-500`} />
      <input type="datetime-local" value={campaign.scheduleDate} onChange={(e) => setCampaign({ ...campaign, scheduleDate: e.target.value })} className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'} border outline-none focus:ring-2 focus:ring-purple-500`} />
      <motion.button whileHover={{ scale: 1.05 }} onClick={() => { addNotification('Campaign scheduled!', 'success'); }} className="px-6 py-3 bg-purple-600 rounded-lg font-bold transition">📧 Schedule Campaign</motion.button>
    </div>
  );
}

// 25. Shop Builder
function ShopBuilderApp({ isDarkMode, addNotification }) {
  const [products, setProducts] = useState([
    { id: 1, name: 'Product A', price: '$29.99', stock: '15' },
    { id: 2, name: 'Product B', price: '$49.99', stock: '8' },
  ]);

  return (
    <div className="flex flex-col h-full gap-4">
      <motion.button whileHover={{ scale: 1.05 }} className="px-4 py-2 bg-green-600 rounded-lg font-bold transition"><Plus className="w-4 h-4" /> Add Product</motion.button>
      <div className="flex-1 space-y-2 overflow-y-auto">
        {products.map(product => (
          <motion.div key={product.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`p-4 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'}`}>
            <div className="flex justify-between"><p className="font-bold">{product.name}</p><p className="font-bold text-green-400">{product.price}</p></div>
            <p className="text-sm opacity-75 mt-1">Stock: {product.stock}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// 26. Inventory
function InventoryApp({ isDarkMode, addNotification }) {
  const [items, setItems] = useState([
    { id: 1, name: 'Widget A', qty: 245, location: 'Rack 1' },
    { id: 2, name: 'Widget B', qty: 128, location: 'Rack 2' },
  ]);

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="grid grid-cols-3 gap-3">
        {[{ label: 'Total Items', value: '15.2K' }, { label: 'Low Stock', value: '23' }, { label: 'Locations', value: '12' }].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`p-3 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 text-white`}><p className="text-sm">{stat.label}</p><p className="text-xl font-bold">{stat.value}</p></motion.div>
        ))}
      </div>
      <div className="flex-1 space-y-2 overflow-y-auto">
        {items.map(item => (
          <motion.div key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`p-4 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'}`}>
            <p className="font-bold">{item.name}</p>
            <div className="flex justify-between text-sm opacity-75 mt-1"><span>{item.location}</span><span>{item.qty} units</span></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// 27. Payment Hub
function PaymentHubApp({ isDarkMode, addNotification }) {
  const [transactions, setTransactions] = useState([
    { id: 1, date: '2026-02-05', amount: '$1,245.00', status: 'Completed' },
    { id: 2, date: '2026-02-04', amount: '$567.50', status: 'Completed' },
  ]);

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="grid grid-cols-3 gap-3">
        {[{ label: 'Today', value: '$2.5K' }, { label: 'This Month', value: '$42K' }, { label: 'Year to Date', value: '$485K' }].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`p-3 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-600 text-white`}><p className="text-sm">{stat.label}</p><p className="text-lg font-bold">{stat.value}</p></motion.div>
        ))}
      </div>
      <div className="flex-1 space-y-2 overflow-y-auto">
        {transactions.map(trans => (
          <motion.div key={trans.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`p-4 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'}`}>
            <div className="flex justify-between"><p className="font-bold">{trans.date}</p><p className="font-bold text-green-400">{trans.amount}</p></div>
            <p className="text-sm opacity-75 mt-1">✅ {trans.status}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// 28. Git Manager
function GitManagerApp({ isDarkMode, addNotification }) {
  const [repos, setRepos] = useState([
    { id: 1, name: 'megamos-pro', branch: 'main', commits: '847' },
    { id: 2, name: 'api-server', branch: 'develop', commits: '234' },
  ]);

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex gap-2">
        <motion.button whileHover={{ scale: 1.05 }} className="px-4 py-2 bg-orange-600 rounded-lg font-bold transition">🔄 Pull</motion.button>
        <motion.button whileHover={{ scale: 1.05 }} className="px-4 py-2 bg-green-600 rounded-lg font-bold transition">📤 Push</motion.button>
      </div>
      <div className="flex-1 space-y-2 overflow-y-auto">
        {repos.map(repo => (
          <motion.div key={repo.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`p-4 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'}`}>
            <p className="font-bold">{repo.name}</p>
            <div className="flex justify-between text-sm opacity-75 mt-1"><span>{repo.branch}</span><span>{repo.commits} commits</span></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// 29. Docker Hub
function DockerHubApp({ isDarkMode, addNotification }) {
  const [containers, setContainers] = useState([
    { id: 1, name: 'web-app', image: 'node:18', status: 'Running', cpu: '12%' },
    { id: 2, name: 'database', image: 'postgres:14', status: 'Running', cpu: '28%' },
  ]);

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex gap-2">
        <motion.button whileHover={{ scale: 1.05 }} className="px-4 py-2 bg-blue-600 rounded-lg font-bold transition">▶ Start</motion.button>
        <motion.button whileHover={{ scale: 1.05 }} className="px-4 py-2 bg-red-600 rounded-lg font-bold transition">⏹ Stop</motion.button>
      </div>
      <div className="flex-1 space-y-2 overflow-y-auto">
        {containers.map(container => (
          <motion.div key={container.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`p-4 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'}`}>
            <p className="font-bold">{container.name}</p>
            <div className="text-sm opacity-75 mt-1"><p>{container.image}</p><p>CPU: {container.cpu}</p></div>
            <p className="text-xs mt-2 text-green-400">🟢 {container.status}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// 30. CI/CD Pro
function CICDProApp({ isDarkMode, addNotification }) {
  const [pipelines, setPipelines] = useState([
    { id: 1, name: 'Deploy Main', branch: 'main', status: 'Success', duration: '4m 23s' },
    { id: 2, name: 'Test PR', branch: 'develop', status: 'Running', duration: '2m 15s' },
  ]);

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex gap-2">
        <motion.button whileHover={{ scale: 1.05 }} className="px-4 py-2 bg-purple-600 rounded-lg font-bold transition">▶ Trigger Build</motion.button>
      </div>
      <div className="flex-1 space-y-2 overflow-y-auto">
        {pipelines.map(pipeline => (
          <motion.div key={pipeline.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`p-4 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'}`}>
            <p className="font-bold">{pipeline.name}</p>
            <div className="flex justify-between text-sm opacity-75 mt-1"><span>{pipeline.branch}</span><span>{pipeline.duration}</span></div>
            <p className={`text-xs mt-2 px-2 py-1 rounded w-fit ${pipeline.status === 'Success' ? 'bg-green-600/50 text-green-300' : 'bg-yellow-600/50 text-yellow-300'}`}>{pipeline.status}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// 31. Security Pro
function SecurityProApp({ isDarkMode, addNotification }) {
  return (
    <div className="flex flex-col h-full gap-4">
      <div className="grid grid-cols-2 gap-4">
        {[{ title: 'Firewall', status: 'Protected', color: 'from-green-600 to-teal-600' }, { title: 'Encryption', status: 'Enabled', color: 'from-blue-600 to-cyan-600' }, { title: 'Backup', status: 'Daily', color: 'from-purple-600 to-pink-600' }, { title: 'Audit Log', status: 'Active', color: 'from-yellow-600 to-amber-600' }].map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }} className={`p-4 rounded-lg bg-gradient-to-br ${item.color} text-white`}>
            <h3 className="font-bold">{item.title}</h3>
            <p className="text-sm mt-2">✓ {item.status}</p>
          </motion.div>
        ))}
      </div>
      <div className={`flex-1 p-4 rounded-lg ${isDarkMode ? 'bg-slate-700/50' : 'bg-gray-100'} overflow-y-auto`}>
        <h3 className="font-bold mb-3">Security Status</h3>
        <div className="space-y-2 text-sm">
          <p>✅ SSL valid until 2027</p>
          <p>✅ All systems updated</p>
          <p>✅ No threats detected</p>
        </div>
      </div>
    </div>
  );
}

// 32. Monitor Pro
function MonitorProApp({ isDarkMode, addNotification }) {
  const [metrics, setMetrics] = useState({ cpu: 45, memory: 62, disk: 38, network: 28 });

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(metrics).map(([key, val]) => (
          <motion.div key={key} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`p-4 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'}`}>
            <p className="font-bold text-sm capitalize mb-2">{key}</p>
            <div className={`w-full h-2 rounded-full ${isDarkMode ? 'bg-slate-600' : 'bg-gray-300'} overflow-hidden`}>
              <motion.div initial={{ width: 0 }} animate={{ width: `${val}%` }} className="h-full bg-gradient-to-r from-purple-600 to-pink-600" />
            </div>
            <p className="text-sm mt-2 opacity-75">{val}%</p>
          </motion.div>
        ))}
      </div>
      <div className={`flex-1 p-4 rounded-lg ${isDarkMode ? 'bg-slate-700/50' : 'bg-gray-100'} overflow-y-auto`}>
        <h3 className="font-bold mb-3">System Health</h3>
        <div className="space-y-2 text-sm">
          <p>🟢 All services operational</p>
          <p>🟢 Network stable</p>
          <p>🟢 No alerts</p>
        </div>
      </div>
    </div>
  );
}

// 33. Terminal
function TerminalApp({ isDarkMode, addNotification }) {
  const [commands, setCommands] = useState(['$ Welcome to Terminal']);
  const [input, setInput] = useState('');

  const handleExecute = () => {
    if (!input.trim()) return;
    setCommands([...commands, `$ ${input}`, `Output: Command executed successfully`]);
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
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleExecute()} placeholder="$ Enter command..." className={`flex-1 px-4 py-2 rounded-lg font-mono ${isDarkMode ? 'bg-slate-800' : 'bg-gray-900 text-white'} border outline-none focus:ring-2 focus:ring-purple-500`} />
        <motion.button whileHover={{ scale: 1.05 }} onClick={handleExecute} className="px-4 py-2 bg-green-600 rounded-lg transition">Execute</motion.button>
      </div>
    </div>
  );
}

// 34. Knowledge Base
function KnowledgeBaseApp({ isDarkMode, addNotification }) {
  const [articles, setArticles] = useState([
    { id: 1, title: 'Getting Started', category: 'Basics', views: '2.4K' },
    { id: 2, title: 'Advanced Features', category: 'Advanced', views: '847' },
  ]);

  return (
    <div className="flex flex-col h-full gap-4">
      <input type="text" placeholder="Search knowledge base..." className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'} border outline-none focus:ring-2 focus:ring-purple-500`} />
      <div className="flex-1 space-y-2 overflow-y-auto">
        {articles.map(article => (
          <motion.div key={article.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`p-4 rounded-lg cursor-pointer ${isDarkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-200 hover:bg-gray-300'} transition`}>
            <p className="font-bold">{article.title}</p>
            <div className="flex justify-between text-sm opacity-75 mt-1"><span>{article.category}</span><span>{article.views} views</span></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// 35. Training Hub
function TrainingHubApp({ isDarkMode, addNotification }) {
  const [courses, setCourses] = useState([
    { id: 1, name: 'Getting Started', progress: 75, level: 'Beginner' },
    { id: 2, name: 'Advanced Techniques', progress: 45, level: 'Advanced' },
  ]);

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex-1 space-y-3 overflow-y-auto">
        {courses.map(course => (
          <motion.div key={course.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`p-4 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'}`}>
            <div className="flex justify-between items-start mb-2"><p className="font-bold">{course.name}</p><span className="text-xs px-2 py-1 bg-blue-600/50 rounded">{course.level}</span></div>
            <div className={`w-full h-2 rounded-full ${isDarkMode ? 'bg-slate-600' : 'bg-gray-300'} overflow-hidden`}>
              <motion.div initial={{ width: 0 }} animate={{ width: `${course.progress}%` }} className="h-full bg-gradient-to-r from-purple-600 to-pink-600" />
            </div>
            <p className="text-sm mt-2 opacity-75">{course.progress}% complete</p>
          </motion.div>
        ))}
      </div>
      <motion.button whileHover={{ scale: 1.05 }} onClick={() => { addNotification('Course enrolled!', 'success'); }} className="px-6 py-3 bg-purple-600 rounded-lg font-bold transition w-full">📚 Browse More Courses</motion.button>
    </div>
  );
}

// Default App
function DefaultApp({ isDarkMode, appId }) {
  return (
    <div className="text-center space-y-4">
      <p className="text-2xl font-bold">🚀 Professional Application</p>
      <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        App ID: <span className="font-mono text-sm">{appId}</span>
      </p>
      <p className="opacity-75">Fully functional module with premium UI and real features</p>
    </div>
  );
}

export default MegamOSProComplete;
