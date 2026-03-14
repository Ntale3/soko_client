import { ReactElement, ReactNode } from 'react';
import {Link,useRouterState} from "@tanstack/react-router"
import {cn} from "@/lib/utils"


// Types
export interface BottomNavItem {
  label: string
  href: string
  icon: ReactNode
  activeIcon?: ReactNode
  badge?: number
}

interface BottomNavProps {
  items: BottomNavItem[]
  className?: string
}

//Badge
const NavBadge =({count}:{count:number})=>{
  if(count<=0) return null;
  return (
    <span className='absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center bg-destructive text-[10px] font-bold text-destructive-foreground'>
      {count > 99 ?"99+":count}
    </span>
  )
}

// Item

const BottomNavItem =({
  item,
  isActive
}:
{
  item: BottomNavItem,
  isActive: boolean
}
)=>(

  <Link
  to={item.href}
  className={cn("relative flex flex-1 flex-col items-center justify-center gap-1 py-2",
    "text-muted-foreground transition-colors duration-200",
    "hover:text-foreground",
    {"text-primary":isActive}
  )}
  >
    {/* Icon with badge */}
    <div className="relative">
      {isActive && item.activeIcon ? item.activeIcon : item.icon}
      {item.badge !== undefined && <NavBadge count={item.badge} />}
    </div>

    {/* Label */}
    <span
      className={cn(
        "text-[10px] font-medium leading-none transition-colors",
        isActive ? "text-primary" : "text-muted-foreground"
      )}
    >
      {item.label}
    </span>

     {/* Active indicator dot */}
    {isActive && (
      <span className="absolute bottom-0 left-1/2 size-1 -translate-x-1/2 rounded-full bg-primary" />
    )}
  </Link>

  )

//Root

function BottomNav({items,className}:BottomNavProps){
  const pathName = useRouterState({
    select: (s)=> s.location.pathname
  })

  return (
    <nav
    data-slot="bottom-nav"
    className={cn(
      "md:hidden fixed bottom-0 left-0 right-0 z-50",
      "flex h-16  items-stretch",
      "border-t border-border bg-background/50 backdrop-blur-md",
      "pb-safe-bottom", 
      className
    )}
    >
      {items.map((item) => (
        <BottomNavItem
          key={item.href}
          item={item}
          isActive={pathName === item.href}
        />
      ))}

    </nav>
  )
}

export {BottomNav, type BottomNavProps}