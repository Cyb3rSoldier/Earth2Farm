# Earth2Farm

**Planting-Window Advisory for Bangladeshi Rice Farmers Adapting to Climate Shifts using NASA Satellite Data.**

Developed for **NASA Space Apps Challenge 2026** (Challenge 7: *"Field Shift: Adapting Farms with NASA Data"*).

---

## 🌾 Overview

Monsoon rain onset across Bangladesh has experienced significant temporal shifts over the past 25 years. Farmers relying on fixed traditional calendar dates face higher risks of seedling desiccation or heat stress during critical flowering stages.

**Earth2Farm** provides a localized planting-window advisory by:
1. Identifying historical monsoon rainfall onset shifts using **NASA POWER** daily precipitation (2001–2025).
2. Cross-verifying rain arrival against root-zone soil saturation using **NASA SMAP** soil moisture records (2015–2025).
3. Confirming historical regional crop response using **NASA MODIS NDVI** 16-day vegetation green-up data.
4. Delivering **ONE clear, actionable advisory sentence** in natural farmer-friendly Bangla or English, paired with a traffic-light indicator, confidence level, voice readout, SMS template generator, and printable village bulletin cards.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (version 18 or later)
- npm or bun

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
The application will launch on `http://localhost:3000`.

### Production Build
```bash
npm run build
```

---

## 🔌 How to Connect the Real Backend

Earth2Farm includes a clean separation between the user interface and the satellite advisory analysis engine.

To connect your live compute pipeline or backend API:

1. Open `src/api/advisory.js`.
2. Change the `USE_MOCK` flag from `true` to `false`:
   ```javascript
   export const USE_MOCK = false;
   ```
3. Ensure your backend service serves the `/advisory` endpoint matching the API contract:
   ```http
   GET /advisory?district={district}&crop={crop}
   ```
   Example response payload:
   ```json
   {
     "district": "Rajshahi",
     "crop": "Aman Rice",
     "shift_days": 14,
     "ci_low": 9,
     "ci_high": 19,
     "p_value": 0.003,
     "test_stat": 42.5,
     "confidence": "high",
     "reliable": true,
     "periods": { "early": "2001-2012", "late": "2013-2025" },
     "onset_by_year": [{ "year": 2001, "day_of_season": 16 }],
     "soil_ready_by_year": [{ "year": 2015, "day_of_season": 35 }],
     "greenup_by_year": [{ "year": 2001, "day_of_season": 48 }],
     "rain_to_soil_lag_days": { "early": null, "late": 6 },
     "sensitivity": [{ "label": "Threshold 20 mm", "shift_days": 14 }],
     "heat_risk": [{ "week_label": "Jul 20 - Jul 26", "share_of_years_hit": 18 }],
     "assumptions": ["Lowland Aman rice requires >40% soil moisture saturation."],
     "provenance": [
       { "dataset": "NASA POWER", "product": "Daily Precipitation", "version": "v2.0", "url": "https://power.larc.nasa.gov", "retrieved": "2026-09-15" }
     ],
     "advisory": {
       "en": "Shift transplanting 14 days later...",
       "bn": "চারা রোপণ ১৪ দিন পিছিয়ে দিন..."
     },
     "sms": {
       "en": "Earth2Farm Rajshahi: Shift Aman rice transplanting 14 days later...",
       "bn": "আর্থ২ফার্ম রাজশাহী: আমন ধান রোপণ ১৪ দিন পেছান..."
     },
     "baseline_window": { "start_label": "July 6", "end_label": "July 22" },
     "shifted_window": { "start_label": "July 20", "end_label": "August 5" },
     "grid_note": "NASA POWER resolution is ~0.5° (~50km); SMAP is at 9km."
   }
   ```
4. If running a reverse proxy or local Express/FastAPI server, configure your proxy in `vite.config.ts` or set the API base URL in your `.env`.

---

## 🛰️ NASA Earth Observation Datasets Used
- **NASA POWER (Prediction Of Worldwide Energy Resources)**: Daily surface precipitation (MERRA-2 assimilation) from 2001–2025.
- **NASA SMAP (Soil Moisture Active Passive)**: L4 global surface and root-zone soil moisture (9 km resolution) from 2015–2025.
- **NASA MODIS (Moderate Resolution Imaging Spectroradiometer)**: Terra MOD13Q1 250m 16-day vegetation indices (NDVI) for crop green-up timing.

---

## ♿ Accessibility & Design Features
- **Bangla & English**: Dynamic localization covering 100% of UI strings, charts, legends, and printed cards.
- **Farmer "Simple Mode"**: Strips technical complexity down to big-type advice, audio playback, and a village card.
- **Zero Heavy Dependencies**: Pure React 18, Tailwind CSS, hand-crafted inline SVG charts (no chart libraries).
- **Web Speech Synthesis**: Voice read-aloud in Bengali or English.
- **Single-Page Print Optimization**: Tailored CSS for clean village notice-board printing.
