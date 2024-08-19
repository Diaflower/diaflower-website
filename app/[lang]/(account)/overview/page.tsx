import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type OverviewCardProps = {
  title: string;
  content: React.ReactNode;
}

function OverviewCard({ title, content }: OverviewCardProps) {
  return (
    <Card>
      <CardHeader>
      <h2 className="text-xl font-semibold leading-none tracking-tight">{title}</h2>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </Card>
  )
}

const overviewData = [
  {
    title: "MY PROFILE",
    content: (
      <>
        <p>Mr rami mohammed</p>
        <p>raminoreidaim@gmail.com</p>
      </>
    ),
  },
  {
    title: "MY ORDERS",
    content: <p>You have not previously ordered as a registered customer.</p>,
  },
  {
    title: "MY WISH LIST",
    content: <p>Your Wish List is empty.</p>,
  },
  {
    title: "MY ADDRESSES",
    content: (
      <>
        <p>You have not saved any addresses yet.</p>
        <Button variant="link" className="p-0 h-auto font-normal">Add new address</Button>
      </>
    ),
  },
]

export default function OverviewPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {overviewData.map((data, index) => (
        <OverviewCard key={index} title={data.title} content={data.content} />
      ))}
    </div>
  )
}



