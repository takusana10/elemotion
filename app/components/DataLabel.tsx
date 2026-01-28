interface DataLabelProps {
  label: string;
  value: string;
  className?: string;
}

export default function DataLabel({ label, value, className = '' }: DataLabelProps) {
  return (
    <div className={`font-mono text-[9px] uppercase tracking-wider opacity-40 ${className}`}>
      <div className="flex gap-2 items-center">
        <span className="relative">
          {label}
          <div className="absolute inset-0 opacity-30 pointer-events-none" style={{
            backgroundImage: 'radial-gradient(circle, black 0.5px, transparent 0.5px)',
            backgroundSize: '2px 2px',
            animation: 'subtle-shift 15s ease-in-out infinite'
          }} />
        </span>
        <span className="text-[6px]">●</span>
        <span className="relative font-semibold">
          {value}
          <div className="absolute inset-0 opacity-30 pointer-events-none" style={{
            backgroundImage: 'radial-gradient(circle, black 0.5px, transparent 0.5px)',
            backgroundSize: '2px 2px',
            animation: 'subtle-shift 18s ease-in-out infinite'
          }} />
        </span>
      </div>
    </div>
  );
}
