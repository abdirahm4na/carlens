import { FormEvent } from "react";

type ChatInputBarProps = {
  value: string;
  isSending: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export function ChatInputBar({
  value,
  isSending,
  onChange,
  onSubmit,
}: ChatInputBarProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="sticky bottom-0 mt-4 flex gap-3 border-t border-white/10 bg-[#080A0F]/95 py-4 backdrop-blur"
    >
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Ask about this car..."
        className="min-h-12 min-w-0 flex-1 rounded-full bg-white/[0.06] px-5 text-sm font-medium text-white shadow-sm ring-1 ring-white/10 transition placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        disabled={!value.trim() || isSending}
        className="min-h-12 shrink-0 rounded-full bg-blue-600 px-5 text-sm font-bold text-white shadow-lg shadow-blue-900/15 transition enabled:hover:-translate-y-0.5 enabled:hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-slate-500 disabled:shadow-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Send
      </button>
    </form>
  );
}
