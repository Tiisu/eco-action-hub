
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, User } from "lucide-react";

export default function Profile() {
  const { user, profile, refreshProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const form = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      company_name: "",
      business_license: "",
    }
  });

  useEffect(() => {
    if (profile) {
      form.reset({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        company_name: profile.company_name || "",
        business_license: profile.business_license || "",
      });
    }
  }, [profile, form]);

  const onSubmit = async (data: any) => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: data.first_name,
          last_name: data.last_name,
          company_name: data.company_name,
          business_license: data.business_license,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) throw error;
      
      await refreshProfile();
      toast.success('Profile updated successfully');
    } catch (error: any) {
      console.error('Error updating profile:', error.message);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }
      
      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${user?.id}/avatar.${fileExt}`;
      
      // Upload file to storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });
        
      if (uploadError) throw uploadError;
      
      // Get public URL
      const { data: publicURL } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);
        
      if (publicURL) {
        // Update profile with avatar URL
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ 
            avatar_url: publicURL.publicUrl,
            updated_at: new Date().toISOString(),
          })
          .eq('id', user?.id);
          
        if (updateError) throw updateError;
        
        await refreshProfile();
        toast.success('Avatar uploaded successfully');
      }
    } catch (error: any) {
      console.error('Error uploading avatar:', error.message);
      toast.error('Error uploading avatar');
    } finally {
      setUploading(false);
    }
  };

  const getInitials = () => {
    if (!profile) return 'U';
    
    const first = profile.first_name?.charAt(0) || '';
    const last = profile.last_name?.charAt(0) || '';
    
    return (first + last).toUpperCase() || 'U';
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Your Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Profile Picture</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="mb-4 relative group">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src={profile?.avatar_url || ''} alt={`${profile?.first_name} ${profile?.last_name}`} />
                    <AvatarFallback className="text-3xl bg-pci-100 text-pci-800">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <label 
                    htmlFor="avatar-upload" 
                    className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
                  >
                    <Upload className="h-8 w-8 text-white" />
                  </label>
                  <input 
                    type="file" 
                    id="avatar-upload" 
                    className="hidden" 
                    accept="image/*"
                    onChange={uploadAvatar}
                    disabled={uploading}
                  />
                </div>
                
                <div className="text-center">
                  <h3 className="font-medium text-lg">
                    {profile?.first_name} {profile?.last_name}
                  </h3>
                  <p className="text-gray-500 capitalize">{profile?.user_type}</p>
                  {profile?.company_name && (
                    <p className="text-gray-700 mt-1">{profile.company_name}</p>
                  )}
                </div>
                
                {uploading && (
                  <div className="mt-4 flex items-center justify-center w-full">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-pci-600 mr-2"></div>
                    <span className="text-sm text-gray-500">Uploading...</span>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Email</h4>
                    <p>{user?.email}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Account Type</h4>
                    <p className="capitalize">{profile?.user_type}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Member Since</h4>
                    <p>{profile ? new Date(profile.created_at).toLocaleDateString() : 'N/A'}</p>
                  </div>
                  
                  {profile?.user_type === 'user' && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Points Balance</h4>
                      <p className="text-lg font-semibold text-pci-600">{profile?.points || 0}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="first_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="last_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    {profile?.user_type === 'agent' && (
                      <>
                        <FormField
                          control={form.control}
                          name="company_name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="business_license"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Business License Number</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </>
                    )}
                    
                    <Button 
                      type="submit" 
                      className="bg-pci-500 hover:bg-pci-600"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                          Saving...
                        </>
                      ) : 'Save Changes'}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Security</CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="font-medium mb-4">Change Password</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1">
                      Current Password
                    </label>
                    <Input
                      id="current-password"
                      type="password"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                      New Password
                    </label>
                    <Input
                      id="new-password"
                      type="password"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm New Password
                    </label>
                    <Input
                      id="confirm-password"
                      type="password"
                    />
                  </div>
                  
                  <Button className="bg-pci-500 hover:bg-pci-600">
                    Update Password
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
