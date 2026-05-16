import { useEffect, useState } from 'react';

export default function FoodAnimations() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-150%) skewX(-20deg); }
          50%, 100% { transform: translateX(150%) skewX(-20deg); }
        }
        @keyframes pulseHeight {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50% { opacity: 0.6; transform: scaleY(1.05); }
        }
        .professional-shimmer {
          position: absolute;
          top: 0;
          left: 0;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            to right,
            transparent,
            rgba(255, 255, 255, 0.1),
            rgba(255, 255, 255, 0.2),
            rgba(255, 255, 255, 0.1),
            transparent
          );
          animation: shimmer 4s infinite ease-in-out;
        }
        .card-glow {
          position: absolute;
          bottom: -50%;
          right: -10%;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%);
          filter: blur(40px);
        }
      `}</style>

      {/* Moving Light Shimmer */}
      <div className="professional-shimmer" />
      
      {/* Soft Corner Glows */}
      <div className="card-glow" />
      <div className="absolute top-[-20%] left-[-10%] w-60 h-60 bg-white/5 rounded-full blur-3xl" />
    </div>
  );
}
