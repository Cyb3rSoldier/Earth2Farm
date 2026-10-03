import React, { useState, useEffect, useCallback } from 'react';
import { useI18n } from './i18n/useI18n.jsx';
import Header from './components/Header.jsx';
import SelectorPanel from './components/SelectorPanel.jsx';
import AdvisoryHero from './components/AdvisoryHero.jsx';
import ThreeClocks from './components/ThreeClocks.jsx';
import DistributionChart from './components/DistributionChart.jsx';
import HeatRiskCalendar from './components/HeatRiskCalendar.jsx';
import TrustPanel from './components/TrustPanel.jsx';
import DataSources from './components/DataSources.jsx';
import VillageCard from './components/VillageCard.jsx';
import Footer from './components/Footer.jsx';
import { LoadingSkeleton, ErrorState } from './components/Skeletons.jsx';
import { getAdvisory } from './api/advisory.js';

export default function App() {
  const { t } = useI18n();
  const [selectedDistrict, setSelectedDistrict] = useState('rajshahi');
  const [selectedCrop, setSelectedCrop] = useState('aman');
  const [isSimpleMode, setIsSimpleMode] = useState(false);
  const [advisoryData, setAdvisoryData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAdvisory = useCallback(async (district, crop) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAdvisory(district, crop);
      setAdvisoryData(data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch initial data on mount
  useEffect(() => {
    fetchAdvisory(selectedDistrict, selectedCrop);
  }, []);

  const handleGetAdvice = () => {
    fetchAdvisory(selectedDistrict, selectedCrop);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1C2B20]">
      {/* Sticky Top Header */}
      <Header
        isSimpleMode={isSimpleMode}
        onToggleSimpleMode={() => setIsSimpleMode(!isSimpleMode)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* District & Crop Selector */}
        <div className="no-print">
          <SelectorPanel
            selectedDistrict={selectedDistrict}
            onSelectDistrict={(dist) => {
              setSelectedDistrict(dist);
              fetchAdvisory(dist, selectedCrop);
            }}
            selectedCrop={selectedCrop}
            onSelectCrop={(crop) => {
              setSelectedCrop(crop);
              fetchAdvisory(selectedDistrict, crop);
            }}
            onGetAdvice={handleGetAdvice}
            isLoading={isLoading}
          />
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="no-print">
            <LoadingSkeleton />
          </div>
        )}

        {/* Error State with Retry */}
        {!isLoading && error && (
          <div className="no-print">
            <ErrorState error={error} onRetry={handleGetAdvice} />
          </div>
        )}

        {/* Advisory Results */}
        {!isLoading && !error && advisoryData && (
          <>
            {/* Primary Advisory Hero (Dominates the page) */}
            <div className="no-print">
              <AdvisoryHero
                advisoryData={advisoryData}
                onPrint={handlePrint}
                isSimpleMode={isSimpleMode}
              />
            </div>

            {/* In Simple Mode: Hide complex science charts; show only Village Card preview */}
            {isSimpleMode ? (
              <div className="space-y-6">
                <VillageCard
                  advisoryData={advisoryData}
                  onPrint={handlePrint}
                />
              </div>
            ) : (
              /* Full Scientific View: Three Clocks, Distribution, Heat Risk, Trust Panel, Sources, Village Card */
              <div className="space-y-6 sm:space-y-8">
                {/* Three Satellite Timelines */}
                <ThreeClocks advisoryData={advisoryData} />

                {/* Overlaid Rain Onset Distribution Chart */}
                <DistributionChart advisoryData={advisoryData} />

                {/* Heat Stress Risk Calendar (Collapsible) */}
                <HeatRiskCalendar advisoryData={advisoryData} />

                {/* Scientific Trust & Methodology Panel */}
                <TrustPanel advisoryData={advisoryData} />

                {/* Satellite Data Provenance */}
                <DataSources provenance={advisoryData.provenance} />

                {/* Village Notice Board Card */}
                <VillageCard
                  advisoryData={advisoryData}
                  onPrint={handlePrint}
                />
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
