import ServicePage from '@/components/shop/service-page';
import { SERVICES } from '@/lib/data/services';

export default function ApparelServicePage() {
  const service = SERVICES.find(s => s.slug === 'apparel')!;
  return <ServicePage service={service} />;
}
