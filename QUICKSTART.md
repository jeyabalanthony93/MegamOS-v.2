# MegamOS v2.0 Quick Start Guide

## 🎯 Get Running in 5 Minutes

### Prerequisites
- Docker & Docker Compose installed
- Google Gemini API Key
- 4GB RAM available

### Step 1: Clone & Configure (1 min)
```bash
cd MegamOS-v.2
cp backend/.env.example backend/.env

# Edit backend/.env with your API keys
# Required: GEMINI_API_KEY
# Recommended: Change SECRET_KEY to something random
```

### Step 2: Build & Deploy (3 min)
```bash
docker-compose up -d
```

### Step 3: Verify (1 min)
```bash
# Check containers are running
docker-compose ps

# Test API
curl http://localhost:8000/health

# Open in browser
# Frontend: http://localhost
# API Docs: http://localhost:8000/api/docs
```

## 🔑 Get API Keys

### Google Gemini API
1. Go to [ai.google.dev](https://ai.google.dev)
2. Click "Get API Key"
3. Create new project or select existing
4. Copy API key
5. Paste in `backend/.env` as `GEMINI_API_KEY`

### Optional: Stripe (Payments)
1. Go to [stripe.com](https://stripe.com)
2. Create account
3. Get keys from Dashboard
4. Add to `.env`: `STRIPE_SECRET_KEY` and `STRIPE_PUBLISHABLE_KEY`

## 📱 First Time Usage

### Login
1. Open http://localhost
2. Sign up or login with email
3. Start using the OS

### Enable Monetization
1. Go to Settings → Monetization
2. Enable ad banners
3. Add your first ad banner
4. Monitor earnings in dashboard

### Deploy AI Assistant
1. Go to AI Studio
2. Create new agent
3. Configure system prompt
4. Deploy and start chatting

## 🚀 Deployment

### To Production (AWS EC2)
```bash
# 1. SSH into your EC2 instance
ssh -i key.pem ubuntu@your-ip

# 2. Install Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker ubuntu

# 3. Clone repo and deploy
git clone <repo>
cd MegamOS-v.2
docker-compose up -d
```

### Domain Setup
1. Point domain DNS to your server IP
2. Update `ALLOWED_ORIGINS` in `.env`
3. Run SSL setup:
```bash
docker-compose exec nginx certbot certonly --standalone \
  -d yourdomain.com
```

## 🛠️ Common Tasks

### View Logs
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Restart Services
```bash
docker-compose restart backend
docker-compose restart frontend
```

### Stop Everything
```bash
docker-compose down
```

### Reset Database
```bash
docker-compose down
docker volume rm megamos-v.2_postgres_data
docker-compose up -d
```

### Update Code
```bash
git pull
docker-compose build --no-cache
docker-compose up -d
```

## 💡 Next Steps

1. ✅ Deployment working
2. → Configure monetization ads
3. → Set up admin dashboard
4. → Customize branding
5. → Enable SSL/HTTPS
6. → Configure domain
7. → Set up analytics
8. → Monitor earnings

## 📊 Admin Dashboard

Access admin features:
- http://localhost:8000/api/docs (API documentation)
- System stats and monitoring
- User management
- Ad performance

## 🔒 Security Checklist

- [ ] Changed `SECRET_KEY` in `.env`
- [ ] Set `DEBUG=False` in `.env`
- [ ] Configured strong database password
- [ ] Enabled HTTPS/SSL
- [ ] Updated `ALLOWED_ORIGINS`
- [ ] Set up firewalls
- [ ] Enable 2FA for admin accounts
- [ ] Regular backups configured

## 💰 Monetization Tips

### Maximize Revenue
1. **Place ads strategically**
   - Top: Best CTR (click-through rate)
   - Sidebar: High visibility
   - Bottom: Lower CTR

2. **Optimize ad content**
   - Use relevant product images
   - Clear, compelling headlines
   - Strong call-to-action

3. **Monitor performance**
   - Check daily earnings
   - A/B test ad designs
   - Remove underperforming ads

4. **Scale slowly**
   - Start with 2-3 banners
   - Add more as traffic grows
   - Avoid ad fatigue

### Typical CPM Rates
- Tech/Dev: $5-15 CPM
- General: $2-8 CPM
- Low: $0.5-2 CPM

*Example: 10k impressions @ $5 CPM = $50/day*

## 📚 Documentation

- **Full Docs**: Read [DEPLOYMENT.md](./DEPLOYMENT.md)
- **API Docs**: Read [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- **Backend Setup**: See [backend/README.md](./backend/README.md)

## ❓ Troubleshooting

### API not responding
```bash
docker-compose logs backend
docker-compose restart backend
```

### Frontend not loading
```bash
docker-compose logs frontend
docker-compose restart frontend
```

### Database errors
```bash
docker-compose logs postgres
# If corrupted, reset: docker volume rm megamos-v.2_postgres_data
```

### Port conflicts
```bash
# Find what's using port 8000
lsof -i :8000
# Kill process: kill -9 <PID>
```

## 🎉 You're Ready!

Your AI-powered OS is now running. Start monetizing and scale to millions!

Questions? Check the docs or open an issue on GitHub.

**Happy hosting!** 🚀
