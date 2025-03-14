
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { AlertCircle, User, Building } from "lucide-react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";

export default function Register() {
  const [userType, setUserType] = useState<"user" | "agent">("user");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    // Simulating a registration process
    setTimeout(() => {
      setLoading(false);
      setError("This is a demo version. Registration functionality will be implemented soon.");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-12 px-4 mt-16">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-subtle p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-pci-800">Join PCI</h1>
              <p className="text-gray-600 mt-2">Create your account to get started</p>
            </div>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-start gap-2 mb-6">
                <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}
            
            <Tabs value={userType} onValueChange={(value) => setUserType(value as "user" | "agent")} className="mb-6">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="user" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>User</span>
                </TabsTrigger>
                <TabsTrigger value="agent" className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  <span>Agent</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="user">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                        First Name
                      </label>
                      <Input id="firstName" type="text" className="w-full" required />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                        Last Name
                      </label>
                      <Input id="lastName" type="text" className="w-full" required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <Input id="email" type="email" className="w-full" required />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <Input id="password" type="password" className="w-full" required />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                      Confirm Password
                    </label>
                    <Input id="confirmPassword" type="password" className="w-full" required />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-pci-500 hover:bg-pci-600"
                    disabled={loading}
                  >
                    {loading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="agent">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                      Company Name
                    </label>
                    <Input id="companyName" type="text" className="w-full" required />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="businessLicense" className="block text-sm font-medium text-gray-700">
                      Business License Number
                    </label>
                    <Input id="businessLicense" type="text" className="w-full" required />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="agentEmail" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <Input id="agentEmail" type="email" className="w-full" required />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="agentPassword" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <Input id="agentPassword" type="password" className="w-full" required />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="agentConfirmPassword" className="block text-sm font-medium text-gray-700">
                      Confirm Password
                    </label>
                    <Input id="agentConfirmPassword" type="password" className="w-full" required />
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-md flex items-start gap-2 my-4">
                    <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">
                      Agent registration requires approval and a registration fee. You'll be guided through this process after creating your account.
                    </span>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-pci-500 hover:bg-pci-600"
                    disabled={loading}
                  >
                    {loading ? "Creating account..." : "Create Agent Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
            
            <div className="text-center text-sm text-gray-600 mt-6">
              Already have an account?{" "}
              <Link to="/login" className="text-pci-600 hover:text-pci-700 font-medium">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
