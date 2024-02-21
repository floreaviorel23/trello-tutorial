"use client";

import NavItem, { Organization } from "./nav-item";

import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus } from "lucide-react";

import { useLocalStorage } from "usehooks-ts";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import dynamic from "next/dynamic";
import Link from "next/link";

interface SidebarProps {
  storageKey?: string;
}

function Sidebar({ storageKey = "accordion-storage-key" }: SidebarProps) {
  const [accordion, setAccordion] = useLocalStorage(storageKey, []);

  const { organization: activeOrganization, isLoaded: isLoadedOrg } =
    useOrganization();

  const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
    userMemberships: { infinite: true },
  });

  if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
    return (
      <>
        <Skeleton />
      </>
    );
  }

  return (
    <>
      <div className="font-medium text-xs flex items-center mb-1">
        <span className="pl-4">Workspaces</span>
        <Button
          asChild
          type="button"
          size="icon"
          variant="ghost"
          className="ml-auto"
        >
          <Link href="/select-org">
            <Plus className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <Accordion
        onValueChange={(values) => {
          setAccordion([]);
          values.forEach((element) => {
            //@ts-ignore
            setAccordion((curr) => {
              return [...curr, element];
            });
          });
        }}
        type="multiple"
        className="space-y-2"
        defaultValue={accordion}
      >
        {userMemberships.data.map(({ organization }) => (
          <NavItem
            key={organization.id}
            isActive={activeOrganization?.id === organization.id}
            organization={organization as Organization}
            accordion={accordion}
          />
        ))}
      </Accordion>
    </>
  );
}

//Set ssr to false to avoid conflicts between react client side rendering
//and Next ssr (conflicts occur on local storage being different)
export default dynamic(() => Promise.resolve(Sidebar), {
  ssr: false,
});
