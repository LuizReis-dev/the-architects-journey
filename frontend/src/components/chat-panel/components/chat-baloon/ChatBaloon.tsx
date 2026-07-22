import type { HTMLAttributes, ReactNode } from "react";
import "./chat-baloon-styles.css";

type ChatBalloonVariant = "npc" | "user";

type ChatBalloonProps = {
  children: ReactNode;
  variant?: ChatBalloonVariant;
} & HTMLAttributes<HTMLDivElement>;

export default function ChatBaloon({
  children,
  variant = "npc",
  className = "",
  ...props
}: ChatBalloonProps) {
  return (
    <div
      className={`chat-balloon-row ${variant}${className ? ` ${className}` : ""}`}
      {...props}
    >
      <div className={`chat-balloon ${variant}`}>{children}</div>
    </div>
  );
}
