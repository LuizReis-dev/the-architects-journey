import type { HTMLAttributes } from "react";
import useAutoScroll from "../../../../hooks/useAutoScroll";
import type { ChatMessage } from "../../types";
import ChatBaloon from "../chat-baloon/ChatBaloon";
import ChatTyping from "../chat-typing/ChatTyping";
import "./chat-body-styles.css";

type ChatBodyProps = {
  messages: ChatMessage[];
  typing?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export default function ChatBody({
  messages,
  typing = false,
  className = "",
  ...props
}: ChatBodyProps) {
  const bodyRef = useAutoScroll(messages.length + (typing ? 1 : 0));
  const bodyClassName = ["chat-body", className].filter(Boolean).join(" ");

  return (
    <div ref={bodyRef} className={bodyClassName} {...props}>
      {messages.map((message) => (
        <ChatBaloon key={message.id} variant={message.variant}>
          {message.text}
        </ChatBaloon>
      ))}
      {typing ? <ChatTyping /> : null}
    </div>
  );
}
