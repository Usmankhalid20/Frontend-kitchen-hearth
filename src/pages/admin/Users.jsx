import React, { useEffect, useState } from 'react';
import { userService } from '../../services/user.service';
import DataTable from '../../components/admin/DataTable';
import LoadingState from '../../components/admin/LoadingState';
import ConfirmModal from '../../components/admin/ConfirmModal';
import { Search, ShieldAlert, CheckCircle } from 'lucide-react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [selectedUser, setSelectedUser] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [actionType, setActionType] = useState(null); // 'Suspend' or 'Restore'

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await userService.getUsers({ search: searchTerm });
      setUsers(response.data.users || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers();
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleActionClick = (user, type) => {
    setSelectedUser(user);
    setActionType(type);
    setIsConfirmOpen(true);
  };

  const confirmAction = async () => {
    if (!selectedUser) return;
    try {
      const newStatus = actionType === 'Suspend' ? 'Suspended' : 'Active';
      await userService.updateUserStatus(selectedUser._id, newStatus);
      setIsConfirmOpen(false);
      fetchUsers();
    } catch (error) {
      console.error('Action failed', error);
    }
  };

  const columns = [
    { header: 'Name', render: (row) => <div className="font-medium text-gray-900">{row.firstName} {row.lastName}</div> },
    { header: 'Email', accessor: 'email' },
    { header: 'Role', render: (row) => (
      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
        {row.role?.name || 'Unknown'}
      </span>
    )},
    { header: 'Status', render: (row) => (
      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
        row.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
      }`}>
        {row.status}
      </span>
    )},
    { header: 'Actions', render: (row) => (
      <div className="flex items-center gap-2">
        {row.status === 'Active' ? (
          <button 
            onClick={(e) => { e.stopPropagation(); handleActionClick(row, 'Suspend'); }}
            className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Suspend User"
          >
            <ShieldAlert className="w-4 h-4" />
          </button>
        ) : (
          <button 
            onClick={(e) => { e.stopPropagation(); handleActionClick(row, 'Restore'); }}
            className="p-1.5 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            title="Restore User"
          >
            <CheckCircle className="w-4 h-4" />
          </button>
        )}
      </div>
    )}
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Users Management</h2>
          <p className="text-gray-500 text-sm mt-1">View and manage all registered users.</p>
        </div>
        
        <div className="relative w-full sm:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 sm:text-sm transition-colors shadow-sm"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <LoadingState message="Loading users..." />
        ) : (
          <DataTable columns={columns} data={users} keyField="_id" />
        )}
      </div>

      <ConfirmModal 
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmAction}
        title={`${actionType} User`}
        message={`Are you sure you want to ${actionType?.toLowerCase()} ${selectedUser?.firstName} ${selectedUser?.lastName}?`}
        isDanger={actionType === 'Suspend'}
      />
    </div>
  );
};

export default Users;
