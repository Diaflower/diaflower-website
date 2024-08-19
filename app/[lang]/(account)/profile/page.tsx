'use client'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

export default function ProfilePage() {
  const [title, setTitle] = useState("MR")
  const [firstName, setFirstName] = useState("rami")
  const [lastName, setLastName] = useState("mohammed")
  const [day, setDay] = useState("27")
  const [month, setMonth] = useState("Aug")
  const [year, setYear] = useState("1995")
  const [email, setEmail] = useState("raminoredaini@gmail.com")
  const [language, setLanguage] = useState("English")
  const [marketingConsent, setMarketingConsent] = useState(true)
  

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">Required field*</p>
          <div>
            <Label htmlFor="title" className="text-xs mb-1 block">Title*</Label>
            <RadioGroup id="title" value={title} onValueChange={setTitle} className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="MR" id="mr" />
                <Label htmlFor="mr">MR</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="MRS" id="mrs" />
                <Label htmlFor="mrs">MRS</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="MS" id="ms" />
                <Label htmlFor="ms">MS</Label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <Label htmlFor="firstName" className="text-xs mb-1 block">First Name*</Label>
            <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="lastName" className="text-xs mb-1 block">Last Name*</Label>
            <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
          <div>
            <Label className="text-xs mb-1 block">Date of Birth</Label>
            <div className="flex space-x-2">
              <Select value={day} onValueChange={setDay}>
                <SelectTrigger className="w-[80px]">
                  <SelectValue placeholder="Day" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                    <SelectItem key={day} value={day.toString()}>{day}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={month} onValueChange={setMonth}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => (
                    <SelectItem key={month} value={month}>{month}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={year} onValueChange={setYear}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                    <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="nationality" className="text-xs mb-1 block">Nationality</Label>
            <Select>
              <SelectTrigger id="nationality" className="w-full">
                <SelectValue placeholder="Select nationality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
                {/* Add more nationalities as needed */}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="maritalStatus" className="text-xs mb-1 block">Marital Status</Label>
            <Select>
              <SelectTrigger id="maritalStatus" className="w-full">
                <SelectValue placeholder="Select marital status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Single</SelectItem>
                <SelectItem value="married">Married</SelectItem>
                <SelectItem value="divorced">Divorced</SelectItem>
                <SelectItem value="widowed">Widowed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm">If you change your email address, you will need to reactivate your account from your new email address</p>
          <div>
            <Label htmlFor="email" className="text-xs mb-1 block">Email Address*</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="language" className="text-xs mb-1 block">Preferred Language</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger id="language" className="w-full">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="French">French</SelectItem>
                <SelectItem value="Spanish">Spanish</SelectItem>
                {/* Add more languages as needed */}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Marketing Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm">For further information about how we use your personal information, please see our Privacy Policy.</p>
          <div className="flex items-start space-x-2">
            <Checkbox id="marketing" checked={marketingConsent} onCheckedChange={() => setMarketingConsent(!marketingConsent)} />
            <div>
              <Label htmlFor="marketing" className="text-sm font-normal">
                I would also like to receive marketing information about Cartier's products or services.
              </Label>
              <p className="text-xs text-muted-foreground mt-1">
                We may send you this information using e-mail, text, telephone or post. We may also use your information to deliver personalized messages or advertising on social media or other digital platforms.
                You can ask us to stop marketing at any time.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button className="w-full">SAVE CHANGES</Button>
    </div>
  )
}