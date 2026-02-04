import { useState, useEffect } from 'react';
import { 
  FiDatabase, 
  FiServer, 
  FiCloud, 
  FiHardDrive, 
  FiBarChart2,
  FiCpu,
  FiActivity,
  FiDownload,
  FiUpload,
  FiClock
} from 'react-icons/fi';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(...registerables);

const Database = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  
  // Mock database metrics
  const [dbData, setDbData] = useState({
    storage: 0,
    queries: 0,
    responseTime: 0,
    uptime: 0,
    backups: [],
    performance: [],
    resourceUsage: [],
    queryHistory: []
  });

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setDbData({
        storage: 87.5,
        storageUsed: 350,
        storageTotal: 400,
        queries: 12450,
        responseTime: 142,
        uptime: '99.98%',
        backups: [
          { date: '2023-06-15', size: '45GB', status: 'success' },
          { date: '2023-06-08', size: '42GB', status: 'success' },
          { date: '2023-06-01', size: '40GB', status: 'success' },
          { date: '2023-05-25', size: '38GB', status: 'success' },
          { date: '2023-05-18', size: '36GB', status: 'failed' },
        ],
        performance: Array.from({ length: 24 }, (_, i) => ({
          hour: i,
          queries: Math.floor(Math.random() * 800) + 200,
          responseTime: Math.floor(Math.random() * 100) + 50,
        })),
        resourceUsage: Array.from({ length: 7 }, (_, i) => ({
          day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
          cpu: Math.floor(Math.random() * 40) + 20,
          memory: Math.floor(Math.random() * 50) + 30,
          storage: Math.floor(Math.random() * 10) + 85,
        })),
        queryHistory: [
          { query: 'SELECT * FROM projects', count: 1245, avgTime: 45 },
          { query: 'SELECT * FROM visitors', count: 987, avgTime: 62 },
          { query: 'UPDATE analytics SET...', count: 543, avgTime: 28 },
          { query: 'INSERT INTO contact...', count: 321, avgTime: 75 },
          { query: 'DELETE FROM temp...', count: 87, avgTime: 112 },
        ]
      });
      setLoading(false);
    }, 1000);
  }, []);

  const performanceData = {
    labels: dbData.performance.map(item => `${item.hour}:00`),
    datasets: [
      {
        label: 'Queries',
        data: dbData.performance.map(item => item.queries),
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        tension: 0.4,
        yAxisID: 'y',
      },
      {
        label: 'Response Time (ms)',
        data: dbData.performance.map(item => item.responseTime),
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        tension: 0.4,
        yAxisID: 'y1',
      }
    ]
  };

  const resourceUsageData = {
    labels: dbData.resourceUsage.map(item => item.day),
    datasets: [
      {
        label: 'CPU Usage %',
        data: dbData.resourceUsage.map(item => item.cpu),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Memory Usage %',
        data: dbData.resourceUsage.map(item => item.memory),
        borderColor: '#ec4899',
        backgroundColor: 'rgba(236, 72, 153, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Storage Usage %',
        data: dbData.resourceUsage.map(item => item.storage),
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245, 158, 11, 0.2)',
        tension: 0.4,
      }
    ]
  };

  return (
    <div className="max-w-7xl mt-10 md:ml-64 mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              Database Management
            </h1>
            <p className="text-gray-400 mt-1">Monitor and optimize your portfolio database</p>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md text-sm font-medium transition-colors">
              Backup Now
            </button>
          </div>
        </header>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-800 mb-6">
          {['overview', 'performance', 'resources', 'queries'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium capitalize ${activeTab === tab ? 'text-indigo-400 border-b-2 border-indigo-500' : 'text-gray-400 hover:text-white'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <>
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatCard 
                    icon={<FiDatabase className="text-indigo-400" size={24} />} 
                    title="Storage Used" 
                    value={`${dbData.storage}%`} 
                    subValue={`${dbData.storageUsed}GB / ${dbData.storageTotal}GB`}
                    change="+5.2% this week"
                    isPositive={false}
                  />
                  <StatCard 
                    icon={<FiActivity className="text-blue-400" size={24} />} 
                    title="Daily Queries" 
                    value={dbData.queries.toLocaleString()} 
                    change="+12.7%"
                    isPositive
                  />
                  <StatCard 
                    icon={<FiClock className="text-green-400" size={24} />} 
                    title="Avg. Response" 
                    value={`${dbData.responseTime}ms`} 
                    change="-8.3%"
                    isPositive
                  />
                  <StatCard 
                    icon={<FiServer className="text-yellow-400" size={24} />} 
                    title="Uptime" 
                    value={dbData.uptime} 
                    change="100% last 24h"
                    isPositive
                  />
                </div>

                {/* Storage Visualization */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 bg-gray-900 rounded-xl p-4 md:p-6">
                    <h2 className="text-lg font-semibold mb-4">Storage Breakdown</h2>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="w-3 h-3 rounded-full bg-indigo-500"></span>
                        <span className="text-sm">Projects Data (45%)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                        <span className="text-sm">Visitor Analytics (30%)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="w-3 h-3 rounded-full bg-green-500"></span>
                        <span className="text-sm">Media Files (15%)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="w-3 h-3 rounded-full bg-gray-500"></span>
                        <span className="text-sm">Other (10%)</span>
                      </div>
                    </div>
                    <div className="h-64">
                      <Chart 
                        type="doughnut"
                        data={{
                          labels: ['Projects Data', 'Visitor Analytics', 'Media Files', 'Other'],
                          datasets: [{
                            data: [45, 30, 15, 10],
                            backgroundColor: [
                              '#6366f1',
                              '#3b82f6',
                              '#10b981',
                              '#6b7280'
                            ],
                            borderWidth: 0,
                          }]
                        }}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: { display: false },
                            tooltip: {
                              backgroundColor: '#1f2937',
                              titleColor: '#f3f4f6',
                              bodyColor: '#e5e7eb',
                              borderColor: '#4b5563',
                              borderWidth: 1,
                            }
                          },
                          cutout: '70%',
                        }}
                      />
                    </div>
                  </div>

                  <div className="bg-gray-900 rounded-xl p-4 md:p-6">
                    <h2 className="text-lg font-semibold mb-4">Recent Backups</h2>
                    <div className="space-y-4">
                      {dbData.backups.map((backup, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                          <div className="flex items-center">
                            <div className={`p-2 rounded-full mr-3 ${backup.status === 'success' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                              <FiHardDrive />
                            </div>
                            <div>
                              <h3 className="text-sm font-medium">{backup.date}</h3>
                              <p className="text-xs text-gray-400">{backup.size}</p>
                            </div>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${backup.status === 'success' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                            {backup.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'performance' && (
              <div className="space-y-6">
                <div className="bg-gray-900 rounded-xl p-4 md:p-6">
                  <h2 className="text-lg font-semibold mb-4">Query Performance (24h)</h2>
                  <div className="h-96">
                    <Chart 
                      type="line"
                      data={performanceData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'top',
                            labels: { color: '#e5e7eb' }
                          },
                          tooltip: {
                            mode: 'index',
                            intersect: false,
                            backgroundColor: '#1f2937',
                            titleColor: '#f3f4f6',
                            bodyColor: '#e5e7eb',
                            borderColor: '#4b5563',
                            borderWidth: 1,
                          }
                        },
                        scales: {
                          y: {
                            type: 'linear',
                            display: true,
                            position: 'left',
                            grid: { color: 'rgba(255,255,255,0.1)' },
                            title: {
                              display: true,
                              text: 'Queries per hour',
                              color: '#9ca3af'
                            }
                          },
                          y1: {
                            type: 'linear',
                            display: true,
                            position: 'right',
                            grid: { drawOnChartArea: false },
                            title: {
                              display: true,
                              text: 'Response Time (ms)',
                              color: '#9ca3af'
                            }
                          },
                          x: { 
                            grid: { color: 'rgba(255,255,255,0.1)' },
                            title: {
                              display: true,
                              text: 'Hour of Day',
                              color: '#9ca3af'
                            }
                          }
                        },
                        elements: {
                          point: { radius: 0, hoverRadius: 6 }
                        }
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-900 rounded-xl p-4 md:p-6">
                    <h2 className="text-lg font-semibold mb-4">Slowest Queries</h2>
                    <div className="space-y-3">
                      {dbData.queryHistory
                        .sort((a, b) => b.avgTime - a.avgTime)
                        .slice(0, 5)
                        .map((query, index) => (
                          <div key={index} className="p-3 bg-gray-800 rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                              <code className="text-xs font-mono text-gray-300 truncate">{query.query}</code>
                              <span className="text-sm font-medium text-red-400">{query.avgTime}ms</span>
                            </div>
                            <div className="flex justify-between text-xs text-gray-400">
                              <span>Executed {query.count.toLocaleString()} times</span>
                              <button className="text-indigo-400 hover:text-indigo-300">
                                Optimize
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="bg-gray-900 rounded-xl p-4 md:p-6">
                    <h2 className="text-lg font-semibold mb-4">Most Frequent Queries</h2>
                    <div className="space-y-3">
                      {dbData.queryHistory
                        .sort((a, b) => b.count - a.count)
                        .slice(0, 5)
                        .map((query, index) => (
                          <div key={index} className="p-3 bg-gray-800 rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                              <code className="text-xs font-mono text-gray-300 truncate">{query.query}</code>
                              <span className="text-sm font-medium text-indigo-400">{query.count.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-xs text-gray-400">
                              <span>Avg. time: {query.avgTime}ms</span>
                              <button className="text-indigo-400 hover:text-indigo-300">
                                Cache
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'resources' && (
              <div className="space-y-6">
                <div className="bg-gray-900 rounded-xl p-4 md:p-6">
                  <h2 className="text-lg font-semibold mb-4">Resource Usage (Last 7 Days)</h2>
                  <div className="h-96">
                    <Chart 
                      type="line"
                      data={resourceUsageData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'top',
                            labels: { color: '#e5e7eb' }
                          },
                          tooltip: {
                            mode: 'index',
                            intersect: false,
                            backgroundColor: '#1f2937',
                            titleColor: '#f3f4f6',
                            bodyColor: '#e5e7eb',
                            borderColor: '#4b5563',
                            borderWidth: 1,
                          }
                        },
                        scales: {
                          y: {
                            min: 0,
                            max: 100,
                            grid: { color: 'rgba(255,255,255,0.1)' },
                            title: {
                              display: true,
                              text: 'Usage Percentage',
                              color: '#9ca3af'
                            }
                          },
                          x: { 
                            grid: { color: 'rgba(255,255,255,0.1)' },
                            title: {
                              display: true,
                              text: 'Day of Week',
                              color: '#9ca3af'
                            }
                          }
                        },
                        elements: {
                          point: { radius: 0, hoverRadius: 6 }
                        }
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <ResourceCard 
                    icon={<FiCpu className="text-blue-400" size={20} />}
                    title="CPU Usage"
                    value={`${dbData.resourceUsage.reduce((sum, day) => sum + day.cpu, 0) / 7}%`}
                    trend="stable"
                  />
                  <ResourceCard 
                    icon={<FiDatabase className="text-purple-400" size={20} />}
                    title="Memory Usage"
                    value={`${dbData.resourceUsage.reduce((sum, day) => sum + day.memory, 0) / 7}%`}
                    trend="up"
                  />
                  <ResourceCard 
                    icon={<FiHardDrive className="text-green-400" size={20} />}
                    title="Storage Usage"
                    value={`${dbData.resourceUsage.reduce((sum, day) => sum + day.storage, 0) / 7}%`}
                    trend="up"
                  />
                </div>
              </div>
            )}

            {activeTab === 'queries' && (
              <div className="bg-gray-900 rounded-xl p-4 md:p-6">
                <h2 className="text-lg font-semibold mb-4">Query History</h2>
                <div className="mb-4 flex justify-between items-center">
                  <div className="relative w-64">
                    <input
                      type="text"
                      placeholder="Search queries..."
                      className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-sm bg-gray-800 hover:bg-gray-700 rounded-md transition-colors">
                      Filter
                    </button>
                    <button className="px-3 py-1 text-sm bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors">
                      Export
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-800">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Query</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Count</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Avg Time</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Last Executed</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {dbData.queryHistory.map((query, index) => (
                        <tr key={index} className="hover:bg-gray-800 transition-colors">
                          <td className="px-4 py-3 whitespace-nowrap">
                            <code className="text-xs font-mono text-gray-300 max-w-xs truncate block">{query.query}</code>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">
                            {query.query.split(' ')[0]}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">
                            {query.count.toLocaleString()}
                          </td>
                          <td className={`px-4 py-3 whitespace-nowrap text-sm ${query.avgTime > 100 ? 'text-red-400' : query.avgTime > 50 ? 'text-yellow-400' : 'text-green-400'}`}>
                            {query.avgTime}ms
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">
                            {index === 0 ? 'Just now' : `${index + 1}h ago`}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">
                            <button className="text-indigo-400 hover:text-indigo-300 mr-2">
                              Analyze
                            </button>
                            <button className="text-gray-400 hover:text-white">
                              <FiBarChart2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, subValue, change, isPositive }) => {
  return (
    <div className="bg-gray-900 rounded-xl p-4 md:p-6 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-indigo-500/10">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-gray-400 text-sm font-medium mb-1">{title}</div>
          <div className="text-2xl font-bold text-white">{value}</div>
          {subValue && <div className="text-xs text-gray-400 mt-1">{subValue}</div>}
        </div>
        <div className="p-2 rounded-lg bg-gray-800">{icon}</div>
      </div>
      <div className={`mt-4 text-sm flex items-center ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
        <span>{change}</span>
        <svg
          className={`w-4 h-4 ml-1 ${isPositive ? 'rotate-0' : 'rotate-180'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </div>
    </div>
  );
};

const ResourceCard = ({ icon, title, value, trend }) => {
  const trendColors = {
    up: 'text-green-400',
    down: 'text-red-400',
    stable: 'text-yellow-400'
  };

  const trendIcons = {
    up: (
      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    ),
    down: (
      <svg className="w-4 h-4 ml-1 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    ),
    stable: (
      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
      </svg>
    )
  };

  return (
    <div className="bg-gray-900 rounded-xl p-4 transition-all hover:bg-gray-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="p-2 rounded-lg bg-gray-800 mr-3">
            {icon}
          </div>
          <div>
            <div className="text-sm text-gray-400">{title}</div>
            <div className="text-lg font-semibold text-white">{value}</div>
          </div>
        </div>
        <div className={`text-sm flex items-center ${trendColors[trend]}`}>
          {trend}
          {trendIcons[trend]}
        </div>
      </div>
    </div>
  );
};

export default Database;