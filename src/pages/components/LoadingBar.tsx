import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

const LoadingBar = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Start as true for initial load
  const [opacity, setOpacity] = useState(1);
  const loadingTimer = useRef<NodeJS.Timeout | null>(null);
  const MIN_LOADING_TIME = 800; // Adjust as needed

  useEffect(() => {
    // Hide loader after initial load
    loadingTimer.current = setTimeout(() => {
      setOpacity(0);
      setTimeout(() => setLoading(false), 500);
    }, MIN_LOADING_TIME);

    const handleStart = () => {
      setLoading(true);
      setOpacity(1);
    };

    const handleComplete = () => {
      setOpacity(0);
      setTimeout(() => setLoading(false), 500);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      if (loadingTimer.current) clearTimeout(loadingTimer.current);
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  if (!loading) return null;

  return (
    <div 
      className="fixed top-0 left-0 w-full h-full bg-white flex flex-col items-center justify-center z-[9999] transition-opacity duration-500"
      style={{ opacity }}
    >
      <div className="relative w-64 h-64 mb-8">
        <Image
          src="/logo.png"
          alt="Loading..."
          width={256}
          height={256}
          priority
          className="object-contain"
        />
      </div>
      <div className="w-64 h-3 bg-gray-200 rounded-full overflow-hidden">
        <div className="loading-bar" />
      </div>
    </div>
  );
};

export default LoadingBar;
