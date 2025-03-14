
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Upload, UserCheck, Gift } from 'lucide-react';

export function Features() {
  const featuresRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const elements = entry.target.querySelectorAll('.feature-item');
          elements.forEach((el, index) => {
            setTimeout(() => {
              el.classList.add('opacity-100');
              el.classList.remove('opacity-0', 'translate-y-8');
            }, index * 200);
          });
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }
    
    return () => {
      if (featuresRef.current) {
        observer.unobserve(featuresRef.current);
      }
    };
  }, []);

  const features = [
    {
      icon: <Upload className="h-6 w-6 text-pci-600" />,
      title: "Report Waste",
      description: "Submit waste reports with details about the type, weight, and location of plastic waste you've found.",
      link: "/report"
    },
    {
      icon: <UserCheck className="h-6 w-6 text-pci-600" />,
      title: "Connect with Agents",
      description: "Local verified agents will collect the reported waste and ensure it's properly processed.",
      link: "/agents"
    },
    {
      icon: <Gift className="h-6 w-6 text-pci-600" />,
      title: "Earn Rewards",
      description: "Get PCI points for your environmental contributions and redeem them for exciting rewards from our partners.",
      link: "/rewards"
    }
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground">
            Our platform connects individuals, collection agents, and partner organizations to create a seamless waste management ecosystem.
          </p>
        </div>
        
        <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="feature-item bg-white rounded-xl p-6 border border-gray-100 shadow-subtle opacity-0 translate-y-8 transition-all duration-500"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="h-12 w-12 rounded-xl bg-pci-100 flex items-center justify-center mb-5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground mb-5">
                {feature.description}
              </p>
              <Button asChild variant="link" className="p-0 text-pci-600 hover:text-pci-700">
                <Link to={feature.link} className="flex items-center">
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
