import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, useLocation } from 'react-router';
import { Sparkles } from 'lucide-react';
import { useGlobalStore } from '../store';

export function WelcomeVideoPopup() {
  const { welcomeVideoConfig } = useGlobalStore();
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoError, setVideoError] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  // Check if popup should open on initial mount
  useEffect(() => {
    if (!welcomeVideoConfig?.isPopupEnabled) {
      setIsOpen(false);
      return;
    }

    // Do not show visitor popup over the internal admin dashboard
    if (location.pathname === '/admin') {
      setIsOpen(false);
      return;
    }

    const dismissed = sessionStorage.getItem('gullg_welcome_video_seen');
    if (!dismissed) {
      setIsOpen(true);
    }
  }, [welcomeVideoConfig?.isPopupEnabled, location.pathname]);

  // Handle Autoplay attempt
  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.muted = welcomeVideoConfig?.muted ?? true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setVideoError(false);
          })
          .catch((err) => {
            console.warn('Autoplay prevented or video loading interrupted:', err);
            // Fallback: try muted autoplay if unmuted was rejected by browser policy
            if (videoRef.current) {
              videoRef.current.muted = true;
              videoRef.current.play().catch(() => {});
            }
          });
      }
    }
  }, [isOpen, welcomeVideoConfig?.popupVideoSource, welcomeVideoConfig?.muted]);

  // Lock body scroll and prevent background clicks when popup is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape' || e.key === ' ') {
          handleClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('gullg_welcome_video_seen', 'true');
    if (videoRef.current) {
      videoRef.current.pause();
    }
    // Always route to the Home Page ('/') upon skipping or finishing
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  const handleVideoEnded = () => {
    if (welcomeVideoConfig?.closeOnEnd !== false) {
      handleClose();
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const cur = videoRef.current.currentTime;
      const dur = videoRef.current.duration || 1;
      setProgress((cur / dur) * 100);
    }
  };

  if (!welcomeVideoConfig?.isPopupEnabled || location.pathname === '/admin') {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="welcome-video-popup"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4, ease: 'easeInOut' } }}
          onClick={handleClose}
          className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-xl sm:backdrop-blur-2xl cursor-pointer select-none"
          role="dialog"
          aria-modal="true"
          aria-label="Welcome Video"
        >
          {/* Subtle Ambient Background Light Glow */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
            <div className="w-[500px] h-[500px] bg-indigo-500/15 rounded-full blur-[140px] animate-pulse" />
          </div>

          {/* 9:16 Aspect Ratio Borderless Video Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 15, transition: { duration: 0.3 } }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={handleClose}
            className="relative h-[86vh] max-h-[780px] aspect-[9/16] max-w-[94vw] bg-black rounded-3xl overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.95)] flex flex-col cursor-pointer border-0 ring-0 group"
          >
            {/* Top Bar Floating Branding Badge */}
            <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 via-black/30 to-transparent pointer-events-none">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-black/60 backdrop-blur-md p-1 flex items-center justify-center shadow-md">
                  <img src="/logo.png" alt="GullG Logo" className="w-full h-full object-contain" />
                </div>
                <span className="text-white text-xs font-bold tracking-wide flex items-center gap-1">
                  <Sparkles size={12} className="text-indigo-400" />
                  GullG
                </span>
              </div>
            </div>

            {/* Video Player (9:16 borderless, audio controlled by admin config) */}
            <div className="relative w-full h-full flex items-center justify-center bg-black overflow-hidden">
              <video
                ref={videoRef}
                src={welcomeVideoConfig.popupVideoSource || '/video/GullG-Technologies.mp4'}
                autoPlay={welcomeVideoConfig.autoPlay ?? true}
                muted={welcomeVideoConfig.muted ?? true}
                playsInline
                preload="auto"
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleVideoEnded}
                onError={() => setVideoError(true)}
                className="w-full h-full object-cover bg-black"
              />

              {/* Video Error Fallback */}
              {videoError && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-900/95 p-6 text-center">
                  <h4 className="text-white text-base font-bold mb-1">Welcome to GullG</h4>
                  <p className="text-slate-400 text-xs max-w-xs mb-4">
                    Click anywhere to enter the website.
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Floating Hint & Progress Bar */}
            <div className="absolute bottom-0 inset-x-0 z-20 p-4 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col gap-2.5">
              {/* Subtle Skip on Click Prompt */}
              <div className="text-center">
                <span className="inline-block px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-[11px] text-white/75 font-medium tracking-wide">
                  Tap anywhere to continue to home page
                </span>
              </div>

              {/* Thin Progress Indicator */}
              <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
