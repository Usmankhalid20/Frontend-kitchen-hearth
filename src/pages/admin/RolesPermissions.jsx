import React, { useEffect, useState } from 'react';
import { adminService } from '../../services/admin.service';
import DataTable from '../../components/admin/DataTable';
import LoadingState from '../../components/admin/LoadingState';
import { Settings, X, Save, Edit } from 'lucide-react';

const RolesPermissions = () => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [tempPermissions, setTempPermissions] = useState([]); 
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchData = async () => {
    try {
      const [rolesRes, permsRes] = await Promise.all([
        adminService.getRoles(),
        adminService.getPermissions()
      ]);
      setRoles(rolesRes.data || []);
      setPermissions(permsRes.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = () => {
    setSelectedRole('');
    setTempPermissions([]);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRole('');
    setTempPermissions([]);
    setError('');
    setSuccess('');
  };

  const handleRoleSelect = (e) => {
    const roleId = e.target.value;
    setSelectedRole(roleId);
    
    if (roleId) {
      const role = roles.find(r => r._id === roleId);
      if (role) {
        setTempPermissions(role.permissions.map(p => p._id || p));
      }
    } else {
      setTempPermissions([]);
    }
  };

  const handleTogglePermission = (permId) => {
    const roleObj = roles.find(r => r._id === selectedRole);
    if (roleObj && roleObj.name === 'Super Admin') return;

    setTempPermissions(prev => 
      prev.includes(permId) 
        ? prev.filter(id => id !== permId) 
        : [...prev, permId]
    );
  };

  const handleSave = async () => {
    if (!selectedRole) return;
    setSaving(true);
    setError('');
    setSuccess('');
    
    try {
      await adminService.updateRolePermissions(selectedRole, tempPermissions);
      setSuccess('Permissions updated successfully!');
      fetchData(); // Refresh table data
      setTimeout(() => {
        closeModal();
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update permissions');
    } finally {
      setSaving(false);
    }
  };

  // The read-only table overview
  const columns = [
    { header: 'Role Name', accessor: 'name' },
    { header: 'Permissions Count', render: (row) => (
      <span className="bg-gray-100 text-gray-700 py-1 px-3 rounded-full text-sm font-medium">
        {row.permissions.length} Assigned
      </span>
    )}
  ];

  if (loading) return <LoadingState message="Loading roles..." />;

  const activeRoleObj = roles.find(r => r._id === selectedRole);
  const isSuperAdmin = activeRoleObj && activeRoleObj.name === 'Super Admin';

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Roles Management</h2>
          <p className="text-gray-500 text-sm mt-1">View access control mappings for the system.</p>
        </div>
        <button 
          onClick={openModal}
          className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <Edit className="w-4 h-4" />
          Assign Permissions
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <DataTable columns={columns} data={roles} keyField="_id" />
      </div>

      {/* Permissions Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[85vh]">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Manage Role Permissions</h3>
                <p className="text-sm text-gray-500 mt-0.5">Select a role to view and edit its permissions.</p>
              </div>
              <button onClick={closeModal} className="p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1">
              {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm border border-red-100">{error}</div>}
              {success && <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm border border-green-100">{success}</div>}
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Target Role</label>
                <select 
                  value={selectedRole}
                  onChange={handleRoleSelect}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="">-- Select a role to edit --</option>
                  {roles.map(role => (
                    <option key={role._id} value={role._id}>{role.name}</option>
                  ))}
                </select>
              </div>

              {selectedRole && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  {isSuperAdmin && (
                    <div className="p-3 bg-blue-50 text-blue-700 rounded-lg text-sm border border-blue-100 mb-4">
                      <strong>Note:</strong> The Super Admin role has immutable system access. Its permissions cannot be modified.
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {permissions.map((perm) => {
                      const isChecked = isSuperAdmin || tempPermissions.includes(perm._id);
                      return (
                        <div 
                          key={perm._id} 
                          onClick={() => handleTogglePermission(perm._id)}
                          className={`flex items-start gap-3 p-3 rounded-xl border transition-colors ${isSuperAdmin ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'} ${
                            isChecked ? 'border-amber-500 bg-amber-50/30' : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="mt-0.5 flex-shrink-0">
                            <label className="relative inline-flex items-center pointer-events-none">
                              <input type="checkbox" className="sr-only peer" checked={isChecked} readOnly />
                              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
                            </label>
                          </div>
                          <div>
                            <p className={`text-sm font-medium ${isChecked ? 'text-amber-900' : 'text-gray-900'}`}>
                              {perm.name}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">{perm.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button 
                onClick={closeModal}
                disabled={saving || success}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                disabled={!selectedRole || isSuperAdmin || saving || success}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors disabled:opacity-50"
              >
                {saving ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Save Permissions
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RolesPermissions;
