import { type ChatMessage } from "./types";

type ChatMessageBubbleProps = {
  message: ChatMessage;
};

export function ChatMessageBubble({ message }: ChatMessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <article className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-3xl px-4 py-3 text-sm font-medium leading-6 shadow-sm sm:max-w-[72%] ${
          isUser
            ? "rounded-br-lg bg-blue-600 text-white shadow-blue-950/20"
            : "rounded-bl-lg bg-white/[0.06] text-slate-200 ring-1 ring-white/10"
        }`}
      >
        <p>{message.content}</p>
      </div>
    </article>
  );
}
