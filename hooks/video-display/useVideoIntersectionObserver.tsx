import { useEffect, RefObject } from "react";

/**
 * Custom hook to handle video play/pause based on viewport intersection.
 * Plays video when in viewport, pauses when out of viewport.
 * 
 * @param videoRef - Reference to the video element
 * @param threshold - Intersection threshold (default: 0.5)
 */
export const useVideoIntersectionObserver = (
  videoRef: RefObject<HTMLVideoElement>,
  threshold: number = 0.5
) => {
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold,
    };

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          if (videoRef.current?.paused) {
            videoRef.current.play().catch(() => {
              // Silently handle autoplay failures
            });
          }
        } else {
          if (videoRef.current && !videoRef.current.paused) {
            videoRef.current.pause();
          }
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);
    const currentVideo = videoRef.current;
    
    if (currentVideo) {
      observer.observe(currentVideo);
    }

    return () => {
      if (currentVideo) {
        observer.unobserve(currentVideo);
      }
      observer.disconnect();
    };
  }, [videoRef, threshold]);
};
