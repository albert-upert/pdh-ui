interface IconProps {
  className?: string;
  color?: string;
}

export function NoteIcon({
  className = "h-8 w-8",
  color = "currentColor",
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M16.1212 4H7.87879C6.85007 4 5.86348 4.40866 5.13607 5.13607C4.40866 5.86348 4 6.85007 4 7.87879V16.1212C4 17.1499 4.40866 18.1365 5.13607 18.8639C5.86348 19.5913 6.85007 20 7.87879 20H14.5144C15.0239 20 15.5284 19.8997 15.9991 19.7047C16.4698 19.5097 16.8975 19.2238 17.2577 18.8635L18.8635 17.2577C19.2238 16.8975 19.5097 16.4698 19.7047 15.9991C19.8997 15.5284 20 15.0239 20 14.5144V7.87879C20 6.85007 19.5913 5.86348 18.8639 5.13607C18.1365 4.40866 17.1499 4 16.1212 4Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.0001 13.6971H16.6062C15.8346 13.6971 15.0947 14.0036 14.5491 14.5491C14.0036 15.0947 13.6971 15.8346 13.6971 16.6062V20.0001M7.87891 7.87891H15.1516M7.87891 11.7577H12.7274"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
