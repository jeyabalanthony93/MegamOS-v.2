#!/bin/bash

# MegamOS v2.0 - Automated Setup Script
# This script handles initial setup and deployment

set -e

echo "================================"
echo "MegamOS v2.0 - Setup Script"
echo "================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check prerequisites
echo -e "${YELLOW}Checking prerequisites...${NC}"

if ! command -v docker &> /dev/null; then
    echo -e "${RED}Docker is not installed. Please install Docker first.${NC}"
    echo "Visit: https://docs.docker.com/get-docker/"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}Docker Compose is not installed. Please install Docker Compose first.${NC}"
    echo "Visit: https://docs.docker.com/compose/install/"
    exit 1
fi

echo -e "${GREEN}✓ Docker and Docker Compose are installed${NC}"
echo ""

# Check for .env file
echo -e "${YELLOW}Checking environment configuration...${NC}"

if [ ! -f "backend/.env" ]; then
    echo -e "${YELLOW}Creating .env from template...${NC}"
    cp backend/.env.example backend/.env
    echo -e "${YELLOW}Please edit backend/.env and add your GEMINI_API_KEY${NC}"
    echo ""
    echo "Required variables to set:"
    echo "  - GEMINI_API_KEY: Get from https://ai.google.dev"
    echo "  - SECRET_KEY: Keep as is or change to random string"
    echo ""
    read -p "Press Enter after updating .env file: "
else
    echo -e "${GREEN}✓ .env file exists${NC}"
fi

# Verify GEMINI_API_KEY is set
if ! grep -q "GEMINI_API_KEY=" backend/.env || grep "GEMINI_API_KEY=$" backend/.env; then
    echo -e "${RED}GEMINI_API_KEY is not set in backend/.env${NC}"
    echo "Please add your API key from https://ai.google.dev"
    exit 1
fi

echo -e "${GREEN}✓ GEMINI_API_KEY is configured${NC}"
echo ""

# Check ports
echo -e "${YELLOW}Checking required ports...${NC}"

PORTS=(80 8000 5432 6379)
for PORT in "${PORTS[@]}"; do
    if lsof -i :$PORT &> /dev/null; then
        echo -e "${YELLOW}Warning: Port $PORT is in use${NC}"
    fi
done

echo ""
echo -e "${YELLOW}Building and starting services...${NC}"
echo "(This may take a few minutes on first run)"
echo ""

# Start services
docker-compose up -d

echo ""
echo -e "${GREEN}================================${NC}"
echo -e "${GREEN}✓ Setup Complete!${NC}"
echo -e "${GREEN}================================${NC}"
echo ""

# Wait for services to be ready
echo -e "${YELLOW}Waiting for services to start...${NC}"
sleep 10

# Test API
echo -e "${YELLOW}Testing API...${NC}"

if curl -s http://localhost:8000/health > /dev/null; then
    echo -e "${GREEN}✓ API is running${NC}"
else
    echo -e "${YELLOW}API might still be starting, check logs with: docker-compose logs -f backend${NC}"
fi

echo ""
echo -e "${GREEN}Access your OS:${NC}"
echo "  Frontend: ${GREEN}http://localhost${NC}"
echo "  API Docs: ${GREEN}http://localhost:8000/api/docs${NC}"
echo ""

echo -e "${GREEN}Useful commands:${NC}"
echo "  View logs:    docker-compose logs -f backend"
echo "  Stop:         docker-compose down"
echo "  Restart:      docker-compose restart"
echo "  Clean reset:  docker-compose down && docker volume rm megamos-v.2_postgres_data"
echo ""

echo -e "${GREEN}Next steps:${NC}"
echo "  1. Open http://localhost in your browser"
echo "  2. Create an account"
echo "  3. Configure ad banners in Settings"
echo "  4. Monitor earnings in Monetization Dashboard"
echo ""

echo -e "${YELLOW}For detailed information:${NC}"
echo "  - Quick Start: cat QUICKSTART.md"
echo "  - Full Docs:   cat DEPLOYMENT.md"
echo "  - API Docs:    cat API_DOCUMENTATION.md"
echo ""

echo -e "${GREEN}Happy hosting! 🚀${NC}"
