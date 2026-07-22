import type { HTMLAttributes, ReactNode } from "react";
import type { PixelCharacter } from "../../shared/characters";
import ChatBody from "./components/chat-body/ChatBody";
import ChatFooter from "./components/chat-footer/ChatFooter";
import ChatHeader from "./components/chat-header/ChatHeader";
import type { ChatMessage } from "./types";
import "./chat-panel-styles.css";

type ChatPanelProps = {
  character: PixelCharacter;
  name: string;
  role: string;
  messages: ChatMessage[];
  onBodyClick?: () => void;
  footer?: ReactNode;
  hint?: string;
  actionLabel?: string;
  onAction?: () => void;
  userReplies?: ChatMessage[];
  onUserReplySelect?: (userReply: ChatMessage) => void;
} & Omit<HTMLAttributes<HTMLDivElement>, "children">;

export type { ChatMessage } from "./types";

export default function ChatPanel({
  character,
  name,
  role,
  messages,
  onBodyClick,
  footer,
  hint,
  actionLabel,
  onAction,
  userReplies,
  onUserReplySelect,
  className = "",
  ...props
}: ChatPanelProps) {
  const panelClassName = ["chat-panel", className].filter(Boolean).join(" ");
  const waitingForUserReply = Boolean(userReplies?.length);

  return (
    <div className={panelClassName} {...props}>
      <ChatHeader character={character} name={name} role={role} />
      <ChatBody
        messages={messages}
        typing={waitingForUserReply}
        onClick={onBodyClick}
      />
      {footer ?? (
        <ChatFooter
          hint={hint}
          actionLabel={actionLabel}
          onAction={onAction}
          userReplies={userReplies}
          onUserReplySelect={onUserReplySelect}
        />
      )}
    </div>
  );
}
