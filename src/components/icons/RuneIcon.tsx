import type { ReactNode } from "react";
import type { RuneId } from "../../data/runes";

type RuneIconProps = {
  id: RuneId;
  className?: string;
};

const paths: Record<RuneId, ReactNode> = {
  ember: (
    <>
      <path d="M20 4 C28 14 30 20 24 28 C26 22 22 18 20 14 C18 18 14 22 16 28 C10 20 12 14 20 4 Z" />
      <path d="M20 22 C24 27 24 31 20 35 C16 31 16 27 20 22 Z" opacity="0.6" />
    </>
  ),
  thorn: (
    <>
      <line x1="20" y1="4" x2="20" y2="36" />
      <path d="M20 10 L30 4" />
      <path d="M20 18 L8 12" />
      <path d="M20 26 L30 32" />
      <path d="M20 34 L8 30" />
    </>
  ),
  wave: (
    <>
      <path d="M4 14 Q10 8 16 14 T28 14 T36 14" />
      <path d="M4 22 Q10 16 16 22 T28 22 T36 22" />
      <path d="M4 30 Q10 24 16 30 T28 30 T36 30" />
    </>
  ),
  crown: (
    <>
      <path d="M6 30 L10 12 L16 22 L20 8 L24 22 L30 12 L34 30 Z" />
      <line x1="6" y1="30" x2="34" y2="30" />
    </>
  ),
  eye: (
    <>
      <path d="M4 20 C11 8 29 8 36 20 C29 32 11 32 4 20 Z" />
      <circle cx="20" cy="20" r="5.5" />
      <circle cx="20" cy="20" r="1.4" fill="currentColor" stroke="none" />
    </>
  ),
  key: (
    <>
      <circle cx="13" cy="12" r="7" />
      <line x1="18" y1="17" x2="32" y2="31" />
      <line x1="24" y1="23" x2="20" y2="27" />
      <line x1="28" y1="27" x2="24" y2="31" />
    </>
  ),
};

export function RuneIcon({ id, className }: RuneIconProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[id]}
    </svg>
  );
}
