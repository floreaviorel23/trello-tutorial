import { Button } from "@/components/ui/button";
import { NotebookPen } from "lucide-react";
import Link from "next/link";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { UserButton } from "@clerk/nextjs";

const headingFont = localFont({ src: "../../public/fonts/font.woff2" });
const textFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

function MarketingPage() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div
        className={cn(
          "flex flex-col justify-center items-center",
          headingFont.className
        )}
      >
        <div className="flex items-center mb-4 border shadow-md rounded-full p-4 bg-amber-100 text-amber-700">
          <NotebookPen className="h-7 w-7 mr-2" />
          Tasks Management App 😋
        </div>

        <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-6">
          Taskmaster helps your projects
        </h1>
        {/* <div className="text-3xl md:text-6xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 p-2 pb-4 w-fit rounded-md">
          work organized.
        </div> */}
      </div>

      <div
        className={cn(
          "text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-3xl text-center mx-auto",
          textFont.className
        )}
      >
        Plan and manage work in a collaborative, productive, and organized way.
        Taskmaster helps you simplify and standardize your team’s work process
        in an intuitive way.
      </div>

      <Button className="mt-6" size="lg" asChild>
        <Link href="/register">Get Taskmaster for free</Link>
      </Button>
    </div>
  );
}

export default MarketingPage;
