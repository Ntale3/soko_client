import React from 'react'
import { Button } from '../ui/button'
import { ArrowRight, Sparkle } from 'lucide-react'

const AiBanner = () => {
  return (
        <div className='rounded-3xl overflow-hidden bg-linear-to-br from-primary via-muted-600 to-card p-5 shadow-2xl relative'>
          {/* decorative subtle overlay blobs */}
          <div className='absolute -top-10 -right-10 size-40 rounded-full bg-foreground/10'/>
          <div className='absolute -bottom-8 -left-8 size-28 rounded-full bg-foreground/5'/>

          {/* Content */}
          <div className='relative z-10'>
            {/* Badge/ label */}
            <div className='flex items-center gap-2 mb-2'>
              <div className='size-6 rounded-lg bg-foreground/20 flex items-center justify-center'>
                <Sparkle size={13} className='text-foreground'/>
              </div>
              <span className='text-card-foreground text-sm font-bold uppercase tracking-wider'>
                AI Insights
              </span>
            </div>

            {/* Heading */}
            <h2
            className='text-foreground text-lg  font-bold leading-tight mb-1 font-serif'
            >
              Avocado prices rising 37% in 2 weeks
            </h2>

            {/* Description */}
            <p className='text-foreground/60 text-xs mb-4'>
              Based on market data & seasonal trends
            </p>

            {/* CTA  */}
            <Button className='hover:bg-primary/50 hover:shadow-xl hover-105 transition-all duration-200 '>
              View Prediction <ArrowRight />
            </Button>
          </div>

        </div>
  )
}

export default AiBanner