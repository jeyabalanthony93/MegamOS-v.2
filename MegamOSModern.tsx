import React, { useState, useEffect, useRef } from 'react';

export default function MegamOSModern() {
  const [windows, setWindows] = useState({});
  const [startOpen, setStartOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [time, setTime] = useState(new Date());
  const [zIndex, setZIndex] = useState(100);
  const [wallpaper] = useState('linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)');

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const APPS = [
    { id: 'ai', name: 'AI Assistant', icon: '🤖', color: '#667eea', desc: 'Smart AI conversations' },
    { id: 'docs', name: 'Documents', icon: '📄', color: '#f093fb', desc: 'Create & edit documents' },
    { id: 'sheet', name: 'Spreadsheet', icon: '📊', color: '#4facfe', desc: 'Data analysis & charts' },
    { id: 'mail', name: 'Mail', icon: '📧', color: '#ff6b6b', desc: 'Email management' },
    { id: 'calendar', name: 'Calendar', icon: '📅', color: '#ffd93d', desc: 'Schedule & events' },
    { id: 'tasks', name: 'Tasks', icon: '✓', color: '#6bcf7f', desc: 'Task management' },
    { id: 'notes', name: 'Notes', icon: '📝', color: '#ff8fab', desc: 'Quick notes' },
    { id: 'dashboard', name: 'Dashboard', icon: '📈', color: '#00d4ff', desc: 'Analytics & stats' },
    { id: 'files', name: 'Files', icon: '📁', color: '#ffa500', desc: 'File manager' },
    { id: 'terminal', name: 'Terminal', icon: '⌘', color: '#2a2a2a', desc: 'Command line' },
    { id: 'browser', name: 'Browser', icon: '🌐', color: '#ff9500', desc: 'Web browsing' },
    { id: 'calc', name: 'Calculator', icon: '🔢', color: '#34c759', desc: 'Math operations' },
    { id: 'server', name: 'Server', icon: '🖥️', color: '#5856d6', desc: 'Server monitor' },
    { id: 'db', name: 'Database', icon: '🗄️', color: '#00c7b7', desc: 'Database admin' },
    { id: 'settings', name: 'Settings', icon: '⚙️', color: '#555555', desc: 'System settings' },
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
        width: 1000,
        height: 600,
        minified: false,
        maximized: false,
        zIdx: zIndex,
      }
    }));
    setZIndex(prev => prev + 1);
    setStartOpen(false);
    setSearch('');
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

  const toggleMaximize = (id) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], maximized: !prev[id].maximized }
    }));
  };

  const filteredApps = APPS.filter(a => a.name.toLowerCase().includes(search.toLowerCase()) || a.desc.toLowerCase().includes(search.toLowerCase()));
  const minifiedWindows = Object.values(windows).filter(w => w?.minified);
  const visibleWindows = Object.entries(windows).filter(([_, w]) => !w?.minified).sort((a, b) => a[1].zIdx - b[1].zIdx);

  return (
    <div style={{ width: '100vw', height: '100vh', background: wallpaper, overflow: 'hidden', fontFamily: "'Segoe UI', Tahoma, Geneva, sans-serif" }}>
      {/* Desktop Background */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 60, background: 'rgba(0,0,0,0.2)', zIndex: 1 }} />

      {/* Windows */}
      {visibleWindows.map(([windowId, win]) => (
        <Window
          key={windowId}
          win={win}
          onClose={closeWindow}
          onMinify={toggleMinify}
          onMaximize={toggleMaximize}
          onZIndex={() => setZIndex(prev => prev + 1)}
          appId={win.appId}
        />
      ))}

      {/* Taskbar */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
        background: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        zIndex: 50,
      }}>
        {/* Start Button */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setStartOpen(!startOpen)}
            style={{
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '16px',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            🚀 Start
          </button>

          {startOpen && (
            <div style={{
              position: 'absolute',
              bottom: 80,
              left: 0,
              background: 'rgba(20, 20, 30, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              padding: '16px',
              width: '500px',
              maxHeight: '500px',
              overflowY: 'auto',
              zIndex: 100,
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            }}>
              <input
                type="text"
                placeholder="🔍 Search applications..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoFocus
                style={{
                  width: '100%',
                  padding: '12px',
                  marginBottom: '16px',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  outline: 'none',
                  fontSize: '14px',
                }}
              />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                {filteredApps.map(app => (
                  <button
                    key={app.id}
                    onClick={() => launchApp(app.id)}
                    style={{
                      background: `linear-gradient(135deg, ${app.color}22, ${app.color}44)`,
                      border: `1px solid ${app.color}66`,
                      color: 'white',
                      padding: '16px 12px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      transition: 'all 0.3s',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = `linear-gradient(135deg, ${app.color}44, ${app.color}66)`;
                      e.target.style.transform = 'translateY(-4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = `linear-gradient(135deg, ${app.color}22, ${app.color}44)`;
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    <div style={{ fontSize: '24px', marginBottom: '4px' }}>{app.icon}</div>
                    <div style={{ fontWeight: 'bold', marginBottom: '2px' }}>{app.name}</div>
                    <div style={{ fontSize: '11px', opacity: 0.7 }}>{app.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Minimized Apps */}
        <div style={{ display: 'flex', gap: '8px', flex: 1, marginLeft: '20px', overflowX: 'auto' }}>
          {minifiedWindows.map(win => (
            <button
              key={win.id}
              onClick={() => toggleMinify(win.id)}
              style={{
                background: 'rgba(255,255,255,0.1)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.2)',
                padding: '8px 12px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '12px',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
              onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
            >
              {win.title}
            </button>
          ))}
        </div>

        {/* System Tray */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'white', fontSize: '12px' }}>
          <span title="Network">📡</span>
          <span title="CPU">⚡</span>
          <span title="Volume">🔊</span>
          <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{time.toLocaleTimeString()}</div>
        </div>
      </div>
    </div>
  );
}

function Window({ win, onClose, onMinify, onMaximize, onZIndex, appId }) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: win.x, y: win.y });

  const handleMouseDown = (e) => {
    if (e.target.closest('button')) return;
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    onZIndex();
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
    <div
      style={{
        position: 'absolute',
        left: win.maximized ? 0 : position.x,
        top: win.maximized ? 0 : position.y,
        width: win.maximized ? '100%' : win.width,
        height: win.maximized ? 'calc(100% - 60px)' : win.height,
        background: 'linear-gradient(135deg, rgba(20,20,30,0.98), rgba(40,40,60,0.98))',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: win.maximized ? '0' : '12px',
        display: 'flex',
        flexDirection: 'column',
        zIndex: win.zIdx,
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        overflow: 'hidden',
      }}
    >
      {/* Title Bar */}
      <div
        onMouseDown={handleMouseDown}
        style={{
          background: 'linear-gradient(90deg, rgba(102,126,234,0.3), rgba(240,147,251,0.3))',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          padding: '12px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          userSelect: 'none',
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
      >
        <span style={{ fontWeight: 'bold', color: 'white', fontSize: '14px' }}>{win.title}</span>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => onMinify(win.id)}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '12px',
            }}
          >
            −
          </button>
          <button
            onClick={() => onMaximize(win.id)}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '12px',
            }}
          >
            □
          </button>
          <button
            onClick={() => onClose(win.id)}
            style={{
              background: 'rgba(255,59,48,0.2)',
              border: 'none',
              color: '#ff3b30',
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '12px',
            }}
            onMouseEnter={(e) => e.target.style.background = 'rgba(255,59,48,0.4)'}
            onMouseLeave={(e) => e.target.style.background = 'rgba(255,59,48,0.2)'}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px', color: 'white' }}>
        <AppContent appId={appId} />
      </div>
    </div>
  );
}

function AppContent({ appId }) {
  const [messages, setMessages] = useState([{ role: 'ai', text: 'Hello! I\'m your AI Assistant. How can I help you today?' }]);
  const [input, setInput] = useState('');
  const [docs, setDocs] = useState(['Document 1', 'Document 2', 'Document 3']);
  const [activeDoc, setActiveDoc] = useState('Document 1');
  const [docContent, setDocContent] = useState('Your document content here...');
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Build AI features', done: false, priority: 'high' },
    { id: 2, text: 'Implement real-time updates', done: false, priority: 'high' },
    { id: 3, text: 'Add authentication', done: false, priority: 'medium' },
  ]);
  const [notes, setNotes] = useState([
    { id: 1, text: 'Project Deadline: Feb 28', color: '#ff6b6b' },
    { id: 2, text: 'Team Meeting: Friday 3PM', color: '#4facfe' },
  ]);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', text: input }]);
    setTimeout(() => {
      const responses = [
        'That\'s a great question! Let me help you with that.',
        'I understand. Here\'s what I recommend...',
        'Based on your request, I suggest...',
        'Interesting! I can assist with that.',
      ];
      setMessages(prev => [...prev, { role: 'ai', text: responses[Math.floor(Math.random() * responses.length)] }]);
    }, 800);
    setInput('');
  };

  if (appId === 'ai') {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', color: '#667eea' }}>🤖 AI Assistant</h2>
        <div style={{ flex: 1, overflowY: 'auto', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth: '70%',
                padding: '12px 16px',
                borderRadius: '12px',
                background: msg.role === 'user' ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'rgba(255,255,255,0.1)',
              }}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask me anything..."
            style={{
              flex: 1,
              padding: '12px',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'white',
              borderRadius: '8px',
              outline: 'none',
            }}
          />
          <button
            onClick={sendMessage}
            style={{
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Send
          </button>
        </div>
      </div>
    );
  }

  if (appId === 'docs') {
    return (
      <div style={{ display: 'flex', gap: '16px', height: '100%' }}>
        <div style={{ width: '200px', borderRight: '1px solid rgba(255,255,255,0.1)', paddingRight: '16px' }}>
          <h3 style={{ marginBottom: '12px', color: '#f093fb' }}>Documents</h3>
          {docs.map(doc => (
            <div
              key={doc}
              onClick={() => setActiveDoc(doc)}
              style={{
                padding: '10px',
                marginBottom: '8px',
                borderRadius: '6px',
                cursor: 'pointer',
                background: activeDoc === doc ? 'rgba(240,147,251,0.3)' : 'rgba(255,255,255,0.05)',
                border: activeDoc === doc ? '1px solid #f093fb' : 'none',
              }}
            >
              📄 {doc}
            </div>
          ))}
          <button
            onClick={() => setDocs([...docs, `Document ${docs.length + 1}`])}
            style={{
              width: '100%',
              padding: '10px',
              marginTop: '12px',
              background: 'rgba(240,147,251,0.2)',
              border: '1px solid rgba(240,147,251,0.4)',
              color: '#f093fb',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            + New Doc
          </button>
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ marginBottom: '12px', color: '#f093fb' }}>{activeDoc}</h3>
          <textarea
            value={docContent}
            onChange={(e) => setDocContent(e.target.value)}
            style={{
              width: '100%',
              height: '400px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'white',
              padding: '12px',
              borderRadius: '8px',
              outline: 'none',
              fontFamily: 'monospace',
              resize: 'none',
            }}
            placeholder="Start typing your document..."
          />
        </div>
      </div>
    );
  }

  if (appId === 'sheet') {
    return (
      <div>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', color: '#4facfe' }}>📊 Spreadsheet</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid rgba(79,172,254,0.5)' }}>
                {['A', 'B', 'C', 'D', 'E'].map(col => (
                  <th key={col} style={{ padding: '12px', textAlign: 'left', color: '#4facfe' }}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 10 }).map((_, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  {Array.from({ length: 5 }).map((_, j) => (
                    <td key={j} style={{ padding: '8px' }}>
                      <input
                        type="text"
                        placeholder={`${String.fromCharCode(65 + j)}${i + 1}`}
                        style={{
                          width: '100%',
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          color: 'white',
                          padding: '6px',
                          borderRadius: '4px',
                          outline: 'none',
                        }}
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
  }

  if (appId === 'mail') {
    return (
      <div>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', color: '#ff6b6b' }}>📧 Mail</h2>
        <div style={{ background: 'rgba(255,107,107,0.1)', padding: '16px', borderRadius: '8px', marginBottom: '16px', border: '1px solid rgba(255,107,107,0.3)' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>From: project@company.com</div>
          <div style={{ color: '#cbd5e1', marginBottom: '12px' }}>Subject: Project Update & Deadline</div>
          <div style={{ lineHeight: '1.6', color: '#e2e8f0' }}>
            Hi Team,<br/><br/>
            I hope this email finds you well. I wanted to follow up on our project progress and discuss the upcoming deadline.<br/><br/>
            Our next milestone is scheduled for February 28th. Please ensure all deliverables are submitted by then.<br/><br/>
            Best regards,<br/>
            Project Manager
          </div>
        </div>
      </div>
    );
  }

  if (appId === 'calendar') {
    return (
      <div>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', color: '#ffd93d' }}>📅 Calendar - February 2026</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} style={{ fontWeight: 'bold', textAlign: 'center', padding: '12px', color: '#ffd93d' }}>{day}</div>
          ))}
          {Array.from({ length: 28 }).map((_, i) => (
            <div
              key={i}
              style={{
                padding: '12px',
                textAlign: 'center',
                borderRadius: '8px',
                background: i + 1 === 5 ? 'linear-gradient(135deg, #ffd93d, #ffb84d)' : 'rgba(255,255,255,0.05)',
                border: i + 1 === 5 ? '2px solid #ffd93d' : '1px solid rgba(255,255,255,0.1)',
                cursor: 'pointer',
              }}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (appId === 'tasks') {
    return (
      <div>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', color: '#6bcf7f' }}>✓ Task Manager</h2>
        {tasks.map(task => (
          <div key={task.id} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px',
            marginBottom: '8px',
            borderRadius: '8px',
            background: 'rgba(107,207,127,0.1)',
            border: '1px solid rgba(107,207,127,0.3)',
          }}>
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => setTasks(tasks.map(t => t.id === task.id ? { ...t, done: !t.done } : t))}
              style={{ width: '18px', height: '18px', cursor: 'pointer' }}
            />
            <span style={{ flex: 1, textDecoration: task.done ? 'line-through' : 'none' }}>{task.text}</span>
            <span style={{
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '12px',
              background: task.priority === 'high' ? 'rgba(255,107,107,0.3)' : 'rgba(100,150,255,0.3)',
              color: task.priority === 'high' ? '#ff6b6b' : '#6495ff',
            }}>
              {task.priority}
            </span>
          </div>
        ))}
        <button
          onClick={() => setTasks([...tasks, { id: Date.now(), text: 'New Task', done: false, priority: 'medium' }])}
          style={{
            width: '100%',
            padding: '10px',
            marginTop: '12px',
            background: 'rgba(107,207,127,0.2)',
            border: '1px solid rgba(107,207,127,0.4)',
            color: '#6bcf7f',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          + Add Task
        </button>
      </div>
    );
  }

  if (appId === 'notes') {
    return (
      <div>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', color: '#ff8fab' }}>📝 Notes</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
          {notes.map(note => (
            <div key={note.id} style={{
              padding: '16px',
              borderRadius: '8px',
              background: note.color + '22',
              border: `1px solid ${note.color}66`,
              minHeight: '120px',
            }}>
              <div style={{ color: note.color }}>{note.text}</div>
            </div>
          ))}
        </div>
        <button
          onClick={() => setNotes([...notes, { id: Date.now(), text: 'New Note', color: '#6495ff' }])}
          style={{
            marginTop: '16px',
            padding: '10px 16px',
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: 'white',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          + New Note
        </button>
      </div>
    );
  }

  if (appId === 'dashboard') {
    return (
      <div>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', color: '#00d4ff' }}>📈 Dashboard</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {[
            { label: 'CPU Usage', value: '42%', color: '#ff6b6b', icon: '⚡' },
            { label: 'Memory', value: '62%', color: '#4facfe', icon: '💾' },
            { label: 'Disk', value: '71%', color: '#ffd93d', icon: '💿' },
            { label: 'Network', value: '2.3 GB', color: '#6bcf7f', icon: '📡' },
          ].map((kpi, i) => (
            <div key={i} style={{
              padding: '20px',
              borderRadius: '12px',
              background: `linear-gradient(135deg, ${kpi.color}22, ${kpi.color}44)`,
              border: `1px solid ${kpi.color}66`,
            }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>{kpi.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: '12px' }}>{kpi.label}</div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: kpi.color, marginTop: '8px' }}>{kpi.value}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (appId === 'files') {
    return (
      <div>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', color: '#ffa500' }}>📁 Files</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid rgba(255,165,0,0.5)' }}>
              <th style={{ textAlign: 'left', padding: '12px', color: '#ffa500' }}>Name</th>
              <th style={{ textAlign: 'left', padding: '12px', color: '#ffa500' }}>Size</th>
              <th style={{ textAlign: 'left', padding: '12px', color: '#ffa500' }}>Modified</th>
            </tr>
          </thead>
          <tbody>
            {['Document.docx', 'Image.png', 'Archive.zip', 'Video.mp4'].map((file, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,165,0,0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <td style={{ padding: '12px' }}>📄 {file}</td>
                <td style={{ padding: '12px' }}>{Math.floor(Math.random() * 500) + 100} KB</td>
                <td style={{ padding: '12px' }}>Today</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (appId === 'terminal') {
    return (
      <div style={{ fontFamily: 'monospace', fontSize: '13px' }}>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', color: '#6bcf7f' }}>⌘ Terminal</h2>
        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '8px', marginBottom: '12px', lineHeight: '1.6' }}>
          <div>$ whoami</div>
          <div style={{ color: '#6bcf7f' }}>megamos@system</div>
          <div style={{ marginTop: '8px' }}>$ uname -a</div>
          <div style={{ color: '#6bcf7f' }}>Linux megamos 5.10.0 #1 SMP x86_64 GNU/Linux</div>
          <div style={{ marginTop: '8px' }}>$ date</div>
          <div style={{ color: '#6bcf7f' }}>Wed Feb 5 15:30:45 UTC 2026</div>
        </div>
        <input
          type="text"
          placeholder="$ "
          style={{
            width: '100%',
            background: 'rgba(0,0,0,0.3)',
            color: '#6bcf7f',
            border: '1px solid rgba(107,207,127,0.3)',
            padding: '8px 12px',
            borderRadius: '4px',
            fontFamily: 'monospace',
            outline: 'none',
          }}
        />
      </div>
    );
  }

  if (appId === 'browser') {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <button style={{ padding: '8px 12px', background: 'rgba(255,149,0,0.2)', border: '1px solid rgba(255,149,0,0.4)', color: '#ff9500', borderRadius: '6px', cursor: 'pointer' }}>← Back</button>
          <button style={{ padding: '8px 12px', background: 'rgba(255,149,0,0.2)', border: '1px solid rgba(255,149,0,0.4)', color: '#ff9500', borderRadius: '6px', cursor: 'pointer' }}>→ Forward</button>
          <input
            type="text"
            placeholder="https://example.com"
            style={{
              flex: 1,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'white',
              padding: '8px 12px',
              borderRadius: '6px',
              outline: 'none',
            }}
          />
        </div>
        <div style={{ flex: 1, background: 'rgba(255,255,255,0.02)', borderRadius: '8px', padding: '20px', overflow: 'auto' }}>
          <h2 style={{ color: '#ff9500', marginBottom: '12px' }}>🌐 Welcome to MegamOS Browser</h2>
          <p>Browse the web seamlessly with AI-powered suggestions and fast performance.</p>
        </div>
      </div>
    );
  }

  if (appId === 'calc') {
    const [display, setDisplay] = useState('0');
    return (
      <div>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', color: '#34c759' }}>🔢 Calculator</h2>
        <input
          type="text"
          value={display}
          readOnly
          style={{
            width: '100%',
            padding: '16px',
            background: 'rgba(52,199,89,0.1)',
            border: '1px solid rgba(52,199,89,0.3)',
            color: '#34c759',
            borderRadius: '8px',
            marginBottom: '16px',
            fontSize: '24px',
            textAlign: 'right',
            fontWeight: 'bold',
          }}
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
          {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+'].map(btn => (
            <button
              key={btn}
              onClick={() => setDisplay(display === '0' && btn !== '.' ? btn : display + btn)}
              style={{
                padding: '16px',
                background: 'rgba(52,199,89,0.2)',
                border: '1px solid rgba(52,199,89,0.4)',
                color: '#34c759',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold',
              }}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (appId === 'server') {
    return (
      <div>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', color: '#5856d6' }}>🖥️ Server Monitor</h2>
        {['Web Server', 'Database', 'Cache Server', 'API Gateway'].map((service, i) => (
          <div key={i} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px',
            marginBottom: '12px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, rgba(88,86,214,0.1), rgba(88,86,214,0.2))',
            border: '1px solid rgba(88,86,214,0.3)',
          }}>
            <div>
              <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{service}</div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>Uptime: 99.9%</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#34c759', animation: 'pulse 2s infinite' }}></div>
              <span style={{ color: '#34c759' }}>Running</span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (appId === 'db') {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', color: '#00c7b7' }}>🗄️ Database Admin</h2>
        <textarea
          defaultValue="SELECT * FROM users WHERE active = true;"
          style={{
            flex: 1,
            background: 'rgba(0,199,183,0.1)',
            border: '1px solid rgba(0,199,183,0.3)',
            color: 'white',
            padding: '12px',
            borderRadius: '8px',
            fontFamily: 'monospace',
            resize: 'none',
            outline: 'none',
            marginBottom: '12px',
          }}
        />
        <button
          style={{
            padding: '10px 16px',
            background: 'linear-gradient(135deg, #00c7b7, #00d4ff)',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          ▶ Execute Query
        </button>
      </div>
    );
  }

  if (appId === 'settings') {
    return (
      <div>
        <h2 style={{ marginBottom: '20px', fontSize: '20px', color: '#666' }}>⚙️ System Settings</h2>
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#cbd5e1', marginBottom: '12px' }}>System Information</h3>
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '6px', fontSize: '13px' }}>
            <p>OS: MegamOS v2.0</p>
            <p>Kernel: 5.10.0</p>
            <p>Build: 2026.02.05</p>
          </div>
        </div>
        <div>
          <h3 style={{ color: '#cbd5e1', marginBottom: '12px' }}>Display</h3>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input type="checkbox" defaultChecked style={{ width: '16px', height: '16px' }} />
            <span>Dark Mode (Always On)</span>
          </label>
        </div>
      </div>
    );
  }

  return <div>Unknown Application</div>;
}
