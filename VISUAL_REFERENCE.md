# MegamOS v2.0 - Visual Quick Reference

## 🎯 Desktop Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│                     MegamOS v2.0 Desktop                            │
│                                                                     │
│                     (Dark Slate Background)                         │
│                                                                     │
│                                                                     │
│            ┌──────────────────────────────────────┐                 │
│            │  AI Studio       │ Documents        │                 │
│            │                  │                  │                 │
│            │ ┌─────────────────────────────────┐ │                 │
│            │ │ AI Chat History...              │ │                 │
│            │ │ > Hello! How can I help?        │ │                 │
│            │ │ < Tell me about yourself       │ │                 │
│            │ │                                 │ │                 │
│            │ │ [Input: Your message...] [Send]│ │                 │
│            │ └─────────────────────────────────┘ │                 │
│            └──────────────────────────────────────┘                 │
│                                                                     │
│                                                                     │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│ [≡] [AI]  [Docs] [Sheet] │ 📡 95% | 🔋 87% │  15:34:22 Wed Feb 05 │
│ Start Menu    Minimized Apps          System Info & Clock           │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🎨 Color Coding

### Application Colors
```
AI Studio          🔴 Pink-500       #ec4899
Documents          🔵 Blue-500       #3b82f6
Spreadsheet        🟢 Green-500      #10b981
Mail               🔴 Red-500        #ef4444
Calendar           🟣 Purple-500     #a855f7
Tasks              🟠 Orange-500     #f97316
Notes              🟡 Yellow-500     #eab308
Dashboard          🟣 Indigo-500     #6366f1
Files              🟠 Amber-500      #f59e0b
Terminal           ⚫ Gray-700       #374151
Browser            🟠 Orange-600     #ea580c
Calculator         ⚫ Slate-500      #64748b
Server             🔵 Cyan-500       #06b6d4
Database           🟢 Teal-500       #14b8a6
Settings           ⚫ Gray-600       #4b5563
```

### UI Element Colors
```
Primary Button     🔵 Blue-600       #2563eb (hover: darker)
Success            🟢 Green-600      #16a34a
Warning            🟡 Yellow-500     #eab308
Error              🔴 Red-600        #dc2626
Background         ⚫ Slate-900      #0f172a
Secondary Bg       ⚫ Slate-800      #1e293b
Text Primary       ⚪ White           #ffffff
Text Secondary     ⚫ Slate-400      #94a3b8
Border             ⚫ Slate-700      #334155
```

---

## 📱 UI Component Quick Reference

### Button States
```
Default:    [Button Text]
Hover:      [Button Text] (darker background)
Active:     [Button Text] (pressed effect)
Disabled:   [Button Text] (50% opacity)
```

### Input Fields
```
Idle:       ┌──────────────────────┐
            │ Placeholder text...  │
            └──────────────────────┘

Focus:      ┌──────────────────────┐
            │ Type here... | cursor │
            └──────────────────────┘
            (Blue border highlight)
```

### Window Structure
```
┌─ [App Icon] App Name ─────────────────────────┐
│                                               │
│  [━] [□] [×]  (Minimize, Maximize, Close)   │
├───────────────────────────────────────────────┤
│                                               │
│         App Content Here                      │
│                                               │
│                                               │
└───────────────────────────────────────────────┘
```

---

## 📊 Real-Time Data Display

### Dashboard Metrics Card
```
┌─────────────────────┐
│ CPU Usage           │
│                     │
│  48% ↑              │  (Real-time, updates every 2 sec)
│ Real-time           │
└─────────────────────┘
```

### Chart Example (Dashboard)
```
  Users
    │     ▄▄▄
    │    ▄ │ ▄▄   ▄▄▄
    │   │  │ │ │ │   │
    └─┬─────┬─────┬─────┬── Days
      Mon  Tue  Wed  Thu
      
Colors: Blue (Users), Green (Revenue), Orange (Engagement)
```

### Message Example (AI Studio)
```
┌─────────────────────────────────────┐
│                                     │
│         [User Message] ▶│           │
│                    [12:34:56 PM]    │
│                                     │
│  ◀│ [Assistant Message]             │
│     [12:34:58 PM]                   │
│                                     │
│  [Loading Animation: ⚫ ⚫ ⚫]       │
│                                     │
└─────────────────────────────────────┘
```

---

## 🎮 Keyboard Shortcuts

### Window Management
```
Drag Title Bar     → Move window
Click on Window    → Bring to front
Minimize Button    → Hide to taskbar
Maximize Button    → Fullscreen mode
Close Button (×)   → Close window
```

### Text Input
```
Enter              → Submit/Send (in text areas)
Tab                → Next field
Shift+Tab          → Previous field
Ctrl+A             → Select all
Ctrl+C             → Copy
Ctrl+V             → Paste
Ctrl+Z             → Undo
```

### Application Specific
```
Calculator:
  Numbers + → × ÷  → Operations
  = (Equals)       → Calculate
  
AI Studio:
  Enter            → Send message
  
Spreadsheet:
  Tab              → Next cell
  Shift+Tab        → Previous cell
  
Tasks:
  Enter            → Add task
```

---

## 🔧 System Information

### Top Right Corner (Taskbar)
```
📡 95%      (Network connectivity)
🔋 87%      (Battery level)
15:34:22    (Current time - updates every second)
Wed Feb 05  (Current date)
```

### Bottom Left Corner (Taskbar)
```
[≡ Start]   (Open app launcher)
[AI] [Doc]  (Minimized app icons)
   ...
```

---

## 🎯 Application Window Sizes

### Default Size (on launch)
```
Width:  900px
Height: 600px
X:      50 + random(0-150)
Y:      50 + random(0-150)
```

### Maximized
```
Width:  screen.innerWidth - 40
Height: screen.innerHeight - 80
X:      0
Y:      0
```

---

## 🖱️ Mouse Interactions

### Click Events
```
App Icon        → Launch application
Taskbar Icon    → Restore minimized app
Window Button   → Minimize/Maximize/Close
Text Input      → Focus and edit
Checkbox        → Toggle state
Button          → Trigger action
Chart Area      → Show tooltip
```

### Hover Effects
```
App Icon        → Highlight / pulse effect
Button          → Background color change
Window          → Slight shadow enhancement
Task Item       → Delete button appears
```

### Drag & Drop
```
Window Title    → Drag to move
(Future)        → Files between windows
(Future)        → Reorder tasks/notes
```

---

## 📈 Chart Components

### Bar Chart (Dashboard)
```
         Legend: ■ Users  ■ Revenue  ■ Engagement
         
         │
    Y    │  ▄▄         ▄▄▄         ▄▄▄
    Axis │ ▄▄▄▄       ▄▄▄▄▄       ▄▄▄▄▄
         │▄▄▄▄▄▄▄   ▄▄▄▄▄▄▄     ▄▄▄▄▄▄▄
         └──────────────────────────────── X Axis
           Mon  Tue  Wed  Thu  Fri  Sat  Sun
```

### Tooltip (on hover)
```
      ┌─────────────────┐
      │ Users: 2400     │
      │ Revenue: 2210   │
      │ Engagement: 65% │
      └─────────────────┘
```

---

## 🎨 Responsive Grid System

### Layout Examples
```
Single Column:
┌─────────────────────────┐
│     App Full Width      │
└─────────────────────────┘

Two Columns:
┌──────────────┬──────────────┐
│     Col1     │     Col2     │
└──────────────┴──────────────┘

Four Columns:
┌─────┬─────┬─────┬─────┐
│ C1  │ C2  │ C3  │ C4  │
└─────┴─────┴─────┴─────┘
```

---

## 🎭 Animation States

### Window Drag Animation
```
Frame 1: ┌─────────┐         Frame 2: ┌─────────┐
         │ Window  │                  │ Window  │
         └─────────┘                  └─────────┘
         X: 100                       X: 150
         (Smooth linear interpolation)
```

### Loading Animation
```
Frame 1:  ⚫ ⚫ ⚫  (First dot animated)
Frame 2:  ⚫ ⚫ ⚫  (Second dot animated)
Frame 3:  ⚫ ⚫ ⚫  (Third dot animated)
          (Repeats continuously)
```

### Transition Effects
```
Hover:    Background Color → Darker
          Duration: 200-300ms
          Timing: ease-in-out

Close:    Opacity: 1 → 0
          Duration: 300ms
          Window removed from DOM
```

---

## 📐 Spacing Guidelines

### Common Values
```
XS: 4px      (8-12pt text small padding)
S:  8px      (Tight spacing)
M:  16px     (Normal spacing)
L:  24px     (Generous spacing)
XL: 32px     (Large sections)
2XL: 48px    (Major sections)
```

### Component Spacing
```
Button Padding:     Px: 4, Py: 2
Card Padding:       16px all sides
Section Padding:    24px all sides
Window Padding:     16px internal
Text Line Height:   1.5em
```

---

## 🎪 Start Menu Layout

```
┌────────────────────────┐
│ [Search] Search apps...│
├────────────────────────┤
│ ✓ AI Studio            │  Select your
│ ✓ Documents            │  applications
│ ✓ Spreadsheet          │  from this
│ ✓ Mail                 │  searchable
│ ✓ Calendar             │  list
│ ✓ Tasks                │
│ ✓ Notes                │
│ ✓ Dashboard            │
│ ✓ Files                │
│ ✓ Terminal             │
│ ✓ Browser              │
│ ✓ Calculator           │
│ ✓ Server               │
│ ✓ Database             │
│ ✓ Settings             │
│                        │
│ [Scroll for more...]   │
└────────────────────────┘
```

---

## 🔄 State Transitions

### Window Lifecycle
```
Closed
   ↓ (Launch)
Opening
   ↓ (Animated)
Open/Active
   ↓ (Click minimize)
Minimized
   ↓ (Click taskbar icon)
Open/Active
   ↓ (Click X button)
Closing
   ↓ (Animated)
Closed/Removed
```

### Task Completion
```
New Task
   ↓
Unchecked
   ↓ (Click checkbox)
Checked/Complete
   ↓
Strikethrough
```

---

## 📱 Responsive Sizes

### Common Breakpoints
```
Mobile:     < 640px    (Not fully optimized yet)
Tablet:     640-1024px (Responsive)
Desktop:    > 1024px   (Full featured)
4K:         > 2560px   (Scales well)
```

### Window Constraints
```
Min Width:   400px
Max Width:   1400px
Min Height:  300px
Max Height:  800px
Default:     900x600
```

---

## 🎯 Focus Management

### Keyboard Focus Order
```
1. Taskbar Start Button
2. Taskbar Search (if visible)
3. Windows (by z-index)
4. Interactive elements within window
5. Back to Start Button (tab wrapping)
```

### Visual Focus Indicator
```
Default:  ┌──────────┐
          │ Button   │
          └──────────┘

Focused:  ┌──────────┐
          │ Button   │ (Blue border highlight)
          └──────────┘
```

---

## 💾 Data Flow Diagram

```
┌─────────────┐
│   User      │
│ Input       │
└──────┬──────┘
       │
       ↓
┌─────────────┐
│  Component  │ ← React State Management
│ State       │
└──────┬──────┘
       │
       ↓
┌─────────────┐
│  UI Update  │ ← Re-render
│ Rendering   │
└──────┬──────┘
       │
       ↓
┌─────────────┐
│   Display   │ ← Visual Output
│ to User     │
└─────────────┘

Real-Time Loop (Every 2 sec):
State Update → Re-render → Display
```

---

## 🚀 Performance Timeline

```
T=0ms    : Page load starts
T=100ms  : HTML parsed
T=200ms  : CSS loaded (Tailwind CDN)
T=300ms  : JavaScript loaded
T=400ms  : React mounts
T=586ms  : Vite dev server ready
T=600ms  : First render complete
T=1000ms : All assets loaded
T=2000ms : First real-time update

Ongoing:
T=2000ms, 4000ms, 6000ms... : System metrics update
T=1000ms, 2000ms, 3000ms... : Clock updates
```

---

## 🎪 Full Desktop Example

```
╔══════════════════════════════════════════════════════════════╗
║                    MegamOS v2.0 Desktop                      ║
║                                                              ║
║                ┌─────────────┐                               ║
║                │  AI Studio  │  [━] [□] [×]                 ║
║                ├─────────────┤                               ║
║                │ > Hello! I  │                               ║
║                │ < How can   │                               ║
║                │ > Tell me...│                               ║
║                │  [Input...] │                               ║
║                └─────────────┘                               ║
║                                  ┌─────────────┐             ║
║                                  │ Dashboard   │             ║
║                                  ├─────────────┤             ║
║                                  │ CPU: 45%    │             ║
║                                  │ [=====]     │             ║
║                                  │ Memory: 60% │             ║
║                                  └─────────────┘             ║
║                                                              ║
║ ╔════════════════════════════════════════════════════════╗ ║
║ ║[≡][AI][📊] │ 📡95% │ 🔋87% │ 15:34:22 Wed Feb 05      ║ ║
║ ║ Start  Apps    Icons   System Info        Time          ║ ║
║ ╚════════════════════════════════════════════════════════╝ ║
╚══════════════════════════════════════════════════════════════╝
```

---

## 📚 Additional Resources

For detailed information, see:
- `ADVANCED_FEATURES.md` - Feature details
- `TESTING_GUIDE.md` - Testing procedures
- `README_ADVANCED.md` - Full documentation
- `IMPLEMENTATION_COMPLETE.md` - Status report

---

**MegamOS v2.0 Visual Reference Guide**  
Version: 2.0.1  
Last Updated: February 5, 2026
