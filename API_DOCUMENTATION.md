# MegamOS API Documentation

## Base URL
```
Production: https://api.yourdomain.com/api/v1
Development: http://localhost:8000/api/v1
```

## Authentication

All authenticated endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <your_access_token>
```

### Get Access Token
```bash
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

Response:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "expires_in": 1800
}
```

## Endpoints

### Health & Status

#### Check Server Health
```
GET /health
```

Response:
```json
{
  "status": "healthy",
  "service": "MegamOS Backend",
  "timestamp": "2024-01-10T15:30:00Z"
}
```

### Authentication

#### Sign Up
```
POST /auth/signup
Content-Type: application/json

{
  "email": "newuser@example.com",
  "password": "securepassword123",
  "name": "John Doe"
}
```

Response:
```json
{
  "access_token": "...",
  "refresh_token": "...",
  "token_type": "bearer",
  "expires_in": 1800
}
```

#### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Refresh Token
```
POST /auth/refresh
Content-Type: application/json

{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Get Current User
```
GET /auth/me
Authorization: Bearer <token>
```

Response:
```json
{
  "email": "user@example.com",
  "profile_complete": true
}
```

### Users

#### Get User Profile
```
GET /users/profile
Authorization: Bearer <token>
```

Response:
```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "avatar_url": null,
  "bio": "Software developer",
  "created_at": "2024-01-01T00:00:00Z"
}
```

#### Update Profile
```
PUT /users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Smith",
  "bio": "Updated bio",
  "avatar_url": "https://example.com/avatar.jpg"
}
```

#### Get User Preferences
```
GET /users/settings/preferences
Authorization: Bearer <token>
```

Response:
```json
{
  "theme": "dark",
  "language": "en",
  "notifications": true,
  "email_marketing": false
}
```

#### Update Preferences
```
PUT /users/settings/preferences
Authorization: Bearer <token>
Content-Type: application/json

{
  "theme": "light",
  "notifications": false
}
```

### Apps

#### List Apps
```
GET /apps?category=ai
Authorization: Bearer <token>
```

Query Parameters:
- `category` (optional): Filter by category (system, ai, tools, internet, etc.)

Response:
```json
[
  {
    "id": "ai_studio",
    "name": "AI Studio",
    "description": "AI-powered development studio",
    "icon": "Workflow",
    "category": "ai",
    "version": "2.0.0",
    "installed": true,
    "enabled": true
  }
]
```

#### Get App Details
```
GET /apps/{app_id}
Authorization: Bearer <token>
```

#### Install App
```
POST /apps/{app_id}/install
Authorization: Bearer <token>
```

#### Uninstall App
```
POST /apps/{app_id}/uninstall
Authorization: Bearer <token>
```

#### Update App Config
```
PUT /apps/{app_id}/config
Authorization: Bearer <token>
Content-Type: application/json

{
  "id": "app_id",
  "config": {
    "setting1": "value1",
    "setting2": "value2"
  }
}
```

### AI Services

#### Chat with AI
```
POST /ai/chat
Authorization: Bearer <token>
Content-Type: application/json

{
  "messages": [
    {
      "role": "user",
      "content": "Hello, how are you?"
    }
  ],
  "model": "gemini-pro",
  "temperature": 0.7,
  "max_tokens": 1000
}
```

Response:
```json
{
  "response": "Hello! I'm doing great, thank you for asking!",
  "model": "gemini-pro",
  "tokens_used": 25
}
```

#### Generate Text
```
POST /ai/generate
Authorization: Bearer <token>
Content-Type: application/json

{
  "prompt": "Write a poem about nature",
  "model": "gemini-pro",
  "max_length": 500,
  "temperature": 0.7
}
```

Response:
```json
{
  "generated_text": "In forests deep...",
  "model": "gemini-pro",
  "prompt_length": 21
}
```

#### List Available Models
```
GET /ai/models
```

Response:
```json
{
  "models": [
    {
      "name": "gemini-pro",
      "display_name": "Gemini Pro",
      "description": "Most capable Gemini model",
      "version": "1.0"
    }
  ]
}
```

#### Create AI Agent
```
POST /ai/agents/create
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Support Bot",
  "model": "gemini-pro",
  "system_prompt": "You are a helpful support agent..."
}
```

Response:
```json
{
  "agent_id": "agent_abc123",
  "name": "Support Bot",
  "model": "gemini-pro",
  "status": "created"
}
```

#### List User's Agents
```
GET /ai/agents
Authorization: Bearer <token>
```

### Ads & Monetization

#### Get Ad Banners
```
GET /ads/banners
```

Response:
```json
[
  {
    "id": "ad_1",
    "title": "Premium Features",
    "image_url": "https://via.placeholder.com/728x90",
    "link_url": "https://example.com/premium",
    "position": "top",
    "category": "promotion",
    "active": true,
    "ctr": 2.5,
    "impressions": 1000,
    "clicks": 25
  }
]
```

#### Create Ad Banner
```
POST /ads/banners
Authorization: Bearer <token>
Content-Type: application/json

{
  "id": "ad_custom",
  "title": "My Product",
  "image_url": "https://example.com/ad.jpg",
  "link_url": "https://example.com",
  "position": "sidebar",
  "category": "product",
  "active": true
}
```

#### Update Ad Banner
```
PUT /ads/banners/{banner_id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "active": false
}
```

#### Track Ad Impression
```
POST /ads/track/impression/{banner_id}
```

#### Track Ad Click
```
POST /ads/track/click/{banner_id}
```

#### Get Earnings Report
```
GET /analytics/earnings?days=30
Authorization: Bearer <token>
```

Response:
```json
{
  "period_days": 30,
  "total_impressions": 50000,
  "total_clicks": 1250,
  "total_revenue": 125.50,
  "average_ctr": 2.5,
  "average_cpc": 0.10,
  "reports": [
    {
      "date": "2024-01-10",
      "impressions": 5000,
      "clicks": 125,
      "revenue": 12.50,
      "ctr": 2.5
    }
  ]
}
```

#### Get Ad Performance
```
GET /ads/performance?days=7
Authorization: Bearer <token>
```

Response:
```json
{
  "period_days": 7,
  "top_performing_ads": [
    {
      "id": "ad_1",
      "title": "Premium Features",
      "impressions": 5000,
      "clicks": 150,
      "ctr": 3.0,
      "revenue": 50.00
    }
  ],
  "top_positions": {
    "top": { "impressions": 10000, "ctr": 2.5 },
    "sidebar": { "impressions": 8000, "ctr": 2.0 }
  }
}
```

### Analytics

#### Get Analytics Dashboard
```
GET /analytics/dashboard
Authorization: Bearer <token>
```

Response:
```json
{
  "date_range": "last_30_days",
  "overview": {
    "total_users": 1250,
    "active_users": 890,
    "new_users": 145,
    "engagement_rate": 71.2,
    "retention_rate": 85.3
  },
  "sessions": {
    "total": 3450,
    "unique": 2100,
    "average_duration_minutes": 12.5,
    "bounce_rate": 28.3
  }
}
```

#### Get User Analytics
```
GET /analytics/users
Authorization: Bearer <token>
```

#### Get Performance Metrics
```
GET /analytics/performance
```

Response:
```json
{
  "page_load_time_ms": 1250,
  "first_contentful_paint_ms": 800,
  "time_to_interactive_ms": 2100,
  "core_web_vitals": {
    "largest_contentful_paint_ms": 2000,
    "cumulative_layout_shift": 0.05
  }
}
```

### Admin (Admin Only)

#### Get System Stats
```
GET /admin/system/stats
Authorization: Bearer <admin_token>
```

Response:
```json
{
  "cpu_usage": 45.2,
  "memory_usage": 62.8,
  "disk_usage": 72.5,
  "uptime_hours": 720,
  "disk_free_gb": 50.3
}
```

#### List Users
```
GET /admin/users
Authorization: Bearer <admin_token>
```

#### Update User Role
```
PUT /admin/users/{user_id}/role
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "role": "admin"
}
```

#### Get API Usage
```
GET /admin/api/usage?days=7
Authorization: Bearer <admin_token>
```

## Error Responses

All errors follow this format:

```json
{
  "detail": "Error message here"
}
```

### Common Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Rate Limited
- `500` - Server Error

## Rate Limiting

Default: 60 requests per minute per IP

Headers returned with each request:
```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 59
X-RateLimit-Reset: 1234567890
```

## Pagination

List endpoints support pagination:

```
GET /endpoint?page=1&per_page=50
```

Response:
```json
{
  "items": [...],
  "total": 1000,
  "page": 1,
  "per_page": 50,
  "pages": 20
}
```

## Webhooks (Coming Soon)

Subscribe to events:
- `user.created`
- `ad.clicked`
- `payment.completed`
- `app.installed`

## SDK Availability

- **JavaScript/TypeScript**: `npm install megamos-sdk`
- **Python**: `pip install megamos-sdk`
- **Go**: `go get github.com/megamos/sdk-go`

## Support

- API Issues: support@yourdomain.com
- GitHub Issues: https://github.com/yourusername/MegamOS/issues
- Status Page: https://status.yourdomain.com
