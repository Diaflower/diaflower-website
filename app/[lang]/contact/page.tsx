import React from 'react';
import Link from 'next/link';
import { PhoneIcon, MailIcon, MessageCircleIcon, MapPinIcon, CalendarIcon, HelpCircleIcon, ArrowRightIcon } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import CategoryHeaderSection from '@/components/shared/CategoryHeaderSection';
import { useTranslations } from 'next-intl';
import { useRTLAwareStyle } from '@/util/rtl';

interface ContactOptionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  details?: string;
  action: string;
  actionHref: string;
}

const ContactOption: React.FC<ContactOptionProps> = ({ icon, title, description, details, action, actionHref }) => {
  const rtlStyle = useRTLAwareStyle('text-left', 'text-right');
  const iconMargin = useRTLAwareStyle('mr-3', 'ml-3');
  const iconRotation = useRTLAwareStyle('', '');
  const arrowRotation = useRTLAwareStyle('', 'rotate-180');
  const letterSpacing = useRTLAwareStyle('tracking-widest', '')

  return (
    <Card className='border-gray-400'>
      <CardContent className={`flex flex-col h-full min-h-[150px] p-4 ${rtlStyle}`}>
        <div className={`flex items-center mb-4 ${rtlStyle}`}>
          <div className={`${iconMargin} ${iconRotation}`}>{icon}</div>
          <h3 className={`text-lg font-semibold uppercase ${letterSpacing}`}>{title}</h3>
        </div>
        <div className="flex-grow">
          <p className="text-sm text-muted-foreground">{description}</p>
          {details && <p className="text-sm text-muted-foreground mt-2">{details}</p>}
        </div>
        <Link
          href={actionHref}
          className={`inline-flex items-center text-sm font-medium text-primary hover:underline mt-4 ${rtlStyle} font-roboto`}
        >
          {action}
          <ArrowRightIcon className={`w-4 h-4 ${useRTLAwareStyle('ml-1', 'mr-1')} ${arrowRotation}`} />
        </Link>
      </CardContent>
    </Card>
  );
};

const ContactUs: React.FC = () => {
  const t = useTranslations('contact');
  const rtlStyle = useRTLAwareStyle('', 'rtl');
  const letterSpacing = useRTLAwareStyle('tracking-widest', '')

  const phoneNumber = '+971554227757';
  const emailAddress = 'info@diaflower.com';
  const googleMapsUrl = 'https://goo.gl/maps/your-location-here'; // Replace with actual Google Maps URL

  const contactOptions: ContactOptionProps[] = [
    {
      icon: <PhoneIcon className="w-6 h-6" />,
      title: t('options.call.title'),
      description: t('options.call.description'),
      details: t('options.call.details'),
      action: t('options.call.action'),
      actionHref: `tel:${phoneNumber}`
    },
    {
      icon: <MailIcon className="w-6 h-6" />,
      title: t('options.email.title'),
      description: t('options.email.description'),
      action: t('options.email.action'),
      actionHref: `mailto:${emailAddress}`
    },
    {
      icon: <MessageCircleIcon className="w-6 h-6" />,
      title: t('options.message.title'),
      description: t('options.message.description'),
      action: t('options.message.action'),
      actionHref: `https://wa.me/${phoneNumber}`
    },
    {
      icon: <MapPinIcon className="w-6 h-6" />,
      title: t('options.visit.title'),
      description: t('options.visit.description'),
      action: t('options.visit.action'),
      actionHref: googleMapsUrl
    },
    {
      icon: <CalendarIcon className="w-6 h-6" />,
      title: t('options.appointments.title'),
      description: t('options.appointments.description'),
      action: t('options.appointments.action'),
      actionHref: `https://wa.me/${phoneNumber}?text=I'd like to book an appointment`
    },
    {
      icon: <HelpCircleIcon className="w-6 h-6" />,
      title: t('options.faq.title'),
      description: t('options.faq.description'),
      action: t('options.faq.action'),
      actionHref: "/faq"
    }
  ];

  return (
    <div>
      <CategoryHeaderSection
        category="contactUs"
        imageSrc={"https://imagedelivery.net/kfVaF5O0522QMIOueHgSrA/33a27abd-081c-42cb-1f35-bca154150800/public"}      
      />
      <section className="contact-options py-1 md:py-12">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-4">
            <h2 className={`text-2xl font-semibold tracking-tight ${letterSpacing}`}>{t('sectionTitle')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('sectionDescription')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contactOptions.map((option, index) => (
              <ContactOption key={index} {...option} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;