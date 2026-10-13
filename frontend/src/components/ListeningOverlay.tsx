'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Mic, X, Check } from 'lucide-react';

interface ListeningOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onTranscriptComplete: (transcript: string) => void;
}

export const ListeningOverlay: React.FC<ListeningOverlayProps> = ({
  isOpen,
  onClose,
  onTranscriptComplete,
}) => {
  const [transcript, setTranscript] = useState('');
  const [soundLevels, setSoundLevels] = useState<number[]>([14, 28, 44, 24, 38, 20]);
  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const playChime = (freqStart = 440, freqEnd = 880) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freqStart, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freqEnd, ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch {}
  };

  useEffect(() => {
    if (!isOpen) {
      setTranscript('');
      if (timerRef.current) clearInterval(timerRef.current);
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
      }
      return;
    }

    playChime(520, 784);

    timerRef.current = setInterval(() => {
      setSoundLevels([
        Math.floor(12 + Math.random() * 32),
        Math.floor(18 + Math.random() * 40),
        Math.floor(22 + Math.random() * 46),
        Math.floor(18 + Math.random() * 38),
        Math.floor(14 + Math.random() * 30),
        Math.floor(10 + Math.random() * 24),
      ]);
    }, 110);

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          let currentText = '';
          for (let i = 0; i < event.results.length; i++) {
            currentText += event.results[i][0].transcript;
          }
          setTranscript(currentText);
        };

        recognition.start();
        recognitionRef.current = recognition;
      } catch (err) {
        console.warn('Speech recognition not active:', err);
      }
    } else {
      const samplePhrases = [
        "What is the best fertilizer for wheat crops in current season?",
        "Show current market price of tomatoes",
        "How to prevent leaf blight during rainy season?",
      ];
      const randomPhrase = samplePhrases[Math.floor(Math.random() * samplePhrases.length)];
      let index = 0;
      const simInterval = setInterval(() => {
        index += 3;
        setTranscript(randomPhrase.slice(0, index));
        if (index >= randomPhrase.length) {
          clearInterval(simInterval);
        }
      }, 90);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFinish = (textToSubmit?: string) => {
    playChime(784, 520);
    const query = textToSubmit || transcript || "What is the best fertilizer for wheat crops in current season?";
    onTranscriptComplete(query);
  };

  return (
    <div className="listening-overlay-container" role="dialog" aria-modal="true">
      <div className="overlay-backdrop" onClick={onClose} />

      <div className="listening-content-card">
        <button 
          type="button" 
          onClick={onClose} 
          aria-label="Cancel listening"
          className="listening-close-btn"
          title="Cancel"
        >
          <X size={22} strokeWidth={2.4} />
        </button>

        {/* Listening Heading matching Image 3 */}
        <div className="listening-header">
          <h2 className="listening-title">Listening....</h2>
        </div>

        {/* Concentric Pulse Rings & Mic Centerpiece matching Image 3 */}
        <div className="listening-visualizer-stage">
          <div className="ripple-ring ring-3" />
          <div className="ripple-ring ring-2" />
          <div className="ripple-ring ring-1" />

          {/* Sound Wave Bars (Left side) */}
          <div className="equalizer-group left-bars" aria-hidden="true">
            {soundLevels.slice(0, 3).map((height, i) => (
              <span
                key={`l-${i}`}
                className="eq-bar"
                style={{ height: `${height}px` }}
              />
            ))}
          </div>

          {/* Center Glowing Mic Button */}
          <div className="center-listening-mic" onClick={() => handleFinish()}>
            <div className="mic-glow-halo" />
            <div className="mic-inner-sphere">
              <Mic size={44} strokeWidth={2.5} color="#ffffff" />
            </div>
          </div>

          {/* Sound Wave Bars (Right side) */}
          <div className="equalizer-group right-bars" aria-hidden="true">
            {soundLevels.slice(3, 6).map((height, i) => (
              <span
                key={`r-${i}`}
                className="eq-bar"
                style={{ height: `${height}px` }}
              />
            ))}
          </div>
        </div>

        {/* "Speak now" text matching Image 3 */}
        <div className="listening-footer-text">
          <p className="speak-now-label">Speak now</p>
          
          <div className="transcript-box">
            {transcript ? (
              <p className="live-transcript-text">&ldquo;{transcript}&rdquo;</p>
            ) : (
              <p className="transcript-hint">Farmwise AI is listening to your farming question...</p>
            )}
          </div>
        </div>

        <div className="listening-controls">
          <button 
            type="button" 
            onClick={onClose} 
            className="control-btn cancel-btn"
          >
            Cancel
          </button>
          <button 
            type="button" 
            onClick={() => handleFinish()} 
            className="control-btn submit-btn"
          >
            <Check size={18} strokeWidth={2.5} />
            <span>Ask Farmwise</span>
          </button>
        </div>
      </div>

      <style jsx>{`
        .listening-overlay-container {
          position: fixed;
          inset: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeInOverlay 0.25s ease-out forwards;
        }

        .overlay-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(255, 255, 255, 0.38);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
        }

        .listening-content-card {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 600px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 32px 24px;
        }

        .listening-close-btn {
          position: fixed;
          top: 24px;
          right: 32px;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid rgba(226, 232, 240, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #475569;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          transition: all 0.2s ease;
        }

        .listening-close-btn:hover {
          background: #fee2e2;
          color: #ef4444;
          transform: scale(1.08);
        }

        .listening-header {
          margin-bottom: 28px;
          text-align: center;
        }

        .listening-title {
          font-family: var(--font-display);
          font-size: 2rem;
          font-weight: 800;
          color: #0f3d27;
          letter-spacing: -0.02em;
          text-shadow: 0 1px 12px rgba(255, 255, 255, 0.9), 0 0 20px rgba(255, 255, 255, 0.7);
        }

        .listening-visualizer-stage {
          position: relative;
          width: 300px;
          height: 220px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Pulsating Concentric Green Rings (Image 3) */
        .ripple-ring {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          box-sizing: border-box;
        }

        .ring-1 {
          width: 135px;
          height: 135px;
          background: radial-gradient(circle, rgba(34, 197, 94, 0.45) 0%, rgba(34, 197, 94, 0.15) 70%, transparent 100%);
          border: 2px solid rgba(34, 197, 94, 0.5);
          animation: pulseCoreMic 1.8s infinite ease-in-out;
        }

        .ring-2 {
          width: 195px;
          height: 195px;
          border: 1.5px solid rgba(34, 197, 94, 0.35);
          background: radial-gradient(circle, rgba(74, 222, 128, 0.2) 0%, transparent 80%);
          animation: rippleRing1 2.4s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
        }

        .ring-3 {
          width: 255px;
          height: 255px;
          border: 1px solid rgba(34, 197, 94, 0.2);
          animation: rippleRing2 2.8s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
        }

        /* Equalizer Wave Bars on left and right */
        .equalizer-group {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 6px;
          z-index: 5;
        }

        .left-bars {
          right: calc(50% + 56px);
        }

        .right-bars {
          left: calc(50% + 56px);
        }

        .eq-bar {
          display: inline-block;
          width: 5px;
          min-height: 10px;
          border-radius: 5px;
          background: linear-gradient(180deg, #4ade80 0%, #16a34a 100%);
          transition: height 0.1s ease-out;
          box-shadow: 0 0 8px rgba(74, 222, 128, 0.7);
        }

        /* Center Glowing Mic Button */
        .center-listening-mic {
          position: relative;
          z-index: 10;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .mic-glow-halo {
          position: absolute;
          width: 110px;
          height: 110px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(34, 197, 94, 0.5) 0%, rgba(34, 197, 94, 0) 70%);
          filter: blur(8px);
          animation: pulseGlowRing 2s infinite ease-out;
        }

        .mic-inner-sphere {
          position: relative;
          width: 88px;
          height: 88px;
          border-radius: 50%;
          background: linear-gradient(145deg, #22c55e 0%, #15803d 100%);
          box-shadow: 
            0 10px 28px rgba(22, 163, 74, 0.55),
            inset 0 2px 4px rgba(255, 255, 255, 0.4),
            inset 0 -2px 4px rgba(0, 0, 0, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .center-listening-mic:hover .mic-inner-sphere {
          transform: scale(1.08);
        }

        .center-listening-mic:active .mic-inner-sphere {
          transform: scale(0.96);
        }

        .listening-footer-text {
          margin-top: 20px;
          text-align: center;
          width: 100%;
          max-width: 440px;
        }

        .speak-now-label {
          font-family: var(--font-display);
          font-size: 1.3rem;
          font-weight: 700;
          color: #1e293b;
          letter-spacing: -0.01em;
          margin-bottom: 8px;
          text-shadow: 0 1px 10px rgba(255, 255, 255, 0.9), 0 0 16px rgba(255, 255, 255, 0.7);
        }

        .transcript-box {
          min-height: 44px;
          padding: 10px 18px;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.85);
          border: 1px solid rgba(226, 232, 240, 0.9);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
          margin-top: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .live-transcript-text {
          font-size: 0.95rem;
          color: #134e35;
          font-weight: 600;
          line-height: 1.4;
        }

        .transcript-hint {
          font-size: 0.82rem;
          color: #94a3b8;
          font-style: italic;
        }

        .listening-controls {
          margin-top: 26px;
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .control-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 24px;
          border-radius: 9999px;
          font-size: 0.9rem;
          font-weight: 600;
          transition: all 0.2s ease;
        }

        .cancel-btn {
          background: #f1f5f9;
          color: #64748b;
          border: 1px solid #e2e8f0;
        }

        .cancel-btn:hover {
          background: #e2e8f0;
          color: #1e293b;
        }

        .submit-btn {
          background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
          color: #ffffff;
          box-shadow: 0 6px 18px rgba(34, 197, 94, 0.45);
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(34, 197, 94, 0.55);
        }

        .submit-btn:active {
          transform: translateY(0);
        }

        @media (max-width: 768px) {
          .listening-title {
            font-size: 1.6rem;
          }
          .listening-visualizer-stage {
            width: 240px;
            height: 170px;
          }
          .ring-1 { width: 105px; height: 105px; }
          .ring-2 { width: 155px; height: 155px; }
          .ring-3 { width: 205px; height: 205px; }
          .mic-inner-sphere { width: 72px; height: 72px; }
          .speak-now-label { font-size: 1.1rem; }
        }
      `}</style>
    </div>
  );
};
