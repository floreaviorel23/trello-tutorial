import OrgControl from "./_components/org-control";

function OrganizationIdLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <OrgControl />
      {children}
    </div>
  );
}

export default OrganizationIdLayout;
