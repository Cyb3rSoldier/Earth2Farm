/**
 * Statistical helpers for medians, intervals, and histogram bins.
 */

export function calculateMedian(numbers) {
  if (!numbers || numbers.length === 0) return 0;
  const sorted = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

/**
 * Convert day-of-season (days after June 1st) to calendar date string.
 * June has 30 days, July 31, Aug 31.
 */
export function formatDayOfSeason(dayNum, lang = 'en') {
  if (!dayNum && dayNum !== 0) return '';
  // day 0 = June 1
  const baseDate = new Date(2026, 5, 1); // June 1st
  baseDate.setDate(baseDate.getDate() + Math.round(dayNum));

  const monthEn = baseDate.toLocaleString('en-US', { month: 'short' });
  const day = baseDate.getDate();

  if (lang === 'bn') {
    const monthBnMap = {
      Jun: 'জুন',
      Jul: 'জুলাই',
      Aug: 'আগস্ট',
      Sep: 'সেপ্টেম্বর'
    };
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    const bnDay = String(day).replace(/[0-9]/g, (w) => bengaliDigits[+w]);
    return `${bnDay} ${monthBnMap[monthEn] || monthEn}`;
  }

  return `${monthEn} ${day}`;
}

/**
 * Compute histogram bins for distribution chart
 */
export function computeBins(dataPoints, binSize = 4, minVal = 10, maxVal = 44) {
  const bins = [];
  for (let start = minVal; start <= maxVal; start += binSize) {
    const end = start + binSize;
    const count = dataPoints.filter((val) => val >= start && val < end).length;
    bins.push({
      start,
      end,
      mid: (start + end) / 2,
      count
    });
  }
  return bins;
}
