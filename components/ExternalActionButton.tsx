import { EXTERNAL_ACTION_URL, EXTERNAL_LINK_REL } from "@/lib/site";

interface ExternalActionButtonProps {
  label: string;
  ariaLabel?: string;
  className?: string;
  variant?: "gold" | "outline" | "green";
  size?: "md" | "sm";
}

export default function ExternalActionButton({
  label,
  ariaLabel,
  className = "",
  variant = "gold",
  size = "md",
}: ExternalActionButtonProps) {
  const variantClass =
    variant === "outline"
      ? "btn-outline"
      : variant === "green"
        ? "btn-green"
        : "btn-gold";
  const sizeClass = size === "sm" ? "btn-sm" : "";

  return (
    <a
      href={EXTERNAL_ACTION_URL}
      target="_blank"
      rel={EXTERNAL_LINK_REL}
      className={`btn ${variantClass} ${sizeClass} ${className}`.trim()}
      aria-label={ariaLabel || label}
    >
      {label}
    </a>
  );
}
