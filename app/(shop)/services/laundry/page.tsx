import ServicePage from '@/components/shop/service-page';
import { SERVICES } from '@/lib/data/services';

export default function LaundryServicePage() {
  const service = SERVICES.find(s => s.slug === 'laundry')!;
  return <ServicePage service={service} />;
}
