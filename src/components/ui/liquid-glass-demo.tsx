"use client"

import { LiquidButton, MetalButton } from "@/components/ui/liquid-glass-button"

export function LiquidGlassDemo() {
  return (
    <div className="flex flex-col items-center gap-8 py-10">
      <div className="flex flex-wrap justify-center gap-6 items-center">
        <div className="flex flex-col items-center gap-2">
           <span className="text-xs text-white/50 uppercase tracking-widest">Liquid Glass</span>
           <LiquidButton>
             Liquid Glass
           </LiquidButton>
        </div>
        
        <div className="flex flex-col items-center gap-2">
           <span className="text-xs text-white/50 uppercase tracking-widest">Metal Default</span>
           <MetalButton>Metal Button</MetalButton>
        </div>

        <div className="flex flex-col items-center gap-2">
           <span className="text-xs text-white/50 uppercase tracking-widest">Metal Gold</span>
           <MetalButton variant="gold">Gold Edition</MetalButton>
        </div>

        <div className="flex flex-col items-center gap-2">
           <span className="text-xs text-white/50 uppercase tracking-widest">Metal Bronze</span>
           <MetalButton variant="bronze">Bronze Tier</MetalButton>
        </div>
      </div>
    </div>
  )
}
