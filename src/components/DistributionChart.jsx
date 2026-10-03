import React from 'react';
import { useI18n } from '../i18n/useI18n.jsx';
import { calculateMedian, computeBins, formatDayOfSeason } from '../utils/stats.js';

export default function DistributionChart({ advisoryData }) {
  const { lang, t, formatNumber } = useI18n();

  if (!advisoryData || advisoryData.unsupported) return null;

  const {
    onset_by_year = [],
    shift_days = 0,
    reliable
  } = advisoryData;

  // Split early (2001-2012) and late (2013-2025)
  const earlyPoints = onset_by_year
    .filter((d) => d.year <= 2012)
    .map((d) => d.day_of_season);

  const latePoints = onset_by_year
    .filter((d) => d.year >= 2013)
    .map((d) => d.day_of_season);

  const earlyMedian = calculateMedian(earlyPoints);
  const lateMedian = calculateMedian(latePoints);

  // Compute bins for histogram overlay
  const binSize = 3;
  const minVal = 10; // ~June 10
  const maxVal = 46; // ~July 16
  const earlyBins = computeBins(earlyPoints, binSize, minVal, maxVal);
  const lateBins = computeBins(latePoints, binSize, minVal, maxVal);

  const maxCount = Math.max(
    ...earlyBins.map((b) => b.count),
    ...lateBins.map((b) => b.count),
    1
  );

  // SVG layout
  const width = 480;
  const height = 220;
  const paddingLeft = 36;
  const paddingRight = 36;
  const paddingTop = 36;
  const paddingBottom = 40;

  const plotWidth = width - paddingLeft - paddingRight;
  const plotHeight = height - paddingTop - paddingBottom;

  const scaleX = (val) => {
    return paddingLeft + ((val - minVal) / (maxVal - minVal)) * plotWidth;
  };

  const scaleY = (count) => {
    return height - paddingBottom - (count / maxCount) * plotHeight;
  };

  const earlyMedianX = scaleX(earlyMedian);
  const lateMedianX = scaleX(lateMedian);

  // Calendar date ticks
  const ticks = [
    { day: 10, labelEn: 'Jun 10', labelBn: '১০ জুন' },
    { day: 20, labelEn: 'Jun 20', labelBn: '২০ জুন' },
    { day: 30, labelEn: 'Jun 30', labelBn: '৩০ জুন' },
    { day: 40, labelEn: 'Jul 10', labelBn: '১০ জুলাই' },
  ];

  return (
    <section 
      className="bg-[#FFFFFF] border border-[#E4DDD0] rounded-2xl p-4 sm:p-6 shadow-sm"
      aria-labelledby="dist-chart-title"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
        <div>
          <h2 id="dist-chart-title" className="text-lg sm:text-xl font-bold text-[#1C2B20]">
            {t('distTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-[#526356] mt-0.5">
            {t('distSubtitle')}
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-xs bg-[#2563EB]/80 inline-block" />
            <span className="text-[#1E40AF]">{t('earlyPeriod')}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-xs bg-[#D97706]/80 inline-block" />
            <span className="text-[#92400E]">{t('latePeriod')}</span>
          </div>
        </div>
      </div>

      {/* Inline Hand-Written SVG Histogram Chart */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-[320px]">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-auto overflow-visible select-none"
            role="img"
            aria-label={t('chartAriaLabel')}
          >
            {/* Background horizontal grid lines */}
            {[0, 0.5, 1].map((pct, idx) => {
              const y = height - paddingBottom - pct * plotHeight;
              return (
                <line
                  key={idx}
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke="#F0ECE4"
                  strokeWidth="1"
                />
              );
            })}

            {/* Baseline X-axis */}
            <line
              x1={paddingLeft}
              y1={height - paddingBottom}
              x2={width - paddingRight}
              y2={height - paddingBottom}
              stroke="#DDD6C8"
              strokeWidth="1.5"
            />

            {/* Early period histogram bars (Blue) */}
            {earlyBins.map((bin, i) => {
              const x = scaleX(bin.start);
              const barW = Math.max(2, (binSize / (maxVal - minVal)) * plotWidth - 2);
              const y = scaleY(bin.count);
              const barH = height - paddingBottom - y;
              return (
                <rect
                  key={`early-${i}`}
                  x={x}
                  y={y}
                  width={barW}
                  height={barH}
                  fill="#2563EB"
                  opacity="0.45"
                  rx="1.5"
                >
                  <title>{`2001-2012: ${bin.count} years in range`}</title>
                </rect>
              );
            })}

            {/* Late period histogram bars (Amber) */}
            {lateBins.map((bin, i) => {
              const x = scaleX(bin.start) + 2; // slightly offset for clarity
              const barW = Math.max(2, (binSize / (maxVal - minVal)) * plotWidth - 3);
              const y = scaleY(bin.count);
              const barH = height - paddingBottom - y;
              return (
                <rect
                  key={`late-${i}`}
                  x={x}
                  y={y}
                  width={barW}
                  height={barH}
                  fill="#D97706"
                  opacity="0.65"
                  rx="1.5"
                >
                  <title>{`2013-2025: ${bin.count} years in range`}</title>
                </rect>
              );
            })}

            {/* Early Median Line */}
            <line
              x1={earlyMedianX}
              y1={paddingTop - 6}
              x2={earlyMedianX}
              y2={height - paddingBottom}
              stroke="#1D4ED8"
              strokeWidth="2"
              strokeDasharray="4 3"
            />
            <text
              x={earlyMedianX}
              y={paddingTop - 12}
              textAnchor="middle"
              fontSize="10"
              fontWeight="bold"
              fill="#1D4ED8"
            >
              {lang === 'bn' ? `মধ্যক ${formatNumber(earlyMedian)}` : `Median ${earlyMedian}`}
            </text>

            {/* Late Median Line */}
            <line
              x1={lateMedianX}
              y1={paddingTop - 6}
              x2={lateMedianX}
              y2={height - paddingBottom}
              stroke="#B45309"
              strokeWidth="2"
              strokeDasharray="4 3"
            />
            <text
              x={lateMedianX}
              y={paddingTop - 12}
              textAnchor="middle"
              fontSize="10"
              fontWeight="bold"
              fill="#B45309"
            >
              {lang === 'bn' ? `মধ্যক ${formatNumber(lateMedian)}` : `Median ${lateMedian}`}
            </text>

            {/* Shift Annotation Arrow (if reliable shift exists) */}
            {reliable && Math.abs(lateMedianX - earlyMedianX) > 10 && (
              <g>
                <line
                  x1={earlyMedianX}
                  y1={paddingTop + 14}
                  x2={lateMedianX}
                  y2={paddingTop + 14}
                  stroke="#1C2B20"
                  strokeWidth="1.5"
                  markerEnd="url(#arrow)"
                />
                <circle cx={earlyMedianX} cy={paddingTop + 14} r="2.5" fill="#1C2B20" />
                <circle cx={lateMedianX} cy={paddingTop + 14} r="2.5" fill="#1C2B20" />
                <rect
                  x={(earlyMedianX + lateMedianX) / 2 - 32}
                  y={paddingTop + 4}
                  width="64"
                  height="16"
                  fill="#FAF8F5"
                  rx="3"
                  stroke="#DDD6C8"
                  strokeWidth="0.8"
                />
                <text
                  x={(earlyMedianX + lateMedianX) / 2}
                  y={paddingTop + 15}
                  textAnchor="middle"
                  fontSize="9"
                  fontWeight="bold"
                  fill="#1C2B20"
                >
                  +{formatNumber(shift_days)} {t('daysUnit')}
                </text>
              </g>
            )}

            {/* Ticks and calendar labels */}
            {ticks.map((t) => {
              const x = scaleX(t.day);
              return (
                <g key={t.day}>
                  <line
                    x1={x}
                    y1={height - paddingBottom}
                    x2={x}
                    y2={height - paddingBottom + 5}
                    stroke="#DDD6C8"
                    strokeWidth="1.5"
                  />
                  <text
                    x={x}
                    y={height - paddingBottom + 18}
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="500"
                    fill="#7C8B7F"
                  >
                    {lang === 'bn' ? t.labelBn : t.labelEn}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Accessible Plain-Text Summary */}
      <div className="mt-3 p-3 bg-[#FAF8F5] rounded-xl border border-[#DDD6C8] text-xs text-[#526356]">
        <p>
          <strong className="text-[#1C2B20] mr-1">
            {lang === 'bn' ? 'চার্টের সারসংক্ষেপ:' : 'Chart Summary:'}
          </strong>
          {t('distSummaryText', {
            days: shift_days,
            earlyMedian: `${formatDayOfSeason(earlyMedian, lang)} (${earlyMedian})`,
            lateMedian: `${formatDayOfSeason(lateMedian, lang)} (${lateMedian})`,
          })}
        </p>
      </div>
    </section>
  );
}
