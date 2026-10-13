'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Volume2, VolumeX, Sparkles, Copy, Check, ArrowRight } from 'lucide-react';

interface AIResponseModalProps {
  isOpen: boolean;
  onClose: () => void;
  query: string;
  onFollowUp: (q: string) => void;
}

export const AIResponseModal: React.FC<AIResponseModalProps> = ({
  isOpen,
  onClose,
  query,
  onFollowUp,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Generate smart contextual farming response based on query
  const getFarmingResponse = (userPrompt: string) => {
    const p = userPrompt.toLowerCase();
    if (p.includes('fertilizer') || p.includes('wheat')) {
      return {
        title: 'Nutrient & Fertilizer Schedule for Wheat',
        points: [
          'Basal Dose: Apply DAP (55 kg/acre) and MOP (20 kg/acre) during field preparation.',
          'First Top Dressing: Apply Urea (25 kg/acre) around CRI stage (21 days after sowing).',
          'Second Top Dressing: Urea (25 kg/acre) before flowering at 40-45 days.',
          'Micronutrients: Spray Zinc Sulphate (0.5%) + Urea (2%) if leaves show interveinal chlorosis.',
        ],
        tip: 'Ensure balanced moisture before applying urea top-dressing to prevent nitrogen volatilization.',
        followUps: [
          'What is the best irrigation interval for wheat?',
          'How to identify weed competition in wheat fields?',
        ],
      };
    } else if (p.includes('price') || p.includes('market') || p.includes('tomato')) {
      return {
        title: 'Live Mandi Market Rate Intelligence',
        points: [
          'Tomato (Hybrid Red): ₹28 - ₹34 / kg (Trending +8% higher this week)',
          'Wheat (Grade A Sharbati): ₹2,450 - ₹2,600 / quintal',
          'Mustard Seed: ₹5,400 - ₹5,650 / quintal',
          'Market Sentiment: Strong festive demand across regional agricultural centers.',
        ],
        tip: 'Grading and sorting your produce by uniform size can fetch a 12-15% premium price.',
        followUps: [
          'Where is the nearest verified cold storage facility?',
          'What are current transport freight rates?',
        ],
      };
    } else if (p.includes('pest') || p.includes('blight') || p.includes('disease')) {
      return {
        title: 'Integrated Pest & Disease Management Plan',
        points: [
          'Identify: Inspect undersides of leaves for fungal spores or early water-soaked lesions.',
          'Organic Remedy: Spray Neem Oil (5ml/L water) with mild surfactant every 7 days.',
          'Bio-fungicide: Trichoderma viride seed treatment prevents damping-off & root rot.',
          'Ventilation: Prune lower leaves to enhance airflow and diminish humidity buildup.',
        ],
        tip: 'Avoid overhead sprinkler irrigation in early mornings to minimize leaf wetness duration.',
        followUps: [
          'Which bio-pesticides are certified for organic export?',
          'How to treat yellow vein mosaic virus?',
        ],
      };
    } else {
      return {
        title: 'Farmwise Smart Agricultural Advice',
        points: [
          'Soil Analysis: Recommended soil pH is 6.5 to 7.5 for maximum nutrient availability.',
          'Water Management: Use tensiometers or soil moisture probes to schedule precision drip irrigation.',
          'Crop Rotation: Alternating with leguminous crops naturally enriches soil with symbiotic nitrogen.',
          'Weather Advisory: Mild temperatures forecast this week makes it favorable for foliar nutrient sprays.',
        ],
        tip: 'Regular soil testing every 2 seasons saves up to 25% on redundant synthetic fertilizers.',
        followUps: [
          'Recommend companion planting crops',
          'Calculate water requirement per acre',
        ],
      };
    }
  };

  const advice = getFarmingResponse(query);

  const handleSpeakToggle = () => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const textToRead = `${advice.title}. ${advice.points.join('. ')}. Pro tip: ${advice.tip}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 0.95;
      utterance.pitch = 1.05;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const handleCopy = () => {
    const text = `${advice.title}\n\n` + advice.points.map((p) => `• ${p}`).join('\n') + `\n\nTip: ${advice.tip}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-top">
          <div className="ai-avatar-badge">
            <Image
              src="/images/robot_plant.svg"
              alt="Farmwise AI Mascot"
              width={38}
              height={38}
              className="ai-avatar-thumb"
            />
            <div className="ai-title-wrap">
              <h3>Farmwise AI</h3>
              <span className="online-status">Online Assistant</span>
            </div>
          </div>

          <div className="top-action-icons">
            <button
              type="button"
              onClick={handleSpeakToggle}
              className={`icon-action ${isSpeaking ? 'speaking' : ''}`}
              title={isSpeaking ? 'Stop speaking' : 'Read aloud'}
            >
              {isSpeaking ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="icon-action"
              title="Copy answer"
            >
              {copied ? <Check size={18} color="#16a34a" /> : <Copy size={18} />}
            </button>
            <button type="button" onClick={onClose} className="icon-action" title="Close">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* User Query pill */}
        <div className="user-query-bubble">
          <span className="query-tag">You asked:</span>
          <p className="query-text">&ldquo;{query}&rdquo;</p>
        </div>

        {/* AI Answer Content */}
        <div className="ai-body-content">
          <div className="advice-header">
            <Sparkles size={16} color="#16a34a" />
            <h4>{advice.title}</h4>
          </div>

          <ul className="points-list">
            {advice.points.map((pt, i) => (
              <li key={i} className="point-item">
                <span className="point-dot" />
                <span>{pt}</span>
              </li>
            ))}
          </ul>

          <div className="pro-tip-box">
            <strong>Farmer Pro-Tip:</strong> {advice.tip}
          </div>

          {/* Follow-up question chips */}
          <div className="follow-ups">
            <span className="follow-up-title">Recommended follow-ups:</span>
            <div className="chip-row">
              {advice.followUps.map((fq, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onFollowUp(fq)}
                  className="follow-up-btn"
                >
                  <span>{fq}</span>
                  <ArrowRight size={12} />
                </button>
              ))}
            </div>
          </div>
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
            animation: fadeInOverlay 0.25s ease-out;
          }

          .modal-card {
            background: #ffffff;
            border-radius: 22px;
            width: 100%;
            max-width: 480px;
            max-height: 90vh;
            overflow-y: auto;
            padding: 22px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            animation: modalSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .modal-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 14px;
            border-bottom: 1px solid #f1f5f9;
            padding-bottom: 12px;
          }

          .ai-avatar-badge {
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .ai-avatar-thumb {
            width: 38px;
            height: 38px;
            border-radius: 12px;
            object-fit: cover;
            border: 2px solid #86efac;
          }

          .ai-title-wrap h3 {
            font-size: 0.95rem;
            font-weight: 700;
            color: #0f172a;
            margin: 0;
          }

          .online-status {
            font-size: 0.68rem;
            color: #16a34a;
            font-weight: 600;
          }

          .top-action-icons {
            display: flex;
            align-items: center;
            gap: 6px;
          }

          .icon-action {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #64748b;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
          }

          .icon-action:hover {
            background: #f1f5f9;
            color: #1e293b;
          }

          .icon-action.speaking {
            background: #dcfce7;
            color: #16a34a;
            border-color: #86efac;
            animation: pulseGlowRing 2s infinite;
          }

          .user-query-bubble {
            background: #f8fafc;
            border-left: 3px solid #1faa59;
            padding: 8px 12px;
            border-radius: 8px;
            margin-bottom: 16px;
          }

          .query-tag {
            font-size: 0.68rem;
            font-weight: 700;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.04em;
          }

          .query-text {
            font-size: 0.85rem;
            font-weight: 600;
            color: #1e293b;
            margin-top: 2px;
          }

          .advice-header {
            display: flex;
            align-items: center;
            gap: 6px;
            margin-bottom: 12px;
          }

          .advice-header h4 {
            font-size: 1rem;
            font-weight: 700;
            color: #134e35;
          }

          .points-list {
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 8px;
            margin-bottom: 16px;
          }

          .point-item {
            display: flex;
            align-items: flex-start;
            gap: 8px;
            font-size: 0.82rem;
            color: #334155;
            line-height: 1.45;
          }

          .point-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #1faa59;
            margin-top: 6px;
            flex-shrink: 0;
          }

          .pro-tip-box {
            background: #f0fdf4;
            border: 1px solid #bbf7d0;
            border-radius: 12px;
            padding: 10px 14px;
            font-size: 0.78rem;
            color: #166534;
            line-height: 1.4;
            margin-bottom: 16px;
          }

          .follow-ups {
            margin-top: 14px;
          }

          .follow-up-title {
            display: block;
            font-size: 0.72rem;
            font-weight: 700;
            color: #64748b;
            margin-bottom: 8px;
          }

          .chip-row {
            display: flex;
            flex-direction: column;
            gap: 6px;
          }

          .follow-up-btn {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: #ffffff;
            border: 1px solid #e2e8f0;
            padding: 8px 12px;
            border-radius: 8px;
            font-size: 0.78rem;
            font-weight: 600;
            color: #1e293b;
            text-align: left;
            transition: all 0.15s ease;
          }

          .follow-up-btn:hover {
            background: #f0fdf4;
            border-color: #86efac;
            color: #15803d;
            transform: translateX(2px);
          }
        `}</style>
      </div>
    </div>
  );
};
