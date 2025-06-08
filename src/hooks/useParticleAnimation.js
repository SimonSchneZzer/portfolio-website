import { useRef, useEffect, useMemo, useCallback } from 'react';
import {
  PARTICLE_COUNT,
  COLORS,
  PARTICLE_SPEED,
  PARTICLE_SIZE,
  CONNECTION_DISTANCE,
  PARTICLE_OPACITY,
  CONNECTION_OPACITY
} from '../config/particleConfig';

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

function createParticle(width, height) {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: randomBetween(PARTICLE_SPEED.MIN, PARTICLE_SPEED.MAX),
    vy: randomBetween(PARTICLE_SPEED.MIN, PARTICLE_SPEED.MAX),
    radius: randomBetween(PARTICLE_SIZE.MIN, PARTICLE_SIZE.MAX),
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  };
}

export function useParticleAnimation(canvasRef) {
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef(null);

  // Memoize drawing functions
  const drawParticle = useCallback((ctx, particle) => {
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, 2 * Math.PI);
    ctx.fillStyle = particle.color;
    ctx.globalAlpha = PARTICLE_OPACITY;
    ctx.fill();
    ctx.globalAlpha = 1;
  }, []);

  const drawConnection = useCallback((ctx, p1, p2) => {
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.strokeStyle = p1.color;
    ctx.globalAlpha = CONNECTION_OPACITY;
    ctx.stroke();
    ctx.globalAlpha = 1;
  }, []);

  // Memoize update functions
  const updateParticles = useCallback((width, height) => {
    for (let p of particlesRef.current) {
      p.x += p.vx;
      p.y += p.vy;
      // Bounce off edges
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
    }
  }, []);

  const drawConnections = useCallback((ctx) => {
    for (let i = 0; i < particlesRef.current.length; i++) {
      for (let j = i + 1; j < particlesRef.current.length; j++) {
        const p1 = particlesRef.current[i];
        const p2 = particlesRef.current[j];
        const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
        if (dist < CONNECTION_DISTANCE) {
          drawConnection(ctx, p1, p2);
        }
      }
    }
  }, [drawConnection]);

  // Memoize event handlers
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => createParticle(width, height));
  }, [canvasRef]);

  const handleMouseMove = useCallback((e) => {
    mouseRef.current.x = e.clientX;
    mouseRef.current.y = e.clientY;
  }, []);

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);
    updateParticles(width, height);
    particlesRef.current.forEach(particle => drawParticle(ctx, particle));
    drawConnections(ctx);

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [updateParticles, drawParticle, drawConnections]);

  // Initialize particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => createParticle(width, height));

    // Start animation
    animate();

    // Add event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animate, handleResize, handleMouseMove]);

  return { mouseRef };
} 