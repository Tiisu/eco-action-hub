
import { useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/home/Hero';
import { Stats } from '@/components/home/Stats';
import { Features } from '@/components/home/Features';
import { Partners } from '@/components/home/Partners';

const Index = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Stats />
        <Features />
        <Partners />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
