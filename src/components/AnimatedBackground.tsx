export const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Radar center point */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* Pulse waves */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-coral/20 animate-radar-pulse"
            style={{
              animationDelay: `${i * 2}s`,
              width: '100px',
              height: '100px',
            }}
          />
        ))}
      </div>

      {/* Secondary radar source - bottom left */}
      <div className="absolute bottom-[20%] left-[15%]">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-purple/15 animate-radar-pulse-slow"
            style={{
              animationDelay: `${i * 3}s`,
              width: '80px',
              height: '80px',
            }}
          />
        ))}
      </div>

      {/* Tertiary radar source - top right */}
      <div className="absolute top-[30%] right-[20%]">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-sage/10 animate-radar-pulse-slow"
            style={{
              animationDelay: `${i * 2.5 + 1}s`,
              width: '60px',
              height: '60px',
            }}
          />
        ))}
      </div>

      {/* Horizontal wave lines */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-blue-gray/10 to-transparent animate-wave-horizontal"
            style={{
              top: `${20 + i * 15}%`,
              animationDelay: `${i * 1.5}s`,
            }}
          />
        ))}
      </div>

      {/* Subtle noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};
