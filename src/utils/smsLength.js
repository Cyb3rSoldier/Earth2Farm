/**
 * SMS length calculation and encoding segment analysis.
 * GSM-7 supports 160 characters per single SMS (153 for multi-part).
 * Unicode (UCS-2) supports 70 characters per single SMS (67 for multi-part).
 */

const GSM_7_REGEX = /^[@£$¥èéùìòÇ\r\nØø\r\nÅåΔ_ΦΓΛΩΠΨΣΘΞ\x1bÆæßÉ !\"#¤%&'()*+,\-.\/0-9:;<=>?¡A-ZÄÖÑÜ§¿a-zäöñüà]*$/;

export function analyzeSms(text = '') {
  const length = text.length;
  const isGsm7 = GSM_7_REGEX.test(text);

  let maxSingleSegment = isGsm7 ? 160 : 70;
  let maxMultiSegment = isGsm7 ? 153 : 67;

  let segments = 0;
  if (length === 0) {
    segments = 0;
  } else if (length <= maxSingleSegment) {
    segments = 1;
  } else {
    segments = Math.ceil(length / maxMultiSegment);
  }

  return {
    length,
    isGsm7,
    encoding: isGsm7 ? 'GSM-7' : 'Unicode (UCS-2)',
    segments,
    maxPerSegment: segments > 1 ? maxMultiSegment : maxSingleSegment,
  };
}
