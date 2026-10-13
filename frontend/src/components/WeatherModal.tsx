'use client';

import React from 'react';
import { X, CloudRain, Sun, Wind, Droplets, Thermometer, CheckCircle2 } from 'lucide-react';

interface WeatherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAskAboutCrop: (crop: string) => void;
}

export const WeatherModal: React.FC<WeatherModalProps> = ({
  isOpen,
  onClose,
  onAskAboutCrop,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="header-badge">
            <Sun size={18} color="#eab308" />
            <span>Farm Climate Advisory</span>
          </div>
          <button type="button" onClick={onClose} className="close-btn" aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="weather-hero">
          <div className="weather-main">
            <span className="temperature">27°C</span>
            <div className="weather-condition">
              <h4>Partly Sunny</h4>
              <p>Ideal sowing moisture level</p>
            </div>
          </div>

          <div className="weather-grid">
            <div className="weather-metric">
              <Droplets size={16} color="#0284c7" />
              <span className="metric-val">68%</span>
              <span className="metric-lbl">Soil Moisture</span>
            </div>
            <div className="weather-metric">
              <Wind size={16} color="#64748b" />
              <span className="metric-val">12 km/h</span>
              <span className="metric-lbl">Wind Speed</span>
            </div>
            <div className="weather-metric">
              <CloudRain size={16} color="#3b82f6" />
              <span className="metric-val">10%</span>
              <span className="metric-lbl">Rain Chance</span>
            </div>
            <div className="weather-metric">
              <Thermometer size={16} color="#ef4444" />
              <span className="metric-val">31° / 21°</span>
              <span className="metric-lbl">High / Low</span>
            </div>
          </div>
        </div>

        <div className="guide-section">
          <h4 className="guide-title">Recommended Suitable Crops for Today</h4>
          <div className="crop-chips">
            {[
              { name: 'Wheat (Sharbati)', tag: 'Best Season' },
              { name: 'Mustard (Pusa Bold)', tag: 'Low Water' },
              { name: 'Chickpeas / Chana', tag: 'High Yield' },
              { name: 'Spinach & Greens', tag: 'Fast Cycle' },
            ].map((crop, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  onClose();
                  onAskAboutCrop(crop.name);
                }}
                className="crop-chip-btn"
              >
                <CheckCircle2 size={14} color="#16a34a" />
                <span className="chip-name">{crop.name}</span>
                <span className="chip-tag">{crop.tag}</span>
              </button>
            ))}
          </div>
        </div>

        <style jsx>{`
          .modal-backdrop {
            position: fixed;
            inset: 0;
            background: rgba(15, 23, 42, 0.6);
            backdrop-filter: blur(6px);
            z-index: 100;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 16px;
            animation: fadeInOverlay 0.2s ease-out;
          }

          .modal-card {
            background: #ffffff;
            border-radius: 20px;
            width: 100%;
            max-width: 440px;
            padding: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
            animation: modalSlideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .modal-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 16px;
          }

          .header-badge {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 0.85rem;
            font-weight: 700;
            color: #134e35;
            background: #edf7ed;
            padding: 6px 12px;
            border-radius: 999px;
          }

          .close-btn {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #64748b;
            background: #f1f5f9;
          }

          .close-btn:hover {
            background: #fee2e2;
            color: #ef4444;
          }

          .weather-hero {
            background: linear-gradient(135deg, #e0f2fe 0%, #f0fdf4 100%);
            border-radius: 16px;
            padding: 16px;
            border: 1px solid #bae6fd;
            margin-bottom: 16px;
          }

          .weather-main {
            display: flex;
            align-items: center;
            gap: 14px;
            margin-bottom: 14px;
          }

          .temperature {
            font-size: 2.2rem;
            font-weight: 800;
            color: #0369a1;
            font-family: var(--font-display);
          }

          .weather-condition h4 {
            font-size: 0.95rem;
            font-weight: 700;
            color: #0f172a;
          }

          .weather-condition p {
            font-size: 0.75rem;
            color: #475569;
          }

          .weather-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 8px;
            background: rgba(255, 255, 255, 0.7);
            padding: 10px;
            border-radius: 12px;
          }

          .weather-metric {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .metric-val {
            font-size: 0.8rem;
            font-weight: 700;
            color: #1e293b;
            margin-top: 2px;
          }

          .metric-lbl {
            font-size: 0.62rem;
            color: #64748b;
          }

          .guide-section {
            margin-top: 12px;
          }

          .guide-title {
            font-size: 0.85rem;
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 10px;
          }

          .crop-chips {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .crop-chip-btn {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            padding: 8px 12px;
            border-radius: 10px;
            font-size: 0.8rem;
            color: #1e293b;
            font-weight: 600;
            transition: all 0.2s ease;
          }

          .crop-chip-btn:hover {
            background: #ecfdf5;
            border-color: #a7f3d0;
            transform: translateX(3px);
          }

          .chip-name {
            flex: 1;
            text-align: left;
            margin-left: 8px;
          }

          .chip-tag {
            font-size: 0.68rem;
            background: #dcfce7;
            color: #15803d;
            padding: 2px 8px;
            border-radius: 999px;
            font-weight: 700;
          }
        `}</style>
      </div>
    </div>
  );
};
