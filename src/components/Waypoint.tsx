import React, { useRef, useEffect } from 'react';

const Waypoint = ({ onEnter }: { onEnter: () => void }) => {
  const el = useRef<HTMLDivElement>(null as any);
  const last = useRef<number>(-1);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (Date.now() - last.current > 500) {
          last.current = Date.now();
          onEnter();
        }
      }
    });
    observer.observe(el.current);
    return () => {
      observer.disconnect();
    };
  }, [onEnter]);
  return <div ref={el} />;
};

export default Waypoint;
