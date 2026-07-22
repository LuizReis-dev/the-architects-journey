import "./chat-typing-styles.css";

export default function ChatTyping() {
  return (
    <div className="chat-typing" aria-hidden="true">
      <div className="chat-typing__bubble">
        <span className="chat-typing__dot" />
        <span className="chat-typing__dot" />
        <span className="chat-typing__dot" />
      </div>
    </div>
  );
}
