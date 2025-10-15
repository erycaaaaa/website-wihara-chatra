export default function Placeholder({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1200 800"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Placeholder"
    >
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="1200" height="800" fill="#f3f4f6" />
      <rect width="1200" height="800" fill="url(#grid)" />
      <g opacity=".7">
        <rect x="400" y="200" width="400" height="400" rx="24" fill="#d1d5db" />
      </g>
    </svg>
  );
}
