interface IconProps {
  className?: string;
  color?: string;
}

export function DraggingIcon({
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
      <circle cx="13.4165" cy="6.08301" r="2.75" fill={color} />
      <circle cx="19.9165" cy="6.08301" r="2.75" fill={color} />
      <circle cx="13.4165" cy="12.666" r="2.75" fill={color} />
      <circle cx="19.9165" cy="12.666" r="2.75" fill={color} />
      <circle cx="13.4165" cy="19.25" r="2.75" fill={color} />
      <circle cx="19.9165" cy="19.25" r="2.75" fill={color} />
      <circle cx="13.4165" cy="25.833" r="2.75" fill={color} />
      <circle cx="19.9165" cy="25.833" r="2.75" fill={color} />
    </svg>
  );
}
