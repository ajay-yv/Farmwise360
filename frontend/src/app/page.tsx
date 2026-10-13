'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { HeroRobot } from '@/components/HeroRobot';
import { ActionSection } from '@/components/ActionSection';
import { WeatherPageView } from '@/components/WeatherPageView';
import { CropPageView } from '@/components/CropPageView';
import { BottomSearchBar } from '@/components/BottomSearchBar';
import { ListeningOverlay } from '@/components/ListeningOverlay';
import { AIResponseModal } from '@/components/AIResponseModal';
import { LocationModal } from '@/components/LocationModal';
import { SettingsModal } from '@/components/SettingsModal';

export default function Home() {
  // Page view state: 'home' | 'weather' | 'crops' (transitions within the same page!)
  const [currentView, setCurrentView] = useState<'home' | 'weather' | 'crops'>('home');

  const [isListening, setIsListening] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('Green Valley Farm, Punjab');
  
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [activeQuery, setActiveQuery] = useState('');

  // Voice listening controls
  const handleStartListening = () => {
    setIsListening(true);
  };

  const handleCloseListening = () => {
    setIsListening(false);
  };

  const handleTranscriptComplete = (transcript: string) => {
    setIsListening(false);
    setActiveQuery(transcript);
    setAiModalOpen(true);
  };

  // Search submit
  const handleSearchSubmit = (query: string) => {
    setActiveQuery(query);
    setAiModalOpen(true);
  };

  const handlePlusAction = (type: string) => {
    if (type === 'scan_leaf') {
      setActiveQuery('Scan and diagnose tomato leaf for fungal blight symptoms');
      setAiModalOpen(true);
    } else if (type === 'soil_report') {
      setCurrentView('crops');
    } else {
      setActiveQuery('Give me today’s top agricultural weather & market recommendation');
      setAiModalOpen(true);
    }
  };

  const handleAskAboutCrop = (cropName: string) => {
    setActiveQuery(`What are the optimal cultivation and irrigation practices for ${cropName}?`);
    setAiModalOpen(true);
  };

  // Header back navigation
  const handleHeaderBack = () => {
    if (currentView !== 'home') {
      setCurrentView('home');
    } else if (window.history.length > 1) {
      window.history.back();
    }
  };

  const getHeaderTitle = () => {
    if (currentView === 'weather') return 'Weather & Crop Guide';
    if (currentView === 'crops') return 'Crop Suggestions';
    return ''; // Heading 'Farmwise AI' removed
  };

  return (
    <main className="desktop-app-container">
      {/* 1. Header Bar: ← | Title | 📍 ⚙️ */}
      <Header
        onBack={handleHeaderBack}
        onOpenLocation={() => setShowLocationModal(true)}
        onOpenSettings={() => setShowSettingsModal(true)}
        locationName={currentLocation}
        title={getHeaderTitle()}
      />

      {/* Main Central Viewport: Transitions in-place on the same page */}
      <div className={`desktop-main-body ${currentView !== 'home' ? 'with-header-offset' : ''}`}>
        {currentView === 'home' && (
          <div className="home-view-group">
            {/* 2. Hero Mascot: Compact size matching Image 1 */}
            <HeroRobot />

            {/* 3. Action Section: Weather card + Center Mic button + Crop suggestions */}
            <ActionSection
              onStartListening={handleStartListening}
              onSelectWeatherGuide={() => setCurrentView('weather')}
              onSelectCropSuggestions={() => setCurrentView('crops')}
              isListening={isListening}
            />
          </div>
        )}

        {currentView === 'weather' && (
          <WeatherPageView
            onAskAboutCrop={handleAskAboutCrop}
            onBackToHome={() => setCurrentView('home')}
            onSwitchToCrops={() => setCurrentView('crops')}
          />
        )}

        {currentView === 'crops' && (
          <CropPageView
            onSelectCropPrompt={handleSearchSubmit}
            onBackToHome={() => setCurrentView('home')}
            onSwitchToWeather={() => setCurrentView('weather')}
          />
        )}
      </div>

      {/* 4. Bottom Landscape & Floating Search pill */}
      <BottomSearchBar
        onSubmitQuery={handleSearchSubmit}
        onPlusAction={handlePlusAction}
      />

      {/* 5. Listening Overlay: Triggered ONLY by the central microphone button (Image 3) */}
      <ListeningOverlay
        isOpen={isListening}
        onClose={handleCloseListening}
        onTranscriptComplete={handleTranscriptComplete}
      />

      {/* AI Assistant Answer Modal */}
      <AIResponseModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        query={activeQuery}
        onFollowUp={handleSearchSubmit}
      />

      {/* Location & Settings Modals */}
      <LocationModal
        isOpen={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        currentLocation={currentLocation}
        onSelectLocation={(loc) => setCurrentLocation(loc)}
      />

      <SettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
      />

      <style jsx>{`
        .desktop-app-container {
          height: 100vh;
          max-height: 100vh;
          width: 100%;
          background-color: #ffffff;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          overflow: hidden;
          position: relative;
        }

        .desktop-main-body {
          flex: 0 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          width: 100%;
          max-width: 1360px;
          margin: 0 auto;
          padding: 0 16px;
        }

        .desktop-main-body.with-header-offset {
          padding-top: 54px;
          flex: 1;
        }

        .home-view-group {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          margin-top: 0;
          animation: fadeIn 0.2s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}
