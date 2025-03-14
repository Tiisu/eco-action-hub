
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { AlertCircle, User, Building } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function Register() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<"user" | "agent">("user");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // User form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Agent form fields
  const [companyName, setCompanyName] = useState("");
  const [businessLicense, setBusinessLicense] = useState("");
  const [agentEmail, setAgentEmail] = useState("");
  const [agentPassword, setAgentPassword] = useState("");
  const [agentConfirmPassword, setAgentConfirmPassword] = useState("");

  const validateForm = (type: "user" | "agent") => {
    setError("");
    
    if (type === "user") {
      if (!firstName || !lastName) {
        setError("Please provide both first and last name");
        return false;
      }
      
      if (!email) {
        setError("Please provide an email address");
        return false;
      }
      
      if (password.length < 6) {
        setError("Password should be at least 6 characters");
        return false;
      }
      
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return false;
      }
    } else {
      if (!companyName) {
        setError("Please provide a company name");
        return false;
      }
      
      if (!businessLicense) {
        setError("Please provide a business license number");
        return false;
      }
      
      if (!agentEmail) {
        setError("Please provide an email address");
        return false;
      }
      
      if (agentPassword.length < 6) {
        setError("Password should be at least 6 characters");
        return false;
      }
      
      if (agentPassword !== agentConfirmPassword) {
        setError("Passwords do not match");
        return false;
      }
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formType = e.currentTarget.getAttribute("data-form-type") as "user" | "agent";
    
    if (!validateForm(formType)) {
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      // Prepare registration data based on form type
      const formEmail = formType === "user" ? email : agentEmail;
      const formPassword = formType === "user" ? password : agentPassword;
      const userData = {
        first_name: formType === "user" ? firstName : "",
        last_name: formType === "user" ? lastName : "",
        user_type: formType,
        company_name: formType === "agent" ? companyName : "",
        business_license: formType === "agent" ? businessLicense : ""
      };
      
      // Register with Supabase
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formEmail,
        password: formPassword,
        options: {
          data: userData
        }
      });
      
      if (signUpError) {
        throw signUpError;
      }
      
      if (data) {
        toast.success("Registration successful! Please verify your email to continue.", {
          description: "Check your inbox and spam folder for the verification email."
        });
        
        if (formType === "agent") {
          toast.info("Your agent account will be reviewed by an admin before approval.", {
            description: "You'll be notified once your account is approved."
          });
        }
        
        // Redirect to login page
        navigate("/login");
      }
    } catch (err: any) {
      console.error("Registration error:", err);
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
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
                <form onSubmit={handleSubmit} data-form-type="user" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                        First Name
                      </label>
                      <Input 
                        id="firstName" 
                        type="text" 
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full" 
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                        Last Name
                      </label>
                      <Input 
                        id="lastName" 
                        type="text" 
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full" 
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <Input 
                      id="password" 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                      Confirm Password
                    </label>
                    <Input 
                      id="confirmPassword" 
                      type="password" 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full" 
                      required 
                    />
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
                <form onSubmit={handleSubmit} data-form-type="agent" className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                      Company Name
                    </label>
                    <Input 
                      id="companyName" 
                      type="text" 
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="businessLicense" className="block text-sm font-medium text-gray-700">
                      Business License Number
                    </label>
                    <Input 
                      id="businessLicense" 
                      type="text" 
                      value={businessLicense}
                      onChange={(e) => setBusinessLicense(e.target.value)}
                      className="w-full" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="agentEmail" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <Input 
                      id="agentEmail" 
                      type="email" 
                      value={agentEmail}
                      onChange={(e) => setAgentEmail(e.target.value)}
                      className="w-full" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="agentPassword" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <Input 
                      id="agentPassword" 
                      type="password" 
                      value={agentPassword}
                      onChange={(e) => setAgentPassword(e.target.value)}
                      className="w-full" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="agentConfirmPassword" className="block text-sm font-medium text-gray-700">
                      Confirm Password
                    </label>
                    <Input 
                      id="agentConfirmPassword" 
                      type="password" 
                      value={agentConfirmPassword}
                      onChange={(e) => setAgentConfirmPassword(e.target.value)}
                      className="w-full" 
                      required 
                    />
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-md flex items-start gap-2 my-4">
                    <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">
                      Agent registration requires approval from admin. You'll receive an email once your account is approved.
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
