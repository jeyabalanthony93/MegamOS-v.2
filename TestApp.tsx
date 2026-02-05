import React, { useState } from 'react';
import { X, Minus, Square, Zap, Grid3x3, MessageSquare, Code, Settings } from 'lucide-react';

// Simple Window Component
const SimpleWindow: React.FC<{
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  x: number;
  y: number;
}> = ({ title, onClose, children, x, y }) => (
  <div
    className="fixed w-96 h-80 bg-slate-900 border-2 border-cyan-500 rounded-lg shadow-2xl flex flex-col"
    style={{ left: `${x}px`, top: `${y}px`, zIndex: 40 }}
  >
    <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold px-4 py-2 flex justify-between items-center rounded-t-md">
      <span className="flex items-center gap-2">
        <Zap size={16} />
        {title}
      </span>
      <button
        onClick={onClose}
        className="hover:bg-red-600 p-1 rounded transition"
      >
        <X size={18} />
      </button>
    </div>
    <div className="flex-1 overflow-auto p-4 text-slate-300 text-sm">
      {children}
    </div>
  </div>
);

// Simple App
const SimpleApp: React.FC<{
  id: string;
  label: string;
  onClose: () => void;
  x: number;
  y: number;
}> = ({ id, label, onClose, x, y }) => (
  <SimpleWindow title={label} onClose={onClose} x={x} y={y}>
    <div className="space-y-2">
      <p className="text-cyan-400 font-bold">{label}</p>
      <p>This is the {label} application.</p>
      <p className="text-xs text-slate-500 mt-4">
        App ID: {id}
      </p>
      <p className="text-xs text-slate-500">
        Backend: http://localhost:8000/api/docs
      </p>
    </div>
  </SimpleWindow>
);

const TestApp: React.FC = () => {
  const [openApps, setOpenApps] = useState<string[]>([]);

  const launchApp = (appId: string, label: string) => {
    setOpenApps([...openApps, appId]);
  };

  const closeApp = (appId: string) => {
    setOpenApps(openApps.filter(id => id !== appId));
  };

  const apps = [
    { id: 'ai', label: 'AI Studio', icon: MessageSquare },
    { id: 'terminal', label: 'Terminal', icon: Code },
    { id: 'dashboard', label: 'Dashboard', icon: Grid3x3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-slate-950 via-black to-slate-900 text-white overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              'linear-gradient(0deg, transparent 24%, rgba(0, 255, 255, 0.05) 25%, rgba(0, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 255, 255, 0.05) 75%, rgba(0, 255, 255, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 255, 255, 0.05) 25%, rgba(0, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 255, 255, 0.05) 75%, rgba(0, 255, 255, 0.05) 76%, transparent 77%, transparent)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Title Bar */}
        <div className="bg-slate-900/80 border-b border-cyan-500/20 px-8 py-4 backdrop-blur">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center gap-2">
            <Zap size={24} className="text-cyan-400" />
            MegamOS v2.0 - Production Ready
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            AI-Powered Operating System | Backend: http://localhost:8000 | API: http://localhost:8000/api/docs
          </p>
        </div>

        {/* Desktop with Apps */}
        <div className="flex-1 overflow-auto p-8">
          <div className="grid grid-cols-4 gap-6 w-max">
            {/* App Icons */}
            {apps.map((app) => {
              const Icon = app.icon;
              return (
                <div
                  key={app.id}
                  onClick={() => launchApp(app.id, app.label)}
                  className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-white/10 cursor-pointer transition duration-300 hover:scale-110 group"
                >
                  <div className="p-4 rounded-lg bg-gradient-to-br from-cyan-600 to-blue-600 shadow-lg shadow-cyan-500/50 group-hover:shadow-cyan-400/70 transition">
                    <Icon size={40} className="text-white" />
                  </div>
                  <span className="text-sm font-semibold text-center text-slate-200 group-hover:text-cyan-400 transition">
                    {app.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Additional apps info */}
          <div className="mt-12 text-slate-400 text-sm max-w-2xl">
            <p className="font-semibold text-cyan-400 mb-2">✨ Available Applications:</p>
            <div className="grid grid-cols-2 gap-2">
              <p>🤖 AI Studio - Gemini Powered</p>
              <p>🖥️ Terminal - System Commands</p>
              <p>📊 Dashboard - Analytics</p>
              <p>⚙️ Server Admin - Management</p>
              <p>💻 ETL Studio - Data Processing</p>
              <p>🌐 Browser - Web Access</p>
              <p>💾 Storage - File Manager</p>
              <p>📧 Mail - Communication</p>
              <p>🔒 VPN - Secure Tunnel</p>
              <p>🎨 Studio - Creative Tools</p>
            </div>
          </div>
        </div>

        {/* Taskbar */}
        <div className="bg-slate-900/80 border-t border-cyan-500/20 px-8 py-3 backdrop-blur flex items-center justify-between">
          <div className="text-xs text-slate-400">
            {openApps.length} window{openApps.length !== 1 ? 's' : ''} open
          </div>
          <div className="flex gap-2">
            {openApps.map((appId) => (
              <button
                key={appId}
                onClick={() => closeApp(appId)}
                className="px-3 py-1 bg-cyan-600/20 border border-cyan-500/50 rounded text-xs hover:bg-cyan-600/40 transition"
              >
                {apps.find(a => a.id === appId)?.label} ✕
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Open Windows */}
      {openApps.map((appId, index) => {
        const app = apps.find(a => a.id === appId);
        return (
          <SimpleApp
            key={appId}
            id={appId}
            label={app?.label || 'App'}
            onClose={() => closeApp(appId)}
            x={100 + index * 40}
            y={150 + index * 40}
          />
        );
      })}

      {/* System Info Overlay */}
      <div className="fixed bottom-4 right-4 text-xs text-slate-500 bg-black/50 px-4 py-2 rounded border border-slate-700">
        <p>React App | Vite Dev Server</p>
        <p>FastAPI Backend Running ✓</p>
      </div>
    </div>
  );
};

export default TestApp;
