import { ScanHeader } from "@/components/scan/ScanHeader";
import { VehicleUploadDropzone } from "@/components/scan/VehicleUploadDropzone";

export default function ScanPage() {
  return (
    <main className="min-h-screen bg-[#F5F7FB] px-5 py-8 text-slate-950 sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-2xl flex-col">
        <ScanHeader />

        <section className="flex flex-1 items-center py-8">
          <VehicleUploadDropzone />
        </section>
      </div>
    </main>
  );
}
