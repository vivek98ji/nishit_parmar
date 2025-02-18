import { useState, useEffect } from 'react';

export const usePageLoad = () => {
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      const images = document.getElementsByTagName('img');
      let loadedImages = 0;
      const totalImages = images.length;

      if (totalImages === 0) {
        setPageLoaded(true);
        return;
      }

      const imageLoaded = () => {
        loadedImages++;
        if (loadedImages === totalImages) {
          setPageLoaded(true);
        }
      };

      Array.from(images).forEach(img => {
        if (img.complete) {
          imageLoaded();
        } else {
          img.addEventListener('load', imageLoaded);
          img.addEventListener('error', imageLoaded);
        }
      });
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return pageLoaded;
};
