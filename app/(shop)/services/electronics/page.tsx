import ServicePage from '@/components/shop/service-page';
import { SERVICES } from '@/lib/data/services';

export default function ElectronicsServicePage() {
  const service = SERVICES.find(s => s.slug === 'electronics')!;
  return <ServicePage service={service} />;
}
