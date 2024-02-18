import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <div className="fixed bottom-0 w-full p-4 border-t bg-slate-100 ">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />

        <div className="md:block md:w-auto flex items-center justify-between w-full">
          <Link
            href="https://github.com/floreaviorel23/trello-tutorial"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="w-8 h-8" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
