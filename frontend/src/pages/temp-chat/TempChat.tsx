import { useState } from "react";
import ChatPanel from "../../components/chat-panel/ChatPanel";
import useChatFlow from "../../components/chat-panel/hooks/useChatFlow";
import StageLayout from "../../layouts/stage-layout/StageLayout";
import { characters } from "../../shared/characters";
import { INTERVIEW_MESSAGES, STORY_MESSAGES } from "./mock-messages";
import "./TempChat.css";

const marina = characters[2];
const rafael = characters[0];

type Scene = "story" | "interview";

export default function TempChat() {
  const [scene, setScene] = useState<Scene>("story");
  const interview = useChatFlow(INTERVIEW_MESSAGES);
  const isInterview = scene === "interview";

  const startInterview = () => {
    interview.reset();
    setScene("interview");
  };

  const restartStory = () => {
    interview.reset();
    setScene("story");
  };

  const actionLabel = !isInterview
    ? "COMEÇAR MISSÃO"
    : interview.isComplete
      ? "RECOMEÇAR"
      : undefined;

  const onAction = !isInterview
    ? startInterview
    : interview.isComplete
      ? restartStory
      : undefined;

  return (
    <StageLayout>
      <section className="screen temp-chat-screen">
        <ChatPanel
          character={isInterview ? rafael : marina}
          name={isInterview ? "Rafael" : "Marina"}
          role={
            isInterview
              ? "Head de Engenharia · TicketFlow"
              : "Tech Lead · TicketFlow"
          }
          messages={isInterview ? interview.messages : STORY_MESSAGES}
          actionLabel={actionLabel}
          onAction={onAction}
          userReplies={isInterview ? interview.userReplies : undefined}
          onUserReplySelect={isInterview ? interview.selectUserReply : undefined}
        />
      </section>
    </StageLayout>
  );
}
