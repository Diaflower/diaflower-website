import * as React from "react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PlusIcon } from 'lucide-react'
import { AddressFormData } from '@/schemas/addressSchema'
import AddressForm from "../forms/AddressForm"

interface AddressFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedAddress: AddressFormData | null
  onSubmit: (data: AddressFormData) => void
}

export function AddressFormDialog({ open, onOpenChange, selectedAddress, onSubmit }: AddressFormDialogProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const content = (
    <ScrollArea className="h-[calc(100vh-16rem)] md:h-[calc(80vh-8rem)] px-4">
      <AddressForm selectedAddress={selectedAddress} onSubmit={onSubmit} className="pb-8" />
    </ScrollArea>
    
  )

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          {/* <Button>
            <PlusIcon className="mr-2 h-4 w-4" /> Add New Address
          </Button> */}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[525px] max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>{selectedAddress ? 'Edit Address' : 'Add New Address'}</DialogTitle>
          </DialogHeader>
          {content}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        {/* <Button>
          <PlusIcon className="mr-2 h-4 w-4" /> Add New Address
        </Button> */}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{selectedAddress ? 'Edit Address' : 'Add New Address'}</DrawerTitle>
        </DrawerHeader>
        {content}
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}