'use client';

import React from 'react';

export const HeroRobot: React.FC = () => {
  return (
    <div className="hero-robot-wrapper">
      <div className="robot-image-container">
        <img
          src="/images/robot_plant.svg"
          alt="Farmwise AI Assistant Robot Mascot"
          className="robot-img"
          style={{
            width: 'clamp(380px, 42vw, 520px)',
            maxWidth: '520px',
            height: 'auto',
            maxHeight: 'clamp(170px, 26vh, 230px)',
            objectFit: 'contain',
            display: 'block',
            margin: '0 auto',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        />
      </div>

      <div className="hero-text-block">
        <h2 className="hero-title">Hello, I&apos;m Farmwise AI</h2>
        <h3 className="hero-subtitle">Your smart farming assistant</h3>
        <p className="hero-description">
          Ask me anything about farming, market prices, recycling, storeservices and more!
        </p>
      </div>

      <style jsx>{`
        .hero-robot-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          width: 100%;
          padding: 8px 16px 0 16px;
          margin: 0;
        }

        .robot-image-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          max-width: 520px;
          margin: 0 auto;
        }

        :global(.robot-img),
        .robot-img {
          display: block !important;
          width: clamp(380px, 42vw, 520px) !important;
          max-width: 520px !important;
          height: auto !important;
          max-height: clamp(170px, 26vh, 230px) !important;
          object-fit: contain !important;
          margin: 0 auto !important;
          user-select: none !important;
          pointer-events: none !important; /* Clicking image will NOT trigger listening */
          filter: drop-shadow(0 4px 12px rgba(31, 170, 89, 0.08));
        }

        .hero-text-block {
          margin-top: 4px;
          max-width: 520px;
        }

        .hero-title {
          font-family: var(--font-display);
          font-size: 1.55rem;
          font-weight: 800;
          color: #134e35;
          letter-spacing: -0.025em;
          line-height: 1.25;
          margin-bottom: 2px;
        }

        .hero-subtitle {
          font-size: 1.05rem;
          font-weight: 600;
          color: #1e3a2b;
          margin-bottom: 4px;
        }

        .hero-description {
          font-size: 0.82rem;
          line-height: 1.4;
          color: #64748b;
          font-weight: 400;
          padding: 0 12px;
        }

        @media (max-width: 768px) {
          .robot-img {
            width: 220px;
            height: 97px;
          }
          .hero-title {
            font-size: 1.3rem;
          }
          .hero-subtitle {
            font-size: 0.9rem;
          }
          .hero-description {
            font-size: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
};
