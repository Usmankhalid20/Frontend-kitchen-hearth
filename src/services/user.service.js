import apiClient from './apiClient';

export const userService = {
  getUsers: async (params) => {
    const response = await apiClient.get('/admin/users', { params });
    return response.data;
  },

  getUserDetails: async (id) => {
    const response = await apiClient.get(`/admin/users/${id}`);
    return response.data;
  },

  updateUserStatus: async (id, status) => {
    const response = await apiClient.patch(`/admin/users/${id}/status`, { status });
    return response.data;
  },

  assignRole: async (id, roleId) => {
    const response = await apiClient.patch(`/admin/users/${id}/role`, { roleId });
    return response.data;
  },

  createAdmin: async (adminData) => {
    const response = await apiClient.post('/admin/admins', adminData);
    return response.data;
  }
};
