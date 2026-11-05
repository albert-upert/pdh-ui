interface IconProps {
  className?: string;
  color?: string;
}

export function ExclamationMarkIcon({
  className = "h-6 w-6",
  color = "currentColor",
}: IconProps) {
  return (
    <svg
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M11.4167 22.0833C17.3077 22.0833 22.0833 17.3077 22.0833 11.4167C22.0833 5.52563 17.3077 0.75 11.4167 0.75C5.52563 0.75 0.75 5.52563 0.75 11.4167C0.75 17.3077 5.52563 22.0833 11.4167 22.0833Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.4165 15.6837V11.417"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.4165 7.14941H11.4272"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
