'use client'

import { SignIn } from '@clerk/nextjs'
import { Dialog, DialogContent } from '@/components/ui/dialog'

interface SignInDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SignInDialog({ open, onOpenChange }: SignInDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 bg-transparent border-none">
        <SignIn 
          appearance={{
            elements: {
              rootBox: "shadow-none",
              card: "shadow-lg"
            }
          }}
        />
      </DialogContent>
    </Dialog>
  )
}