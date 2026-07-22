import type { HTMLAttributes } from "react";
import type { PixelCharacter } from "../../../../shared/characters";
import PixelSprite from "../../../../shared/pixel-sprite/PixelSprite";
import "./chat-header-styles.css";

type ChatHeaderProps = {
  character: PixelCharacter;
  name: string;
  role: string;
} & HTMLAttributes<HTMLElement>;

export default function ChatHeader({
  character,
  name,
  role,
  className = "",
  ...props
}: ChatHeaderProps) {
  const headerClassName = ["chat-header", className].filter(Boolean).join(" ");

  return (
    <header className={headerClassName} {...props}>
      <div className="chat-header__avatar">
        <PixelSprite character={character} scale={3} />
      </div>
      <div className="chat-header__who">
        <span className="chat-header__name">{name}</span>
        <span className="chat-header__role">{role}</span>
      </div>
    </header>
  );
}
