import { useCallback, useMemo, useState } from "react"
import type { ChatMessage } from "../types"

type ChatFlowState = {
  visibleMessages: ChatMessage[]
  userReplies?: ChatMessage[]
  isComplete: boolean
}

type ScriptSegment =
  | { type: "messages"; segmentMessages: ChatMessage[] }
  | { type: "choice"; segmentMessages: ChatMessage[] }

type FlowAccumulator = ChatFlowState & {
  waitingForUserReply: boolean
}

function isUnlocked(message: ChatMessage, selectedUserReplyIds: string[]) {
  return (
    !message.userReplyId || selectedUserReplyIds.includes(message.userReplyId)
  )
}

function chunkScript(script: ChatMessage[]): ScriptSegment[] {
  return script.reduce<ScriptSegment[]>((segments, message) => {
    const last = segments.at(-1)
    const segmentType = message.isUserReply ? "choice" : "messages"

    if (last?.type === segmentType) {
      last.segmentMessages.push(message)
      return segments
    }

    return [...segments, { type: segmentType, segmentMessages: [message] }]
  }, [])
}

function resolveChoiceSegment(
  flowState: FlowAccumulator,
  segmentMessages: ChatMessage[],
  selectedUserReplyIds: string[],
): FlowAccumulator {
  const selectedUserReply = segmentMessages.find((reply) =>
    selectedUserReplyIds.includes(reply.id),
  )

  if (selectedUserReply) {
    return {
      ...flowState,
      visibleMessages: [...flowState.visibleMessages, selectedUserReply],
    }
  }

  return {
    visibleMessages: flowState.visibleMessages,
    userReplies: segmentMessages,
    isComplete: false,
    waitingForUserReply: true,
  }
}

function resolveFlow(
  script: ChatMessage[],
  selectedUserReplyIds: string[],
): ChatFlowState {
  const initialState: FlowAccumulator = {
    visibleMessages: [],
    isComplete: true,
    waitingForUserReply: false,
  }

  const result = chunkScript(script).reduce((flowState, segment) => {
    if (flowState.waitingForUserReply) {
      return flowState
    }

    if (segment.type === "messages") {
      return {
        ...flowState,
        visibleMessages: [
          ...flowState.visibleMessages,
          ...segment.segmentMessages.filter((message) =>
            isUnlocked(message, selectedUserReplyIds),
          ),
        ],
      }
    }

    return resolveChoiceSegment(
      flowState,
      segment.segmentMessages,
      selectedUserReplyIds,
    )
  }, initialState)

  return {
    visibleMessages: result.visibleMessages,
    userReplies: result.userReplies,
    isComplete: result.isComplete,
  }
}

export default function useChatFlow(script: ChatMessage[]) {
  const [selectedUserReplyIds, setSelectedUserReplyIds] = useState<string[]>([])

  const flow = useMemo(
    () => resolveFlow(script, selectedUserReplyIds),
    [script, selectedUserReplyIds],
  )

  const selectUserReply = useCallback((userReply: ChatMessage) => {
    setSelectedUserReplyIds((current) => {
      if (current.includes(userReply.id)) {
        return current
      }

      return [...current, userReply.id]
    })
  }, [])

  const reset = useCallback(() => {
    setSelectedUserReplyIds([])
  }, [])

  return {
    messages: flow.visibleMessages,
    userReplies: flow.userReplies,
    selectUserReply,
    isComplete: flow.isComplete,
    reset,
  }
}
