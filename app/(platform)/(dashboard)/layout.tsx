import NavbarDashboard from "./_components/navbarDashboard";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full">
      <NavbarDashboard />
      {children}
    </div>
  );
}

export default DashboardLayout;
