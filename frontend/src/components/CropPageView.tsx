'use client';

import React, { useState } from 'react';
import { Sprout, TrendingUp, Layers, ArrowRight } from 'lucide-react';

interface CropPageViewProps {
  onSelectCropPrompt: (prompt: string) => void;
  onBackToHome: () => void;
  onSwitchToWeather?: () => void;
}

export const CropPageView: React.FC<CropPageViewProps> = ({
  onSelectCropPrompt,
  onBackToHome,
  onSwitchToWeather,
}) => {
  const [selectedSoil, setSelectedSoil] = useState('Loamy / Black Soil');

  const suggestions = [
    {
      name: 'High-Yield Wheat (HD-2967)',
      season: 'Rabi Season (Nov - Mar)',
      duration: '120-135 Days',
      profit: '+35% expected ROI',
      water: 'Moderate (3-4 irrigations)',
      summary: 'Ideal for loamy soil. Superior grain weight, disease resistance against yellow rust.',
      prompt: 'Provide complete cultivation and fertilizer schedule for High-Yield Wheat (HD-2967)',
    },
    {
      name: 'Pusa Bold Mustard',
      season: 'Autumn / Rabi',
      duration: '110-120 Days',
      profit: '+42% high oil yield',
      water: 'Low water requirement',
      summary: 'Drought-tolerant brassica with 41% oil content. Ideal secondary crop.',
      prompt: 'What are the best pest management practices for Pusa Bold Mustard crop?',
    },
    {
      name: 'Organic Bell Peppers & Tomatoes',
      season: 'Open Field / Polyhouse',
      duration: '90-100 Days',
      profit: '+50% cash crop',
      water: 'Drip irrigation recommended',
      summary: 'High market demand. Responds exceptionally to organic vermicompost.',
      prompt: 'How to setup drip irrigation and fertilization for organic tomatoes?',
    },
  ];

  return (
    <div className="crops-page-container">
      {/* On-Page View Navigation Bar */}
      <div className="view-nav-bar">
        <button
          type="button"
          onClick={onBackToHome}
          className="nav-back-pill"
          title="Return to Home Screen"
        >
          <span>← Back to Home</span>
        </button>
        <div className="nav-tabs">
          {onSwitchToWeather && (
            <button
              type="button"
              onClick={onSwitchToWeather}
              className="tab-pill"
              title="View Weather Advisory"
            >
              ☀️ Weather &amp; Climate
            </button>
          )}
          <span className="tab-pill active">🌱 Crop Suggestions</span>
        </div>
      </div>

      {/* Top Filter Bar */}
      <div className="soil-filter-bar">
        <div className="soil-filter-label">
          <Layers size={16} color="#16a34a" />
          <span>Select Your Soil &amp; Terroir:</span>
        </div>
        <div className="soil-tabs-group">
          {['Loamy / Black Soil', 'Sandy Loam', 'Clay Soil', 'Alluvial Basin'].map((soil) => (
            <button
              key={soil}
              type="button"
              onClick={() => setSelectedSoil(soil)}
              className={`soil-pill-btn ${selectedSoil === soil ? 'active' : ''}`}
            >
              {soil}
            </button>
          ))}
        </div>
      </div>

      {/* Crop Cards */}
      <div className="crops-cards-list">
        {suggestions.map((crop, idx) => (
          <div key={idx} className="crop-detail-card">
            <div className="card-top-row">
              <div className="title-group">
                <Sprout size={18} color="#16a34a" />
                <h4 className="crop-title">{crop.name}</h4>
              </div>
              <span className="roi-badge">
                <TrendingUp size={13} />
                {crop.profit}
              </span>
            </div>

            <p className="crop-summary">{crop.summary}</p>

            <div className="metrics-strip">
              <span className="metric-tag">⏱️ {crop.duration}</span>
              <span className="metric-tag">📅 {crop.season}</span>
              <span className="metric-tag">💧 {crop.water}</span>
            </div>

            <button
              type="button"
              onClick={() => onSelectCropPrompt(crop.prompt)}
              className="consult-btn"
            >
              <span>Consult Farmwise AI for Growing Plan</span>
              <ArrowRight size={14} />
            </button>
          </div>
        ))}
      </div>

      <style jsx>{`
        .crops-page-container {
          width: 100%;
          max-width: 960px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          animation: fadeIn 0.22s ease-out;
          padding: 4px 16px;
          max-height: clamp(260px, 48vh, 380px);
          overflow-y: auto;
        }

        .view-nav-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 2px;
        }

        .nav-back-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          border-radius: 20px;
          background: #f1f5f9;
          color: #334155;
          font-size: 0.75rem;
          font-weight: 700;
          border: 1px solid #e2e8f0;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .nav-back-pill:hover {
          background: #e2e8f0;
          color: #0f172a;
        }

        .nav-tabs {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .tab-pill {
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 0.74rem;
          font-weight: 600;
          border: 1px solid transparent;
          background: #f8fafc;
          color: #64748b;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .tab-pill.active {
          background: #dcfce7;
          color: #15803d;
          border-color: #bbf7d0;
          font-weight: 700;
        }

        .tab-pill:hover:not(.active) {
          background: #f1f5f9;
          color: #334155;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .soil-filter-bar {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 10px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .soil-filter-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.82rem;
          font-weight: 700;
          color: #1e293b;
        }

        .soil-tabs-group {
          display: flex;
          gap: 6px;
          overflow-x: auto;
        }

        .soil-pill-btn {
          font-size: 0.74rem;
          font-weight: 600;
          padding: 5px 12px;
          border-radius: 8px;
          background: #ffffff;
          border: 1px solid #cbd5e1;
          color: #475569;
          white-space: nowrap;
          transition: all 0.15s ease;
        }

        .soil-pill-btn:hover {
          border-color: #1faa59;
          color: #134e35;
        }

        .soil-pill-btn.active {
          background: #1faa59;
          border-color: #1faa59;
          color: #ffffff;
          font-weight: 700;
        }

        .crops-cards-list {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .crop-detail-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 14px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 4px 16px -2px rgba(0, 0, 0, 0.04);
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .crop-detail-card:hover {
          transform: translateY(-2px);
          border-color: #86efac;
          box-shadow: 0 8px 20px -2px rgba(22, 163, 74, 0.08);
        }

        .card-top-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 8px;
          margin-bottom: 6px;
        }

        .title-group {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .crop-title {
          font-size: 0.88rem;
          font-weight: 700;
          color: #0f172a;
          line-height: 1.25;
        }

        .roi-badge {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          font-size: 0.65rem;
          font-weight: 700;
          color: #15803d;
          background: #dcfce7;
          border: 1px solid #bbf7d0;
          padding: 2px 6px;
          border-radius: 6px;
          white-space: nowrap;
        }

        .crop-summary {
          font-size: 0.72rem;
          color: #64748b;
          line-height: 1.4;
          margin-bottom: 10px;
        }

        .metrics-strip {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-bottom: 12px;
        }

        .metric-tag {
          font-size: 0.68rem;
          color: #334155;
          background: #f8fafc;
          padding: 3px 6px;
          border-radius: 6px;
          border: 1px solid #f1f5f9;
        }

        .consult-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          width: 100%;
          padding: 8px 10px;
          border-radius: 8px;
          background: linear-gradient(135deg, #1faa59 0%, #15803d 100%);
          color: #ffffff;
          font-size: 0.74rem;
          font-weight: 700;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(31, 170, 89, 0.3);
        }

        .consult-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(31, 170, 89, 0.4);
        }

        @media (max-width: 900px) {
          .crops-cards-list {
            grid-template-columns: 1fr;
          }
          .soil-filter-bar {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
};
