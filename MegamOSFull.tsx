import React, { useState, useEffect, useRef } from 'react';

// Import all components
import AIStudio from './components/AIStudio';
import Dashboard from './components/Dashboard';
import Terminal from './components/Terminal';
import MegamBrowser from './components/MegamBrowser';
import MegamCalculator from './components/MegamCalculator';
import MegamSentinel from './components/MegamSentinel';
import StorageExplorer from './components/StorageExplorer';
import VPNManager from './components/VPNManager';
import MegamScanner from './components/MegamScanner';
import MegamMarketing from './components/MegamMarketing';
import MegamCampus from './components/MegamCampus';
import MegamAutomate from './components/MegamAutomate';
import MCPServer from './components/MCPServer';
import ETLStudio from './components/ETLStudio';
import DocumentationHub from './components/DocumentationHub';
import BadalRAG from './components/BadalRAG';
import SS360 from './components/SS360';
import AdManager from './components/AdManager';
import AgentView from './components/AgentView';
import BadalAuth from './components/BadalAuth';
import BadalPhone from './components/BadalPhone';
import BadalMail from './components/BadalMail';
import MegamAssistant from './components/MegamAssistant';
import MegamStudio from './components/MegamStudio';
import MegamDataCenter from './components/MegamDataCenter';
import PackageCenter from './components/PackageCenter';
import ServerAdmin from './components/ServerAdmin';
import Infrastructure from './components/Infrastructure';
import BadalRAAG from './components/BadalRAAG';
import MegamQuantum from './components/MegamQuantum';
import MegamTravel from './components/MegamTravel';
import Workspace from './components/Workspace';
import SEOHead from './components/SEOHead';
import MonetizationDashboard from './components/MonetizationDashboard';

export default function MegamOSFull() {
  const [windows, setWindows] = useState({});
  const [startOpen, setStartOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [time, setTime] = useState(new Date());
  const [zIndex, setZIndex] = useState(100);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const APPS = [
    // Core Productivity
    { id: 'ai-studio', name: 'AI Studio', icon: '🤖', color: '#667eea', desc: 'AI chat & automation' },
    { id: 'assistant', name: 'Megam Assistant', icon: '👨‍💼', color: '#764ba2', desc: 'Smart assistant' },
    { id: 'workspace', name: 'Workspace', icon: '💼', color: '#f093fb', desc: 'Collaboration hub' },
    { id: 'dashboard', name: 'Dashboard', icon: '📈', color: '#4facfe', desc: 'Analytics & metrics' },
    
    // Communication
    { id: 'mail', name: 'Badal Mail', icon: '📧', color: '#ff6b6b', desc: 'Email management' },
    { id: 'phone', name: 'Badal Phone', icon: '☎️', color: '#ff8fab', desc: 'Phone system' },
    { id: 'auth', name: 'Badal Auth', icon: '🔐', color: '#ff9500', desc: 'Authentication hub' },
    
    // Development & Tech
    { id: 'terminal', name: 'Terminal', icon: '⌘', color: '#6bcf7f', desc: 'Command interface' },
    { id: 'mcp-server', name: 'MCP Server', icon: '🔌', color: '#00d4ff', desc: 'Protocol server' },
    { id: 'etl-studio', name: 'ETL Studio', icon: '🔄', color: '#ffa500', desc: 'Data pipeline' },
    { id: 'infrastructure', name: 'Infrastructure', icon: '🏗️', color: '#00c7b7', desc: 'Cloud resources' },
    { id: 'data-center', name: 'Data Center', icon: '🖥️', color: '#5856d6', desc: 'Server management' },
    
    // Business & Enterprise
    { id: 'rag', name: 'Badal RAG', icon: '🧠', color: '#34c759', desc: 'Knowledge base' },
    { id: 'raag', name: 'Badal RAAG', icon: '🎯', color: '#ff3b30', desc: 'Advanced analytics' },
    { id: 'ss360', name: 'SS360', icon: '👥', color: '#007aff', desc: '360 management' },
    { id: 'marketing', name: 'Megam Marketing', icon: '📢', color: '#ff9500', desc: 'Campaign tools' },
    { id: 'scanner', name: 'Megam Scanner', icon: '🔍', color: '#ffd93d', desc: 'Code & QR scanner' },
    
    // Security & Admin
    { id: 'sentinel', name: 'Megam Sentinel', icon: '🛡️', color: '#ff6b6b', desc: 'Security monitor' },
    { id: 'vpn', name: 'VPN Manager', icon: '🔒', color: '#667eea', desc: 'Network security' },
    { id: 'storage', name: 'Storage Explorer', icon: '💾', color: '#00f2fe', desc: 'File management' },
    { id: 'server-admin', name: 'Server Admin', icon: '⚙️', color: '#888', desc: 'Server control' },
    
    // AI & Automation
    { id: 'automate', name: 'Megam Automate', icon: '⚡', color: '#34c759', desc: 'Workflow automation' },
    { id: 'agent-view', name: 'Agent View', icon: '🤖', color: '#764ba2', desc: 'Agent management' },
    
    // Content & Media
    { id: 'studio', name: 'Megam Studio', icon: '🎨', color: '#f093fb', desc: 'Media creation' },
    { id: 'docs-hub', name: 'Documentation Hub', icon: '📚', color: '#4facfe', desc: 'Knowledge docs' },
    { id: 'seo-head', name: 'SEO Head', icon: '🔗', color: '#00d4ff', desc: 'SEO optimizer' },
    
    // Learning & Development
    { id: 'campus', name: 'Megam Campus', icon: '🎓', color: '#ffd93d', desc: 'Learning platform' },
    { id: 'browser', name: 'Browser', icon: '🌐', color: '#ff9500', desc: 'Web browser' },
    
    // Advanced
    { id: 'quantum', name: 'Megam Quantum', icon: '⚛️', color: '#764ba2', desc: 'Quantum computing' },
    { id: 'travel', name: 'Megam Travel', icon: '✈️', color: '#ff8fab', desc: 'Travel planning' },
    { id: 'package-center', name: 'Package Center', icon: '📦', color: '#34c759', desc: 'Package manager' },
    { id: 'monetization', name: 'Monetization', icon: '💰', color: '#ffd93d', desc: 'Revenue tracking' },
    { id: 'ads', name: 'Ad Manager', icon: '📣', color: '#ff6b6b', desc: 'Ad management' },
    { id: 'calculator', name: 'Calculator', icon: '🔢', color: '#34c759', desc: 'Scientific calc' },
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
        x: Math.random() * 400 + 100,
        y: Math.random() * 300 + 60,
        width: 1200,
        height: 700,
        minified: false,
        zIdx: zIndex,
      }
    }));
    setZIndex(prev => prev + 1);
    setStartOpen(false);
  };

  const closeWindow = (id) => {
    setWindows(prev => {
      const newW = { ...prev };
      delete newW[id];
      return newW;
    });
  };

  const toggleMinify = (id) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], minified: !prev[id].minified }
    }));
  };

  const bringToFront = (id) => {
    setZIndex(prev => prev + 1);
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], zIdx: zIndex + 1 }
    }));
  };

  const filteredApps = APPS.filter(a => a.name.toLowerCase().includes(search.toLowerCase()));
  const minifiedWindows = Object.values(windows).filter(w => w?.minified);
  const visibleWindows = Object.entries(windows).filter(([_, w]) => !w?.minified).sort((a, b) => a[1].zIdx - b[1].zIdx);

  return (
    <div style={{ width: '100vw', height: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)', overflow: 'hidden', fontFamily: "'Segoe UI', sans-serif", position: 'relative' }}>
      {/* Background overlay */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 60, background: 'rgba(0,0,0,0.1)', zIndex: 1 }} />

      {/* Windows */}
      {visibleWindows.map(([windowId, win]) => (
        <Window key={windowId} win={win} onClose={closeWindow} onMinify={toggleMinify} bringToFront={() => bringToFront(windowId)} appId={win.appId} />
      ))}

      {/* Taskbar */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
        background: 'rgba(0, 0, 0, 0.9)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        zIndex: 50,
      }}>
        {/* Start Menu */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setStartOpen(!startOpen)}
            style={{
              width: 50,
              height: 50,
              background: 'rgba(102, 126, 234, 0.8)',
              border: 'none',
              borderRadius: 8,
              color: 'white',
              fontSize: 24,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 0 20px rgba(102, 126, 234, 0.5)',
              transition: 'all 0.3s'
            }}
          >
            🎮
          </button>
          {startOpen && (
            <div style={{
              position: 'absolute',
              bottom: 70,
              left: 0,
              width: 400,
              maxHeight: 600,
              background: 'rgba(30, 30, 30, 0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: 12,
              border: '1px solid rgba(255,255,255,0.1)',
              padding: 15,
              boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
              zIndex: 1000,
              overflowY: 'auto'
            }}>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search apps..."
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: 6,
                  color: 'white',
                  marginBottom: 12,
                  outline: 'none',
                }}
              />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                {filteredApps.map(app => (
                  <div
                    key={app.id}
                    onClick={() => launchApp(app.id)}
                    style={{
                      padding: 12,
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 8,
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.3s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                  >
                    <div style={{ fontSize: 24, marginBottom: 4 }}>{app.icon}</div>
                    <div style={{ fontSize: 11, color: '#aaa', fontWeight: 500 }}>{app.name}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Minimized apps */}
        <div style={{ display: 'flex', gap: 10, flex: 1, marginLeft: 20, overflowX: 'auto' }}>
          {minifiedWindows.map(win => (
            <button
              key={win.id}
              onClick={() => toggleMinify(win.id)}
              style={{
                padding: '8px 12px',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 6,
                color: 'white',
                cursor: 'pointer',
                fontSize: 12,
                transition: 'all 0.3s',
                whiteSpace: 'nowrap'
              }}
            >
              {win.title}
            </button>
          ))}
        </div>

        {/* System tray */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 15, color: '#aaa', fontSize: 12 }}>
          <div>📶</div>
          <div>🔊</div>
          <div>{time.toLocaleTimeString()}</div>
        </div>
      </div>
    </div>
  );
}

// Window Component
function Window({ win, onClose, onMinify, bringToFront, appId }) {
  const [position, setPosition] = useState({ x: win.x, y: win.y });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragRef.current = { startX: e.clientX - position.x, startY: e.clientY - position.y };
  };

  useEffect(() => {
    if (!isDragging) return;
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX - dragRef.current.startX, y: e.clientY - dragRef.current.startY });
    };
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: win.width,
        height: win.height,
        background: 'rgba(20, 20, 30, 0.95)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.2)',
        borderRadius: 12,
        boxShadow: '0 20px 60px rgba(0,0,0,0.7)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: win.zIdx,
        overflow: 'hidden'
      }}
      onClick={bringToFront}
    >
      {/* Title Bar */}
      <div
        onMouseDown={handleMouseDown}
        style={{
          padding: '12px 16px',
          background: 'rgba(50, 50, 70, 0.5)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'move',
          userSelect: 'none'
        }}
      >
        <div style={{ color: 'white', fontWeight: 600, fontSize: 13 }}>{win.title}</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => onMinify(win.id)} style={{ width: 30, height: 30, background: 'rgba(255,165,0,0.3)', border: 'none', borderRadius: 4, color: 'white', cursor: 'pointer' }}>−</button>
          <button onClick={() => onClose(win.id)} style={{ width: 30, height: 30, background: 'rgba(255,59,48,0.3)', border: 'none', borderRadius: 4, color: 'white', cursor: 'pointer' }}>✕</button>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto', color: 'white' }}>
        <AppContent appId={appId} />
      </div>
    </div>
  );
}

// App Content Router
function AppContent({ appId }) {
  const componentMap = {
    'ai-studio': <AIStudio />,
    'assistant': <MegamAssistant />,
    'workspace': <Workspace />,
    'dashboard': <Dashboard />,
    'mail': <BadalMail />,
    'phone': <BadalPhone />,
    'auth': <BadalAuth />,
    'terminal': <Terminal />,
    'mcp-server': <MCPServer />,
    'etl-studio': <ETLStudio />,
    'infrastructure': <Infrastructure />,
    'data-center': <MegamDataCenter />,
    'rag': <BadalRAG />,
    'raag': <BadalRAAG />,
    'ss360': <SS360 />,
    'marketing': <MegamMarketing />,
    'scanner': <MegamScanner />,
    'sentinel': <MegamSentinel />,
    'vpn': <VPNManager />,
    'storage': <StorageExplorer />,
    'server-admin': <ServerAdmin />,
    'automate': <MegamAutomate />,
    'agent-view': <AgentView />,
    'studio': <MegamStudio />,
    'docs-hub': <DocumentationHub />,
    'seo-head': <SEOHead />,
    'campus': <MegamCampus />,
    'browser': <MegamBrowser />,
    'quantum': <MegamQuantum />,
    'travel': <MegamTravel />,
    'package-center': <PackageCenter />,
    'monetization': <MonetizationDashboard />,
    'ads': <AdManager />,
    'calculator': <MegamCalculator />,
  };

  return <div style={{ width: '100%', height: '100%' }}>{componentMap[appId] || <div style={{ padding: 20, color: 'white' }}>App not found</div>}</div>;
}
