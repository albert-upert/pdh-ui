interface IconProps {
  className?: string;
  color?: string;
}

export function SaveIcon({
  className = "h-8 w-8",
  color = "currentColor",
}: IconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M10.6668 5.33301H5.3335V26.6663H26.6668V10.6663L21.3335 5.33301H18.6668M10.6668 5.33301V10.6663H18.6668V5.33301M10.6668 5.33301H18.6668M16.0002 15.9997C15.1108 15.9997 13.3335 16.533 13.3335 18.6663C13.3335 20.7997 15.1108 21.333 16.0002 21.333C16.8895 21.333 18.6668 20.7997 18.6668 18.6663C18.6668 16.533 16.8895 15.9997 16.0002 15.9997Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
