import { memo, useRef, useEffect } from 'react';
import { useParticleAnimation } from '../../hooks/useParticleAnimation';
import styles from './InteractiveBackground.module.css';

const InteractiveBackground = memo(() => {
  const canvasRef = useRef(null);
  const { mouseRef } = useParticleAnimation(canvasRef);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set initial size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={styles.background}
      aria-hidden="true"
    />
  );
});

InteractiveBackground.displayName = 'InteractiveBackground';

export default InteractiveBackground; 