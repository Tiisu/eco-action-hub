
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, BookOpen, Globe, Recycle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function Education() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12 mt-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-pci-800">Educational Resources</h1>
          
          <p className="text-lg text-gray-700 mb-8">
            Learn about plastic waste management, recycling best practices, and how your actions
            can create positive climate impacts.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            <div className="bg-white rounded-lg shadow-subtle overflow-hidden hover:shadow-elevated transition-all">
              <div className="h-48 bg-gradient-to-r from-pci-100 to-pci-200 flex items-center justify-center">
                <BookOpen className="h-16 w-16 text-pci-600" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-medium mb-2 text-pci-700">Plastic Recycling Basics</h3>
                <p className="text-gray-600 mb-4">
                  Learn about different types of plastics, identification symbols, and proper recycling methods.
                </p>
                <Button variant="ghost" className="flex items-center gap-1 text-pci-600">
                  Coming soon <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-subtle overflow-hidden hover:shadow-elevated transition-all">
              <div className="h-48 bg-gradient-to-r from-pci-100 to-pci-200 flex items-center justify-center">
                <Globe className="h-16 w-16 text-pci-600" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-medium mb-2 text-pci-700">Environmental Impact</h3>
                <p className="text-gray-600 mb-4">
                  Understand how plastic waste affects ecosystems, oceans, and climate change.
                </p>
                <Button variant="ghost" className="flex items-center gap-1 text-pci-600">
                  Coming soon <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-subtle overflow-hidden hover:shadow-elevated transition-all">
              <div className="h-48 bg-gradient-to-r from-pci-100 to-pci-200 flex items-center justify-center">
                <Recycle className="h-16 w-16 text-pci-600" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-medium mb-2 text-pci-700">Sustainable Practices</h3>
                <p className="text-gray-600 mb-4">
                  Discover practical tips for reducing plastic use in your daily life and community.
                </p>
                <Button variant="ghost" className="flex items-center gap-1 text-pci-600">
                  Coming soon <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <Alert className="mt-10 mb-8 bg-secondary">
            <AlertTriangle className="h-5 w-5" />
            <AlertTitle>Content Under Development</AlertTitle>
            <AlertDescription>
              Our educational content is currently being developed by environmental experts. 
              Full resources will be available soon.
            </AlertDescription>
          </Alert>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
