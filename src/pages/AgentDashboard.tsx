
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Clock, Filter, Eye, Search, CheckSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function AgentDashboard() {
  const { profile } = useAuth();
  const [reports, setReports] = useState<any[]>([]);
  const [filteredReports, setFilteredReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  useEffect(() => {
    fetchReports();
  }, []);

  useEffect(() => {
    filterReports();
  }, [reports, searchQuery, statusFilter]);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('waste_reports')
        .select('*, profiles:user_id(first_name, last_name)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReports(data || []);
      setFilteredReports(data || []);
    } catch (error: any) {
      console.error('Error fetching reports:', error.message);
      toast.error('Failed to load waste reports');
    } finally {
      setLoading(false);
    }
  };

  const filterReports = () => {
    let filtered = [...reports];
    
    // Apply search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (report) => 
          report.waste_type.toLowerCase().includes(query) ||
          report.location?.toLowerCase().includes(query) ||
          report.profiles?.first_name?.toLowerCase().includes(query) ||
          report.profiles?.last_name?.toLowerCase().includes(query)
      );
    }
    
    // Apply status filter
    if (statusFilter) {
      filtered = filtered.filter(report => report.status === statusFilter);
    }
    
    setFilteredReports(filtered);
  };

  const getPendingCount = () => {
    return reports.filter(report => report.status === 'pending').length;
  };

  const getApprovedCount = () => {
    return reports.filter(report => report.status === 'approved').length;
  };

  const getRejectedCount = () => {
    return reports.filter(report => report.status === 'rejected').length;
  };

  const updateReportStatus = async (reportId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('waste_reports')
        .update({ 
          status,
          agent_id: profile?.id,
          updated_at: new Date().toISOString()
        })
        .eq('id', reportId);

      if (error) throw error;
      
      // Update points if approving
      if (status === 'approved') {
        // Get report details
        const { data: reportData } = await supabase
          .from('waste_reports')
          .select('weight, user_id')
          .eq('id', reportId)
          .single();
          
        if (reportData) {
          // Calculate points (1 point per kg)
          const pointsToAdd = Math.round(Number(reportData.weight));
          
          // Update user's points
          await supabase.rpc('increment_user_points', { 
            user_id: reportData.user_id,
            points_to_add: pointsToAdd
          });
        }
      }
      
      toast.success(`Report ${status === 'approved' ? 'approved' : 'rejected'} successfully`);
      
      // Update local state
      setReports(prev => 
        prev.map(report => 
          report.id === reportId 
            ? { ...report, status, agent_id: profile?.id, updated_at: new Date().toISOString() } 
            : report
        )
      );
    } catch (error: any) {
      console.error(`Error ${status} report:`, error.message);
      toast.error(`Failed to ${status} report`);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Agent Dashboard
          </h1>
          <div className="text-sm text-gray-500">
            Agent ID: {profile?.id}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Pending Approvals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-yellow-500 mr-2" />
                <span className="text-2xl font-bold">{getPendingCount()}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Approved Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-2xl font-bold">{getApprovedCount()}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Rejected Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <XCircle className="h-5 w-5 text-red-500 mr-2" />
                <span className="text-2xl font-bold">{getRejectedCount()}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              className="pl-10"
              placeholder="Search waste reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={statusFilter === null ? "default" : "outline"}
              className={statusFilter === null ? "bg-pci-500 hover:bg-pci-600" : ""}
              onClick={() => setStatusFilter(null)}
            >
              All
            </Button>
            <Button
              variant={statusFilter === "pending" ? "default" : "outline"}
              className={statusFilter === "pending" ? "bg-yellow-500 hover:bg-yellow-600" : ""}
              onClick={() => setStatusFilter("pending")}
            >
              <Clock className="mr-1 h-4 w-4" />
              Pending
            </Button>
            <Button
              variant={statusFilter === "approved" ? "default" : "outline"}
              className={statusFilter === "approved" ? "bg-green-500 hover:bg-green-600" : ""}
              onClick={() => setStatusFilter("approved")}
            >
              <CheckCircle className="mr-1 h-4 w-4" />
              Approved
            </Button>
            <Button
              variant={statusFilter === "rejected" ? "default" : "outline"}
              className={statusFilter === "rejected" ? "bg-red-500 hover:bg-red-600" : ""}
              onClick={() => setStatusFilter("rejected")}
            >
              <XCircle className="mr-1 h-4 w-4" />
              Rejected
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-subtle overflow-hidden">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-pci-600"></div>
            </div>
          ) : filteredReports.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Waste Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Weight
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredReports.map((report) => (
                    <tr key={report.id}>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {report.profiles?.first_name} {report.profiles?.last_name}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap capitalize">
                        {report.waste_type}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {report.weight} kg
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {report.location || 'N/A'}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {new Date(report.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span 
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            report.status === 'approved' ? 'bg-green-100 text-green-800' :
                            report.status === 'rejected' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium space-x-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                        
                        {report.status === 'pending' && (
                          <>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 text-green-500"
                              onClick={() => updateReportStatus(report.id, 'approved')}
                            >
                              <CheckSquare className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 text-red-500"
                              onClick={() => updateReportStatus(report.id, 'rejected')}
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              No waste reports found matching your filters.
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
