'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { PlusIcon } from 'lucide-react'
import AddressCard from '../shared/cards/AddressCard'

interface Address {
    id: string
    name: string
    street: string
    city: string
    country: string
    phone: string
  }

const AddressesContent = () => {
    const [addresses, setAddresses] = useState<Address[]>([])
    const [deleteAddress, setDeleteAddress] = useState<Address | null>(null)
  
    const handleAddAddress = () => {
      // Implement add address functionality
      console.log("Add new address")
    }
  
    const handleDeleteAddress = (address: Address) => {
      setDeleteAddress(address)
    }
  
    const confirmDelete = () => {
      if (deleteAddress) {
        setAddresses(addresses.filter(a => a.id !== deleteAddress.id))
        setDeleteAddress(null)
      }
    }
  
    const handleModifyAddress = (address: Address) => {
      // Implement modify address functionality
      console.log("Modify address", address)
    }
  
    return (
      <div className="max-w-2xl mx-auto p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <h2 className="text-2xl font-bold mb-4 sm:mb-0">
            {addresses.length === 0 ? "MY ADDRESSES" : `YOU HAVE ${addresses.length} SAVED ADDRESS${addresses.length > 1 ? 'ES' : ''}`}
          </h2>
          <Button variant="outline" onClick={handleAddAddress} className="self-end sm:self-auto">
            <PlusIcon className="mr-2 h-4 w-4" /> ADD NEW ADDRESS
          </Button>
        </div>
  
        {addresses.length === 0 ? (
          <p className="text-muted-foreground">You have not saved any addresses yet.</p>
        ) : (
          addresses.map(address => (
            <AddressCard
              key={address.id}
              address={address}
              onDelete={() => handleDeleteAddress(address)}
              onModify={() => handleModifyAddress(address)}
            />
          ))
        )}
  
        <Dialog open={deleteAddress !== null} onOpenChange={() => setDeleteAddress(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>DELETE ADDRESS?</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              Are you sure you want to remove the following address from Address Book?
              {deleteAddress && (
                <p className="mt-2">
                  {deleteAddress.name}<br />
                  {deleteAddress.street}<br />
                  {deleteAddress.city}<br />
                  {deleteAddress.country}<br />
                  {deleteAddress.phone}
                </p>
              )}
            </DialogDescription>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteAddress(null)}>CANCEL</Button>
              <Button variant="default" onClick={confirmDelete}>YES</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    )
}

export default AddressesContent