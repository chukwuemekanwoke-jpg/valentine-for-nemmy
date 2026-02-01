
import React, { useEffect, useState } from 'react';
import { HeartProps } from '../types';

const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<HeartProps[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newHeart: HeartProps = {
        id: Date.now(),
        left: `${Math.random() * 100}%`,
        size: `${Math.random() * (30 - 15) + 15}px`,
        duration: `${Math.random() * (10 - 5) + 5}s`,
        delay: '0s',
      };
      setHearts(prev => [...prev.slice(-30), newHeart]);
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="heart-particle text-red-400 opacity-60"
          style={{
            left: heart.left,
            fontSize: heart.size,
            animationDuration: heart.duration,
            animationDelay: heart.delay,
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;
