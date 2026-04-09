import ServicePage from '@/components/shop/service-page';
import { SERVICES } from '@/lib/data/services';

export default function PhonesServicePage() {
  const service = SERVICES.find(s => s.slug === 'phones')!;
  return <ServicePage service={service} />;
}
