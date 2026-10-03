import { MOCK_DATA } from '../data/mock.js';

/**
 * Set to false when connecting to the real backend service.
 * Instructions on how to connect the real backend are in the README.
 */
export const USE_MOCK = true;

/**
 * Fetch planting advisory for a given district and crop.
 * 
 * @param {string} district - Lowercase district ID (e.g., 'rajshahi', 'rangpur', 'khulna')
 * @param {string} crop - Lowercase crop ID (e.g., 'aman')
 * @returns {Promise<Object>} Advisory dataset matching the API contract
 */
export async function getAdvisory(district, crop = 'aman') {
  if (USE_MOCK) {
    // Simulate short network latency for smooth UI transitions
    await new Promise((resolve) => setTimeout(resolve, 320));

    const key = (district || '').toLowerCase();
    const data = MOCK_DATA[key];

    if (!data) {
      // District has no mock dataset yet (demonstrates unsupported/coming soon state)
      return {
        unsupported: true,
        district: district,
        crop: crop,
      };
    }

    return {
      ...data,
      unsupported: false,
    };
  }

  // Real backend integration
  const response = await fetch(`/advisory?district=${encodeURIComponent(district)}&crop=${encodeURIComponent(crop)}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch advisory: ${response.status} ${response.statusText}`);
  }
  return await response.json();
}
