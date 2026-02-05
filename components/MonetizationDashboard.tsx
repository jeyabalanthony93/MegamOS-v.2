import React, { useState } from 'react';
import { TrendingUp, DollarSign, Eye, Click } from 'lucide-react';

interface EarningsData {
  total_revenue: number;
  total_impressions: number;
  total_clicks: number;
  average_ctr: number;
  average_cpc: number;
}

export const MonetizationDashboard: React.FC = () => {
  const [earnings, setEarnings] = useState<EarningsData | null>(null);
  const [period, setPeriod] = useState(30);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    fetchEarnings();
  }, [period]);

  const fetchEarnings = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`/api/v1/analytics/earnings?days=${period}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setEarnings(data);
    } catch (error) {
      console.error('Failed to fetch earnings:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!earnings && !loading) return null;

  return (
    <div className="bg-gradient-to-br from-green-900 to-green-800 rounded-lg p-6 text-white">
      <h2 className="text-2xl font-bold mb-6">Monetization Dashboard</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/10 rounded p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm opacity-75">Revenue</span>
            <DollarSign size={20} />
          </div>
          <p className="text-2xl font-bold mt-2">
            ${earnings?.total_revenue.toFixed(2) || '0.00'}
          </p>
        </div>

        <div className="bg-white/10 rounded p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm opacity-75">Impressions</span>
            <Eye size={20} />
          </div>
          <p className="text-2xl font-bold mt-2">
            {earnings?.total_impressions.toLocaleString() || 0}
          </p>
        </div>

        <div className="bg-white/10 rounded p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm opacity-75">Clicks</span>
            <Click size={20} />
          </div>
          <p className="text-2xl font-bold mt-2">
            {earnings?.total_clicks.toLocaleString() || 0}
          </p>
        </div>

        <div className="bg-white/10 rounded p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm opacity-75">CTR</span>
            <TrendingUp size={20} />
          </div>
          <p className="text-2xl font-bold mt-2">
            {earnings?.average_ctr.toFixed(2) || 0}%
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        {[7, 30, 90].map(days => (
          <button
            key={days}
            onClick={() => setPeriod(days)}
            className={`px-4 py-2 rounded transition ${
              period === days
                ? 'bg-white text-green-800'
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            {days}D
          </button>
        ))}
      </div>
    </div>
  );
};

export default MonetizationDashboard;
