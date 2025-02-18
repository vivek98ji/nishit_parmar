import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { usePageLoad } from '@/hooks/usePageLoad';

const LoadingBar = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);  // Changed initial state to false
  const [opacity, setOpacity] = useState(1);
  const [progress, setProgress] = useState(0);
  const loadingTimer = useRef<NodeJS.Timeout | null>(null);
  const progressTimer = useRef<NodeJS.Timeout | null>(null);
  const startTime = useRef(Date.now());
  const showLoaderTimeout = useRef<NodeJS.Timeout | null>(null);

  const MIN_LOADING_TIME = 2000;      // Minimum time the loader should show
  const LOADER_DELAY = 300;           // Delay before showing loader
  const PROGRESS_INTERVAL = 50;
  const pageLoaded = usePageLoad();

  useEffect(() => {
    const simulateProgress = () => {
      setProgress(prev => {
        if (prev < 90) {
          if (prev < 30) return prev + 1.2;
          if (prev < 60) return prev + 0.8;
          return prev + 0.3;
        }
        return prev;
      });
    };

    const hideLoader = () => {
      const elapsedTime = Date.now() - startTime.current;
      const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime);

      setTimeout(() => {
        setProgress(100);
        setTimeout(() => {
          setOpacity(0);
          setTimeout(() => setLoading(false), 300);
        }, 200);
      }, remainingTime);
    };

    const handleStart = () => {
      // Clear any existing timers
      if (showLoaderTimeout.current) clearTimeout(showLoaderTimeout.current);
      if (progressTimer.current) clearInterval(progressTimer.current);
      if (loadingTimer.current) clearTimeout(loadingTimer.current);

      startTime.current = Date.now();
      setProgress(0);

      // Only show loader if navigation takes longer than LOADER_DELAY
      showLoaderTimeout.current = setTimeout(() => {
        setLoading(true);
        setOpacity(1);
        progressTimer.current = setInterval(simulateProgress, PROGRESS_INTERVAL);
      }, LOADER_DELAY);
    };

    const handleComplete = () => {
      if (showLoaderTimeout.current) {
        clearTimeout(showLoaderTimeout.current);
      }

      if (loading) {
        hideLoader();
      }
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      if (showLoaderTimeout.current) clearTimeout(showLoaderTimeout.current);
      if (loadingTimer.current) clearTimeout(loadingTimer.current);
      if (progressTimer.current) clearInterval(progressTimer.current);
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router, loading, pageLoaded]);

  if (!loading) return null;

  return (
    <div 
      className="fixed top-0 left-0 w-full h-full loading-container flex flex-col items-center justify-center z-[9999] transition-opacity duration-500"
      style={{ opacity }}
    >
      <div className="relative w-32 h-32 mb-8">
        <Image
          src="/logo.png"
          alt="Loading..."
          width={128}
          height={128}
          priority
          className="object-contain logo-pulse"
        />
      </div>
      <div className="w-64 bg-gray-100 rounded-full h-2 mb-4 overflow-hidden">
        <div
          className="progress-bar"
          style={{
            width: `${progress}%`,
            transition: 'width 0.3s ease-out',
          }}
        />
      </div>
    </div>
  );
};

export default LoadingBar;
