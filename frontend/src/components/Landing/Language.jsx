import React, { useEffect } from "react";
import { getLanguageFromState } from "../../utils/stateToLanguage";

const GoogleTranslate = ({ defaultState }) => {
  useEffect(() => {
    // Set default language from user's state or saved preference (before script loads)
    let langCode = localStorage.getItem("preferredLang");
    if (!langCode && defaultState) {
      langCode = getLanguageFromState(defaultState);
      if (langCode) localStorage.setItem("preferredLang", langCode);
    }
    if (langCode) {
      document.cookie = `googtrans=/en/${langCode};path=/;max-age=31536000`;
    }

    const applyLanguage = (code) => {
      if (!code) return;
      document.cookie = `googtrans=/en/${code};path=/;max-age=31536000`;
      const sel = document.querySelector(".goog-te-combo");
      if (sel) {
        try {
          sel.value = code;
          sel.dispatchEvent(new Event("change", { bubbles: true }));
        } catch (_) {}
      }
    };

    window.googleTranslateInit = () => {
      if (!window.google?.translate?.TranslateElement) {
        setTimeout(window.googleTranslateInit, 100);
      } else {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,hi,pa,sa,mr,ur,bn,ta,te,kn,ml,gu,or,as,ne,si,bo,ks",
            layout: window.google.translate.TranslateElement.InlineLayout.HORIZONTAL,
            autoDisplay: false,
          },
          "google_element"
        );
        if (langCode) {
          setTimeout(() => applyLanguage(langCode), 500);
        }
      }
    };

    const loadGoogleTranslateScript = () => {
      if (!document.getElementById("google_translate_script")) {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateInit";
        script.id = "google_translate_script";
        document.body.appendChild(script);
      }
    };

    loadGoogleTranslateScript();
    if (window.google && window.google.translate) {
      window.googleTranslateInit();
    }
  }, [defaultState]);

  return (
    <div className="flex items-center gap-1">

      <div id="google_element" className="google-translate-container">
        <style jsx global>{`
          .goog-te-gadget { font-size: 0 !important; color: transparent !important; }
          .goog-te-gadget .goog-te-combo {
            margin: 0 !important;
            background-color: white; /* White background */
            border: 1px solid black;
            border-radius: 0.5rem; /* Slightly more rounded */
            padding: 0.5rem 0.2rem; /* Tailwind: p-2 */
            font-size: 0.8rem; /* Tailwind: text-sm */
            transition: all 0.3s ease; /* Smooth transition */
            color: black; /* Black text */
            font-weight: 500; /* Tailwind: font-medium */
            font-size: 13px !important;
            font-weight: 600 !important;
            color: #334155 !important;
            cursor: pointer;
            outline: none !important;
            width: 135px !important; /* Mobile fixed width */
          }
          .goog-logo-link, .goog-te-gadget span, .goog-te-banner-frame, #goog-gt-tt {
            display: none !important;
          }
          body { top: 0 !important; }
          .skiptranslate > iframe { display: none !important; }
        `}</style>
      </div>
    </div>
  );
};

export default GoogleTranslate;