interface IconProps {
  className?: string;
  color?: string;
}

export function FileQuestionIcon({
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
      <mask
        id="mask0_file_question"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="4"
        y="3"
        width="24"
        height="26"
      >
        <path
          d="M6.66683 28H25.3335C25.6871 28 26.0263 27.8736 26.2763 27.6485C26.5264 27.4235 26.6668 27.1183 26.6668 26.8V10H20.0002V4H6.66683C6.31321 4 5.97407 4.12643 5.72402 4.35147C5.47397 4.57652 5.3335 4.88174 5.3335 5.2V26.8C5.3335 27.1183 5.47397 27.4235 5.72402 27.6485C5.97407 27.8736 6.31321 28 6.66683 28Z"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20.0002 4L26.6668 10M16.0002 20.2V18.4C17.4735 18.4 18.6668 17.191 18.6668 15.7C18.6668 14.209 17.4735 13 16.0002 13C14.5268 13 13.3335 14.209 13.3335 15.7"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.0002 25C16.4422 25 16.8661 24.842 17.1787 24.5607C17.4912 24.2794 17.6668 23.8978 17.6668 23.5C17.6668 23.1022 17.4912 22.7206 17.1787 22.4393C16.8661 22.158 16.4422 22 16.0002 22C15.5581 22 15.1342 22.158 14.8217 22.4393C14.5091 22.7206 14.3335 23.1022 14.3335 23.5C14.3335 23.8978 14.5091 24.2794 14.8217 24.5607C15.1342 24.842 15.5581 25 16.0002 25Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask0_file_question)">
        <path d="M0 1.60059H32V30.4006H0V1.60059Z" fill={color} />
      </g>
    </svg>
  );
}
