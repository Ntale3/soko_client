import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Home, HomeIcon, MessageCircle, Search, ShoppingBag, User } from "lucide-react";

import Navbar from "@/components/common/nav";
import { BottomNav, type BottomNavItem } from "@/components/navigation/bottom-navigation";

const NAV_ITEMS: BottomNavItem[] = [
  {
    label: "Home",
    href: "/home",
    icon: <Home className="size-5" />,
    activeIcon: <HomeIcon className="size-5 fill-primary stroke-primary" />,
  },
  {
    label: "Market",
    href: "/marketplace",
    icon: <ShoppingBag className="size-5" />,
  },
  {
    label: "Search",
    href: "/search",
    icon: <Search className="size-5" />,
  },
  {
    label: "Messages",
    href: "/messages",
    icon: <MessageCircle className="size-5" />,
    badge: 1, // unread count — pass 0 or omit to hide
  },
  {
    label: "Profile",
    href: "/profile",
    icon: <User className="size-5" />,
  },
];

export const Route = createFileRoute("/(app)")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <BottomNav items={NAV_ITEMS} />
    </div>
  );
}
