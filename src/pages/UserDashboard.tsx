
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Edit, PlusCircle, Award, BarChart3, Recycle } from "lucide-react";
import { toast } from "sonner";

export default function UserDashboard() {
  const { profile } = useAuth();
  const [reports, setReports] = useState<any[]>([]);
  const [rewards, setRewards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch waste reports
      const { data: reportsData, error: reportsError } = await supabase
        .from('waste_reports')
        .select('*')
        .order('created_at', { ascending: false });

      if (reportsError) throw reportsError;
      setReports(reportsData || []);

      // Fetch rewards
      const { data: rewardsData, error: rewardsError } = await supabase
        .from('rewards')
        .select('*')
        .order('points_required', { ascending: true })
        .limit(3);

      if (rewardsError) throw rewardsError;
      setRewards(rewardsData || []);
    } catch (error: any) {
      console.error('Error fetching data:', error.message);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome, {profile?.first_name || 'User'}!
          </h1>
          <Button className="bg-pci-500 hover:bg-pci-600">
            <PlusCircle className="mr-2 h-4 w-4" />
            Report Waste
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Total Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Recycle className="h-5 w-5 text-pci-500 mr-2" />
                <span className="text-2xl font-bold">{reports.length}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Points Earned
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Award className="h-5 w-5 text-pci-500 mr-2" />
                <span className="text-2xl font-bold">{profile?.points || 0}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Environmental Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <BarChart3 className="h-5 w-5 text-pci-500 mr-2" />
                <span className="text-2xl font-bold">
                  {reports.reduce((sum, report) => sum + Number(report.weight), 0).toFixed(2)} kg
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Recent Reports</h2>
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-pci-600"></div>
              </div>
            ) : reports.length > 0 ? (
              <div className="bg-white rounded-lg shadow-subtle overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Waste Type
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Weight (kg)
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {reports.slice(0, 5).map((report) => (
                        <tr key={report.id}>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className="capitalize">{report.waste_type}</span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {report.weight} kg
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span 
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}
                            >
                              {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            {new Date(report.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {reports.length > 5 && (
                  <div className="px-4 py-3 bg-gray-50 text-center">
                    <Button variant="link" className="text-pci-600">
                      View All Reports
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-subtle p-8 text-center">
                <p className="text-gray-500 mb-4">You haven't submitted any waste reports yet.</p>
                <Button className="bg-pci-500 hover:bg-pci-600">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Report Waste
                </Button>
              </div>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Available Rewards</h2>
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-pci-600"></div>
              </div>
            ) : rewards.length > 0 ? (
              <div className="space-y-4">
                {rewards.map((reward) => (
                  <Card key={reward.id}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900">{reward.name}</h3>
                          <p className="text-sm text-gray-500 mt-1">{reward.description}</p>
                          <div className="mt-2 flex items-center">
                            <Award className="h-4 w-4 text-pci-500 mr-1" />
                            <span className="text-sm font-medium">{reward.points_required} points</span>
                          </div>
                        </div>
                        {reward.image_url && (
                          <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                            <img 
                              src={reward.image_url} 
                              alt={reward.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                      <Button 
                        className="w-full mt-4 bg-pci-500 hover:bg-pci-600"
                        disabled={(profile?.points || 0) < reward.points_required}
                      >
                        Redeem
                      </Button>
                    </CardContent>
                  </Card>
                ))}
                <div className="text-center mt-4">
                  <Button variant="link" className="text-pci-600">
                    View All Rewards
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-subtle p-8 text-center">
                <p className="text-gray-500">No rewards available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
