import React, { useState } from 'react';
import { 
  FiUser, FiMail, FiLock, FiGlobe, 
  FiBell, FiCreditCard, FiDatabase, 
  FiShield, FiCode, FiMoon, FiSun 
} from 'react-icons/fi';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    weeklyDigest: true
  });
  const [billingInfo, setBillingInfo] = useState({
    plan: 'Premium',
    card: '•••• •••• •••• 4242',
    expiry: '12/25'
  });

  const tabs = [
    { id: 'account', icon: <FiUser />, label: 'Account' },
    { id: 'security', icon: <FiShield />, label: 'Security' },
    { id: 'notifications', icon: <FiBell />, label: 'Notifications' },
    { id: 'billing', icon: <FiCreditCard />, label: 'Billing' },
    { id: 'appearance', icon: darkMode ? <FiMoon /> : <FiSun />, label: 'Appearance' },
    { id: 'advanced', icon: <FiCode />, label: 'Advanced' }
  ];

  return (
    <div className="max-w-6xl md:ml-64 mt-10  mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Settings Sidebar */}
        <div className="w-full md:w-64 bg-gray-900 rounded-xl p-4 shadow-lg border border-gray-800">
          <h2 className="text-xl font-bold text-white mb-6 px-2">Settings</h2>
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-800">
          {/* Account Settings */}
          {activeTab === 'account' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Account Information</h3>
                <button className="text-sm text-blue-500 hover:text-blue-400">
                  Edit Profile
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-sm text-gray-400">Full Name</label>
                  <div className="bg-gray-800 rounded-lg px-4 py-3 text-white">
                    John Doe
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm text-gray-400">Email</label>
                  <div className="bg-gray-800 rounded-lg px-4 py-3 text-white">
                    john@example.com
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm text-gray-400">Username</label>
                  <div className="bg-gray-800 rounded-lg px-4 py-3 text-white">
                    @johndoe
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm text-gray-400">Timezone</label>
                  <select className="w-full bg-gray-800 rounded-lg px-4 py-3 text-white border-none focus:ring-2 focus:ring-blue-500">
                    <option>(GMT-05:00) Eastern Time</option>
                    <option>(GMT-08:00) Pacific Time</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-800">
                <h4 className="text-md font-semibold text-white mb-4">Danger Zone</h4>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors">
                    Deactivate Account
                  </button>
                  <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-red-500 rounded-lg text-sm font-medium transition-colors">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white">Security Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div>
                    <h4 className="font-medium text-white">Password</h4>
                    <p className="text-sm text-gray-400">Last changed 3 months ago</p>
                  </div>
                  <button className="text-sm text-blue-500 hover:text-blue-400">
                    Change
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div>
                    <h4 className="font-medium text-white">Two-Factor Authentication</h4>
                    <p className="text-sm text-gray-400">Add extra security to your account</p>
                  </div>
                  <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors">
                    Enable
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div>
                    <h4 className="font-medium text-white">Active Sessions</h4>
                    <p className="text-sm text-gray-400">2 active sessions</p>
                  </div>
                  <button className="text-sm text-blue-500 hover:text-blue-400">
                    View All
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-800">
                <h4 className="text-md font-semibold text-white mb-2">Recent Security Activity</h4>
                <div className="space-y-3">
                  {[
                    { action: 'Login from new device', location: 'New York, US', time: '2 hours ago' },
                    { action: 'Password changed', location: '', time: '3 months ago' },
                    { action: 'Two-factor method added', location: '', time: '6 months ago' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg">
                      <div className="mt-1 w-2 h-2 rounded-full bg-blue-500"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">{item.action}</p>
                        {item.location && (
                          <p className="text-xs text-gray-400">{item.location}</p>
                        )}
                      </div>
                      <p className="text-xs text-gray-400">{item.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Notifications Settings */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white">Notification Preferences</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div>
                    <h4 className="font-medium text-white">Email Notifications</h4>
                    <p className="text-sm text-gray-400">Receive updates via email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={notifications.email}
                      onChange={() => setNotifications({...notifications, email: !notifications.email})}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div>
                    <h4 className="font-medium text-white">Push Notifications</h4>
                    <p className="text-sm text-gray-400">Receive browser notifications</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={notifications.push}
                      onChange={() => setNotifications({...notifications, push: !notifications.push})}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div>
                    <h4 className="font-medium text-white">Weekly Digest</h4>
                    <p className="text-sm text-gray-400">Get weekly summary reports</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={notifications.weeklyDigest}
                      onChange={() => setNotifications({...notifications, weeklyDigest: !notifications.weeklyDigest})}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-800">
                <h4 className="text-md font-semibold text-white mb-4">Notification Sounds</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {['Default', 'Chime', 'Bell', 'Alert', 'None'].map((sound) => (
                    <button
                      key={sound}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        sound === 'Default'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      {sound}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Billing Settings */}
          {activeTab === 'billing' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white">Billing Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-gray-800 rounded-lg">
                    <h4 className="font-medium text-white mb-2">Current Plan</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-400 font-medium">{billingInfo.plan}</span>
                      <button className="text-sm text-blue-500 hover:text-blue-400">
                        Change Plan
                      </button>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-800 rounded-lg">
                    <h4 className="font-medium text-white mb-2">Payment Method</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">{billingInfo.card}</span>
                      <span className="text-gray-400 text-sm">Expires {billingInfo.expiry}</span>
                    </div>
                    <button className="mt-3 text-sm text-blue-500 hover:text-blue-400">
                      Update Payment
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h4 className="font-medium text-white mb-4">Billing History</h4>
                  <div className="space-y-3">
                    {[
                      { date: 'Jun 15, 2023', amount: '$29.00', status: 'Paid' },
                      { date: 'May 15, 2023', amount: '$29.00', status: 'Paid' },
                      { date: 'Apr 15, 2023', amount: '$29.00', status: 'Paid' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b border-gray-700">
                        <div>
                          <p className="text-sm text-white">{item.date}</p>
                          <p className="text-xs text-gray-400">{item.status}</p>
                        </div>
                        <p className="text-sm font-medium text-white">{item.amount}</p>
                      </div>
                    ))}
                  </div>
                  <button className="mt-4 text-sm text-blue-500 hover:text-blue-400">
                    View Full History
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-800">
                <h4 className="text-md font-semibold text-white mb-4">Payment Methods</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-800 rounded-lg border border-blue-500">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-white">Primary</span>
                      <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">Default</span>
                    </div>
                    <p className="text-gray-300">Visa ending in 4242</p>
                    <p className="text-gray-400 text-sm mt-1">Expires 12/25</p>
                  </div>
                  
                  <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-white">Secondary</span>
                    </div>
                    <p className="text-gray-300">Mastercard ending in 5555</p>
                    <p className="text-gray-400 text-sm mt-1">Expires 08/24</p>
                  </div>
                </div>
                <button className="mt-4 text-sm text-blue-500 hover:text-blue-400">
                  + Add Payment Method
                </button>
              </div>
            </div>
          )}

          {/* Appearance Settings */}
          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white">Appearance</h3>
              
              <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <div>
                  <h4 className="font-medium text-white">Dark Mode</h4>
                  <p className="text-sm text-gray-400">
                    {darkMode ? 'Dark theme is enabled' : 'Light theme is enabled'}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={darkMode}
                    onChange={() => setDarkMode(!darkMode)}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* <div className="pt-4 border-t border-gray-800">
                <h4 className="text-md font-semibold text-white mb-4">Theme Color</h4>
                <div className="grid grid-cols-3 md:grid-c */}


                <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                  {['blue', 'green', 'purple', 'red', 'orange'].map((color) => (
                    <button
                      key={color}
                      className={`w-10 h-10 rounded-full transition-all border-2 ${
                        color === 'blue' ? 'border-white' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color }}
                      title={color.charAt(0).toUpperCase() + color.slice(1)}
                    />
                  ))}
                </div>
              </div>
          
          )}

          {/* Advanced Settings */}
          {activeTab === 'advanced' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white">Advanced Settings</h3>

              <div className="p-4 bg-gray-800 rounded-lg space-y-4">
                <div>
                  <h4 className="font-medium text-white">Developer Mode</h4>
                  <p className="text-sm text-gray-400">
                    Access internal tools and logs (for developers only)
                  </p>
                  <button className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium">
                    Enable Developer Mode
                  </button>
                </div>

                <div className="pt-4 border-t border-gray-700">
                  <h4 className="font-medium text-white">Export Data</h4>
                  <p className="text-sm text-gray-400">
                    Download a copy of your account data.
                  </p>
                  <button className="mt-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm font-medium">
                    Export as JSON
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;