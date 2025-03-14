
import { useRef, useEffect } from 'react';

export function Partners() {
  const partnersRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          entry.target.classList.remove('opacity-0');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    if (partnersRef.current) {
      observer.observe(partnersRef.current);
    }
    
    return () => {
      if (partnersRef.current) {
        observer.unobserve(partnersRef.current);
      }
    };
  }, []);
  
  // In a real implementation, these would be actual partner logos
  const partners = [
    { name: "EcoSolutions", logo: "ES" },
    { name: "GreenTech", logo: "GT" },
    { name: "CleanOcean", logo: "CO" },
    { name: "RecycleNow", logo: "RN" },
    { name: "Plastaway", logo: "PA" },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Partners</h2>
          <p className="text-muted-foreground">
            We collaborate with leading organizations committed to environmental sustainability and plastic waste reduction.
          </p>
        </div>
        
        <div 
          ref={partnersRef}
          className="grid grid-cols-2 md:grid-cols-5 gap-8 opacity-0 transition-opacity duration-1000"
        >
          {partners.map((partner) => (
            <div 
              key={partner.name}
              className="flex items-center justify-center h-24 rounded-lg bg-white border border-gray-100 shadow-subtle hover:shadow-md transition-default hover-scale"
            >
              <div className="h-12 w-12 rounded-full bg-pci-100 flex items-center justify-center">
                <span className="text-pci-600 font-semibold">{partner.logo}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
