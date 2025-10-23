import React, { useRef, useEffect } from "react";

interface PinchZoomProps {
  children: React.ReactNode;
  maxScale?: number;
}

export const PinchZoom: React.FC<PinchZoomProps> = ({ children, maxScale = 3 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scale = useRef(1);
  const translate = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (lastDistance.current) {
          const delta = distance / lastDistance.current;
          scale.current = Math.min(maxScale, Math.max(1, scale.current * delta));
          container.style.transform = `scale(${scale.current}) translate(${translate.current.x}px, ${translate.current.y}px)`;
        }
        lastDistance.current = distance;
      }
    };

    const handleTouchEnd = () => (lastDistance.current = 0);
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY < 0 ? 1.1 : 0.9;
      scale.current = Math.min(maxScale, Math.max(1, scale.current * delta));
      container.style.transform = `scale(${scale.current}) translate(${translate.current.x}px, ${translate.current.y}px)`;
    };

    container.addEventListener("touchmove", handleTouchMove, { passive: false });
    container.addEventListener("touchend", handleTouchEnd);
    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
      container.removeEventListener("wheel", handleWheel);
    };
  }, [maxScale]);

  return (
    <div
      ref={containerRef}
      className="overflow-hidden touch-pan-y touch-pan-x"
      style={{
        transition: "transform 0.1s ease-out",
        transformOrigin: "center center",
      }}
    >
      {children}
    </div>
  );
};
