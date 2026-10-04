export function Vase({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 48" fill="none" stroke="currentColor" strokeWidth="1.4" className={className} aria-hidden>
      <path d="M15 3h10M16 3c0 4-1 6-4 9-4 4-6 9-6 15 0 9 6 18 14 18s14-9 14-18c0-6-2-11-6-15-3-3-4-5-4-9" />
      <path d="M9 22c7 2 15 2 22 0M8 30c8 2 16 2 24 0M11 38c6 1.5 12 1.5 18 0" />
    </svg>
  );
}
