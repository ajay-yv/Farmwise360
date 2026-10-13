'use client';

import React from 'react';
import { ChevronRight, Mic } from 'lucide-react';

interface ActionSectionProps {
  onStartListening: () => void;
  onSelectWeatherGuide: () => void;
  onSelectCropSuggestions: () => void;
  isListening?: boolean;
}

export const ActionSection: React.FC<ActionSectionProps> = ({
  onStartListening,
  onSelectWeatherGuide,
  onSelectCropSuggestions,
  isListening = false,
}) => {
  return (
    <div className="action-section-container">
      {/* Left Card: Weather & Crop Guide */}
      <button 
        type="button" 
        onClick={onSelectWeatherGuide}
        className="action-card weather-card"
        aria-label="Open Weather & Crop Guide"
      >
        <div className="card-content">
          <h4 className="card-title">Weather &amp; Crop Guide</h4>
          <p className="card-desc">See your weather &amp; suitable crops</p>
        </div>
        <div className="card-arrow" aria-hidden="true">
          <ChevronRight size={17} strokeWidth={2.4} />
        </div>
      </button>

      {/* Center: Circular Microphone Button */}
      <div className="mic-wrapper">
        <button
          type="button"
          onClick={onStartListening}
          aria-label={isListening ? 'Stop listening' : 'Tap to speak'}
          className={`mic-button ${isListening ? 'active' : ''}`}
          title="Tap to speak"
        >
          <div className="mic-pulse-ring" />
          <div className="mic-inner-icon">
            <Mic size={30} strokeWidth={2.5} color="#ffffff" />
          </div>
        </button>
        <div className="mic-label-group">
          <span className="mic-label-primary">Tap to speak</span>
          <span className="mic-label-secondary">or type your message</span>
        </div>
      </div>

      {/* Right Card: Crop Suggestions */}
      <button 
        type="button" 
        onClick={onSelectCropSuggestions}
        className="action-card crop-card"
        aria-label="Open Crop Suggestions"
      >
        <div className="card-content">
          <h4 className="card-title">Crop Suggestions</h4>
          <p className="card-desc">Get crop suggestions based on your land &amp; season</p>
        </div>
        <div className="card-arrow" aria-hidden="true">
          <ChevronRight size={17} strokeWidth={2.4} />
        </div>
      </button>

      <style jsx>{`
        .action-section-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(14px, 2.5vw, 28px);
          width: 100%;
          max-width: 900px;
          margin: 4px auto 2px auto;
          padding: 0 16px;
          position: relative;
          z-index: 10;
          flex-shrink: 0;
        }

        .action-card {
          flex: 1;
          max-width: 290px;
          height: 68px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 16px;
          border-radius: 14px;
          text-align: left;
          transition: all 0.22s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 2px 8px -2px rgba(0, 0, 0, 0.04);
          cursor: pointer;
        }

        .action-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px -2px rgba(0, 0, 0, 0.08);
        }

        .action-card:active {
          transform: translateY(0);
        }

        .weather-card {
          background-color: #f1f7fe;
          border: 1px solid #d8e8fa;
        }

        .weather-card:hover {
          background-color: #e8f2fc;
          border-color: #c4defa;
        }

        .crop-card {
          background-color: #f1f8f1;
          border: 1px solid #daecdb;
        }

        .crop-card:hover {
          background-color: #e5f3e6;
          border-color: #c4e4c6;
        }

        .card-content {
          padding-right: 6px;
        }

        .card-title {
          font-size: 0.92rem;
          font-weight: 700;
          color: #1e293b;
          line-height: 1.25;
          margin-bottom: 2px;
        }

        .card-desc {
          font-size: 0.74rem;
          color: #64748b;
          line-height: 1.3;
          font-weight: 500;
        }

        .card-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #94a3b8;
          flex-shrink: 0;
          transition: transform 0.2s ease, color 0.2s ease;
        }

        .action-card:hover .card-arrow {
          transform: translateX(3px);
          color: #1faa59;
        }

        .mic-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex-shrink: 0;
          padding: 0 4px;
        }

        .mic-button {
          position: relative;
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 20px -2px rgba(34, 197, 94, 0.45), 0 2px 6px -1px rgba(0, 0, 0, 0.08);
          transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .mic-button:hover {
          transform: scale(1.08);
          box-shadow: 0 10px 28px -2px rgba(34, 197, 94, 0.6);
        }

        .mic-button:active {
          transform: scale(0.96);
        }

        .mic-pulse-ring {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 2px solid rgba(34, 197, 94, 0.4);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }

        .mic-button:hover .mic-pulse-ring {
          opacity: 1;
          animation: pulseGlowRing 2s infinite ease-out;
        }

        .mic-inner-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
        }

        .mic-label-group {
          margin-top: 3px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .mic-label-primary {
          font-size: 0.84rem;
          font-weight: 700;
          color: #1e293b;
          line-height: 1.2;
        }

        .mic-label-secondary {
          font-size: 0.7rem;
          color: #94a3b8;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .action-section-container {
            gap: 10px;
            padding: 0 12px;
          }
          .action-card {
            height: 60px;
            padding: 8px 10px;
          }
          .card-title {
            font-size: 0.8rem;
          }
          .card-desc {
            font-size: 0.65rem;
          }
          .mic-button {
            width: 54px;
            height: 54px;
          }
        }
      `}</style>
    </div>
  );
};
