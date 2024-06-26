import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import localFont from "next/font/local";

const headingFont = localFont({ src: "../public/fonts/font.woff2" });

function Logo() {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
        <Image
          sizes="100%"
          priority
          src="/logo.svg"
          alt="Logo"
          height={30}
          width={30}
        />
        <p
          className={cn(
            "text-lg text-neutral-700 pt-1.5",
            headingFont.className
          )}
        >
          Taskmaster
        </p>
      </div>
    </Link>
  );
}

export default Logo;
