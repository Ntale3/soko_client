import AiBanner from '@/components/Home-page/ai-banner'
import AIMatchedFarmersSection from '@/components/Home-page/ai-matched-farmers-section'
import PricePrediction from '@/components/Home-page/ai-price-predictions'
import Categories from '@/components/Home-page/categories'
import { FreshListingsSection } from '@/components/Home-page/fresh-listing-section'
import { LatestArticlesSection } from '@/components/Home-page/latest-articles-section'
import StickyHeader from '@/components/Home-page/sticky-header'
import { blogs, products } from '@/constants/dummy-data'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/home')({
  component: RouteComponent,
})

function RouteComponent() {

  return (
    <div className='pb-24 min-h-screen bg-background '>
      {/* Sticky Header */}
      <StickyHeader/>

      <div className='flex flex-col gap-7 px-4 pt-5 no-scrollbar '>
        {/* AI Banner */}
        <AiBanner/>

         {/* Categories */}
         <Categories/>

         {/* ai - price - predictions */}
         <PricePrediction/>

          {/* ai - farmer- recommendations */}

          <AIMatchedFarmersSection/>

          {/* Fresh listing section */}
          <FreshListingsSection products={products}/>

          {/* latest blog section */}
          <LatestArticlesSection blogs={blogs}/>

      </div>

    </div>
  )
}
