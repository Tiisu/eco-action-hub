
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md px-4 py-8 text-center">
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-[180px] font-bold text-gray-100">404</div>
          </div>
          <div className="relative z-10">
            <h1 className="text-6xl font-bold mb-4 text-pci-700">404</h1>
            <p className="text-xl text-gray-600 mb-8">Oops! Page not found</p>
          </div>
        </div>
        
        <p className="text-gray-500 mb-8">
          The page you are looking for might have been removed, had its name changed,
          or is temporarily unavailable.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => window.history.back()} 
            variant="outline" 
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
          
          <Button asChild className="bg-pci-500 hover:bg-pci-600 flex items-center gap-2">
            <Link to="/">
              <Home className="h-4 w-4" />
              Return to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
