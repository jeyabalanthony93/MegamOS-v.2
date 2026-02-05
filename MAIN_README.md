# MegamOS v2.0 - Production-Ready AI OS

[![Docker Ready](https://img.shields.io/badge/Docker-Ready-blue)](./docker-compose.yml)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110+-green)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-19.2+-blue)](https://react.dev)
[![Python](https://img.shields.io/badge/Python-3.11+-yellow)](https://python.org)
[![Gemini AI](https://img.shields.io/badge/Gemini%20AI-Integrated-purple)](https://ai.google.dev)
[![License](https://img.shields.io/badge/License-Open%20Source-green)](#license)

## 🎉 What's New in v2.0

A complete transformation from a React-only prototype to a **production-ready, monetizable web OS** with:

✨ **Python FastAPI Backend** - High-performance, scalable API  
🤖 **AI Integration** - Google Gemini for intelligent features  
💰 **Monetization System** - Ad banners, analytics, earnings tracking  
🔒 **Enterprise Security** - JWT auth, rate limiting, encryption  
🚀 **Docker Deployment** - One-command setup with Docker Compose  
📈 **SEO Optimized** - Ready for organic traffic and rankings  
📊 **Analytics Dashboard** - Track users, revenue, performance  
🌐 **Open APIs** - RESTful endpoints for integration  

## 🚀 Quick Start (5 Minutes)

### Prerequisites
- Docker & Docker Compose
- Google Gemini API Key (free)
- 4GB RAM

### Deploy
```bash
git clone <repo>
cd MegamOS-v.2

# Configure
cp backend/.env.example backend/.env
# Edit backend/.env - add your GEMINI_API_KEY

# Deploy
docker-compose up -d

# Access
# Frontend: http://localhost
# API Docs: http://localhost:8000/api/docs
# Admin: http://localhost:8000/api/docs
```

Done! Your OS is running. Check logs with:
```bash
docker-compose logs -f backend
```

## 📚 Documentation

- **[QUICKSTART.md](./QUICKSTART.md)** - Get running in 5 minutes
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Detailed deployment guide
- **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - Complete API reference
- **[backend/README.md](./backend/README.md)** - Backend setup guide

## 🏗️ Architecture

```
MegamOS v2.0
├── Frontend (React + Vite)
│   ├── UI Components
│   ├── Ad Manager
│   ├── SEO Optimization
│   └── Analytics Integration
│
├── Nginx (Reverse Proxy)
│   ├── Load Balancing
│   ├── GZIP Compression
│   ├── Rate Limiting
│   └── Security Headers
│
├── Python Backend (FastAPI)
│   ├── Authentication (JWT)
│   ├── User Management
│   ├── AI Services (Gemini)
│   ├── Monetization (Ads)
│   ├── Analytics
│   └── Admin Dashboard
│
└── Databases
    ├── PostgreSQL (Users, Data)
    ├── Redis (Cache, Sessions)
    └── MongoDB (Documents)
```

## 🎯 Key Features

### Authentication & Security
- JWT token-based auth with refresh capability
- Password hashing (bcrypt)
- CORS configuration
- Rate limiting (60 req/min)
- Security headers (HSTS, CSP, X-Frame-Options)
- CSRF protection

### API Endpoints
```
Auth:          POST /auth/signup, /auth/login, /auth/refresh
Users:         GET /users/profile, PUT /users/profile
Apps:          GET /apps, GET /apps/{id}, POST /apps/{id}/install
AI:            POST /ai/chat, POST /ai/generate, GET /ai/models
Ads:           GET /ads/banners, POST /ads/track/impression
Analytics:     GET /analytics/earnings, /analytics/dashboard
Admin:         GET /admin/system/stats, /admin/users, /admin/api/usage
```

### AI Features
- Chat with Gemini AI
- Text generation
- Code generation
- AI agent creation
- Streaming responses

### Monetization
- Ad banner placement (top, sidebar, bottom, floating)
- Impression & click tracking
- Revenue calculation
- Daily earnings reports
- Top performing ads analytics
- Ad placement optimization

### Analytics
- User behavior tracking
- Device/browser statistics
- Geographic distribution
- Revenue tracking
- API usage monitoring
- System performance metrics

## 💰 Monetization Example

```tsx
import { AdManager } from './components/AdManager';
import { MonetizationDashboard } from './components/MonetizationDashboard';

export default function App() {
  return (
    <>
      {/* Top banner ad */}
      <AdManager position="top" maxAds={1} />
      
      {/* Your content */}
      <YourContent />
      
      {/* Sidebar ads */}
      <AdManager position="sidebar" maxAds={2} />
      
      {/* Show earnings */}
      <MonetizationDashboard />
    </>
  );
}
```

**Typical Earnings:**
- 10k impressions/day @ $5 CPM = **$50/day**
- 100k impressions/day @ $5 CPM = **$500/day**
- 1M impressions/day @ $5 CPM = **$5,000/day**

## 🔐 Security Features

✅ JWT authentication with token refresh  
✅ Password hashing with bcrypt  
✅ CORS middleware  
✅ Rate limiting middleware  
✅ Security headers (HSTS, CSP, X-Frame-Options)  
✅ CSRF protection  
✅ Input validation (Pydantic)  
✅ Environment variable management  
✅ Database encryption support  

## 🌐 SEO Optimization

Included in frontend:
- Meta tags (title, description, keywords)
- Open Graph tags (social sharing)
- Twitter Card support
- Canonical URLs
- robots.txt (search engine rules)
- sitemap.xml (content indexing)
- Structured data (JSON-LD)
- Performance optimization (GZIP, caching)
- Mobile responsive design

## 🐳 Docker Deployment

### One-Command Deployment
```bash
docker-compose up -d
```

Services:
- **postgres:15** - Primary database
- **redis:7** - Cache & sessions
- **backend** - FastAPI server
- **frontend** - React app (Nginx)

### Check Status
```bash
docker-compose ps
docker-compose logs -f backend
```

### Stop/Reset
```bash
docker-compose down
docker volume rm megamos-v.2_postgres_data  # Reset database
```

## 🚀 Production Deployment

### AWS EC2
```bash
# 1. Launch Ubuntu 22.04 t3.large instance
# 2. SSH in
ssh -i key.pem ubuntu@your-ip

# 3. Install Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker ubuntu

# 4. Clone and deploy
git clone <repo>
cd MegamOS-v.2
docker-compose up -d

# 5. Setup SSL
docker-compose exec nginx certbot certonly --standalone -d yourdomain.com
```

### DigitalOcean App Platform
1. Connect GitHub repository
2. Select Docker as deployment method
3. Use `docker-compose.yml` as app spec
4. Set environment variables
5. Deploy!

### Self-Hosted VPS
```bash
# Install Docker
sudo apt-get install docker.io docker-compose

# Deploy
docker-compose up -d

# Setup reverse proxy (Nginx)
# Configure DNS to point to your IP
# Install SSL certificate
```

## 📊 Admin Dashboard

Access at: `http://localhost:8000/api/docs`

Features:
- System statistics (CPU, memory, disk)
- User management
- API usage monitoring
- Log viewing
- Backup management
- System configuration

## 🤖 AI Integration

### Chat with Gemini
```bash
curl -X POST http://localhost:8000/api/v1/ai/chat \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [{"role": "user", "content": "Hello!"}],
    "model": "gemini-pro"
  }'
```

### Generate Text
```bash
curl -X POST http://localhost:8000/api/v1/ai/generate \
  -H "Authorization: Bearer <token>" \
  -d '{
    "prompt": "Write a poem about nature",
    "max_length": 500
  }'
```

## 📦 Project Structure

```
MegamOS-v.2/
├── frontend/
│   ├── components/           # React components
│   ├── services/            # API client
│   ├── App.tsx              # Main app
│   └── index.html           # Entry point
│
├── backend/
│   ├── main.py              # FastAPI app
│   ├── config.py            # Configuration
│   ├── api/routes/          # API endpoints
│   ├── middleware/          # Middleware
│   ├── services/            # Business logic
│   └── requirements.txt     # Dependencies
│
├── docker-compose.yml       # Docker orchestration
├── Dockerfile.backend       # Backend container
├── Dockerfile.frontend      # Frontend container
├── nginx.conf              # Nginx config
├── DEPLOYMENT.md           # Deployment guide
├── QUICKSTART.md           # Quick start
├── API_DOCUMENTATION.md    # API docs
└── README.md              # This file
```

## 🔧 Configuration

### Environment Variables
See `backend/.env.example`:
```env
GEMINI_API_KEY=your-api-key
SECRET_KEY=random-secret
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
ALLOWED_ORIGINS=http://localhost:3000
```

### Customization
- Edit `components/AdManager.tsx` for ad placement
- Modify `backend/config.py` for API settings
- Update `nginx.conf` for server behavior
- Change `public/robots.txt` for SEO rules

## 📈 Performance

Optimizations included:
- GZIP compression (Nginx)
- Database connection pooling
- Redis caching
- JWT token caching
- API rate limiting
- Image optimization
- Code splitting (React)
- CDN-ready

**Typical Metrics:**
- Page load time: <2s
- First contentful paint: <1s
- API latency: <200ms
- Database queries: <50ms

## 🧪 Testing

### Backend Tests
```bash
cd backend
pytest tests/ -v
```

### Frontend Tests
```bash
npm test
```

## 📝 API Examples

### Sign Up
```bash
curl -X POST http://localhost:8000/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }'
```

### Get Earnings Report
```bash
curl -X GET "http://localhost:8000/api/v1/analytics/earnings?days=30" \
  -H "Authorization: Bearer <token>"
```

### Create Ad Banner
```bash
curl -X POST http://localhost:8000/api/v1/ads/banners \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Premium Features",
    "image_url": "https://example.com/ad.jpg",
    "link_url": "https://example.com/premium",
    "position": "top",
    "category": "promotion",
    "active": true
  }'
```

## 🆘 Troubleshooting

### Docker Issues
```bash
# See logs
docker-compose logs backend

# Restart service
docker-compose restart backend

# Reset everything
docker-compose down
docker system prune
docker-compose up -d
```

### Database Issues
```bash
# Check PostgreSQL
docker-compose logs postgres

# Reset database
docker volume rm megamos-v.2_postgres_data
docker-compose restart postgres
```

### Port Conflicts
```bash
# Find what's using port
lsof -i :8000

# Kill process
kill -9 <PID>
```

## 📚 Learning Resources

- **FastAPI**: https://fastapi.tiangolo.com
- **React**: https://react.dev
- **Docker**: https://docker.com
- **Gemini API**: https://ai.google.dev
- **PostgreSQL**: https://postgresql.org

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes
4. Submit pull request

## 📄 License

Open Source - Free for personal and commercial use

## 💬 Support

- **Issues**: GitHub Issues
- **Discussions**: GitHub Discussions  
- **Email**: support@yourdomain.com
- **Docs**: Check [DEPLOYMENT.md](./DEPLOYMENT.md)

## 🎯 Roadmap

### v2.1 (Next)
- [ ] User authentication improvements
- [ ] Advanced analytics
- [ ] Payment integration (Stripe)
- [ ] Email notifications

### v2.2
- [ ] Mobile app (React Native)
- [ ] Progressive Web App (PWA)
- [ ] Desktop app (Electron)
- [ ] WebRTC for live features

### v3.0
- [ ] Multi-user workspaces
- [ ] Real-time collaboration
- [ ] Custom app marketplace
- [ ] Extended AI agent capabilities

## ⭐ Star History

If you find this useful, please star the repository!

---

## 📊 Deployment Checklist

Before going live:
- [ ] Environment variables configured
- [ ] Database created and tested
- [ ] API keys set (Gemini, Stripe, SendGrid)
- [ ] SSL/TLS certificate installed
- [ ] Domain configured and pointing
- [ ] Monitoring setup (optional)
- [ ] Backup system configured
- [ ] CI/CD pipeline ready (optional)
- [ ] Security audit completed
- [ ] Performance testing done

**Deploy with confidence! 🚀**

---

Made with ❤️ for developers and creators.

**Ready to monetize your platform? Deploy MegamOS today!**
