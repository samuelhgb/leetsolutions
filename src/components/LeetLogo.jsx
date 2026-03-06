export default function LeetLogo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="30" height="30" aria-label="Leet Solutions">

      <defs>
        <linearGradient id="leetGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e3fae"/>
          <stop offset="100%" stopColor="#6b26d9"/>
        </linearGradient>
      </defs>

      <g>
        <rect x="12" y="12" width="40" height="40" rx="4"
          fill="none"
          stroke="url(#leetGradient)"
          strokeWidth="4" />

        <rect x="22" y="22" width="20" height="20" rx="2"
          fill="url(#leetGradient)" />

        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 32 32"
          to="45 32 32"
          dur="0.6s"
          begin="1s"
          fill="freeze"
          calcMode="spline"
          keySplines="0.22 1 0.36 1"
        />
      </g>

    </svg>
  );
}