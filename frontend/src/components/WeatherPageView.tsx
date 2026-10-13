'use client';

import React from 'react';
import { Sun, Droplets, Wind, CloudRain, Thermometer, CheckCircle2, ArrowRight } from 'lucide-react';

interface WeatherPageViewProps {
  onAskAboutCrop: (crop: string) => void;
  onBackToHome: () => void;
  onSwitchToCrops?: () => void;
}

export const WeatherPageView: React.FC<WeatherPageViewProps> = ({
  onAskAboutCrop,
  onBackToHome,
  onSwitchToCrops,
}) => {
  return (
    <div className="weather-page-container">
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
          <span className="tab-pill active">☀️ Weather &amp; Climate</span>
          {onSwitchToCrops && (
            <button
              type="button"
              onClick={onSwitchToCrops}
              className="tab-pill"
              title="View Crop Suggestions"
            >
              🌱 Crop Suggestions
            </button>
          )}
        </div>
      </div>

      {/* Weather Metric Cards Row */}
      <div className="weather-top-banner">
        <div className="weather-primary-info">
          <div className="weather-temp-badge">
            <Sun size={26} color="#eab308" />
            <span className="temp-value">27°C</span>
          </div>
          <div className="weather-desc-wrap">
            <h3 className="weather-main-status">Partly Sunny • Ideal Sowing Day</h3>
            <p className="weather-sub-status">Green Valley Farm • North Agro-Climatic Zone</p>
          </div>
        </div>

        <div className="weather-metrics-pills">
          <div className="metric-pill">
            <Droplets size={14} color="#0284c7" />
            <span className="pill-val">68%</span>
            <span className="pill-label">Moisture</span>
          </div>
          <div className="metric-pill">
            <Wind size={14} color="#64748b" />
            <span className="pill-val">12 km/h</span>
            <span className="pill-label">Wind</span>
          </div>
          <div className="metric-pill">
            <CloudRain size={14} color="#3b82f6" />
            <span className="pill-val">10%</span>
            <span className="pill-label">Rain Risk</span>
          </div>
          <div className="metric-pill">
            <Thermometer size={14} color="#ef4444" />
            <span className="pill-val">31° / 21°</span>
            <span className="pill-label">High/Low</span>
          </div>
        </div>
      </div>

      {/* Recommended Crops for Current Weather */}
      <div className="crops-guide-block">
        <div className="guide-header">
          <h4 className="guide-title">Suitable Crops for Current Weather &amp; Soil</h4>
          <span className="guide-subtitle">Tap any crop to ask Farmwise for cultivation advice</span>
        </div>

        <div className="crop-cards-grid">
          {[
            {
              name: 'Wheat (Sharbati A-Grade)',
              tag: 'Optimal Sowing',
              desc: 'High soil moisture (68%) ensures fast germination and deep root development.',
              color: '#16a34a',
              bg: '#f0fdf4',
              border: '#bbf7d0',
            },
            {
              name: 'Mustard (Pusa Bold)',
              tag: 'Low Water Req.',
              desc: 'Mild 27°C daytime temperature is ideal for branching and pod formation.',
              color: '#d97706',
              bg: '#fffbeb',
              border: '#fde68a',
            },
            {
              name: 'Chickpeas / Desi Chana',
              tag: 'High ROI Yield',
              desc: 'Dry atmospheric forecast prevents early fungal root blight.',
              color: '#0284c7',
              bg: '#f0f9ff',
              border: '#bae6fd',
            },
            {
              name: 'Spinach & Farm Greens',
              tag: 'Quick 45-Day Harvest',
              desc: 'Short-duration cash crop capitalizing on balanced sunny weather.',
              color: '#059669',
              bg: '#ecfdf5',
              border: '#a7f3d0',
            },
          ].map((crop, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onAskAboutCrop(crop.name)}
              className="crop-recommendation-card"
              style={{ background: crop.bg, borderColor: crop.border }}
            >
              <div className="crop-card-top">
                <span className="crop-name">{crop.name}</span>
                <span className="crop-badge" style={{ color: crop.color, borderColor: crop.color }}>
                  {crop.tag}
                </span>
              </div>
              <p className="crop-card-desc">{crop.desc}</p>
              <div className="crop-card-footer">
                <span className="ask-action">Ask cultivation guide</span>
                <ArrowRight size={14} color={crop.color} />
              </div>
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        .weather-page-container {
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
          background: #e0f2fe;
          color: #0369a1;
          border-color: #bae6fd;
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

        .weather-top-banner {
          background: linear-gradient(135deg, #f0f8ff 0%, #f3fcf3 100%);
          border: 1px solid #d4e7fa;
          border-radius: 14px;
          padding: 10px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          box-shadow: 0 2px 10px -2px rgba(0, 0, 0, 0.04);
        }

        .weather-primary-info {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .weather-temp-badge {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .temp-value {
          font-family: var(--font-display);
          font-size: 2rem;
          font-weight: 800;
          color: #0369a1;
          line-height: 1;
        }

        .weather-main-status {
          font-size: 0.96rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 2px;
        }

        .weather-sub-status {
          font-size: 0.74rem;
          color: #64748b;
          font-weight: 500;
        }

        .weather-metrics-pills {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .metric-pill {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: rgba(255, 255, 255, 0.85);
          border: 1px solid rgba(226, 232, 240, 0.9);
          border-radius: 10px;
          padding: 6px 10px;
          min-width: 65px;
          text-align: center;
        }

        .pill-val {
          font-size: 0.78rem;
          font-weight: 700;
          color: #1e293b;
          margin-top: 2px;
        }

        .pill-label {
          font-size: 0.62rem;
          color: #64748b;
          font-weight: 500;
        }

        .crops-guide-block {
          background: #ffffff;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          padding: 12px 18px;
          box-shadow: 0 4px 16px -2px rgba(0, 0, 0, 0.03);
        }

        .guide-header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .guide-title {
          font-size: 0.92rem;
          font-weight: 700;
          color: #134e35;
        }

        .guide-subtitle {
          font-size: 0.72rem;
          color: #64748b;
        }

        .crop-cards-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }

        .crop-recommendation-card {
          border-radius: 12px;
          border-width: 1px;
          border-style: solid;
          padding: 10px 14px;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .crop-recommendation-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px -2px rgba(0, 0, 0, 0.06);
        }

        .crop-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 4px;
        }

        .crop-name {
          font-size: 0.85rem;
          font-weight: 700;
          color: #1e293b;
        }

        .crop-badge {
          font-size: 0.65rem;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 6px;
          border: 1px solid;
          background: rgba(255, 255, 255, 0.8);
        }

        .crop-card-desc {
          font-size: 0.72rem;
          color: #475569;
          line-height: 1.35;
          margin-bottom: 8px;
        }

        .crop-card-footer {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.7rem;
          font-weight: 600;
          color: #134e35;
        }

        @media (max-width: 768px) {
          .weather-top-banner {
            flex-direction: column;
            align-items: flex-start;
          }
          .crop-cards-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
