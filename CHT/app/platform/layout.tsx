import { PlatformSidebar } from "@/components/platform/PlatformSidebar";
import { PlatformHeader } from "@/components/platform/PlatformHeader";

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <PlatformSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <PlatformHeader />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
