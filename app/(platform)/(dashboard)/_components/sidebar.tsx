"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import { access } from "fs";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useLocalStorage } from "usehooks-ts";
import dynamic from "next/dynamic";

interface SidebarProps {
  storageKey?: string;
}

function Sidebar({ storageKey = "t-sidebar-state" }: SidebarProps) {
  const [accordion, setAccordion] = useLocalStorage(
    "accordion-storage-key",
    []
  );

  //   const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
  //     storageKey,
  //     {}
  //   );

  //   const { organization: activeOrganization, isLoaded: isLoadedOrg } =
  //     useOrganization();

  //   const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
  //     userMemberships: { infinite: true },
  //   });

  //   const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
  //     (acc: string[], key: string) => {
  //       if (expanded[key]) acc.push(key);
  //       return acc;
  //     },
  //     []
  //   );

  //   const onExpand = (id: string) => {
  //     setExpanded((curr) => ({ ...curr, [id]: !expanded[id] }));
  //   };

  //   if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
  //     return (
  //       <>
  //         <Skeleton />
  //       </>
  //     );
  //   }

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

      {/* <Accordion
        type="multiple"
        defaultValue={defaultAccordionValue}
      ></Accordion> */}

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
        className="w-full"
        defaultValue={accordion}
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that matches the other
            components&apos; aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>
            Yes. It's animated by default, but you can disable it if you prefer.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}

export default dynamic(() => Promise.resolve(Sidebar), {
  ssr: false,
});
