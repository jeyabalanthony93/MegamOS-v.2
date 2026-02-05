# MegamOS v2.0 - Production-Ready Deployment Guide

## 🚀 Overview

MegamOS v2.0 is a modern, AI-powered operating system that runs in your browser with:

- **Python FastAPI Backend** - Scalable, high-performance API server
- **React Frontend** - Modern, responsive UI with monetization features
- **AI Integration** - Google Gemini AI for intelligent features
- **Monetization System** - Ad management, analytics, and earnings tracking
- **SEO Optimized** - Ready for search engines and organic traffic
- **Docker Deployment** - One-command deployment with Docker Compose
- **Enterprise Security** - JWT auth, CORS, rate limiting, encrypted data

## 📋 Prerequisites

- Docker & Docker Compose (or Python 3.11+ & Node.js 20+)
- 4GB+ RAM
- 10GB+ disk space
- API Keys:
  - Google Gemini API Key (for AI features)
  - Optional: Stripe (for paid tiers), SendGrid (for emails)

## 🎯 Quick Start (Docker - Recommended)

### 1. Clone & Setup

```bash
cd MegamOS-v.2
cp backend/.env.example backend/.env
```

### 2. Configure Environment

Edit `backend/.env`:

```env
GEMINI_API_KEY=your-gemini-api-key
SECRET_KEY=change-this-to-a-random-string
ENVIRONMENT=production
DATABASE_URL=postgresql://megamos:megamos_secure_password@postgres:5432/megamos_db
```

### 3. Deploy

```bash
docker-compose up -d
```

The system will be available at:
- Frontend: http://localhost (or https://yourdomain.com)
- API: http://localhost:8000
- API Docs: http://localhost:8000/api/docs

### 4. Verify Deployment

```bash
# Check all services
docker-compose ps

# View logs
docker-compose logs -f backend
```

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React)                      │
│         Vite + TypeScript + Tailwind CSS                │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│                   Nginx (Reverse Proxy)                  │
│    Handles routing, compression, security headers        │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│              Python FastAPI Backend                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  Auth API    │  │  AI Service  │  │  Monetization│  │
│  ├──────────────┤  ├──────────────┤  ├──────────────┤  │
│  │  Users API   │  │  Gemini API  │  │  Analytics   │  │
│  ├──────────────┤  ├──────────────┤  ├──────────────┤  │
│  │  Apps API    │  │  Agents      │  │  Ad Manager  │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└────────────────────┬────────────────────────────────────┘
                     │
    ┌────────────────┼────────────────┬─────────────────┐
    │                │                │                 │
    ▼                ▼                ▼                 ▼
┌─────────┐   ┌─────────────┐   ┌──────────┐   ┌────────────┐
│PostgreSQL  │   │Redis Cache  │   │MongoDB   │   │File Storage│
│ (Users,    │   │(Sessions,   │   │(Documents)   │(Uploads)   │
│Data)       │   │Cache)       │   │          │   │            │
└─────────┘   └─────────────┘   └──────────┘   └────────────┘
```

## 🔒 Security Features

✅ **Authentication**
- JWT tokens with refresh capability
- Password hashing with bcrypt
- Session management

✅ **API Security**
- CORS configuration
- Rate limiting (60 req/min default)
- CSRF protection
- Security headers (HSTS, X-Frame-Options, CSP)

✅ **Data Protection**
- TLS/SSL encryption
- Secure environment variables
- No secrets in code

✅ **Access Control**
- Role-based authorization
- Admin verification
- Token-based API access

## 💰 Monetization System

### Ad Management
```python
# Place ads at different positions
- top: Banner at page top (728x90)
- sidebar: Sidebar ad (300x250)
- bottom: Footer ad (970x90)
- floating: Floating modal (600x500)
```

### Earnings Tracking
- Track impressions and clicks
- Calculate CTR (Click-Through Rate)
- Monitor revenue per banner
- Daily/weekly/monthly reports

### Integration Example
```tsx
import { AdManager } from './components/AdManager';

function App() {
  return (
    <>
      <AdManager position="top" maxAds={1} />
      <YourContent />
      <AdManager position="sidebar" maxAds={2} />
    </>
  );
}
```

## 🤖 AI Features

### Chat with Gemini
```python
POST /api/v1/ai/chat
{
  "messages": [
    {"role": "user", "content": "Hello!"}
  ],
  "model": "gemini-pro",
  "temperature": 0.7
}
```

### Text Generation
```python
POST /api/v1/ai/generate
{
  "prompt": "Write a poem about...",
  "max_length": 500
}
```

### Create AI Agents
```python
POST /api/v1/ai/agents/create
{
  "name": "Customer Support Bot",
  "system_prompt": "You are a helpful customer support agent...",
  "tools": [...]
}
```

## 📊 Analytics & Reporting

### User Analytics
- Track user behavior
- Device/browser statistics
- Geographic distribution
- Session analysis

### Ad Performance
```python
GET /api/v1/analytics/earnings?days=30
GET /api/v1/ads/performance?days=7
```

### Monetization Dashboard
- Real-time earnings
- Top performing ads
- Position performance
- Revenue trends

## 🔧 API Endpoints

### Authentication
```
POST   /api/v1/auth/signup        - Create account
POST   /api/v1/auth/login         - Login
POST   /api/v1/auth/refresh       - Refresh token
GET    /api/v1/auth/me            - Current user
```

### Apps
```
GET    /api/v1/apps               - List apps
GET    /api/v1/apps/{app_id}      - Get app details
POST   /api/v1/apps/{app_id}/install    - Install app
```

### AI Services
```
POST   /api/v1/ai/chat            - Chat with AI
POST   /api/v1/ai/generate        - Generate text
GET    /api/v1/ai/models          - List models
```

### Monetization
```
GET    /api/v1/ads/banners        - List ad banners
POST   /api/v1/ads/banners        - Create banner
GET    /api/v1/analytics/earnings - Earnings report
```

### Admin
```
GET    /api/v1/admin/system/stats - System statistics
GET    /api/v1/admin/users        - List users
GET    /api/v1/admin/api/usage    - API usage stats
```

## 🌐 SEO Optimization

### Included Features
- ✅ Meta tags (title, description, keywords)
- ✅ Open Graph tags (social sharing)
- ✅ Twitter Card support
- ✅ Canonical URLs
- ✅ robots.txt (search engine rules)
- ✅ sitemap.xml (content indexing)
- ✅ Structured data (Schema.org JSON-LD)
- ✅ Performance optimization (GZIP, caching)
- ✅ Mobile responsive design
- ✅ Fast page load times

### Implementation
```tsx
import SEOHead from './components/SEOHead';

export function HomePage() {
  return (
    <>
      <SEOHead
        title="MegamOS - AI-Powered Operating System"
        description="Experience a revolutionary browser-based OS with AI features"
        keywords={['AI', 'OS', 'Browser', 'Open Source']}
        type="website"
      />
      {/* Your content */}
    </>
  );
}
```

## 📈 Deployment to Production

### Option 1: AWS EC2 (Recommended)
```bash
# 1. Create EC2 instance (Ubuntu 22.04, t3.large)
# 2. Install Docker
sudo apt-get update
sudo apt-get install -y docker.io docker-compose

# 3. Clone repo and deploy
git clone <repo>
cd MegamOS-v.2
docker-compose -f docker-compose.yml up -d
```

### Option 2: DigitalOcean App Platform
```bash
# 1. Push code to GitHub
# 2. Connect repo to DigitalOcean
# 3. Use docker-compose.yml as app definition
# 4. Set environment variables
# 5. Deploy!
```

### Option 3: Heroku
```bash
heroku login
heroku create megamos-app
heroku config:set GEMINI_API_KEY=<key>
git push heroku main
```

### Option 4: Self-Hosted (VPS)
```bash
# On your VPS
ssh root@your-vps-ip
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
git clone <repo>
cd MegamOS-v.2
docker-compose up -d
```

## 🔐 SSL/TLS Setup

### Using Let's Encrypt (Free)
```bash
docker-compose exec nginx certbot certonly --standalone \
  -d yourdomain.com -d www.yourdomain.com
```

### Using CloudFlare
1. Add A record pointing to your server
2. Enable SSL in CloudFlare (Flexible/Full)
3. Update nginx.conf with your domain

## 📝 Environment Variables

```env
# Database
DATABASE_URL=postgresql://user:pass@host/db
MONGODB_URL=mongodb://user:pass@host/db

# Redis
REDIS_URL=redis://host:6379

# AI
GEMINI_API_KEY=your-key

# Security
SECRET_KEY=random-secret-key
ALGORITHM=HS256

# CORS
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# Monetization
STRIPE_SECRET_KEY=sk_live_xxx
SENDGRID_API_KEY=SG_xxx
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
docker ps
docker kill <container_id>
```

### Database Connection Error
```bash
docker-compose logs postgres
docker-compose restart postgres
```

### Out of Memory
```bash
docker-compose down
docker system prune
docker-compose up -d
```

### API Not Responding
```bash
docker-compose logs backend
docker-compose restart backend
```

## 📚 Additional Resources

- **API Documentation**: http://localhost:8000/api/docs
- **React Documentation**: https://react.dev
- **FastAPI Docs**: https://fastapi.tiangolo.com
- **Gemini API**: https://ai.google.dev
- **Docker Docs**: https://docs.docker.com

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

Open Source - Use freely for personal and commercial projects

## 💬 Support

- Issues: GitHub Issues
- Discussions: GitHub Discussions
- Email: support@yourdomain.com

---

**Deployment Checklist:**
- [ ] Environment variables configured
- [ ] Database created and migrated
- [ ] API keys (Gemini, Stripe, SendGrid) set
- [ ] SSL certificate installed
- [ ] Domain configured
- [ ] Monitoring setup (optional)
- [ ] Backups configured (optional)
- [ ] CI/CD pipeline (optional)

**Happy Hosting! 🎉**
