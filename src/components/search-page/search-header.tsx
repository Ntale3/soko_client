import { useRef, useEffect } from "react"
import { useNavigate } from "@tanstack/react-router"
import { Search, X, ArrowLeft } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface SearchHeaderProps {
  query: string
  activeTab: string
  onQueryChange: (q: string) => void
  onTabChange: (tab: string) => void
}

export const SearchHeader = ({
  query,
  activeTab,
  onQueryChange,
  onTabChange,
}: SearchHeaderProps) => {
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="sticky top-0 z-40 border-b border-border bg-card rounded-b-4xl px-4 pb-3 pt-12 shadow-sm">
      {/* Search bar row */}
      <div className="mb-4 flex items-center flex-center gap-2.5">
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0"
          onClick={() => navigate({ to: "/home" })}
        >
          <ArrowLeft className="size-4" />
        </Button>

          {/* <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground pointer-events-none" /> */}
          <Input
            ref={inputRef}
            leftIcon={<Search size={13}/>}
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder={
              activeTab === "farmers"
                ? "Search farmers by name, crop, location..."
                : "Search produce, products..."
            }
            className="bg-muted border-none rounded-2xl text-sm h-11"
          />

          {query && (
            <Button
              onClick={() => onQueryChange("")}
              variant={"ghost"}
            >
              <X className="size-4" />
            </Button>
          )}

      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={onTabChange}>
        <TabsList className="w-full rounded-2xl">
          <TabsTrigger value="farmers" className="flex-1 capitalize rounded-xl">
            Farmers
          </TabsTrigger>
          <TabsTrigger value="produce" className="flex-1 capitalize rounded-xl">
            Produce
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}