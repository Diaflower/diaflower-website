import React from 'react';
import Link from 'next/link';
import { PhoneIcon, MailIcon, MessageCircleIcon, MapPinIcon, CalendarIcon, HelpCircleIcon, ArrowRightIcon } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import CategoryHeaderSection from '@/components/shared/CategoryHeaderSection';

interface ContactOptionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  details?: string;
  action: string;
  actionHref: string;
}

const ContactOption: React.FC<ContactOptionProps> = ({ icon, title, description, details, action, actionHref }) => (
  <Card>
    <CardContent className="flex flex-col h-full min-h-[200px] p-4">
      <div className="flex items-center space-x-3 mb-4">
        {icon}
        <h3 className="text-lg font-semibold uppercase">{title}</h3>
      </div>
      <div className="flex-grow">
        <p className="text-sm text-muted-foreground">{description}</p>
        {details && <p className="text-sm text-muted-foreground mt-2">{details}</p>}
      </div>
      <Link
        href={actionHref}
        className="inline-flex items-center text-sm font-medium text-primary hover:underline mt-4"
      >
        {action}
        <ArrowRightIcon className="w-4 h-4 ml-1" />
      </Link>
    </CardContent>
  </Card>
);

const contactOptions: ContactOptionProps[] = [
  {
    icon: <PhoneIcon className="w-6 h-6" />,
    title: "Call us",
    description: "General Enquiries",
    details: "10am - 10pm from Monday to Sunday",
    action: "Tel. 800-0321180",
    actionHref: "tel:8000321180"
  },
  {
    icon: <MailIcon className="w-6 h-6" />,
    title: "E-mail us",
    description: "A Diaflower staff will respond as soon as possible",
    action: "Send an e-mail",
    actionHref: "/contact-email"
  },
  {
    icon: <MessageCircleIcon className="w-6 h-6" />,
    title: "Message us",
    description: "A Diaflower Staff will assist you on WhatsApp",
    action: "Send a message",
    actionHref: "/contact-whatsapp"
  },
  {
    icon: <MapPinIcon className="w-6 h-6" />,
    title: "Visit us",
    description: "Find your nearest Diaflower location in the UAE",
    action: "Find a shop",
    actionHref: "/find-boutique"
  },
  {
    icon: <CalendarIcon className="w-6 h-6" />,
    title: "Appointments",
    description: "Join us for a personalized appointment at the boutique of your choice",
    action: "Request an appointment",
    actionHref: "/book-appointment"
  },
  {
    icon: <HelpCircleIcon className="w-6 h-6" />,
    title: "FAQ",
    description: "Find answers to commonly raised questions about our services in the UAE",
    action: "Explore FAQ",
    actionHref: "/faq"
  }
];

const ContactUs: React.FC = () => {
 
  return (
    <>
      <CategoryHeaderSection/>
      <section className="contact-options py-12">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">How Can We Help You?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose your preferred method of contact below, and a Diaflower representative in the UAE will be happy to assist you.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contactOptions.map((option, index) => (
              <ContactOption key={index} {...option} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;