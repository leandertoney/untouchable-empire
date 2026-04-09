'use client';

export default function Marquee() {
  const text = 'FREE LOCAL PICKUP & DELIVERY\u2003\u2003\u2726\u2003\u2003PRICE MATCH GUARANTEE\u2003\u2003\u2726\u2003\u2003SERVING LANCASTER, PA & SURROUNDING AREAS\u2003\u2003\u2726\u2003\u2003';
  const repeated = text.repeat(8);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-gold-500 text-black overflow-hidden whitespace-nowrap">
      <div className="animate-marquee inline-block py-1.5">
        <span className="text-xs font-bold uppercase tracking-widest">
          {repeated}
        </span>
        <span className="text-xs font-bold uppercase tracking-widest">
          {repeated}
        </span>
      </div>
    </div>
  );
}
