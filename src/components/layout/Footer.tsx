
import { Link } from 'react-router-dom';
import { Twitter, Facebook, Instagram, Mail, Globe } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-pci-600 to-pci-800">
                PCI
              </h3>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Promoting positive climate impacts through effective plastic waste management around the world.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-pci-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pci-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pci-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider text-gray-500 mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-pci-600 text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-pci-600 text-sm transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/education" className="text-gray-600 hover:text-pci-600 text-sm transition-colors">
                  Education
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="text-gray-600 hover:text-pci-600 text-sm transition-colors">
                  Leaderboard
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider text-gray-500 mb-4">Join Us</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/register" className="text-gray-600 hover:text-pci-600 text-sm transition-colors">
                  Register as User
                </Link>
              </li>
              <li>
                <Link to="/register-agent" className="text-gray-600 hover:text-pci-600 text-sm transition-colors">
                  Become an Agent
                </Link>
              </li>
              <li>
                <Link to="/partners" className="text-gray-600 hover:text-pci-600 text-sm transition-colors">
                  Partner with Us
                </Link>
              </li>
              <li>
                <Link to="/rewards" className="text-gray-600 hover:text-pci-600 text-sm transition-colors">
                  Rewards Program
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider text-gray-500 mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-pci-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600 text-sm">contact@pci-impact.org</span>
              </li>
              <li className="flex items-start space-x-3">
                <Globe className="h-5 w-5 text-pci-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600 text-sm">www.pci-impact.org</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} PCI. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-500 hover:text-pci-600 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-500 hover:text-pci-600 text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
