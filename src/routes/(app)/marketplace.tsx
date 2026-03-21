import { AIBanner } from '@/components/market-place/ai-banner'
import { MarketplaceEmptyState } from '@/components/market-place/empty-state'
import { MarketplaceHeader } from '@/components/market-place/marketplace-header'
import { MarketProductCard } from '@/components/market-place/product-card'
import { products3 } from '@/constants/dummy-data'
import { useMarketplaceStore } from '@/store/marketplace-store'
import { createFileRoute } from '@tanstack/react-router'
import { useMemo } from 'react'

export const Route = createFileRoute('/(app)/marketplace')({
  component: RouteComponent,
})

function RouteComponent() {

const { activeCategory, priceRange } = useMarketplaceStore()

  const visible = useMemo(() => {
    return products3.filter((p) => {
      const categoryMatch =
        activeCategory === "All" || p.category === activeCategory
      const priceMatch =
        p.priceValue >= priceRange[0] && p.priceValue <= priceRange[1]
      return categoryMatch && priceMatch
    })
  }, [activeCategory, priceRange])


  return (
    <div className="min-h-screen bg-background pb-24">
      <MarketplaceHeader />

      <div className="px-4 pt-4">
        <AIBanner />

        {visible.length === 0 ? (
          <MarketplaceEmptyState />
        ) : (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {visible.map((p) => (
              <MarketProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
