import { useModule } from '@/app/core/context/module';
import React, { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';

function StarBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Array<{ x: number, y: number, r: number, dx: number, dy: number }>>([]);
  const animationIdRef = useRef<number>(1);
  const currentStarColorRef = useRef<string>('#7d7e81ff');
  const { module, setModule } = useModule();

  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');

  // Update the current color ref when starColor changes
  useEffect(() => {
    currentStarColorRef.current = module?.gradient || '#7d7e81ff';
  }, [module?.gradient]);

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
        r: Math.random() * 3 + 0.5, // RADIUS
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
    <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
      {/* Custom gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 20% 80%, rgba(40, 60, 150, 0.5) 0%, rgba(20, 30, 70, 0.0) 50%), radial-gradient(circle at 80% 20%, rgba(120, 60, 140, 0.4) 0%, rgba(30, 20, 60, 0.0) 60%), linear-gradient(135deg, #0f0f2d 0%, #1a1240 100%)`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
          backgroundBlendMode: 'screen'
        }}
      />
      {/* Canvas for stars */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}

export default StarBackground;