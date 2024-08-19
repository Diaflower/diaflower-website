

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface Address {
    id: string
    name: string
    street: string
    city: string
    country: string
    phone: string
  }

const AddressCard = ({ address, onDelete, onModify }: { address: Address, onDelete: () => void, onModify: () => void })  => {
 
 
    return (
    <Card className="mb-4">
    <CardContent className="pt-6">
      <h3 className="text-lg font-semibold mb-2">{address.city.toUpperCase()}</h3>
      <p className="text-sm text-muted-foreground mb-2">Shipping<br />Default Address</p>
      <p className="text-sm">
        {address.name}<br />
        {address.street}<br />
        {address.city}<br />
        {address.country}<br />
        {address.phone}
      </p>
    </CardContent>
    <CardFooter className="flex justify-between">
      <Button variant="outline" onClick={onDelete}>DELETE</Button>
      <Button variant="default" onClick={onModify}>MODIFY</Button>
    </CardFooter>
  </Card>
  )
}

export default AddressCard