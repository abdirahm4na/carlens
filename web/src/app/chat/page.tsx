import { ChatHeader } from "@/components/chat/ChatHeader";
import { ChatExperience } from "@/components/chat/ChatExperience";

export default function ChatPage() {
  return (
    <main className="min-h-screen bg-[#05070A] px-5 py-7 text-slate-950 sm:px-6 sm:py-10">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl flex-col">
        <ChatHeader />
        <ChatExperience />
      </div>
    </main>
  );
}
