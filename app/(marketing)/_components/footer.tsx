import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const textFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

function Footer() {
  return (
    <div className="fixed bottom-0 w-full p-3 border-t bg-gray-300 mb-2">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <div className="flex items-center justify-between w-full mr-8">
          <div
            className={cn(
              "text-sm italic text-neutral-600",
              textFont.className
            )}
          >
            Implemented & Maintained by Viorel Florea
          </div>
          <div
            className={cn(
              "text-sm italic text-neutral-600",
              textFont.className
            )}
          >
            Copyright &copy; 2024 Taskmaster
          </div>
        </div>

        <div className="md:block md:w-auto flex items-center justify-between w-full">
          <Link
            href="https://github.com/floreaviorel23/trello-tutorial"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub
              className="w-8 h-8 rounded-full bg-inherit"
              color="black"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
