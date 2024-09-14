import React from 'react'
import { cn } from "@/lib/utils"

interface StepsProps {
  steps: string[]
  currentStep: number
  className?: string
}

export function Steps({ steps, currentStep, className }: StepsProps) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                index <= currentStep
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {index + 1}
            </div>
            <div className="mt-2 text-sm font-medium">{step}</div>
          </div>
          {index < steps.length - 1 && (
            <div
              className={cn(
                "flex-1 h-0.5",
                index < currentStep ? "bg-primary" : "bg-muted"
              )}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}