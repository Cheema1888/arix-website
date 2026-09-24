"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

interface VBotSpeechBubbleProps {
  message?: string;
  typingDelayMs?: number;
  typingSpeedMs?: number;
}

export function VBotSpeechBubble({
  message = "Hi, I'm V",
  typingDelayMs = 640,
  typingSpeedMs = 45,
}: VBotSpeechBubbleProps) {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!mounted) return;
    const typingTimer = setTimeout(() => {
      setIsTyping(true);

      let currentIndex = 0;
      const typeInterval = setInterval(() => {
        currentIndex++;
        setDisplayedText(message.slice(0, currentIndex));
        if (currentIndex >= message.length) {
          clearInterval(typeInterval);
          setIsTyping(false);
        }
      }, typingSpeedMs);

      return () => clearInterval(typeInterval);
    }, typingDelayMs);

    return () => clearTimeout(typingTimer);
  }, [mounted, message, typingDelayMs, typingSpeedMs]);

  if (!mounted) return null;

  return (
    <div
      className="vbot-speech-bubble"
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      {/* 4 curved, same-sized high-quality matrix dots appearing sequentially from left to right */}
      <svg
        className="vbot-speech-tail desktop-only"
        viewBox="0 0 144 88"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <g className="vbot-matrix-dot dot-1">
          <circle cx="12" cy="12" r="5.5" className="vbot-dot-ring" />
          <circle cx="12" cy="12" r="2.2" className="vbot-dot-core" />
        </g>
        <g className="vbot-matrix-dot dot-2">
          <circle cx="52" cy="34" r="5.5" className="vbot-dot-ring" />
          <circle cx="52" cy="34" r="2.2" className="vbot-dot-core" />
        </g>
        <g className="vbot-matrix-dot dot-3">
          <circle cx="90" cy="50" r="5.5" className="vbot-dot-ring" />
          <circle cx="90" cy="50" r="2.2" className="vbot-dot-core" />
        </g>
        <g className="vbot-matrix-dot dot-4">
          <circle cx="130" cy="70" r="5.5" className="vbot-dot-ring" />
          <circle cx="130" cy="70" r="2.2" className="vbot-dot-core" />
        </g>
      </svg>
      {/* Mobile downward matrix dots */}
      <svg
        className="vbot-speech-tail mobile-only"
        viewBox="0 0 24 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <g className="vbot-matrix-dot dot-1">
          <circle cx="12" cy="10" r="5.5" className="vbot-dot-ring" />
          <circle cx="12" cy="10" r="2.2" className="vbot-dot-core" />
        </g>
        <g className="vbot-matrix-dot dot-2">
          <circle cx="12" cy="32" r="5.5" className="vbot-dot-ring" />
          <circle cx="12" cy="32" r="2.2" className="vbot-dot-core" />
        </g>
        <g className="vbot-matrix-dot dot-3">
          <circle cx="12" cy="54" r="5.5" className="vbot-dot-ring" />
          <circle cx="12" cy="54" r="2.2" className="vbot-dot-core" />
        </g>
      </svg>
      <div className="vbot-bubble-pill">
        <div className="vbot-bubble-content">
          <span className="vbot-bubble-text">{displayedText}</span>
          <span className={`vbot-bubble-cursor ${isTyping ? "typing" : ""}`} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
