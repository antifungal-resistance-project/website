/**
 * ARP mark: a molecular hexagon around a heme-iron core, with the approaching
 * nitrogen as a cyan accent node — the same motif as the hero scroll animation.
 * Themed via CSS vars so it adapts anywhere it's used.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      role="img"
      aria-label="The Antifungal Resistance Project"
    >
      {/* molecular ring */}
      <polygon
        points="16,3 27.26,9.5 27.26,22.5 16,29 4.74,22.5 4.74,9.5"
        fill="none"
        stroke="var(--color-iron)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* heme macrocycle */}
      <circle
        cx="16"
        cy="16"
        r="6.5"
        fill="none"
        stroke="var(--color-iron)"
        strokeOpacity="0.45"
        strokeWidth="1.5"
      />
      {/* iron core */}
      <circle cx="16" cy="16" r="3" fill="var(--color-iron)" />
      {/* approaching nitrogen */}
      <circle cx="16" cy="3" r="2.4" fill="var(--color-nitrogen)" />
    </svg>
  );
}
