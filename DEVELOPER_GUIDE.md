# 🛠️ MegamOSPro Developer Guide

## Quick Reference

### **Adding New Applications**

To add a new application to MegamOSPro:

1. **Add to APPLICATIONS array** (in MegamOSPro.tsx ~line 50):
```typescript
{ 
  id: 'unique-app-id', 
  name: 'App Name', 
  icon: IconName,  // from lucide-react
  color: '#hexcolor', 
  gradient: 'from-color-600 to-color-600',
  desc: 'Short description'
}
```

2. **Create App Component** (add to bottom of MegamOSPro.tsx):
```typescript
function MyAppAdvanced({ isDarkMode }) {
  const [state, setState] = useState([]);

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Your UI here */}
    </div>
  );
}
```

3. **Add to AppContentRouter** (search for `contentMap`):
```typescript
const contentMap = {
  'my-app-id': <MyAppAdvanced isDarkMode={isDarkMode} />,
  // ... other apps
};
```

### **Common Patterns**

#### **Button with Animation**
```typescript
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  onClick={handleClick}
  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-bold transition"
>
  Click Me
</motion.button>
```

#### **Dark Mode Support**
```typescript
className={`p-4 rounded-lg ${
  isDarkMode ? 'bg-slate-700 text-white' : 'bg-gray-200 text-gray-900'
}`}
```

#### **List with Animation**
```typescript
<div className="space-y-2">
  {items.map((item, i) => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: i * 0.1 }}
      className="p-4 rounded-lg"
    >
      {item.name}
    </motion.div>
  ))}
</div>
```

#### **Export to CSV**
```typescript
const handleExportCSV = () => {
  const csv = items.map(item => 
    `${item.name},${item.value}`
  ).join('\n');
  
  const blob = new Blob(
    ['Name,Value\n' + csv], 
    { type: 'text/csv' }
  );
  
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'data.csv';
  a.click();
  URL.revokeObjectURL(url);
};
```

#### **Download File**
```typescript
const handleDownload = (content, filename) => {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};
```

#### **Copy to Clipboard**
```typescript
const handleCopy = (text) => {
  navigator.clipboard.writeText(text);
  alert('✓ Copied to clipboard!');
};
```

---

## 🎨 Color Palette

### **Gradients Used**
- Blue/Purple: `from-blue-600 to-purple-600`
- Purple/Pink: `from-purple-600 to-pink-600`
- Green/Teal: `from-green-600 to-teal-600`
- Cyan/Blue: `from-cyan-600 to-blue-600`
- Orange/Red: `from-orange-600 to-red-600`
- Yellow/Amber: `from-yellow-600 to-amber-600`

### **Dark Mode Colors**
- Background: `slate-950`, `slate-900`, `slate-800`
- Surface: `slate-700`, `slate-600`
- Text: `white`, `gray-400`, `gray-300`

### **Light Mode Colors**
- Background: `white`, `gray-50`
- Surface: `gray-100`, `gray-200`
- Text: `gray-900`, `gray-600`

---

## 🎬 Animation Patterns

### **Fade In**
```typescript
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
```

### **Scale**
```typescript
initial={{ scale: 0.8 }}
animate={{ scale: 1 }}
```

### **Slide**
```typescript
initial={{ y: 20 }}
animate={{ y: 0 }}
// or x: 20 for horizontal
```

### **Staggered List**
```typescript
transition={{ delay: i * 0.1 }}
```

### **Hover Effects**
```typescript
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
```

---

## 🧩 Reusable Components

### **Gradient Card**
```typescript
<div className="p-4 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 text-white">
  Content
</div>
```

### **Input Field**
```typescript
<input
  type="text"
  className={`px-4 py-2 rounded-lg ${
    isDarkMode ? 'bg-slate-700' : 'bg-gray-200'
  } border outline-none focus:ring-2 focus:ring-purple-500`}
/>
```

### **Select Dropdown**
```typescript
<select
  className={`px-4 py-2 rounded-lg ${
    isDarkMode ? 'bg-slate-700' : 'bg-gray-200'
  } border outline-none`}
>
  <option>Option 1</option>
</select>
```

### **Modal/Dialog**
```typescript
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center"
    >
      {/* Modal content */}
    </motion.div>
  )}
</AnimatePresence>
```

---

## 📊 State Management

### **Using useState for Simple Apps**
```typescript
const [items, setItems] = useState([]);

const handleAdd = (item) => {
  setItems([...items, item]);
};

const handleDelete = (id) => {
  setItems(items.filter(i => i.id !== id));
};
```

### **Using Zustand for Complex State** (Ready to implement)
```typescript
import create from 'zustand';

const useAppStore = create((set) => ({
  items: [],
  addItem: (item) => set(state => ({
    items: [...state.items, item]
  })),
  deleteItem: (id) => set(state => ({
    items: state.items.filter(i => i.id !== id)
  }))
}));
```

---

## 🔗 Integration Points

### **API Integration Pattern**
```typescript
const [loading, setLoading] = useState(false);
const [data, setData] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/endpoint');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  fetchData();
}, []);
```

### **OAuth Integration Pattern**
```typescript
const handleSignIn = async (provider) => {
  try {
    const response = await fetch(`/auth/${provider}`);
    const { authUrl } = await response.json();
    window.location.href = authUrl;
  } catch (error) {
    console.error('Auth error:', error);
  }
};
```

---

## 📦 Dependencies

```json
{
  "react": "^19.0.0",
  "typescript": "^5.6.3",
  "framer-motion": "^12.31.0",
  "lucide-react": "^0.555.0",
  "zustand": "^4.x.x"
}
```

### **Adding Packages**
```bash
npm install package-name
npm run dev  # Restart dev server
```

---

## 🚀 Performance Tips

1. **Use React.memo** for heavy components
2. **Lazy load** large lists with virtualization
3. **Memoize callbacks** with useCallback
4. **Debounce search** with 300ms delay
5. **Optimize re-renders** with key prop

---

## 🧪 Testing Checklist

- [ ] Dark/Light mode works in app
- [ ] Animations are smooth (60 FPS)
- [ ] Responsive on different screen sizes
- [ ] No console errors
- [ ] All buttons are clickable
- [ ] Forms validate input
- [ ] Export files work
- [ ] Copy to clipboard works
- [ ] Window dragging works
- [ ] Minimize/close buttons work

---

## 🐛 Debugging

### **Check Console**
```
F12 or Ctrl+Shift+I to open DevTools
```

### **React DevTools**
- Install React DevTools Extension
- Inspect component state
- Check props and re-renders

### **Common Issues**

**App won't render:**
- Check if component is in contentMap
- Verify component exports correctly
- Check TypeScript errors

**Styling looks wrong:**
- Verify isDarkMode prop passed
- Check Tailwind classes
- Look for conflicting CSS

**Animation stuttering:**
- Reduce number of simultaneous animations
- Use `will-change` CSS property
- Profile with DevTools

---

## 📚 Resources

- [React Documentation](https://react.dev)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Lucide Icons](https://lucide.dev)

---

## 📝 Commit Message Format

```
🚀 Feature: Add new application/feature
🐛 Fix: Fix bug in existing code
📝 Docs: Update documentation
🎨 Style: UI/styling improvements
♻️ Refactor: Code restructuring
⚡ Perf: Performance improvements
```

---

## 🎯 Next Steps

1. Add more applications using the patterns above
2. Integrate with real databases
3. Implement OAuth authentication
4. Add real-time features with WebSockets
5. Deploy to production (Vercel, Netlify)
6. Set up CI/CD pipeline
7. Add unit and integration tests

---

**Happy Coding! 🚀**
