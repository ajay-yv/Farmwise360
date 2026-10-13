'use client';

import React, { useState } from 'react';
import { X, Settings, Volume2, Globe, Bell, ShieldCheck } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [language, setLanguage] = useState('English');
  const [voiceSpeed, setVoiceSpeed] = useState('Normal (1.0x)');
  const [audioFeedback, setAudioFeedback] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="header-badge">
            <Settings size={18} color="#134e35" />
            <span>Assistant Preferences</span>
          </div>
          <button type="button" onClick={onClose} className="close-btn" aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="settings-section">
          <label className="section-title">
            <Globe size={15} color="#1faa59" />
            <span>Voice &amp; Interaction Language</span>
          </label>
          <div className="options-grid">
            {['English', 'Hindi (हिंदी)', 'Punjabi (ਪੰਜਾਬੀ)', 'Spanish (Español)'].map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setLanguage(lang)}
                className={`option-btn ${language === lang ? 'active' : ''}`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        <div className="settings-section">
          <label className="section-title">
            <Volume2 size={15} color="#0284c7" />
            <span>Speech Output Speed</span>
          </label>
          <div className="options-grid">
            {['Slow (0.8x)', 'Normal (1.0x)', 'Fast (1.2x)'].map((spd) => (
              <button
                key={spd}
                type="button"
                onClick={() => setVoiceSpeed(spd)}
                className={`option-btn ${voiceSpeed === spd ? 'active' : ''}`}
              >
                {spd}
              </button>
            ))}
          </div>
        </div>

        <div className="toggle-row">
          <div className="toggle-info">
            <Bell size={15} color="#64748b" />
            <div>
              <h5>Chime &amp; Audio Feedback</h5>
              <p>Play soft confirmation sounds when mic starts</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setAudioFeedback(!audioFeedback)}
            className={`switch-btn ${audioFeedback ? 'on' : ''}`}
            aria-label="Toggle audio feedback"
          >
            <div className="switch-thumb" />
          </button>
        </div>

        <div className="footer-notice">
          <ShieldCheck size={14} color="#16a34a" />
          <span>Farmwise AI v2.4 • Senior AgriTech Engine</span>
        </div>

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

          .settings-section {
            margin-bottom: 16px;
          }

          .section-title {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 0.78rem;
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 8px;
          }

          .options-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 6px;
          }

          .option-btn {
            padding: 8px 10px;
            border-radius: 8px;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            font-size: 0.75rem;
            font-weight: 600;
            color: #475569;
            text-align: center;
            transition: all 0.15s ease;
          }

          .option-btn:hover {
            background: #f1f5f9;
            color: #1e293b;
          }

          .option-btn.active {
            background: #1faa59;
            border-color: #1faa59;
            color: #ffffff;
          }

          .toggle-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 12px 0;
            border-top: 1px solid #f1f5f9;
            margin-bottom: 14px;
          }

          .toggle-info {
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .toggle-info h5 {
            font-size: 0.8rem;
            font-weight: 700;
            color: #1e293b;
          }

          .toggle-info p {
            font-size: 0.68rem;
            color: #64748b;
          }

          .switch-btn {
            width: 42px;
            height: 24px;
            border-radius: 999px;
            background: #cbd5e1;
            position: relative;
            transition: background 0.2s ease;
          }

          .switch-btn.on {
            background: #1faa59;
          }

          .switch-thumb {
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: #ffffff;
            position: absolute;
            top: 3px;
            left: 3px;
            transition: transform 0.2s ease;
          }

          .switch-btn.on .switch-thumb {
            transform: translateX(18px);
          }

          .footer-notice {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            font-size: 0.7rem;
            color: #64748b;
            padding-top: 6px;
            border-top: 1px solid #f1f5f9;
          }
        `}</style>
      </div>
    </div>
  );
};
