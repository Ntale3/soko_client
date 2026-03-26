import { useNavigate } from "@tanstack/react-router";
import { Bell, Search } from "lucide-react";

import { Logo } from "@/components/landing-page/logo";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const StickyHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-card pt-12 pb-3 px-4 sticky top-0 border-b border-border shadow-sm z-50 rounded-b-4xl hidden">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h1 className="text-xl font-extrabold text-primary font-serif">
            <Logo size="md" LogoStyle="text-foreground" />
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {/* Notification button with dot */}
          <Button className="relative w-9 h-9 rounded-xl bg-accent flex items-center justify-center">
            <Bell size={18} className="text-foreground" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-destructive" />
          </Button>

          <Avatar>
            {/* <AvatarImage
              src="https://github.com/shadcn.png"
              alt="@shadcn"
              className="grayscale"
            /> */}
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Greetings */}
      <div>
        <div className="my-4">
          <p className="text-card-foreground">Good Morning</p>
          <p className="font-bold text-lg">Kasule Andrew!</p>
        </div>
      </div>
      {/* Search trigger button  */}
      <Input
        leftIcon={<Search size={16} className="text-muted-foreground" />}
        placeholder="Search farmers, produce, prices..."
        className="h-11 rounded-2xl"
        onFocus={() => navigate({ to: "/search" })}
      />
    </div>
  );
};

export default StickyHeader;
