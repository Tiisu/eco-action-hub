
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, UserCheck, UserX, Award, PlusCircle, RefreshCw, Settings, Gift } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function AdminDashboard() {
  const { profile } = useAuth();
  const [agents, setAgents] = useState<any[]>([]);
  const [pendingAgents, setPendingAgents] = useState<any[]>([]);
  const [rewards, setRewards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch pending agents
      const { data: pendingData, error: pendingError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_type', 'agent')
        .eq('is_approved', false)
        .order('created_at', { ascending: false });

      if (pendingError) throw pendingError;
      setPendingAgents(pendingData || []);

      // Fetch approved agents
      const { data: agentsData, error: agentsError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_type', 'agent')
        .eq('is_approved', true)
        .order('created_at', { ascending: false });

      if (agentsError) throw agentsError;
      setAgents(agentsData || []);

      // Fetch rewards
      const { data: rewardsData, error: rewardsError } = await supabase
        .from('rewards')
        .select('*')
        .order('created_at', { ascending: false });

      if (rewardsError) throw rewardsError;
      setRewards(rewardsData || []);
    } catch (error: any) {
      console.error('Error fetching data:', error.message);
      toast.error('Failed to load admin dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const approveAgent = async (agentId: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_approved: true })
        .eq('id', agentId);

      if (error) throw error;
      
      toast.success('Agent approved successfully');
      
      // Update local state
      const updatedAgent = pendingAgents.find(agent => agent.id === agentId);
      if (updatedAgent) {
        setPendingAgents(prev => prev.filter(agent => agent.id !== agentId));
        setAgents(prev => [...prev, { ...updatedAgent, is_approved: true }]);
      }
    } catch (error: any) {
      console.error('Error approving agent:', error.message);
      toast.error('Failed to approve agent');
    }
  };

  const rejectAgent = async (agentId: string) => {
    try {
      // This is a simplified approach - in a real application,
      // you might want to either delete the user account or mark it as rejected
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', agentId);

      if (error) throw error;
      
      toast.success('Agent application rejected');
      
      // Update local state
      setPendingAgents(prev => prev.filter(agent => agent.id !== agentId));
    } catch (error: any) {
      console.error('Error rejecting agent:', error.message);
      toast.error('Failed to reject agent');
    }
  };

  const filteredAgents = agents.filter(agent => 
    agent.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.last_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.company_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.business_license?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredRewards = rewards.filter(reward => 
    reward.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    reward.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    reward.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Admin Dashboard
          </h1>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={fetchData}
          >
            <RefreshCw className="h-4 w-4" />
            Refresh Data
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Pending Agents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <UserX className="h-5 w-5 text-orange-500 mr-2" />
                <span className="text-2xl font-bold">{pendingAgents.length}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Approved Agents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <UserCheck className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-2xl font-bold">{agents.length}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Available Rewards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Gift className="h-5 w-5 text-pci-500 mr-2" />
                <span className="text-2xl font-bold">{rewards.length}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="agents" className="mb-6">
          <TabsList className="mb-6">
            <TabsTrigger value="agents" className="flex items-center gap-2">
              <UserCheck className="h-4 w-4" />
              <span>Manage Agents</span>
            </TabsTrigger>
            <TabsTrigger value="rewards" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              <span>Manage Rewards</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span>System Settings</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="agents">
            <div className="mb-6">
              <div className="relative flex-grow max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  className="pl-10"
                  placeholder="Search agents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            {pendingAgents.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Pending Agent Approvals</h2>
                <div className="bg-white rounded-lg shadow-subtle overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Company
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          License
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Registered
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {pendingAgents.map((agent) => (
                        <tr key={agent.id}>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {agent.first_name} {agent.last_name}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {agent.company_name || 'N/A'}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {agent.business_license || 'N/A'}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            {new Date(agent.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 px-2 text-green-600"
                              onClick={() => approveAgent(agent.id)}
                            >
                              Approve
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 px-2 text-red-600 ml-1"
                              onClick={() => rejectAgent(agent.id)}
                            >
                              Reject
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            <h2 className="text-xl font-semibold mb-4">Approved Agents</h2>
            <div className="bg-white rounded-lg shadow-subtle overflow-hidden">
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-pci-600"></div>
                </div>
              ) : filteredAgents.length > 0 ? (
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Company
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        License
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredAgents.map((agent) => (
                      <tr key={agent.id}>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {agent.first_name} {agent.last_name}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {agent.company_name || 'N/A'}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {agent.business_license || 'N/A'}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          {new Date(agent.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 px-2"
                          >
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="p-8 text-center text-gray-500">
                  No agents found matching your search.
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="rewards">
            <div className="mb-6 flex justify-between items-center">
              <div className="relative flex-grow max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  className="pl-10"
                  placeholder="Search rewards..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Button className="bg-pci-500 hover:bg-pci-600">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Reward
              </Button>
            </div>
            
            <div className="bg-white rounded-lg shadow-subtle overflow-hidden">
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-pci-600"></div>
                </div>
              ) : filteredRewards.length > 0 ? (
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Reward Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Points
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Available
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredRewards.map((reward) => (
                      <tr key={reward.id}>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {reward.name}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {reward.category || 'N/A'}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {reward.points_required}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {reward.available_quantity}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 px-2"
                          >
                            Edit
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 px-2 text-red-600 ml-1"
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="p-8 text-center text-gray-500">
                  No rewards found matching your search.
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="settings">
            <div className="bg-white rounded-lg shadow-subtle p-6">
              <h2 className="text-xl font-semibold mb-4">System Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Points Per KG of Waste
                  </label>
                  <div className="flex">
                    <Input
                      type="number"
                      className="max-w-xs"
                      defaultValue="1"
                    />
                    <Button className="ml-2 bg-pci-500 hover:bg-pci-600">
                      Save
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Number of points users earn per kilogram of waste reported
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Enable Email Notifications
                  </label>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-pci-600 focus:ring-pci-500 border-gray-300 rounded"
                      defaultChecked
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Send email notifications for important events
                    </span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Default Agent Approval
                  </label>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-pci-600 focus:ring-pci-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Auto-approve new agent registrations
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
