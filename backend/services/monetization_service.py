"""
Monetization Service
"""
from datetime import datetime, timedelta
from typing import Optional, List

class MonetizationService:
    """Handle ads, banners, and earnings"""
    
    def __init__(self):
        self.ads_db = {}
        self.earnings_db = []
    
    def create_ad_banner(
        self,
        title: str,
        image_url: str,
        link_url: str,
        position: str,
        category: str
    ) -> dict:
        """Create a new ad banner"""
        ad_id = f"ad_{__import__('uuid').uuid4().hex[:8]}"
        banner = {
            "id": ad_id,
            "title": title,
            "image_url": image_url,
            "link_url": link_url,
            "position": position,
            "category": category,
            "active": True,
            "created_at": datetime.utcnow().isoformat(),
            "impressions": 0,
            "clicks": 0,
            "ctr": 0.0,
            "revenue": 0.0
        }
        self.ads_db[ad_id] = banner
        return banner
    
    def track_impression(self, ad_id: str, cpc: float = 0.10) -> bool:
        """Track ad impression"""
        if ad_id in self.ads_db:
            self.ads_db[ad_id]["impressions"] += 1
            return True
        return False
    
    def track_click(self, ad_id: str, cpc: float = 0.10) -> bool:
        """Track ad click and add earnings"""
        if ad_id in self.ads_db:
            self.ads_db[ad_id]["clicks"] += 1
            self.ads_db[ad_id]["revenue"] += cpc
            
            # Update CTR
            impressions = self.ads_db[ad_id]["impressions"]
            if impressions > 0:
                clicks = self.ads_db[ad_id]["clicks"]
                self.ads_db[ad_id]["ctr"] = (clicks / impressions) * 100
            
            # Log earning
            self.earnings_db.append({
                "ad_id": ad_id,
                "type": "click",
                "amount": cpc,
                "timestamp": datetime.utcnow().isoformat()
            })
            return True
        return False
    
    def get_earnings_report(self, days: int = 30) -> dict:
        """Get earnings report"""
        cutoff_date = datetime.utcnow() - timedelta(days=days)
        
        recent_earnings = [
            e for e in self.earnings_db
            if datetime.fromisoformat(e["timestamp"]) > cutoff_date
        ]
        
        total_revenue = sum(e["amount"] for e in recent_earnings)
        total_impressions = sum(ad["impressions"] for ad in self.ads_db.values())
        total_clicks = sum(ad["clicks"] for ad in self.ads_db.values())
        
        return {
            "period_days": days,
            "total_impressions": total_impressions,
            "total_clicks": total_clicks,
            "total_revenue": round(total_revenue, 2),
            "average_ctr": round((total_clicks / total_impressions * 100) if total_impressions > 0 else 0, 2),
            "average_cpc": round(total_revenue / total_clicks if total_clicks > 0 else 0, 2)
        }
    
    def get_top_ads(self, limit: int = 10) -> List[dict]:
        """Get top performing ads"""
        sorted_ads = sorted(
            self.ads_db.values(),
            key=lambda x: x["revenue"],
            reverse=True
        )
        return sorted_ads[:limit]

monetization_service = MonetizationService()
