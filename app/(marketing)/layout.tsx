import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "./_components/navbar";
import Footer from "./_components/footer";

function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="default"
      enableSystem
      disableTransitionOnChange
    >
      <div className="h-full bg-slate-100">
        {/* Navbar */}
        <Navbar></Navbar>

        <main className="pt-40 pb-20 bg-slate-100">{children}</main>

        {/* Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default MarketingLayout;
