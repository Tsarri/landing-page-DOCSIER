export const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Organic blob 1 - Coral */}
      <div 
        className="absolute w-[800px] h-[800px] rounded-full opacity-[0.07] blur-[120px] animate-blob-1"
        style={{
          background: 'radial-gradient(circle, hsl(var(--brand-coral)) 0%, transparent 70%)',
          top: '-20%',
          left: '-10%',
        }}
      />
      
      {/* Organic blob 2 - Purple */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.08] blur-[100px] animate-blob-2"
        style={{
          background: 'radial-gradient(circle, hsl(var(--brand-purple)) 0%, transparent 70%)',
          top: '30%',
          right: '-15%',
        }}
      />
      
      {/* Organic blob 3 - Maroon */}
      <div 
        className="absolute w-[700px] h-[700px] rounded-full opacity-[0.06] blur-[130px] animate-blob-3"
        style={{
          background: 'radial-gradient(circle, hsl(var(--brand-maroon)) 0%, transparent 70%)',
          bottom: '10%',
          left: '20%',
        }}
      />
      
      {/* Organic blob 4 - Sage (subtle) */}
      <div 
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.04] blur-[100px] animate-blob-4"
        style={{
          background: 'radial-gradient(circle, hsl(var(--brand-sage)) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
      
      {/* Organic blob 5 - Blue Gray */}
      <div 
        className="absolute w-[550px] h-[550px] rounded-full opacity-[0.05] blur-[110px] animate-blob-5"
        style={{
          background: 'radial-gradient(circle, hsl(var(--brand-blue-gray)) 0%, transparent 70%)',
          bottom: '-10%',
          right: '10%',
        }}
      />
      
      {/* Subtle noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};
