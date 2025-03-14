
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    // Simulating a login process
    setTimeout(() => {
      setLoading(false);
      setError("This is a demo version. Login functionality will be implemented soon.");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-12 px-4 mt-16">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-subtle p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-pci-800">Welcome Back</h1>
              <p className="text-gray-600 mt-2">Sign in to your PCI account</p>
            </div>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-start gap-2 mb-6">
                <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <a href="#" className="text-sm text-pci-600 hover:text-pci-700">
                    Forgot password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-pci-500 hover:bg-pci-600"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign in"}
              </Button>
              
              <div className="text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <Link to="/register" className="text-pci-600 hover:text-pci-700 font-medium">
                  Register
                </Link>
              </div>
            </form>
            
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-4 text-gray-500">Coming soon</span>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button variant="outline" className="w-full" disabled>
                  Google
                </Button>
                <Button variant="outline" className="w-full" disabled>
                  Connect Wallet
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
