import { type ChatMessage } from "./types";

type ChatMessageBubbleProps = {
  message: ChatMessage;
};

export function ChatMessageBubble({ message }: ChatMessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <article className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-3xl px-4 py-3 text-sm leading-6 shadow-sm ${
          isUser
            ? "rounded-br-lg bg-blue-600 text-white"
            : "rounded-bl-lg bg-white text-slate-700 ring-1 ring-slate-200"
        }`}
      >
        <p>{message.content}</p>
      </div>
    </article>
  );
}
