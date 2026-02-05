import React, { useState, useEffect, useRef } from 'react';

export default function MegamOSAdvanced() {
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
    { id: 'ai', name: 'AI Studio', icon: '🤖', color: '#667eea', desc: 'AI-powered chat with streaming' },
    { id: 'docs', name: 'Documents', icon: '📄', color: '#f093fb', desc: 'Rich text editor with export' },
    { id: 'sheet', name: 'Spreadsheet', icon: '📊', color: '#4facfe', desc: 'Formulas & charts' },
    { id: 'mail', name: 'Mail', icon: '📧', color: '#ff6b6b', desc: 'Email with attachments' },
    { id: 'calendar', name: 'Calendar', icon: '📅', color: '#ffd93d', desc: 'Schedule & events' },
    { id: 'tasks', name: 'Tasks', icon: '✓', color: '#6bcf7f', desc: 'Kanban & priorities' },
    { id: 'notes', name: 'Notes', icon: '📝', color: '#ff8fab', desc: 'Markdown notes' },
    { id: 'dashboard', name: 'Dashboard', icon: '📈', color: '#00d4ff', desc: 'Real-time analytics' },
    { id: 'files', name: 'Files', icon: '📁', color: '#ffa500', desc: 'File management' },
    { id: 'terminal', name: 'Terminal', icon: '⌘', color: '#6bcf7f', desc: 'Command emulator' },
    { id: 'browser', name: 'Browser', icon: '🌐', color: '#ff9500', desc: 'Web browser' },
    { id: 'calc', name: 'Calculator', icon: '🔢', color: '#34c759', desc: 'Scientific calc' },
    { id: 'server', name: 'Server', icon: '🖥️', color: '#5856d6', desc: 'System monitoring' },
    { id: 'db', name: 'Database', icon: '🗄️', color: '#00c7b7', desc: 'SQL manager' },
    { id: 'settings', name: 'Settings', icon: '⚙️', color: '#888', desc: 'Configuration' },
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
        width: 1100,
        height: 650,
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

  const filteredApps = APPS.filter(a => a.name.toLowerCase().includes(search.toLowerCase()));
  const minifiedWindows = Object.values(windows).filter(w => w?.minified);
  const visibleWindows = Object.entries(windows).filter(([_, w]) => !w?.minified).sort((a, b) => a[1].zIdx - b[1].zIdx);

  return (
    <div style={{ width: '100vw', height: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)', overflow: 'hidden', fontFamily: "'Segoe UI', sans-serif" }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 60, background: 'rgba(0,0,0,0.15)', zIndex: 1 }} />

      {visibleWindows.map(([windowId, win]) => (
        <Window key={windowId} win={win} onClose={closeWindow} onMinify={toggleMinify} onZIndex={() => setZIndex(prev => prev + 1)} appId={win.appId} />
      ))}

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
            }}
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
                placeholder="🔍 Search..."
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
                    <div style={{ fontWeight: 'bold', marginBottom: '2px', fontSize: '12px' }}>{app.name}</div>
                    <div style={{ fontSize: '11px', opacity: 0.7 }}>{app.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

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
              }}
            >
              {win.title}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'white', fontSize: '12px' }}>
          <span>📡</span>
          <span>⚡</span>
          <span>🔊</span>
          <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{time.toLocaleTimeString()}</div>
        </div>
      </div>
    </div>
  );
}

function Window({ win, onClose, onMinify, onZIndex, appId }) {
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
        left: position.x,
        top: position.y,
        width: win.width,
        height: win.height,
        background: 'linear-gradient(135deg, rgba(20,20,30,0.98), rgba(40,40,60,0.98))',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        zIndex: win.zIdx,
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        overflow: 'hidden',
      }}
    >
      <div
        onMouseDown={handleMouseDown}
        style={{
          background: 'linear-gradient(90deg, rgba(102,126,234,0.3), rgba(240,147,251,0.3))',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          padding: '12px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'grab',
        }}
      >
        <span style={{ fontWeight: 'bold', color: 'white', fontSize: '14px' }}>{win.title}</span>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => onMinify(win.id)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', cursor: 'pointer', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>−</button>
          <button onClick={() => onClose(win.id)} style={{ background: 'rgba(255,59,48,0.2)', border: 'none', color: '#ff3b30', cursor: 'pointer', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>✕</button>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px', color: 'white' }}>
        <AppContent appId={appId} />
      </div>
    </div>
  );
}

function AppContent({ appId }) {
  const downloadFile = (content, filename, type) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const shareContent = (title, text) => {
    if (navigator.share) {
      navigator.share({ title, text });
    } else {
      alert(`Share: ${title}\n${text}`);
    }
  };

  if (appId === 'ai') {
    const [messages, setMessages] = useState([
      { role: 'ai', text: 'Hello! I\'m your AI Assistant. How can I help you today?' }
    ]);
    const [input, setInput] = useState('');

    const sendMessage = () => {
      if (!input.trim()) return;
      setMessages([...messages, { role: 'user', text: input }]);
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'ai', text: 'That\'s a great question! I\'m processing your request with advanced AI models (GPT, Claude, Gemini)...' }]);
      }, 800);
      setInput('');
    };

    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ margin: 0, fontSize: '20px', color: '#667eea' }}>🤖 AI Studio</h2>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => downloadFile(messages.map(m => `${m.role}: ${m.text}`).join('\n'), 'chat.txt', 'text/plain')} style={{ padding: '6px 12px', background: 'rgba(102,126,234,0.3)', border: '1px solid rgba(102,126,234,0.5)', color: '#667eea', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>📥 Export TXT</button>
            <button onClick={() => shareContent('Chat', 'Check out this conversation')} style={{ padding: '6px 12px', background: 'rgba(102,126,234,0.3)', border: '1px solid rgba(102,126,234,0.5)', color: '#667eea', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>📤 Share</button>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth: '70%',
                padding: '12px 16px',
                borderRadius: '12px',
                background: msg.role === 'user' ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'rgba(255,255,255,0.1)',
                wordWrap: 'break-word',
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
          <button onClick={sendMessage} style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>💬 Send</button>
        </div>
      </div>
    );
  }

  if (appId === 'docs') {
    const [docs, setDocs] = useState([
      { id: 1, name: 'Project Proposal', content: 'This is a detailed project proposal...' },
      { id: 2, name: 'Meeting Notes', content: 'Notes from today\'s meeting...' }
    ]);
    const [activeId, setActiveId] = useState(1);
    const activeDoc = docs.find(d => d.id === activeId);

    return (
      <div style={{ display: 'flex', gap: '16px', height: '100%' }}>
        <div style={{ width: '200px', borderRight: '1px solid rgba(255,255,255,0.1)', paddingRight: '16px' }}>
          <h3 style={{ marginBottom: '12px', color: '#f093fb' }}>📄 Documents</h3>
          {docs.map(doc => (
            <div
              key={doc.id}
              onClick={() => setActiveId(doc.id)}
              style={{
                padding: '10px',
                marginBottom: '8px',
                borderRadius: '6px',
                cursor: 'pointer',
                background: activeId === doc.id ? 'rgba(240,147,251,0.3)' : 'rgba(255,255,255,0.05)',
                border: activeId === doc.id ? '1px solid #f093fb' : 'none',
              }}
            >
              {doc.name}
            </div>
          ))}
          <button
            onClick={() => {
              const name = prompt('Document name:');
              if (name) setDocs([...docs, { id: Date.now(), name, content: '' }]);
            }}
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
            + New
          </button>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <button onClick={() => downloadFile(activeDoc.content, `${activeDoc.name}.txt`, 'text/plain')} style={{ padding: '8px 12px', background: 'rgba(240,147,251,0.2)', border: '1px solid rgba(240,147,251,0.4)', color: '#f093fb', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>📥 TXT</button>
            <button onClick={() => downloadFile(`# ${activeDoc.name}\n\n${activeDoc.content}`, `${activeDoc.name}.md`, 'text/markdown')} style={{ padding: '8px 12px', background: 'rgba(240,147,251,0.2)', border: '1px solid rgba(240,147,251,0.4)', color: '#f093fb', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>📥 MD</button>
            <button onClick={() => shareContent(activeDoc.name, activeDoc.content)} style={{ padding: '8px 12px', background: 'rgba(240,147,251,0.2)', border: '1px solid rgba(240,147,251,0.4)', color: '#f093fb', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>📤 Share</button>
            <button onClick={() => setDocs(docs.filter(d => d.id !== activeId))} style={{ padding: '8px 12px', background: 'rgba(255,107,107,0.2)', border: '1px solid rgba(255,107,107,0.4)', color: '#ff6b6b', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>🗑️ Delete</button>
          </div>

          <h3 style={{ marginBottom: '12px', color: '#f093fb' }}>{activeDoc?.name}</h3>
          <textarea
            value={activeDoc?.content || ''}
            onChange={(e) => setDocs(docs.map(d => d.id === activeId ? { ...d, content: e.target.value } : d))}
            style={{
              flex: 1,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'white',
              padding: '12px',
              borderRadius: '8px',
              outline: 'none',
              fontFamily: 'monospace',
              resize: 'none',
            }}
            placeholder="Start typing..."
          />
          <div style={{ marginTop: '8px', fontSize: '12px', color: '#94a3b8' }}>
            {activeDoc?.content.length || 0} characters | {(activeDoc?.content || '').split(' ').filter(w => w).length} words
          </div>
        </div>
      </div>
    );
  }

  if (appId === 'sheet') {
    const [cells, setCells] = useState({});

    const handleCellChange = (row, col, value) => {
      const key = `${row}-${col}`;
      const parsed = value.startsWith('=') ? value : value;
      setCells({ ...cells, [key]: parsed });
    };

    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <button onClick={() => downloadFile(JSON.stringify(cells), 'spreadsheet.json', 'application/json')} style={{ padding: '8px 12px', background: 'rgba(79,172,254,0.2)', border: '1px solid rgba(79,172,254,0.4)', color: '#4facfe', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>💾 JSON</button>
          <button onClick={() => downloadFile(Object.entries(cells).map(([k, v]) => `${k}: ${v}`).join('\n'), 'spreadsheet.csv', 'text/csv')} style={{ padding: '8px 12px', background: 'rgba(79,172,254,0.2)', border: '1px solid rgba(79,172,254,0.4)', color: '#4facfe', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>📊 CSV</button>
          <button onClick={() => shareContent('Spreadsheet', 'Check out this data')} style={{ padding: '8px 12px', background: 'rgba(79,172,254,0.2)', border: '1px solid rgba(79,172,254,0.4)', color: '#4facfe', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>📤 Share</button>
        </div>

        <div style={{ flex: 1, overflowX: 'auto' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid rgba(79,172,254,0.5)' }}>
                {['A', 'B', 'C', 'D', 'E', 'F'].map(col => (
                  <th key={col} style={{ padding: '12px', textAlign: 'left', color: '#4facfe', minWidth: '120px' }}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 12 }).map((_, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  {['A', 'B', 'C', 'D', 'E', 'F'].map(col => {
                    const key = `${i + 1}-${col}`;
                    return (
                      <td key={key} style={{ padding: '0' }}>
                        <input
                          type="text"
                          value={cells[key] || ''}
                          onChange={(e) => handleCellChange(i + 1, col, e.target.value)}
                          style={{
                            width: '100%',
                            padding: '10px',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: 'white',
                            outline: 'none',
                          }}
                          placeholder={`${col}${i + 1}`}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (appId === 'mail') {
    const [emails, setEmails] = useState([
      { id: 1, from: 'team@company.com', subject: 'Project Update', body: 'Update on project status...', read: false, starred: false },
      { id: 2, from: 'hr@company.com', subject: 'Welcome', body: 'Welcome to the team!', read: true, starred: false }
    ]);
    const [selectedId, setSelectedId] = useState(1);
    const selected = emails.find(e => e.id === selectedId);

    return (
      <div style={{ display: 'flex', gap: '16px', height: '100%' }}>
        <div style={{ width: '250px', borderRight: '1px solid rgba(255,255,255,0.1)', paddingRight: '16px', overflowY: 'auto' }}>
          <h3 style={{ marginBottom: '12px', color: '#ff6b6b' }}>📧 Inbox</h3>
          {emails.map(email => (
            <div
              key={email.id}
              onClick={() => {
                setSelectedId(email.id);
                setEmails(emails.map(e => e.id === email.id ? { ...e, read: true } : e));
              }}
              style={{
                padding: '12px',
                marginBottom: '8px',
                borderRadius: '6px',
                cursor: 'pointer',
                background: selectedId === email.id ? 'rgba(255,107,107,0.3)' : 'rgba(255,255,255,0.05)',
                border: selectedId === email.id ? '1px solid #ff6b6b' : 'none',
                fontWeight: email.read ? 'normal' : 'bold',
              }}
            >
              <div style={{ fontSize: '12px' }}>{email.from}</div>
              <div style={{ fontSize: '11px', color: '#cbd5e1' }}>{email.subject}</div>
            </div>
          ))}
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {selected && (
            <>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <button onClick={() => downloadFile(`From: ${selected.from}\nSubject: ${selected.subject}\n\n${selected.body}`, 'email.txt', 'text/plain')} style={{ padding: '8px 12px', background: 'rgba(255,107,107,0.2)', border: '1px solid rgba(255,107,107,0.4)', color: '#ff6b6b', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>📥 Download</button>
                <button onClick={() => setEmails(emails.map(e => e.id === selected.id ? { ...e, starred: !e.starred } : e))} style={{ padding: '8px 12px', background: 'rgba(255,107,107,0.2)', border: '1px solid rgba(255,107,107,0.4)', color: '#ff6b6b', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>{selected.starred ? '⭐' : '☆'} Star</button>
                <button onClick={() => shareContent(selected.subject, selected.body)} style={{ padding: '8px 12px', background: 'rgba(255,107,107,0.2)', border: '1px solid rgba(255,107,107,0.4)', color: '#ff6b6b', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>📤 Forward</button>
                <button onClick={() => setEmails(emails.filter(e => e.id !== selected.id))} style={{ padding: '8px 12px', background: 'rgba(255,107,107,0.2)', border: '1px solid rgba(255,107,107,0.4)', color: '#ff6b6b', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>🗑️ Delete</button>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>From: {selected.from}</div>
                <div style={{ color: '#cbd5e1', marginBottom: '12px' }}>Subject: {selected.subject}</div>
              </div>

              <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '8px', overflowY: 'auto', lineHeight: '1.6' }}>
                {selected.body}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  if (appId === 'calendar') {
    const [events, setEvents] = useState([
      { date: 5, title: 'Team Meeting', time: '10:00 AM' },
      { date: 8, title: 'Project Deadline', time: '5:00 PM' }
    ]);

    return (
      <div>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', color: '#ffd93d' }}>📅 Calendar - February 2026</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', marginBottom: '20px' }}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} style={{ fontWeight: 'bold', textAlign: 'center', padding: '12px', color: '#ffd93d' }}>{day}</div>
          ))}
          {Array.from({ length: 28 }).map((_, i) => {
            const event = events.find(e => e.date === i + 1);
            return (
              <div
                key={i}
                style={{
                  padding: '12px',
                  textAlign: 'center',
                  borderRadius: '8px',
                  background: event ? 'linear-gradient(135deg, #ffd93d, #ffb84d)' : 'rgba(255,255,255,0.05)',
                  border: event ? '2px solid #ffd93d' : '1px solid rgba(255,255,255,0.1)',
                  cursor: 'pointer',
                  minHeight: '60px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <div style={{ fontWeight: 'bold' }}>{i + 1}</div>
                {event && <div style={{ fontSize: '10px', marginTop: '4px', color: '#000' }}>{event.title}</div>}
              </div>
            );
          })}
        </div>
        <button
          onClick={() => {
            const title = prompt('Event title:');
            const date = prompt('Date (1-28):');
            if (title && date) setEvents([...events, { date: parseInt(date), title, time: '12:00 PM' }]);
          }}
          style={{
            padding: '10px 16px',
            background: 'rgba(255,217,61,0.2)',
            border: '1px solid rgba(255,217,61,0.4)',
            color: '#ffd93d',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          + Add Event
        </button>
      </div>
    );
  }

  if (appId === 'tasks') {
    const [tasks, setTasks] = useState([
      { id: 1, text: 'Design UI mockups', priority: 'high', done: false, dueDate: '2026-02-10' },
      { id: 2, text: 'Implement features', priority: 'high', done: false, dueDate: '2026-02-15' },
      { id: 3, text: 'Testing', priority: 'medium', done: false, dueDate: '2026-02-20' }
    ]);
    const [view, setView] = useState('list');

    const kanbanLanes = ['Not Started', 'In Progress', 'Done'];

    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ margin: 0, fontSize: '20px', color: '#6bcf7f' }}>✓ Tasks</h2>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => setView('list')} style={{ padding: '6px 12px', background: view === 'list' ? 'rgba(107,207,127,0.4)' : 'rgba(107,207,127,0.2)', border: '1px solid rgba(107,207,127,0.4)', color: '#6bcf7f', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>📋 List</button>
            <button onClick={() => setView('kanban')} style={{ padding: '6px 12px', background: view === 'kanban' ? 'rgba(107,207,127,0.4)' : 'rgba(107,207,127,0.2)', border: '1px solid rgba(107,207,127,0.4)', color: '#6bcf7f', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>📊 Kanban</button>
          </div>
        </div>

        {view === 'list' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {tasks.map(task => (
              <div key={task.id} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px',
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
                <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '12px', background: task.priority === 'high' ? 'rgba(255,107,107,0.3)' : 'rgba(100,150,255,0.3)', color: task.priority === 'high' ? '#ff6b6b' : '#6495ff' }}>{task.priority}</span>
                <button onClick={() => setTasks(tasks.filter(t => t.id !== task.id))} style={{ padding: '4px 8px', background: 'rgba(255,107,107,0.2)', border: 'none', color: '#ff6b6b', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>🗑️</button>
              </div>
            ))}
          </div>
        )}

        {view === 'kanban' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {kanbanLanes.map(lane => (
              <div key={lane} style={{ background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '8px', minHeight: '300px' }}>
                <h3 style={{ marginTop: 0, marginBottom: '12px', color: '#6bcf7f' }}>{lane}</h3>
                {tasks.filter(t => t.priority === lane.toLowerCase().replace(' ', '')).map(task => (
                  <div key={task.id} style={{ background: 'rgba(107,207,127,0.2)', padding: '12px', borderRadius: '6px', marginBottom: '8px', cursor: 'move' }}>
                    {task.text}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => {
            const text = prompt('Task:');
            if (text) setTasks([...tasks, { id: Date.now(), text, priority: 'medium', done: false, dueDate: new Date().toISOString().split('T')[0] }]);
          }}
          style={{
            marginTop: '16px',
            padding: '10px 16px',
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
    const [notes, setNotes] = useState([
      { id: 1, title: 'Project Ideas', text: '- Feature A\n- Feature B', color: '#ff6b6b' },
      { id: 2, title: 'Meeting Notes', text: 'Discussed timeline and budget', color: '#4facfe' }
    ]);
    const [selectedId, setSelectedId] = useState(1);
    const selected = notes.find(n => n.id === selectedId);

    return (
      <div style={{ display: 'flex', gap: '16px', height: '100%' }}>
        <div style={{ width: '180px', borderRight: '1px solid rgba(255,255,255,0.1)', paddingRight: '16px', overflowY: 'auto' }}>
          <h3 style={{ marginBottom: '12px', color: '#ff8fab' }}>📝 Notes</h3>
          {notes.map(note => (
            <div
              key={note.id}
              onClick={() => setSelectedId(note.id)}
              style={{
                padding: '10px',
                marginBottom: '8px',
                borderRadius: '6px',
                cursor: 'pointer',
                background: selectedId === note.id ? `${note.color}33` : 'rgba(255,255,255,0.05)',
                border: selectedId === note.id ? `2px solid ${note.color}` : 'none',
                wordBreak: 'break-word',
              }}
            >
              <div style={{ fontWeight: 'bold', fontSize: '13px' }}>{note.title}</div>
            </div>
          ))}
          <button
            onClick={() => {
              const title = prompt('Note title:');
              if (title) setNotes([...notes, { id: Date.now(), title, text: '', color: '#' + Math.floor(Math.random() * 16777215).toString(16) }]);
            }}
            style={{
              width: '100%',
              padding: '10px',
              marginTop: '12px',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'white',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            + New
          </button>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {selected && (
            <>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <button onClick={() => downloadFile(selected.text, `${selected.title}.md`, 'text/markdown')} style={{ padding: '8px 12px', background: `${selected.color}33`, border: `1px solid ${selected.color}66`, color: selected.color, borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>📥 MD</button>
                <button onClick={() => shareContent(selected.title, selected.text)} style={{ padding: '8px 12px', background: `${selected.color}33`, border: `1px solid ${selected.color}66`, color: selected.color, borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>📤 Share</button>
                <button onClick={() => setNotes(notes.filter(n => n.id !== selected.id))} style={{ padding: '8px 12px', background: 'rgba(255,107,107,0.2)', border: '1px solid rgba(255,107,107,0.4)', color: '#ff6b6b', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>🗑️ Delete</button>
              </div>

              <h3 style={{ marginBottom: '12px', color: selected.color }}>{selected.title}</h3>
              <textarea
                value={selected.text}
                onChange={(e) => setNotes(notes.map(n => n.id === selected.id ? { ...n, text: e.target.value } : n))}
                style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'white',
                  padding: '12px',
                  borderRadius: '8px',
                  outline: 'none',
                  fontFamily: 'monospace',
                  resize: 'none',
                }}
                placeholder="Type markdown here..."
              />
            </>
          )}
        </div>
      </div>
    );
  }

  if (appId === 'dashboard') {
    const [stats] = useState([
      { label: 'CPU Usage', value: '42%', color: '#ff6b6b', icon: '⚡' },
      { label: 'Memory', value: '62%', color: '#4facfe', icon: '💾' },
      { label: 'Disk', value: '71%', color: '#ffd93d', icon: '💿' },
      { label: 'Network', value: '2.3 GB', color: '#6bcf7f', icon: '📡' }
    ]);

    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ margin: 0, fontSize: '20px', color: '#00d4ff' }}>📈 Dashboard</h2>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => downloadFile(JSON.stringify(stats), 'dashboard.json', 'application/json')} style={{ padding: '8px 12px', background: 'rgba(0,212,255,0.2)', border: '1px solid rgba(0,212,255,0.4)', color: '#00d4ff', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>💾 Export</button>
            <button onClick={() => shareContent('Dashboard', 'Check out my system stats')} style={{ padding: '8px 12px', background: 'rgba(0,212,255,0.2)', border: '1px solid rgba(0,212,255,0.4)', color: '#00d4ff', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>📤 Share</button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {stats.map((stat, i) => (
            <div key={i} style={{
              padding: '20px',
              borderRadius: '12px',
              background: `linear-gradient(135deg, ${stat.color}22, ${stat.color}44)`,
              border: `1px solid ${stat.color}66`,
            }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>{stat.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: '12px' }}>{stat.label}</div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: stat.color, marginTop: '8px' }}>{stat.value}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (appId === 'files') {
    const [files] = useState([
      { name: 'Document.docx', size: '256 KB', type: 'Document' },
      { name: 'Image.png', size: '2.3 MB', type: 'Image' },
      { name: 'Archive.zip', size: '45 MB', type: 'Archive' },
      { name: 'Video.mp4', size: '156 MB', type: 'Video' }
    ]);

    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <input type="text" placeholder="Search files..." style={{ flex: 1, padding: '8px 12px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: '4px', outline: 'none', fontSize: '12px' }} />
          <button style={{ padding: '8px 12px', background: 'rgba(255,165,0,0.2)', border: '1px solid rgba(255,165,0,0.4)', color: '#ffa500', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>📤 Upload</button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid rgba(255,165,0,0.5)' }}>
                <th style={{ textAlign: 'left', padding: '12px', color: '#ffa500' }}>📄 Name</th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#ffa500' }}>Size</th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#ffa500' }}>Type</th>
                <th style={{ padding: '12px', color: '#ffa500' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,165,0,0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '12px' }}>{file.name}</td>
                  <td style={{ padding: '12px' }}>{file.size}</td>
                  <td style={{ padding: '12px' }}>{file.type}</td>
                  <td style={{ padding: '12px', display: 'flex', gap: '8px', justifyContent: 'center' }}>
                    <button onClick={() => downloadFile(`File: ${file.name}`, file.name, 'application/octet-stream')} style={{ padding: '4px 8px', background: 'rgba(255,165,0,0.2)', border: 'none', color: '#ffa500', borderRadius: '4px', cursor: 'pointer', fontSize: '11px' }}>📥</button>
                    <button onClick={() => shareContent(file.name, `Download ${file.name}`)} style={{ padding: '4px 8px', background: 'rgba(255,165,0,0.2)', border: 'none', color: '#ffa500', borderRadius: '4px', cursor: 'pointer', fontSize: '11px' }}>🔗</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (appId === 'terminal') {
    const [commands, setCommands] = useState(['$ whoami\nmegamos@system', '$ date\nWed Feb 5 2026']);
    const [input, setInput] = useState('');

    const executeCommand = () => {
      const responses = {
        'whoami': 'megamos@system',
        'date': new Date().toString(),
        'ls': 'Desktop Documents Downloads Music Pictures',
        'pwd': '/home/megamos',
        'help': 'Available commands: whoami, date, ls, pwd, help, clear',
        'clear': '',
      };
      const cmd = input.trim().toLowerCase();
      const output = responses[cmd] || `Command not found: ${cmd}`;
      if (cmd !== 'clear') {
        setCommands([...commands, `$ ${input}\n${output}`]);
      } else {
        setCommands([]);
      }
      setInput('');
    };

    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', color: '#6bcf7f' }}>⌘ Terminal</h2>
        <div style={{ flex: 1, overflowY: 'auto', marginBottom: '12px', background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '13px', lineHeight: '1.6' }}>
          {commands.map((cmd, i) => (
            <pre key={i} style={{ color: '#6bcf7f', margin: '0 0 8px 0', whiteSpace: 'pre-wrap' }}>{cmd}</pre>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span style={{ color: '#6bcf7f', fontFamily: 'monospace', fontWeight: 'bold' }}>$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && executeCommand()}
            style={{
              flex: 1,
              background: 'transparent',
              color: '#6bcf7f',
              border: 'none',
              outline: 'none',
              fontFamily: 'monospace',
              fontSize: '13px',
            }}
            autoFocus
          />
        </div>
      </div>
    );
  }

  if (appId === 'browser') {
    const [url, setUrl] = useState('https://megamos.local');
    const [history, setHistory] = useState(['https://megamos.local', 'https://docs.megamos.local']);

    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <button style={{ padding: '8px 12px', background: 'rgba(255,149,0,0.2)', border: '1px solid rgba(255,149,0,0.4)', color: '#ff9500', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>← Back</button>
          <button style={{ padding: '8px 12px', background: 'rgba(255,149,0,0.2)', border: '1px solid rgba(255,149,0,0.4)', color: '#ff9500', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>→ Forward</button>
          <button style={{ padding: '8px 12px', background: 'rgba(255,149,0,0.2)', border: '1px solid rgba(255,149,0,0.4)', color: '#ff9500', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>🔄 Reload</button>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && setHistory([...history, url])}
            style={{
              flex: 1,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'white',
              padding: '8px 12px',
              borderRadius: '6px',
              outline: 'none',
              fontSize: '12px',
            }}
          />
          <button style={{ padding: '8px 12px', background: 'rgba(255,149,0,0.2)', border: '1px solid rgba(255,149,0,0.4)', color: '#ff9500', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>⭐ Bookmark</button>
        </div>

        <div style={{ flex: 1, background: 'rgba(255,255,255,0.02)', borderRadius: '8px', padding: '20px', overflowY: 'auto' }}>
          <h2 style={{ color: '#ff9500', marginBottom: '12px' }}>🌐 MegamOS Browser</h2>
          <p>Current URL: {url}</p>
          <p>Visit websites with advanced features like bookmarks, history, and reader mode.</p>
          <h3 style={{ color: '#ff9500', marginTop: '20px' }}>History</h3>
          {history.slice(-5).map((h, i) => (
            <div key={i} style={{ padding: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', marginBottom: '4px', cursor: 'pointer', fontSize: '12px' }}>
              🔗 {h}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (appId === 'calc') {
    const [display, setDisplay] = useState('0');
    const [prev, setPrev] = useState(null);
    const [op, setOp] = useState(null);

    const handleNum = (num) => {
      setDisplay(display === '0' ? num : display + num);
    };

    const handleOp = (operation) => {
      setPrev(parseFloat(display));
      setOp(operation);
      setDisplay('0');
    };

    const handleEqual = () => {
      if (!op || prev === null) return;
      let result = 0;
      if (op === '+') result = prev + parseFloat(display);
      else if (op === '-') result = prev - parseFloat(display);
      else if (op === '*') result = prev * parseFloat(display);
      else if (op === '/') result = prev / parseFloat(display);
      setDisplay(result.toString());
      setPrev(null);
      setOp(null);
    };

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
          {[7, 8, 9, '/'].map(btn => (
            <button key={btn} onClick={() => typeof btn === 'number' ? handleNum(btn) : handleOp(btn)} style={{ padding: '16px', background: 'rgba(52,199,89,0.2)', border: '1px solid rgba(52,199,89,0.4)', color: '#34c759', borderRadius: '6px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>{btn}</button>
          ))}
          {[4, 5, 6, '*'].map(btn => (
            <button key={btn} onClick={() => typeof btn === 'number' ? handleNum(btn) : handleOp(btn)} style={{ padding: '16px', background: 'rgba(52,199,89,0.2)', border: '1px solid rgba(52,199,89,0.4)', color: '#34c759', borderRadius: '6px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>{btn}</button>
          ))}
          {[1, 2, 3, '-'].map(btn => (
            <button key={btn} onClick={() => typeof btn === 'number' ? handleNum(btn) : handleOp(btn)} style={{ padding: '16px', background: 'rgba(52,199,89,0.2)', border: '1px solid rgba(52,199,89,0.4)', color: '#34c759', borderRadius: '6px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>{btn}</button>
          ))}
          <button onClick={() => handleNum(0)} style={{ padding: '16px', background: 'rgba(52,199,89,0.2)', border: '1px solid rgba(52,199,89,0.4)', color: '#34c759', borderRadius: '6px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>0</button>
          <button onClick={() => handleNum('.')} style={{ padding: '16px', background: 'rgba(52,199,89,0.2)', border: '1px solid rgba(52,199,89,0.4)', color: '#34c759', borderRadius: '6px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>.</button>
          <button onClick={handleEqual} style={{ padding: '16px', background: 'rgba(52,199,89,0.4)', border: '1px solid rgba(52,199,89,0.6)', color: '#34c759', borderRadius: '6px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>=</button>
          <button onClick={() => handleOp('+')} style={{ padding: '16px', background: 'rgba(52,199,89,0.2)', border: '1px solid rgba(52,199,89,0.4)', color: '#34c759', borderRadius: '6px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>+</button>
        </div>
      </div>
    );
  }

  if (appId === 'server') {
    const [services] = useState([
      { name: 'Web Server', status: 'Running', uptime: '99.9%', port: 3000 },
      { name: 'Database', status: 'Running', uptime: '99.8%', port: 5432 },
      { name: 'Cache', status: 'Running', uptime: '99.7%', port: 6379 },
      { name: 'API Gateway', status: 'Running', uptime: '99.9%', port: 8000 }
    ]);

    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ margin: 0, fontSize: '20px', color: '#5856d6' }}>🖥️ Server Monitor</h2>
          <button onClick={() => downloadFile(JSON.stringify(services), 'servers.json', 'application/json')} style={{ padding: '8px 12px', background: 'rgba(88,86,214,0.2)', border: '1px solid rgba(88,86,214,0.4)', color: '#5856d6', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>📥 Export</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {services.map((service, i) => (
            <div key={i} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, rgba(88,86,214,0.1), rgba(88,86,214,0.2))',
              border: '1px solid rgba(88,86,214,0.3)',
            }}>
              <div>
                <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{service.name}</div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>Uptime: {service.uptime} | Port: {service.port}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#34c759' }}></div>
                <span style={{ color: '#34c759' }}>{service.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (appId === 'db') {
    const [query, setQuery] = useState('SELECT * FROM users WHERE active = true;');
    const [results, setResults] = useState([
      { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Active' }
    ]);

    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <button onClick={() => downloadFile(query, 'query.sql', 'text/plain')} style={{ padding: '8px 12px', background: 'rgba(0,199,183,0.2)', border: '1px solid rgba(0,199,183,0.4)', color: '#00c7b7', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>💾 Save</button>
          <button onClick={() => downloadFile(JSON.stringify(results), 'results.json', 'application/json')} style={{ padding: '8px 12px', background: 'rgba(0,199,183,0.2)', border: '1px solid rgba(0,199,183,0.4)', color: '#00c7b7', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>📊 Export JSON</button>
          <button onClick={() => alert('Query executed: ' + results.length + ' rows returned')} style={{ padding: '8px 12px', background: 'linear-gradient(135deg, #00c7b7, #00d4ff)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>▶ Execute</button>
        </div>

        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            height: '120px',
            background: 'rgba(0,199,183,0.1)',
            border: '1px solid rgba(0,199,183,0.3)',
            color: 'white',
            padding: '12px',
            borderRadius: '8px',
            fontFamily: 'monospace',
            resize: 'none',
            outline: 'none',
            marginBottom: '16px',
          }}
        />

        <h3 style={{ marginBottom: '12px', color: '#00c7b7' }}>Results ({results.length} rows)</h3>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid rgba(0,199,183,0.5)' }}>
                <th style={{ textAlign: 'left', padding: '12px', color: '#00c7b7' }}>ID</th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#00c7b7' }}>Name</th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#00c7b7' }}>Email</th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#00c7b7' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {results.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <td style={{ padding: '12px' }}>{row.id}</td>
                  <td style={{ padding: '12px' }}>{row.name}</td>
                  <td style={{ padding: '12px' }}>{row.email}</td>
                  <td style={{ padding: '12px' }}>{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (appId === 'settings') {
    const [settings, setSettings] = useState({
      theme: 'dark',
      language: 'english',
      notifications: true,
      autoUpdate: true,
      twoFA: false
    });

    return (
      <div style={{ maxWidth: '600px' }}>
        <h2 style={{ marginBottom: '20px', fontSize: '20px', color: '#888' }}>⚙️ System Settings</h2>

        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#cbd5e1', marginBottom: '12px' }}>🎨 Display</h3>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '8px' }}>
            <input type="radio" name="theme" checked={settings.theme === 'dark'} onChange={() => setSettings({ ...settings, theme: 'dark' })} />
            <span>Dark Mode</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input type="radio" name="theme" checked={settings.theme === 'light'} onChange={() => setSettings({ ...settings, theme: 'light' })} />
            <span>Light Mode</span>
          </label>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#cbd5e1', marginBottom: '12px' }}>🌍 Language</h3>
          <select value={settings.language} onChange={(e) => setSettings({ ...settings, language: e.target.value })} style={{ padding: '8px 12px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: '4px', outline: 'none', width: '200px' }}>
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
            <option value="french">French</option>
            <option value="german">German</option>
          </select>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#cbd5e1', marginBottom: '12px' }}>🔔 Notifications</h3>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '8px' }}>
            <input type="checkbox" checked={settings.notifications} onChange={() => setSettings({ ...settings, notifications: !settings.notifications })} />
            <span>Enable Notifications</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input type="checkbox" checked={settings.autoUpdate} onChange={() => setSettings({ ...settings, autoUpdate: !settings.autoUpdate })} />
            <span>Auto-update</span>
          </label>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#cbd5e1', marginBottom: '12px' }}>🔐 Security</h3>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input type="checkbox" checked={settings.twoFA} onChange={() => setSettings({ ...settings, twoFA: !settings.twoFA })} />
            <span>Enable Two-Factor Authentication</span>
          </label>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
          <h3 style={{ color: '#cbd5e1', marginBottom: '12px' }}>ℹ️ About</h3>
          <p style={{ fontSize: '13px', color: '#94a3b8', margin: '0 0 8px 0' }}>MegamOS v2.0</p>
          <p style={{ fontSize: '13px', color: '#94a3b8', margin: '0 0 8px 0' }}>Build: 2026.02.05</p>
          <p style={{ fontSize: '13px', color: '#94a3b8' }}>All features fully functional and optimized</p>
        </div>
      </div>
    );
  }

  return <div>Unknown Application</div>;
}
