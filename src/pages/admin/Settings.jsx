import React, { useEffect, useState } from 'react';
import { adminService } from '../../services/admin.service';
import LoadingState from '../../components/admin/LoadingState';
import { Save } from 'lucide-react';

const Settings = () => {
  const [settings, setSettings] = useState({
    ai_daily_limit: 3,
    maintenance_mode: false,
    registration_enabled: true
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await adminService.getSettings();
        const apiSettings = response.data || {};
        
        // Merge API settings with defaults
        setSettings(prev => ({
          ...prev,
          ...apiSettings
        }));
      } catch (err) {
        console.error('Failed to load settings', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async (key) => {
    setSaving(true);
    setMessage('');
    try {
      await adminService.updateSetting(key, settings[key]);
      setMessage(`Successfully updated ${key.replace(/_/g, ' ')}`);
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error(err);
      setMessage('Failed to update setting');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingState message="Loading configuration..." />;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">System Settings</h2>
        <p className="text-gray-500 text-sm mt-1">Configure global application parameters.</p>
      </div>

      {message && (
        <div className="p-4 bg-green-50 text-green-700 rounded-lg border border-green-100 text-sm font-medium">
          {message}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-100">
        
        {/* AI Limit Setting */}
        <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-medium text-gray-900">AI Daily Generation Limit</h3>
            <p className="text-sm text-gray-500 mt-1">The maximum number of recipes a user can generate per day.</p>
          </div>
          <div className="flex items-center gap-3">
            <input 
              type="number" 
              className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={settings.ai_daily_limit}
              onChange={(e) => handleChange('ai_daily_limit', parseInt(e.target.value))}
            />
            <button 
              onClick={() => handleSave('ai_daily_limit')}
              disabled={saving}
              className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              <Save className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Maintenance Mode */}
        <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-medium text-gray-900">Maintenance Mode</h3>
            <p className="text-sm text-gray-500 mt-1">Disable access to the application for all non-admin users.</p>
          </div>
          <div className="flex items-center gap-3">
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={settings.maintenance_mode}
                onChange={(e) => {
                  handleChange('maintenance_mode', e.target.checked);
                }}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
            </label>
            <button 
              onClick={() => handleSave('maintenance_mode')}
              disabled={saving}
              className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              <Save className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Registration */}
        <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-medium text-gray-900">Allow New Registrations</h3>
            <p className="text-sm text-gray-500 mt-1">Allow new users to sign up for an account.</p>
          </div>
          <div className="flex items-center gap-3">
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={settings.registration_enabled}
                onChange={(e) => {
                  handleChange('registration_enabled', e.target.checked);
                }}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
            </label>
            <button 
              onClick={() => handleSave('registration_enabled')}
              disabled={saving}
              className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              <Save className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Settings;
