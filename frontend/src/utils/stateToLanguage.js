// Indian state to Google Translate language code mapping
// Format: Google uses 2-letter codes (hi=Hindi, ta=Tamil, etc.)
export const STATE_TO_LANGUAGE = {
  'Andhra Pradesh': 'te',      // Telugu
  'Arunachal Pradesh': 'hi',   // Multiple - default Hindi
  'Assam': 'as',               // Assamese
  'Bihar': 'hi',               // Hindi
  'Chhattisgarh': 'hi',        // Hindi
  'Goa': 'mr',                 // Marathi (Konkani not in GT)
  'Gujarat': 'gu',             // Gujarati
  'Haryana': 'hi',             // Hindi
  'Himachal Pradesh': 'hi',    // Hindi
  'Jharkhand': 'hi',           // Hindi
  'Karnataka': 'kn',           // Kannada
  'Kerala': 'ml',              // Malayalam
  'Madhya Pradesh': 'hi',      // Hindi
  'Maharashtra': 'mr',         // Marathi
  'Manipur': 'hi',             // Manipuri not in GT - Hindi
  'Meghalaya': 'hi',           // Khasi - Hindi
  'Mizoram': 'hi',             // Mizo - Hindi
  'Nagaland': 'hi',            // Hindi
  'Odisha': 'or',              // Odia
  'Punjab': 'pa',              // Punjabi
  'Rajasthan': 'hi',           // Hindi
  'Sikkim': 'ne',              // Nepali
  'Tamil Nadu': 'ta',          // Tamil
  'Telangana': 'te',           // Telugu
  'Tripura': 'bn',             // Bengali
  'Uttar Pradesh': 'hi',       // Hindi
  'Uttarakhand': 'hi',         // Hindi
  'West Bengal': 'bn',         // Bengali
};

export const getLanguageFromState = (state) => {
  if (!state) return null;
  return STATE_TO_LANGUAGE[state] || null;
};
