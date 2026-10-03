/**
 * Web Speech API wrapper for read-aloud advisory in English or Bengali.
 */

let activeUtterance = null;

export function isSpeechSupported() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
}

export function stopSpeaking() {
  if (isSpeechSupported()) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // ignore
    }
  }
  activeUtterance = null;
}

export function speakText(text, lang = 'en', onStart, onEnd, onError) {
  if (!isSpeechSupported()) {
    if (onError) onError('Speech synthesis not supported');
    return false;
  }

  // Cancel any ongoing speech
  stopSpeaking();

  const utterance = new SpeechSynthesisUtterance(text);
  activeUtterance = utterance;

  // Language mapping
  utterance.lang = lang === 'bn' ? 'bn-BD' : 'en-US';
  utterance.rate = lang === 'bn' ? 0.9 : 0.95; // Slightly slower for clarity
  utterance.pitch = 1.0;

  // Try to find a matching voice if voices are loaded
  const voices = window.speechSynthesis.getVoices();
  const targetPrefix = lang === 'bn' ? 'bn' : 'en';
  const matchingVoice = voices.find(
    (v) => v.lang.toLowerCase().startsWith(targetPrefix) || v.lang.toLowerCase().includes(targetPrefix)
  );
  if (matchingVoice) {
    utterance.voice = matchingVoice;
  }

  utterance.onstart = () => {
    if (onStart) onStart();
  };

  utterance.onend = () => {
    activeUtterance = null;
    if (onEnd) onEnd();
  };

  utterance.onerror = (e) => {
    activeUtterance = null;
    if (onError) onError(e);
  };

  try {
    window.speechSynthesis.speak(utterance);
    return true;
  } catch (err) {
    if (onError) onError(err);
    return false;
  }
}
