interface IconProps {
  className?: string;
  color?: string;
}

export function BlockingPopupIcon({
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
        d="M25.6 6.66699H6.4C5.07452 6.66699 4 7.71166 4 9.00033V23.0003C4 24.289 5.07452 25.3337 6.4 25.3337H25.6C26.9255 25.3337 28 24.289 28 23.0003V9.00033C28 7.71166 26.9255 6.66699 25.6 6.66699Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 9H6.00899M8.99551 9H9.0045M11.9912 9H12"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26 11H16H6"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 22C18.2091 22 20 20.2091 20 18C20 15.7909 18.2091 14 16 14C13.7909 14 12 15.7909 12 18C12 20.2091 13.7909 22 16 22Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.6665 17.333L17.3332 18.6663"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
