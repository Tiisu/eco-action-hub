
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Recycle, Users, Award } from 'lucide-react';

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  
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
    
    if (heroRef.current) {
      observer.observe(heroRef.current);
    }
    
    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);
  
  return (
    <div className="relative pt-20 overflow-hidden">
      {/* Background graphic */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-br from-pci-100/30 to-pci-200/30 blur-3xl" />
        <div className="absolute top-[60%] -left-[5%] w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-pci-100/20 to-pci-200/20 blur-3xl" />
      </div>
      
      <div 
        ref={heroRef} 
        className="container mx-auto px-4 pt-16 pb-24 md:pt-24 md:pb-32 relative z-10 opacity-0 transition-opacity duration-1000"
      >
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-block animate-fade-in">
            <div className="px-3 py-1 rounded-full bg-pci-100 border border-pci-200 text-pci-800 text-xs font-medium inline-flex items-center">
              <Recycle className="h-3.5 w-3.5 mr-1.5" />
              <span>Positive Climate Impact</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-fade-in opacity-0" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            Making plastic waste <span className="text-gradient">management</span> rewarding
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in opacity-0" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
            Join our community and help create a cleaner planet while earning rewards for your environmental efforts.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4 animate-fade-in opacity-0" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
            <Button asChild className="bg-pci-500 hover:bg-pci-600 h-12 px-6 rounded-full text-white shadow-md hover-scale">
              <Link to="/register">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-12 px-6 rounded-full border-pci-200 text-pci-700 hover:bg-pci-50 hover-scale">
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 animate-fade-in opacity-0" style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>
          <div className="glass-card rounded-2xl p-6 hover-scale">
            <div className="h-12 w-12 rounded-xl bg-pci-100 flex items-center justify-center mb-4">
              <Recycle className="h-6 w-6 text-pci-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Report Waste</h3>
            <p className="text-muted-foreground text-sm">
              Easily report plastic waste in your area and contribute to a cleaner environment.
            </p>
          </div>
          
          <div className="glass-card rounded-2xl p-6 hover-scale">
            <div className="h-12 w-12 rounded-xl bg-pci-100 flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-pci-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Connect with Agents</h3>
            <p className="text-muted-foreground text-sm">
              Local agents will collect the reported waste and ensure proper recycling.
            </p>
          </div>
          
          <div className="glass-card rounded-2xl p-6 hover-scale">
            <div className="h-12 w-12 rounded-xl bg-pci-100 flex items-center justify-center mb-4">
              <Award className="h-6 w-6 text-pci-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Earn Rewards</h3>
            <p className="text-muted-foreground text-sm">
              Get PCI points for your contributions and redeem them for exciting rewards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
