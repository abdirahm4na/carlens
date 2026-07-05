"use client";

import { useRef, useState } from "react";
import { ChatInputBar } from "./ChatInputBar";
import { ChatMessageBubble } from "./ChatMessageBubble";
import { type ChatVehicleContext } from "./VehicleContextCard";
import { type ChatMessage } from "./types";

const initialMessages: ChatMessage[] = [
  {
    id: "ai-intro",
    role: "assistant",
    content:
      "I found a 2023 Porsche 911 Carrera S. Ask me about reliability, ownership costs, options, or what to inspect before buying.",
  },
  {
    id: "user-sample",
    role: "user",
    content: "Is this a good used car to buy?",
  },
  {
    id: "ai-sample",
    role: "assistant",
    content:
      "Potentially, yes. The 911 Carrera S is strong on long-term desirability, but maintenance history, tire condition, brake wear, and accident records matter a lot at this price point.",
  },
];

type ChatPanelProps = {
  vehicle: ChatVehicleContext;
};

export function ChatPanel({ vehicle }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [draft, setDraft] = useState("");
  const [isSending, setIsSending] = useState(false);
  const nextMessageId = useRef(initialMessages.length);

  function createMessageId() {
    nextMessageId.current += 1;
    return `message-${nextMessageId.current}`;
  }

  function handleSubmit() {
    const trimmedDraft = draft.trim();

    if (!trimmedDraft || isSending) {
      return;
    }

    const userMessage: ChatMessage = {
      id: createMessageId(),
      role: "user",
      content: trimmedDraft,
    };

    setMessages((currentMessages) => [...currentMessages, userMessage]);
    setDraft("");
    setIsSending(true);

    window.setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: createMessageId(),
        role: "assistant",
        content: buildFakeResponse(trimmedDraft, vehicle),
      };

      setMessages((currentMessages) => [...currentMessages, aiMessage]);
      setIsSending(false);
    }, 900);
  }

  return (
    <section className="flex min-h-[32rem] flex-col rounded-[2rem] bg-white/60 p-4 ring-1 ring-slate-200">
      <div className="flex-1 space-y-3 overflow-y-auto pr-1">
        {messages.map((message) => (
          <ChatMessageBubble key={message.id} message={message} />
        ))}

        {isSending ? (
          <div className="flex justify-start">
            <div className="rounded-3xl rounded-bl-lg bg-white px-4 py-3 text-sm font-semibold text-slate-500 ring-1 ring-slate-200">
              Thinking...
            </div>
          </div>
        ) : null}
      </div>

      <ChatInputBar
        value={draft}
        isSending={isSending}
        onChange={setDraft}
        onSubmit={handleSubmit}
      />
    </section>
  );
}

function buildFakeResponse(question: string, vehicle: ChatVehicleContext) {
  return `For this ${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.trim}, I would focus on service records, brake and tire wear, options, and whether the asking price fits the estimated ${vehicle.estimatedMarketValue} range. Your question was: "${question}"`;
}
