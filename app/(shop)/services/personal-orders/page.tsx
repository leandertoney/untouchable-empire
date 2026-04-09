import ServicePage from '@/components/shop/service-page';
import { SERVICES } from '@/lib/data/services';

export default function PersonalOrdersServicePage() {
  const service = SERVICES.find(s => s.slug === 'personal-orders')!;
  return <ServicePage service={service} />;
}
