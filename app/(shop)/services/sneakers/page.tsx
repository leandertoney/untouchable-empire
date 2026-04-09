import ServicePage from '@/components/shop/service-page';
import { SERVICES } from '@/lib/data/services';

export default function SneakersServicePage() {
  const service = SERVICES.find(s => s.slug === 'sneakers')!;
  return <ServicePage service={service} />;
}
