import React from 'react'
import { Button } from '../ui/button'
import { FarmerCard } from './famers-card'
import { farmers } from '@/constants/dummy-data'
import { Link } from '@tanstack/react-router'
import { Sparkle } from 'lucide-react'

const AIMatchedFarmersSection = () => {

  return (
     <div>
    {/* Header */}
     <div className="flex items-center justify-between">
        <div className='flex items-center justify-center gap-2'>
        <Sparkle size={13} className='text-foreground'/>
        <h3 className="text-foreground font-semibold">AI-Matched Farmers</h3>
        </div>

        <Button variant={"link"}>
          View all
        </Button>

      </div>

    {/* Horizontal scroll */}
    <div className="flex gap-2.5 overflow-x-auto -mx-4 px-4 pb-2 no-scrollbar">
      {farmers.slice(0, 4).map((f) => (
        <FarmerCard key={f.id} farmer={f} />
      ))}
    </div>
  </div>
  )
}

export default AIMatchedFarmersSection