const ZephyrIcon = ({ className = '', size = 24 }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            {/* Code brackets */}
            <path d="M8 4L4 12l4 8" />
            <path d="M16 4l4 8-4 8" />

            {/* Stylized 'Z' */}
            <path d="M7 8h10l-10 8h10" />

            {/* Optional decorative elements */}
            <path d="M7 12h8" strokeDasharray="2 2" opacity="0.5" />
            <path d="M7 14h8" strokeDasharray="2 2" opacity="0.5" />
        </svg>
    );
};

export default ZephyrIcon;
