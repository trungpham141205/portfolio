import React, { useEffect, useRef } from 'react';

const seededRandom = (seed) => {
  const value = Math.sin(seed * 999.91) * 43758.5453;
  return value - Math.floor(value);
};

const CosmicScene = ({ page }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frameId;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const particles = Array.from({ length: 180 }, (_, index) => ({
      angle: seededRandom(index + 1) * Math.PI * 2,
      radius: 90 + seededRandom(index + 11) * 390,
      size: 0.35 + seededRandom(index + 31) * 1.45,
      speed: 0.02 + seededRandom(index + 71) * 0.09,
      alpha: 0.12 + seededRandom(index + 91) * 0.52,
      drift: seededRandom(index + 121) * 70 - 35,
    }));

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time = 0) => {
      const seconds = time / 1000;
      const isHome = page === 'home';
      const compact = width < 760;
      const centerX = compact ? width * 0.68 : width * (isHome ? 0.72 : 0.82);
      const centerY = compact ? height * 0.34 : height * (isHome ? 0.47 : 0.3);
      const radius = Math.min(compact ? width * 0.24 : width * 0.13, 180);

      context.clearRect(0, 0, width, height);

      const aurora = context.createRadialGradient(0, 0, 0, 0, 0, Math.max(width, height) * 0.7);
      aurora.addColorStop(0, 'rgba(52, 55, 85, 0.2)');
      aurora.addColorStop(0.35, 'rgba(24, 55, 52, 0.07)');
      aurora.addColorStop(1, 'rgba(0, 0, 0, 0)');
      context.fillStyle = aurora;
      context.fillRect(0, 0, width, height);

      particles.forEach((particle, index) => {
        const motion = reduceMotion ? 0 : seconds * particle.speed;
        const x = centerX + Math.cos(particle.angle + motion) * particle.radius;
        const y = centerY + Math.sin(particle.angle + motion) * particle.radius * 0.72
          + Math.sin(seconds * 0.15 + index) * particle.drift;
        const distanceFade = Math.max(0.15, 1 - particle.radius / 570);

        context.beginPath();
        context.arc(x, y, particle.size, 0, Math.PI * 2);
        context.fillStyle = `rgba(${index % 5 === 0 ? '170, 153, 220' : '205, 220, 211'}, ${particle.alpha * distanceFade})`;
        context.fill();
      });

      context.save();
      context.translate(centerX, centerY);
      context.rotate(reduceMotion ? -0.12 : -0.12 + Math.sin(seconds * 0.15) * 0.035);

      const glow = context.createRadialGradient(0, 0, radius * 0.35, 0, 0, radius * 1.7);
      glow.addColorStop(0, 'rgba(0, 0, 0, 0)');
      glow.addColorStop(0.55, 'rgba(52, 55, 85, 0.18)');
      glow.addColorStop(0.72, 'rgba(112, 174, 184, 0.08)');
      glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      context.fillStyle = glow;
      context.beginPath();
      context.arc(0, 0, radius * 1.8, 0, Math.PI * 2);
      context.fill();

      for (let ring = 0; ring < 7; ring += 1) {
        const ringRadius = radius + ring * 4.5;
        context.beginPath();
        context.ellipse(0, 0, ringRadius, ringRadius * 0.86, 0, 0, Math.PI * 2);
        context.strokeStyle = ring % 2
          ? `rgba(184, 112, 180, ${0.28 - ring * 0.025})`
          : `rgba(113, 196, 202, ${0.34 - ring * 0.028})`;
        context.lineWidth = ring === 0 ? 1.4 : 0.7;
        context.stroke();
      }

      context.rotate(reduceMotion ? 0 : seconds * 0.025);
      context.beginPath();
      for (let point = 0; point < 6; point += 1) {
        const angle = (Math.PI * 2 * point) / 6 - Math.PI / 2;
        const x = Math.cos(angle) * radius * 0.45;
        const y = Math.sin(angle) * radius * 0.45;
        if (point === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      }
      context.closePath();
      context.strokeStyle = 'rgba(255, 255, 255, 0.72)';
      context.lineWidth = 1;
      context.stroke();

      context.beginPath();
      context.moveTo(0, -radius * 0.45);
      context.lineTo(radius * 0.22, 0);
      context.lineTo(0, radius * 0.45);
      context.lineTo(-radius * 0.22, 0);
      context.closePath();
      context.strokeStyle = 'rgba(255, 255, 255, 0.34)';
      context.stroke();
      context.restore();

      if (!reduceMotion) frameId = window.requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      window.cancelAnimationFrame(frameId);
    };
  }, [page]);

  return <canvas ref={canvasRef} className="cosmic-scene" aria-hidden="true" />;
};

export default CosmicScene;
