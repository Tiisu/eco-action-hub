
import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Check if the user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        redirectBasedOnUserType(data.session.user);
      }
    };
    
    checkSession();
  }, []);

  const redirectBasedOnUserType = async (user: any) => {
    // Get user profile to determine user type
    const { data: profile } = await supabase
      .from('profiles')
      .select('user_type, is_approved')
      .eq('id', user.id)
      .single();
      
    if (profile) {
      if (profile.user_type === 'agent') {
        if (profile.is_approved) {
          navigate('/agent-dashboard');
        } else {
          toast.info("Your agent account is pending approval.");
          navigate('/pending-approval');
        }
      } else if (profile.user_type === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/user-dashboard');
      }
    } else {
      navigate('/user-dashboard');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (signInError) {
        throw signInError;
      }
      
      if (data.user) {
        toast.success("Login successful!");
        redirectBasedOnUserType(data.user);
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = () => {
    if (!email) {
      setError("Please enter your email address to reset password");
      return;
    }
    
    setLoading(true);
    
    supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    .then(() => {
      toast.success("Password reset email sent. Please check your inbox.");
    })
    .catch((err) => {
      setError("Failed to send password reset email. Please try again.");
      console.error("Reset password error:", err);
    })
    .finally(() => {
      setLoading(false);
    });
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
                  <button 
                    type="button"
                    onClick={handleResetPassword} 
                    className="text-sm text-pci-600 hover:text-pci-700"
                  >
                    Forgot password?
                  </button>
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
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
