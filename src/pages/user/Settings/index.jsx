import React, { useState, useRef } from 'react';
import { useAuthStore } from '../../../stores/authStore';
import { authService } from '../../../services/auth.service';
import { User, Mail, Shield, Calendar, Edit2, Upload, X, Save, Camera } from 'lucide-react';
import Button from '../../../components/common/Button';

const UserSettings = () => {
  const { user, updateUser } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || ''
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || null);

  if (!user) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const data = new FormData();
      data.append('firstName', formData.firstName);
      data.append('lastName', formData.lastName);
      if (avatarFile) {
        data.append('avatar', avatarFile);
      }

      const res = await authService.updateProfile(data);
      if (res.success) {
        updateUser(res.user);
        setIsEditing(false);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
          <p className="mt-1 text-sm text-gray-500">Manage your profile and account settings.</p>
        </div>
        {!isEditing && (
          <Button
            onClick={() => setIsEditing(true)}
            variant="secondary"
          >
            <Edit2 className="w-4 h-4 mr-2" /> Edit Profile
          </Button>
        )}
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm font-medium">
          {error}
        </div>
      )}

      <div className="bg-white shadow-sm rounded-2xl overflow-hidden border border-gray-100">
        <div className="p-8 sm:flex sm:items-center sm:justify-between bg-gradient-to-r from-amber-500 to-orange-400 relative">
          <div className="sm:flex sm:items-center w-full">
            <div className="relative group shrink-0">
              {avatarPreview ? (
                <img 
                  src={avatarPreview} 
                  alt="Avatar" 
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg bg-white"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-white text-orange-600 flex items-center justify-center font-bold text-3xl shadow-lg border-4 border-white">
                  {user.firstName?.[0] || ''}{user.lastName?.[0] || ''}
                </div>
              )}
              
              {isEditing && (
                <div 
                  className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Camera className="w-8 h-8 text-white" />
                </div>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                className="hidden" 
              />
            </div>
            
            <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
              <h3 className="text-2xl font-bold text-white">
                {formData.firstName} {formData.lastName}
              </h3>
              <p className="text-sm font-medium text-amber-100">@{user.username}</p>
            </div>
          </div>
        </div>
        
        <div className="p-8">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-xl shadow-sm py-2 px-4 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 sm:text-sm transition-shadow"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-xl shadow-sm py-2 px-4 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 sm:text-sm transition-shadow"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="mt-1 block w-full border border-gray-200 rounded-xl shadow-sm py-2 px-4 bg-gray-50 text-gray-500 sm:text-sm cursor-not-allowed"
                  />
                  <p className="mt-2 text-xs text-gray-500">Email cannot be changed.</p>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : <><Save className="w-4 h-4 mr-2" /> Save Changes</>}
                </Button>
              </div>
            </form>
          ) : (
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500 flex items-center gap-2">
                  <User className="w-4 h-4" /> Full Name
                </dt>
                <dd className="mt-1 text-sm text-gray-900 font-semibold">{user.firstName} {user.lastName}</dd>
              </div>
              
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500 flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Email Address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 font-semibold">{user.email}</dd>
              </div>
              
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500 flex items-center gap-2">
                  <Shield className="w-4 h-4" /> Role
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  <span className="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-amber-100 text-amber-800">
                    {user.role?.name || 'User'}
                  </span>
                </dd>
              </div>
              
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500 flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Account Status
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {user.status || 'Active'}
                  </span>
                </dd>
              </div>
            </dl>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
