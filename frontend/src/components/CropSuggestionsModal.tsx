'use client';

import React, { useState } from 'react';
import { X, Sprout, TrendingUp, Layers, Check } from 'lucide-react';

interface CropSuggestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCropPrompt: (prompt: string) => void;
}

export const CropSuggestionsModal: React.FC<CropSuggestionsModalProps> = ({
  isOpen,
  onClose,
  onSelectCropPrompt,
}) => {
  const [selectedSoil, setSelectedSoil] = useState('Loamy / Black Soil');

  if (!isOpen) return null;

  const suggestions = [
    {
      name: 'High-Yield Wheat (HD-2967)',
      season: 'Rabi Season',
      duration: '120-135 Days',
      profit: '+35% expected ROI',
      water: 'Moderate (3-4 irrigations)',
      prompt: 'Provide complete cultivation and fertilizer schedule for High-Yield Wheat (HD-2967)',
    },
    {
      name: 'Pusa Bold Mustard',
      season: 'Autumn / Rabi',
      duration: '110-120 Days',
      profit: '+42% high oil yield',
      water: 'Low water requirement',
      prompt: 'What are the best pest management practices for Pusa Bold Mustard crop?',
    },
    {
      name: 'Organic Bell Peppers & Tomatoes',
      season: 'Greenhouse / Open Field',
      duration: '90-100 Days',
      profit: '+50% cash crop',
      water: 'Drip irrigation recommended',
      prompt: 'How to setup drip irrigation and fertilization for organic tomatoes?',
    },
  ];

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="header-badge">
            <Sprout size={18} color="#16a34a" />
            <span>AI Crop Suggestions</span>
          </div>
          <button type="button" onClick={onClose} className="close-btn" aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {/* Soil Filter Selector */}
        <div className="soil-selector">
          <label className="soil-label">
            <Layers size={14} color="#64748b" />
            <span>Target Soil Type:</span>
          </label>
          <div className="soil-tabs">
            {['Loamy / Black Soil', 'Sandy Loam', 'Clay Soil'].map((soil) => (
              <button
                key={soil}
                type="button"
                onClick={() => setSelectedSoil(soil)}
                className={`soil-tab ${selectedSoil === soil ? 'active' : ''}`}
              >
                {soil}
              </button>
            ))}
          </div>
        </div>

        {/* Suggestions List */}
        <div className="suggestions-list">
          {suggestions.map((item, idx) => (
            <div key={idx} className="suggestion-item">
              <div className="item-top">
                <h4 className="item-title">{item.name}</h4>
                <span className="profit-badge">
                  <TrendingUp size={12} />
                  {item.profit}
                </span>
              </div>

              <div className="item-details">
                <span>⏱️ {item.duration}</span>
                <span>💧 {item.water}</span>
              </div>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onSelectCropPrompt(item.prompt);
                }}
                className="ask-crop-btn"
              >
                <span>Ask Farmwise for Plan</span>
                <Check size={14} strokeWidth={2.5} />
              </button>
            </div>
          ))}
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
            margin-bottom: 14px;
          }

          .header-badge {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 0.85rem;
            font-weight: 700;
            color: #166534;
            background: #dcfce7;
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

          .soil-selector {
            margin-bottom: 14px;
          }

          .soil-label {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 0.75rem;
            font-weight: 600;
            color: #475569;
            margin-bottom: 6px;
          }

          .soil-tabs {
            display: flex;
            gap: 6px;
            overflow-x: auto;
          }

          .soil-tab {
            font-size: 0.72rem;
            font-weight: 600;
            padding: 5px 10px;
            border-radius: 8px;
            background: #f1f5f9;
            color: #475569;
            white-space: nowrap;
          }

          .soil-tab.active {
            background: #1faa59;
            color: #ffffff;
          }

          .suggestions-list {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          .suggestion-item {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 12px;
            transition: all 0.2s ease;
          }

          .suggestion-item:hover {
            border-color: #86efac;
            background: #f0fdf4;
          }

          .item-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 6px;
          }

          .item-title {
            font-size: 0.85rem;
            font-weight: 700;
            color: #0f172a;
          }

          .profit-badge {
            display: inline-flex;
            align-items: center;
            gap: 3px;
            font-size: 0.68rem;
            font-weight: 700;
            color: #15803d;
            background: #dcfce7;
            padding: 2px 6px;
            border-radius: 6px;
          }

          .item-details {
            display: flex;
            gap: 12px;
            font-size: 0.72rem;
            color: #64748b;
            margin-bottom: 10px;
          }

          .ask-crop-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            width: 100%;
            padding: 6px 12px;
            border-radius: 8px;
            background: #ffffff;
            border: 1px solid #cbd5e1;
            font-size: 0.75rem;
            font-weight: 600;
            color: #1e293b;
            transition: all 0.15s ease;
          }

          .ask-crop-btn:hover {
            background: #1faa59;
            color: #ffffff;
            border-color: #1faa59;
          }
        `}</style>
      </div>
    </div>
  );
};
