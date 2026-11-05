interface IconProps {
  className?: string;
  color?: string;
}

export function AppBlockingIcon({
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
        d="M16 18.667C18.2091 18.667 20 16.8761 20 14.667C20 12.4579 18.2091 10.667 16 10.667C13.7909 10.667 12 12.4579 12 14.667C12 16.8761 13.7909 18.667 16 18.667Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.6665 14L17.3332 15.3333"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 5.33301H11C9.34315 5.33301 8 6.63545 8 8.2421V23.7573C8 25.3639 9.34315 26.6663 11 26.6663H21C22.6569 26.6663 24 25.3639 24 23.7573V8.2421C24 6.63545 22.6569 5.33301 21 5.33301Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 24H18"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
