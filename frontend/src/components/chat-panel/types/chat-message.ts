export type ChatMessage = {
  id: string
  variant: "npc" | "user"
  text: string
  /** If true, becomes a footer choice instead of a chat balloon */
  isUserReply?: boolean
  /** The message is displayed only after this user reply id has been selected */
  userReplyId?: string
}
