
import { useRef, useEffect, useState } from 'react';

interface Stat {
  value: string;
  label: string;
  prefix?: string;
  suffix?: string;
}

export function Stats() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const stats: Stat[] = [
    { value: "120", label: "Tons of plastic collected", suffix: "K+" },
    { value: "50", label: "Active collection agents", suffix: "+" },
    { value: "10", label: "Partner organizations", suffix: "+" },
    { value: "25", label: "Countries impacted", suffix: "+" },
  ];
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    
    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  return (
    <section className="py-16 md:py-20 bg-pci-50">
      <div className="container mx-auto px-4">
        <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className={`text-center transition-all duration-700 transform ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <h3 className="text-4xl md:text-5xl font-bold text-pci-800 mb-2 flex items-center justify-center">
                {stat.prefix && <span>{stat.prefix}</span>}
                <span>{stat.value}</span>
                {stat.suffix && <span className="text-pci-600">{stat.suffix}</span>}
              </h3>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
