export default function TestComponent() {
  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#1a1a1a', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>✅ MEGAMOS IS WORKING!</h1>
        <p style={{ fontSize: '24px', marginBottom: '20px' }}>You are seeing this because the app is rendering correctly.</p>
        <button 
          onClick={() => alert('Button works!')}
          style={{
            padding: '15px 30px',
            fontSize: '18px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          Click Me
        </button>
        <button 
          onClick={() => window.location.reload()}
          style={{
            padding: '15px 30px',
            fontSize: '18px',
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Reload
        </button>
      </div>
    </div>
  );
}
