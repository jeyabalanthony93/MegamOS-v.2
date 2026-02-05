# MegamOS Backend

Production-ready Python API server for MegamOS OS.

## 🏗️ Structure

```
backend/
├── main.py                 # FastAPI application
├── config.py              # Configuration management
├── requirements.txt       # Python dependencies
├── .env.example          # Environment template
├── api/
│   └── routes/
│       ├── auth.py       # Authentication endpoints
│       ├── users.py      # User management
│       ├── apps.py       # App catalog
│       ├── ai.py         # AI/Gemini integration
│       ├── monetization.py  # Ads & earnings
│       ├── analytics.py   # User analytics
│       ├── admin.py       # Admin endpoints
│       └── health.py      # Health checks
├── middleware/
│   ├── rate_limit.py     # Rate limiting
│   └── security.py       # Security headers & CSRF
├── services/
│   ├── ai_service.py     # AI service wrapper
│   └── monetization_service.py  # Ad management
└── utils/
    ├── security.py       # Password hashing, tokens
    └── logger.py         # Logging setup
```

## 🚀 Setup

### 1. Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 2. Configure Environment
```bash
cp .env.example .env
# Edit .env with your API keys and database URL
```

### 3. Run Development Server
```bash
python main.py
# Or with auto-reload:
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 4. View API Docs
Open: http://localhost:8000/api/docs

## 🔑 Key Features

### Authentication
- JWT-based access tokens
- Refresh token support
- Password hashing with bcrypt
- Session management

### API Routes
- `/auth` - User authentication
- `/users` - User profiles & settings
- `/apps` - Application management
- `/ai` - AI chat, generation, agents
- `/ads` - Ad banners & tracking
- `/analytics` - User & revenue analytics
- `/admin` - System administration

### Security
- CORS middleware
- Rate limiting (60 req/min default)
- Security headers (HSTS, CSP, etc.)
- CSRF protection
- Input validation with Pydantic

### Database
- PostgreSQL for structured data
- Redis for caching & sessions
- MongoDB for flexible documents (optional)

### AI Integration
- Google Gemini API support
- Text generation
- Chat with streaming
- AI agent creation & management

### Monetization
- Ad banner management
- Impression & click tracking
- Revenue calculation
- Analytics dashboard

## 📝 Environment Variables

```env
# Server
DEBUG=False
ENVIRONMENT=production
APP_NAME=MegamOS
APP_VERSION=2.0.0

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/megamos_db
MONGODB_URL=mongodb://localhost:27017/megamos

# Redis
REDIS_URL=redis://localhost:6379/0

# AI Services
GEMINI_API_KEY=your-key-here

# Auth
SECRET_KEY=change-this-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# CORS
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000

# Rate Limiting
RATE_LIMIT_PER_MINUTE=60

# Monetization
STRIPE_SECRET_KEY=sk_live_xxx
```

## 🔧 Common Commands

### Start Dev Server
```bash
uvicorn main:app --reload
```

### Start Production Server
```bash
gunicorn main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

### Run with Docker
```bash
docker build -f ../Dockerfile.backend -t megamos-backend .
docker run -p 8000:8000 megamos-backend
```

### Database Migrations (with Alembic)
```bash
alembic upgrade head
alembic revision --autogenerate -m "Description"
alembic downgrade -1
```

### Run Tests
```bash
pytest tests/ -v
```

### Lint Code
```bash
flake8 .
black .
mypy .
```

## 🔐 Security Best Practices

✅ **Done in Template:**
- Environment variables for sensitive data
- Password hashing with bcrypt
- JWT token validation
- CORS configuration
- Rate limiting
- Security headers

⚠️ **Still Need To Do:**
- [ ] Add HTTPS/SSL
- [ ] Implement database encryption
- [ ] Set up WAF
- [ ] Add request signing
- [ ] Configure backup encryption
- [ ] Set up audit logging
- [ ] Implement DDoS protection

## 📊 Monitoring & Logging

### Logs
- Stored in `logs/app.log`
- Configure level in `.env` with `LOG_LEVEL`

### Metrics
- `/health` - Quick health check
- `/health/deep` - System stats
- `/admin/system/stats` - Detailed stats

### Monitoring Tools (Recommended)
- Prometheus + Grafana
- ELK Stack for logs
- Sentry for error tracking
- New Relic for APM

## 🔌 Extending the API

### Add New Endpoint
```python
# api/routes/new_feature.py
from fastapi import APIRouter

router = APIRouter()

@router.get("/new-endpoint")
async def new_endpoint():
    return {"message": "New endpoint"}
```

### Register Route
```python
# In main.py
from api.routes import new_feature

app.include_router(new_feature.router, prefix=settings.API_PREFIX)
```

### Add Database Model (SQLAlchemy)
```python
# models/user.py
from sqlalchemy import Column, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True)
    name = Column(String)
```

## 🧪 Testing

Create tests in `tests/` directory:

```python
# tests/test_auth.py
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_signup():
    response = client.post("/api/v1/auth/signup", json={
        "email": "test@example.com",
        "password": "password123",
        "name": "Test User"
    })
    assert response.status_code == 200
    assert "access_token" in response.json()
```

Run tests:
```bash
pytest
```

## 🚀 Deployment

### Docker
```bash
docker-compose up -d backend
```

### Manual on VPS
```bash
# Install Python 3.11
sudo apt-get install python3.11 python3.11-venv

# Create virtual env
python3.11 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run with Gunicorn
gunicorn main:app --workers 4 --bind 0.0.0.0:8000
```

### With Supervisor (Process Manager)
```ini
[program:megamos]
directory=/app
command=/app/venv/bin/gunicorn main:app --bind 0.0.0.0:8000
autostart=true
autorestart=true
```

## 📚 Dependencies

Main packages:
- **FastAPI** - Web framework
- **Uvicorn** - ASGI server
- **SQLAlchemy** - ORM
- **Pydantic** - Data validation
- **google-generativeai** - Gemini API
- **PyJWT** - JWT tokens
- **passlib** - Password hashing
- **redis** - Caching
- **python-jose** - JWT handling

## 🐛 Troubleshooting

### Database Connection Error
```python
# Check DATABASE_URL format
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
```

### Import Errors
```bash
# Make sure you're in correct directory
cd backend
# Use virtual environment
source venv/bin/activate
```

### API Not Responding
```bash
# Check if all dependencies installed
pip install -r requirements.txt

# Check if database is running
# Check if Redis is running
```

## 📖 Additional Resources

- FastAPI Docs: https://fastapi.tiangolo.com
- SQLAlchemy Docs: https://docs.sqlalchemy.org
- Gemini API: https://ai.google.dev
- Pydantic: https://docs.pydantic.dev

## 📄 License

Open Source

## 💬 Support

- Issues: GitHub Issues
- Email: support@yourdomain.com
