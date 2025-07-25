import React, { useEffect, useRef } from 'react';

interface StarBackgroundProps {
  starColor?: string;
}

function StarBackground({ starColor }: StarBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Array<{x: number, y: number, r: number, dx: number, dy: number}>>([]);
  const animationIdRef = useRef<number>(1);
  const currentStarColorRef = useRef<string>('white');

  // Update the current color ref when starColor changes
  useEffect(() => {
    currentStarColorRef.current = starColor || 'white';
  }, [starColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize stars only once
    if (starsRef.current.length === 0) {
      starsRef.current = Array.from({ length: 100 }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.5 + 0.5,
        dx: (Math.random() - 0.5) * 0.2,
        dy: (Math.random() - 0.5) * 0.2,
      }));
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Use the current star color from the ref (this will be updated dynamically)
      ctx.fillStyle = currentStarColorRef.current;
      
      starsRef.current.forEach((star) => {
        star.x += star.dx;
        star.y += star.dy;

        // wrap around screen
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
        ctx.fill();
      });

      animationIdRef.current = requestAnimationFrame(animate);
    };

    resize();
    animate();

    window.addEventListener('resize', resize);
    
    return () => {
      window.removeEventListener('resize', resize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 z-0 pointer-events-none"
      style={{ width: '100%', height: '100%' }}
    />
  );
}

export default StarBackground;