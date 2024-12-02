import { Calendar, Home, Inbox, Search } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Product",
    url: "/productList",
    icon: Home,
  },
  {
    title: "Sale Report",
    url: "/sale/report",
    icon: Inbox,
  },
  {
    title: "Admin",
    url: "/manager/view",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
];

export function AppSidebar() {
  return (
    <div className="flex">
      <Sidebar className="w-64 bg-gray-800 ">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem className="top-16" key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <div className="flex p-6">
        
        <h1>Main Content</h1>
      </div>
    </div>
  );
}
