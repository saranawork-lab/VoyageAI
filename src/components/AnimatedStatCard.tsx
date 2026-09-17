import React, { useEffect, useRef, useState } from 'react';

// Elegant easing curve for the count up
const easeOutExpo = (t: number): number => {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
};

interface AnimatedStatCardProps {
  value: string;
  label: string;
  delayMs: number;
}

export const AnimatedStatCard: React.FC<AnimatedStatCardProps> = ({ value, label, delayMs }) => {
  // Parse numeric part and prefix/suffix
  const numericMatch = value.match(/[\d,]+/);
  const numericString = numericMatch ? numericMatch[0].replace(/,/g, '') : '0';
  const targetNumber = parseInt(numericString, 10);
  
  const prefix = value.substring(0, numericMatch?.index || 0);
  const suffix = value.substring((numericMatch?.index || 0) + (numericMatch?.[0].length || 0));

  const [displayNumber, setDisplayNumber] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [entranceDone, setEntranceDone] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // 3D Parallax state
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (hasAnimated) {
      const timer = setTimeout(() => setEntranceDone(true), delayMs + 1200);
      return () => clearTimeout(timer);
    }
  }, [hasAnimated, delayMs]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          let startTime: number;
          const duration = 2500; // Premium, slow count-up

          const animateCount = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            
            if (progress < delayMs) {
              requestAnimationFrame(animateCount);
              return;
            }

            const timeRatio = Math.min((progress - delayMs) / duration, 1);
            const easedProgress = easeOutExpo(timeRatio);
            
            setDisplayNumber(Math.floor(easedProgress * targetNumber));

            if (timeRatio < 1) {
              requestAnimationFrame(animateCount);
            } else {
              setDisplayNumber(targetNumber);
            }
          };

          requestAnimationFrame(animateCount);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, targetNumber, delayMs]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Smooth tilt limits (-12 to 12 degrees)
    const xPct = x / rect.width - 0.5;
    const yPct = y / rect.height - 0.5;
    
    setRotateX(-yPct * 24); 
    setRotateY(xPct * 24);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const formattedNumber = targetNumber >= 1000 
    ? displayNumber.toLocaleString('en-IN') 
    : displayNumber;

  return (
    <div 
      ref={cardRef}
      className="relative text-center group perspective-1000 w-full sm:w-auto flex flex-col items-center justify-center p-6 rounded-2xl ease-out"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        opacity: hasAnimated ? 1 : 0,
        transform: !hasAnimated 
          ? 'rotateX(60deg) translateZ(-100px) translateY(40px)'
          : isHovered 
            ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(30px)` 
            : 'rotateX(0deg) rotateY(0deg) translateZ(0px)',
        transition: isHovered 
          ? 'transform 0.1s ease-out' 
          : 'transform 1.2s cubic-bezier(0.22, 1, 0.36, 1), opacity 1.2s ease-out',
        transitionDelay: entranceDone ? '0ms' : `${delayMs}ms`
      }}
    >
      {/* Premium Glow Background */}
      <div 
        className={`absolute inset-0 rounded-2xl transition-opacity duration-700 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.12) 0%, transparent 80%)',
          transform: 'translateZ(-20px)'
        }}
      />
      
      {/* 3D Number */}
      <div
        className="relative text-3xl md:text-5xl font-extrabold text-primary mb-1 transition-transform duration-300 ease-out"
        style={{
          transform: isHovered ? 'translateZ(40px)' : 'translateZ(0px)'
        }}
      >
        <span 
          className="text-transparent bg-clip-text transition-colors duration-500"
          style={{
            backgroundImage: isHovered 
              ? 'linear-gradient(to right, #2563EB, #7C3AED)' 
              : 'linear-gradient(to right, #2563EB, #2563EB)'
          }}
        >
          {prefix}{formattedNumber}{suffix}
        </span>
        
        {/* Light Sweep Effect */}
        <div 
          className={`absolute inset-0 pointer-events-none overflow-hidden transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        >
          <div 
            className="absolute inset-0 opacity-40 mix-blend-overlay"
            style={{
              background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.8) 25%, transparent 30%)',
              animation: isHovered ? 'sweep 2.5s infinite linear' : 'none',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent'
            }}
          >
            {prefix}{formattedNumber}{suffix}
          </div>
        </div>
      </div>
      
      {/* 3D Label */}
      <p 
        className="relative text-sm text-text-light transition-transform duration-300 ease-out mt-2"
        style={{
          transform: isHovered ? 'translateZ(20px)' : 'translateZ(0px)'
        }}
      >
        {label}
      </p>
    </div>
  );
};
