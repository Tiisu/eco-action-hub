
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AlertTriangle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12 mt-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-pci-800">About PCI</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              Positive Climate Impacts (PCI) is dedicated to reducing plastic waste and promoting 
              environmental sustainability through innovative waste management solutions.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-pci-700">Our Mission</h2>
            <p className="text-gray-700 mb-6">
              At PCI, we believe in creating a sustainable future by addressing the global plastic waste crisis. 
              Our platform connects users with local waste management agents to efficiently collect, process, 
              and recycle plastic waste in a transparent and rewarding ecosystem.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-pci-700">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-6 my-8">
              <div className="bg-white p-6 rounded-lg shadow-subtle hover:shadow-elevated transition-shadow">
                <h3 className="text-xl font-medium mb-3 text-pci-600">Report Waste</h3>
                <p className="text-gray-600">Users report plastic waste through our platform with details about type, weight, and location.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-subtle hover:shadow-elevated transition-shadow">
                <h3 className="text-xl font-medium mb-3 text-pci-600">Agent Collection</h3>
                <p className="text-gray-600">Local agents accept reports and collect the plastic waste for proper recycling.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-subtle hover:shadow-elevated transition-shadow">
                <h3 className="text-xl font-medium mb-3 text-pci-600">Rewards & Impact</h3>
                <p className="text-gray-600">Both users and agents earn PCI points that can be redeemed for rewards while tracking environmental impact.</p>
              </div>
            </div>
            
            <Alert className="mt-10 mb-8 bg-secondary">
              <AlertTriangle className="h-5 w-5" />
              <AlertTitle>Coming Soon</AlertTitle>
              <AlertDescription>
                We're actively working to expand our detailed information about PCI's mission, team, and impact. 
                Check back soon for updates!
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
