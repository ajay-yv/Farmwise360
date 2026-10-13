'use client';

import React, { useState } from 'react';
import { Search, Plus, Sparkles, Image as ImageIcon, FileText } from 'lucide-react';

interface BottomSearchBarProps {
  onSubmitQuery: (query: string) => void;
  onPlusAction?: (actionType: string) => void;
}

export const BottomSearchBar: React.FC<BottomSearchBarProps> = ({
  onSubmitQuery,
  onPlusAction,
}) => {
  const [query, setQuery] = useState('');
  const [showPlusMenu, setShowPlusMenu] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSubmitQuery(query.trim());
      setQuery('');
      setShowPlusMenu(false);
    }
  };

  const handleActionClick = (type: string) => {
    setShowPlusMenu(false);
    if (onPlusAction) {
      onPlusAction(type);
    }
  };

  return (
    <div className="bottom-landscape-section">
      {/* Search Input Bar floating over the landscape top boundary */}
      <div className="search-bar-wrapper">
        <form onSubmit={handleSubmit} className="search-pill-form">
          <div className="search-icon-wrapper">
            <Search size={17} strokeWidth={2.4} color="#64748b" />
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask Farmwise"
            aria-label="Ask Farmwise"
            className="search-input"
          />

          <button
            type="button"
            onClick={() => setShowPlusMenu(!showPlusMenu)}
            aria-label="Additional actions"
            className={`plus-btn ${showPlusMenu ? 'open' : ''}`}
            title="Attach or more options"
          >
            <Plus size={17} strokeWidth={2.4} color="#475569" />
          </button>
        </form>

        {/* Plus Action Menu Popup */}
        {showPlusMenu && (
          <div className="plus-menu-dropdown">
            <button 
              type="button" 
              onClick={() => handleActionClick('scan_leaf')}
              className="plus-menu-item"
            >
              <ImageIcon size={16} color="#1faa59" />
              <span>Scan Crop Leaf for Disease</span>
            </button>
            <button 
              type="button" 
              onClick={() => handleActionClick('soil_report')}
              className="plus-menu-item"
            >
              <FileText size={16} color="#0284c7" />
              <span>Upload Soil Test Report</span>
            </button>
            <button 
              type="button" 
              onClick={() => handleActionClick('quick_tip')}
              className="plus-menu-item"
            >
              <Sparkles size={16} color="#eab308" />
              <span>Today&apos;s Smart Farming Tip</span>
            </button>
          </div>
        )}
      </div>

      {/* Pristine Pastoral Landscape Banner - Fills completely to bottom frame */}
      <div className="landscape-banner-frame">
        <img
          src="/images/farm-landscape-pristine.png"
          alt="Lush green farm landscape with cottage and rolling hills"
          className="landscape-img"
          style={{
            width: '100%',
            height: '100%',
            minHeight: '100%',
            objectFit: 'cover',
            objectPosition: 'bottom center',
            display: 'block',
            margin: 0,
            padding: 0,
          }}
        />
      </div>

      <style jsx>{`
        .bottom-landscape-section {
          position: relative;
          width: 100%;
          margin-top: clamp(6px, 1.2vh, 12px);
          display: flex;
          flex-direction: column;
          align-items: center;
          overflow: hidden;
          flex: 1;
          justify-content: flex-start;
        }

        .search-bar-wrapper {
          position: relative;
          width: 90%;
          max-width: 440px;
          z-index: 15;
          margin-top: 2px;
          margin-bottom: -18px; /* Overlaps with top edge of landscape as in Image 1 */
        }

        .search-pill-form {
          display: flex;
          align-items: center;
          background: #ffffff;
          border-radius: 9999px;
          padding: 7px 14px;
          box-shadow: 0 6px 20px -2px rgba(0, 0, 0, 0.1), 0 2px 6px -1px rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(226, 232, 240, 0.95);
          transition: all 0.22s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .search-pill-form:focus-within {
          border-color: #22c55e;
          box-shadow: 0 8px 24px -2px rgba(34, 197, 94, 0.2), 0 2px 6px -1px rgba(0, 0, 0, 0.06);
          transform: translateY(-1px);
        }

        .search-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #64748b;
          margin-right: 8px;
        }

        .search-input {
          flex: 1;
          background: transparent;
          font-size: 0.9rem;
          color: #1e293b;
          font-weight: 500;
        }

        .search-input::placeholder {
          color: #94a3b8;
          font-weight: 400;
        }

        .plus-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          color: #475569;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          margin-left: 4px;
        }

        .plus-btn:hover {
          background-color: #f1f5f9;
          color: #1faa59;
          transform: scale(1.1);
        }

        .plus-btn.open {
          transform: rotate(45deg);
          color: #ef4444;
          background-color: #fef2f2;
        }

        .plus-menu-dropdown {
          position: absolute;
          bottom: calc(100% + 8px);
          right: 0;
          background: #ffffff;
          border-radius: 14px;
          padding: 6px;
          box-shadow: 0 10px 24px -4px rgba(0, 0, 0, 0.14), 0 3px 8px -2px rgba(0, 0, 0, 0.05);
          border: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
          gap: 3px;
          min-width: 230px;
          z-index: 30;
          animation: modalSlideUp 0.18s ease-out;
        }

        .plus-menu-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 7px 11px;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 600;
          color: #334155;
          text-align: left;
          transition: all 0.15s ease;
        }

        .plus-menu-item:hover {
          background-color: #f8fafc;
          color: #134e35;
        }

        .landscape-banner-frame {
          position: relative;
          width: 100%;
          max-width: 100%;
          margin: 0 auto;
          line-height: 0;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          flex: 1;
          height: 100%;
          min-height: clamp(110px, 16vh, 220px);
        }

        :global(.landscape-img),
        .landscape-img {
          width: 100% !important;
          height: 100% !important;
          min-height: 100% !important;
          display: block !important;
          object-fit: cover !important;
          object-position: bottom center !important;
          margin: 0 !important;
          padding: 0 !important;
        }

        @media (max-width: 768px) {
          .search-bar-wrapper {
            max-width: 320px;
            margin-bottom: -15px;
          }
          .search-pill-form {
            padding: 6px 12px;
          }
          .search-input {
            font-size: 0.84rem;
          }
          .landscape-banner-frame {
            height: clamp(65px, 9vh, 95px);
          }
        }
      `}</style>
    </div>
  );
};
