import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  busy?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ children, busy = false, className = "", ...buttonProps }: ButtonProps) {
  return (
    <button
      className={`btn${busy ? " busy" : ""}${className ? ` ${className}` : ""}`}
      {...buttonProps}
      disabled={busy || buttonProps.disabled}
    >
      {children}
      <span className="arrow">&gt;</span>
    </button>
  );
}
