import type { ChatMessage } from "../../components/chat-panel/types";

export const STORY_MESSAGES: ChatMessage[] = [
  {
    id: "1",
    variant: "npc",
    text: "Você vai entrar como Estagiário(a) de Arquitetura de Software, no meu time.",
  },
  {
    id: "2",
    variant: "user",
    text: "E qual vai ser minha responsabilidade?",
  },
];

export const INTERVIEW_MESSAGES: ChatMessage[] = [
  {
    id: "q1-intro",
    variant: "npc",
    text: "Oi! Bom te ver de novo. Vamos conversar rapidinho pra ver se você já pensa como Arquiteto(a) Júnior. Só uma resposta é a ideal em cada pergunta — escolha com calma.",
  },
  {
    id: "q1-ask",
    variant: "npc",
    text: "Nosso sistema de ingressos caiu no lançamento de um show grande. O que você faz primeiro?",
  },
  {
    id: "q1-a",
    variant: "user",
    text: "Reinicio o servidor e espero passar o pico",
    isUserReply: true,
  },
  {
    id: "q1-b",
    variant: "user",
    text: "Analiso os logs pra achar o ponto de estrangulamento antes de agir",
    isUserReply: true,
  },
  {
    id: "q1-c",
    variant: "user",
    text: "Aumento os servidores sem investigar a causa",
    isUserReply: true,
  },
  {
    id: "q1-a-reply",
    variant: "npc",
    text: "Reiniciar no escuro pode piorar. Melhor entender a causa antes.",
    userReplyId: "q1-a",
  },
  {
    id: "q1-b-reply",
    variant: "npc",
    text: "Boa resposta. Sem diagnóstico, qualquer ação é chute.",
    userReplyId: "q1-b",
  },
  {
    id: "q1-c-reply",
    variant: "npc",
    text: "Escalar sem saber o gargalo só mascara o problema — e custa caro.",
    userReplyId: "q1-c",
  },
  {
    id: "q2-ask",
    variant: "npc",
    text: "Beleza. Segunda pergunta: como evitar que o banco fique sobrecarregado em picos de leitura?",
  },
  {
    id: "q2-a",
    variant: "user",
    text: "Coloco cache na frente das consultas mais quentes",
    isUserReply: true,
  },
  {
    id: "q2-b",
    variant: "user",
    text: "Abro o banco pra internet e rezo",
    isUserReply: true,
  },
  {
    id: "q2-c",
    variant: "user",
    text: "Dou SELECT * em loop pra aquecer",
    isUserReply: true,
  },
  {
    id: "q2-a-reply",
    variant: "npc",
    text: "Isso! Cache bem colocado segura boa parte do pico.",
    userReplyId: "q2-a",
  },
  {
    id: "q2-end",
    variant: "npc",
    text: "Por hoje é isso. Mandou bem na conversa — pode seguir pra missão.",
    userReplyId: "q2-a",
  },
  {
    id: "q2-b-reply",
    variant: "npc",
    text: "Hmm. Isso seria um incidente esperando pra acontecer.",
    userReplyId: "q2-b",
  },
  {
    id: "q2-end-bad",
    variant: "npc",
    text: "Vamos treinar mais um pouco depois. Ainda assim, valeu a conversa.",
    userReplyId: "q2-b",
  },
  {
    id: "q2-c-reply",
    variant: "npc",
    text: "Isso aumenta a carga, não reduz. Pensa em aliviar o banco.",
    userReplyId: "q2-c",
  },
  {
    id: "q2-end-meh",
    variant: "npc",
    text: "Fechamos por aqui. Revisa cache e réplicas e a gente fala de novo.",
    userReplyId: "q2-c",
  },
];
