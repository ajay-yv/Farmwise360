'use client';

import React, { useState } from 'react';
import { X, MapPin, Check, Navigation } from 'lucide-react';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocation: string;
  onSelectLocation: (loc: string) => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  currentLocation,
  onSelectLocation,
}) => {
  const [selected, setSelected] = useState(currentLocation);

  if (!isOpen) return null;

  const locations = [
    { name: 'Green Valley Farm, Punjab', zone: 'North Alluvial Agro-Zone', soil: 'Alluvial Loam' },
    { name: 'Sunrise Orchard, Nashik', zone: 'Western Semi-Arid Zone', soil: 'Black Clay Soil' },
    { name: 'Evergreen Acres, Karnataka', zone: 'Southern Plateau Agro-Zone', soil: 'Red Sandy Loam' },
    { name: 'Central Plains, Madhya Pradesh', zone: 'Central High Land Zone', soil: 'Deep Black Soil' },
  ];

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="header-badge">
            <MapPin size={18} color="#16a34a" />
            <span>Farm Location &amp; Soil Zone</span>
          </div>
          <button type="button" onClick={onClose} className="close-btn" aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <p className="modal-subtitle">
          Farmwise AI tailors crop advice and weather advisories to your specific regional terroir.
        </p>

        <div className="location-list">
          {locations.map((loc, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setSelected(loc.name);
                onSelectLocation(loc.name);
                onClose();
              }}
              className={`loc-item-btn ${selected === loc.name ? 'active' : ''}`}
            >
              <div className="loc-info">
                <h4>{loc.name}</h4>
                <p>{loc.zone} • {loc.soil}</p>
              </div>
              {selected === loc.name && <Check size={18} color="#16a34a" />}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => {
            onSelectLocation('Auto-Detected GPS (Lat 28.61, Lon 77.20)');
            onClose();
          }}
          className="gps-btn"
        >
          <Navigation size={16} />
          <span>Use Current GPS Location</span>
        </button>

        <style jsx>{`
          .modal-backdrop {
            position: fixed;
            inset: 0;
            background: rgba(15, 23, 42, 0.65);
            backdrop-filter: blur(8px);
            z-index: 120;
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
            margin-bottom: 10px;
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

          .modal-subtitle {
            font-size: 0.78rem;
            color: #64748b;
            line-height: 1.4;
            margin-bottom: 14px;
          }

          .location-list {
            display: flex;
            flex-direction: column;
            gap: 8px;
            margin-bottom: 14px;
          }

          .loc-item-btn {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 10px 14px;
            text-align: left;
            transition: all 0.2s ease;
          }

          .loc-item-btn:hover {
            background: #f0fdf4;
            border-color: #86efac;
          }

          .loc-item-btn.active {
            background: #f0fdf4;
            border-color: #22c55e;
          }

          .loc-info h4 {
            font-size: 0.85rem;
            font-weight: 700;
            color: #0f172a;
          }

          .loc-info p {
            font-size: 0.7rem;
            color: #64748b;
            margin-top: 2px;
          }

          .gps-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            width: 100%;
            background: #1faa59;
            color: #ffffff;
            font-size: 0.82rem;
            font-weight: 700;
            padding: 10px;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(31, 170, 89, 0.3);
            transition: all 0.2s ease;
          }

          .gps-btn:hover {
            background: #19954c;
            transform: translateY(-1px);
          }
        `}</style>
      </div>
    </div>
  );
};
