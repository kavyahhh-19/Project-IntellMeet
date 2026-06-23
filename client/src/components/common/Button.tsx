interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
}

function Button({
  text,
  onClick,
  type = "button",
  className = "",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition w-full ${className}`}
    >
      {text}
    </button>
  );
}

export default Button;