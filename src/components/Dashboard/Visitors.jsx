import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { FiUsers, FiEye, FiClock, FiGlobe, FiTrendingUp } from 'react-icons/fi';

ChartJS.register(...registerables);

const Visitors = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [loading, setLoading] = useState(true);
  
  // Mock data - replace with your actual API calls
  const [visitorData, setVisitorData] = useState({
    total: 0,
    unique: 0,
    pageViews: 0,
    avgDuration: '0m 0s',
    countries: [],
    devices: [],
    timeline: []
  });

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setVisitorData({
        total: 1248,
        unique: 987,
        pageViews: 3245,
        avgDuration: '2m 45s',
        countries: [
          { name: 'United States', visitors: 420, percent: 34 },
          { name: 'India', visitors: 280, percent: 22 },
          { name: 'Germany', visitors: 175, percent: 14 },
          { name: 'UK', visitors: 150, percent: 12 },
          { name: 'Others', visitors: 223, percent: 18 },
        ],
        devices: [
          { type: 'Desktop', percent: 58 },
          { type: 'Mobile', percent: 36 },
          { type: 'Tablet', percent: 6 },
        ],
        timeline: Array.from({ length: 7 }, (_, i) => ({
          date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          visitors: Math.floor(Math.random() * 100) + 50,
          pageViews: Math.floor(Math.random() * 300) + 100,
        }))
      });
      setLoading(false);
    }, 800);
  }, [timeRange]);

  const timelineData = {
    labels: visitorData.timeline.map(item => item.date),
    datasets: [
      {
        label: 'Visitors',
        data: visitorData.timeline.map(item => item.visitors),
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Page Views',
        data: visitorData.timeline.map(item => item.pageViews),
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        tension: 0.4,
        fill: true,
      }
    ]
  };

  const countryData = {
    labels: visitorData.countries.map(item => item.name),
    datasets: [{
      data: visitorData.countries.map(item => item.visitors),
      backgroundColor: [
        '#6366f1',
        '#8b5cf6',
        '#ec4899',
        '#f43f5e',
        '#f59e0b'
      ],
      borderWidth: 0,
    }]
  };

  const deviceData = {
    labels: visitorData.devices.map(item => item.type),
    datasets: [{
      data: visitorData.devices.map(item => item.percent),
      backgroundColor: [
        '#3b82f6',
        '#10b981',
        '#f59e0b'
      ],
      borderWidth: 0,
    }]
  };

  return (
    <div className="min-h-screen bg-black mt-10 md:ml-64  text-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              Visitor Analytics
            </h1>
            <p className="text-gray-400 mt-1">Track and analyze your portfolio visitors</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-2 bg-gray-900 rounded-lg p-1">
            {['24h', '7d', '30d', '90d', 'All'].map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 text-sm rounded-md transition-all ${timeRange === range ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
              >
                {range}
              </button>
            ))}
          </div>
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard 
                icon={<FiUsers className="text-indigo-400" size={24} />} 
                title="Total Visitors" 
                value={visitorData.total.toLocaleString()} 
                change="+12.4%" 
                isPositive 
              />
              <StatCard 
                icon={<FiEye className="text-blue-400" size={24} />} 
                title="Unique Visitors" 
                value={visitorData.unique.toLocaleString()} 
                change="+8.2%" 
                isPositive 
              />
              <StatCard 
                icon={<FiTrendingUp className="text-green-400" size={24} />} 
                title="Page Views" 
                value={visitorData.pageViews.toLocaleString()} 
                change="+18.7%" 
                isPositive 
              />
              <StatCard 
                icon={<FiClock className="text-yellow-400" size={24} />} 
                title="Avg. Duration" 
                value={visitorData.avgDuration} 
                change="+5.3%" 
                isPositive 
              />
            </div>

            {/* Main Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2 bg-gray-900 rounded-xl p-4 md:p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Visitor Trends</h2>
                  <div className="flex space-x-2">
                    <span className="flex items-center text-sm">
                      <span className="w-3 h-3 rounded-full bg-indigo-500 mr-1"></span>
                      Visitors
                    </span>
                    <span className="flex items-center text-sm">
                      <span className="w-3 h-3 rounded-full bg-green-500 mr-1"></span>
                      Page Views
                    </span>
                  </div>
                </div>
                <div className="h-80">
                  <Chart 
                    type="line"
                    data={timelineData} 
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { display: false },
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
                        x: { grid: { color: 'rgba(255,255,255,0.1)' } },
                        y: { grid: { color: 'rgba(255,255,255,0.1)' } }
                      },
                      elements: {
                        point: { radius: 0, hoverRadius: 6 }
                      }
                    }} 
                  />
                </div>
              </div>

              <div className="bg-gray-900 rounded-xl p-4 md:p-6">
                <h2 className="text-lg font-semibold mb-4">Traffic by Device</h2>
                <div className="h-80">
                  <Chart 
                    type="pie"
                    data={deviceData} 
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { 
                          position: 'right',
                          labels: { color: '#e5e7eb' }
                        },
                        tooltip: { 
                          backgroundColor: '#1f2937',
                          titleColor: '#f3f4f6',
                          bodyColor: '#e5e7eb',
                          borderColor: '#4b5563',
                          borderWidth: 1,
                        }
                      }
                    }} 
                  />
                </div>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-gray-900 rounded-xl p-4 md:p-6">
                <h2 className="text-lg font-semibold mb-4">Top Countries</h2>
                <div className="h-80">
                  <Chart 
                    type="bar"
                    data={countryData} 
                    options={{
                      indexAxis: 'y',
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
                      scales: {
                        x: { grid: { color: 'rgba(255,255,255,0.1)' } },
                        y: { grid: { color: 'rgba(255,255,255,0.1)' } }
                      }
                    }} 
                  />
                </div>
              </div>

              <div className="lg:col-span-2 bg-gray-900 rounded-xl p-4 md:p-6">
                <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-800">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Page</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Visitor</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Location</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Duration</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {[1, 2, 3, 4, 5].map((item) => (
                        <tr key={item} className="hover:bg-gray-800 transition-colors">
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-100">/projects/{item}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">Visitor #{1248 - item}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">
                            <div className="flex items-center">
                              <FiGlobe className="mr-1 text-blue-400" />
                              {['United States', 'India', 'Germany', 'UK', 'Canada'][item - 1]}
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">{['0m 45s', '1m 12s', '2m 30s', '0m 58s', '3m 15s'][item - 1]}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">{item}h ago</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, change, isPositive }) => {
  return (
    <div className="bg-gray-900 rounded-xl p-4 md:p-6 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-indigo-500/10">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-gray-400 text-sm font-medium mb-1">{title}</div>
          <div className="text-2xl font-bold text-white">{value}</div>
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

export default Visitors;