import { farmers, products } from '@/components/search-page/data'
import { EmptyState } from '@/components/search-page/empty-state'
import { FarmerResultCard } from '@/components/search-page/farmer-result-card'
import { ProduceResultCard } from '@/components/search-page/produce-result-card'
import { ResultsCount } from '@/components/search-page/results-count'
import { SearchHeader } from '@/components/search-page/search-header'
import { TrendingSearches } from '@/components/search-page/trending-searches'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { useSearchStore } from '@/store/search-store'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/search')({
  component: RouteComponent,
})

function RouteComponent() {

  const {
    query,
    activeTab,
    setQuery,
    setActiveTab,
    getFilteredFarmers,
    getFilteredProducts,
  } = useSearchStore()

  const filteredFarmers = getFilteredFarmers(farmers)
  const filteredProducts = getFilteredProducts(products)
  const activeCount =
    activeTab === "farmers" ? filteredFarmers.length : filteredProducts.length



  return (
    <div className='pb-24 min-h-screen bg-background'>



       <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="min-h-screen bg-muted/30 pb-24"
       >
      <SearchHeader
        query={query}
        activeTab={activeTab}
        onQueryChange={setQuery}
        onTabChange={setActiveTab}
      />

      <div className="px-4 pt-4">
        {!query && <TrendingSearches onSelect={setQuery} />}

        <ResultsCount count={activeCount} query={query} />

        <TabsContent value="farmers" className="mt-0">
          {filteredFarmers.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="flex flex-col gap-2.5">
              {filteredFarmers.map((f) => (
                <FarmerResultCard key={f.id} farmer={f} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="produce" className="mt-0">
          {filteredProducts.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {filteredProducts.map((p) => (
                <ProduceResultCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </TabsContent>
      </div>
    </Tabs>

    </div>
  )
}
