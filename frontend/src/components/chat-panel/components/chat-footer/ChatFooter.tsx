import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import Button from "../../../button/Button";
import type { ChatMessage } from "../../types";
import "./chat-footer-styles.css";

type ChatFooterProps = {
  children?: ReactNode;
  hint?: string;
  actionLabel?: string;
  onAction?: () => void;
  actionProps?: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "onClick">;
  userReplies?: ChatMessage[];
  onUserReplySelect?: (userReply: ChatMessage) => void;
} & Omit<HTMLAttributes<HTMLElement>, "children">;

export default function ChatFooter({
  children,
  hint,
  actionLabel,
  onAction,
  actionProps,
  userReplies,
  onUserReplySelect,
  className = "",
  ...props
}: ChatFooterProps) {
  const content = children ?? (
    userReplies?.length ? (
      <div className="chat-footer__user-replies">
        {userReplies.map((userReply) => (
          <button
            key={userReply.id}
            type="button"
            className="chat-footer__user-reply"
            onClick={() => onUserReplySelect?.(userReply)}
          >
            {userReply.text}
          </button>
        ))}
      </div>
    ) : actionLabel ? (
      <div className="chat-footer__cta">
        <Button type="button" onClick={onAction} {...actionProps}>
          {actionLabel}
        </Button>
      </div>
    ) : hint ? (
      <div className="chat-footer__hint">{hint}</div>
    ) : null
  );

  const footerClassName = ["chat-footer", className].filter(Boolean).join(" ");

  return (
    <footer className={footerClassName} {...props}>
      {content}
    </footer>
  );
}
