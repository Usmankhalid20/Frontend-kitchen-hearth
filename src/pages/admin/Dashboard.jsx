import React, { useEffect, useState } from 'react';
import { adminService } from '../../services/admin.service';
import StatsCard from '../../components/admin/StatsCard';
import ChartCard from '../../components/admin/ChartCard';
import LoadingState from '../../components/admin/LoadingState';
import { Users, BookOpen, ShieldCheck, Activity } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await adminService.getDashboardStats();
        setStats(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to load dashboard statistics.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  if (loading) return <LoadingState message="Loading dashboard..." />;
  
  if (error) {
    return (
      <div className="p-6 bg-red-50 text-red-600 rounded-xl border border-red-100">
        <p className="font-medium">Error</p>
        <p className="text-sm mt-1">{error}</p>
      </div>
    );
  }

  const dummyChartData = [
    { label: 'Mon', value: 12 },
    { label: 'Tue', value: 19 },
    { label: 'Wed', value: 15 },
    { label: 'Thu', value: 25 },
    { label: 'Fri', value: 22 },
    { label: 'Sat', value: 30 },
    { label: 'Sun', value: 28 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
        <p className="text-gray-500 text-sm mt-1">Welcome to the Kitchen Hearth administration panel.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          title="Total Users" 
          value={stats?.totalUsers || 0} 
          icon={Users} 
          color="blue"
          trend="up"
          trendValue="+12%"
        />
        <StatsCard 
          title="Total Recipes" 
          value={stats?.totalRecipes || 0} 
          icon={BookOpen} 
          color="amber"
          trend="up"
          trendValue="+5%"
        />
        <StatsCard 
          title="Total Admins" 
          value={stats?.totalAdmins || 0} 
          icon={ShieldCheck} 
          color="purple"
          trend="neutral"
          trendValue="0%"
        />
        <StatsCard 
          title="Active Users (Today)" 
          value={stats?.activeUsers || 0} 
          icon={Activity} 
          color="green"
          trend="up"
          trendValue="+24%"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartCard 
            title="Weekly AI Generations" 
            data={dummyChartData} 
            height={250} 
          />
        </div>
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-base font-semibold text-gray-900">Recent Activity</h3>
          </div>
          <div className="p-0">
             <div className="divide-y divide-gray-100">
                <div className="p-4 text-sm text-gray-600 flex gap-3">
                  <div className="w-2 h-2 mt-1.5 rounded-full bg-amber-500 shrink-0"></div>
                  <p><span className="font-medium text-gray-900">System</span> seeded Super Admin successfully.</p>
                </div>
                <div className="p-4 text-sm text-gray-600 flex gap-3">
                  <div className="w-2 h-2 mt-1.5 rounded-full bg-blue-500 shrink-0"></div>
                  <p><span className="font-medium text-gray-900">Admin</span> logged into the dashboard.</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
