import { pricePredictions } from '@/constants/dummy-data'
import { ChartNoAxesColumnDecreasing } from 'lucide-react'
import { PricePredictionCard } from './predictions-card'
import { Button } from '../ui/button'

const PricePrediction = () => {
  return (
    <div>
      {/* Price prediction section header */}
      <div className="flex items-center justify-between">
        <div className='flex items-center justify-center gap-2'>
             <ChartNoAxesColumnDecreasing size={13} className='text-foreground'/>
          <h3 className="text-foreground font-semibold">Price Predictions</h3>

        </div>

        <Button variant={"link"}>
          See all
        </Button>

      </div>

      {/* Horizontal scroll */}
    <div className="flex gap-2.5 overflow-x-auto -mx-4 px-4 pb-1 no-scrollbar my-3">
      {pricePredictions.map((p, i) => (
        <PricePredictionCard key={i} p={p} />
      ))}
    </div>
    </div>
  )
}

export default PricePrediction