interface IconProps {
  className?: string;
  color?: string;
}

export function LocationIcon({
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
        d="M16.1745 26.1192C18.1585 24.4061 24.0669 18.8594 24.0669 13.5334C24.0669 11.2702 23.1678 9.09972 21.5675 7.49939C19.9672 5.89906 17.7966 5 15.5334 5C13.2702 5 11.0997 5.89906 9.49939 7.49939C7.89906 9.09972 7 11.2702 7 13.5334C7 18.8594 12.9083 24.4061 14.8924 26.1192C15.0772 26.2582 15.3022 26.3333 15.5334 26.3333C15.7647 26.3333 15.9897 26.2582 16.1745 26.1192Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.5335 16.7341C17.3009 16.7341 18.7336 15.3014 18.7336 13.534C18.7336 11.7667 17.3009 10.334 15.5335 10.334C13.7662 10.334 12.3335 11.7667 12.3335 13.534C12.3335 15.3014 13.7662 16.7341 15.5335 16.7341Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
