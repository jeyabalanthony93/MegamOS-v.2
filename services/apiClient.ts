import React, { useState, useEffect } from 'react';
import { Loader } from 'lucide-react';

interface APIClientConfig {
  baseURL?: string;
  timeout?: number;
}

export class APIClient {
  private baseURL: string;
  private timeout: number;

  constructor(config: APIClientConfig = {}) {
    this.baseURL = config.baseURL || '/api/v1';
    this.timeout = config.timeout || 30000;
  }

  private getAuthToken(): string | null {
    return localStorage.getItem('access_token');
  }

  private async request(
    method: string,
    endpoint: string,
    data?: any,
    options: any = {}
  ) {
    const url = `${this.baseURL}${endpoint}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const token = this.getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, {
        method,
        headers,
        body: data ? JSON.stringify(data) : undefined,
        signal: AbortSignal.timeout(this.timeout),
      });

      if (response.status === 401) {
        // Token expired, try to refresh
        const refreshed = await this.refreshToken();
        if (refreshed) {
          return this.request(method, endpoint, data, options);
        } else {
          // Redirect to login
          window.location.href = '/login';
          throw new Error('Unauthorized');
        }
      }

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API Error [${method} ${endpoint}]:`, error);
      throw error;
    }
  }

  private async refreshToken(): Promise<boolean> {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) return false;

    try {
      const response = await fetch(`${this.baseURL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('access_token', data.access_token);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Token refresh failed:', error);
      return false;
    }
  }

  async get(endpoint: string, options?: any) {
    return this.request('GET', endpoint, undefined, options);
  }

  async post(endpoint: string, data?: any, options?: any) {
    return this.request('POST', endpoint, data, options);
  }

  async put(endpoint: string, data?: any, options?: any) {
    return this.request('PUT', endpoint, data, options);
  }

  async delete(endpoint: string, options?: any) {
    return this.request('DELETE', endpoint, undefined, options);
  }

  // Auth endpoints
  async signup(email: string, password: string, name: string) {
    const response = await this.post('/auth/signup', { email, password, name });
    localStorage.setItem('access_token', response.access_token);
    localStorage.setItem('refresh_token', response.refresh_token);
    return response;
  }

  async login(email: string, password: string) {
    const response = await this.post('/auth/login', { email, password });
    localStorage.setItem('access_token', response.access_token);
    localStorage.setItem('refresh_token', response.refresh_token);
    return response;
  }

  async logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    await this.post('/auth/logout');
  }

  // User endpoints
  async getProfile() {
    return this.get('/users/profile');
  }

  async updateProfile(data: any) {
    return this.put('/users/profile', data);
  }

  // Apps endpoints
  async listApps(category?: string) {
    const url = category ? `/apps?category=${category}` : '/apps';
    return this.get(url);
  }

  async getApp(appId: string) {
    return this.get(`/apps/${appId}`);
  }

  async installApp(appId: string) {
    return this.post(`/apps/${appId}/install`);
  }

  // AI endpoints
  async chatWithAI(messages: any[], model = 'gemini-pro') {
    return this.post('/ai/chat', { messages, model });
  }

  async generateText(prompt: string, maxLength = 500) {
    return this.post('/ai/generate', { prompt, max_length: maxLength });
  }

  async createAgent(name: string, systemPrompt: string) {
    return this.post('/ai/agents/create', {
      name,
      system_prompt: systemPrompt,
    });
  }

  // Ads endpoints
  async getAdBanners() {
    return this.get('/ads/banners');
  }

  async trackAdImpression(bannerId: string) {
    return this.post(`/ads/track/impression/${bannerId}`);
  }

  async trackAdClick(bannerId: string) {
    return this.post(`/ads/track/click/${bannerId}`);
  }

  // Analytics endpoints
  async getEarnings(days = 30) {
    return this.get(`/analytics/earnings?days=${days}`);
  }

  async getAnalyticsDashboard() {
    return this.get('/analytics/dashboard');
  }

  async getAdPerformance(days = 7) {
    return this.get(`/ads/performance?days=${days}`);
  }

  // Admin endpoints
  async getSystemStats() {
    return this.get('/admin/system/stats');
  }

  async listUsers() {
    return this.get('/admin/users');
  }

  async getAPIUsage(days = 7) {
    return this.get(`/admin/api/usage?days=${days}`);
  }
}

// Create global API client instance
export const apiClient = new APIClient();

// Hook for using API
export function useAPI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const call = async (fn: () => Promise<any>) => {
    setLoading(true);
    setError(null);
    try {
      return await fn();
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { call, loading, error };
}

// Component for async data fetching
export interface UseAsyncOptions {
  skip?: boolean;
  dependencies?: any[];
}

export function useAsync(
  fn: () => Promise<any>,
  options: UseAsyncOptions = {}
) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(!options.skip);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (options.skip) return;

    setLoading(true);
    fn()
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, options.dependencies || []);

  return { data, loading, error };
}

export default APIClient;
