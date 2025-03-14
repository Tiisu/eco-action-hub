
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Clock, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function PendingApproval() {
  const { user, profile, signOut, refreshProfile } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // If user is not logged in, redirect to login
    if (!user) {
      navigate('/login');
      return;
    }
    
    // If user is approved or not an agent, redirect appropriately
    if (profile) {
      if (profile.user_type !== 'agent') {
        navigate('/user-dashboard');
      } else if (profile.is_approved) {
        navigate('/agent-dashboard');
      }
    }
    
    // Poll for approval status every 60 seconds
    const interval = setInterval(() => {
      refreshProfile();
    }, 60000);
    
    return () => clearInterval(interval);
  }, [user, profile, navigate, refreshProfile]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-12 px-4 mt-16">
        <div className="w-full max-w-lg text-center">
          <div className="mb-8 flex justify-center">
            <div className="bg-yellow-100 p-4 rounded-full">
              <Clock className="h-16 w-16 text-yellow-600" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Application Pending Approval</h1>
          
          <div className="bg-white rounded-lg shadow-subtle p-8 mb-8">
            <p className="text-gray-600 mb-6">
              Thank you for registering as an agent with PCI. Your application is currently under review by our admin team.
            </p>
            
            <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-md mb-6">
              <p className="font-medium">What happens next?</p>
              <ul className="mt-2 text-sm text-left list-disc pl-5 space-y-1">
                <li>Our admin team will review your business license and credentials</li>
                <li>You'll receive an email notification once your account is approved</li>
                <li>After approval, you'll have full access to the agent dashboard</li>
              </ul>
            </div>
            
            <p className="text-gray-600 mb-8">
              This process typically takes 1-2 business days. If you have any questions, please contact our support team.
            </p>
            
            <Button 
              onClick={() => signOut()}
              variant="outline" 
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
