"use client";

import { useRef, useState } from "react";
import { type VehicleAnalysis } from "@/types/vehicle";
import { ChatInputBar } from "./ChatInputBar";
import { ChatMessageBubble } from "./ChatMessageBubble";
import { type ChatMessage } from "./types";

const initialMessages: ChatMessage[] = [
  {
    id: "ai-intro",
    role: "assistant",
    content: "Ask anything about this vehicle before you buy.",
  },
];

const suggestedQuestions = [
  "What should I inspect in person?",
  "Is this price fair?",
  "What problems are common?",
  "Would you buy this?",
];

type ChatPanelProps = {
  vehicleAnalysis?: VehicleAnalysis;
  imageDataUrl?: string;
};

export function ChatPanel({ vehicleAnalysis, imageDataUrl }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [draft, setDraft] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const nextMessageId = useRef(initialMessages.length);

  function createMessageId() {
    nextMessageId.current += 1;
    return `message-${nextMessageId.current}`;
  }

  async function handleSubmit() {
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
    setErrorMessage(undefined);

    try {
      const nextMessages = [...messages, userMessage];
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages,
          vehicleAnalysis,
          imageDataUrl,
        }),
      });
      const body: unknown = await response.json();

      if (!response.ok) {
        throw new Error(getErrorMessage(body));
      }

      const aiMessage: ChatMessage = {
        id: createMessageId(),
        role: "assistant",
        content: getResponseMessage(body),
      };

      setMessages((currentMessages) => [...currentMessages, aiMessage]);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to get an AI response.",
      );
    } finally {
      setIsSending(false);
    }
  }

  return (
    <section className="flex min-h-[34rem] flex-col rounded-[2rem] bg-[#080A0F]/95 p-4 shadow-[0_26px_80px_rgba(0,0,0,0.28)] ring-1 ring-white/10 backdrop-blur sm:p-5">
      <div className="flex-1 space-y-4 overflow-y-auto pr-1">
        {messages.map((message) => (
          <ChatMessageBubble key={message.id} message={message} />
        ))}

        {isSending ? (
          <div className="flex justify-start">
            <div className="rounded-3xl rounded-bl-lg bg-white/[0.06] px-4 py-3 text-sm font-semibold text-slate-400 shadow-sm ring-1 ring-white/10">
              <span className="inline-flex items-center gap-1">
                <span className="size-1.5 rounded-full bg-blue-500 animate-pulse" />
                <span className="size-1.5 rounded-full bg-blue-500 animate-pulse [animation-delay:120ms]" />
                <span className="size-1.5 rounded-full bg-blue-500 animate-pulse [animation-delay:240ms]" />
              </span>
            </div>
          </div>
        ) : null}

        {errorMessage ? (
          <div className="rounded-2xl bg-red-500/10 px-4 py-3 text-sm font-bold text-red-200 ring-1 ring-red-400/20">
            {errorMessage}
          </div>
        ) : null}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {suggestedQuestions.map((question) => (
          <button
            key={question}
            type="button"
            onClick={() => setDraft(question)}
            className="rounded-full bg-white/[0.05] px-4 py-2 text-sm font-semibold text-slate-300 ring-1 ring-white/10 transition hover:-translate-y-0.5 hover:bg-white/[0.08] hover:text-white"
          >
            {question}
          </button>
        ))}
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

function getResponseMessage(value: unknown) {
  if (
    value &&
    typeof value === "object" &&
    typeof (value as Record<string, unknown>).message === "string"
  ) {
    return (value as { message: string }).message;
  }

  throw new Error("AI response was not valid.");
}

function getErrorMessage(value: unknown) {
  if (
    value &&
    typeof value === "object" &&
    typeof (value as Record<string, unknown>).error === "string"
  ) {
    return (value as { error: string }).error;
  }

  return "Unable to get an AI response.";
}
