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
      className="sticky bottom-0 mt-4 flex gap-3 border-t border-slate-200 bg-[#F5F7FB]/95 py-4 backdrop-blur"
    >
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Ask about reliability, value, specs..."
        className="min-h-12 min-w-0 flex-1 rounded-full bg-white px-5 text-sm font-medium text-slate-950 shadow-sm ring-1 ring-slate-200 transition placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        disabled={!value.trim() || isSending}
        className="min-h-12 shrink-0 rounded-full bg-blue-600 px-5 text-sm font-bold text-white shadow-lg shadow-blue-900/15 transition enabled:hover:-translate-y-0.5 enabled:hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Send
      </button>
    </form>
  );
}
