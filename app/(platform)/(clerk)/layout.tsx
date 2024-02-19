import { Button } from "@/components/ui/button";
import Link from "next/link";

function ClerkLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center pb-10 space-y-6 bg-gradient-to-r from-slate-500 to-slate-800">
      {children}
      <Button variant="blueish" className="shadow-lg" asChild>
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  );
}
export default ClerkLayout;
