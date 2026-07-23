import apiClient from './apiClient';

export const adminService = {
  getDashboardStats: async () => {
    const response = await apiClient.get('/admin/dashboard');
    return response.data;
  },

  getRoles: async () => {
    const response = await apiClient.get('/admin/roles');
    return response.data;
  },

  getPermissions: async () => {
    const response = await apiClient.get('/admin/permissions');
    return response.data;
  },

  updateRolePermissions: async (roleId, permissions) => {
    const response = await apiClient.patch(`/admin/roles/${roleId}/permissions`, { permissions });
    return response.data;
  },

  getSettings: async () => {
    const response = await apiClient.get('/admin/settings');
    return response.data;
  },

  updateSetting: async (key, value) => {
    const response = await apiClient.put(`/admin/settings/${key}`, { value });
    return response.data;
  },

  getAuditLogs: async (params) => {
    const response = await apiClient.get('/admin/audit-logs', { params });
    return response.data;
  },

  getAnalytics: async () => {
    const response = await apiClient.get('/admin/analytics');
    return response.data;
  }
};
