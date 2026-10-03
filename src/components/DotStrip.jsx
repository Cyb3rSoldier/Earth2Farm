import React from 'react';
import { formatDayOfSeason } from '../utils/stats.js';
import { useI18n } from '../i18n/useI18n.jsx';

/**
 * Hand-written inline SVG Dot-Strip component.
 * Displays yearly observations on an x-axis representing day of season (e.g. Day 10 to Day 70).
 */
export default function DotStrip({
  data = [],
  color = '#2E5E3E',
  label = '',
  minDay = 10,
  maxDay = 75,
  height = 48
}) {
  const { lang, formatNumber } = useI18n();

  // SVG dimensions
  const width = 360;
  const paddingX = 24;
  const plotWidth = width - paddingX * 2;
  const centerY = height / 2;

  const scaleX = (day) => {
    const clamped = Math.max(minDay, Math.min(maxDay, day));
    return paddingX + ((clamped - minDay) / (maxDay - minDay)) * plotWidth;
  };

  // Generate reference tick marks (June 15 ~ Day 15, July 1 ~ Day 31, July 15 ~ Day 45, Aug 1 ~ Day 62)
  const ticks = [
    { day: 15, labelEn: 'Jun 15', labelBn: '১৫ জুন' },
    { day: 31, labelEn: 'Jul 1', labelBn: '১ জুলাই' },
    { day: 45, labelEn: 'Jul 15', labelBn: '১৫ জুলাই' },
    { day: 62, labelEn: 'Aug 1', labelBn: '১ আগস্ট' },
  ];

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${width} ${height + 20}`}
        className="w-full h-auto overflow-visible select-none"
        role="img"
        aria-label={`${label} timeline dot plot`}
      >
        {/* Baseline track */}
        <line
          x1={paddingX}
          y1={centerY}
          x2={width - paddingX}
          y2={centerY}
          stroke="#E4DDD0"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Ticks and calendar labels */}
        {ticks.map((t) => {
          const x = scaleX(t.day);
          return (
            <g key={t.day}>
              <line
                x1={x}
                y1={centerY - 4}
                x2={x}
                y2={centerY + 4}
                stroke="#C5BCAD"
                strokeWidth="1.5"
              />
              <text
                x={x}
                y={centerY + 16}
                textAnchor="middle"
                fontSize="9"
                fontWeight="500"
                fill="#7C8B7F"
              >
                {lang === 'bn' ? t.labelBn : t.labelEn}
              </text>
            </g>
          );
        })}

        {/* Observation Dots with year tooltips */}
        {data.map((item, idx) => {
          const cx = scaleX(item.day_of_season);
          const isRecent = item.year >= 2020;
          return (
            <g key={item.year || idx} className="cursor-pointer group">
              <circle
                cx={cx}
                cy={centerY}
                r={isRecent ? 4.5 : 3.5}
                fill={color}
                opacity={isRecent ? 0.95 : 0.65}
                stroke="#FFFFFF"
                strokeWidth="1.2"
                className="transition-all hover:scale-150"
              >
                <title>
                  {`${item.year}: ${formatDayOfSeason(item.day_of_season, lang)} (Day ${formatNumber(item.day_of_season)})`}
                </title>
              </circle>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
