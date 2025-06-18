"use client";

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { APP_NAME, NAVIGATION_ITEMS } from '@/lib/constants';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';


export function AppClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
             {/* Placeholder for logo, using an icon for now */}
            <Link href="/" className="flex items-center gap-2 hover:no-underline">
                <Home className="h-8 w-8 text-primary" />
                <h1 className="text-xl font-semibold text-primary group-data-[collapsible=icon]:hidden">
                {APP_NAME}
                </h1>
            </Link>
            <div className="flex-1 group-data-[collapsible=icon]:hidden" />
            <SidebarTrigger className="group-data-[collapsible=icon]:hidden" />
          </div>
        </SidebarHeader>
        <Separator className="group-data-[collapsible=icon]:hidden" />
        <ScrollArea className="flex-1">
          <SidebarContent>
            <SidebarMenu className="p-2">
              {NAVIGATION_ITEMS.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))}
                    tooltip={item.name}
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </ScrollArea>
      </Sidebar>
      <SidebarInset>
        <ScrollArea className="h-full">
          <div className="p-4 md:p-6">
            {children}
          </div>
        </ScrollArea>
      </SidebarInset>
    </>
  );
}
