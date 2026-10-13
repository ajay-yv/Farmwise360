'use client';

import React from 'react';
import { ArrowLeft, MapPin, Settings } from 'lucide-react';

interface HeaderProps {
  onBack?: () => void;
  onOpenLocation?: () => void;
  onOpenSettings?: () => void;
  locationName?: string;
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onBack,
  onOpenLocation,
  onOpenSettings,
  locationName = 'Green Valley Farm',
  title = 'Farmwise AI',
}) => {
  return (
    <header className="farmwise-header">
      <div className="header-inner">
        <button 
          type="button" 
          onClick={onBack} 
          aria-label="Go back"
          className="icon-btn header-back-btn"
          title="Back"
        >
          <ArrowLeft size={20} strokeWidth={2.4} />
        </button>

        <div className="header-title-container">
          {title ? <h1 className="header-title">{title}</h1> : null}
        </div>

        <div className="header-actions">
          <button 
            type="button" 
            onClick={onOpenLocation} 
            aria-label={`Location: ${locationName}`}
            className="icon-btn header-action-btn"
            title={`Location: ${locationName}`}
          >
            <MapPin size={20} strokeWidth={2.2} />
          </button>
          <button 
            type="button" 
            onClick={onOpenSettings} 
            aria-label="Settings"
            className="icon-btn header-action-btn"
            title="Settings"
          >
            <Settings size={20} strokeWidth={2.2} />
          </button>
        </div>
      </div>

      <style jsx>{`
        .farmwise-header {
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 25;
          background: transparent;
          padding: 12px 24px 0 24px;
          pointer-events: none;
        }

        .header-inner {
          max-width: 1360px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          pointer-events: none;
        }

        .icon-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          color: #134e35;
          pointer-events: auto;
          transition: all 0.18s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .icon-btn:hover {
          background-color: rgba(31, 170, 89, 0.1);
          color: #1faa59;
          transform: scale(1.05);
        }

        .icon-btn:active {
          transform: scale(0.95);
        }

        .header-title-container {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          pointer-events: none;
        }

        .header-title {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 700;
          color: #134e35;
          letter-spacing: -0.02em;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        @media (max-width: 768px) {
          .farmwise-header {
            padding: 8px 16px 2px 16px;
          }
          .header-title {
            font-size: 1.1rem;
          }
          .icon-btn {
            width: 32px;
            height: 32px;
          }
        }
      `}</style>
    </header>
  );
};
