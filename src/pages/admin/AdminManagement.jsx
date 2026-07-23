import React, { useEffect, useState } from 'react';
import { adminService } from '../../services/admin.service';
import { userService } from '../../services/user.service';
import DataTable from '../../components/admin/DataTable';
import LoadingState from '../../components/admin/LoadingState';
import { Plus } from 'lucide-react';

const AdminManagement = () => {
  const [admins, setAdmins] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    roleId: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [usersRes, rolesRes] = await Promise.all([
        userService.getUsers({ limit: 100 }), // Get up to 100 users for simplicity
        adminService.getRoles()
      ]);

      const allRoles = rolesRes.data || [];
      // Filter out the standard "User" role for the dropdown
      const adminRoles = allRoles.filter(r => r.name !== 'User');
      setRoles(adminRoles);

      // Extract all role IDs that correspond to admins
      const adminRoleIds = adminRoles.map(r => r._id);

      // Filter users to only those who have an admin role
      const adminUsers = (usersRes.data?.users || []).filter(u => 
        u.role && adminRoleIds.includes(u.role._id)
      );
      
      setAdmins(adminUsers);
    } catch (err) {
      console.error('Failed to load admins', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await userService.createAdmin(formData);
      setSuccess('Admin created successfully!');
      setFormData({ firstName: '', lastName: '', username: '', email: '', password: '', roleId: '' });
      setIsCreating(false);
      fetchData(); // Refresh the table
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create admin');
    }
  };

  const columns = [
    { header: 'Name', render: (row) => `${row.firstName} ${row.lastName}` },
    { header: 'Email', accessor: 'email' },
    { header: 'Role', render: (row) => row.role?.name || 'Unknown' },
    { header: 'Status', render: (row) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        row.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
      }`}>
        {row.status}
      </span>
    )},
    { header: 'Created', render: (row) => new Date(row.created_at || row.createdAt).toLocaleDateString() }
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Admin Management</h2>
          <p className="text-gray-500 text-sm mt-1">Super Admin only area for managing administrative accounts.</p>
        </div>
        <button 
          onClick={() => setIsCreating(!isCreating)}
          className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          {isCreating ? 'Cancel' : 'Create Admin'}
        </button>
      </div>

      {error && <div className="p-4 bg-red-50 text-red-700 rounded-lg">{error}</div>}
      {success && <div className="p-4 bg-green-50 text-green-700 rounded-lg">{success}</div>}

      {isCreating && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Create New Admin</h3>
          <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input type="text" name="username" value={formData.username} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Temporary Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Assign Role</label>
              <select name="roleId" value={formData.roleId} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg">
                <option value="">Select a role...</option>
                {roles.map(role => (
                  <option key={role._id} value={role._id}>{role.name}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2 flex justify-end mt-2">
              <button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-medium">
                Save Admin
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? <LoadingState /> : <DataTable columns={columns} data={admins} keyField="_id" />}
      </div>
    </div>
  );
};

export default AdminManagement;
