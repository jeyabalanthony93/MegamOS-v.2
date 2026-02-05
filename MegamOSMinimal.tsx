import React, { useState, useEffect } from 'react';

export default function MegamOSMinimal() {
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
    { id: 'ai', name: 'AI Studio' },
    { id: 'docs', name: 'Documents' },
    { id: 'sheet', name: 'Spreadsheet' },
    { id: 'mail', name: 'Mail' },
    { id: 'calendar', name: 'Calendar' },
    { id: 'tasks', name: 'Tasks' },
    { id: 'notes', name: 'Notes' },
    { id: 'dashboard', name: 'Dashboard' },
    { id: 'files', name: 'Files' },
    { id: 'terminal', name: 'Terminal' },
    { id: 'browser', name: 'Browser' },
    { id: 'calc', name: 'Calculator' },
    { id: 'server', name: 'Server' },
    { id: 'db', name: 'Database' },
    { id: 'settings', name: 'Settings' },
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
        x: Math.random() * 300 + 100,
        y: Math.random() * 300 + 50,
        width: 800,
        height: 500,
        minified: false,
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

  const filteredApps = APPS.filter(a => a.name.toLowerCase().includes(search.toLowerCase()));
  const minifiedWindows = Object.values(windows).filter(w => w?.minified);
  const visibleWindows = Object.values(windows).filter(w => !w?.minified);

  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#0f172a', overflow: 'hidden', fontFamily: 'system-ui, sans-serif', color: 'white' }}>
      {/* Windows */}
      {visibleWindows.map(win => (
        <div
          key={win.id}
          style={{
            position: 'absolute',
            left: win.x,
            top: win.y,
            width: win.width,
            height: win.height,
            backgroundColor: '#1e293b',
            border: '1px solid #334155',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            zIndex: win.zIdx,
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
          }}
        >
          {/* Title Bar */}
          <div style={{
            backgroundColor: '#0f172a',
            borderBottom: '1px solid #334155',
            padding: '8px 12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            userSelect: 'none',
          }}>
            <span style={{ fontWeight: 'bold', fontSize: '14px' }}>{win.title}</span>
            <button
              onClick={() => closeWindow(win.id)}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                fontSize: '18px',
                padding: '0 4px',
              }}
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
            <AppRenderer appId={win.appId} />
          </div>
        </div>
      ))}

      {/* Taskbar */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#1e293b',
        borderTop: '1px solid #334155',
        padding: '12px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 50,
      }}>
        {/* Start Button */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setStartOpen(!startOpen)}
            style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            ★ Start
          </button>

          {startOpen && (
            <div style={{
              position: 'absolute',
              bottom: '100%',
              left: 0,
              marginBottom: '8px',
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '8px',
              padding: '12px',
              width: '384px',
              maxHeight: '400px',
              overflowY: 'auto',
              zIndex: 100,
            }}>
              <input
                type="text"
                placeholder="Search apps..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoFocus
                style={{
                  width: '100%',
                  padding: '8px',
                  marginBottom: '12px',
                  backgroundColor: '#334155',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  outline: 'none',
                  fontSize: '14px',
                }}
              />
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '8px',
              }}>
                {filteredApps.map(app => (
                  <button
                    key={app.id}
                    onClick={() => launchApp(app.id)}
                    style={{
                      backgroundColor: '#334155',
                      color: 'white',
                      border: 'none',
                      padding: '12px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#475569'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#334155'}
                  >
                    {app.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Minimized Apps */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {minifiedWindows.map(win => (
            <button
              key={win.id}
              onClick={() => setWindows(prev => ({ ...prev, [win.id]: { ...prev[win.id], minified: false } }))}
              style={{
                backgroundColor: '#334155',
                color: 'white',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px',
              }}
            >
              {win.title}
            </button>
          ))}
        </div>

        {/* Clock */}
        <div style={{ fontSize: '12px', color: '#94a3b8' }}>
          {time.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}

function AppRenderer({ appId }) {
  if (appId === 'ai') {
    return (
      <div>
        <h2 style={{ marginBottom: '12px', fontSize: '18px' }}>AI Studio</h2>
        <p style={{ color: '#cbd5e1', marginBottom: '12px' }}>Welcome to AI Studio! Ask me anything.</p>
        <input type="text" placeholder="Type your message..." style={{ width: '100%', padding: '8px', backgroundColor: '#334155', color: 'white', border: 'none', borderRadius: '4px', marginTop: '12px' }} />
      </div>
    );
  }
  if (appId === 'docs') {
    return (
      <div>
        <h2 style={{ marginBottom: '12px', fontSize: '18px' }}>Documents</h2>
        <p style={{ color: '#cbd5e1', marginBottom: '12px' }}>✓ Document 1</p>
        <p style={{ color: '#cbd5e1', marginBottom: '12px' }}>✓ Document 2</p>
        <textarea style={{ width: '100%', height: '300px', backgroundColor: '#334155', color: 'white', border: 'none', borderRadius: '4px', padding: '8px', fontFamily: 'monospace', marginTop: '12px' }} placeholder="Type here..." />
      </div>
    );
  }
  if (appId === 'sheet') {
    return (
      <div>
        <h2 style={{ marginBottom: '12px', fontSize: '18px' }}>Spreadsheet</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['A', 'B', 'C', 'D', 'E'].map(col => (
                <th key={col} style={{ border: '1px solid #334155', padding: '8px', backgroundColor: '#0f172a', textAlign: 'left' }}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map(row => (
              <tr key={row}>
                {['A', 'B', 'C', 'D', 'E'].map(col => (
                  <td key={col} style={{ border: '1px solid #334155', padding: '8px' }}>
                    <input type="text" style={{ width: '100%', backgroundColor: '#334155', color: 'white', border: 'none', padding: '4px' }} />
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
      <div>
        <h2 style={{ marginBottom: '12px', fontSize: '18px' }}>Mail</h2>
        <div style={{ backgroundColor: '#334155', padding: '12px', borderRadius: '4px', marginBottom: '12px' }}>
          <div style={{ fontWeight: 'bold' }}>From: User@email.com</div>
          <div style={{ color: '#cbd5e1', fontSize: '14px' }}>Subject: Welcome to MegamOS</div>
        </div>
        <p style={{ color: '#cbd5e1' }}>This is your welcome email to the MegamOS environment.</p>
      </div>
    );
  }
  if (appId === 'calendar') {
    return (
      <div>
        <h2 style={{ marginBottom: '12px', fontSize: '18px' }}>Calendar - February 2026</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} style={{ fontWeight: 'bold', textAlign: 'center', padding: '8px' }}>{day}</div>
          ))}
          {Array.from({ length: 28 }).map((_, i) => (
            <div key={i} style={{ backgroundColor: '#334155', padding: '8px', textAlign: 'center', borderRadius: '4px', cursor: 'pointer' }}>{i + 1}</div>
          ))}
        </div>
      </div>
    );
  }
  if (appId === 'tasks') {
    return (
      <div>
        <h2 style={{ marginBottom: '12px', fontSize: '18px' }}>Tasks</h2>
        {['Build MegamOS', 'Add Features', 'Deploy'].map((task, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', backgroundColor: '#334155', marginBottom: '8px', borderRadius: '4px' }}>
            <input type="checkbox" style={{ width: '16px', height: '16px' }} />
            <span>{task}</span>
          </div>
        ))}
      </div>
    );
  }
  if (appId === 'notes') {
    return (
      <div>
        <h2 style={{ marginBottom: '12px', fontSize: '18px' }}>Notes</h2>
        <textarea style={{ width: '100%', height: '350px', backgroundColor: '#334155', color: 'white', border: 'none', borderRadius: '4px', padding: '8px', fontFamily: 'monospace' }} placeholder="Write your notes here..." />
      </div>
    );
  }
  if (appId === 'dashboard') {
    return (
      <div>
        <h2 style={{ marginBottom: '12px', fontSize: '18px' }}>Dashboard</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
          {[{ label: 'CPU', value: '45%' }, { label: 'Memory', value: '62%' }, { label: 'Disk', value: '71%' }, { label: 'Network', value: '2.1 GB' }].map((kpi, i) => (
            <div key={i} style={{ backgroundColor: '#334155', padding: '16px', borderRadius: '4px', textAlign: 'center' }}>
              <div style={{ color: '#94a3b8', fontSize: '12px' }}>{kpi.label}</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '8px' }}>{kpi.value}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (appId === 'files') {
    return (
      <div>
        <h2 style={{ marginBottom: '12px', fontSize: '18px' }}>Files</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <th style={{ textAlign: 'left', padding: '8px', color: '#94a3b8' }}>Name</th>
              <th style={{ textAlign: 'left', padding: '8px', color: '#94a3b8' }}>Size</th>
              <th style={{ textAlign: 'left', padding: '8px', color: '#94a3b8' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {['Document.txt', 'Image.jpg', 'Archive.zip'].map((file, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #334155' }}>
                <td style={{ padding: '8px' }}>{file}</td>
                <td style={{ padding: '8px' }}>256 KB</td>
                <td style={{ padding: '8px' }}>2/5/2026</td>
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
        <h2 style={{ marginBottom: '12px', fontSize: '18px' }}>Terminal</h2>
        <div style={{ color: '#cbd5e1', marginBottom: '12px' }}>
          <div>$ whoami</div>
          <div style={{ color: '#3b82f6' }}>user@megamos</div>
          <div>$ date</div>
          <div style={{ color: '#3b82f6' }}>Wed Feb 5 08:50:00 UTC 2026</div>
          <div>$ ls</div>
          <div style={{ color: '#3b82f6' }}>Desktop Documents Downloads Pictures Music</div>
        </div>
        <input type="text" placeholder="$ " style={{ width: '100%', backgroundColor: '#334155', color: '#3b82f6', border: 'none', padding: '8px', borderRadius: '4px', fontFamily: 'monospace' }} />
      </div>
    );
  }
  if (appId === 'browser') {
    return (
      <div>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #334155' }}>
          <button style={{ backgroundColor: '#334155', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>← Back</button>
          <button style={{ backgroundColor: '#334155', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>Forward →</button>
          <input type="text" placeholder="http://example.com" style={{ flex: 1, backgroundColor: '#334155', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', outline: 'none' }} />
        </div>
        <h2 style={{ fontSize: '18px', marginBottom: '12px' }}>Welcome to MegamOS Browser</h2>
        <p style={{ color: '#cbd5e1' }}>Start browsing the internet with this simple browser.</p>
      </div>
    );
  }
  if (appId === 'calc') {
    return (
      <div>
        <h2 style={{ marginBottom: '12px', fontSize: '18px' }}>Calculator</h2>
        <input type="text" value="0" readOnly style={{ width: '100%', padding: '12px', backgroundColor: '#334155', color: 'white', border: 'none', borderRadius: '4px', marginBottom: '12px', fontSize: '24px', textAlign: 'right' }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
          {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+'].map(btn => (
            <button key={btn} style={{ padding: '12px', backgroundColor: '#334155', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>{btn}</button>
          ))}
        </div>
      </div>
    );
  }
  if (appId === 'server') {
    return (
      <div>
        <h2 style={{ marginBottom: '12px', fontSize: '18px' }}>Server Status</h2>
        {['Web Server', 'Database', 'Cache', 'API'].map((service, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', backgroundColor: '#334155', marginBottom: '8px', borderRadius: '4px' }}>
            <span>{service}</span>
            <span style={{ color: '#10b981' }}>● Running</span>
          </div>
        ))}
      </div>
    );
  }
  if (appId === 'db') {
    return (
      <div>
        <h2 style={{ marginBottom: '12px', fontSize: '18px' }}>Database</h2>
        <textarea style={{ width: '100%', height: '300px', backgroundColor: '#334155', color: 'white', border: 'none', borderRadius: '4px', padding: '8px', fontFamily: 'monospace' }} defaultValue="SELECT * FROM users WHERE active = true;" />
        <button style={{ marginTop: '12px', padding: '8px 16px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Execute Query</button>
      </div>
    );
  }
  if (appId === 'settings') {
    return (
      <div>
        <h2 style={{ marginBottom: '12px', fontSize: '18px' }}>Settings</h2>
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#cbd5e1', marginBottom: '8px' }}>System Information</h3>
          <p style={{ color: '#94a3b8', fontSize: '13px' }}>OS: MegamOS v2.0</p>
          <p style={{ color: '#94a3b8', fontSize: '13px' }}>Version: 2026.02.05</p>
          <p style={{ color: '#94a3b8', fontSize: '13px' }}>Kernel: 5.10.0</p>
        </div>
        <div style={{ borderTop: '1px solid #334155', paddingTop: '20px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input type="checkbox" defaultChecked style={{ width: '16px', height: '16px' }} />
            <span>Dark Mode</span>
          </label>
        </div>
      </div>
    );
  }

  return <div>App not found: {appId}</div>;
}
