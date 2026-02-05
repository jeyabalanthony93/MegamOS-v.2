import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface AdBanner {
  id: string;
  title: string;
  image_url: string;
  link_url: string;
  position: 'top' | 'bottom' | 'sidebar' | 'floating';
}

interface AdManagerProps {
  position?: AdBanner['position'];
  maxAds?: number;
}

export const AdManager: React.FC<AdManagerProps> = ({ position = 'top', maxAds = 1 }) => {
  const [ads, setAds] = useState<AdBanner[]>([]);
  const [closedAds, setClosedAds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAds();
  }, [position]);

  const fetchAds = async () => {
    try {
      const response = await fetch('/api/v1/ads/banners');
      const data = await response.json();
      
      const filteredAds = data
        .filter((ad: AdBanner) => ad.position === position)
        .slice(0, maxAds);
      
      setAds(filteredAds);
      setLoading(false);
    } catch (error) {
      console.error('Failed to load ads:', error);
      setLoading(false);
    }
  };

  const handleAdClick = async (ad: AdBanner) => {
    try {
      await fetch(`/api/v1/ads/track/click/${ad.id}`, { method: 'POST' });
      window.open(ad.link_url, '_blank');
    } catch (error) {
      console.error('Failed to track click:', error);
    }
  };

  const handleImpressionTracked = async (ad: AdBanner) => {
    try {
      await fetch(`/api/v1/ads/track/impression/${ad.id}`, { method: 'POST' });
    } catch (error) {
      console.error('Failed to track impression:', error);
    }
  };

  const handleCloseAd = (adId: string) => {
    const newClosed = new Set(closedAds);
    newClosed.add(adId);
    setClosedAds(newClosed);
  };

  const visibleAds = ads.filter(ad => !closedAds.has(ad.id));

  if (loading || visibleAds.length === 0) return null;

  return (
    <div className={`ad-container ad-position-${position}`}>
      {visibleAds.map((ad) => (
        <div
          key={ad.id}
          className="ad-banner group relative"
          onMouseEnter={() => handleImpressionTracked(ad)}
        >
          <button
            onClick={() => handleCloseAd(ad.id)}
            className="absolute top-2 right-2 p-1 bg-black/50 rounded hover:bg-black/70 z-10 hidden group-hover:block"
          >
            <X size={16} className="text-white" />
          </button>
          
          <img
            src={ad.image_url}
            alt={ad.title}
            onClick={() => handleAdClick(ad)}
            className="w-full h-auto cursor-pointer rounded"
          />
        </div>
      ))}
    </div>
  );
};

export default AdManager;
