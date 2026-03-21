import { useMemo, useState } from "react"
import type { Farmer, Product } from "../types"

export function useSearch(farmers: Farmer[], products: Product[]) {
  const [query, setQuery] = useState("")
  const [activeTab, setActiveTab] = useState("farmers")

  const filteredFarmers = useMemo(() => {
    if (!query) return farmers
    const q = query.toLowerCase()
    return farmers.filter(
      (f) =>
        f.name.toLowerCase().includes(q) ||
        f.produce.some((p) => p.toLowerCase().includes(q)) ||
        f.location.toLowerCase().includes(q)
    )
  }, [query, farmers])

  const filteredProducts = useMemo(() => {
    if (!query) return products
    const q = query.toLowerCase()
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.farmer.toLowerCase().includes(q)
    )
  }, [query, products])

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    setQuery("")
  }

  return {
    query,
    setQuery,
    activeTab,
    handleTabChange,
    filteredFarmers,
    filteredProducts,
  }
}