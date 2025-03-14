
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, LogIn } from 'lucide-react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Change navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'py-3 bg-white/80 backdrop-blur-lg shadow-subtle' : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-pci-600 to-pci-800">
              PCI
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium text-foreground hover:text-pci-600 transition-default">Home</Link>
            <Link to="/about" className="text-sm font-medium text-foreground hover:text-pci-600 transition-default">About</Link>
            <Link to="/education" className="text-sm font-medium text-foreground hover:text-pci-600 transition-default">Education</Link>
            <Link to="/leaderboard" className="text-sm font-medium text-foreground hover:text-pci-600 transition-default">Leaderboard</Link>
            <Button asChild variant="ghost" className="ml-2">
              <Link to="/login" className="flex items-center gap-1.5">
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </Link>
            </Button>
            <Button asChild className="ml-2 bg-pci-500 hover:bg-pci-600">
              <Link to="/register">Register</Link>
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/90 backdrop-blur-lg shadow-md animate-slide-in-right">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-foreground py-2 hover:text-pci-600 transition-default"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-foreground py-2 hover:text-pci-600 transition-default"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/education" 
              className="text-foreground py-2 hover:text-pci-600 transition-default"
              onClick={() => setMobileMenuOpen(false)}
            >
              Education
            </Link>
            <Link 
              to="/leaderboard" 
              className="text-foreground py-2 hover:text-pci-600 transition-default"
              onClick={() => setMobileMenuOpen(false)}
            >
              Leaderboard
            </Link>
            <div className="flex space-x-3 pt-2">
              <Button asChild variant="outline" className="w-full">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  Login
                </Link>
              </Button>
              <Button asChild className="w-full bg-pci-500 hover:bg-pci-600">
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  Register
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
